import OpenAI from "openai";

import {
  continuePart1Conversation,
  submitPart2Answer,
  submitSpeakingAttempt,
  type DailySession,
  type Part1ConversationResult,
  type Part1ConversationTurn,
  type WordPronunciationAssessment,
  type SpeakingAttemptResult,
} from "@/lib/pet-learning-app";

let client: OpenAI | null = null;

export function hasOpenAIKey() {
  return Boolean(process.env.OPENAI_API_KEY);
}

function getOpenAIClient() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not configured");
  }

  client ??= new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  return client;
}

export async function transcribeAudio(file: File) {
  if (!hasOpenAIKey()) {
    return "";
  }

  const result = await getOpenAIClient().audio.transcriptions.create({
    file,
    model: process.env.OPENAI_TRANSCRIBE_MODEL ?? "gpt-4o-mini-transcribe",
  });

  return result.text;
}

export async function assessPronunciationWithAudio(input: {
  file: File;
  targetWord: string;
  chineseGloss?: string;
  transcript: string;
}): Promise<WordPronunciationAssessment | null> {
  if (!hasOpenAIKey()) {
    return null;
  }

  const audio = await input.file.arrayBuffer();
  const format = audioFormatForFile(input.file);

  if (!format) {
    return null;
  }

  try {
    const response = await getOpenAIClient().chat.completions.create({
      model: process.env.OPENAI_AUDIO_ANALYSIS_MODEL ?? "gpt-audio-1.5",
      messages: [
        {
          role: "system",
          content:
            "You are a careful British English pronunciation coach for a Cambridge B1 Preliminary learner. Return only compact JSON.",
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: JSON.stringify({
                task:
                  "Evaluate whether the learner clearly said the target word. Score for a child-friendly practice app, not an official exam.",
                targetAccent: "British English",
                targetWord: input.targetWord,
                chineseGloss: input.chineseGloss ?? "",
                transcript: input.transcript,
                requiredShape: {
                  overallScore: "0-100 integer",
                  pronunciationScore: "0-100 integer for individual sounds",
                  stressScore: "0-100 integer for word stress/rhythm",
                  clarityScore: "0-100 integer for loudness, pace, and recognisability",
                  feedback: "short Chinese feedback, one concrete next step",
                  pronunciationFeedback: "short Chinese note about sounds",
                  stressFeedback: "short Chinese note about stress/rhythm",
                  clarityFeedback: "short Chinese note about clarity",
                },
              }),
            },
            {
              type: "input_audio",
              input_audio: {
                data: Buffer.from(audio).toString("base64"),
                format,
              },
            },
          ],
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.2,
    });
    const parsed = parseJsonObject(response.choices[0]?.message.content ?? "");

    return normalizePronunciationAssessment(parsed);
  } catch {
    return null;
  }
}

export async function createBritishSpeech(text: string) {
  const response = await getOpenAIClient().audio.speech.create({
    model: process.env.OPENAI_TTS_MODEL ?? "gpt-4o-mini-tts",
    voice: process.env.OPENAI_TTS_VOICE ?? "alloy",
    input: `Read this in clear British English for a PET learner: ${text}`,
    response_format: "mp3",
  });

  return Buffer.from(await response.arrayBuffer());
}

export async function generatePart1Feedback(input: {
  session: DailySession;
  promptId: string;
  learnerAnswer: string;
  attemptNumber: number;
  previousTurns: Part1ConversationTurn[];
}): Promise<{
  conversation: Part1ConversationResult;
  feedback: SpeakingAttemptResult;
  usedOpenAI: boolean;
}> {
  const localConversation = continuePart1Conversation(input.session, {
    promptId: input.promptId,
    learnerAnswer: input.learnerAnswer,
    previousTurns: input.previousTurns,
  });
  const localFeedback = submitSpeakingAttempt(input.session, {
    promptId: input.promptId,
    transcript: input.learnerAnswer,
    attemptNumber: input.attemptNumber,
  });

  if (!hasOpenAIKey()) {
    return {
      conversation: localConversation,
      feedback: localFeedback,
      usedOpenAI: false,
    };
  }

  try {
    const response = await getOpenAIClient().responses.create({
      model: process.env.OPENAI_TEXT_MODEL ?? "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content:
            "You are a warm Cambridge B1 Preliminary Speaking Part 1 examiner for a sixth-grade learner. Return only compact JSON.",
        },
        {
          role: "user",
          content: JSON.stringify({
            promptId: input.promptId,
            answer: input.learnerAnswer,
            previousTurns: input.previousTurns,
            requiredShape: {
              examinerFollowUp: "one natural PET-style follow-up question",
              chineseFeedback: "short Chinese feedback, encouraging and concrete",
              exampleAnswer: "one improved B1-level English answer",
              pronunciationSummary: "short Chinese pronunciation advice",
              wordsToShadow: ["word"],
            },
          }),
        },
      ],
    });
    const parsed = parseJsonObject(response.output_text);

    return {
      conversation: {
        ...localConversation,
        examinerFollowUp:
          typeof parsed.examinerFollowUp === "string"
            ? parsed.examinerFollowUp
            : localConversation.examinerFollowUp,
        turnFeedback: {
          ...localConversation.turnFeedback,
          chinese:
            typeof parsed.chineseFeedback === "string"
              ? parsed.chineseFeedback
              : localConversation.turnFeedback.chinese,
          exampleAnswer:
            typeof parsed.exampleAnswer === "string"
              ? parsed.exampleAnswer
              : localConversation.turnFeedback.exampleAnswer,
        },
      },
      feedback: {
        ...localFeedback,
        feedback: {
          ...localFeedback.feedback,
          chinese:
            typeof parsed.chineseFeedback === "string"
              ? parsed.chineseFeedback
              : localFeedback.feedback.chinese,
          exampleAnswer:
            typeof parsed.exampleAnswer === "string"
              ? parsed.exampleAnswer
              : localFeedback.feedback.exampleAnswer,
          pronunciation: {
            ...localFeedback.feedback.pronunciation,
            summary:
              typeof parsed.pronunciationSummary === "string"
                ? parsed.pronunciationSummary
                : localFeedback.feedback.pronunciation.summary,
            wordsToShadow: Array.isArray(parsed.wordsToShadow)
              ? parsed.wordsToShadow.filter((word): word is string => typeof word === "string")
              : localFeedback.feedback.pronunciation.wordsToShadow,
          },
        },
      },
      usedOpenAI: true,
    };
  } catch {
    return {
      conversation: localConversation,
      feedback: localFeedback,
      usedOpenAI: false,
    };
  }
}

export async function generatePart2Feedback(input: {
  session: DailySession;
  promptId: string;
  learnerAnswer: string;
  attemptNumber: number;
}): Promise<{ feedback: SpeakingAttemptResult; usedOpenAI: boolean }> {
  const localFeedback = submitPart2Answer(input.session, {
    promptId: input.promptId,
    transcript: input.learnerAnswer,
    attemptNumber: input.attemptNumber,
  });

  if (!hasOpenAIKey()) {
    return { feedback: localFeedback, usedOpenAI: false };
  }

  try {
    const response = await getOpenAIClient().responses.create({
      model: process.env.OPENAI_TEXT_MODEL ?? "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content:
            "You are a warm Cambridge B1 Preliminary Speaking Part 2 examiner. Give concise feedback for a sixth-grade learner. Return only compact JSON.",
        },
        {
          role: "user",
          content: JSON.stringify({
            answer: input.learnerAnswer,
            requiredShape: {
              chineseFeedback: "short Chinese feedback about picture description, location language, completeness",
              exampleAnswer: "one improved B1-level picture description beginning with In the picture",
              pronunciationSummary: "short Chinese pronunciation advice",
              wordsToShadow: ["word"],
            },
          }),
        },
      ],
    });
    const parsed = parseJsonObject(response.output_text);

    return {
      feedback: {
        ...localFeedback,
        feedback: {
          ...localFeedback.feedback,
          chinese:
            typeof parsed.chineseFeedback === "string"
              ? parsed.chineseFeedback
              : localFeedback.feedback.chinese,
          exampleAnswer:
            typeof parsed.exampleAnswer === "string"
              ? parsed.exampleAnswer
              : localFeedback.feedback.exampleAnswer,
          pronunciation: {
            ...localFeedback.feedback.pronunciation,
            summary:
              typeof parsed.pronunciationSummary === "string"
                ? parsed.pronunciationSummary
                : localFeedback.feedback.pronunciation.summary,
            wordsToShadow: Array.isArray(parsed.wordsToShadow)
              ? parsed.wordsToShadow.filter((word): word is string => typeof word === "string")
              : localFeedback.feedback.pronunciation.wordsToShadow,
          },
        },
      },
      usedOpenAI: true,
    };
  } catch {
    return { feedback: localFeedback, usedOpenAI: false };
  }
}

function parseJsonObject(value: string) {
  const start = value.indexOf("{");
  const end = value.lastIndexOf("}");

  if (start === -1 || end === -1) return {};

  try {
    return JSON.parse(value.slice(start, end + 1)) as Record<string, unknown>;
  } catch {
    return {};
  }
}

function audioFormatForFile(file: File): "wav" | "mp3" | null {
  if (file.type.includes("wav") || file.name.endsWith(".wav")) return "wav";
  if (file.type.includes("mpeg") || file.type.includes("mp3") || file.name.endsWith(".mp3")) return "mp3";
  return null;
}

function normalizePronunciationAssessment(
  parsed: Record<string, unknown>,
): WordPronunciationAssessment {
  const overallScore = clampScore(parsed.overallScore);

  return {
    overallScore,
    pronunciation: {
      score: clampScore(parsed.pronunciationScore ?? overallScore),
      feedback:
        typeof parsed.pronunciationFeedback === "string"
          ? parsed.pronunciationFeedback
          : "重点音基本可参考总分。",
    },
    stress: {
      score: clampScore(parsed.stressScore ?? overallScore),
      feedback:
        typeof parsed.stressFeedback === "string"
          ? parsed.stressFeedback
          : "重音节奏基本可参考总分。",
    },
    clarity: {
      score: clampScore(parsed.clarityScore ?? overallScore),
      feedback:
        typeof parsed.clarityFeedback === "string"
          ? parsed.clarityFeedback
          : "清晰度基本可参考总分。",
    },
    feedback:
      typeof parsed.feedback === "string"
        ? parsed.feedback
        : "AI 已结合目标词和录音给出粗略发音评估。",
  };
}

function clampScore(value: unknown): number {
  const score = typeof value === "number" ? value : Number(value);

  if (!Number.isFinite(score)) return 60;
  return Math.max(0, Math.min(100, Math.round(score)));
}
