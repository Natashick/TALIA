"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./Chat.module.css";

type ChatMsg = { role: "user" | "assistant"; content: string };

export default function Home() {
  const [threadId, setThreadId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<ChatMsg[]>([]);
  const [busy, setBusy] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Initialisiere Thread
  useEffect(() => {
    const saved = window.localStorage.getItem("assistant_thread_id");
    if (saved) {
      setThreadId(saved);
    } else {
      fetch("/api/assistants/threads", { method: "POST" })
        .then((r) => r.json())
        .then((j) => {
          if (j.thread_id) {
            setThreadId(j.thread_id);
            window.localStorage.setItem("assistant_thread_id", j.thread_id);
          }
        });
    }
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, busy]);

  async function sendMessage(userText: string, threadIdToUse: string) {
    const res = await fetch(`/api/assistants/threads/${threadIdToUse}/messages`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ content: userText }),
    });
    const j = await res.json();
    // Fallback: Wenn neue thread_id kommt, übernehmen!
    if (j.thread_id && j.thread_id !== threadId) {
      setThreadId(j.thread_id);
      window.localStorage.setItem("assistant_thread_id", j.thread_id);
    }
    return j;
  }

  async function onSend() {
    if (!threadId || !input.trim()) return;
    const userText = input.trim();
    setInput("");
    setMsgs((m) => [...m, { role: "user", content: userText }]);
    setBusy(true);
    try {
      let j = await sendMessage(userText, threadId);
      // Fehler: Thread existiert nicht (404)
      if (j.error && j.error.includes("No thread found")) {
        window.localStorage.removeItem("assistant_thread_id");
        const tRes = await fetch("/api/assistants/threads", { method: "POST" });
        const tJson = await tRes.json();
        if (tJson.thread_id) {
          setThreadId(tJson.thread_id);
          window.localStorage.setItem("assistant_thread_id", tJson.thread_id);
          j = await sendMessage(userText, tJson.thread_id);
        }
      }
      if (j.error) throw new Error(j.error);
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
    <div className={styles.layout}>
      <header className={styles.header}>
        <Image src="/logo.png" alt="TALIA Logo" width={96} height={96} quality={100} priority sizes="96px"/>
        <div>
          <h1>TALIA</h1>
          <h2>Threat Analysis and Learning Intelligence for Automotive</h2>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.chatContainer}>
          {msgs.length === 0 && (
            <div className={styles.emptyMsg}>Schreibe eine Nachricht, um zu starten…</div>
          )}
          {msgs.map((m, i) => (
            <div
              key={i}
              className={
                m.role === "user" ? styles.userMsg : styles.taliaMsg
              }
            >
              <div className={styles.senderLabel}
                   style={{ color: m.role === "user" ? "#2563eb" : "#6b7280" }}>
                {m.role === "user" ? "You" : "TALIA"}
              </div>
              <div className={styles.bubble}>{m.content}</div>
            </div>
          ))}
          {busy && <div className={styles.typingMsg}>TALIA is typing…</div>}
          <div ref={bottomRef} />
        </div>
        <form
          className={styles.inputRow}
          onSubmit={(e) => {
            e.preventDefault();
            onSend();
          }}
        >
          <textarea
            className={styles.input}
            placeholder="Nachricht eingeben… (Enter = senden, Shift+Enter = Zeilenumbruch)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
          />
          <button
            type="submit"
            disabled={!threadId || busy || !input.trim()}
            className={styles.sendBtn}
          >
            Senden
          </button>
        </form>
      </main>
      <footer className={styles.footer}>
        Powered by OpenAI Assistants API
      </footer>
    </div>
  );
}
