export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/lib/openai";

// POST /api/assistants/threads  -> neuen Thread anlegen
export async function POST(_req: NextRequest) {
  try {
    const thread = await openai.beta.threads.create({});
    return NextResponse.json({ thread_id: thread.id });
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? "create thread failed" }, { status: 500 });
  }
}
