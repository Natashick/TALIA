export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getOpenAI } from "@/lib/openai";

// POST /api/assistants/threads  -> neuen Thread anlegen
export async function POST(_req: Request) {
  try {
    const openai = await getOpenAI();
    const thread = await openai.beta.threads.create({});
    return NextResponse.json({ thread_id: thread.id });
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? "create thread failed" }, { status: 500 });
  }
}
