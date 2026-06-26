import { NextResponse } from "next/server";
import { z } from "zod";

import { createBritishSpeech, hasOpenAIKey } from "@/server/openai";

export const runtime = "nodejs";

const requestSchema = z.object({
  text: z.string().min(1),
});

export async function POST(request: Request) {
  if (!hasOpenAIKey()) {
    return NextResponse.json({ error: "OPENAI_API_KEY is not configured" }, { status: 503 });
  }

  const { text } = requestSchema.parse(await request.json());
  const audio = await createBritishSpeech(text);

  return new Response(audio, {
    headers: {
      "Content-Type": "audio/mpeg",
      "Cache-Control": "no-store",
    },
  });
}
