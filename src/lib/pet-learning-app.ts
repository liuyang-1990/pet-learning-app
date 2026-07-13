import { reviewedWordExampleAudit } from "./generated/pet-word-example-audit";

export type ReviewStage = "new" | "tomorrow" | "threeDaysLater" | "mastered";
export type WeakWordReason = "pronunciation" | "recall" | "meaning" | "usage" | "spelling";

export type VocabularyItem = {
  term: string;
  chineseGloss: string;
};

export type WordBankItem = VocabularyItem & {
  theme: string;
  source: string;
};

export type SeenWord = VocabularyItem & {
  theme: string;
  seenOn: string;
  successfulUses: number;
};

export type WeakWord = VocabularyItem & {
  reviewStage: ReviewStage;
  dueOn: string;
  mastered: boolean;
  reason: WeakWordReason;
  correctAttempts: number;
  totalAttempts: number;
};

export type Prompt = {
  id: string;
  title: string;
  question: string;
  part: "part_1" | "part_2";
  imageUrl?: string;
};

export type DailySessionRecord = {
  id: string;
  completedOn: string;
  durationMinutes: number;
  feedbackSummary?: string;
};

export type RecentRecording = {
  id: string;
  promptTitle: string;
  recordedAt: string;
  audioUrl: string;
  transcript?: string;
};

export type HouseholdSettings = {
  dailyNewWordCount: number;
  dailyWeakWordLimit: number;
  currentWordTheme: string;
};

export type WeakWordMistakeRecord = {
  id: string;
  term: string;
  reviewedOn: string;
  mistakeCount: number;
};

type VocabularyReviewResult = {
  term: string;
  correct: boolean;
};

type GuardianTopicWordInput = {
  term: string;
  chineseGloss: string;
  dueOn: string;
};

type GuardianPromptInput = {
  title: string;
  question: string;
  part: Prompt["part"];
  imageUrl?: string;
};

type RecentRecordingInput = {
  promptTitle: string;
  audioUrl: string;
};

type DailySessionCompletionInput = {
  durationMinutes: number;
  feedback?: SpeakingAttemptResult | null;
};

export type HouseholdSpace = {
  learnerName: string;
  settings: HouseholdSettings;
  wordBank: WordBankItem[];
  seenWords: SeenWord[];
  weakWords: WeakWord[];
  wordMistakes: WeakWordMistakeRecord[];
  dailySessions: DailySessionRecord[];
  recentRecordings: RecentRecording[];
  presetPrompts: Prompt[];
};

export type LearnerHome = {
  learnerName: string;
  practiceStreakDays: number;
  dailyNewWords: WordBankItem[];
  dailyWeakWords: WeakWord[];
  canStartDailySession: boolean;
};

export type DailySession = {
  id: string;
  status: "in_progress";
  startedAt: string;
  steps: Array<
    | {
        kind: "new_word_practice";
        words: WordBankItem[];
      }
    | {
        kind: "weak_word_warmup";
        words: WeakWord[];
      }
    | {
        kind: "speaking_part_1";
        prompt: Prompt;
      }
    | {
        kind: "speaking_part_2";
        prompt: Prompt;
      }
    | {
        kind: "vocabulary_review";
        words: WeakWord[];
      }
  >;
};

export type GuardianProgress = {
  recentSessions: DailySessionRecord[];
  practiceStreakDays: number;
  recentWeakWords: string[];
  masteredWords: string[];
  recentRecordings: RecentRecording[];
};

type SpeakingAttemptInput = {
  promptId: string;
  transcript: string;
  attemptNumber: number;
};

export type Part1ConversationTurn = {
  id: string;
  examinerQuestion: string;
  learnerAnswer: string;
};

type Part1ConversationInput = {
  promptId: string;
  learnerAnswer: string;
  previousTurns: Part1ConversationTurn[];
};

export type Part1ConversationResult = {
  turn: Part1ConversationTurn;
  examinerFollowUp: string;
  conversationComplete: boolean;
  turnFeedback: {
    chinese: string;
    exampleAnswer: string;
    weakWords: WeakWord[];
  };
};

type WordShadowingInput = {
  word: string;
  spokenText: string;
  chineseGloss?: string;
  assessment?: WordPronunciationAssessment;
};

export type WordExample = {
  sentence: string | null;
  focusWord: string;
  chinese: string;
  auditStatus?: "pass" | "needs_review";
  auditReasons?: readonly string[];
};

export type PronunciationScoreDetail = {
  score: number;
  feedback: string;
};

export type WordPronunciationAssessment = {
  overallScore: number;
  pronunciation: PronunciationScoreDetail;
  stress: PronunciationScoreDetail;
  clarity: PronunciationScoreDetail;
  feedback: string;
};

export type WordShadowingFeedback = {
  status: "strong" | "okay" | "needs_practice";
  score: number;
  transcript: string;
  feedback: string;
  example: WordExample;
  details: {
    pronunciation: PronunciationScoreDetail;
    stress: PronunciationScoreDetail;
    clarity: PronunciationScoreDetail;
  };
  source: "audio_ai" | "transcript_match";
};

export type SpeakingAttemptResult = {
  acceptedAttemptNumber: number;
  canRetakeAgain: boolean;
  feedback: {
    chinese: string;
    exampleAnswer: string;
    pronunciation: {
      targetAccent: "British English";
      summary: string;
      wordsToShadow: string[];
    };
  };
  weakWords: WeakWord[];
};

type Part2AnswerInput = {
  promptId: string;
  transcript: string;
  attemptNumber: number;
};

const defaultDailyWeakWordLimit = 5;
const defaultDailyNewWordCount = 5;
const defaultWordTheme = "school";
const builtInPart2ImageUrls = [
  "https://images.unsplash.com/photo-1544776193-32d404ae608a?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1500835556837-99ac94a94552?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1586899028174-e7098604235b?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
];

export function createDemoHousehold(): HouseholdSpace {
  return {
    learnerName: "Alex",
    settings: {
      dailyNewWordCount: defaultDailyNewWordCount,
      dailyWeakWordLimit: defaultDailyWeakWordLimit,
      currentWordTheme: defaultWordTheme,
    },
    wordBank: [
      { term: "subject", chineseGloss: "科目", theme: "school", source: "demo" },
      { term: "classmate", chineseGloss: "同学", theme: "school", source: "demo" },
      { term: "homework", chineseGloss: "家庭作业", theme: "school", source: "demo" },
      { term: "experiment", chineseGloss: "实验", theme: "school", source: "demo" },
      { term: "library", chineseGloss: "图书馆", theme: "school", source: "demo" },
      { term: "playground", chineseGloss: "操场", theme: "school", source: "demo" },
      { term: "break", chineseGloss: "课间休息", theme: "school", source: "demo" },
      { term: "uniform", chineseGloss: "校服", theme: "school", source: "demo" },
      { term: "cousin", chineseGloss: "堂/表兄弟姐妹", theme: "family", source: "demo" },
      { term: "grandparent", chineseGloss: "祖父母/外祖父母", theme: "family", source: "demo" },
      { term: "parent", chineseGloss: "父亲或母亲", theme: "family", source: "demo" },
      { term: "relative", chineseGloss: "亲戚", theme: "family", source: "demo" },
      { term: "neighbour", chineseGloss: "邻居", theme: "family", source: "demo" },
      { term: "forest", chineseGloss: "森林", theme: "nature", source: "demo" },
      { term: "river", chineseGloss: "河流", theme: "nature", source: "demo" },
      { term: "mountain", chineseGloss: "山", theme: "nature", source: "demo" },
      { term: "weather", chineseGloss: "天气", theme: "nature", source: "demo" },
      { term: "beach", chineseGloss: "海滩", theme: "nature", source: "demo" },
      { term: "recycle", chineseGloss: "回收利用", theme: "nature", source: "demo" },
      { term: "wildlife", chineseGloss: "野生动物", theme: "nature", source: "demo" },
      { term: "restaurant", chineseGloss: "餐馆", theme: "food", source: "demo" },
      { term: "breakfast", chineseGloss: "早餐", theme: "food", source: "demo" },
      { term: "vegetable", chineseGloss: "蔬菜", theme: "food", source: "demo" },
      { term: "fruit", chineseGloss: "水果", theme: "food", source: "demo" },
      { term: "sandwich", chineseGloss: "三明治", theme: "food", source: "demo" },
      { term: "airport", chineseGloss: "机场", theme: "travel", source: "demo" },
      { term: "station", chineseGloss: "车站", theme: "travel", source: "demo" },
      { term: "ticket", chineseGloss: "票", theme: "travel", source: "demo" },
      { term: "journey", chineseGloss: "旅行", theme: "travel", source: "demo" },
      { term: "passport", chineseGloss: "护照", theme: "travel", source: "demo" },
      { term: "football", chineseGloss: "足球", theme: "sport", source: "demo" },
      { term: "swimming", chineseGloss: "游泳", theme: "sport", source: "demo" },
      { term: "tennis", chineseGloss: "网球", theme: "sport", source: "demo" },
      { term: "cycling", chineseGloss: "骑自行车", theme: "sport", source: "demo" },
      { term: "race", chineseGloss: "比赛", theme: "sport", source: "demo" },
      { term: "office", chineseGloss: "办公室", theme: "work", source: "demo" },
      { term: "manager", chineseGloss: "经理", theme: "work", source: "demo" },
      { term: "assistant", chineseGloss: "助手", theme: "work", source: "demo" },
      { term: "engineer", chineseGloss: "工程师", theme: "work", source: "demo" },
      { term: "meeting", chineseGloss: "会议", theme: "work", source: "demo" },
      { term: "advice", chineseGloss: "建议", theme: "general", source: "demo" },
      { term: "choice", chineseGloss: "选择", theme: "general", source: "demo" },
      { term: "habit", chineseGloss: "习惯", theme: "general", source: "demo" },
      { term: "reason", chineseGloss: "原因", theme: "general", source: "demo" },
      { term: "example", chineseGloss: "例子", theme: "general", source: "demo" },
    ],
    seenWords: [
      {
        term: "classroom",
        chineseGloss: "教室",
        theme: "school",
        seenOn: "2026-06-25",
        successfulUses: 1,
      },
    ],
    weakWords: [
      makeWeakWord("usually", "通常", "tomorrow", "2026-06-26", "pronunciation", 1, 2),
      makeWeakWord("because", "因为", "new", "2026-06-26", "usage", 0, 1),
      makeWeakWord("environment", "环境", "threeDaysLater", "2026-06-26", "recall", 1, 3),
      makeWeakWord("background", "背景", "new", "2026-06-28", "pronunciation", 0, 1),
      makeWeakWord("library", "图书馆", "mastered", "2026-06-20", "meaning", 3, 3),
    ],
    wordMistakes: [
      {
        id: "mistake-2026-06-25-environment",
        term: "environment",
        reviewedOn: "2026-06-25",
        mistakeCount: 3,
      },
      {
        id: "mistake-2026-06-25-usually",
        term: "usually",
        reviewedOn: "2026-06-25",
        mistakeCount: 1,
      },
    ],
    dailySessions: [
      { id: "session-2026-06-17", completedOn: "2026-06-17", durationMinutes: 10 },
      { id: "session-2026-06-22", completedOn: "2026-06-22", durationMinutes: 12 },
      { id: "session-2026-06-23", completedOn: "2026-06-23", durationMinutes: 11 },
      { id: "session-2026-06-24", completedOn: "2026-06-24", durationMinutes: 13 },
      { id: "session-2026-06-25", completedOn: "2026-06-25", durationMinutes: 12 },
    ],
    recentRecordings: [
      {
        id: "recording-recent",
        promptTitle: "Talking about school",
        recordedAt: "2026-06-25T19:00:00.000Z",
        audioUrl: "/recordings/recent.webm",
      },
      {
        id: "recording-expired",
        promptTitle: "Describe a park scene",
        recordedAt: "2026-06-10T19:00:00.000Z",
        audioUrl: "/recordings/expired.webm",
      },
    ],
    presetPrompts: [
      {
        id: "part-1-school",
        title: "Talking about school",
        question: "What is your favourite subject at school, and why?",
        part: "part_1",
      },
      {
        id: "part-2-park",
        title: "Describe a park scene",
        question: "Look at the picture and describe what the people are doing.",
        part: "part_2",
        imageUrl: builtInPart2ImageUrls[0],
      },
    ],
  };
}

export function getLearnerHome(household: HouseholdSpace, now: Date): LearnerHome {
  const today = dateKey(now);
  const dailyNewWords = selectDailyNewWords(household, today);
  const dailyWeakWords = selectDailyWeakWords(household, today);

  return {
    learnerName: household.learnerName,
    practiceStreakDays: countPracticeStreak(household.dailySessions, today),
    dailyNewWords,
    dailyWeakWords,
    canStartDailySession: true,
  };
}

export function normalizeVocabularyTerm(term: string): string {
  const parts = term
    .split("/")
    .map((part) => part.trim().replace(/^[^a-zA-Z]+|[^a-zA-Z\s-]+$/g, ""))
    .filter(Boolean);
  const preferredPart =
    parts.length > 1
      ? parts.reduce((shortest, current) =>
          current.length < shortest.length ? current : shortest,
        )
      : parts[0] ?? term;

  return preferredPart
    .replace(/^of the\s+/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function startDailySession(household: HouseholdSpace, now: Date): DailySession {
  const home = getLearnerHome(household, now);
  const part1Prompt = findPrompt(household, "part_1");
  const part2Prompt = findPrompt(household, "part_2");

  return {
    id: `session-${dateKey(now)}`,
    status: "in_progress",
    startedAt: now.toISOString(),
    steps: [
      { kind: "new_word_practice", words: home.dailyNewWords },
      { kind: "weak_word_warmup", words: home.dailyWeakWords },
      { kind: "speaking_part_1", prompt: part1Prompt },
      { kind: "speaking_part_2", prompt: part2Prompt },
      { kind: "vocabulary_review", words: home.dailyWeakWords },
    ],
  };
}

export function submitSpeakingAttempt(
  session: DailySession,
  input: SpeakingAttemptInput,
): SpeakingAttemptResult {
  const prompt = session.steps
    .filter((step) => step.kind === "speaking_part_1" || step.kind === "speaking_part_2")
    .map((step) => step.prompt)
    .find((item) => item.id === input.promptId);

  if (!prompt) {
    throw new Error(`Unknown speaking prompt: ${input.promptId}`);
  }

  const weakWords = extractWeakWords(input.transcript);

  return {
    acceptedAttemptNumber: Math.min(input.attemptNumber, 3),
    canRetakeAgain: input.attemptNumber < 3,
    feedback: {
      chinese: "回答完整，可以再多说一个具体原因，并注意关键词的清晰度。",
      exampleAnswer:
        "I like science because it is interesting and it helps me understand the world around me.",
      pronunciation: {
        targetAccent: "British English",
        summary: "整体能听懂，跟读时注意 usually 的重音和 because 的弱读。",
        wordsToShadow: weakWords
          .filter((word) => word.term === "usually")
          .map((word) => word.term),
      },
    },
    weakWords,
  };
}

export function submitPart2Answer(
  session: DailySession,
  input: Part2AnswerInput,
): SpeakingAttemptResult {
  const prompt = session.steps
    .filter((step) => step.kind === "speaking_part_2")
    .map((step) => step.prompt)
    .find((item) => item.id === input.promptId);

  if (!prompt) {
    throw new Error(`Unknown speaking part 2 prompt: ${input.promptId}`);
  }

  const weakWords = extractWeakWords(input.transcript);
  const hasLocationLanguage = /\bin the picture\b|\bon the left\b|\bon the right\b|\bin the background\b/i.test(
    input.transcript,
  );

  return {
    acceptedAttemptNumber: Math.min(input.attemptNumber, 3),
    canRetakeAgain: input.attemptNumber < 3,
    feedback: {
      chinese: hasLocationLanguage
        ? "你描述了图片内容，也用了图片位置表达。下一步可以补充人物动作和原因。"
        : "回答提到了图片内容，但要多用 In the picture、on the left、in the background 这样的图片描述表达。",
      exampleAnswer:
        "In the picture, some children are playing in a park. On the left, a girl is running, and in the background, a woman is sitting on a bench because it is a sunny day.",
      pronunciation: {
        targetAccent: "British English",
        summary: "注意 picture 的 /tʃ/ 音，以及 background 的重音。",
        wordsToShadow: ["picture", "background", ...weakWords.map((word) => word.term)].slice(0, 4),
      },
    },
    weakWords,
  };
}

export function ensurePart2Image(prompt: Prompt): Prompt {
  if (prompt.imageUrl) return prompt;

  return {
    ...prompt,
    imageUrl: builtInPart2ImageUrls[0],
  };
}

export function initializePart2ImagePool(household: HouseholdSpace): HouseholdSpace {
  let nextBuiltInImageIndex = 0;

  return {
    ...household,
    presetPrompts: household.presetPrompts.map((prompt) => {
      if (prompt.part !== "part_2" || !isLegacyGeneratedPart2Image(prompt.imageUrl)) {
        return prompt;
      }

      const imageUrl = builtInPart2ImageUrls[nextBuiltInImageIndex % builtInPart2ImageUrls.length];
      nextBuiltInImageIndex += 1;

      return {
        ...prompt,
        imageUrl,
      };
    }),
  };
}

export function getPart2ImageChoices(prompt: Prompt, prompts: Prompt[] = []): string[] {
  return uniqueValues([
    prompt.imageUrl,
    ...prompts
      .filter((item) => item.part === "part_2")
      .map((item) => item.imageUrl),
    ...builtInPart2ImageUrls,
  ]);
}

export function continuePart1Conversation(
  session: DailySession,
  input: Part1ConversationInput,
): Part1ConversationResult {
  const prompt = session.steps
    .filter((step) => step.kind === "speaking_part_1")
    .map((step) => step.prompt)
    .find((item) => item.id === input.promptId);

  if (!prompt) {
    throw new Error(`Unknown speaking part 1 prompt: ${input.promptId}`);
  }

  const turn: Part1ConversationTurn = {
    id: `part1-turn-${input.previousTurns.length + 1}`,
    examinerQuestion:
      input.previousTurns.at(-1)?.examinerQuestion ?? prompt.question,
    learnerAnswer: input.learnerAnswer.trim(),
  };
  const weakWords = extractWeakWords(input.learnerAnswer);
  const wordCount = countWords(input.learnerAnswer);
  const hasReason = /\bbecause\b|\bso\b|\bfor example\b/i.test(input.learnerAnswer);
  const conversationComplete = input.previousTurns.length >= 2 && wordCount >= 8;

  return {
    turn,
    examinerFollowUp: conversationComplete
      ? "Thank you. Let's move on to the next question."
      : choosePart1FollowUp(input.learnerAnswer, input.previousTurns.length),
    conversationComplete,
    turnFeedback: {
      chinese:
        wordCount < 4
          ? "这次回答太短，可以补充一个原因或例子。"
          : hasReason
            ? "回答里有原因，已经更接近 PET Speaking Part 1 的完整回答。"
            : "回答基本清楚，下一句试着用 because 加一个原因。",
      exampleAnswer:
        "I like science because experiments are exciting and I can learn how the world works.",
      weakWords,
    },
  };
}

export function assessWordShadowing(input: WordShadowingInput): WordShadowingFeedback {
  const target = normalizeSpokenText(input.word);
  const spoken = normalizeSpokenText(input.spokenText);
  const score = input.assessment?.overallScore ?? scorePronunciationMatch(target, spoken);
  const status =
    score >= 85 ? "strong" : score >= 65 ? "okay" : "needs_practice";
  const example = getWordExample({
    term: input.word,
    chineseGloss: input.chineseGloss ?? "",
  });

  return {
    status,
    score,
    transcript: input.spokenText.trim(),
    feedback: input.assessment?.feedback ?? wordShadowingFeedbackText(input.word, score, input.spokenText),
    example,
    details: input.assessment
      ? {
          pronunciation: input.assessment.pronunciation,
          stress: input.assessment.stress,
          clarity: input.assessment.clarity,
        }
      : makeTranscriptMatchDetails(score, input.spokenText),
    source: input.assessment ? "audio_ai" : "transcript_match",
  };
}

export function recordWordShadowingFeedback(
  household: HouseholdSpace,
  input: {
    word: string;
    chineseGloss: string;
    feedback: WordShadowingFeedback;
  },
  now: Date,
): HouseholdSpace {
  if (input.feedback.status === "strong") {
    return household;
  }

  return {
    ...household,
    weakWords: mergeWeakWords(household.weakWords, [
      makeWeakWord(
        input.word,
        input.chineseGloss,
        "new",
        dateKey(now),
        "pronunciation",
      ),
    ]),
  };
}

export function getReviewedWordExamples(): Record<string, WordExample> {
  return {
    class: {
      focusWord: "class",
      sentence: "I have maths class right after lunch.",
      chinese: "class = 课；我午饭后马上有数学课。",
    },
    classical: {
      focusWord: "classical",
      sentence: "My dad likes classical music, but I prefer pop.",
      chinese: "classical = 古典的；我爸爸喜欢古典音乐，但我更喜欢流行音乐。",
    },
    classroom: {
      focusWord: "classroom",
      sentence: "Our classroom is quiet in the morning.",
      chinese: "classroom = 教室；早上的时候我们教室很安静。",
    },
    exam: {
      focusWord: "exam",
      sentence: "I felt nervous before the English exam.",
      chinese: "exam = 考试；英语考试前我有点紧张。",
    },
    examiner: {
      focusWord: "examiner",
      sentence: "The examiner asked me two easy questions.",
      chinese: "examiner = 考官；考官问了我两个简单的问题。",
    },
    example: {
      focusWord: "example",
      sentence: "Can you give me one example?",
      chinese: "example = 例子；你能给我一个例子吗？",
    },
    headteacher: {
      focusWord: "headteacher",
      sentence: "The headteacher spoke to us after assembly.",
      chinese: "headteacher = 校长；校长在集会后和我们讲话。",
    },
    usually: {
      focusWord: "usually",
      sentence: "I usually grab a snack after school.",
      chinese: "usually = 通常；我通常放学后吃点零食。",
    },
    because: {
      focusWord: "because",
      sentence: "I stayed home because I felt tired.",
      chinese: "because = 因为；我因为觉得累，所以待在家里。",
    },
    ability: {
      focusWord: "ability",
      sentence: "She has the ability to explain hard ideas clearly.",
      chinese: "ability = 能力；她有能力把难懂的想法解释清楚。",
    },
    able: {
      focusWord: "able",
      sentence: "She is able to explain the answer clearly.",
      chinese: "able = 能干的；能够的；她能够把答案解释清楚。",
    },
    environment: {
      focusWord: "environment",
      sentence: "We need a quiet environment to study.",
      chinese: "environment = 环境；我们需要安静的环境学习。",
    },
    background: {
      focusWord: "background",
      sentence: "There is music playing in the background.",
      chinese: "background = 背景；背景里有音乐在播放。",
    },
    picture: {
      focusWord: "picture",
      sentence: "Look at this picture on my phone.",
      chinese: "picture = 图片；看我手机上的这张图片。",
    },
    book: {
      focusWord: "book",
      sentence: "I borrowed this book from the school library.",
      chinese: "book = 书；我从学校图书馆借了这本书。",
    },
    library: {
      focusWord: "library",
      sentence: "Let's meet outside the library at four.",
      chinese: "library = 图书馆；我们四点在图书馆外面见。",
    },
    homework: {
      focusWord: "homework",
      sentence: "I finished my homework before dinner.",
      chinese: "homework = 家庭作业；我晚饭前完成了作业。",
    },
    lesson: {
      focusWord: "lesson",
      sentence: "The lesson was funny, so everyone joined in.",
      chinese: "lesson = 课；这节课很有趣，所以大家都参与了。",
    },
    primaryschool: {
      focusWord: "primary school",
      sentence: "My primary school was only ten minutes from home.",
      chinese: "primary school = 小学；我的小学离家只有十分钟路程。",
    },
    school: {
      focusWord: "school",
      sentence: "I walk to school with my friend every morning.",
      chinese: "school = 学校；我每天早上和朋友一起走路去学校。",
    },
    schoolchild: {
      focusWord: "schoolchild",
      sentence: "Every schoolchild needs a quiet place to read.",
      chinese: "schoolchild = 学童；每个学生都需要一个安静读书的地方。",
    },
    student: {
      focusWord: "student",
      sentence: "She is a new student in our class.",
      chinese: "student = 学生；她是我们班的新学生。",
    },
    teacher: {
      focusWord: "teacher",
      sentence: "My teacher helped me fix my answer.",
      chinese: "teacher = 老师；我的老师帮我修改了答案。",
    },
    classmate: {
      focusWord: "classmate",
      sentence: "My classmate helped me with the project.",
      chinese: "classmate = 同学；我的同学帮我做了这个项目。",
    },
    subject: {
      focusWord: "subject",
      sentence: "Science is my favourite subject this year.",
      chinese: "subject = 科目；科学是我今年最喜欢的科目。",
    },
    project: {
      focusWord: "project",
      sentence: "We finished our science project before lunch.",
      chinese: "project = 项目/课题；我们午饭前完成了科学课题。",
    },
    experiment: {
      focusWord: "experiment",
      sentence: "We did a simple experiment with water in science class.",
      chinese: "experiment = 实验；我们在科学课上做了一个简单的水实验。",
    },
    playground: {
      focusWord: "playground",
      sentence: "The playground gets really noisy after lunch.",
      chinese: "playground = 操场；午饭后操场会变得很吵。",
    },
    break: {
      focusWord: "break",
      sentence: "I'll tell you what happened during the break.",
      chinese: "break = 课间休息；我课间休息时再告诉你发生了什么。",
    },
    uniform: {
      focusWord: "uniform",
      sentence: "We don't have to wear our uniform on Friday.",
      chinese: "uniform = 校服；我们星期五不用穿校服。",
    },
    cousin: {
      focusWord: "cousin",
      sentence: "My cousin is staying with us for the weekend.",
      chinese: "cousin = 堂/表兄弟姐妹；我表亲周末住在我们家。",
    },
    grandparent: {
      focusWord: "grandparent",
      sentence: "I call my grandparent every Sunday evening.",
      chinese: "grandparent = 祖父母/外祖父母；我每周日晚上给祖父母打电话。",
    },
    parent: {
      focusWord: "parent",
      sentence: "A parent needs to sign this form before the trip.",
      chinese: "parent = 父亲或母亲；旅行前需要一位家长签这张表。",
    },
    relative: {
      focusWord: "relative",
      sentence: "We're visiting a relative who lives near the sea.",
      chinese: "relative = 亲戚；我们要去看一位住在海边的亲戚。",
    },
    neighbour: {
      focusWord: "neighbour",
      sentence: "Our neighbour looked after the cat while we were away.",
      chinese: "neighbour = 邻居；我们不在时邻居帮忙照看猫。",
    },
    forest: {
      focusWord: "forest",
      sentence: "It gets dark very quickly in the forest.",
      chinese: "forest = 森林；森林里天黑得很快。",
    },
    river: {
      focusWord: "river",
      sentence: "The path follows the river all the way to the town.",
      chinese: "river = 河流；这条小路沿着河一直通到镇上。",
    },
    mountain: {
      focusWord: "mountain",
      sentence: "You can see the mountain from our hotel window.",
      chinese: "mountain = 山；从酒店窗户可以看到那座山。",
    },
    weather: {
      focusWord: "weather",
      sentence: "The weather changed just as we got to the park.",
      chinese: "weather = 天气；我们刚到公园，天气就变了。",
    },
    climate: {
      focusWord: "climate",
      sentence: "The climate here is warm and wet for most of the year.",
      chinese: "climate = 气候；这里一年中大部分时间气候温暖湿润。",
    },
    climatechange: {
      focusWord: "climate change",
      sentence: "Climate change is making some summers hotter.",
      chinese: "climate change = 气候变化；气候变化正使一些夏天变得更热。",
    },
    sunny: {
      focusWord: "sunny",
      sentence: "It was sunny, so we had lunch outside.",
      chinese: "sunny = 晴朗的；天气晴朗，所以我们在外面吃了午饭。",
    },
    weatherforecast: {
      focusWord: "weather forecast",
      sentence: "The weather forecast said it would rain later.",
      chinese: "weather forecast = 天气预报；天气预报说晚些时候会下雨。",
    },
    natural: {
      focusWord: "natural",
      sentence: "The juice tasted natural, not too sweet.",
      chinese: "natural = 自然的；天然的；果汁喝起来很自然，不太甜。",
    },
    beach: {
      focusWord: "beach",
      sentence: "The beach was almost empty in the morning.",
      chinese: "beach = 海滩；早上海滩上几乎没有人。",
    },
    recycle: {
      focusWord: "recycle",
      sentence: "Our school asks everyone to recycle paper and plastic.",
      chinese: "recycle = 回收利用；学校要求大家回收纸张和塑料。",
    },
    wildlife: {
      focusWord: "wildlife",
      sentence: "The guide told us not to disturb the wildlife.",
      chinese: "wildlife = 野生动物；导游告诉我们不要打扰野生动物。",
    },
    tree: {
      focusWord: "tree",
      sentence: "There is a tall tree outside my bedroom window.",
      chinese: "tree = 树；我卧室窗外有一棵高高的树。",
    },
    plant: {
      focusWord: "plant",
      sentence: "We watered the plant before we went to school.",
      chinese: "plant = 植物；上学前我们给那棵植物浇了水。",
    },
    flower: {
      focusWord: "flower",
      sentence: "A small yellow flower grew beside the path.",
      chinese: "flower = 花；小路旁长出了一朵黄色小花。",
    },
    grass: {
      focusWord: "grass",
      sentence: "The grass was still wet after the rain.",
      chinese: "grass = 草；雨后草地还是湿的。",
    },
    lake: {
      focusWord: "lake",
      sentence: "We walked around the lake after lunch.",
      chinese: "lake = 湖；午饭后我们绕着湖散步。",
    },
    sea: {
      focusWord: "sea",
      sentence: "The sea looked calm in the early morning.",
      chinese: "sea = 海；清晨的大海看起来很平静。",
    },
    rain: {
      focusWord: "rain",
      sentence: "The rain stopped just before the match started.",
      chinese: "rain = 雨；比赛开始前雨刚好停了。",
    },
    wind: {
      focusWord: "wind",
      sentence: "The wind blew my hat across the playground.",
      chinese: "wind = 风；风把我的帽子吹到了操场另一边。",
    },
    cloud: {
      focusWord: "cloud",
      sentence: "A dark cloud moved across the sky.",
      chinese: "cloud = 云；一朵乌云从天空飘过。",
    },
    cloudy: {
      focusWord: "cloudy",
      sentence: "It was cloudy, but it did not rain.",
      chinese: "cloudy = 多云的；天气多云，但没有下雨。",
    },
    crop: {
      focusWord: "crop",
      sentence: "The farmer sold his potato crop at the market.",
      chinese: "crop = 农作物；农民在市场上卖了他的土豆作物。",
    },
    dust: {
      focusWord: "dust",
      sentence: "Dust covered the old table by the window.",
      chinese: "dust = 灰尘；灰尘覆盖了窗边的旧桌子。",
    },
    dusty: {
      focusWord: "dusty",
      sentence: "My shoes got dusty on the dry path.",
      chinese: "dusty = 灰尘多的；我的鞋在干燥的小路上沾满了灰尘。",
    },
    environmental: {
      focusWord: "environmental",
      sentence: "Our school started an environmental club last year.",
      chinese: "environmental = 环保的；我们学校去年成立了一个环保俱乐部。",
    },
    farm: {
      focusWord: "farm",
      sentence: "We stayed on a farm during the summer holiday.",
      chinese: "farm = 农场；暑假期间我们住在一个农场里。",
    },
    field: {
      focusWord: "field",
      sentence: "The sheep were standing in the field.",
      chinese: "field = 田地；羊正站在田地里。",
    },
    garden: {
      focusWord: "garden",
      sentence: "We planted tomatoes in the garden behind our house.",
      chinese: "garden = 菜园；我们在屋后的菜园里种了西红柿。",
    },
    hill: {
      focusWord: "hill",
      sentence: "The hill was steep, but the view was beautiful.",
      chinese: "hill = 小山；这座小山很陡，但景色很美。",
    },
    island: {
      focusWord: "island",
      sentence: "We took a boat to a small island.",
      chinese: "island = 岛；我们坐船去了一座小岛。",
    },
    moon: {
      focusWord: "moon",
      sentence: "The moon looked bright above the houses.",
      chinese: "moon = 月亮；月亮在房子上方显得很明亮。",
    },
    nature: {
      focusWord: "nature",
      sentence: "Spending time in nature helps me feel calm.",
      chinese: "nature = 大自然；在大自然中待一会儿能让我感到平静。",
    },
    ocean: {
      focusWord: "ocean",
      sentence: "The ocean was too rough for swimming.",
      chinese: "ocean = 海洋；海面太汹涌，不适合游泳。",
    },
    recycled: {
      focusWord: "recycled",
      sentence: "This notebook is made from recycled paper.",
      chinese: "recycled = 回收利用的；这个笔记本是用再生纸做的。",
    },
    season: {
      focusWord: "season",
      sentence: "Autumn is my favourite season because the weather is cool.",
      chinese: "season = 季节；秋天是我最喜欢的季节，因为天气凉爽。",
    },
    snow: {
      focusWord: "snow",
      sentence: "Snow covered the road before breakfast.",
      chinese: "snow = 雪；早饭前雪覆盖了道路。",
    },
    star: {
      focusWord: "star",
      sentence: "I saw one bright star in the dark sky.",
      chinese: "star = 星；我在黑暗的天空中看到了一颗明亮的星星。",
    },
    sun: {
      focusWord: "sun",
      sentence: "The sun came out after the rain stopped.",
      chinese: "sun = 太阳；雨停后太阳出来了。",
    },
    thunder: {
      focusWord: "thunder",
      sentence: "The thunder was loud, so we went inside.",
      chinese: "thunder = 雷声；雷声很大，所以我们进屋了。",
    },
    windy: {
      focusWord: "windy",
      sentence: "It was windy, and my hair blew everywhere.",
      chinese: "windy = 多风的；风很大，我的头发被吹得到处乱飞。",
    },
    air: {
      focusWord: "air",
      sentence: "The air feels fresh after heavy rain.",
      chinese: "air = 空气；大雨后空气感觉很清新。",
    },
    clean: {
      focusWord: "clean",
      sentence: "Please keep the river clean for the fish.",
      chinese: "clean = 干净的；请为了鱼让河水保持干净。",
    },
    cold: {
      focusWord: "cold",
      sentence: "It was cold, so I wore my thick coat.",
      chinese: "cold = 寒冷的；天气很冷，所以我穿了厚外套。",
    },
    cool: {
      focusWord: "cool",
      sentence: "The evening was cool after a hot day.",
      chinese: "cool = 凉爽的；炎热的一天之后，傍晚很凉爽。",
    },
    dark: {
      focusWord: "dark",
      sentence: "The sky became dark before the storm.",
      chinese: "dark = 黑暗的；暴风雨前天空变暗了。",
    },
    dirty: {
      focusWord: "dirty",
      sentence: "My trousers got dirty after I sat on the ground.",
      chinese: "dirty = 脏的；我坐在地上后裤子弄脏了。",
    },
    dry: {
      focusWord: "dry",
      sentence: "The ground was dry because it had not rained.",
      chinese: "dry = 干的；因为没有下雨，地面是干的。",
    },
    fresh: {
      focusWord: "fresh",
      sentence: "We opened the window for some fresh air.",
      chinese: "fresh = 新鲜的；我们打开窗户，好呼吸一些新鲜空气。",
    },
    green: {
      focusWord: "green",
      sentence: "The hills look green after spring rain.",
      chinese: "green = 绿色的；春雨过后，小山看起来绿油油的。",
    },
    ground: {
      focusWord: "ground",
      sentence: "Put the picnic blanket on the ground.",
      chinese: "ground = 地面；把野餐毯放在地面上。",
    },
    hot: {
      focusWord: "hot",
      sentence: "The sand was hot under my feet.",
      chinese: "hot = 热的；我脚下的沙子很烫。",
    },
    land: {
      focusWord: "land",
      sentence: "The plane flew over land for two hours.",
      chinese: "land = 陆地；飞机在陆地上空飞了两个小时。",
    },
    light: {
      focusWord: "light",
      sentence: "Morning light came through the bedroom window.",
      chinese: "light = 光；晨光透过卧室窗户照了进来。",
    },
    outdoor: {
      focusWord: "outdoor",
      sentence: "We had an outdoor lesson in the school garden.",
      chinese: "outdoor = 户外的；我们在学校花园里上了一节户外课。",
    },
    outside: {
      focusWord: "outside",
      sentence: "It was raining outside when I woke up.",
      chinese: "outside = 外面；我醒来时外面正在下雨。",
    },
    rock: {
      focusWord: "rock",
      sentence: "I sat on a flat rock near the lake.",
      chinese: "rock = 岩石；我坐在湖边一块平坦的岩石上。",
    },
    space: {
      focusWord: "space",
      sentence: "There is enough space for flowers beside the path.",
      chinese: "space = 空间；小路旁有足够的空间种花。",
    },
    storm: {
      focusWord: "storm",
      sentence: "The storm damaged two trees near our school.",
      chinese: "storm = 暴风雨；暴风雨损坏了我们学校附近的两棵树。",
    },
    temperature: {
      focusWord: "temperature",
      sentence: "The temperature dropped quickly in the evening.",
      chinese: "temperature = 温度；傍晚温度下降得很快。",
    },
    warm: {
      focusWord: "warm",
      sentence: "The sun felt warm on my face.",
      chinese: "warm = 温暖的；阳光照在我脸上感觉很温暖。",
    },
    wet: {
      focusWord: "wet",
      sentence: "The grass was wet after the rain.",
      chinese: "wet = 潮湿的；雨后草地是湿的。",
    },
    wild: {
      focusWord: "wild",
      sentence: "We saw wild flowers beside the road.",
      chinese: "wild = 野生的；我们在路边看到了野花。",
    },
    wood: {
      focusWord: "wood",
      sentence: "This table is made of strong wood.",
      chinese: "wood = 木材；这张桌子是用结实的木材做的。",
    },
    wooden: {
      focusWord: "wooden",
      sentence: "The children crossed a small wooden bridge.",
      chinese: "wooden = 木制的；孩子们走过了一座小木桥。",
    },
    world: {
      focusWord: "world",
      sentence: "People around the world need clean water.",
      chinese: "world = 世界；世界各地的人都需要干净的水。",
    },
    bright: {
      focusWord: "bright",
      sentence: "The morning was bright after the clouds disappeared.",
      chinese: "bright = 明亮的；云散后，早晨变得很明亮。",
    },
    clear: {
      focusWord: "clear",
      sentence: "The sky was clear, so we could see the stars.",
      chinese: "clear = 晴朗的；天空晴朗，所以我们能看到星星。",
    },
    deep: {
      focusWord: "deep",
      sentence: "The lake is too deep for young swimmers.",
      chinese: "deep = 深的；这个湖对年幼的游泳者来说太深了。",
    },
    high: {
      focusWord: "high",
      sentence: "The mountain looked high from the village.",
      chinese: "high = 高的；从村子看，那座山显得很高。",
    },
    low: {
      focusWord: "low",
      sentence: "The sun was low when we walked home.",
      chinese: "low = 低的；我们走回家时，太阳已经很低了。",
    },
    sky: {
      focusWord: "sky",
      sentence: "The sky turned pink as we walked home.",
      chinese: "sky = 天空；我们走回家时，天空变成了粉色。",
    },
    waste: {
      focusWord: "waste",
      sentence: "Please put the waste in the bin before we leave.",
      chinese: "waste = 废物/垃圾；离开前请把垃圾放进垃圾桶。",
    },
    pollution: {
      focusWord: "pollution",
      sentence: "Traffic pollution is worse near the main road.",
      chinese: "pollution = 污染；主路附近的交通污染更严重。",
    },
    planet: {
      focusWord: "planet",
      sentence: "We learned about each planet in science class.",
      chinese: "planet = 行星；我们在科学课上学习了每一颗行星。",
    },
    earth: {
      focusWord: "earth",
      sentence: "The Earth goes around the sun.",
      chinese: "earth = 地球；地球绕着太阳转。",
    },
    restaurant: {
      focusWord: "restaurant",
      sentence: "This restaurant is busy, but the food is worth the wait.",
      chinese: "restaurant = 餐馆；这家餐馆很忙，但食物值得等。",
    },
    breakfast: {
      focusWord: "breakfast",
      sentence: "I missed breakfast because I woke up late.",
      chinese: "breakfast = 早餐；我起晚了，所以没吃早餐。",
    },
    vegetable: {
      focusWord: "vegetable",
      sentence: "My little brother only likes one green vegetable.",
      chinese: "vegetable = 蔬菜；我弟弟只喜欢一种绿色蔬菜。",
    },
    fruit: {
      focusWord: "fruit",
      sentence: "There's fresh fruit on the table if you're hungry.",
      chinese: "fruit = 水果；如果你饿了，桌上有新鲜水果。",
    },
    sandwich: {
      focusWord: "sandwich",
      sentence: "I made a cheese sandwich for lunch.",
      chinese: "sandwich = 三明治；我午饭做了一个奶酪三明治。",
    },
    airport: {
      focusWord: "airport",
      sentence: "We got to the airport two hours before the flight.",
      chinese: "airport = 机场；我们提前两小时到了机场。",
    },
    station: {
      focusWord: "station",
      sentence: "I'll meet you outside the station at six.",
      chinese: "station = 车站；我六点在车站外面见你。",
    },
    ticket: {
      focusWord: "ticket",
      sentence: "I bought the ticket online, so I don't need to queue.",
      chinese: "ticket = 票；我在网上买了票，所以不用排队。",
    },
    journey: {
      focusWord: "journey",
      sentence: "The journey took longer than we expected.",
      chinese: "journey = 旅行/行程；这段行程比我们预想的更久。",
    },
    passport: {
      focusWord: "passport",
      sentence: "Don't forget your passport before we leave.",
      chinese: "passport = 护照；出发前别忘了带护照。",
    },
    football: {
      focusWord: "football",
      sentence: "We played football until it was too dark to see the ball.",
      chinese: "football = 足球；我们一直踢足球，直到天黑得看不清球。",
    },
    swimming: {
      focusWord: "swimming",
      sentence: "Swimming helps me relax after a long day.",
      chinese: "swimming = 游泳；忙了一天后，游泳能让我放松。",
    },
    tennis: {
      focusWord: "tennis",
      sentence: "She's taking tennis lessons every Saturday.",
      chinese: "tennis = 网球；她每周六上网球课。",
    },
    cycling: {
      focusWord: "cycling",
      sentence: "Cycling to school is faster than taking the bus.",
      chinese: "cycling = 骑自行车；骑车上学比坐公交更快。",
    },
    race: {
      focusWord: "race",
      sentence: "He was tired, but he finished the race.",
      chinese: "race = 比赛；他很累，但完成了比赛。",
    },
    office: {
      focusWord: "office",
      sentence: "My mum works in an office near the station.",
      chinese: "office = 办公室；我妈妈在车站附近的办公室工作。",
    },
    manager: {
      focusWord: "manager",
      sentence: "The manager came over and solved the problem quickly.",
      chinese: "manager = 经理；经理走过来，很快解决了问题。",
    },
    assistant: {
      focusWord: "assistant",
      sentence: "The shop assistant helped me find the right size.",
      chinese: "assistant = 助手/店员；店员帮我找到了合适的尺码。",
    },
    engineer: {
      focusWord: "engineer",
      sentence: "My uncle is an engineer who designs bridges.",
      chinese: "engineer = 工程师；我叔叔是设计桥梁的工程师。",
    },
    meeting: {
      focusWord: "meeting",
      sentence: "The meeting ended early, so Dad came home before dinner.",
      chinese: "meeting = 会议；会议提前结束了，所以爸爸晚饭前回家了。",
    },
    advice: {
      focusWord: "advice",
      sentence: "My teacher gave me some useful advice before the exam.",
      chinese: "advice = 建议；考试前老师给了我一些有用的建议。",
    },
    choice: {
      focusWord: "choice",
      sentence: "It was a difficult choice, but I picked the blue one.",
      chinese: "choice = 选择；这是个困难的选择，但我选了蓝色那个。",
    },
    habit: {
      focusWord: "habit",
      sentence: "Reading before bed has become a habit for me.",
      chinese: "habit = 习惯；睡前阅读已经成了我的习惯。",
    },
    reason: {
      focusWord: "reason",
      sentence: "Tell me the real reason you were late.",
      chinese: "reason = 原因；告诉我你迟到的真正原因。",
    },
  };
}

export function getWordExample(word: VocabularyItem): WordExample {
  const examples = getReviewedWordExamples();
  const term = cleanExampleTerm(word.term);
  const key = normalizeSpokenText(term);
  const reviewed = examples[key];
  const audit = reviewedWordExampleAudit[key as keyof typeof reviewedWordExampleAudit];

  if (reviewed) {
    return {
      ...reviewed,
      auditStatus: audit?.status,
      auditReasons: audit?.reasons,
    };
  }

  return {
    focusWord: term,
    sentence: null,
    chinese: `${term} = ${displayWordGloss(word.chineseGloss)}`,
  };
}

export function displayWordGloss(gloss: string): string {
  return gloss === "Cambridge B1/PET 官方词表" ? "PET核心词汇" : gloss;
}

function cleanExampleTerm(term: string): string {
  return normalizeVocabularyTerm(term);
}

export function completeVocabularyReview(
  household: HouseholdSpace,
  results: VocabularyReviewResult[],
  now: Date,
): HouseholdSpace {
  const resultsByTerm = new Map(results.map((result) => [result.term, result.correct]));
  const incorrectCounts = new Map<string, number>();

  for (const result of results) {
    if (!result.correct) {
      incorrectCounts.set(result.term, (incorrectCounts.get(result.term) ?? 0) + 1);
    }
  }

  return {
    ...household,
    seenWords: mergeSeenWords(
      household.seenWords ?? [],
      household.wordBank ?? [],
      results.filter((result) => result.correct).map((result) => result.term),
      dateKey(now),
    ),
    weakWords: household.weakWords.map((word) => {
      const correct = resultsByTerm.get(word.term);

      if (correct === undefined) {
        return word;
      }

      const reviewStage = correct
        ? nextReviewStage(word.reviewStage)
        : previousReviewStage(word.reviewStage);
      const correctAttempts = word.correctAttempts + (correct ? 1 : 0);
      const totalAttempts = word.totalAttempts + 1;
      const mastered = reviewStage === "mastered" || correctAttempts >= 2 && totalAttempts >= 3;

      return {
        ...word,
        reviewStage,
        correctAttempts,
        totalAttempts,
        mastered,
        dueOn: nextDueDate(reviewStage, now),
      };
    }),
    wordMistakes: mergeMistakeRecords(
      household.wordMistakes ?? [],
      incorrectCounts,
      dateKey(now),
    ),
  };
}

export function updateDailyWeakWordLimit(
  household: HouseholdSpace,
  dailyWeakWordLimit: number,
): HouseholdSpace {
  return {
    ...household,
    settings: {
      ...household.settings,
      dailyWeakWordLimit: clampDailyWordCount(dailyWeakWordLimit),
    },
  };
}

export function updateWordPracticeSettings(
  household: HouseholdSpace,
  input: Partial<HouseholdSettings>,
): HouseholdSpace {
  return {
    ...household,
    settings: {
      ...household.settings,
      dailyNewWordCount:
        input.dailyNewWordCount === undefined
          ? household.settings.dailyNewWordCount
          : clampDailyWordCount(input.dailyNewWordCount),
      dailyWeakWordLimit:
        input.dailyWeakWordLimit === undefined
          ? household.settings.dailyWeakWordLimit
          : clampDailyWordCount(input.dailyWeakWordLimit),
      currentWordTheme: input.currentWordTheme?.trim() || household.settings.currentWordTheme,
    },
  };
}

export function addGuardianTopicWord(
  household: HouseholdSpace,
  input: GuardianTopicWordInput,
): HouseholdSpace {
  const existing = [...household.wordBank, ...household.weakWords].some(
    (word) => word.term.toLowerCase() === input.term.trim().toLowerCase(),
  );

  if (existing || !input.term.trim()) {
    return household;
  }

  return {
    ...household,
    wordBank: [
      ...household.wordBank,
      {
        term: input.term.trim(),
        chineseGloss: input.chineseGloss.trim() || "待补充",
        theme: household.settings.currentWordTheme,
        source: "guardian",
      },
    ],
  };
}

export function addGuardianPrompt(
  household: HouseholdSpace,
  input: GuardianPromptInput,
): HouseholdSpace {
  if (!input.title.trim() || !input.question.trim()) {
    return household;
  }

  return {
    ...household,
    presetPrompts: [
      ...household.presetPrompts,
      {
        id: `${input.part}-${slugify(input.title)}-${household.presetPrompts.length + 1}`,
        title: input.title.trim(),
        question: input.question.trim(),
        part: input.part,
        imageUrl: input.imageUrl,
      },
    ],
  };
}

export function addRecentRecording(
  household: HouseholdSpace,
  input: RecentRecordingInput,
  now: Date,
): HouseholdSpace {
  return purgeExpiredRecentRecordings(
    {
      ...household,
      recentRecordings: [
        ...household.recentRecordings,
        {
          id: `recording-${now.getTime()}`,
          promptTitle: input.promptTitle,
          recordedAt: now.toISOString(),
          audioUrl: input.audioUrl,
        },
      ],
    },
    now,
  );
}

export function completeDailySession(
  household: HouseholdSpace,
  session: DailySession,
  input: DailySessionCompletionInput,
  now: Date,
): HouseholdSpace {
  const completedOn = dateKey(now);
  const sessionRecord: DailySessionRecord = {
    id: session.id,
    completedOn,
    durationMinutes: input.durationMinutes,
    feedbackSummary: input.feedback?.feedback.chinese,
  };

  return purgeExpiredRecentRecordings(
    {
      ...household,
      dailySessions: replaceById(household.dailySessions, sessionRecord),
      weakWords: mergeWeakWords(household.weakWords, input.feedback?.weakWords ?? []),
    },
    now,
  );
}

export function getGuardianProgress(
  household: HouseholdSpace,
  now: Date,
): GuardianProgress {
  const cutoff = retentionCutoffDateKey(now);
  const today = dateKey(now);
  const cleaned = purgeExpiredRecentRecordings(household, now);

  return {
    recentSessions: household.dailySessions.filter((session) => session.completedOn >= cutoff),
    practiceStreakDays: countPracticeStreak(household.dailySessions, today),
    recentWeakWords: household.weakWords
      .filter((word) => !word.mastered)
      .map((word) => word.term),
    masteredWords: household.weakWords
      .filter((word) => word.mastered)
      .map((word) => word.term),
    recentRecordings: cleaned.recentRecordings,
  };
}

export function purgeExpiredRecentRecordings(
  household: HouseholdSpace,
  now: Date,
): HouseholdSpace {
  const cutoff = retentionCutoffDateKey(now);

  return {
    ...household,
    recentRecordings: household.recentRecordings.filter(
      (recording) => dateKey(new Date(recording.recordedAt)) >= cutoff,
    ),
  };
}

function findPrompt(household: HouseholdSpace, part: Prompt["part"]): Prompt {
  const prompt = [...household.presetPrompts].reverse().find((item) => item.part === part);

  if (!prompt) {
    throw new Error(`Missing preset prompt for ${part}`);
  }

  return prompt;
}

function selectDailyWeakWords(household: HouseholdSpace, today: string): WeakWord[] {
  const limit = clampDailyWordCount(
    household.settings?.dailyWeakWordLimit ?? defaultDailyWeakWordLimit,
  );
  const wordsByTerm = new Map(
    household.weakWords
      .filter((word) => !word.mastered)
      .map((word) => [word.term.toLowerCase(), word]),
  );
  const yesterday = previousDateKey(today);
  const selectedTerms = new Set<string>();
  const priorityWords = [...(household.wordMistakes ?? [])]
    .filter((record) => record.reviewedOn === yesterday)
    .sort((a, b) => b.mistakeCount - a.mistakeCount || a.term.localeCompare(b.term))
    .flatMap((record) => {
      const key = record.term.toLowerCase();
      const word = wordsByTerm.get(key);

      if (!word || selectedTerms.has(key)) {
        return [];
      }

      selectedTerms.add(key);
      return [word];
    });
  const randomFill = seededShuffle(
    [...wordsByTerm.values()].filter((word) => !selectedTerms.has(word.term.toLowerCase())),
    `${household.learnerName}:${today}:weak-words`,
  );

  return [...priorityWords, ...randomFill].slice(0, limit);
}

function selectDailyNewWords(household: HouseholdSpace, today: string): WordBankItem[] {
  const limit = clampDailyWordCount(
    household.settings?.dailyNewWordCount ?? defaultDailyNewWordCount,
  );
  const theme = household.settings?.currentWordTheme || defaultWordTheme;
  const blockedTerms = new Set([
    ...(household.seenWords ?? []).map((word) => vocabularyLearningKey(word.term)),
    ...(household.weakWords ?? []).map((word) => vocabularyLearningKey(word.term)),
  ]);
  const wordBank = uniqueVocabularyLearningUnits(uniqueVocabularyItems(household.wordBank ?? []));
  const unseenWords = wordBank.filter(
    (word) => !blockedTerms.has(vocabularyLearningKey(word.term)),
  );
  const themed = unseenWords.filter((word) => word.theme === theme);
  const themedSelection = seededShuffle(themed, `${household.learnerName}:${today}:${theme}:new-words`);

  if (themedSelection.length >= limit) {
    return themedSelection.slice(0, limit);
  }

  const selectedTerms = new Set(themedSelection.map((word) => vocabularyLearningKey(word.term)));
  const fallback = seededShuffle(
    unseenWords.filter((word) => !selectedTerms.has(vocabularyLearningKey(word.term))),
    `${household.learnerName}:${today}:fallback-new-words`,
  );

  return [...themedSelection, ...fallback].slice(0, limit);
}

function uniqueVocabularyItems(words: WordBankItem[]): WordBankItem[] {
  const byTerm = new Map<string, WordBankItem>();

  for (const word of words) {
    const normalizedTerm = normalizeVocabularyTerm(word.term);
    if (!normalizedTerm) continue;

    const normalizedWord = {
      ...word,
      term: normalizedTerm,
    };
    const key = normalizedTerm.toLowerCase();
    const existing = byTerm.get(key);

    if (!existing || word.term === normalizedTerm && existing.chineseGloss === "Cambridge B1/PET 官方词表") {
      byTerm.set(key, normalizedWord);
    }
  }

  return Array.from(byTerm.values());
}

function uniqueVocabularyLearningUnits(words: WordBankItem[]): WordBankItem[] {
  const byLearningKey = new Map<string, WordBankItem>();

  for (const word of words) {
    const key = vocabularyLearningKey(word.term);
    const existing = byLearningKey.get(key);

    if (!existing || word.term.split(" ").length > existing.term.split(" ").length) {
      byLearningKey.set(key, word);
    }
  }

  return Array.from(byLearningKey.values());
}

function vocabularyLearningKey(term: string): string {
  const normalized = normalizeVocabularyTerm(term).toLowerCase();

  return normalized === "climate" || normalized === "climate change"
    ? "climate-change"
    : normalized;
}

function countPracticeStreak(records: DailySessionRecord[], today: string): number {
  const completedDays = new Set(records.map((record) => record.completedOn));
  let cursor = completedDays.has(today) ? today : previousDateKey(today);
  let streak = 0;

  while (completedDays.has(cursor)) {
    streak += 1;
    cursor = previousDateKey(cursor);
  }

  return streak;
}

function dateKey(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function previousDateKey(value: string): string {
  const date = new Date(`${value}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() - 1);
  return date.toISOString().slice(0, 10);
}

function retentionCutoffDateKey(now: Date): string {
  const date = new Date(now);
  date.setUTCDate(date.getUTCDate() - 7);
  return dateKey(date);
}

function extractWeakWords(transcript: string): WeakWord[] {
  const lower = transcript.toLowerCase();
  const candidates: Array<VocabularyItem & { reason: WeakWordReason }> = [
    { term: "usually", chineseGloss: "通常", reason: "pronunciation" },
    { term: "because", chineseGloss: "因为", reason: "usage" },
    { term: "environment", chineseGloss: "环境", reason: "recall" },
  ];

  return candidates
    .filter((candidate) => lower.includes(candidate.term))
    .map((candidate) =>
      makeWeakWord(candidate.term, candidate.chineseGloss, "new", "2026-06-27", candidate.reason),
    );
}

function choosePart1FollowUp(answer: string, previousTurnCount: number): string {
  const wordCount = countWords(answer);

  if (wordCount < 4) {
    return "Can you tell me more about that?";
  }

  if (!/\bbecause\b|\bso\b|\bfor example\b/i.test(answer)) {
    return "Why do you think so?";
  }

  if (previousTurnCount <= 1) {
    return "How often do you do that?";
  }

  return "Can you give me one example?";
}

function countWords(value: string): number {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

function normalizeSpokenText(value: string): string {
  return value.toLowerCase().replace(/[^a-z]+/g, "");
}

function scorePronunciationMatch(target: string, spoken: string): number {
  if (!target || !spoken) return 35;
  if (spoken === target) return 96;
  if (spoken.includes(target)) return 90;

  const similarity = similarityRatio(target, spoken);
  if (similarity >= 0.86) return 78;
  if (similarity >= 0.7) return 66;
  if (similarity >= 0.52) return 52;
  return 40;
}

function similarityRatio(left: string, right: string): number {
  const distance = levenshteinDistance(left, right);
  return 1 - distance / Math.max(left.length, right.length, 1);
}

function levenshteinDistance(left: string, right: string): number {
  const previous = Array.from({ length: right.length + 1 }, (_, index) => index);

  for (let leftIndex = 0; leftIndex < left.length; leftIndex += 1) {
    const current = [leftIndex + 1];

    for (let rightIndex = 0; rightIndex < right.length; rightIndex += 1) {
      const insertCost = current[rightIndex] + 1;
      const deleteCost = previous[rightIndex + 1] + 1;
      const replaceCost =
        previous[rightIndex] + (left[leftIndex] === right[rightIndex] ? 0 : 1);

      current.push(Math.min(insertCost, deleteCost, replaceCost));
    }

    previous.splice(0, previous.length, ...current);
  }

  return previous[right.length] ?? 0;
}

function wordShadowingFeedbackText(word: string, score: number, spokenText: string): string {
  if (!spokenText.trim()) {
    return `AI 没有稳定识别到 “${word}”。请靠近麦克风，再按英音示范重读一次。`;
  }

  if (score >= 85) {
    return `“${word}” 识别比较清楚，可以继续放进完整句子里练。`;
  }

  if (score >= 65) {
    return `“${word}” 大致能识别出来，但还可以把重音和结尾音再读清楚一点。`;
  }

  return `AI 听到的内容和 “${word}” 差距较大。先听英音，再慢速跟读一遍。`;
}

function makeTranscriptMatchDetails(
  score: number,
  spokenText: string,
): WordShadowingFeedback["details"] {
  if (!spokenText.trim()) {
    return {
      pronunciation: {
        score: 35,
        feedback: "本次没有识别到稳定英文，先确认麦克风输入和音量。",
      },
      stress: {
        score: 35,
        feedback: "没有可分析的音频识别结果，暂时无法判断重音。",
      },
      clarity: {
        score: 35,
        feedback: "清晰度不足或录音太短，请靠近麦克风再试。",
      },
    };
  }

  return {
    pronunciation: {
      score,
      feedback: score >= 85 ? "目标词识别清楚。" : "目标词识别还不够稳定。",
    },
    stress: {
      score: Math.max(40, Math.min(92, score - 4)),
      feedback: "当前为转写匹配估算，重音只做粗略参考。",
    },
    clarity: {
      score: Math.max(40, Math.min(94, score + 2)),
      feedback: score >= 85 ? "录音整体清楚。" : "请放慢速度，把词尾读完整。",
    },
  };
}

function mergeWeakWords(current: WeakWord[], incoming: WeakWord[]): WeakWord[] {
  const byTerm = new Map(current.map((word) => [word.term.toLowerCase(), word]));

  for (const word of incoming) {
    const key = word.term.toLowerCase();
    const existing = byTerm.get(key);

    byTerm.set(
      key,
      existing
        ? {
            ...existing,
            mastered: false,
            reason: existing.reason ?? word.reason,
          }
        : normalizeWeakWord(word),
    );
  }

  return Array.from(byTerm.values());
}

function mergeSeenWords(
  current: SeenWord[],
  wordBank: WordBankItem[],
  terms: string[],
  seenOn: string,
): SeenWord[] {
  const byTerm = new Map(current.map((word) => [word.term.toLowerCase(), word]));
  const bankByTerm = new Map(wordBank.map((word) => [word.term.toLowerCase(), word]));

  for (const term of terms) {
    const key = term.toLowerCase();
    const existing = byTerm.get(key);
    const bankWord = bankByTerm.get(key);

    if (!bankWord) continue;

    byTerm.set(key, {
      term: bankWord.term,
      chineseGloss: bankWord.chineseGloss,
      theme: bankWord.theme,
      seenOn,
      successfulUses: (existing?.successfulUses ?? 0) + 1,
    });
  }

  return Array.from(byTerm.values());
}

function normalizeWeakWord(word: WeakWord): WeakWord {
  return {
    ...word,
    reason: word.reason ?? "usage",
    correctAttempts: word.correctAttempts ?? 0,
    totalAttempts: word.totalAttempts ?? 0,
  };
}

function mergeMistakeRecords(
  current: WeakWordMistakeRecord[],
  incorrectCounts: Map<string, number>,
  reviewedOn: string,
): WeakWordMistakeRecord[] {
  if (incorrectCounts.size === 0) {
    return current;
  }

  const byKey = new Map(
    current.map((record) => [`${record.reviewedOn}:${record.term.toLowerCase()}`, record]),
  );

  for (const [term, count] of incorrectCounts) {
    const key = `${reviewedOn}:${term.toLowerCase()}`;
    const existing = byKey.get(key);

    byKey.set(key, {
      id: existing?.id ?? `mistake-${reviewedOn}-${slugify(term)}`,
      term,
      reviewedOn,
      mistakeCount: (existing?.mistakeCount ?? 0) + count,
    });
  }

  return Array.from(byKey.values()).sort(
    (a, b) => a.reviewedOn.localeCompare(b.reviewedOn) || a.term.localeCompare(b.term),
  );
}

function replaceById(records: DailySessionRecord[], incoming: DailySessionRecord) {
  const others = records.filter((record) => record.id !== incoming.id);
  return [...others, incoming].sort((a, b) => a.completedOn.localeCompare(b.completedOn));
}

function clampDailyWordCount(value: number): number {
  if (!Number.isFinite(value)) {
    return defaultDailyWeakWordLimit;
  }

  return Math.min(20, Math.max(1, Math.round(value)));
}

function makeWeakWord(
  term: string,
  chineseGloss: string,
  reviewStage: ReviewStage,
  dueOn: string,
  reason: WeakWordReason,
  correctAttempts = 0,
  totalAttempts = 0,
): WeakWord {
  return {
    term,
    chineseGloss,
    reviewStage,
    dueOn,
    mastered: reviewStage === "mastered",
    reason,
    correctAttempts,
    totalAttempts,
  };
}

function seededShuffle<T>(items: T[], seed: string): T[] {
  return items
    .map((item, index) => ({
      item,
      order: hashString(`${seed}:${index}`),
    }))
    .sort((a, b) => a.order - b.order)
    .map(({ item }) => item);
}

function hashString(value: string): number {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function uniqueValues(values: Array<string | undefined>): string[] {
  return Array.from(new Set(values.filter((value): value is string => Boolean(value))));
}

function isLegacyGeneratedPart2Image(imageUrl: string | undefined): boolean {
  return imageUrl?.startsWith("data:image/svg+xml") ?? false;
}

function nextReviewStage(stage: ReviewStage): ReviewStage {
  if (stage === "new") return "tomorrow";
  if (stage === "tomorrow") return "threeDaysLater";
  return "mastered";
}

function previousReviewStage(stage: ReviewStage): ReviewStage {
  if (stage === "mastered") return "threeDaysLater";
  if (stage === "threeDaysLater") return "tomorrow";
  return "new";
}

function nextDueDate(stage: ReviewStage, now: Date): string {
  if (stage === "mastered") {
    return dateKey(now);
  }

  const date = new Date(now);
  date.setUTCDate(date.getUTCDate() + (stage === "threeDaysLater" ? 3 : 1));
  return dateKey(date);
}
