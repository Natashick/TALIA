# Next.js OpenAI Assistant Chat

This is a [Next.js](https://nextjs.org) project that implements a chat interface using the OpenAI Assistants API.

## Getting Started

### Prerequisites

1. Node.js 18+ 
2. An OpenAI API key (starts with `sk-...`)
3. An OpenAI Assistant ID (starts with `asst_...`)

### Local Development

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Copy the environment template:
```bash
cp .env.example .env.local
```

4. Edit `.env.local` and add your OpenAI credentials:
```
OPENAI_API_KEY=sk-your-actual-api-key-here
OPENAI_ASSISTANT_ID=asst_your-assistant-id-here
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) to see the chat interface.

### API Endpoints

- `GET /api/health` - Health check endpoint (returns "ok")
- `POST /api/assistants/threads` - Create a new conversation thread
- `POST /api/assistants/threads/[threadId]/messages` - Send a message and get assistant response

## Deploy on Vercel

1. Push your code to a GitHub repository
2. Visit [vercel.com](https://vercel.com) and import your repository
3. **Important**: Before deployment, set the following environment variables in Vercel:
   - `OPENAI_API_KEY` - Your OpenAI API key (starts with `sk-...`)
   - `OPENAI_ASSISTANT_ID` - Your OpenAI Assistant ID (starts with `asst_...`)

### Setting Environment Variables on Vercel:
1. Go to your project dashboard on Vercel
2. Click on "Settings" tab
3. Click on "Environment Variables" in the sidebar
4. Add each variable:
   - Name: `OPENAI_API_KEY`, Value: your API key
   - Name: `OPENAI_ASSISTANT_ID`, Value: your assistant ID
5. **Important**: After adding environment variables, click "Redeploy" to apply them

The application will fail to work without these environment variables properly set on Vercel.

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [OpenAI Assistants API](https://platform.openai.com/docs/assistants/overview) - learn about the OpenAI Assistants API
- [Vercel Documentation](https://vercel.com/docs) - learn about Vercel deployment
