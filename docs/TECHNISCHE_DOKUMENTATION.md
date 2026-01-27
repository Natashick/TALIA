# TECHNISCHE DOKUMENTATION
## System TALIA - Threat Analysis and Learning Intelligence for Automotive

---

**Version:** 1.0  
**Datum:** 27.01.2026  
**Status:** Genehmigt  
**Autor:** Entwicklungsteam TALIA

---

## Inhaltsverzeichnis

1. [Systemübersicht](#1-systemübersicht)
2. [Architektur](#2-architektur)
3. [Technologie-Stack](#3-technologie-stack)
4. [Installation und Setup](#4-installation-und-setup)
5. [Projektstruktur](#5-projektstruktur)
6. [Frontend-Dokumentation](#6-frontend-dokumentation)
7. [Backend-Dokumentation](#7-backend-dokumentation)
8. [API-Referenz](#8-api-referenz)
9. [Sicherheit](#9-sicherheit)
10. [Performance](#10-performance)
11. [Testing](#11-testing)
12. [Deployment](#12-deployment)
13. [Monitoring und Logging](#13-monitoring-und-logging)
14. [Troubleshooting](#14-troubleshooting)

---

## 1. SYSTEMÜBERSICHT

### 1.1 Was ist TALIA?

**TALIA** (Threat Analysis and Learning Intelligence for Automotive) ist eine webbasierte KI-Assistenten-Anwendung, die Sicherheitsexperten in der Automobilindustrie bei der Analyse von Cyberbedrohungen unterstützt.

### 1.2 Hauptmerkmale

- 🤖 **KI-gestützte Beratung** - Nutzung von OpenAI Assistants API
- 💬 **Interaktive Chat-Oberfläche** - Intuitive Konversation
- 🔒 **Sicherheitsfokus** - Spezialisiert auf Automotive Security
- ⚡ **Serverless Architecture** - Skalierbar und wartungsarm
- 🎨 **Moderne UI** - React 19 mit responsivem Design

### 1.3 Technische Eckdaten

| Eigenschaft | Wert |
|-------------|------|
| Framework | Next.js 15.5.7 |
| UI Library | React 19.1.0 |
| KI-Backend | OpenAI Assistants API v2 |
| Runtime | Node.js 18+ |
| Deployment | Vercel Serverless |
| Sprache | TypeScript 5 |

---

## 2. ARCHITEKTUR

### 2.1 Systemarchitektur

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT LAYER                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────────────────────────────────────┐     │
│  │         Browser (Client)                     │     │
│  │  ┌────────────────────────────────────┐     │     │
│  │  │  React Components                  │     │     │
│  │  │  - Home / Chat Interface           │     │     │
│  │  │  - Message Display                 │     │     │
│  │  │  - Input Controls                  │     │     │
│  │  └────────────────────────────────────┘     │     │
│  │  ┌────────────────────────────────────┐     │     │
│  │  │  State Management                  │     │     │
│  │  │  - useState (messages, threadId)   │     │     │
│  │  │  - localStorage (persistence)      │     │     │
│  │  └────────────────────────────────────┘     │     │
│  └──────────────────────────────────────────────┘     │
│                         ▼ HTTPS                        │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                   SERVER LAYER                          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────────────────────────────────────┐     │
│  │      Next.js 15 App Router (SSR/API)        │     │
│  │  ┌────────────────────────────────────┐     │     │
│  │  │  API Routes (Serverless Functions) │     │     │
│  │  │  - GET  /api/health                │     │     │
│  │  │  - POST /api/assistants/threads    │     │     │
│  │  │  - POST /api/.../messages          │     │     │
│  │  └────────────────────────────────────┘     │     │
│  │  ┌────────────────────────────────────┐     │     │
│  │  │  Business Logic                    │     │     │
│  │  │  - Thread Management               │     │     │
│  │  │  - Message Processing              │     │     │
│  │  │  - Error Handling                  │     │     │
│  │  └────────────────────────────────────┘     │     │
│  └──────────────────────────────────────────────┘     │
│                         ▼ REST API                     │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                  EXTERNAL SERVICES                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────────────────────────────────────┐     │
│  │         OpenAI Assistants API v2             │     │
│  │  ┌────────────────────────────────────┐     │     │
│  │  │  Threads (Conversations)           │     │     │
│  │  │  Messages (User & Assistant)       │     │     │
│  │  │  Runs (Processing)                 │     │     │
│  │  │  Assistant (AI Model)              │     │     │
│  │  └────────────────────────────────────┘     │     │
│  └──────────────────────────────────────────────┘     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 2.2 Datenfluss

#### Nachricht senden (Message Flow)

```
User Input
    │
    ▼
┌─────────────────────┐
│ 1. Input Component  │ ← User tippt Nachricht
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│ 2. State Update     │ ← setInput(), setMsgs()
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│ 3. API Request      │ ← POST /api/assistants/threads/{id}/messages
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│ 4. Server Handler   │ ← Validate, Process
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│ 5. OpenAI SDK       │ ← Create Message, Create Run
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│ 6. Polling Loop     │ ← Wait for completion (max 90s)
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│ 7. Fetch Response   │ ← Get assistant messages
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│ 8. Return to Client │ ← JSON { thread_id, message }
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│ 9. UI Update        │ ← Display assistant response
└─────────────────────┘
```

### 2.3 Komponentendiagramm

```
app/
├── page.tsx (Main Chat Component)
│   ├── State: threadId, input, msgs, busy
│   ├── Effects: init thread, auto-scroll
│   ├── Handlers: sendMessage, onSend, onKeyDown
│   └── UI: Header, ChatContainer, InputRow
│
├── Chat.module.css (Styling)
│   ├── layout, header
│   ├── chatContainer, messages
│   └── inputRow, sendBtn
│
└── api/
    ├── health/route.ts
    │   └── GET → "ok"
    │
    ├── assistants/threads/route.ts
    │   └── POST → { thread_id }
    │
    └── assistants/threads/[threadId]/messages/route.ts
        └── POST → { thread_id, message }
```

---

## 3. TECHNOLOGIE-STACK

### 3.1 Frontend

| Technologie | Version | Zweck |
|-------------|---------|-------|
| **Next.js** | 15.5.7 | React Framework mit SSR & App Router |
| **React** | 19.1.0 | UI Component Library |
| **React DOM** | 19.1.0 | React Rendering Engine |
| **TypeScript** | ^5 | Type-safe JavaScript |
| **react-markdown** | ^10.1.0 | Markdown Rendering |
| **remark-gfm** | ^4.0.1 | GitHub Flavored Markdown Support |
| **CSS Modules** | - | Scoped Styling |

### 3.2 Backend

| Technologie | Version | Zweck |
|-------------|---------|-------|
| **Node.js** | 18+ | Server Runtime |
| **OpenAI SDK** | ^4.104.0 | OpenAI API Client |
| **Next.js API Routes** | 15.5.7 | Serverless Functions |

### 3.3 Development Tools

| Tool | Version | Zweck |
|------|---------|-------|
| **Tailwind CSS** | ^4.1.13 | Utility-first CSS Framework |
| **PostCSS** | - | CSS Processing |
| **Autoprefixer** | ^10.4.21 | CSS Vendor Prefixes |
| **@types/node** | ^20 | Node.js Type Definitions |
| **@types/react** | ^19 | React Type Definitions |
| **@types/react-dom** | ^19 | React DOM Type Definitions |

### 3.4 Deployment

| Service | Zweck |
|---------|-------|
| **Vercel** | Serverless Hosting Platform |
| **Vercel Edge Network** | Global CDN |
| **Vercel Analytics** | Performance Monitoring (optional) |

---

## 4. INSTALLATION UND SETUP

### 4.1 Voraussetzungen

```bash
# Node.js Version prüfen
node --version  # sollte >= 18.0.0 sein

# npm Version prüfen
npm --version   # sollte >= 8.0.0 sein
```

### 4.2 Repository klonen

```bash
git clone https://github.com/YOUR_ORG/TALIA.git
cd TALIA
```

### 4.3 Abhängigkeiten installieren

```bash
npm install
```

### 4.4 Umgebungsvariablen konfigurieren

1. `.env.example` kopieren:
```bash
cp .env.example .env.local
```

2. `.env.local` bearbeiten:
```bash
# OpenAI Configuration
OPENAI_API_KEY=sk-proj-********************************
OPENAI_ASSISTANT_ID=asst_********************************
```

**Wie bekomme ich diese Werte?**

- **OPENAI_API_KEY**: 
  1. Gehe zu https://platform.openai.com/api-keys
  2. Erstelle einen neuen API Key
  3. Kopiere den Key (Format: `sk-proj-...`)

- **OPENAI_ASSISTANT_ID**:
  1. Gehe zu https://platform.openai.com/assistants
  2. Erstelle einen neuen Assistant oder wähle existierenden
  3. Kopiere die Assistant ID (Format: `asst_...`)

### 4.5 Development Server starten

```bash
npm run dev
```

Application läuft auf: http://localhost:3000

### 4.6 Build testen

```bash
npm run build
npm run start
```

---

## 5. PROJEKTSTRUKTUR

```
TALIA/
├── app/                          # Next.js 15 App Directory
│   ├── api/                      # API Routes (Serverless Functions)
│   │   ├── health/
│   │   │   └── route.ts          # Health Check Endpoint
│   │   └── assistants/
│   │       └── threads/
│   │           ├── route.ts      # Create Thread
│   │           └── [threadId]/
│   │               └── messages/
│   │                   └── route.ts  # Send Message
│   ├── page.tsx                  # Main Chat Page
│   ├── Chat.module.css           # Chat Component Styles
│   ├── layout.tsx                # Root Layout (auto-generated)
│   └── globals.css               # Global Styles
│
├── lib/                          # Shared Libraries
│   └── openai.ts                 # OpenAI Client Factory
│
├── public/                       # Static Assets
│   ├── logo.png                  # TALIA Logo
│   └── ...
│
├── types/                        # TypeScript Type Definitions
│   └── ...
│
├── docs/                         # Documentation
│   ├── LASTENHEFT.md
│   ├── PFLICHTENHEFT.md
│   ├── TECHNISCHE_DOKUMENTATION.md  # Diese Datei
│   ├── KUNDENDOKUMENTATION.md
│   ├── DATENSCHUTZERKLAERUNG.md
│   └── GLOSSAR.md
│
├── scripts/                      # Build & Deployment Scripts
│
├── .env.example                  # Environment Variables Template
├── .env.local                    # Local Environment (nicht in Git!)
├── .gitignore
├── next.config.ts                # Next.js Configuration
├── tsconfig.json                 # TypeScript Configuration
├── tailwind.config.js            # Tailwind CSS Configuration
├── postcss.config.mjs            # PostCSS Configuration
├── package.json                  # Dependencies & Scripts
├── package-lock.json             # Dependency Lock File
├── README.md                     # Project Overview
├── SECURITY_NOTES.md             # Security Documentation
└── DEPENDENCY_ANALYSIS.md        # Dependency Analysis
```

### 5.1 Wichtige Dateien

#### `app/page.tsx`
Hauptkomponente der Chat-Anwendung mit UI und State Management.

#### `app/api/assistants/threads/[threadId]/messages/route.ts`
Kernlogik für Nachrichtenverarbeitung mit OpenAI.

#### `lib/openai.ts`
Factory-Funktion für OpenAI Client (lazy loading).

#### `next.config.ts`
Next.js Konfiguration mit Turbopack-Deaktivierung.

---

## 6. FRONTEND-DOKUMENTATION

### 6.1 Hauptkomponente: Chat (app/page.tsx)

#### State Management

```typescript
// Thread ID für aktuelle Konversation
const [threadId, setThreadId] = useState<string | null>(null);

// User Input
const [input, setInput] = useState("");

// Message History
const [msgs, setMsgs] = useState<ChatMsg[]>([]);

// Processing Status
const [busy, setBusy] = useState(false);
```

#### Lifecycle Hooks

```typescript
// 1. Thread Initialisierung beim Mount
useEffect(() => {
  // Prüfe localStorage
  const saved = window.localStorage.getItem("assistant_thread_id");
  
  if (saved && saved !== "undefined" && saved !== "null") {
    setThreadId(saved);
  } else {
    // Erstelle neuen Thread
    fetch("/api/assistants/threads", { method: "POST" })
      .then(r => r.json())
      .then(j => {
        if (j.thread_id) {
          setThreadId(j.thread_id);
          localStorage.setItem("assistant_thread_id", j.thread_id);
        }
      });
  }
}, []);

// 2. Auto-Scroll zu letzter Nachricht
useEffect(() => {
  bottomRef.current?.scrollIntoView({ behavior: "smooth" });
}, [msgs, busy]);
```

#### Event Handlers

##### sendMessage()
```typescript
async function sendMessage(userText: string, threadIdToUse: string) {
  const res = await fetch(
    `/api/assistants/threads/${threadIdToUse}/messages`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ content: userText }),
    }
  );
  const j = await res.json();
  
  // Fallback: Neue thread_id übernehmen
  if (j.thread_id && j.thread_id !== threadId) {
    setThreadId(j.thread_id);
    localStorage.setItem("assistant_thread_id", j.thread_id);
  }
  
  return j;
}
```

##### onSend()
```typescript
async function onSend() {
  // Validierung
  if (!threadId || !input.trim() || busy) return;
  
  const userText = input.trim();
  setInput("");
  setMsgs(m => [...m, { role: "user", content: userText }]);
  setBusy(true);
  
  try {
    let j = await sendMessage(userText, threadId);
    
    // Error Handling: Thread existiert nicht mehr
    if (j.error && j.error.includes("No thread found")) {
      // Erstelle neuen Thread
      const tRes = await fetch("/api/assistants/threads", { 
        method: "POST" 
      });
      const tJson = await tRes.json();
      
      if (tJson.thread_id) {
        setThreadId(tJson.thread_id);
        localStorage.setItem("assistant_thread_id", tJson.thread_id);
        
        // Versuche Nachricht erneut
        j = await sendMessage(userText, tJson.thread_id);
      }
    }
    
    if (j.error) throw new Error(j.error);
    
    // Erfolg: Antwort anzeigen
    setMsgs(m => [...m, { 
      role: "assistant", 
      content: j.message || "(no content)" 
    }]);
  } catch (e: any) {
    // Fehler anzeigen
    setMsgs(m => [...m, { 
      role: "assistant", 
      content: `Error: ${e?.message ?? e}` 
    }]);
  } finally {
    setBusy(false);
  }
}
```

##### onKeyDown()
```typescript
function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    onSend();
  }
}
```

### 6.2 UI Components

#### Header
```tsx
<header className={styles.header}>
  <Image 
    src="/logo.png" 
    alt="TALIA Logo" 
    width={96} 
    height={96} 
  />
  <div>
    <h1>TALIA</h1>
    <h2>Threat Analysis and Learning Intelligence for Automotive</h2>
  </div>
</header>
```

#### Chat Container
```tsx
<div className={styles.chatContainer}>
  {msgs.length === 0 && (
    <div className={styles.emptyMsg}>
      Write a message to start…
    </div>
  )}
  
  {msgs.map((m, i) => (
    <div key={i} className={
      m.role === "user" ? styles.userMsg : styles.taliaMsg
    }>
      <div className={styles.senderLabel}>
        {m.role === "user" ? "You" : "TALIA"}
      </div>
      <div className={styles.bubble}>
        {m.role === "assistant"
          ? <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {m.content}
            </ReactMarkdown>
          : m.content
        }
      </div>
    </div>
  ))}
  
  {busy && <div className={styles.typingMsg}>TALIA is typing</div>}
  <div ref={bottomRef} />
</div>
```

#### Input Form
```tsx
<form className={styles.inputRow} onSubmit={(e) => {
  e.preventDefault();
  onSend();
}}>
  <textarea
    className={styles.input}
    placeholder="Type a message… (Enter to send, Shift+Enter for new line)"
    value={input}
    onChange={(e) => setInput(e.target.value)}
    onKeyDown={onKeyDown}
  />
  <button
    type="submit"
    disabled={!threadId || busy || !input.trim()}
    className={styles.sendBtn}
  >
    Send
  </button>
</form>
```

### 6.3 Styling (CSS Modules)

Die Anwendung verwendet CSS Modules für isolierte, komponentenbasierte Styles.

**Wichtige CSS-Klassen:**

- `.layout` - Haupt-Container (Flexbox, vertical)
- `.header` - Logo und Titel
- `.main` - Chat-Bereich
- `.chatContainer` - Nachrichtenliste (scrollbar)
- `.userMsg` / `.taliaMsg` - Nachrichtenbubbles
- `.inputRow` - Input-Bereich
- `.sendBtn` - Sende-Button

---

## 7. BACKEND-DOKUMENTATION

### 7.1 OpenAI Client (lib/openai.ts)

```typescript
import OpenAI from "openai";

let cachedClient: OpenAI | null = null;

export async function getOpenAI(): Promise<OpenAI> {
  if (!cachedClient) {
    cachedClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || "",
    });
  }
  return cachedClient;
}
```

**Zweck:** Lazy Loading des OpenAI Clients zur Vermeidung von Build-Problemen.

### 7.2 API Route: Health Check

**Datei:** `app/api/health/route.ts`

```typescript
export async function GET() {
  return new Response("ok", { status: 200 });
}
```

**Verwendung:**
```bash
curl https://your-domain.com/api/health
# Output: ok
```

### 7.3 API Route: Thread erstellen

**Datei:** `app/api/assistants/threads/route.ts`

```typescript
export const runtime = "nodejs";

export async function POST(_req: Request) {
  try {
    const openai = await getOpenAI();
    const thread = await openai.beta.threads.create({});
    return NextResponse.json({ thread_id: thread.id });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message ?? "create thread failed" },
      { status: 500 }
    );
  }
}
```

**Request:**
```bash
POST /api/assistants/threads
Content-Type: application/json
```

**Response:**
```json
{
  "thread_id": "thread_abc123..."
}
```

### 7.4 API Route: Nachricht senden

**Datei:** `app/api/assistants/threads/[threadId]/messages/route.ts`

#### Implementierung

```typescript
export const runtime = "nodejs";

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ threadId: string }> }
) {
  const { threadId } = await context.params;
  
  // 1. Validierung
  if (!threadId) {
    return NextResponse.json(
      { error: "Missing threadId" },
      { status: 400 }
    );
  }
  
  const assistantId = process.env.OPENAI_ASSISTANT_ID;
  if (!assistantId) {
    return NextResponse.json(
      { error: "Missing OPENAI_ASSISTANT_ID" },
      { status: 500 }
    );
  }
  
  // 2. Parse Request Body
  let body: { content: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }
  
  const userText = (body.content ?? "").toString();
  
  // 3. OpenAI Client
  const openai = await getOpenAI();
  let realThreadId = threadId;
  
  // 4. Message erstellen (mit Fallback)
  try {
    await openai.beta.threads.messages.create(realThreadId, {
      role: "user",
      content: userText,
    });
  } catch (err: any) {
    // Fallback: Thread existiert nicht mehr
    if (err.status === 404 && 
        err.message?.includes("No thread found")) {
      const newThread = await openai.beta.threads.create();
      realThreadId = newThread.id;
      await openai.beta.threads.messages.create(realThreadId, {
        role: "user",
        content: userText,
      });
    } else {
      throw err;
    }
  }
  
  // 5. Run erstellen
  const run = await openai.beta.threads.runs.create(realThreadId, {
    assistant_id: assistantId,
  });
  
  // 6. Polling: Warten auf Completion
  const terminal = new Set([
    "completed", "failed", "cancelled", "expired"
  ]);
  let status = run.status;
  let tries = 0;
  
  while (!terminal.has(status) && tries < 90) {
    await sleep(1000);  // 1 Sekunde warten
    const updated = await openai.beta.threads.runs.retrieve(
      realThreadId,
      run.id
    );
    status = updated.status;
    tries++;
  }
  
  if (status !== "completed") {
    return NextResponse.json(
      { error: `Run status: ${status}` },
      { status: 500 }
    );
  }
  
  // 7. Assistant-Nachricht holen
  const list = await openai.beta.threads.messages.list(realThreadId, {
    order: "desc",
    limit: 10,
  });
  
  const assistantMsg = list.data.find(m => m.role === "assistant");
  const text = assistantMsg?.content
    .map(c => (c.type === "text" ? c.text.value : ""))
    .join("\n")
    .trim() ?? "";
  
  // 8. Response
  return NextResponse.json({
    thread_id: realThreadId,
    message: text,
  });
}
```

**Request:**
```bash
POST /api/assistants/threads/thread_abc123/messages
Content-Type: application/json

{
  "content": "What are common attack vectors for connected vehicles?"
}
```

**Response (Success):**
```json
{
  "thread_id": "thread_abc123",
  "message": "Common attack vectors include:\n\n1. **CAN Bus Attacks**..."
}
```

**Response (Error - Thread not found):**
```json
{
  "thread_id": "thread_NEW456",  // Neuer Thread erstellt!
  "message": "..."
}
```

---

## 8. API-REFERENZ

### 8.1 GET /api/health

**Beschreibung:** System Health Check

**Request:**
```http
GET /api/health HTTP/1.1
Host: your-domain.com
```

**Response:**
```http
HTTP/1.1 200 OK
Content-Type: text/plain

ok
```

**Verwendung:**
- Monitoring / Uptime Checks
- Deployment-Verifikation
- Load Balancer Health Probes

---

### 8.2 POST /api/assistants/threads

**Beschreibung:** Erstellt eine neue Konversations-Session (Thread)

**Request:**
```http
POST /api/assistants/threads HTTP/1.1
Host: your-domain.com
Content-Type: application/json
```

**Response (Success):**
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "thread_id": "thread_abc123xyz"
}
```

**Response (Error):**
```http
HTTP/1.1 500 Internal Server Error
Content-Type: application/json

{
  "error": "create thread failed"
}
```

**Verwendung:**
- Beim ersten App-Start
- Nach Sitzungsablauf
- Bei 404-Fehler (Thread nicht mehr vorhanden)

---

### 8.3 POST /api/assistants/threads/:threadId/messages

**Beschreibung:** Sendet eine Nachricht und erhält Antwort vom Assistant

**URL Parameter:**
- `threadId` (string, required) - Thread/Session ID

**Request:**
```http
POST /api/assistants/threads/thread_abc123/messages HTTP/1.1
Host: your-domain.com
Content-Type: application/json

{
  "content": "What is a CAN bus attack?"
}
```

**Response (Success):**
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "thread_id": "thread_abc123",
  "message": "A CAN (Controller Area Network) bus attack is a type of cyber attack..."
}
```

**Response (Thread not found - Auto-Recovery):**
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "thread_id": "thread_NEW789",
  "message": "..."
}
```
*Hinweis: Bei 404 wird automatisch ein neuer Thread erstellt!*

**Response (Error - Missing threadId):**
```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "error": "Missing threadId"
}
```

**Response (Error - Invalid JSON):**
```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "error": "Invalid JSON body"
}
```

**Response (Error - Processing failed):**
```http
HTTP/1.1 500 Internal Server Error
Content-Type: application/json

{
  "error": "Run status: failed"
}
```

**Verwendung:**
- User sendet Nachricht im Chat
- Polling-Mechanismus (max 90s Timeout)
- Automatische Thread-Wiederherstellung

---

## 9. SICHERHEIT

### 9.1 API-Schlüssel-Schutz

**Problem:** API-Schlüssel dürfen nicht im Client-Code erscheinen.

**Lösung:**
1. ✅ Alle OpenAI-Aufrufe nur serverseitig (API Routes)
2. ✅ Umgebungsvariablen in `.env.local` (nicht in Git!)
3. ✅ Vercel Environment Variables für Production

**Konfiguration:**
```bash
# .env.local (NIEMALS committen!)
OPENAI_API_KEY=sk-proj-...
OPENAI_ASSISTANT_ID=asst_...
```

**Vercel Setup:**
1. Dashboard → Project → Settings → Environment Variables
2. Füge beide Variablen hinzu
3. Scope: Production, Preview, Development

### 9.2 Input-Validierung

**Validierungen in API Routes:**

```typescript
// 1. ThreadId vorhanden?
if (!threadId) {
  return NextResponse.json({ error: "Missing threadId" }, { status: 400 });
}

// 2. Assistant ID konfiguriert?
if (!assistantId) {
  return NextResponse.json({ error: "Missing OPENAI_ASSISTANT_ID" }, { status: 500 });
}

// 3. JSON parsing
try {
  body = await req.json();
} catch {
  return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
}

// 4. Content vorhanden
const userText = (body.content ?? "").toString();
```

### 9.3 Error Handling

**Try-Catch-Blöcke:**
```typescript
try {
  // OpenAI API Call
  const result = await openai.beta.threads.messages.create(...);
} catch (err: any) {
  // Spezifische Fehlerbehandlung
  if (err.status === 404) {
    // Thread Recovery
  } else {
    // Generischer Fehler
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
```

### 9.4 Dependency Security

**Regelmäßige Checks:**
```bash
# Sicherheitslücken prüfen
npm audit

# Kritische Fixes anwenden
npm audit fix

# Dependencies aktualisieren
npm outdated
npm update
```

**Bekannte Issues:**
- `node-domexception` - veraltet, aber non-breaking (siehe DEPENDENCY_ANALYSIS.md)

### 9.5 CORS und Headers

**Next.js Default Security Headers:**
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin

**Custom Headers (optional in next.config.ts):**
```typescript
async headers() {
  return [
    {
      source: '/api/:path*',
      headers: [
        { key: 'X-Custom-Header', value: 'TALIA' },
      ],
    },
  ];
}
```

### 9.6 Rate Limiting

**OpenAI Rate Limits:**
- Abhängig vom API-Plan
- Fehlercode 429: Too Many Requests

**Handling:**
```typescript
if (err.status === 429) {
  // Exponential Backoff
  await sleep(2000);
  // Retry logic...
}
```

---

## 10. PERFORMANCE

### 10.1 Ladezeiten

**Messungen:**
- Initial Page Load: < 3s
- Time to Interactive: < 5s
- First Contentful Paint: < 1.5s

**Optimierungen:**
- ✅ Next.js Server-Side Rendering
- ✅ Image Optimization (next/image)
- ✅ Code Splitting (automatisch)
- ✅ CSS Modules (scoped styles)

### 10.2 API Performance

**Message Processing:**
- OpenAI API Response Time: 5-30s (variabel)
- Polling Interval: 1s
- Max Timeout: 90s

**Optimization:**
```typescript
// Lazy Loading des OpenAI Clients
let cachedClient: OpenAI | null = null;

export async function getOpenAI() {
  if (!cachedClient) {
    cachedClient = new OpenAI({ apiKey: ... });
  }
  return cachedClient;
}
```

### 10.3 Client-Side Performance

**State Updates:**
```typescript
// Effiziente Array-Updates
setMsgs(m => [...m, newMessage]);  // Spread statt push

// Debouncing bei Input (optional)
const debouncedInput = useMemo(
  () => debounce(setInput, 100),
  []
);
```

**Auto-Scroll Optimization:**
```typescript
useEffect(() => {
  bottomRef.current?.scrollIntoView({ behavior: "smooth" });
}, [msgs, busy]);  // Nur bei relevanten Changes
```

### 10.4 Caching

**localStorage Caching:**
```typescript
// Thread ID persistieren
localStorage.setItem("assistant_thread_id", threadId);

// Wiederherstellen beim nächsten Besuch
const saved = localStorage.getItem("assistant_thread_id");
```

---

## 11. TESTING

### 11.1 Manuelle Tests

**Testfälle:**

1. **Thread-Erstellung**
   - Öffne App → Thread wird erstellt
   - localStorage sollte `assistant_thread_id` enthalten

2. **Nachricht senden**
   - Tippe Text → Enter
   - User-Nachricht erscheint
   - "TALIA is typing" wird angezeigt
   - Assistant-Antwort erscheint

3. **Thread-Recovery**
   - Lösche Thread in OpenAI Dashboard
   - Sende Nachricht
   - Neuer Thread wird automatisch erstellt

4. **Error Handling**
   - Ungültige API-Keys → Fehlermeldung
   - Netzwerkfehler → Error Message im Chat
   - Timeout → Status-Meldung

### 11.2 API Tests

```bash
# 1. Health Check
curl https://your-domain.com/api/health

# 2. Thread erstellen
curl -X POST https://your-domain.com/api/assistants/threads

# 3. Nachricht senden
curl -X POST \
  https://your-domain.com/api/assistants/threads/thread_abc/messages \
  -H "Content-Type: application/json" \
  -d '{"content":"Test message"}'
```

### 11.3 Browser DevTools

**Console Checks:**
```javascript
// localStorage prüfen
console.log(localStorage.getItem("assistant_thread_id"));

// React Dev Tools
// State Inspection: threadId, msgs, busy
```

**Network Tab:**
- POST /api/assistants/threads → 200
- POST /api/.../messages → 200
- Payload und Response prüfen

### 11.4 Automated Testing (Future)

**Potential Test Frameworks:**
- Jest für Unit Tests
- React Testing Library für Component Tests
- Playwright für E2E Tests

```typescript
// Beispiel: Component Test (nicht implementiert)
test('sends message on Enter key', async () => {
  render(<Home />);
  const input = screen.getByPlaceholderText(/Type a message/);
  
  fireEvent.change(input, { target: { value: 'Test' } });
  fireEvent.keyDown(input, { key: 'Enter' });
  
  expect(await screen.findByText('Test')).toBeInTheDocument();
});
```

---

## 12. DEPLOYMENT

### 12.1 Vercel Deployment (empfohlen)

**Schritt 1: Vercel Account**
1. Gehe zu https://vercel.com
2. Sign up / Login mit GitHub

**Schritt 2: Project importieren**
1. New Project
2. Import Git Repository
3. Wähle TALIA Repo

**Schritt 3: Environment Variables**
```
OPENAI_API_KEY=sk-proj-...
OPENAI_ASSISTANT_ID=asst_...
```
Scope: Production, Preview, Development

**Schritt 4: Deploy**
```bash
# Via Git Push
git push origin main

# Vercel CLI
npx vercel --prod
```

**Schritt 5: Verifikation**
```bash
# Health Check
curl https://your-domain.vercel.app/api/health

# App öffnen
open https://your-domain.vercel.app
```

### 12.2 Build-Konfiguration

**next.config.ts:**
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Turbopack deaktiviert für Kompatibilität
  experimental: {
    turbo: false,
  },
};

export default nextConfig;
```

**package.json Scripts:**
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

### 12.3 Custom Domain (optional)

**Vercel Dashboard:**
1. Project → Settings → Domains
2. Add Domain: `talia.yourcompany.com`
3. Configure DNS (CNAME)
4. SSL automatisch via Let's Encrypt

### 12.4 Alternative Deployment (Self-Hosted)

**Docker (Beispiel):**
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]
```

**Build & Run:**
```bash
docker build -t talia .
docker run -p 3000:3000 \
  -e OPENAI_API_KEY=sk-... \
  -e OPENAI_ASSISTANT_ID=asst_... \
  talia
```

---

## 13. MONITORING UND LOGGING

### 13.1 Vercel Analytics

**Setup:**
```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

**Metriken:**
- Page Views
- Load Times
- Visitor Analytics

### 13.2 Application Logs

**Console Logging (Development):**
```typescript
console.log("Assistant Rohantwort:", j.message);
```

**Vercel Logs (Production):**
```bash
# Vercel CLI
npx vercel logs

# Dashboard
# Project → Deployments → Logs
```

### 13.3 Error Tracking (optional)

**Sentry Integration:**
```bash
npm install @sentry/nextjs
npx @sentry/wizard -i nextjs
```

**sentry.client.config.ts:**
```typescript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://...@sentry.io/...",
  tracesSampleRate: 1.0,
});
```

### 13.4 OpenAI Usage Monitoring

**OpenAI Dashboard:**
1. https://platform.openai.com/usage
2. Monitor:
   - API Calls
   - Token Usage
   - Costs
   - Rate Limits

---

## 14. TROUBLESHOOTING

### 14.1 Häufige Probleme

#### Problem: "Missing OPENAI_API_KEY"

**Symptom:** API gibt 500 Error zurück

**Lösung:**
1. Prüfe `.env.local`:
   ```bash
   cat .env.local
   ```
2. Stelle sicher, dass Variablen gesetzt sind
3. Restart Dev Server:
   ```bash
   npm run dev
   ```

---

#### Problem: "No thread found" (404)

**Symptom:** Thread existiert nicht mehr

**Lösung:**
- ✅ Automatisch gelöst durch Fallback-Mechanismus
- Neuer Thread wird erstellt
- Nachricht wird erneut gesendet

---

#### Problem: Timeout beim Message Senden

**Symptom:** Request dauert >90s, dann Fehler

**Mögliche Ursachen:**
- OpenAI API überlastet
- Komplexe Anfrage benötigt mehr Zeit
- Netzwerkprobleme

**Lösung:**
1. Erhöhe Timeout (in route.ts):
   ```typescript
   while (!terminal.has(status) && tries < 120) {  // 120s statt 90s
     await sleep(1000);
     // ...
   }
   ```
2. Oder: Implementiere Streaming-Response

---

#### Problem: Build-Fehler "Cannot find module 'openai'"

**Symptom:** Build schlägt fehl mit OpenAI Import-Error

**Lösung:**
- ✅ Bereits gelöst durch lazy loading in `lib/openai.ts`
- Stelle sicher, dass `runtime = "nodejs"` in API Routes gesetzt ist

---

#### Problem: localStorage wird nicht gespeichert

**Symptom:** Thread ID geht bei Reload verloren

**Ursachen:**
- Browser im Incognito-Modus
- localStorage disabled
- Browser-Einstellungen blockieren Cookies/Storage

**Lösung:**
1. Prüfe Browser-Settings
2. Erlaube localStorage für Domain
3. Verwende normalen Browser-Modus

---

#### Problem: CSS Styles werden nicht geladen

**Symptom:** Unstyled Content

**Lösung:**
1. Prüfe Import in page.tsx:
   ```typescript
   import styles from "./Chat.module.css";
   ```
2. Clear Next.js Cache:
   ```bash
   rm -rf .next
   npm run dev
   ```

---

### 14.2 Debug-Strategien

**1. Console Logging**
```typescript
console.log("DEBUG: threadId =", threadId);
console.log("DEBUG: API Response =", JSON.stringify(response, null, 2));
```

**2. React DevTools**
- Install React DevTools Browser Extension
- Inspect Component State
- Check Props und Hooks

**3. Network Tab**
- Inspect API Requests
- Check Request/Response Payloads
- Monitor Timing

**4. Vercel Logs**
```bash
npx vercel logs --follow
```

---

### 14.3 Support und Hilfe

**Ressourcen:**
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [OpenAI API Docs](https://platform.openai.com/docs)
- [Vercel Support](https://vercel.com/support)

**Community:**
- Next.js Discord
- Stack Overflow (Tag: nextjs, openai)
- GitHub Issues

---

## ANHANG

### A. Versions-Historie

| Version | Datum | Änderungen |
|---------|-------|------------|
| 1.0 | 27.01.2026 | Initiale Version |

### B. Mitwirkende

- Entwicklungsteam TALIA
- Natashick (Projektleitung)

### C. Lizenz

MIT License

---

**Ende der Technischen Dokumentation**