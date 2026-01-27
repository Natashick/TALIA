# PFLICHTENHEFT
## Technische Spezifikation für das System TALIA
### Threat Analysis and Learning Intelligence for Automotive

---

**Dokumentversion:** 1.0  
**Datum:** 27.01.2026  
**Status:** Genehmigt  
**Autor:** Entwicklungsteam TALIA  
**Projekt:** TALIA - KI-gestützter Assistent für Automotive Sicherheitsanalyse

---

## Inhaltsverzeichnis

1. [Einleitung](#1-einleitung)
2. [Systemarchitektur](#2-systemarchitektur)
3. [Detaillierte technische Spezifikation](#3-detaillierte-technische-spezifikation)
4. [Datenmodelle und Strukturen](#4-datenmodelle-und-strukturen)
5. [Algorithmen und Prozessabläufe](#5-algorithmen-und-prozessabläufe)
6. [Technologie-Stack](#6-technologie-stack)
7. [Sicherheitskonzept](#7-sicherheitskonzept)
8. [Performance-Optimierung](#8-performance-optimierung)
9. [Fehlerbehandlung](#9-fehlerbehandlung)
10. [Testing-Strategie](#10-testing-strategie)
11. [Deployment-Spezifikation](#11-deployment-spezifikation)
12. [Wartung und Support](#12-wartung-und-support)

---

## 1. EINLEITUNG

### 1.1 Zweck und Zielsetzung

Das **PFLICHTENHEFT** definiert die technische Umsetzung der im [LASTENHEFT](./LASTENHEFT.md) beschriebenen Anforderungen. Es bildet die Grundlage für die Implementierung und dient als Referenzdokument für Entwickler, Architekten und Projektmanager.

### 1.2 Bezug zum Lastenheft

Dieses Dokument setzt die Anforderungen aus dem LASTENHEFT in konkrete technische Spezifikationen um:
- Funktionale Anforderungen (FA) → Technische Implementierung
- Nicht-funktionale Anforderungen (NFA) → Architekturentscheidungen
- Systemanforderungen → Technologie-Stack

### 1.3 Gültigkeitsbereich

- **Gültig für:** TALIA Version 1.0
- **Plattform:** Next.js 15.5.7+ mit React 19.1.0+
- **Deployment:** Vercel Serverless Platform
- **KI-Backend:** OpenAI Assistants API v2

---

## 2. SYSTEMARCHITEKTUR

### 2.1 Überblick

TALIA basiert auf einer modernen Serverless-Architektur mit klarer Trennung zwischen Client und Server.

```
┌─────────────────────────────────────────────────────────────┐
│                        TALIA SYSTEM                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐         ┌──────────────┐                │
│  │   Browser    │ ◄─────► │  Next.js 15  │                │
│  │  (Client)    │  HTTPS  │  App Router  │                │
│  └──────────────┘         └──────┬───────┘                │
│                                   │                         │
│                           ┌───────▼────────┐               │
│                           │  API Routes    │               │
│                           │  (Server)      │               │
│                           └───────┬────────┘               │
│                                   │                         │
│                           ┌───────▼────────┐               │
│                           │  OpenAI SDK    │               │
│                           │   v4.104.0     │               │
│                           └───────┬────────┘               │
│                                   │                         │
│                                   │ API Calls               │
│                                   ▼                         │
│                          ┌─────────────────┐               │
│                          │  OpenAI API     │               │
│                          │  Assistants v2  │               │
│                          └─────────────────┘               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Architekturprinzipien

#### 2.2.1 Schichtenarchitektur

```
┌────────────────────────────────────────┐
│  Präsentationsschicht (Presentation)   │
│  - React Components                    │
│  - UI State Management                 │
│  - Client-Side Logic                   │
└──────────────┬─────────────────────────┘
               │ HTTP/REST
┌──────────────▼─────────────────────────┐
│  API-Schicht (API Layer)               │
│  - Route Handlers                      │
│  - Request Validation                  │
│  - Response Formatting                 │
└──────────────┬─────────────────────────┘
               │ Function Calls
┌──────────────▼─────────────────────────┐
│  Business Logic Layer                  │
│  - Thread Management                   │
│  - Message Processing                  │
│  - Error Handling                      │
└──────────────┬─────────────────────────┘
               │ SDK Calls
┌──────────────▼─────────────────────────┐
│  Integration Layer                     │
│  - OpenAI SDK Wrapper                  │
│  - External API Communication          │
└────────────────────────────────────────┘
```

#### 2.2.2 Datenfluss

**Benutzer sendet Nachricht:**
```
Browser → POST /api/assistants/threads/:id/messages
         ↓
API Route validiert Request
         ↓
OpenAI SDK: Create Message
         ↓
OpenAI SDK: Create Run
         ↓
Polling Loop (max 90s)
         ↓
OpenAI SDK: Retrieve Messages
         ↓
API Route formatiert Response
         ↓
Browser erhält Antwort
```

### 2.3 Komponentenarchitektur

```
app/
├── page.tsx (Client Component)
│   ├── State Management
│   ├── Event Handlers
│   └── UI Rendering
├── Chat.module.css
│   └── Component Styling
└── api/
    ├── health/route.ts
    ├── assistants/
    │   └── threads/
    │       ├── route.ts (Create Thread)
    │       └── [threadId]/
    │           └── messages/
    │               └── route.ts (Send Message)
    └── middleware (Implicit)
```

### 2.4 Deployment-Architektur

```
┌─────────────────────────────────────────────────┐
│             Vercel Platform                     │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌────────────┐      ┌────────────┐           │
│  │ Edge CDN   │ ───► │  Static    │           │
│  │ (Global)   │      │  Assets    │           │
│  └────────────┘      └────────────┘           │
│                                                 │
│  ┌────────────────────────────────┐           │
│  │  Serverless Functions          │           │
│  │  (Runtime: nodejs)              │           │
│  │  - /api/health                  │           │
│  │  - /api/assistants/threads      │           │
│  │  - /api/assistants/threads/.../messages│   │
│  └────────────────────────────────┘           │
│                                                 │
│  ┌────────────────────────────────┐           │
│  │  Environment Variables          │           │
│  │  - OPENAI_API_KEY               │           │
│  │  - OPENAI_ASSISTANT_ID          │           │
│  └────────────────────────────────┘           │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 3. DETAILLIERTE TECHNISCHE SPEZIFIKATION

### 3.1 Frontend-Spezifikation

#### 3.1.1 Hauptkomponente: page.tsx

**Technische Details:**
- **Typ:** Client Component (`"use client"`)
- **Framework:** React 19.1.0 mit Hooks
- **Sprache:** TypeScript 5.x

**State Management:**
```typescript
interface ChatState {
  threadId: string | null;      // OpenAI Thread ID
  input: string;                 // Aktuelle Benutzereingabe
  msgs: ChatMsg[];              // Nachrichtenverlauf
  busy: boolean;                // Verarbeitungsstatus
}

type ChatMsg = {
  role: "user" | "assistant";
  content: string;
};
```

**Hooks-Verwendung:**
```typescript
// Thread-Initialisierung
useEffect(() => {
  // localStorage-Check
  // Auto-create Thread falls nicht vorhanden
}, []);

// Auto-Scroll
useEffect(() => {
  // Scroll zu letzter Nachricht
}, [msgs, busy]);
```

#### 3.1.2 Event-Handling

**Nachricht senden:**
```typescript
async function onSend() {
  1. Validierung (threadId, input, busy)
  2. State-Update (msgs, input, busy)
  3. API-Call
  4. Fehlerbehandlung (404 → neuer Thread)
  5. State-Update (msgs, busy)
}
```

**Tastatur-Shortcuts:**
- `Enter` → Nachricht senden
- `Shift + Enter` → Neue Zeile

#### 3.1.3 UI-Komponenten

**Chat-Container:**
- Flexible Höhe mit Overflow-Scroll
- Auto-Scroll zu neuester Nachricht
- Empty State für leeren Chat

**Nachrichtenblasen:**
- User: Rechts ausgerichtet, Brand-Farbe
- Assistant: Links ausgerichtet, neutrale Farbe
- Markdown-Rendering mit `react-markdown` + `remark-gfm`

**Eingabefeld:**
- `<textarea>` für Mehrzeilen-Eingabe
- Placeholder mit Hinweis
- Disabled-State während Verarbeitung

### 3.2 Backend-Spezifikation

#### 3.2.1 API-Route: Health Check

**Endpunkt:** `GET /api/health`

**Spezifikation:**
```typescript
export async function GET() {
  return new Response("ok", { status: 200 });
}
```

**Zweck:** Monitoring und Availability-Check

**Response:**
- Status: `200 OK`
- Body: `"ok"` (plain text)

#### 3.2.2 API-Route: Thread-Erstellung

**Endpunkt:** `POST /api/assistants/threads`

**Runtime:** `nodejs` (wichtig für OpenAI SDK)

**Spezifikation:**
```typescript
export async function POST(_req: Request) {
  const openai = await getOpenAI();
  const thread = await openai.beta.threads.create({});
  return NextResponse.json({ thread_id: thread.id });
}
```

**Request:**
- Methode: `POST`
- Body: Keiner erforderlich

**Response:**
```json
{
  "thread_id": "thread_xxxxxxxxxxxxxxxxxxxxxx"
}
```

**Fehlerbehandlung:**
```json
{
  "error": "create thread failed"
}
```
- Status: `500`

#### 3.2.3 API-Route: Nachricht senden

**Endpunkt:** `POST /api/assistants/threads/:threadId/messages`

**Runtime:** `nodejs`

**Request:**
```json
{
  "content": "Benutzer-Nachricht"
}
```

**Prozessablauf:**

1. **Parameter-Extraktion**
   ```typescript
   const { threadId } = await context.params;
   const { content } = await req.json();
   ```

2. **Validierung**
   - threadId vorhanden
   - OPENAI_ASSISTANT_ID gesetzt
   - content ist String

3. **Message Creation mit Fallback**
   ```typescript
   try {
     await openai.beta.threads.messages.create(threadId, {
       role: "user",
       content: userText
     });
   } catch (err) {
     if (err.status === 404) {
       // Neuen Thread erstellen
       const newThread = await openai.beta.threads.create();
       realThreadId = newThread.id;
       // Nachricht erneut senden
     }
   }
   ```

4. **Run Creation**
   ```typescript
   const run = await openai.beta.threads.runs.create(realThreadId, {
     assistant_id: assistantId
   });
   ```

5. **Status-Polling**
   ```typescript
   const terminal = new Set(["completed", "failed", "cancelled", "expired"]);
   let status = run.status;
   let tries = 0;
   
   while (!terminal.has(status) && tries < 90) {
     await sleep(1000);
     const updated = await openai.beta.threads.runs.retrieve(
       realThreadId,
       run.id
     );
     status = updated.status;
     tries++;
   }
   ```

6. **Message Retrieval**
   ```typescript
   const list = await openai.beta.threads.messages.list(realThreadId, {
     order: "desc",
     limit: 10
   });
   const assistantMsg = list.data.find(m => m.role === "assistant");
   ```

**Response:**
```json
{
  "thread_id": "thread_xxx",
  "message": "Assistenten-Antwort"
}
```

**Fehler-Responses:**
- `400`: Missing threadId, Invalid JSON
- `500`: Missing OPENAI_ASSISTANT_ID, OpenAI errors, Timeout

### 3.3 OpenAI-Integration

#### 3.3.1 SDK-Initialisierung

**Datei:** `lib/openai.ts`

```typescript
// Lazy Loading für Build-Kompatibilität
let openai: OpenAI | null = null;

export async function getOpenAI() {
  if (!openai) {
    const { default: OpenAI } = await import("openai");
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }
  return openai;
}
```

**Vorteile:**
- Vermeidet Build-Probleme mit Serverless
- Reduziert Cold-Start-Zeit
- Singleton-Pattern

#### 3.3.2 Assistants API v2

**Verwendete Endpoints:**
- `POST /v1/threads` - Thread erstellen
- `POST /v1/threads/{thread_id}/messages` - Nachricht hinzufügen
- `POST /v1/threads/{thread_id}/runs` - Run starten
- `GET /v1/threads/{thread_id}/runs/{run_id}` - Run-Status abrufen
- `GET /v1/threads/{thread_id}/messages` - Nachrichten abrufen

**Konfiguration:**
- Assistant muss vorab in OpenAI Platform erstellt werden
- Assistant-ID als Environment Variable
- Instruktionen und Modell in OpenAI Platform konfiguriert

---

## 4. DATENMODELLE UND STRUKTUREN

### 4.1 Client-Datenmodelle

#### 4.1.1 ChatMessage

```typescript
type ChatMsg = {
  role: "user" | "assistant";
  content: string;
};
```

**Verwendung:** Lokale Darstellung des Chatverlaufs

**Beispiel:**
```typescript
[
  { role: "user", content: "Was ist TARA?" },
  { role: "assistant", content: "TARA steht für..." }
]
```

#### 4.1.2 LocalStorage-Daten

**Key:** `assistant_thread_id`  
**Value:** String (thread_xxx)

**Persistenz:**
```typescript
// Speichern
window.localStorage.setItem("assistant_thread_id", threadId);

// Laden
const saved = window.localStorage.getItem("assistant_thread_id");

// Löschen (bei Fehler)
window.localStorage.removeItem("assistant_thread_id");
```

### 4.2 API-Datenmodelle

#### 4.2.1 Thread-Response

```typescript
interface ThreadResponse {
  thread_id: string;
}
```

#### 4.2.2 Message-Request

```typescript
interface MessageRequest {
  content: string;
}
```

#### 4.2.3 Message-Response

```typescript
interface MessageResponse {
  thread_id: string;    // Kann sich ändern bei Fallback
  message: string;
}
```

#### 4.2.4 Error-Response

```typescript
interface ErrorResponse {
  error: string;
}
```

### 4.3 OpenAI-Datenstrukturen

#### 4.3.1 Thread Object

```typescript
{
  id: "thread_xxxxxxxxxxxxxxxxxxxxxx",
  object: "thread",
  created_at: 1234567890,
  metadata: {}
}
```

#### 4.3.2 Message Object

```typescript
{
  id: "msg_xxxxxxxxxxxxxxxxxxxxxx",
  object: "thread.message",
  created_at: 1234567890,
  thread_id: "thread_xxx",
  role: "user" | "assistant",
  content: [
    {
      type: "text",
      text: {
        value: "Nachrichtentext",
        annotations: []
      }
    }
  ]
}
```

#### 4.3.3 Run Object

```typescript
{
  id: "run_xxxxxxxxxxxxxxxxxxxxxx",
  object: "thread.run",
  created_at: 1234567890,
  thread_id: "thread_xxx",
  assistant_id: "asst_xxx",
  status: "queued" | "in_progress" | "completed" | 
          "failed" | "cancelled" | "expired",
  started_at: number | null,
  completed_at: number | null
}
```

---

## 5. ALGORITHMEN UND PROZESSABLÄUFE

### 5.1 Thread-Initialisierung

```
START
  │
  ├─► localStorage prüfen
  │     │
  │     ├─► Thread-ID vorhanden?
  │     │     │
  │     │     ├─► JA: Thread-ID setzen
  │     │     │
  │     │     └─► NEIN: API-Call
  │                 │
  │                 └─► POST /api/assistants/threads
  │                       │
  │                       ├─► Erfolg
  │                       │     │
  │                       │     ├─► Thread-ID setzen
  │                       │     └─► In localStorage speichern
  │                       │
  │                       └─► Fehler
  │                             └─► (Nutzer kann nicht senden)
  │
END
```

### 5.2 Nachricht-Sende-Prozess

```
START: onSend()
  │
  ├─► Validierung
  │     ├─► threadId vorhanden?
  │     ├─► input nicht leer?
  │     └─► busy = false?
  │
  ├─► State-Update
  │     ├─► input leeren
  │     ├─► Nachricht zu msgs hinzufügen
  │     └─► busy = true
  │
  ├─► API-Call
  │     │
  │     └─► POST /api/assistants/threads/:threadId/messages
  │           │
  │           ├─► Erfolg
  │           │     │
  │           │     ├─► Thread-ID-Update prüfen
  │           │     └─► Antwort zu msgs hinzufügen
  │           │
  │           └─► Fehler
  │                 │
  │                 ├─► 404 (Thread nicht gefunden)?
  │                 │     │
  │                 │     ├─► localStorage löschen
  │                 │     ├─► Neuen Thread erstellen
  │                 │     ├─► Nachricht erneut senden
  │                 │     └─► Zurück zu "Erfolg"
  │                 │
  │                 └─► Anderer Fehler
  │                       └─► Fehlermeldung zu msgs
  │
  ├─► State-Update
  │     └─► busy = false
  │
END
```

### 5.3 Run-Polling-Algorithmus

```typescript
function pollRunStatus(threadId, runId) {
  const TERMINAL_STATES = ["completed", "failed", "cancelled", "expired"];
  const MAX_TRIES = 90;
  const POLL_INTERVAL = 1000; // ms
  
  let tries = 0;
  let status = initial_status;
  
  while (!TERMINAL_STATES.includes(status) && tries < MAX_TRIES) {
    await sleep(POLL_INTERVAL);
    
    const run = await openai.beta.threads.runs.retrieve(threadId, runId);
    status = run.status;
    tries++;
  }
  
  return status;
}
```

**Zeitkomplexität:** O(n) wobei n ≤ 90  
**Maximale Dauer:** 90 Sekunden  
**Durchschnittliche Dauer:** 5-30 Sekunden

### 5.4 Fehlerbehandlungs-Strategie

```
API-Call
  │
  ├─► try {
  │     API-Aufruf
  │   }
  │
  └─► catch (error) {
        │
        ├─► error.status === 404
        │     └─► Thread Recreation Flow
        │
        ├─► error.status === 500
        │     └─► User Error Message
        │
        ├─► error.status === 400
        │     └─► Validation Error
        │
        └─► Unknown Error
              └─► Generic Error Message
      }
```

---

## 6. TECHNOLOGIE-STACK

### 6.1 Frontend-Technologien

| Technologie | Version | Zweck |
|------------|---------|-------|
| **Next.js** | 15.5.7 | React Framework, SSR, Routing |
| **React** | 19.1.0 | UI Library, Component Architecture |
| **React DOM** | 19.1.0 | React Renderer für Browser |
| **TypeScript** | 5.x | Type Safety, Developer Experience |
| **react-markdown** | 10.1.0 | Markdown → React Components |
| **remark-gfm** | 4.0.1 | GitHub Flavored Markdown Support |
| **TailwindCSS** | 4.1.13 | Utility-First CSS (Dev Dependency) |
| **CSS Modules** | Built-in | Component-Scoped Styling |

### 6.2 Backend-Technologien

| Technologie | Version | Zweck |
|------------|---------|-------|
| **Node.js** | 18+ | Runtime Environment |
| **OpenAI SDK** | 4.104.0 | OpenAI API Client |
| **Next.js API Routes** | 15.5.7 | Serverless Functions |

### 6.3 Entwicklungs-Tools

| Tool | Version | Zweck |
|------|---------|-------|
| **npm** | Latest | Package Management |
| **TypeScript Compiler** | 5.x | Type Checking, Transpilation |
| **@types/node** | 20.x | Node.js Type Definitions |
| **@types/react** | 19.x | React Type Definitions |
| **autoprefixer** | 10.4.21 | CSS Vendor Prefixes |

### 6.4 Deployment-Plattform

**Vercel:**
- **Serverless Functions:** Node.js 18.x Runtime
- **Edge Network:** Global CDN
- **Build System:** Native Next.js Support
- **Environment Variables:** Encrypted Storage

### 6.5 Externe Dienste

**OpenAI Platform:**
- **API Version:** v1
- **Modell:** Konfiguriert in Assistant
- **Endpoints:** https://api.openai.com/v1/

### 6.6 Technologie-Entscheidungen

#### 6.6.1 Warum Next.js 15?

- ✅ **App Router:** Moderne Routing-Architektur
- ✅ **Server Components:** Performance-Optimierung
- ✅ **API Routes:** Integriertes Backend
- ✅ **Vercel-Integration:** Nahtloses Deployment

#### 6.6.2 Warum React 19?

- ✅ **Hooks:** Modernes State Management
- ✅ **Concurrent Features:** Bessere Performance
- ✅ **Suspense:** Async Rendering

#### 6.6.3 Warum OpenAI Assistants API?

- ✅ **Thread-basiert:** Kontext-Management inklusive
- ✅ **Stateful:** Kein manuelles Session-Handling
- ✅ **Skalierbar:** Von OpenAI verwaltet

#### 6.6.4 Warum keine Datenbank?

- ✅ **Simplicity:** Weniger Komplexität
- ✅ **Serverless-Friendly:** Keine Verbindungs-Pools
- ✅ **Cost-Effective:** Keine DB-Hosting-Kosten
- ⚠️ **Trade-off:** Verlust bei Browser-Daten-Löschung

---

## 7. SICHERHEITSKONZEPT

### 7.1 API-Schlüssel-Schutz

**Implementierung:**

```typescript
// ❌ FALSCH - Client-seitig
const apiKey = process.env.NEXT_PUBLIC_OPENAI_KEY;

// ✅ RICHTIG - Server-seitig
// In API Route:
const apiKey = process.env.OPENAI_API_KEY;
```

**Maßnahmen:**
1. API-Schlüssel nur in Server-Umgebung
2. Keine `NEXT_PUBLIC_` Prefix für Secrets
3. Environment Variables in Vercel verschlüsselt
4. Kein Commit von `.env.local`

### 7.2 Input-Validierung

**Client-Seite:**
```typescript
if (!input.trim() || busy) return;
```

**Server-Seite:**
```typescript
// Thread-ID Validierung
if (!threadId) {
  return NextResponse.json(
    { error: "Missing threadId" },
    { status: 400 }
  );
}

// Content Validierung
const userText = (body.content ?? "").toString();
if (!userText.trim()) {
  return NextResponse.json(
    { error: "Empty content" },
    { status: 400 }
  );
}
```

### 7.3 XSS-Schutz

**Markdown-Rendering:**
```typescript
// react-markdown sanitiert automatisch
<ReactMarkdown remarkPlugins={[remarkGfm]}>
  {m.content}
</ReactMarkdown>
```

**Keine `dangerouslySetInnerHTML`**

### 7.4 Rate Limiting

**Problem:** Aktuell keine Implementierung

**Empfehlung:**
```typescript
// Vercel Rate Limiting (in vercel.json)
{
  "functions": {
    "api/**/*.ts": {
      "memory": 1024,
      "maxDuration": 60
    }
  }
}
```

### 7.5 CORS-Konfiguration

**Standard Next.js:**
- Same-Origin für API Routes
- Keine zusätzliche CORS-Konfiguration nötig

### 7.6 HTTPS-Erzwingung

**Vercel:**
- Automatische HTTPS-Umleitung
- Kostenlose SSL-Zertifikate
- HTTP/2 Support

### 7.7 Dependency-Sicherheit

**Prozess:**
```bash
# Regelmäßig ausführen
npm audit

# Automatische Fixes
npm audit fix

# CVE-Monitoring
# Siehe SECURITY_NOTES.md
```

**Kritische Schwachstellen:**
- Sofortiges Update
- Deployment innerhalb 24h
- Kommunikation an Stakeholder

### 7.8 Error-Informationen

**Implementierung:**
```typescript
catch (e: any) {
  console.error("Internal Error:", e); // Server-Log
  
  return NextResponse.json(
    { error: "Internal server error" }, // Generische Nachricht
    { status: 500 }
  );
}
```

**Vermeiden:**
- Stack Traces in Production
- Interne Pfade
- Datenbank-Details
- API-Schlüssel

---

## 8. PERFORMANCE-OPTIMIERUNG

### 8.1 Frontend-Optimierungen

#### 8.1.1 Code-Splitting

**Automatisch durch Next.js:**
- Page-basiertes Splitting
- Dynamic Imports für große Components

**Implementierung:**
```typescript
// Lazy Loading für Heavy Components
const HeavyComponent = dynamic(() => import('./HeavyComponent'));
```

#### 8.1.2 Image-Optimierung

**Next.js Image Component:**
```typescript
<Image 
  src="/logo.png" 
  alt="TALIA Logo" 
  width={96} 
  height={96}
  quality={100}
  priority
  sizes="96px"
/>
```

**Vorteile:**
- Automatische Format-Konvertierung (WebP)
- Lazy Loading
- Responsive Images

#### 8.1.3 CSS-Optimierung

**Strategie:**
- CSS Modules für Component Styles
- Minimale globale Styles
- CSS-in-JS vermeiden (Performance)

#### 8.1.4 React-Optimierungen

**Memoization:**
```typescript
// Bei Bedarf für teure Berechnungen
const memoizedValue = useMemo(() => {
  return expensiveCalculation(data);
}, [data]);

// Für Callbacks
const handleClick = useCallback(() => {
  // ...
}, [dependencies]);
```

### 8.2 Backend-Optimierungen

#### 8.2.1 Lazy Loading von OpenAI SDK

```typescript
// Reduiert Cold-Start-Zeit
export async function getOpenAI() {
  if (!openai) {
    const { default: OpenAI } = await import("openai");
    openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return openai;
}
```

#### 8.2.2 Polling-Optimierung

**Aktuell:**
- Intervall: 1 Sekunde
- Max: 90 Versuche

**Optimierung möglich:**
```typescript
// Exponential Backoff
const delays = [500, 1000, 1000, 2000, 2000, ...];
```

#### 8.2.3 Response-Kompression

**Vercel:**
- Automatische Gzip/Brotli-Kompression
- Für Responses > 1KB

### 8.3 Caching-Strategie

#### 8.3.1 Client-Side Caching

**localStorage:**
- Thread-ID persistent
- Überlebt Page-Reloads

**In-Memory:**
- Nachrichtenverlauf in React State
- Verloren bei Reload

#### 8.3.2 Server-Side Caching

**Nicht implementiert (Stateless API)**

**Mögliche Verbesserung:**
```typescript
// Redis für Thread-Metadaten
const threadMetadata = await redis.get(`thread:${threadId}`);
```

### 8.4 Network-Optimierungen

#### 8.4.1 HTTP/2

- Automatisch durch Vercel
- Multiplexing
- Header-Kompression

#### 8.4.2 Prefetching

**Next.js:**
- Automatisches Prefetching von Links
- Für SPA-Navigation

### 8.5 Monitoring

**Metriken:**
- Time to First Byte (TTFB)
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Time to Interactive (TTI)

**Tools:**
- Vercel Analytics
- Chrome DevTools
- Lighthouse

---

## 9. FEHLERBEHANDLUNG

### 9.1 Frontend-Fehlerbehandlung

#### 9.1.1 API-Call-Fehler

```typescript
try {
  const j = await sendMessage(userText, threadId);
  
  // 404 Thread Not Found
  if (j.error && j.error.includes("No thread found")) {
    // Thread-Recreation Flow
  }
  
  if (j.error) throw new Error(j.error);
  
} catch (e: any) {
  setMsgs(m => [
    ...m, 
    { role: "assistant", content: `Error: ${e?.message ?? e}` }
  ]);
}
```

#### 9.1.2 Network-Fehler

**Symptom:** `fetch()` schlägt fehl

**Behandlung:**
```typescript
catch (e) {
  if (e instanceof TypeError) {
    // Network Error
    setMsgs(m => [...m, { 
      role: "assistant", 
      content: "Network error. Please check your connection." 
    }]);
  }
}
```

#### 9.1.3 State-Konsistenz

**Problem:** State-Updates bei Fehler

**Lösung:**
```typescript
finally {
  setBusy(false); // Immer ausführen
}
```

### 9.2 Backend-Fehlerbehandlung

#### 9.2.1 OpenAI-API-Fehler

```typescript
catch (err: any) {
  if (err.status === 404) {
    // Thread existiert nicht
    // → Fallback: Neuen Thread erstellen
  }
  
  if (err.status === 429) {
    // Rate Limit
    return NextResponse.json(
      { error: "Rate limit exceeded. Please try again later." },
      { status: 429 }
    );
  }
  
  if (err.status >= 500) {
    // OpenAI Server Error
    return NextResponse.json(
      { error: "OpenAI service unavailable" },
      { status: 503 }
    );
  }
}
```

#### 9.2.2 Timeout-Handling

```typescript
if (tries >= 90) {
  return NextResponse.json(
    { error: "Request timeout. The assistant is taking too long." },
    { status: 504 }
  );
}
```

#### 9.2.3 Validierungs-Fehler

```typescript
if (!threadId) {
  return NextResponse.json(
    { error: "Missing threadId" },
    { status: 400 }
  );
}

if (!body.content) {
  return NextResponse.json(
    { error: "Missing content" },
    { status: 400 }
  );
}
```

### 9.3 Fehler-Logging

#### 9.3.1 Server-Side

```typescript
catch (e: any) {
  console.error("[API Error]", {
    endpoint: "/api/assistants/threads/:threadId/messages",
    threadId,
    error: e.message,
    stack: e.stack
  });
  
  return NextResponse.json(
    { error: "Internal server error" },
    { status: 500 }
  );
}
```

#### 9.3.2 Client-Side

```typescript
catch (e: any) {
  console.error("Send message failed:", e);
  // User-Feedback in UI
}
```

**Vercel Logs:**
- Automatisches Logging aller Console-Ausgaben
- Zugriff über Vercel Dashboard

### 9.4 Graceful Degradation

**Prinzip:** System bleibt benutzbar auch bei Teilausfällen

**Beispiele:**

1. **Thread-Recreation bei 404**
   - Transparenter Neustart
   - Nachricht geht nicht verloren

2. **UI-Feedback bei Errors**
   - Fehlermeldung als Chat-Nachricht
   - Kein kompletter App-Crash

3. **localStorage-Fallback**
   - Funktioniert auch ohne gespeicherte Thread-ID

---

## 10. TESTING-STRATEGIE

### 10.1 Testpyramide

```
         ┌─────────┐
         │   E2E   │      Wenige, kritische Flows
         └─────────┘
       ┌───────────────┐
       │ Integration   │    API-Tests, Component-Integration
       └───────────────┘
   ┌───────────────────────┐
   │     Unit Tests         │  Funktionen, Utilities
   └───────────────────────┘
```

### 10.2 Unit-Tests

**Scope:** Einzelne Funktionen

**Beispiel:**
```typescript
// lib/utils.test.ts
describe("sleep", () => {
  it("should delay execution", async () => {
    const start = Date.now();
    await sleep(100);
    const duration = Date.now() - start;
    expect(duration).toBeGreaterThanOrEqual(100);
  });
});
```

**Tools:**
- Jest
- React Testing Library

### 10.3 Integration-Tests

**Scope:** API Routes

**Beispiel:**
```typescript
// __tests__/api/health.test.ts
describe("GET /api/health", () => {
  it("returns ok", async () => {
    const res = await fetch("http://localhost:3000/api/health");
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("ok");
  });
});
```

### 10.4 End-to-End-Tests

**Scope:** Komplette User-Flows

**Beispiel:**
```typescript
// e2e/chat.spec.ts
describe("Chat Flow", () => {
  it("should send and receive message", async () => {
    await page.goto("http://localhost:3000");
    await page.fill("textarea", "Hello TALIA");
    await page.click("button:text('Send')");
    await page.waitForSelector(".taliaMsg");
    const response = await page.textContent(".taliaMsg");
    expect(response).toBeTruthy();
  });
});
```

**Tools:**
- Playwright
- Cypress

### 10.5 Manuelle Tests

**Checkliste:**

- [ ] Thread-Erstellung beim ersten Besuch
- [ ] Nachricht senden und Antwort erhalten
- [ ] Markdown-Rendering funktioniert
- [ ] Thread-Recreation bei 404
- [ ] Eingabefeld-Validierung
- [ ] Tastatur-Shortcuts (Enter, Shift+Enter)
- [ ] Responsive Design
- [ ] Browser-Kompatibilität

### 10.6 Performance-Tests

**Metriken:**
- API Response Time < 30s (95th percentile)
- Cold Start Time < 5s
- Page Load Time < 3s

**Tools:**
- Lighthouse
- WebPageTest
- Vercel Analytics

### 10.7 Security-Tests

**Checkliste:**
- [ ] `npm audit` ohne Schwachstellen
- [ ] API-Schlüssel nicht client-seitig
- [ ] XSS-Tests mit malicious Input
- [ ] HTTPS erzwungen
- [ ] Error-Messages enthalten keine Secrets

---

## 11. DEPLOYMENT-SPEZIFIKATION

### 11.1 Vercel-Konfiguration

#### 11.1.1 Projekt-Setup

**Schritte:**
1. Repository mit Vercel verbinden
2. Build-Konfiguration:
   - **Framework Preset:** Next.js
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
   - **Install Command:** `npm install`

3. Environment Variables setzen:
   ```
   OPENAI_API_KEY = sk-...
   OPENAI_ASSISTANT_ID = asst_...
   ```

#### 11.1.2 vercel.json (Optional)

```json
{
  "version": 2,
  "functions": {
    "app/api/**/*.ts": {
      "memory": 1024,
      "maxDuration": 60
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

### 11.2 Build-Prozess

**Ablauf:**
```bash
# 1. Dependencies installieren
npm install

# 2. TypeScript-Kompilierung + Next.js Build
npm run build

# 3. Output
.next/
├── server/
│   ├── app/
│   └── pages/
├── static/
└── cache/
```

**Build-Zeit:** ~2-5 Minuten

### 11.3 Environment-Variablen

**Production:**
```bash
OPENAI_API_KEY=sk-proj-...
OPENAI_ASSISTANT_ID=asst_...
NODE_ENV=production
```

**Preview/Development:**
- Eigene Keys für Testing
- Separate Assistant für Dev

### 11.4 Deployment-Workflow

```
┌──────────────┐
│  Git Push    │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Vercel Hook  │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Build Start  │
└──────┬───────┘
       │
       ├─► npm install
       ├─► npm run build
       └─► Deployment
             │
             ▼
       ┌──────────────┐
       │   Success    │
       │   or Fail    │
       └──────┬───────┘
              │
              ▼
        Email/Slack
        Notification
```

### 11.5 Rollback-Strategie

**Vercel:**
- Instant Rollback über Dashboard
- Zugriff auf alle Deployments
- Zero-Downtime-Switch

**Prozess:**
1. Problem identifizieren
2. Vercel Dashboard → Deployments
3. Altes Deployment auswählen
4. "Promote to Production"

### 11.6 Custom Domain

**Setup:**
```bash
# In Vercel Dashboard
1. Project Settings → Domains
2. Add Domain: example.com
3. DNS-Records konfigurieren:
   A     @       76.76.21.21
   CNAME www     cname.vercel-dns.com
```

### 11.7 Monitoring & Alerts

**Vercel Analytics:**
- Real User Monitoring
- Performance-Metriken
- Error Tracking

**Custom Monitoring:**
- Uptime-Monitoring (Pingdom, UptimeRobot)
- Error-Alerts (Sentry)
- Log-Aggregation (Logtail, Datadog)

---

## 12. WARTUNG UND SUPPORT

### 12.1 Regelmäßige Wartung

#### 12.1.1 Dependency-Updates

**Wöchentlich:**
```bash
npm outdated
npm audit
```

**Monatlich:**
```bash
npm update
npm audit fix
```

**Bei Critical CVEs:**
```bash
npm update <package>@latest
npm run build
# Test + Deploy innerhalb 24h
```

#### 12.1.2 Monitoring-Review

**Täglich:**
- Error-Rate < 1%
- API-Response-Time < 30s
- Uptime > 99.9%

**Wöchentlich:**
- Performance-Metriken
- User-Feedback
- Log-Analyse

### 12.2 Support-Levels

#### Level 1: Benutzer-Support

**Verantwortung:** First-Line-Support

**Typische Fragen:**
- "Wie sende ich eine Nachricht?"
- "Warum bekomme ich keine Antwort?"
- "Was bedeutet Error X?"

**Ressourcen:**
- [KUNDENDOKUMENTATION.md](./KUNDENDOKUMENTATION.md)
- FAQ-Sektion

#### Level 2: Technischer Support

**Verantwortung:** Entwickler

**Typische Probleme:**
- API-Fehler
- Performance-Issues
- Deployment-Probleme

**Ressourcen:**
- [TECHNISCHE_DOKUMENTATION.md](./TECHNISCHE_DOKUMENTATION.md)
- Vercel Logs
- OpenAI Status Page

#### Level 3: Architektur-Support

**Verantwortung:** Senior Developer / Architect

**Typische Fragen:**
- Architektur-Änderungen
- Skalierungs-Strategien
- Technologie-Entscheidungen

### 12.3 Incident-Response

**Prozess:**
```
Incident Detected
      │
      ▼
┌─────────────┐
│   Severity  │
│   Rating    │
└─────┬───────┘
      │
      ├─► P0 (Critical) → Response: Sofort
      ├─► P1 (High)     → Response: < 4h
      ├─► P2 (Medium)   → Response: < 24h
      └─► P3 (Low)      → Response: < 72h
            │
            ▼
      Investigation
            │
            ▼
       Fix + Deploy
            │
            ▼
      Post-Mortem
```

### 12.4 Backup-Strategie

**Daten:**
- Keine persistenten Daten
- Thread-IDs in Client-LocalStorage
- Threads in OpenAI verwaltet

**Code:**
- Git-Repository als Source of Truth
- Vercel: Alle Deployments archiviert

**Configuration:**
- Environment Variables in Vercel
- `.env.example` im Repository

### 12.5 Documentation-Maintenance

**Aktualisierung bei:**
- API-Änderungen
- Neue Features
- Architektur-Änderungen
- Dependency-Updates

**Review-Zyklus:** Quartalsweise

### 12.6 Performance-Tuning

**Regelmäßig prüfen:**
- Lighthouse-Score > 90
- TTFB < 500ms
- API-Response < 30s (P95)

**Bei Verschlechterung:**
1. Profiling mit Chrome DevTools
2. Bottleneck identifizieren
3. Optimierung implementieren
4. A/B-Test

### 12.7 Skalierungs-Planung

**Aktuelle Limits:**
- Vercel: Automatische Skalierung
- OpenAI: Rate Limits

**Bei Wachstum:**
- OpenAI-Plan upgraden
- Caching-Layer hinzufügen
- Rate-Limiting implementieren

---

## ANHÄNGE

### Anhang A: Build-Kommandos

```bash
# Development
npm run dev

# Production Build
npm run build

# Production Start (lokal)
npm run start

# Dependency Check
npm audit
npm outdated

# Type Check
npx tsc --noEmit
```

### Anhang B: Umgebungsvariablen

| Variable | Erforderlich | Beispiel | Beschreibung |
|----------|-------------|----------|--------------|
| `OPENAI_API_KEY` | Ja | `sk-proj-...` | OpenAI API-Schlüssel |
| `OPENAI_ASSISTANT_ID` | Ja | `asst_...` | OpenAI Assistant-ID |
| `NODE_ENV` | Nein | `production` | Runtime Environment |

### Anhang C: API-Response-Codes

| Code | Bedeutung | Maßnahme |
|------|-----------|----------|
| 200 | OK | Normal |
| 400 | Bad Request | Input validieren |
| 404 | Not Found | Thread-Recreation |
| 429 | Rate Limit | Retry mit Backoff |
| 500 | Server Error | Logs prüfen |
| 503 | Service Unavailable | OpenAI Status prüfen |
| 504 | Timeout | Polling-Limit erhöhen |

### Anhang D: Glossar

Siehe [GLOSSAR.md](./GLOSSAR.md) für umfassendes Glossar.

### Anhang E: Referenzen

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [OpenAI Assistants API](https://platform.openai.com/docs/assistants)
- [Vercel Documentation](https://vercel.com/docs)
- [LASTENHEFT.md](./LASTENHEFT.md)
- [TECHNISCHE_DOKUMENTATION.md](./TECHNISCHE_DOKUMENTATION.md)

---

**Ende des Pflichtenhefts**

*Dieses Dokument beschreibt die technische Umsetzung von TALIA gemäß internationalen Softwareentwicklungsstandards. Bei Abweichungen zwischen Lastenheft und Pflichtenheft ist eine Abstimmung mit dem Auftraggeber erforderlich.*
