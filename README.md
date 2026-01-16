# Next.js Assistant Chat (App Router).

Minimaler Chat mit der OpenAI Assistants API (Threads + Runs) auf Basis von Next.js App Router.

## Voraussetzungen

- Node.js 24+
- Umgebungsvariablen:
  - `OPENAI_API_KEY` (Format: `sk-...`)
  - `OPENAI_ASSISTANT_ID` (Format: `asst_...`)

Beispielwerte in `.env.example`.

## Lokal starten

1. `.env.example` kopieren:
   ```bash
   cp .env.example .env.local
   ```
   Trage deine Werte ein.

2. Install:
   ```bash
   npm install
   ```

3. Dev-Server:
   ```bash
   npm run dev
   ```
   Öffne http://localhost:3000

## API-Endpunkte

- Healthcheck: `GET /api/health` → `ok`
- Thread anlegen: `POST /api/assistants/threads` → `{ thread_id }`
- Nachricht senden: `POST /api/assistants/threads/:threadId/messages` → `{ thread_id, message }`

Alle API-Routen laufen mit `runtime = "nodejs"`; das OpenAI SDK wird lazy geladen, um Build-Probleme zu vermeiden.

## Deployment auf Vercel

1. Project → Settings → Environment Variables:
   - `OPENAI_API_KEY` = dein `sk-...`
   - `OPENAI_ASSISTANT_ID` = deine `asst_...`
   (Scope: Production + Preview)

2. Redeploy anstoßen (oder einen Commit pushen).

3. Tests:
   - `https://<deine-domain>/api/health` → ok
   - `https://<deine-domain>/` → Chat öffnen, Nachricht senden

## Hinweise

- Build verwendet `--no-turbopack` für Kompatibilität.
- Längere Antworten können bei Serverless-Timeouts scheitern – optional Streaming/Status-Polling einplanen.

## Dependency-Analyse

Siehe [DEPENDENCY_ANALYSIS.md](./DEPENDENCY_ANALYSIS.md) für Details zu bekannten Dependency-Problemen (z.B. `node-domexception`).

## Sicherheit

⚠️ **WICHTIG**: Siehe [SECURITY_NOTES.md](./SECURITY_NOTES.md) für kritische Sicherheitsinformationen und Schwachstellen.

MIT
