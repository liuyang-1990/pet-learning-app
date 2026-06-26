import { NextResponse } from "next/server";
import { z } from "zod";

import { generatePart2Feedback } from "@/server/openai";

export const runtime = "nodejs";

const requestSchema = z.object({
  session: z.any(),
  promptId: z.string(),
  learnerAnswer: z.string(),
  attemptNumber: z.number(),
});

export async function POST(request: Request) {
  const input = requestSchema.parse(await request.json());
  const result = await generatePart2Feedback(input);

  return NextResponse.json(result);
}
