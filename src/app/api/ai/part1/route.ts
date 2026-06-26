import { NextResponse } from "next/server";
import { z } from "zod";

import { generatePart1Feedback } from "@/server/openai";

export const runtime = "nodejs";

const requestSchema = z.object({
  session: z.any(),
  promptId: z.string(),
  learnerAnswer: z.string(),
  attemptNumber: z.number(),
  previousTurns: z.array(z.any()),
});

export async function POST(request: Request) {
  const input = requestSchema.parse(await request.json());
  const result = await generatePart1Feedback(input);

  return NextResponse.json(result);
}
