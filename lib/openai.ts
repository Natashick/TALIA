import OpenAI from "openai";

let _openai: OpenAI | null = null;

export const openai = {
  get beta() {
    if (!_openai) {
      if (!process.env.OPENAI_API_KEY) {
        throw new Error("Missing OPENAI_API_KEY");
      }
      _openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    }
    return _openai.beta;
  },
};
