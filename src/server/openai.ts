import OpenAI from "openai";

import {
  continuePart1Conversation,
  submitSpeakingAttempt,
  type DailySession,
  type Part1ConversationResult,
  type Part1ConversationTurn,
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
