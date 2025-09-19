"use client";
import { useEffect, useRef, useState } from "react";

type ChatMsg = { role: "user" | "assistant"; content: string };

export default function Home() {
  const [threadId, setThreadId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<ChatMsg[]>([]);
  const [busy, setBusy] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem("assistant_thread_id");
    if (saved) {
      setThreadId(saved);
      return;
    }
    fetch("/api/assistants/threads", { method: "POST" })
      .then((r) => r.json())
      .then((j) => {
        if (j.thread_id) {
          setThreadId(j.thread_id);
          window.localStorage.setItem("assistant_thread_id", j.thread_id);
        } else {
          alert("Failed to create thread");
        }
      })
      .catch((e) => alert(e?.message ?? "Failed to create thread"));
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, busy]);

  async function onSend() {
    if (!threadId || !input.trim()) return;
    const userText = input.trim();
    setInput("");
    setMsgs((m) => [...m, { role: "user", content: userText }]);
    setBusy(true);
    try {
      const res = await fetch(`/api/assistants/threads/${threadId}/messages`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ content: userText })
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || "Request failed");
      setMsgs((m) => [...m, { role: "assistant", content: j.message || "(no content)" }]);
    } catch (e: any) {
      setMsgs((m) => [...m, { role: "assistant", content: `Error: ${e?.message ?? e}` }]);
    } finally {
      setBusy(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  }

  return (
    <div className="font-sans min-h-screen grid grid-rows-[auto_1fr_auto]">
      <main className="row-start-2 max-w-3xl w-full mx-auto p-6 flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">TALIA</h1>
        <h4 className="text-2xl font-semibold">Threat Analysis and Learning Intelligence for Automotive</h4>

        <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 h-[60vh] overflow-y-auto bg-white/40 dark:bg-black/20">
          {msgs.length === 0 && (
            <div className="text-neutral-500">Schreibe eine Nachricht, um zu starten…</div>
          )}
          {msgs.map((m, i) => (
            <div key={i} className="mb-4">
              <div className="text-xs uppercase tracking-wide text-neutral-500">{m.role}</div>
              <div className="whitespace-pre-wrap">{m.content}</div>
            </div>
          ))}
          {busy && <div className="text-neutral-500">Assistant is typing…</div>}
          <div ref={bottomRef} />
        </div>

        <div className="flex gap-2">
          <textarea
            className="flex-1 border border-neutral-300 dark:border-neutral-700 rounded-md p-3 min-h-[80px] resize-y"
            placeholder="Nachricht eingeben… (Enter = senden, Shift+Enter = Zeilenumbruch)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
          />
          <button
            onClick={onSend}
            disabled={!threadId || busy || !input.trim()}
            className="h-[44px] self-end px-4 rounded-md bg-black text-white disabled:opacity-50"
          >
            Senden
          </button>
        </div>
      </main>
      <footer className="row-start-3 text-center py-4 text-neutral-500 text-sm">
        Powered by OpenAI Assistants API
      </footer>
    </div>
  );
}
