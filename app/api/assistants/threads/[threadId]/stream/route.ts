import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/lib/openai";

export const runtime = "nodejs";
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

type Body = { content: string };

// POST /api/assistants/threads/:threadId/stream
export async function POST(req: NextRequest, { params }: { params: { threadId: string } }) {
  const assistantId = process.env.OPENAI_ASSISTANT_ID;
  if (!assistantId) {
    return NextResponse.json({ error: "Missing OPENAI_ASSISTANT_ID" }, { status: 500 });
  }

  const threadId = params.threadId;
  if (!threadId) {
    return NextResponse.json({ error: "Missing threadId" }, { status: 400 });
  }

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const userText = (body.content ?? "").toString();

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        // Send initial status
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "status", message: "Creating message..." })}\n\n`));

        // 1) Add user message to thread
        await openai.beta.threads.messages.create(threadId, { role: "user", content: userText });

        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "status", message: "Starting assistant..." })}\n\n`));

        // 2) Start run
        const run = await openai.beta.threads.runs.create(threadId, { assistant_id: assistantId });

        // 3) Poll for completion
        const terminal = new Set(["completed", "failed", "cancelled", "expired"]);
        let status = run.status;
        let tries = 0;
        
        while (!terminal.has(status) && tries < 90) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "status", message: `Processing... (${status})` })}\n\n`));
          
          await sleep(1000);
          const updated = await openai.beta.threads.runs.retrieve(threadId, run.id);
          status = updated.status;
          tries++;
        }

        if (status !== "completed") {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "error", message: `Run status: ${status}` })}\n\n`));
          controller.enqueue(encoder.encode("data: {\"type\":\"done\"}\n\n"));
          controller.close();
          return;
        }

        // 4) Get the latest assistant message
        const list = await openai.beta.threads.messages.list(threadId, { order: "desc", limit: 10 });
        const assistantMsg = list.data.find((m) => m.role === "assistant");
        const text = assistantMsg?.content
          .map((c) => (c.type === "text" ? c.text.value : ""))
          .join("\n")
          .trim() ?? "";

        // Send the response in chunks to simulate streaming
        const words = text.split(" ");
        for (let i = 0; i < words.length; i++) {
          const chunk = words.slice(0, i + 1).join(" ");
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "textDelta", delta: words[i] + (i < words.length - 1 ? " " : "") })}\n\n`));
          
          if (i < words.length - 1) {
            await sleep(50); // Small delay between words to simulate streaming
          }
        }

        // Send completion signal
        controller.enqueue(encoder.encode("data: {\"type\":\"done\"}\n\n"));
        controller.close();
      } catch (e: any) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "error", message: e.message ?? "Stream failed" })}\n\n`));
        controller.enqueue(encoder.encode("data: {\"type\":\"done\"}\n\n"));
        controller.close();
      }
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
  });
}