import { NextResponse } from "next/server";
import { getOpenAI } from "@/lib/openai";

export const runtime = "nodejs"; // stabiler als Edge
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

type Body = { content: string };

// POST /api/assistants/threads/:threadId/messages
export async function POST(req: Request, { params }: { params: Promise<{ threadId: string }> }) {
  const assistantId = process.env.OPENAI_ASSISTANT_ID;
  if (!assistantId) return NextResponse.json({ error: "Missing OPENAI_ASSISTANT_ID" }, { status: 500 });

  const { threadId } = await params;
  if (!threadId) return NextResponse.json({ error: "Missing threadId" }, { status: 400 });

  let body: Body;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 }); }
  const userText = (body.content ?? "").toString();

  try {
    const openai = await getOpenAI();

    // 1) User-Message anhängen
    await openai.beta.threads.messages.create(threadId, { role: "user", content: userText });

    // 2) Run starten
    const run = await openai.beta.threads.runs.create(threadId, { assistant_id: assistantId });

    // 3) Auf Abschluss pollen
    const terminal = new Set(["completed", "failed", "cancelled", "expired"]);
    let status = run.status, tries = 0;
    while (!terminal.has(status) && tries < 90) {
      await sleep(1000);
      const updated = await openai.beta.threads.runs.retrieve(threadId, run.id);
      status = updated.status; tries++;
    }
    if (status !== "completed") return NextResponse.json({ error: `Run status: ${status}` }, { status: 500 });

    // 4) Letzte Assistant-Nachricht holen
    const list = await openai.beta.threads.messages.list(threadId, { order: "desc", limit: 10 });
    const assistantMsg = list.data.find((m: any) => m.role === "assistant");
    const text =
      assistantMsg?.content
        .map((c: any) => (c.type === "text" ? c.text.value : ""))
        .join("\n")
        .trim() ?? "";

    return NextResponse.json({ thread_id: threadId, message: text });
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? "send failed" }, { status: 500 });
  }
}
