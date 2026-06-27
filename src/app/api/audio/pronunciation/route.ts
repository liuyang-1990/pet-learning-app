import fs from "node:fs/promises";
import path from "node:path";

import { NextResponse } from "next/server";

import {
  assessWordShadowing,
  purgeExpiredRecentRecordings,
  type RecentRecording,
} from "@/lib/pet-learning-app";
import { getHouseholdSpace, saveHouseholdSpace } from "@/server/database";
import { assessPronunciationWithAudio, transcribeAudio } from "@/server/openai";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const form = await request.formData();
  const file = form.get("audio");
  const targetWord = String(form.get("targetWord") ?? "").trim();
  const chineseGloss = String(form.get("chineseGloss") ?? "").trim();

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "audio file is required" }, { status: 400 });
  }

  if (!targetWord) {
    return NextResponse.json({ error: "targetWord is required" }, { status: 400 });
  }

  const uploadDir = path.resolve(process.cwd(), process.env.APP_UPLOAD_DIR ?? "./public/uploads");
  await fs.mkdir(uploadDir, { recursive: true });

  const extension = file.type.includes("wav") ? "wav" : file.type.includes("mp3") ? "mp3" : "webm";
  const id = `recording-${Date.now()}`;
  const filename = `${id}.${extension}`;
  const bytes = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(uploadDir, filename), bytes);

  const transcript = await transcribeAudio(file);
  const assessment = await assessPronunciationWithAudio({
    file,
    targetWord,
    chineseGloss,
    transcript,
  });
  const feedback = assessWordShadowing({
    word: targetWord,
    chineseGloss,
    spokenText: transcript,
    assessment: assessment ?? undefined,
  });
  const recording: RecentRecording = {
    id,
    promptTitle: `Shadowing: ${targetWord}`,
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
    feedback,
    usedAudioAssessment: Boolean(assessment),
    household: saveHouseholdSpace(household),
  });
}
