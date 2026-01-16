let _client: any = null;

export async function getOpenAI() {
  if (_client) return _client;

  const { default: OpenAI } = await import("openai");
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing OPENAI_API_KEY");
  }
  _client = new OpenAI({ apiKey });
  return _client;
}
