import { NextResponse } from "next/server";
import { getOpenAI } from "@/lib/openai";

export const runtime = "nodejs"; // stabiler als Edge
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

type Body = { content: string };

// Helper function to ensure thread exists and create message
async function createMessageInThread(
  openai: any,
  threadId: string,
  userText: string
): Promise<{ threadId: string; messageCreated: boolean }> {
  try {
    // Try to post a message to the thread
    await openai.beta.threads.messages.create(threadId, { role: "user", content: userText });
    return { threadId, messageCreated: true };
  } catch (err: any) {
    // Fallback: Thread existiert nicht (404)? → neuen Thread anlegen
    if (err.status === 404) {
      const newThread = await openai.beta.threads.create();
      await openai.beta.threads.messages.create(newThread.id, { role: "user", content: userText });
      return { threadId: newThread.id, messageCreated: true };
    }
    throw err;
  }
}

// POST /api/assistants/threads/:threadId/messages
export async function POST(
  req: Request,
  context: { params: Promise<{ threadId: string }> }
) {
  const { threadId } = await context.params;

  if (!threadId) {
    return NextResponse.json({ error: "Missing threadId" }, { status: 400 });
  }

  const assistantId = process.env.OPENAI_ASSISTANT_ID;
  if (!assistantId) {
    return NextResponse.json(
      { error: "Missing OPENAI_ASSISTANT_ID" },
      { status: 500 }
    );
  }
  
  let body: Body;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 }); }
  const userText = (body.content ?? "").toString();

  const openai = await getOpenAI();

  // Versuche, in den angegebenen Thread zu posten (mit automatischem Fallback bei 404)
  let realThreadId: string;
  try {
    const result = await createMessageInThread(openai, threadId, userText);
    realThreadId = result.threadId;
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "OpenAI error" }, { status: 500 });
  }

  // 2) Run starten (jetzt mit realThreadId)
  try {
    let run;
    try {
      run = await openai.beta.threads.runs.create(realThreadId, { assistant_id: assistantId });
    } catch (err: any) {
      // Fallback: Thread existiert nicht mehr (404)? → neuen Thread anlegen
      if (err.status === 404) {
        // Thread wurde zwischen message creation und run creation gelöscht
        // Erstelle neuen Thread mit dem User-Text
        const newThread = await openai.beta.threads.create();
        const result = await createMessageInThread(openai, newThread.id, userText);
        realThreadId = result.threadId;
        run = await openai.beta.threads.runs.create(realThreadId, { assistant_id: assistantId });
      } else {
        throw err;
      }
    }

    // 3) Auf Abschluss pollen
    const terminal = new Set(["completed", "failed", "cancelled", "expired"]);
    let status = run.status, tries = 0;
    while (!terminal.has(status) && tries < 90) {
      await sleep(1000);
      const updated = await openai.beta.threads.runs.retrieve(realThreadId, run.id);
      status = updated.status; tries++;
    }
    if (status !== "completed") return NextResponse.json({ error: `Run status: ${status}` }, { status: 500 });

    // 4) Letzte Assistant-Nachricht holen
    const list = await openai.beta.threads.messages.list(realThreadId, { order: "desc", limit: 10 });
    const assistantMsg = list.data.find((m: any) => m.role === "assistant");
    const text =
      assistantMsg?.content
        .map((c: any) => (c.type === "text" ? c.text.value : ""))
        .join("\n")
        .trim() ?? "";

    return NextResponse.json({ thread_id: realThreadId, message: text });
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? "send failed" }, { status: 500 });
  }
}
