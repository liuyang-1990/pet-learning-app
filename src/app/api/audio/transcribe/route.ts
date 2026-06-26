import fs from "node:fs/promises";
import path from "node:path";

import { NextResponse } from "next/server";

import { purgeExpiredRecentRecordings, type RecentRecording } from "@/lib/pet-learning-app";
import { getHouseholdSpace, saveHouseholdSpace } from "@/server/database";
import { transcribeAudio } from "@/server/openai";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const form = await request.formData();
  const file = form.get("audio");
  const promptTitle = String(form.get("promptTitle") ?? "Speaking practice");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "audio file is required" }, { status: 400 });
  }

  const uploadDir = path.resolve(process.cwd(), process.env.APP_UPLOAD_DIR ?? "./public/uploads");
  await fs.mkdir(uploadDir, { recursive: true });

  const extension = file.type.includes("mp4") ? "mp4" : "webm";
  const id = `recording-${Date.now()}`;
  const filename = `${id}.${extension}`;
  const bytes = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(uploadDir, filename), bytes);

  const transcript = await transcribeAudio(file);
  const recording: RecentRecording = {
    id,
    promptTitle,
    recordedAt: new Date().toISOString(),
    audioUrl: `/uploads/${filename}`,
    transcript,
  };
  const household = purgeExpiredRecentRecordings(
    {
      ...getHouseholdSpace(),
      recentRecordings: [recording, ...getHouseholdSpace().recentRecordings],
    },
    new Date(),
  );

  return NextResponse.json({
    recording,
    transcript,
    household: saveHouseholdSpace(household),
  });
}
