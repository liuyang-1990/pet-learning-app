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
    answer: {
      focusWord: "answer",
      sentence: "I wrote the answer at the top of my worksheet.",
      chinese: "answer = 答案；我把答案写在练习纸的最上面。",
    },
    article: {
      focusWord: "article",
      sentence: "Our teacher gave us an article about space to read.",
      chinese: "article = 文章；老师给了我们一篇关于太空的文章阅读。",
    },
    bookcase: {
      focusWord: "bookcase",
      sentence: "The new bookcase is beside the classroom door.",
      chinese: "bookcase = 书架；新书架在教室门旁边。",
    },
    bookshelf: {
      focusWord: "bookshelf",
      sentence: "Put the dictionary back on the bookshelf.",
      chinese: "bookshelf = 书架；把词典放回书架上。",
    },
    chapter: {
      focusWord: "chapter",
      sentence: "We read the first chapter before the lesson.",
      chinese: "chapter = 章；上课前我们读了第一章。",
    },
    college: {
      focusWord: "college",
      sentence: "My sister wants to study art at college.",
      chinese: "college = 大学；我姐姐想在大学学习艺术。",
    },
    course: {
      focusWord: "course",
      sentence: "This course teaches us how to write short essays.",
      chinese: "course = 课程；这门课程教我们怎样写短文。",
    },
    dictionary: {
      focusWord: "dictionary",
      sentence: "Use a dictionary when you do not know a word.",
      chinese: "dictionary = 词典；不知道一个单词时就用词典。",
    },
    education: {
      focusWord: "education",
      sentence: "Every child deserves a good education.",
      chinese: "education = 教育；每个孩子都应得到良好的教育。",
    },
    essay: {
      focusWord: "essay",
      sentence: "I finished my essay about my favourite place.",
      chinese: "essay = 短文；我完成了关于我最喜欢的地方的短文。",
    },
    calendar: {
      focusWord: "calendar",
      sentence: "Our class calendar shows the dates of all the tests.",
      chinese: "calendar = 日历；我们班的日历标出了所有测试的日期。",
    },
    exercise: {
      focusWord: "exercise",
      sentence: "We did a grammar exercise before lunch.",
      chinese: "exercise = 练习；午饭前我们做了一道语法练习。",
    },
    explain: {
      focusWord: "explain",
      sentence: "Please explain the question in a simpler way.",
      chinese: "explain = 解释；请用更简单的方式解释这个问题。",
    },
    grammar: {
      focusWord: "grammar",
      sentence: "This grammar rule is easy to remember.",
      chinese: "grammar = 语法；这条语法规则很容易记住。",
    },
    learn: {
      focusWord: "learn",
      sentence: "We learn five new English words each week.",
      chinese: "learn = 学习；我们每周学习五个新的英语单词。",
    },
    mark: {
      focusWord: "mark",
      sentence: "I got a high mark in my science test.",
      chinese: "mark = 分数；我的科学测试得了高分。",
    },
    maths: {
      focusWord: "maths / mathematics",
      sentence: "Maths is easier when I check every answer.",
      chinese: "maths / mathematics = 数学；我检查每个答案时，数学就更容易。",
    },
    mistake: {
      focusWord: "mistake",
      sentence: "I found one spelling mistake in my homework.",
      chinese: "mistake = 错误；我在家庭作业中发现了一个拼写错误。",
    },
    note: {
      focusWord: "note",
      sentence: "Take notes while the teacher explains the topic.",
      chinese: "note = 笔记；老师讲解这个主题时记笔记。",
    },
    notebook: {
      focusWord: "notebook",
      sentence: "My notebook is full of science notes.",
      chinese: "notebook = 笔记本；我的笔记本里记满了科学笔记。",
    },
    paper: {
      focusWord: "paper",
      sentence: "Hand your paper to the teacher when you finish.",
      chinese: "paper = 试卷；完成后把试卷交给老师。",
    },
    pencil: {
      focusWord: "pencil",
      sentence: "Use a pencil to draw the diagram.",
      chinese: "pencil = 铅笔；用铅笔画这张图。",
    },
    pencilcase: {
      focusWord: "pencil case",
      sentence: "My pencil case is under the desk.",
      chinese: "pencil case = 铅笔盒；我的铅笔盒在书桌下面。",
    },
    pupil: {
      focusWord: "pupil",
      sentence: "Each pupil chose a book from the library.",
      chinese: "pupil = 学生；每个学生都从图书馆选了一本书。",
    },
    read: {
      focusWord: "read",
      sentence: "Read the instructions before you start the test.",
      chinese: "read = 阅读；开始测试前先阅读说明。",
    },
    reading: {
      focusWord: "reading",
      sentence: "Reading every day improves my vocabulary.",
      chinese: "reading = 阅读；每天阅读能提高我的词汇量。",
    },
    research: {
      focusWord: "research",
      sentence: "Our group did research for the history project.",
      chinese: "research = 研究；我们小组为历史课题做了研究。",
    },
    revise: {
      focusWord: "revise",
      sentence: "I revise my notes before an important test.",
      chinese: "revise = 复习；重要测试前我复习笔记。",
    },
    science: {
      focusWord: "science",
      sentence: "Science helps us understand how plants grow.",
      chinese: "science = 科学；科学帮助我们理解植物如何生长。",
    },
    spelling: {
      focusWord: "spelling",
      sentence: "Check the spelling before you send the message.",
      chinese: "spelling = 拼写；发送消息前检查拼写。",
    },
    study: {
      focusWord: "study",
      sentence: "We study quietly in the library after school.",
      chinese: "study = 学习；放学后我们在图书馆安静学习。",
    },
    teach: {
      focusWord: "teach",
      sentence: "Our teacher can teach difficult ideas clearly.",
      chinese: "teach = 教；我们的老师能清楚地讲授难懂的概念。",
    },
    teaching: {
      focusWord: "teaching",
      sentence: "Good teaching makes a hard subject easier.",
      chinese: "teaching = 教学；好的教学能让难的科目变得容易。",
    },
    test: {
      focusWord: "test",
      sentence: "We have a vocabulary test on Friday morning.",
      chinese: "test = 测试；我们星期五早上有词汇测试。",
    },
    textbook: {
      focusWord: "textbook",
      sentence: "Open your textbook to page twenty.",
      chinese: "textbook = 教科书；把教科书翻到第二十页。",
    },
    university: {
      focusWord: "university",
      sentence: "He hopes to study engineering at university.",
      chinese: "university = 大学；他希望在大学学习工程学。",
    },
    write: {
      focusWord: "write",
      sentence: "Write your name at the top of the page.",
      chinese: "write = 写；把你的名字写在页面顶部。",
    },
    writedown: {
      focusWord: "write down",
      sentence: "Write down the homework before you leave class.",
      chinese: "write down = 写下；离开教室前写下家庭作业。",
    },
    calculator: {
      focusWord: "calculator",
      sentence: "Use a calculator to check the final number.",
      chinese: "calculator = 计算器；用计算器核对最后的数字。",
    },
    computer: {
      focusWord: "computer",
      sentence: "We used the computer to finish our project.",
      chinese: "computer = 电脑；我们用电脑完成了课题。",
    },
    desk: {
      focusWord: "desk",
      sentence: "There is a map on the teacher's desk.",
      chinese: "desk = 书桌；老师的桌子上有一张地图。",
    },
    document: {
      focusWord: "document",
      sentence: "Save the document before you close the computer.",
      chinese: "document = 文件；关闭电脑前保存这份文件。",
    },
    file: {
      focusWord: "file",
      sentence: "Put the homework file in the class folder.",
      chinese: "file = 文件；把家庭作业文件放进班级文件夹。",
    },
    keyboard: {
      focusWord: "keyboard",
      sentence: "My keyboard is missing the letter A.",
      chinese: "keyboard = 键盘；我的键盘少了字母 A。",
    },
    language: {
      focusWord: "language",
      sentence: "English is the language we practise after lunch.",
      chinese: "language = 语言；英语是我们午饭后练习的语言。",
    },
    message: {
      focusWord: "message",
      sentence: "The teacher sent a message about tomorrow's lesson.",
      chinese: "message = 消息；老师发了一条关于明天课程的消息。",
    },
    question: {
      focusWord: "question",
      sentence: "Raise your hand if you have a question.",
      chinese: "question = 问题；如果你有问题就举手。",
    },
    record: {
      focusWord: "record",
      sentence: "The school keeps a record of every pupil's attendance.",
      chinese: "record = 记录；学校保存每个学生的出勤记录。",
    },
    skill: {
      focusWord: "skill",
      sentence: "Listening is an important skill for language learners.",
      chinese: "skill = 技能；听力是语言学习者的重要技能。",
    },
    translate: {
      focusWord: "translate",
      sentence: "Can you translate this sentence into Chinese?",
      chinese: "translate = 翻译；你能把这个句子翻译成中文吗？",
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
    apartment: {
      focusWord: "apartment",
      sentence: "My aunt lives in a small apartment near the park.",
      chinese: "apartment = 公寓；我阿姨住在公园附近的一间小公寓里。",
    },
    apartmentbuilding: {
      focusWord: "apartment building",
      sentence: "The apartment building has a lift near the entrance.",
      chinese: "apartment building = 公寓大楼；这栋公寓大楼在入口旁有一部电梯。",
    },
    bath: {
      focusWord: "bath",
      sentence: "I had a warm bath before bedtime.",
      chinese: "bath = 沐浴；睡觉前我洗了个热水澡。",
    },
    bathroom: {
      focusWord: "bathroom",
      sentence: "The bathroom window was open after the shower.",
      chinese: "bathroom = 浴室；淋浴后浴室的窗户开着。",
    },
    bed: {
      focusWord: "bed",
      sentence: "I made my bed before I went to school.",
      chinese: "bed = 床；上学前我整理了床铺。",
    },
    bedroom: {
      focusWord: "bedroom",
      sentence: "My bedroom is quiet in the early morning.",
      chinese: "bedroom = 卧室；清晨我的卧室很安静。",
    },
    blanket: {
      focusWord: "blanket",
      sentence: "Put another blanket on the bed because it is cold.",
      chinese: "blanket = 毛毯；天冷了，在床上再放一条毛毯。",
    },
    bottle: {
      focusWord: "bottle",
      sentence: "Please put the empty bottle in the bin.",
      chinese: "bottle = 瓶子；请把空瓶子放进垃圾箱。",
    },
    bottlebank: {
      focusWord: "bottle bank",
      sentence: "We took empty bottles to the bottle bank on Saturday.",
      chinese: "bottle bank = 玻璃瓶回收站；星期六我们把空瓶子送到玻璃瓶回收站。",
    },
    carpet: {
      focusWord: "carpet",
      sentence: "The cat is sleeping on the blue carpet.",
      chinese: "carpet = 地毯；猫正睡在蓝色地毯上。",
    },
    chair: {
      focusWord: "chair",
      sentence: "There is a chair beside my desk.",
      chinese: "chair = 椅子；我的书桌旁有一把椅子。",
    },
    changingroom: {
      focusWord: "changing room",
      sentence: "Leave your coat in the changing room.",
      chinese: "changing room = 更衣室；把外套留在更衣室里。",
    },
    cottage: {
      focusWord: "cottage",
      sentence: "We rented a small cottage by the sea.",
      chinese: "cottage = 小屋；我们在海边租了一间小屋。",
    },
    cupboard: {
      focusWord: "cupboard",
      sentence: "The cups are in the cupboard above the sink.",
      chinese: "cupboard = 碗柜；杯子在水槽上方的碗柜里。",
    },
    cushion: {
      focusWord: "cushion",
      sentence: "The sofa has two soft cushions.",
      chinese: "cushion = 垫子；沙发上有两个柔软的垫子。",
    },
    diningroom: {
      focusWord: "dining room",
      sentence: "We eat dinner together in the dining room.",
      chinese: "dining room = 饭厅；我们在饭厅一起吃晚饭。",
    },
    door: {
      focusWord: "door",
      sentence: "Please close the door when you leave the room.",
      chinese: "door = 门；离开房间时请关门。",
    },
    flat: {
      focusWord: "flat",
      sentence: "Her flat is on the third floor.",
      chinese: "flat = 公寓；她的公寓在三楼。",
    },
    floor: {
      focusWord: "floor",
      sentence: "My wet shoes made marks on the floor.",
      chinese: "floor = 地板；我的湿鞋在地板上留下了印子。",
    },
    fork: {
      focusWord: "fork",
      sentence: "Use a fork to eat the salad.",
      chinese: "fork = 叉子；用叉子吃沙拉。",
    },
    fridge: {
      focusWord: "fridge",
      sentence: "The milk is in the fridge.",
      chinese: "fridge = 冰箱；牛奶在冰箱里。",
    },
    furniture: {
      focusWord: "furniture",
      sentence: "We chose new furniture for the living room.",
      chinese: "furniture = 家具；我们为客厅挑选了新家具。",
    },
    garage: {
      focusWord: "garage",
      sentence: "Dad keeps his bicycle in the garage.",
      chinese: "garage = 车库；爸爸把自行车放在车库里。",
    },
    guesthouse: {
      focusWord: "guest-house",
      sentence: "We stayed in a quiet guest-house near the beach.",
      chinese: "guest-house = 招待所；我们住在海滩附近一家安静的招待所。",
    },
    hall: {
      focusWord: "hall",
      sentence: "Please leave your shoes in the hall.",
      chinese: "hall = 门厅；请把鞋放在门厅里。",
    },
    home: {
      focusWord: "home",
      sentence: "I was happy to be home after the long journey.",
      chinese: "home = 家；长途旅行后回到家我很高兴。",
    },
    house: {
      focusWord: "house",
      sentence: "Our house has a small garden behind it.",
      chinese: "house = 房子；我们房子后面有一个小花园。",
    },
    housework: {
      focusWord: "housework",
      sentence: "We share the housework at weekends.",
      chinese: "housework = 家务；周末我们分担家务。",
    },
    key: {
      focusWord: "key",
      sentence: "I cannot find the key to the front door.",
      chinese: "key = 钥匙；我找不到前门的钥匙。",
    },
    kitchen: {
      focusWord: "kitchen",
      sentence: "Mum is making soup in the kitchen.",
      chinese: "kitchen = 厨房；妈妈正在厨房里做汤。",
    },
    lamp: {
      focusWord: "lamp",
      sentence: "Turn on the lamp when it gets dark.",
      chinese: "lamp = 灯；天黑时打开灯。",
    },
    livingroom: {
      focusWord: "living room",
      sentence: "We watched a film in the living room.",
      chinese: "living room = 客厅；我们在客厅看了一部电影。",
    },
    mirror: {
      focusWord: "mirror",
      sentence: "I looked in the mirror before leaving home.",
      chinese: "mirror = 镜子；离家前我照了照镜子。",
    },
    property: {
      focusWord: "property",
      sentence: "Their house is their most valuable property.",
      chinese: "property = 财产；他们的房子是最有价值的财产。",
    },
    roof: {
      focusWord: "roof",
      sentence: "Rain was falling loudly on the roof.",
      chinese: "roof = 屋顶；雨正大声地落在屋顶上。",
    },
    room: {
      focusWord: "room",
      sentence: "Is there enough room for another chair?",
      chinese: "room = 空间；还有足够空间放另一把椅子吗？",
    },
    shelf: {
      focusWord: "shelf",
      sentence: "Put the photo on the top shelf.",
      chinese: "shelf = 架子；把照片放在最上面的架子上。",
    },
    shower: {
      focusWord: "shower",
      sentence: "I took a quick shower before breakfast.",
      chinese: "shower = 淋浴；早饭前我快速冲了个澡。",
    },
    sittingroom: {
      focusWord: "sitting room",
      sentence: "We played a game in the sitting room.",
      chinese: "sitting room = 起居室；我们在起居室里玩了一个游戏。",
    },
    sofa: {
      focusWord: "sofa",
      sentence: "The dog jumped onto the sofa.",
      chinese: "sofa = 沙发；狗跳到了沙发上。",
    },
    table: {
      focusWord: "table",
      sentence: "Please set the table for dinner.",
      chinese: "table = 餐桌；请为晚饭摆好餐桌。",
    },
    tablecloth: {
      focusWord: "table-cloth",
      sentence: "The red table-cloth is clean and dry.",
      chinese: "table-cloth = 台布；这块红色台布干净又干燥。",
    },
    toothpaste: {
      focusWord: "toothpaste",
      sentence: "I need more toothpaste for my toothbrush.",
      chinese: "toothpaste = 牙膏；我的牙刷需要更多牙膏。",
    },
    waitingroom: {
      focusWord: "waiting room",
      sentence: "We waited in the waiting room before the dentist saw me.",
      chinese: "waiting room = 等候室；牙医看我之前，我们在等候室等着。",
    },
    wall: {
      focusWord: "wall",
      sentence: "There is a family photo on the wall.",
      chinese: "wall = 墙；墙上有一张全家福。",
    },
    window: {
      focusWord: "window",
      sentence: "Open the window to let in some fresh air.",
      chinese: "window = 窗户；打开窗户让新鲜空气进来。",
    },
    brother: {
      focusWord: "brother",
      sentence: "My brother helps me carry the shopping bags.",
      chinese: "brother = 兄弟；我哥哥帮我提购物袋。",
    },
    dad: {
      focusWord: "dad",
      sentence: "My dad cooks breakfast on Sundays.",
      chinese: "dad = 爸爸；我爸爸星期天做早饭。",
    },
    mum: {
      focusWord: "mum",
      sentence: "My mum reads with me before bed.",
      chinese: "mum = 妈妈；我妈妈睡前和我一起阅读。",
    },
    sister: {
      focusWord: "sister",
      sentence: "My sister keeps her books on the shelf.",
      chinese: "sister = 姐妹；我姐姐把书放在架子上。",
    },
    aunt: {
      focusWord: "aunt",
      sentence: "My aunt visits us every Sunday afternoon.",
      chinese: "aunt = 阿姨；我阿姨每个星期天下午来看我们。",
    },
    daughter: {
      focusWord: "daughter",
      sentence: "Their daughter started secondary school this year.",
      chinese: "daughter = 女儿；他们的女儿今年开始上中学。",
    },
    family: {
      focusWord: "family",
      sentence: "My family eats dinner together every evening.",
      chinese: "family = 家人；我的家人每天晚上一起吃晚饭。",
    },
    father: {
      focusWord: "father",
      sentence: "Her father drives her to school on rainy days.",
      chinese: "father = 父亲；下雨天她父亲开车送她上学。",
    },
    grandfather: {
      focusWord: "grandfather",
      sentence: "My grandfather tells us funny stories about his childhood.",
      chinese: "grandfather = 祖父；我祖父给我们讲他童年的趣事。",
    },
    grandmother: {
      focusWord: "grandmother",
      sentence: "His grandmother grows vegetables in her garden.",
      chinese: "grandmother = 祖母；他的祖母在花园里种蔬菜。",
    },
    husband: {
      focusWord: "husband",
      sentence: "Her husband works at the hospital near our house.",
      chinese: "husband = 丈夫；她丈夫在我们家附近的医院工作。",
    },
    married: {
      focusWord: "married",
      sentence: "They have been married for ten years.",
      chinese: "married = 已婚的；他们已经结婚十年了。",
    },
    mother: {
      focusWord: "mother",
      sentence: "My mother taught me how to make soup.",
      chinese: "mother = 母亲；我母亲教我怎样做汤。",
    },
    son: {
      focusWord: "son",
      sentence: "Their son plays basketball after school.",
      chinese: "son = 儿子；他们的儿子放学后打篮球。",
    },
    teenager: {
      focusWord: "teenager",
      sentence: "The teenager saved money for a new bicycle.",
      chinese: "teenager = 青少年；这名青少年攒钱买一辆新自行车。",
    },
    uncle: {
      focusWord: "uncle",
      sentence: "My uncle lives in a town by the sea.",
      chinese: "uncle = 叔叔；我叔叔住在一个海边小镇。",
    },
    wife: {
      focusWord: "wife",
      sentence: "His wife is a science teacher.",
      chinese: "wife = 妻子；他的妻子是一名科学老师。",
    },
    adult: {
      focusWord: "adult",
      sentence: "An adult must sign this form before the trip.",
      chinese: "adult = 成年人；旅行前必须由一名成年人签署这张表。",
    },
    baby: {
      focusWord: "baby",
      sentence: "The baby fell asleep in the car.",
      chinese: "baby = 婴儿；婴儿在车里睡着了。",
    },
    boy: {
      focusWord: "boy",
      sentence: "The boy returned the lost wallet to its owner.",
      chinese: "boy = 男孩；那个男孩把丢失的钱包还给了失主。",
    },
    child: {
      focusWord: "child",
      sentence: "Every child needs a safe place to learn.",
      chinese: "child = 孩子；每个孩子都需要一个安全的学习场所。",
    },
    crowd: {
      focusWord: "crowd",
      sentence: "A large crowd waited outside the stadium.",
      chinese: "crowd = 人群；一大群人在体育场外等待。",
    },
    female: {
      focusWord: "female",
      sentence: "The female athlete won the final race.",
      chinese: "female = 女性的；那位女运动员赢得了决赛。",
    },
    friend: {
      focusWord: "friend",
      sentence: "My friend helped me prepare for the exam.",
      chinese: "friend = 朋友；我的朋友帮我准备考试。",
    },
    girl: {
      focusWord: "girl",
      sentence: "The girl found a quiet seat on the bus.",
      chinese: "girl = 女孩；那个女孩在公共汽车上找到了一个安静的座位。",
    },
    group: {
      focusWord: "group",
      sentence: "Our group finished the project before lunch.",
      chinese: "group = 小组；我们小组在午饭前完成了项目。",
    },
    hero: {
      focusWord: "hero",
      sentence: "The firefighter became a local hero after the rescue.",
      chinese: "hero = 英雄；救援后，那名消防员成了当地英雄。",
    },
    king: {
      focusWord: "king",
      sentence: "The king lived in the old castle.",
      chinese: "king = 国王；国王住在那座古老的城堡里。",
    },
    madam: {
      focusWord: "Madam",
      sentence: "Excuse me, Madam, is this seat yours?",
      chinese: "Madam = 女士；对不起，女士，这个座位是您的吗？",
    },
    male: {
      focusWord: "male",
      sentence: "The male bird has bright blue feathers.",
      chinese: "male = 雄性的；雄鸟有鲜蓝色的羽毛。",
    },
    man: {
      focusWord: "man",
      sentence: "A man helped us carry the heavy box.",
      chinese: "man = 男人；一名男子帮我们搬了那个重箱子。",
    },
    member: {
      focusWord: "member",
      sentence: "Each member of the team received a medal.",
      chinese: "member = 成员；队里的每个成员都获得了一枚奖牌。",
    },
    mr: {
      focusWord: "Mr",
      sentence: "Mr Brown teaches us English on Mondays.",
      chinese: "Mr = 先生；布朗先生每星期一教我们英语。",
    },
    mrs: {
      focusWord: "Mrs",
      sentence: "Mrs Green lives in the flat above ours.",
      chinese: "Mrs = 夫人；格林夫人住在我们楼上的公寓。",
    },
    ms: {
      focusWord: "Ms",
      sentence: "Ms Lee is the new school librarian.",
      chinese: "Ms = 女士；李女士是学校新来的图书管理员。",
    },
    people: {
      focusWord: "people",
      sentence: "Many people use this park at weekends.",
      chinese: "people = 人们；周末很多人使用这个公园。",
    },
    person: {
      focusWord: "person",
      sentence: "Only one person knew the correct answer.",
      chinese: "person = 人；只有一个人知道正确答案。",
    },
    queen: {
      focusWord: "queen",
      sentence: "The queen opened the new hospital.",
      chinese: "queen = 女王；女王为新医院揭幕。",
    },
    role: {
      focusWord: "role",
      sentence: "My role in the play is a young doctor.",
      chinese: "role = 角色；我在戏剧中扮演一名年轻医生。",
    },
    woman: {
      focusWord: "woman",
      sentence: "The woman at the desk answered my question.",
      chinese: "woman = 女人；桌旁的那位女士回答了我的问题。",
    },
    afraid: {
      focusWord: "afraid",
      sentence: "I was afraid when I heard the loud noise.",
      chinese: "afraid = 害怕的；听到巨响时我很害怕。",
    },
    angry: {
      focusWord: "angry",
      sentence: "Dad was angry because I broke the window.",
      chinese: "angry = 生气的；因为我打破了窗户，爸爸很生气。",
    },
    ashamed: {
      focusWord: "ashamed",
      sentence: "I felt ashamed after I told the lie.",
      chinese: "ashamed = 惭愧的；说谎后我感到很惭愧。",
    },
    awful: {
      focusWord: "awful",
      sentence: "The soup tasted awful, so I could not finish it.",
      chinese: "awful = 糟糕的；汤的味道很糟，所以我没能喝完。",
    },
    bored: {
      focusWord: "bored",
      sentence: "We felt bored during the long delay.",
      chinese: "bored = 无聊的；长时间延误期间我们感到很无聊。",
    },
    boring: {
      focusWord: "boring",
      sentence: "The film was boring, and several people left early.",
      chinese: "boring = 无聊的；电影很无聊，有几个人提前离开了。",
    },
    bother: {
      focusWord: "bother",
      sentence: "Does the noise from the road bother you?",
      chinese: "bother = 烦扰；路上的噪音会打扰你吗？",
    },
    comfortable: {
      focusWord: "comfortable",
      sentence: "This chair is comfortable enough for reading.",
      chinese: "comfortable = 舒服的；这把椅子坐着看书很舒服。",
    },
    confused: {
      focusWord: "confused",
      sentence: "I felt confused by the complicated instructions.",
      chinese: "confused = 困惑的；复杂的说明让我感到困惑。",
    },
    danger: {
      focusWord: "danger",
      sentence: "The sign warned swimmers about the danger.",
      chinese: "danger = 危险；标志提醒游泳者注意危险。",
    },
    excited: {
      focusWord: "excited",
      sentence: "The children were excited about the school trip.",
      chinese: "excited = 兴奋的；孩子们对学校旅行感到兴奋。",
    },
    exciting: {
      focusWord: "exciting",
      sentence: "The final match was exciting until the last minute.",
      chinese: "exciting = 令人兴奋的；决赛直到最后一分钟都很精彩。",
    },
    fear: {
      focusWord: "fear",
      sentence: "Her fear of dogs began when she was young.",
      chinese: "fear = 害怕；她对狗的恐惧从小时候就开始了。",
    },
    feellike: {
      focusWord: "feel like",
      sentence: "I feel like having some hot soup.",
      chinese: "feel like = 想要；我想喝一些热汤。",
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
      sentence: "The instructions were clear, so everyone understood.",
      chinese: "clear = 清楚的；说明很清楚，所以每个人都听懂了。",
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
    fun: {
      focusWord: "fun",
      sentence: "We had a lot of fun playing games at the party.",
      chinese: "fun = 乐趣；我们在聚会上玩游戏，玩得很开心。",
    },
    funny: {
      focusWord: "funny",
      sentence: "The story was so funny that everyone laughed.",
      chinese: "funny = 好笑的；这个故事很好笑，大家都笑了。",
    },
    glad: {
      focusWord: "glad",
      sentence: "I am glad you came to watch the match.",
      chinese: "glad = 高兴的；我很高兴你来看比赛。",
    },
    happy: {
      focusWord: "happy",
      sentence: "She felt happy when she passed her driving test.",
      chinese: "happy = 快乐的；她通过驾驶考试时感到很开心。",
    },
    hate: {
      focusWord: "hate",
      sentence: "I hate waiting for buses in the rain.",
      chinese: "hate = 讨厌；我讨厌在雨中等公共汽车。",
    },
    hope: {
      focusWord: "hope",
      sentence: "I hope the weather is sunny tomorrow.",
      chinese: "hope = 希望；我希望明天天气晴朗。",
    },
    hopeless: {
      focusWord: "hopeless",
      sentence: "The broken bike looked hopeless, but Dad managed to fix it.",
      chinese: "hopeless = 没有希望的；那辆坏自行车看起来没法修了，但爸爸还是把它修好了。",
    },
    horrible: {
      focusWord: "horrible",
      sentence: "The milk smelled horrible, so I threw it away.",
      chinese: "horrible = 糟糕的；牛奶闻起来很糟，所以我把它扔了。",
    },
    inlove: {
      focusWord: "in love",
      sentence: "They met at university and soon fell in love.",
      chinese: "in love = 恋爱中；他们在大学相识，很快就相爱了。",
    },
    like: {
      focusWord: "like",
      sentence: "I like listening to music while I cook.",
      chinese: "like = 喜欢；我喜欢做饭时听音乐。",
    },
    lonely: {
      focusWord: "lonely",
      sentence: "Ben felt lonely after moving to a new town.",
      chinese: "lonely = 孤单的；搬到一个新城镇后，本感到很孤单。",
    },
    looklike: {
      focusWord: "look like",
      sentence: "You look like your mother when you smile.",
      chinese: "look like = 看起来像；你微笑时看起来很像你妈妈。",
    },
    love: {
      focusWord: "love",
      sentence: "My grandparents love spending time in their garden.",
      chinese: "love = 喜爱；我的祖父母喜欢在花园里度过时光。",
    },
    mad: {
      focusWord: "mad",
      sentence: "Mum was mad at me for losing the house key.",
      chinese: "mad = 生气的；我弄丢家门钥匙，妈妈很生我的气。",
    },
    mind: {
      focusWord: "mind",
      sentence: "I changed my mind and chose the red jacket.",
      chinese: "mind = 想法；我改变了主意，选择了红色夹克。",
    },
    mood: {
      focusWord: "mood",
      sentence: "Music can improve my mood after a difficult day.",
      chinese: "mood = 心情；辛苦一天后，音乐能改善我的心情。",
    },
    nervous: {
      focusWord: "nervous",
      sentence: "I always feel nervous before speaking in public.",
      chinese: "nervous = 紧张的；公开讲话前我总是感到紧张。",
    },
    peace: {
      focusWord: "peace",
      sentence: "Everyone hopes the two countries can live in peace.",
      chinese: "peace = 和平；每个人都希望这两个国家能够和平相处。",
    },
    pleased: {
      focusWord: "pleased",
      sentence: "My teacher was pleased with my project.",
      chinese: "pleased = 满意的；老师对我的项目很满意。",
    },
    prefer: {
      focusWord: "prefer",
      sentence: "I prefer walking to school when the weather is fine.",
      chinese: "prefer = 更喜欢；天气好时，我更喜欢步行上学。",
    },
    proud: {
      focusWord: "proud",
      sentence: "Her parents were proud of her exam results.",
      chinese: "proud = 自豪的；她的父母为她的考试成绩感到自豪。",
    },
    sad: {
      focusWord: "sad",
      sentence: "I felt sad when my best friend moved away.",
      chinese: "sad = 难过的；我最好的朋友搬走时，我感到很难过。",
    },
    shocking: {
      focusWord: "shocking",
      sentence: "The documentary showed the shocking amount of plastic in the sea.",
      chinese: "shocking = 令人震惊的；纪录片展示了海洋中数量惊人的塑料垃圾。",
    },
    stress: {
      focusWord: "stress",
      sentence: "Exercise helps me deal with stress during exams.",
      chinese: "stress = 压力；考试期间，运动帮助我应对压力。",
    },
    surprise: {
      focusWord: "surprise",
      sentence: "The party was a complete surprise to me.",
      chinese: "surprise = 惊喜；这个聚会对我来说完全是个惊喜。",
    },
    surprised: {
      focusWord: "surprised",
      sentence: "We were surprised to see snow in April.",
      chinese: "surprised = 感到惊讶的；四月看到下雪，我们很惊讶。",
    },
    tired: {
      focusWord: "tired",
      sentence: "I was tired after carrying the boxes upstairs.",
      chinese: "tired = 疲倦的；把箱子搬上楼后，我累了。",
    },
    trust: {
      focusWord: "trust",
      sentence: "I trust Mia because she always tells the truth.",
      chinese: "trust = 信任；我信任米娅，因为她总是说实话。",
    },
    uncomfortable: {
      focusWord: "uncomfortable",
      sentence: "These wet shoes are making me uncomfortable.",
      chinese: "uncomfortable = 不舒服的；这双湿鞋让我很不舒服。",
    },
    unpleasant: {
      focusWord: "unpleasant",
      sentence: "There was an unpleasant smell in the kitchen.",
      chinese: "unpleasant = 令人不愉快的；厨房里有一股难闻的气味。",
    },
    wish: {
      focusWord: "wish",
      sentence: "I wish I could stay on holiday for another week.",
      chinese: "wish = 希望；我希望能再度假一个星期。",
    },
    worried: {
      focusWord: "worried",
      sentence: "Dad was worried because I arrived home late.",
      chinese: "worried = 担心的；因为我很晚才到家，爸爸很担心。",
    },
    amazed: {
      focusWord: "amazed",
      sentence: "I was amazed by the view from the mountain.",
      chinese: "amazed = 惊讶的；山顶的景色令我惊叹。",
    },
    amazing: {
      focusWord: "amazing",
      sentence: "The science museum has an amazing space exhibition.",
      chinese: "amazing = 令人惊叹的；科学博物馆有一个很棒的太空展览。",
    },
    amusing: {
      focusWord: "amusing",
      sentence: "Our guide told us some amusing stories.",
      chinese: "amusing = 有趣的；导游给我们讲了一些有趣的故事。",
    },
    annoyed: {
      focusWord: "annoyed",
      sentence: "Mia was annoyed when the bus left early.",
      chinese: "annoyed = 恼火的；公共汽车提前开走时，米娅很恼火。",
    },
    anxious: {
      focusWord: "anxious",
      sentence: "I felt anxious while waiting for the test results.",
      chinese: "anxious = 焦虑的；等待考试结果时，我感到焦虑。",
    },
    brave: {
      focusWord: "brave",
      sentence: "It was brave of Leo to help the injured dog.",
      chinese: "brave = 勇敢的；利奥帮助受伤的狗，这很勇敢。",
    },
    calm: {
      focusWord: "calm",
      sentence: "Try to stay calm and tell me what happened.",
      chinese: "calm = 冷静的；尽量保持冷静，告诉我发生了什么。",
    },
    cheerful: {
      focusWord: "cheerful",
      sentence: "Our new neighbour is friendly and cheerful.",
      chinese: "cheerful = 开朗的；我们的新邻居既友好又开朗。",
    },
    confident: {
      focusWord: "confident",
      sentence: "Ana felt confident before her English presentation.",
      chinese: "confident = 自信的；英语演讲前，安娜很有信心。",
    },
    delighted: {
      focusWord: "delighted",
      sentence: "We were delighted to hear that you won the prize.",
      chinese: "delighted = 高兴的；听说你获奖了，我们非常高兴。",
    },
    depressed: {
      focusWord: "depressed",
      sentence: "He felt depressed after being ill for several weeks.",
      chinese: "depressed = 沮丧的；生病几个星期后，他感到很沮丧。",
    },
    disappointed: {
      focusWord: "disappointed",
      sentence: "I was disappointed when the concert was cancelled.",
      chinese: "disappointed = 失望的；演唱会取消时，我很失望。",
    },
    disappointing: {
      focusWord: "disappointing",
      sentence: "The team's performance was disappointing.",
      chinese: "disappointing = 令人失望的；球队的表现令人失望。",
    },
    embarrassed: {
      focusWord: "embarrassed",
      sentence: "I felt embarrassed when I forgot her name.",
      chinese: "embarrassed = 尴尬的；忘记她的名字时，我感到很尴尬。",
    },
    embarrassing: {
      focusWord: "embarrassing",
      sentence: "Falling over on stage was embarrassing.",
      chinese: "embarrassing = 令人尴尬的；在舞台上摔倒很尴尬。",
    },
    exhausted: {
      focusWord: "exhausted",
      sentence: "We were exhausted after the long walk.",
      chinese: "exhausted = 筋疲力尽的；走了很长一段路后，我们筋疲力尽。",
    },
    frightened: {
      focusWord: "frightened",
      sentence: "The child was frightened by the thunder.",
      chinese: "frightened = 害怕的；那个孩子被雷声吓到了。",
    },
    frightening: {
      focusWord: "frightening",
      sentence: "The storm was frightening, but everyone stayed safe.",
      chinese: "frightening = 令人害怕的；暴风雨很吓人，但所有人都平安无事。",
    },
    accident: {
      focusWord: "accident",
      sentence: "Tom broke his arm in a cycling accident.",
      chinese: "accident = 事故；汤姆在一次骑车事故中摔断了手臂。",
    },
    ache: {
      focusWord: "ache",
      sentence: "I have a dull ache in my left shoulder.",
      chinese: "ache = 疼痛；我的左肩隐隐作痛。",
    },
    arm: {
      focusWord: "arm",
      sentence: "He wore a bandage around his arm.",
      chinese: "arm = 手臂；他的手臂上缠着绷带。",
    },
    blood: {
      focusWord: "blood",
      sentence: "The nurse took a small sample of blood.",
      chinese: "blood = 血；护士采了一小份血样。",
    },
    body: {
      focusWord: "body",
      sentence: "Your body needs rest after hard exercise.",
      chinese: "body = 身体；剧烈运动后，你的身体需要休息。",
    },
    byaccident: {
      focusWord: "by accident",
      sentence: "I took your coat by accident because ours look similar.",
      chinese: "by accident = 不小心；我不小心拿了你的外套，因为我们的外套看起来很像。",
    },
    byhand: {
      focusWord: "by hand",
      sentence: "This wooden toy was painted by hand.",
      chinese: "by hand = 手工；这个木制玩具是手工上色的。",
    },
    clinic: {
      focusWord: "clinic",
      sentence: "The doctor works at a small clinic near the station.",
      chinese: "clinic = 诊所；医生在车站附近的一家小诊所工作。",
    },
    ear: {
      focusWord: "ear",
      sentence: "The doctor looked inside my ear.",
      chinese: "ear = 耳朵；医生检查了我的耳朵里面。",
    },
    emergency: {
      focusWord: "emergency",
      sentence: "Call this number if there is an emergency.",
      chinese: "emergency = 紧急情况；如有紧急情况，请拨打这个号码。",
    },
    eye: {
      focusWord: "eye",
      sentence: "Something flew into my eye while I was cycling.",
      chinese: "eye = 眼睛；骑车时有东西飞进了我的眼睛。",
    },
    face: {
      focusWord: "face",
      sentence: "Wash your face before you go to bed.",
      chinese: "face = 脸；睡觉前洗脸。",
    },
    facetoface: {
      focusWord: "face to face",
      sentence: "We discussed the problem face to face.",
      chinese: "face to face = 面对面；我们面对面讨论了这个问题。",
    },
    finger: {
      focusWord: "finger",
      sentence: "I cut my finger while preparing dinner.",
      chinese: "finger = 手指；准备晚饭时，我割伤了手指。",
    },
    fit: {
      focusWord: "fit",
      sentence: "These shoes fit me perfectly.",
      chinese: "fit = 合身；这双鞋我穿着正合适。",
    },
    foot: {
      focusWord: "foot",
      sentence: "I hurt my foot during football practice.",
      chinese: "foot = 脚；足球训练时我伤了脚。",
    },
    getfit: {
      focusWord: "get fit",
      sentence: "She joined a swimming club to get fit.",
      chinese: "get fit = 强身健体；她加入游泳俱乐部来增强体质。",
    },
    hand: {
      focusWord: "hand",
      sentence: "Raise your hand if you know the answer.",
      chinese: "hand = 手；如果你知道答案，请举手。",
    },
    handheld: {
      focusWord: "hand-held",
      sentence: "The guide used a hand-held radio to call for help.",
      chinese: "hand-held = 手持式的；导游用手持对讲机呼救。",
    },
    handin: {
      focusWord: "hand in",
      sentence: "Please hand in the medical form before Friday.",
      chinese: "hand in = 交上；请在星期五前交上医疗表格。",
    },
    handout: {
      focusWord: "hand out",
      sentence: "The nurse handed out masks at the entrance.",
      chinese: "hand out = 分发；护士在入口处分发口罩。",
    },
    head: {
      focusWord: "head",
      sentence: "Wear a helmet to protect your head.",
      chinese: "head = 头；戴头盔保护头部。",
    },
    health: {
      focusWord: "health",
      sentence: "Regular exercise is good for your health.",
      chinese: "health = 健康；经常锻炼对健康有益。",
    },
    healthy: {
      focusWord: "healthy",
      sentence: "A healthy breakfast gives me energy for school.",
      chinese: "healthy = 健康的；健康的早餐让我有精力上学。",
    },
    heart: {
      focusWord: "heart",
      sentence: "Exercise makes your heart stronger.",
      chinese: "heart = 心脏；锻炼能让你的心脏更强健。",
    },
    hospital: {
      focusWord: "hospital",
      sentence: "She was taken to hospital after the accident.",
      chinese: "hospital = 医院；事故发生后，她被送往医院。",
    },
    hurt: {
      focusWord: "hurt",
      sentence: "My knee still hurts when I climb stairs.",
      chinese: "hurt = 疼；我爬楼梯时膝盖仍然会疼。",
    },
    ill: {
      focusWord: "ill",
      sentence: "Leo stayed home because he was ill.",
      chinese: "ill = 生病的；利奥因为生病待在家里。",
    },
    knee: {
      focusWord: "knee",
      sentence: "I fell and hurt my knee.",
      chinese: "knee = 膝盖；我摔倒伤了膝盖。",
    },
    lefthand: {
      focusWord: "left-hand",
      sentence: "Use the left-hand door to enter the clinic.",
      chinese: "left-hand = 左边的；请从左边的门进入诊所。",
    },
    leg: {
      focusWord: "leg",
      sentence: "Her leg was sore after the long run.",
      chinese: "leg = 腿；长跑后她的腿很酸痛。",
    },
    medicine: {
      focusWord: "medicine",
      sentence: "Take this medicine after breakfast.",
      chinese: "medicine = 药；早餐后服用这种药。",
    },
    mouth: {
      focusWord: "mouth",
      sentence: "Cover your mouth when you cough.",
      chinese: "mouth = 嘴；咳嗽时请捂住嘴。",
    },
    neck: {
      focusWord: "neck",
      sentence: "My neck felt stiff after the long journey.",
      chinese: "neck = 脖子；长途旅行后我的脖子很僵硬。",
    },
    nose: {
      focusWord: "nose",
      sentence: "My nose is blocked because I have a cold.",
      chinese: "nose = 鼻子；我感冒了，所以鼻子不通气。",
    },
    onfoot: {
      focusWord: "on foot",
      sentence: "The clinic is close enough to reach on foot.",
      chinese: "on foot = 步行；诊所很近，可以步行到达。",
    },
    pain: {
      focusWord: "pain",
      sentence: "Tell the doctor where you feel the pain.",
      chinese: "pain = 疼痛；告诉医生你哪里疼。",
    },
    pregnant: {
      focusWord: "pregnant",
      sentence: "The pregnant woman was offered a seat on the bus.",
      chinese: "pregnant = 怀孕的；公交车上有人给那位孕妇让座。",
    },
    rescue: {
      focusWord: "rescue",
      sentence: "The mountain rescue team found the injured walker.",
      chinese: "rescue = 救援；山地救援队找到了受伤的徒步者。",
    },
    righthand: {
      focusWord: "right-hand",
      sentence: "The pharmacy is on the right-hand side of the road.",
      chinese: "right-hand = 右边的；药店在道路右侧。",
    },
    secondhand: {
      focusWord: "second-hand",
      sentence: "I bought a second-hand bicycle from my neighbour.",
      chinese: "second-hand = 二手的；我从邻居那里买了一辆二手自行车。",
    },
    shoulder: {
      focusWord: "shoulder",
      sentence: "I carried the bag over my shoulder.",
      chinese: "shoulder = 肩膀；我把包挎在肩上。",
    },
    sick: {
      focusWord: "sick",
      sentence: "I felt sick after eating too much cake.",
      chinese: "sick = 恶心的；吃了太多蛋糕后，我觉得恶心。",
    },
    stomachache: {
      focusWord: "stomach ache",
      sentence: "I had a stomach ache after lunch.",
      chinese: "stomach ache = 胃痛；午饭后我胃疼。",
    },
    tooth: {
      focusWord: "tooth",
      sentence: "I need to see a dentist because my tooth hurts.",
      chinese: "tooth = 牙齿；我的牙疼，需要去看牙医。",
    },
    painful: {
      focusWord: "painful",
      sentence: "The cut was painful for several days.",
      chinese: "painful = 疼痛的；这个伤口疼了好几天。",
    },
    patient: {
      focusWord: "patient",
      sentence: "The patient waited quietly to see the doctor.",
      chinese: "patient = 病人；病人安静地等着看医生。",
    },
    sore: {
      focusWord: "sore",
      sentence: "My throat is sore, so it hurts to speak.",
      chinese: "sore = 疼痛的；我喉咙痛，说话也疼。",
    },
    unfit: {
      focusWord: "unfit",
      sentence: "I felt unfit after months without exercise.",
      chinese: "unfit = 身体不健康的；几个月没锻炼后，我觉得身体状态很差。",
    },
    unwell: {
      focusWord: "unwell",
      sentence: "Sara felt unwell and went home early.",
      chinese: "unwell = 身体不适的；萨拉觉得不舒服，提前回家了。",
    },
    aeroplane: {
      focusWord: "aeroplane",
      sentence: "Our aeroplane landed ten minutes early.",
      chinese: "aeroplane = 飞机；我们的飞机提前十分钟降落。",
    },
    bicycle: {
      focusWord: "bicycle",
      sentence: "I ride my bicycle to school on sunny days.",
      chinese: "bicycle = 自行车；晴天我骑自行车上学。",
    },
    bike: {
      focusWord: "bike",
      sentence: "Mia left her bike outside the library.",
      chinese: "bike = 自行车；米娅把自行车停在图书馆外。",
    },
    boat: {
      focusWord: "boat",
      sentence: "We took a small boat across the lake.",
      chinese: "boat = 船；我们乘一艘小船穿过湖面。",
    },
    bus: {
      focusWord: "bus",
      sentence: "The bus was full, so we had to stand.",
      chinese: "bus = 公共汽车；公共汽车上坐满了人，所以我们只好站着。",
    },
    busstation: {
      focusWord: "bus station",
      sentence: "Meet me outside the bus station at noon.",
      chinese: "bus station = 公交车站；中午在公交车站外和我会合。",
    },
    busstop: {
      focusWord: "bus stop",
      sentence: "The nearest bus stop is across the road.",
      chinese: "bus stop = 公共汽车站；最近的公交车站在马路对面。",
    },
    car: {
      focusWord: "car",
      sentence: "Dad washed the car before our trip.",
      chinese: "car = 汽车；旅行前爸爸洗了车。",
    },
    carpark: {
      focusWord: "car park",
      sentence: "We left the car in the hotel car park.",
      chinese: "car park = 停车场；我们把车停在酒店停车场。",
    },
    ferry: {
      focusWord: "ferry",
      sentence: "The ferry takes an hour to reach the island.",
      chinese: "ferry = 渡船；渡船需要一小时到达小岛。",
    },
    flight: {
      focusWord: "flight",
      sentence: "Our flight to Madrid leaves at six.",
      chinese: "flight = 航班；我们飞往马德里的航班六点起飞。",
    },
    gasstation: {
      focusWord: "gas station",
      sentence: "We stopped at a gas station to fill the tank.",
      chinese: "gas station = 加油站；我们在加油站停车加满油箱。",
    },
    lorry: {
      focusWord: "lorry",
      sentence: "A large lorry was blocking the narrow road.",
      chinese: "lorry = 卡车；一辆大卡车堵住了狭窄的道路。",
    },
    motorbike: {
      focusWord: "motorbike",
      sentence: "He wears a helmet whenever he rides his motorbike.",
      chinese: "motorbike = 摩托车；他每次骑摩托车都戴头盔。",
    },
    motorcycle: {
      focusWord: "motorcycle",
      sentence: "A police officer arrived on a motorcycle.",
      chinese: "motorcycle = 摩托车；一名警察骑摩托车赶到。",
    },
    motorway: {
      focusWord: "motorway",
      sentence: "Traffic was slow on the motorway this morning.",
      chinese: "motorway = 高速公路；今天早上高速公路上车流缓慢。",
    },
    petrolstation: {
      focusWord: "petrol station",
      sentence: "Is there a petrol station near the airport?",
      chinese: "petrol station = 加油站；机场附近有加油站吗？",
    },
    plane: {
      focusWord: "plane",
      sentence: "We could see the mountains from the plane.",
      chinese: "plane = 飞机；我们从飞机上能看到群山。",
    },
    platform: {
      focusWord: "platform",
      sentence: "The train to Oxford leaves from platform four.",
      chinese: "platform = 站台；开往牛津的火车从四号站台出发。",
    },
    policestation: {
      focusWord: "police station",
      sentence: "She took the lost wallet to the police station.",
      chinese: "police station = 警察局；她把捡到的钱包送到了警察局。",
    },
    publictransport: {
      focusWord: "public transport",
      sentence: "Public transport is cheaper than driving in the city.",
      chinese: "public transport = 公共交通；在城里乘坐公共交通比开车便宜。",
    },
    road: {
      focusWord: "road",
      sentence: "Be careful when you cross this busy road.",
      chinese: "road = 道路；穿过这条繁忙的道路时要小心。",
    },
    ship: {
      focusWord: "ship",
      sentence: "The ship carried food to the remote island.",
      chinese: "ship = 船；这艘船把食物运到偏远的小岛。",
    },
    subway: {
      focusWord: "subway",
      sentence: "We took the subway to the city centre.",
      chinese: "subway = 地铁；我们乘地铁去了市中心。",
    },
    taxi: {
      focusWord: "taxi",
      sentence: "We called a taxi to take us to the airport.",
      chinese: "taxi = 出租车；我们叫了一辆出租车送我们去机场。",
    },
    traffic: {
      focusWord: "traffic",
      sentence: "Heavy traffic made us late for the concert.",
      chinese: "traffic = 交通；拥堵的交通使我们看演唱会迟到了。",
    },
    trafficlight: {
      focusWord: "traffic light",
      sentence: "Turn left at the next traffic light.",
      chinese: "traffic light = 红绿灯；在下一个红绿灯处左转。",
    },
    train: {
      focusWord: "train",
      sentence: "The train arrived at the station on time.",
      chinese: "train = 火车；火车准时到站。",
    },
    tram: {
      focusWord: "tram",
      sentence: "A tram runs from the square to the museum.",
      chinese: "tram = 有轨电车；有轨电车从广场开往博物馆。",
    },
    transport: {
      focusWord: "transport",
      sentence: "The city needs better transport for its growing population.",
      chinese: "transport = 交通运输；这座城市需要为不断增长的人口提供更好的交通服务。",
    },
    underground: {
      focusWord: "underground",
      sentence: "We travelled by underground during the rush hour.",
      chinese: "underground = 地铁；高峰时段我们乘地铁出行。",
    },
    abroad: {
      focusWord: "abroad",
      sentence: "My sister plans to study abroad next year.",
      chinese: "abroad = 国外；我姐姐计划明年出国学习。",
    },
    camping: {
      focusWord: "camping",
      sentence: "We went camping beside the river last weekend.",
      chinese: "camping = 露营；上周末我们在河边露营。",
    },
    guide: {
      focusWord: "guide",
      sentence: "Our guide showed us the oldest part of the city.",
      chinese: "guide = 导游；导游带我们参观了城市最古老的区域。",
    },
    holiday: {
      focusWord: "holiday",
      sentence: "We spent our summer holiday by the sea.",
      chinese: "holiday = 假期；我们在海边度过了暑假。",
    },
    hostel: {
      focusWord: "hostel",
      sentence: "The hostel offers cheap rooms for young travellers.",
      chinese: "hostel = 青年旅舍；这家青年旅舍为年轻旅行者提供便宜的房间。",
    },
    hotel: {
      focusWord: "hotel",
      sentence: "Our hotel was only five minutes from the beach.",
      chinese: "hotel = 酒店；我们的酒店离海滩只有五分钟路程。",
    },
    luggage: {
      focusWord: "luggage",
      sentence: "Please keep your luggage with you at the airport.",
      chinese: "luggage = 行李；在机场请随身看管好行李。",
    },
    map: {
      focusWord: "map",
      sentence: "I used a map to find the castle.",
      chinese: "map = 地图；我用地图找到了城堡。",
    },
    onholiday: {
      focusWord: "on holiday",
      sentence: "We met a friendly family while we were on holiday.",
      chinese: "on holiday = 在度假；我们度假时遇到了友好的一家人。",
    },
    onvacation: {
      focusWord: "on vacation",
      sentence: "They are on vacation in Canada this week.",
      chinese: "on vacation = 在度假；他们这周正在加拿大度假。",
    },
    reservation: {
      focusWord: "reservation",
      sentence: "I made a reservation for two nights at the hotel.",
      chinese: "reservation = 预订；我在酒店预订了两个晚上的房间。",
    },
    reserve: {
      focusWord: "reserve",
      sentence: "You should reserve your train seat in advance.",
      chinese: "reserve = 预订；你应该提前预订火车座位。",
    },
    sightseeing: {
      focusWord: "sightseeing",
      sentence: "We spent the morning sightseeing in Rome.",
      chinese: "sightseeing = 观光；我们上午在罗马观光。",
    },
    suitcase: {
      focusWord: "suitcase",
      sentence: "My suitcase was too heavy to carry upstairs.",
      chinese: "suitcase = 手提箱；我的手提箱太重，搬不上楼。",
    },
    tourguide: {
      focusWord: "tour guide",
      sentence: "The tour guide explained the history of the castle.",
      chinese: "tour guide = 导游；导游讲解了城堡的历史。",
    },
    tourist: {
      focusWord: "tourist",
      sentence: "The tourist asked me for directions to the museum.",
      chinese: "tourist = 游客；那位游客向我询问去博物馆的路。",
    },
    travel: {
      focusWord: "travel",
      sentence: "Train travel is often relaxing and comfortable.",
      chinese: "travel = 旅行；乘火车旅行通常轻松又舒适。",
    },
    travelagent: {
      focusWord: "travel agent",
      sentence: "The travel agent helped us find a cheaper flight.",
      chinese: "travel agent = 旅行社职员；旅行社职员帮我们找到了一趟更便宜的航班。",
    },
    trip: {
      focusWord: "trip",
      sentence: "Our school trip to the science museum was excellent.",
      chinese: "trip = 旅行；学校组织的科学博物馆之行很棒。",
    },
    app: {
      focusWord: "app",
      sentence: "I use a weather app to check tomorrow's forecast.",
      chinese: "app = 应用程序；我用天气应用程序查看明天的天气预报。",
    },
    application: {
      focusWord: "application",
      sentence: "This application helps students practise new vocabulary.",
      chinese: "application = 应用程序；这个应用程序帮助学生练习新词汇。",
    },
    camera: {
      focusWord: "camera",
      sentence: "This camera takes clear photos in low light.",
      chinese: "camera = 相机；这台相机在光线暗时也能拍出清晰照片。",
    },
    cd: {
      focusWord: "CD",
      sentence: "This CD contains all the songs from the concert.",
      chinese: "CD = 光盘；这张光盘收录了演唱会的所有歌曲。",
    },
    cellphone: {
      focusWord: "cell phone",
      sentence: "Please turn off your cell phone during the film.",
      chinese: "cell phone = 手机；电影播放期间请关掉手机。",
    },
    digital: {
      focusWord: "digital",
      sentence: "We bought a digital clock for the kitchen.",
      chinese: "digital = 数字式的；我们给厨房买了一个数字时钟。",
    },
    download: {
      focusWord: "download",
      sentence: "You can download the map before your trip.",
      chinese: "download = 下载；旅行前你可以下载地图。",
    },
    dvd: {
      focusWord: "DVD",
      sentence: "We watched the film on DVD last night.",
      chinese: "DVD = 数字视频光盘；我们昨晚用光盘看了这部电影。",
    },
    electronic: {
      focusWord: "electronic",
      sentence: "The library sends electronic reminders for late books.",
      chinese: "electronic = 电子的；图书馆会发送电子提醒，通知逾期未还的书。",
    },
    internet: {
      focusWord: "internet",
      sentence: "The internet connection at the hotel was very slow.",
      chinese: "internet = 互联网；酒店的网络连接很慢。",
    },
    laptop: {
      focusWord: "laptop",
      sentence: "I take my laptop to the library when I study.",
      chinese: "laptop = 笔记本电脑；我学习时会把笔记本电脑带到图书馆。",
    },
    mobile: {
      focusWord: "mobile",
      sentence: "You can use the mobile version of the website.",
      chinese: "mobile = 移动版的；你可以使用这个网站的移动版本。",
    },
    online: {
      focusWord: "online",
      sentence: "We booked our train tickets online.",
      chinese: "online = 在线；我们在网上预订了火车票。",
    },
    password: {
      focusWord: "password",
      sentence: "Choose a password that is difficult to guess.",
      chinese: "password = 密码；选择一个难以猜出的密码。",
    },
    pc: {
      focusWord: "PC",
      sentence: "The new software works on any modern PC.",
      chinese: "PC = 个人电脑；这款新软件可以在任何现代个人电脑上运行。",
    },
    phone: {
      focusWord: "phone",
      sentence: "My phone ran out of battery on the way home.",
      chinese: "phone = 手机；回家路上我的手机没电了。",
    },
    screen: {
      focusWord: "screen",
      sentence: "The words on the screen are too small to read.",
      chinese: "screen = 屏幕；屏幕上的字太小，看不清。",
    },
    software: {
      focusWord: "software",
      sentence: "We installed new drawing software at school.",
      chinese: "software = 软件；我们在学校安装了新的绘图软件。",
    },
    tablet: {
      focusWord: "tablet",
      sentence: "She reads electronic books on her tablet.",
      chinese: "tablet = 平板电脑；她用平板电脑阅读电子书。",
    },
    technology: {
      focusWord: "technology",
      sentence: "Modern technology makes it easier to work from home.",
      chinese: "technology = 技术；现代技术让居家办公更容易。",
    },
    upload: {
      focusWord: "upload",
      sentence: "Please upload your photo before Friday.",
      chinese: "upload = 上传；请在星期五前上传你的照片。",
    },
    video: {
      focusWord: "video",
      sentence: "I made a short video of our school concert.",
      chinese: "video = 视频；我为学校音乐会拍了一段短视频。",
    },
    videoclip: {
      focusWord: "video clip",
      sentence: "The teacher showed us a video clip about space.",
      chinese: "video clip = 视频片段；老师给我们看了一段关于太空的视频。",
    },
    videogame: {
      focusWord: "video game",
      sentence: "This video game is more fun with two players.",
      chinese: "video game = 电子游戏；这款电子游戏两个人玩更有趣。",
    },
    website: {
      focusWord: "website",
      sentence: "The museum website lists its opening times.",
      chinese: "website = 网站；博物馆网站列出了开放时间。",
    },
    accent: {
      focusWord: "accent",
      sentence: "She speaks English with a strong French accent.",
      chinese: "accent = 口音；她说英语时带有浓重的法国口音。",
    },
    advert: {
      focusWord: "advert",
      sentence: "I saw an advert for the new sports centre.",
      chinese: "advert = 广告；我看到了一则新体育中心的广告。",
    },
    advertise: {
      focusWord: "advertise",
      sentence: "The café uses social media to advertise its lunches.",
      chinese: "advertise = 做广告；咖啡馆利用社交媒体宣传午餐。",
    },
    advertisement: {
      focusWord: "advertisement",
      sentence: "The advertisement showed the price of each phone.",
      chinese: "advertisement = 广告；这则广告展示了每款手机的价格。",
    },
    advise: {
      focusWord: "advise",
      sentence: "I advise you to save a copy of the document.",
      chinese: "advise = 建议；我建议你保存一份文件副本。",
    },
    announce: {
      focusWord: "announce",
      sentence: "The school will announce the competition results tomorrow.",
      chinese: "announce = 宣布；学校明天将公布比赛结果。",
    },
    announcement: {
      focusWord: "announcement",
      sentence: "We heard an announcement about the delayed train.",
      chinese: "announcement = 公告；我们听到了一则关于火车晚点的通知。",
    },
    ask: {
      focusWord: "ask",
      sentence: "I asked the assistant how to reset my password.",
      chinese: "ask = 询问；我问工作人员怎样重置密码。",
    },
    call: {
      focusWord: "call",
      sentence: "Please call me when your train arrives.",
      chinese: "call = 打电话；火车到站时请给我打电话。",
    },
    confirm: {
      focusWord: "confirm",
      sentence: "Please confirm your email address before continuing.",
      chinese: "confirm = 确认；继续操作前请确认你的电子邮箱地址。",
    },
    conversation: {
      focusWord: "conversation",
      sentence: "We had a long conversation about online safety.",
      chinese: "conversation = 交谈；我们就网络安全进行了长时间交谈。",
    },
    describe: {
      focusWord: "describe",
      sentence: "Can you describe the person you saw?",
      chinese: "describe = 描述；你能描述一下你看到的那个人吗？",
    },
    description: {
      focusWord: "description",
      sentence: "The hotel description says every room has internet access.",
      chinese: "description = 描述；酒店说明写着每个房间都能上网。",
    },
    detail: {
      focusWord: "detail",
      sentence: "The website gives details about the course.",
      chinese: "detail = 详情；网站提供了课程的详细信息。",
    },
    dialup: {
      focusWord: "dial up",
      sentence: "I used to dial up the internet through our phone line.",
      chinese: "dial up = 拨号上网；我过去通过家里的电话线上网。",
    },
    discuss: {
      focusWord: "discuss",
      sentence: "We need to discuss the problem before replying.",
      chinese: "discuss = 讨论；回复前我们需要讨论这个问题。",
    },
    enquiry: {
      focusWord: "enquiry",
      sentence: "Send your enquiry to the address on the website.",
      chinese: "enquiry = 询问；请把你的咨询发送到网站上的地址。",
    },
    interview: {
      focusWord: "interview",
      sentence: "The reporter interviewed the actor after the show.",
      chinese: "interview = 采访；演出结束后，记者采访了那位演员。",
    },
    letter: {
      focusWord: "letter",
      sentence: "I wrote a letter to thank my host family.",
      chinese: "letter = 信；我写信感谢寄宿家庭。",
    },
    meaning: {
      focusWord: "meaning",
      sentence: "I checked the meaning of the word online.",
      chinese: "meaning = 含义；我在网上查了这个词的含义。",
    },
    mention: {
      focusWord: "mention",
      sentence: "He forgot to mention the change of meeting time.",
      chinese: "mention = 提到；他忘了提到会议时间的变更。",
    },
    pronounce: {
      focusWord: "pronounce",
      sentence: "How do you pronounce this name?",
      chinese: "pronounce = 发音；这个名字怎么读？",
    },
    pronunciation: {
      focusWord: "pronunciation",
      sentence: "Listening to podcasts can improve your pronunciation.",
      chinese: "pronunciation = 发音；听播客可以改善你的发音。",
    },
    reply: {
      focusWord: "reply",
      sentence: "I sent a quick reply to her message.",
      chinese: "reply = 回复；我很快回复了她的消息。",
    },
    textmessage: {
      focusWord: "text message",
      sentence: "I sent Dad a text message when I arrived.",
      chinese: "text message = 短信；我到达时给爸爸发了一条短信。",
    },
    buy: {
      focusWord: "buy",
      sentence: "I need to buy a new notebook for school.",
      chinese: "buy = 购买；我需要为上学买一本新笔记本。",
    },
    cash: {
      focusWord: "cash",
      sentence: "The café only accepts cash.",
      chinese: "cash = 现金；这家咖啡馆只收现金。",
    },
    cashmachine: {
      focusWord: "cash machine",
      sentence: "I took some money out of the cash machine.",
      chinese: "cash machine = 自动取款机；我从自动取款机取了一些钱。",
    },
    cheap: {
      focusWord: "cheap",
      sentence: "These trainers were cheap but very comfortable.",
      chinese: "cheap = 便宜的；这双运动鞋很便宜，但穿着很舒服。",
    },
    cost: {
      focusWord: "cost",
      sentence: "How much does this jacket cost?",
      chinese: "cost = 价钱；这件夹克多少钱？",
    },
    customer: {
      focusWord: "customer",
      sentence: "The assistant helped a customer find the right size.",
      chinese: "customer = 顾客；店员帮助一位顾客找到了合适的尺码。",
    },
    departmentstore: {
      focusWord: "department store",
      sentence: "We bought the lamp at a department store.",
      chinese: "department store = 百货商店；我们在一家百货商店买了这盏灯。",
    },
    expensive: {
      focusWord: "expensive",
      sentence: "That restaurant is too expensive for us.",
      chinese: "expensive = 昂贵的；那家餐馆对我们来说太贵了。",
    },
    forsale: {
      focusWord: "for sale",
      sentence: "The old bicycle is for sale.",
      chinese: "for sale = 待售；那辆旧自行车正在出售。",
    },
    grocerystore: {
      focusWord: "grocery store",
      sentence: "I stopped at the grocery store to buy milk.",
      chinese: "grocery store = 食品店；我在食品店停下来买牛奶。",
    },
    inorder: {
      focusWord: "in order",
      sentence: "Please put the books in order by size.",
      chinese: "in order = 按顺序；请按大小顺序摆放这些书。",
    },
    inorderto: {
      focusWord: "in order to",
      sentence: "I saved money in order to buy a laptop.",
      chinese: "in order to = 为了；我存钱是为了买一台笔记本电脑。",
    },
    mall: {
      focusWord: "mall",
      sentence: "We met near the entrance to the shopping mall.",
      chinese: "mall = 购物中心；我们在购物中心入口附近见面。",
    },
    market: {
      focusWord: "market",
      sentence: "Fresh fruit is cheaper at the local market.",
      chinese: "market = 市场；当地市场的新鲜水果更便宜。",
    },
    onsale: {
      focusWord: "on sale",
      sentence: "These shoes are on sale this week.",
      chinese: "on sale = 打折出售；这双鞋本周打折出售。",
    },
    order: {
      focusWord: "order",
      sentence: "I ordered a birthday cake from the bakery.",
      chinese: "order = 订购；我从面包店订购了一个生日蛋糕。",
    },
    outoforder: {
      focusWord: "out of order",
      sentence: "The cash machine is out of order.",
      chinese: "out of order = 出故障；自动取款机坏了。",
    },
    parcel: {
      focusWord: "parcel",
      sentence: "A parcel arrived for you this morning.",
      chinese: "parcel = 包裹；今天早上有你的一个包裹送到。",
    },
    pay: {
      focusWord: "pay",
      sentence: "Can I pay by credit card?",
      chinese: "pay = 付款；我可以用信用卡付款吗？",
    },
    price: {
      focusWord: "price",
      sentence: "The price of the ticket includes lunch.",
      chinese: "price = 价格；票价包含午餐。",
    },
    queue: {
      focusWord: "queue",
      sentence: "We waited in a long queue at the checkout.",
      chinese: "queue = 队列；我们在收银台排了很长的队。",
    },
    receipt: {
      focusWord: "receipt",
      sentence: "Keep the receipt in case you need to return the shirt.",
      chinese: "receipt = 收据；保留收据，以防你需要退掉这件衬衫。",
    },
    sale: {
      focusWord: "sale",
      sentence: "The shop has a summer sale every July.",
      chinese: "sale = 促销；这家商店每年七月都有夏季促销。",
    },
    sell: {
      focusWord: "sell",
      sentence: "They sell fresh bread every morning.",
      chinese: "sell = 出售；他们每天早上出售新鲜面包。",
    },
    shop: {
      focusWord: "shop",
      sentence: "This shop closes at six on Saturdays.",
      chinese: "shop = 商店；这家商店星期六六点关门。",
    },
    shopping: {
      focusWord: "shopping",
      sentence: "We went shopping for school clothes.",
      chinese: "shopping = 购物；我们去买上学穿的衣服。",
    },
    store: {
      focusWord: "store",
      sentence: "The store offers free delivery on large items.",
      chinese: "store = 商店；这家商店为大件商品提供免费送货。",
    },
    supermarket: {
      focusWord: "supermarket",
      sentence: "The supermarket is busy on Friday evenings.",
      chinese: "supermarket = 超市；超市星期五晚上很忙。",
    },
    account: {
      focusWord: "account",
      sentence: "I checked the balance in my account before paying the bill.",
      chinese: "account = 账户；付账前我查看了账户余额。",
    },
    afford: {
      focusWord: "afford",
      sentence: "We cannot afford a new car this year.",
      chinese: "afford = 买得起；今年我们买不起新车。",
    },
    bank: {
      focusWord: "bank",
      sentence: "I went to the bank to change some money.",
      chinese: "bank = 银行；我去银行兑换了一些钱。",
    },
    bankaccount: {
      focusWord: "bank account",
      sentence: "My wages are paid into my bank account.",
      chinese: "bank account = 银行账户；我的工资会存入银行账户。",
    },
    bill: {
      focusWord: "bill",
      sentence: "Could we have the bill, please?",
      chinese: "bill = 账单；请给我们账单好吗？",
    },
    borrow: {
      focusWord: "borrow",
      sentence: "Can I borrow ten pounds until tomorrow?",
      chinese: "borrow = 借入；我可以借十英镑到明天吗？",
    },
    cent: {
      focusWord: "cent",
      sentence: "The stamp costs fifty cents.",
      chinese: "cent = 分；这枚邮票售价五十分。",
    },
    coin: {
      focusWord: "coin",
      sentence: "I found a coin under the table.",
      chinese: "coin = 硬币；我在桌子下面发现了一枚硬币。",
    },
    dollar: {
      focusWord: "dollar",
      sentence: "This sandwich costs five dollars.",
      chinese: "dollar = 美元；这个三明治五美元。",
    },
    euro: {
      focusWord: "euro",
      sentence: "The museum ticket costs twelve euros.",
      chinese: "euro = 欧元；博物馆门票十二欧元。",
    },
    lend: {
      focusWord: "lend",
      sentence: "Could you lend me some money for lunch?",
      chinese: "lend = 借给；你能借给我一些午饭钱吗？",
    },
    money: {
      focusWord: "money",
      sentence: "I do not have enough money for both books.",
      chinese: "money = 钱；我的钱不够买这两本书。",
    },
    pocketmoney: {
      focusWord: "pocket money",
      sentence: "Sam saves half of his pocket money each week.",
      chinese: "pocket money = 零用钱；萨姆每周把一半零用钱存起来。",
    },
    pound: {
      focusWord: "pound",
      sentence: "The book only cost one pound.",
      chinese: "pound = 英镑；这本书只花了一英镑。",
    },
    save: {
      focusWord: "save",
      sentence: "I am saving for a new phone.",
      chinese: "save = 存钱；我正在存钱买一部新手机。",
    },
    value: {
      focusWord: "value",
      sentence: "This phone offers good value for the price.",
      chinese: "value = 价值；这部手机按这个价格来说很划算。",
    },
    worth: {
      focusWord: "worth",
      sentence: "The painting is worth more than a thousand pounds.",
      chinese: "worth = 值...的；这幅画价值一千多英镑。",
    },
    change: {
      focusWord: "change",
      sentence: "The cashier gave me the wrong change.",
      chinese: "change = 找回的零钱；收银员找错了零钱给我。",
    },
    creditcard: {
      focusWord: "credit card",
      sentence: "I used my credit card to book the hotel.",
      chinese: "credit card = 信用卡；我用信用卡预订了酒店。",
    },
    wallet: {
      focusWord: "wallet",
      sentence: "I keep my bank cards in my wallet.",
      chinese: "wallet = 钱包；我把银行卡放在钱包里。",
    },
    discount: {
      focusWord: "discount",
      sentence: "Students receive a ten percent discount.",
      chinese: "discount = 折扣；学生可享受九折优惠。",
    },
    cheque: {
      focusWord: "cheque",
      sentence: "He paid the bill by cheque.",
      chinese: "cheque = 支票；他用支票付了账单。",
    },
    bean: {
      focusWord: "bean",
      sentence: "Add a few beans to the salad.",
      chinese: "bean = 豆子；在沙拉里加几颗豆子。",
    },
    bread: {
      focusWord: "bread",
      sentence: "This bread is still warm from the oven.",
      chinese: "bread = 面包；这个面包刚出炉还热着。",
    },
    burger: {
      focusWord: "burger",
      sentence: "I ordered a chicken burger and a salad.",
      chinese: "burger = 汉堡包；我点了一个鸡肉汉堡和一份沙拉。",
    },
    cake: {
      focusWord: "cake",
      sentence: "Mum baked a chocolate cake for my birthday.",
      chinese: "cake = 蛋糕；妈妈为我的生日烤了一个巧克力蛋糕。",
    },
    cheese: {
      focusWord: "cheese",
      sentence: "Would you like some cheese in your sandwich?",
      chinese: "cheese = 奶酪；你的三明治里要加些奶酪吗？",
    },
    chicken: {
      focusWord: "chicken",
      sentence: "We had chicken and rice for dinner.",
      chinese: "chicken = 鸡肉；我们晚餐吃了鸡肉和米饭。",
    },
    coffee: {
      focusWord: "coffee",
      sentence: "My dad drinks coffee without sugar.",
      chinese: "coffee = 咖啡；我爸爸喝咖啡不加糖。",
    },
    dinner: {
      focusWord: "dinner",
      sentence: "We usually have dinner at seven.",
      chinese: "dinner = 晚餐；我们通常七点吃晚餐。",
    },
    drink: {
      focusWord: "drink",
      sentence: "Would you like a cold drink with your meal?",
      chinese: "drink = 饮料；你用餐时想喝杯冷饮吗？",
    },
    egg: {
      focusWord: "egg",
      sentence: "I boiled an egg for breakfast.",
      chinese: "egg = 鸡蛋；我早餐煮了一个鸡蛋。",
    },
    fastfood: {
      focusWord: "fast food",
      sentence: "Eating fast food every day is not healthy.",
      chinese: "fast food = 快餐；每天吃快餐不健康。",
    },
    fish: {
      focusWord: "fish",
      sentence: "The restaurant serves fresh fish from the lake.",
      chinese: "fish = 鱼；这家餐馆供应湖里的鲜鱼。",
    },
    food: {
      focusWord: "food",
      sentence: "We took enough food for the whole trip.",
      chinese: "food = 食物；我们带了足够整个旅程吃的食物。",
    },
    frenchfries: {
      focusWord: "French fries",
      sentence: "The children shared a plate of French fries.",
      chinese: "French fries = 炸薯条；孩子们分着吃了一盘炸薯条。",
    },
    hungry: {
      focusWord: "hungry",
      sentence: "I was hungry after swimming for an hour.",
      chinese: "hungry = 饥饿的；游了一个小时后我饿了。",
    },
    icecream: {
      focusWord: "ice cream",
      sentence: "We bought ice cream on the way to the beach.",
      chinese: "ice cream = 冰淇淋；去海滩的路上我们买了冰淇淋。",
    },
    jam: {
      focusWord: "jam",
      sentence: "I spread strawberry jam on my toast.",
      chinese: "jam = 果酱；我在烤面包上抹了草莓果酱。",
    },
    juice: {
      focusWord: "juice",
      sentence: "She poured some orange juice into a glass.",
      chinese: "juice = 果汁；她往玻璃杯里倒了一些橙汁。",
    },
    lunch: {
      focusWord: "lunch",
      sentence: "I packed a sandwich for lunch.",
      chinese: "lunch = 午餐；我带了一个三明治当午餐。",
    },
    meal: {
      focusWord: "meal",
      sentence: "Breakfast is the most important meal of my day.",
      chinese: "meal = 一餐；早餐是我一天中最重要的一餐。",
    },
    meat: {
      focusWord: "meat",
      sentence: "This dish contains meat, so it is not vegetarian.",
      chinese: "meat = 肉；这道菜含肉，所以不是素食。",
    },
    mineralwater: {
      focusWord: "mineral water",
      sentence: "We ordered two bottles of mineral water.",
      chinese: "mineral water = 矿泉水；我们点了两瓶矿泉水。",
    },
    pizza: {
      focusWord: "pizza",
      sentence: "We made pizza together on Saturday night.",
      chinese: "pizza = 披萨；星期六晚上我们一起做了披萨。",
    },
    potato: {
      focusWord: "potato",
      sentence: "Cut the potato into small pieces before cooking it.",
      chinese: "potato = 土豆；烹饪前把土豆切成小块。",
    },
    rice: {
      focusWord: "rice",
      sentence: "The rice will be ready in ten minutes.",
      chinese: "rice = 米饭；米饭十分钟后就好。",
    },
    salad: {
      focusWord: "salad",
      sentence: "This salad has tomatoes, cheese, and olives.",
      chinese: "salad = 沙拉；这份沙拉里有西红柿、奶酪和橄榄。",
    },
    salt: {
      focusWord: "salt",
      sentence: "Add a little salt to the soup.",
      chinese: "salt = 盐；在汤里加一点盐。",
    },
    soup: {
      focusWord: "soup",
      sentence: "The vegetable soup warmed us up.",
      chinese: "soup = 汤；蔬菜汤让我们暖和起来。",
    },
    sugar: {
      focusWord: "sugar",
      sentence: "There is too much sugar in this drink.",
      chinese: "sugar = 糖；这杯饮料里的糖太多了。",
    },
    supper: {
      focusWord: "supper",
      sentence: "We had a light supper before the concert.",
      chinese: "supper = 晚餐；音乐会前我们吃了一顿简单的晚餐。",
    },
    tea: {
      focusWord: "tea",
      sentence: "Would you like tea or coffee?",
      chinese: "tea = 茶；你想喝茶还是咖啡？",
    },
    thirsty: {
      focusWord: "thirsty",
      sentence: "Take some water because the walk may make you thirsty.",
      chinese: "thirsty = 口渴的；带些水，因为走路可能会让你口渴。",
    },
    trafficjam: {
      focusWord: "traffic jam",
      sentence: "We missed lunch because of a long traffic jam.",
      chinese: "traffic jam = 交通堵塞；我们因为长时间堵车错过了午餐。",
    },
    water: {
      focusWord: "water",
      sentence: "Drink plenty of water after exercise.",
      chinese: "water = 水；运动后要多喝水。",
    },
    bowl: {
      focusWord: "bowl",
      sentence: "She ate a bowl of soup for lunch.",
      chinese: "bowl = 碗；她午餐喝了一碗汤。",
    },
    cup: {
      focusWord: "cup",
      sentence: "I made a cup of tea for Grandma.",
      chinese: "cup = 杯；我给奶奶泡了一杯茶。",
    },
    dish: {
      focusWord: "dish",
      sentence: "This vegetable dish is easy to prepare.",
      chinese: "dish = 菜肴；这道蔬菜菜品很容易做。",
    },
    glass: {
      focusWord: "glass",
      sentence: "He poured me a glass of water.",
      chinese: "glass = 玻璃杯；他给我倒了一杯水。",
    },
    knife: {
      focusWord: "knife",
      sentence: "Use a sharp knife to cut the bread.",
      chinese: "knife = 刀；用一把锋利的刀切面包。",
    },
    menu: {
      focusWord: "menu",
      sentence: "The waiter brought us the menu.",
      chinese: "menu = 菜单；服务员把菜单拿给我们。",
    },
    plate: {
      focusWord: "plate",
      sentence: "Put the sandwiches on a large plate.",
      chinese: "plate = 盘子；把三明治放在一个大盘子里。",
    },
    spoon: {
      focusWord: "spoon",
      sentence: "I need a spoon for my soup.",
      chinese: "spoon = 勺子；我喝汤需要一把勺子。",
    },
    waiter: {
      focusWord: "waiter",
      sentence: "The waiter took our order.",
      chinese: "waiter = 男服务员；男服务员记下了我们点的菜。",
    },
    waitress: {
      focusWord: "waitress",
      sentence: "The waitress brought us two coffees.",
      chinese: "waitress = 女服务员；女服务员给我们端来两杯咖啡。",
    },
    mug: {
      focusWord: "mug",
      sentence: "He drinks hot chocolate from a large mug.",
      chinese: "mug = 马克杯；他用一个大马克杯喝热巧克力。",
    },
    recipe: {
      focusWord: "recipe",
      sentence: "This recipe makes enough soup for four people.",
      chinese: "recipe = 食谱；这份食谱做出的汤够四个人喝。",
    },
    cook: {
      focusWord: "cook",
      sentence: "My uncle works as a cook in a hotel.",
      chinese: "cook = 厨师；我叔叔在一家酒店当厨师。",
    },
    cooker: {
      focusWord: "cooker",
      sentence: "Turn off the cooker when the soup is ready.",
      chinese: "cooker = 炉灶；汤煮好后关掉炉灶。",
    },
    kettle: {
      focusWord: "kettle",
      sentence: "Put the kettle on and make some tea.",
      chinese: "kettle = 水壶；把水壶烧上，泡些茶。",
    },
    pan: {
      focusWord: "pan",
      sentence: "Heat the oil in a large pan.",
      chinese: "pan = 平底锅；在一个大平底锅里把油加热。",
    },
    art: {
      focusWord: "art",
      sentence: "We studied modern art at the gallery.",
      chinese: "art = 艺术；我们在画廊学习了现代艺术。",
    },
    audience: {
      focusWord: "audience",
      sentence: "The audience clapped loudly at the end of the show.",
      chinese: "audience = 观众；演出结束时，观众热烈鼓掌。",
    },
    boardgame: {
      focusWord: "board game",
      sentence: "We played a board game after dinner.",
      chinese: "board game = 棋盘游戏；晚饭后我们玩了一个棋盘游戏。",
    },
    character: {
      focusWord: "character",
      sentence: "My favourite character in the story is a brave girl.",
      chinese: "character = 人物；故事中我最喜欢的人物是一个勇敢的女孩。",
    },
    chatshow: {
      focusWord: "chat show",
      sentence: "My parents watched a chat show last night.",
      chinese: "chat show = 访谈节目；我父母昨晚看了一个访谈节目。",
    },
    cinema: {
      focusWord: "cinema",
      sentence: "Let us meet outside the cinema at seven.",
      chinese: "cinema = 电影院；我们七点在电影院外见面吧。",
    },
    club: {
      focusWord: "club",
      sentence: "Mia joined the school photography club.",
      chinese: "club = 俱乐部；米娅加入了学校摄影俱乐部。",
    },
    comic: {
      focusWord: "comic",
      sentence: "Leo reads a comic on the bus to school.",
      chinese: "comic = 连环漫画；利奥在去学校的公交车上看连环漫画。",
    },
    concert: {
      focusWord: "concert",
      sentence: "The band gave a concert in the town hall.",
      chinese: "concert = 音乐会；乐队在市政厅举办了一场音乐会。",
    },
    dance: {
      focusWord: "dance",
      sentence: "We learned a traditional dance at the festival.",
      chinese: "dance = 舞蹈；我们在节日活动中学了一种传统舞蹈。",
    },
    dancing: {
      focusWord: "dancing",
      sentence: "Ella enjoys dancing with her friends.",
      chinese: "dancing = 跳舞；埃拉喜欢和朋友们一起跳舞。",
    },
    detective: {
      focusWord: "detective",
      sentence: "The detective found an important clue in the room.",
      chinese: "detective = 侦探；侦探在房间里发现了一条重要线索。",
    },
    drama: {
      focusWord: "drama",
      sentence: "Our school drama is about friendship.",
      chinese: "drama = 戏剧；我们的校园戏剧讲的是友谊。",
    },
    draw: {
      focusWord: "draw",
      sentence: "Please draw a map of the route to your house.",
      chinese: "draw = 画；请画一张去你家的路线图。",
    },
    drawing: {
      focusWord: "drawing",
      sentence: "Her drawing of the old bridge won a prize.",
      chinese: "drawing = 图画；她画的那座老桥获得了奖项。",
    },
    festival: {
      focusWord: "festival",
      sentence: "Our town holds a music festival every summer.",
      chinese: "festival = 节日活动；我们镇每年夏天都举办音乐节。",
    },
    film: {
      focusWord: "film",
      sentence: "We watched a funny film on Friday evening.",
      chinese: "film = 电影；星期五晚上我们看了一部有趣的电影。",
    },
    filmmaker: {
      focusWord: "film maker",
      sentence: "The young film maker recorded life in the village.",
      chinese: "film maker = 电影制作人；这位年轻的电影制作人记录了村里的生活。",
    },
    firework: {
      focusWord: "firework",
      sentence: "A bright firework exploded above the park.",
      chinese: "firework = 烟花；一朵明亮的烟花在公园上空绽放。",
    },
    gallery: {
      focusWord: "gallery",
      sentence: "The local gallery displays paintings by young artists.",
      chinese: "gallery = 画廊；当地画廊展出年轻艺术家的画作。",
    },
    game: {
      focusWord: "game",
      sentence: "This game is easy to learn but hard to win.",
      chinese: "game = 游戏；这个游戏容易学，但很难获胜。",
    },
    headline: {
      focusWord: "headline",
      sentence: "The newspaper headline caught my attention.",
      chinese: "headline = 大标题；报纸的大标题引起了我的注意。",
    },
    hobby: {
      focusWord: "hobby",
      sentence: "Photography is a relaxing hobby for me.",
      chinese: "hobby = 爱好；摄影对我来说是一项令人放松的爱好。",
    },
    imagination: {
      focusWord: "imagination",
      sentence: "Use your imagination to finish the story.",
      chinese: "imagination = 想象力；发挥你的想象力来完成这个故事。",
    },
    magazine: {
      focusWord: "magazine",
      sentence: "I read an article in a science magazine.",
      chinese: "magazine = 杂志；我在一本科学杂志上读了一篇文章。",
    },
    movie: {
      focusWord: "movie",
      sentence: "The movie starts in ten minutes.",
      chinese: "movie = 电影；电影十分钟后开始。",
    },
    movietheater: {
      focusWord: "movie theater",
      sentence: "There is a new movie theater near the station.",
      chinese: "movie theater = 电影院；车站附近有一家新电影院。",
    },
    museum: {
      focusWord: "museum",
      sentence: "The museum has a room full of dinosaur bones.",
      chinese: "museum = 博物馆；博物馆里有一个摆满恐龙骨骼的展厅。",
    },
    music: {
      focusWord: "music",
      sentence: "I listen to quiet music while I study.",
      chinese: "music = 音乐；我学习时会听轻柔的音乐。",
    },
    mystery: {
      focusWord: "mystery",
      sentence: "Nobody could explain the mystery of the missing key.",
      chinese: "mystery = 谜；没有人能解释钥匙失踪之谜。",
    },
    newspaper: {
      focusWord: "newspaper",
      sentence: "Dad reads the newspaper every morning.",
      chinese: "newspaper = 报纸；爸爸每天早上读报纸。",
    },
    novel: {
      focusWord: "novel",
      sentence: "I am reading an adventure novel about two explorers.",
      chinese: "novel = 小说；我正在读一本关于两位探险家的冒险小说。",
    },
    paint: {
      focusWord: "paint",
      sentence: "Paint the sky pale blue and the clouds white.",
      chinese: "paint = 绘画；把天空涂成浅蓝色，把云朵涂成白色。",
    },
    painting: {
      focusWord: "painting",
      sentence: "This painting shows boats in a busy harbour.",
      chinese: "painting = 画作；这幅画描绘了繁忙港口里的船只。",
    },
    party: {
      focusWord: "party",
      sentence: "We had a party for my cousin's birthday.",
      chinese: "party = 聚会；我们为表弟的生日举办了聚会。",
    },
    poem: {
      focusWord: "poem",
      sentence: "She wrote a short poem about the sea.",
      chinese: "poem = 诗；她写了一首关于大海的短诗。",
    },
    pop: {
      focusWord: "pop",
      sentence: "My sister listens to pop on the radio.",
      chinese: "pop = 流行音乐；我姐姐用收音机听流行音乐。",
    },
    program: {
      focusWord: "program",
      sentence: "My favourite science program starts at eight.",
      chinese: "program = 节目；我最喜欢的科学节目八点开始。",
    },
    radio: {
      focusWord: "radio",
      sentence: "We heard the weather report on the radio.",
      chinese: "radio = 收音机；我们从收音机里听到了天气预报。",
    },
    series: {
      focusWord: "series",
      sentence: "We watched the first episode of the new series.",
      chinese: "series = 系列节目；我们看了这部新系列节目的第一集。",
    },
    show: {
      focusWord: "show",
      sentence: "The school talent show begins at six.",
      chinese: "show = 演出；学校才艺表演六点开始。",
    },
    showup: {
      focusWord: "show up",
      sentence: "Ben promised to show up before the film began.",
      chinese: "show up = 露面；本答应在电影开始前到场。",
    },
    song: {
      focusWord: "song",
      sentence: "The choir sang a cheerful song.",
      chinese: "song = 歌曲；合唱团唱了一首欢快的歌曲。",
    },
    soundtrack: {
      focusWord: "soundtrack",
      sentence: "The soundtrack made the final scene more exciting.",
      chinese: "soundtrack = 电影配乐；电影配乐让最后一幕更加激动人心。",
    },
    stage: {
      focusWord: "stage",
      sentence: "The actors walked onto the stage together.",
      chinese: "stage = 舞台；演员们一起走上舞台。",
    },
    story: {
      focusWord: "story",
      sentence: "Grandma told us a story about her childhood.",
      chinese: "story = 故事；奶奶给我们讲了一个她童年时的故事。",
    },
    superhero: {
      focusWord: "superhero",
      sentence: "The superhero wears a red cape in the film.",
      chinese: "superhero = 超级英雄；电影里的超级英雄披着红色斗篷。",
    },
    talent: {
      focusWord: "talent",
      sentence: "Nina has a talent for playing the piano.",
      chinese: "talent = 才能；尼娜有弹钢琴的天赋。",
    },
    talkshow: {
      focusWord: "talk show",
      sentence: "The actor spoke about his new film on a talk show.",
      chinese: "talk show = 访谈节目；这位演员在访谈节目中谈到了他的新电影。",
    },
    television: {
      focusWord: "television",
      sentence: "Please switch off the television before you leave.",
      chinese: "television = 电视；离开前请关掉电视。",
    },
    accountant: {
      focusWord: "accountant",
      sentence: "The accountant checked the company's bills.",
      chinese: "accountant = 会计师；会计师核对了公司的账单。",
    },
    actor: {
      focusWord: "actor",
      sentence: "The actor played a young detective in the film.",
      chinese: "actor = 男演员；这位男演员在电影中扮演一名年轻侦探。",
    },
    actress: {
      focusWord: "actress",
      sentence: "The actress spoke to the audience after the play.",
      chinese: "actress = 女演员；演出后，这位女演员与观众交谈。",
    },
    artist: {
      focusWord: "artist",
      sentence: "A local artist painted this picture of the harbour.",
      chinese: "artist = 艺术家；一位当地艺术家画了这幅港口图。",
    },
    bookingoffice: {
      focusWord: "booking office",
      sentence: "We collected our train tickets from the booking office.",
      chinese: "booking office = 售票处；我们从售票处取了火车票。",
    },
    business: {
      focusWord: "business",
      sentence: "Her parents started a small food business.",
      chinese: "business = 生意；她父母开创了一家小型食品生意。",
    },
    businessman: {
      focusWord: "businessman",
      sentence: "The businessman travelled abroad to meet a customer.",
      chinese: "businessman = 男商人；这位男商人出国去见一位客户。",
    },
    businesswoman: {
      focusWord: "businesswoman",
      sentence: "The businesswoman opened her first shop at twenty-five.",
      chinese: "businesswoman = 女商人；这位女商人二十五岁时开了第一家店。",
    },
    career: {
      focusWord: "career",
      sentence: "She hopes to have a career in medicine.",
      chinese: "career = 职业生涯；她希望从事医疗工作。",
    },
    chef: {
      focusWord: "chef",
      sentence: "The chef prepared a special meal for the guests.",
      chinese: "chef = 厨师；厨师为客人们准备了一顿特别的饭菜。",
    },
    cv: {
      focusWord: "CV",
      sentence: "Send your CV with the job application.",
      chinese: "CV = 简历；请把简历和求职申请一起寄出。",
    },
    dentist: {
      focusWord: "dentist",
      sentence: "The dentist checked my teeth and gave me some advice.",
      chinese: "dentist = 牙医；牙医检查了我的牙齿并给了我一些建议。",
    },
    designer: {
      focusWord: "designer",
      sentence: "The designer created a comfortable school uniform.",
      chinese: "designer = 设计师；设计师设计了一套舒适的校服。",
    },
    dr: {
      focusWord: "doctor",
      sentence: "The doctor examined my injured arm.",
      chinese: "doctor = 医生；医生检查了我受伤的手臂。",
    },
    email: {
      focusWord: "email",
      sentence: "I sent my manager an email about the meeting.",
      chinese: "email = 电子邮件；我给经理发了一封关于会议的电子邮件。",
    },
    factory: {
      focusWord: "factory",
      sentence: "This factory produces parts for electric cars.",
      chinese: "factory = 工厂；这家工厂生产电动汽车零件。",
    },
    farmer: {
      focusWord: "farmer",
      sentence: "The farmer grows vegetables and keeps chickens.",
      chinese: "farmer = 农民；这位农民种蔬菜并养鸡。",
    },
    job: {
      focusWord: "job",
      sentence: "Mia applied for a summer job at the cafe.",
      chinese: "job = 工作；米娅申请了咖啡馆的暑期工作。",
    },
    journalist: {
      focusWord: "journalist",
      sentence: "The journalist interviewed the winning athlete.",
      chinese: "journalist = 记者；记者采访了获胜的运动员。",
    },
    lawyer: {
      focusWord: "lawyer",
      sentence: "The lawyer gave the family some legal advice.",
      chinese: "lawyer = 律师；律师给了这家人一些法律建议。",
    },
    mechanic: {
      focusWord: "mechanic",
      sentence: "The mechanic repaired our car this morning.",
      chinese: "mechanic = 修理工；修理工今天早上修好了我们的汽车。",
    },
    nurse: {
      focusWord: "nurse",
      sentence: "The nurse checked the patient's temperature.",
      chinese: "nurse = 护士；护士测量了病人的体温。",
    },
    onbusiness: {
      focusWord: "on business",
      sentence: "My father is in Singapore on business this week.",
      chinese: "on business = 因公；我父亲本周因公在新加坡。",
    },
    outofwork: {
      focusWord: "out of work",
      sentence: "Jack was out of work for two months.",
      chinese: "out of work = 失业；杰克失业了两个月。",
    },
    pilot: {
      focusWord: "pilot",
      sentence: "The pilot landed the plane safely in heavy rain.",
      chinese: "pilot = 飞行员；飞行员在大雨中安全降落了飞机。",
    },
    police: {
      focusWord: "police",
      sentence: "The police are investigating the stolen bicycles.",
      chinese: "police = 警察；警方正在调查自行车失窃案。",
    },
    policeofficer: {
      focusWord: "police officer",
      sentence: "A police officer asked us to move the car.",
      chinese: "police officer = 警察；一名警察让我们把车开走。",
    },
    postoffice: {
      focusWord: "post office",
      sentence: "I sent the parcel from the post office.",
      chinese: "post office = 邮局；我从邮局寄出了包裹。",
    },
    profession: {
      focusWord: "profession",
      sentence: "Teaching is a profession that requires patience.",
      chinese: "profession = 职业；教师是一种需要耐心的职业。",
    },
    professional: {
      focusWord: "professional",
      sentence: "Ask a professional to repair the broken cooker.",
      chinese: "professional = 专业人士；请专业人士修理坏掉的炉灶。",
    },
    secretary: {
      focusWord: "secretary",
      sentence: "The secretary arranged a meeting for Friday.",
      chinese: "secretary = 秘书；秘书安排了星期五的会议。",
    },
    shopassistant: {
      focusWord: "shop assistant",
      sentence: "The shop assistant helped me find the right size.",
      chinese: "shop assistant = 店员；店员帮我找到了合适的尺码。",
    },
    staff: {
      focusWord: "staff",
      sentence: "The hotel staff were friendly and helpful.",
      chinese: "staff = 全体员工；酒店员工友好又乐于助人。",
    },
    work: {
      focusWord: "work",
      sentence: "My mother starts work at eight every morning.",
      chinese: "work = 工作；我妈妈每天早上八点开始工作。",
    },
    worker: {
      focusWord: "worker",
      sentence: "Each factory worker wears a safety helmet.",
      chinese: "worker = 工人；每名工厂工人都戴安全帽。",
    },
    workout: {
      focusWord: "work out",
      sentence: "We need to work out the total cost of the trip.",
      chinese: "work out = 算出；我们需要算出这次旅行的总费用。",
    },
    admission: {
      focusWord: "admission",
      sentence: "Admission to the museum is free on Sundays.",
      chinese: "admission = 入场；星期天博物馆免费入场。",
    },
    agency: {
      focusWord: "agency",
      sentence: "She found the job through an employment agency.",
      chinese: "agency = 中介机构；她通过一家职业介绍机构找到了工作。",
    },
    company: {
      focusWord: "company",
      sentence: "My uncle works for an international software company.",
      chinese: "company = 公司；我叔叔在一家国际软件公司工作。",
    },
    culture: {
      focusWord: "culture",
      sentence: "Food is an important part of every culture.",
      chinese: "culture = 文化；食物是每种文化的重要组成部分。",
    },
    custom: {
      focusWord: "custom",
      sentence: "Taking off your shoes indoors is a local custom.",
      chinese: "custom = 风俗；进屋脱鞋是当地的风俗。",
    },
    customs: {
      focusWord: "customs",
      sentence: "We showed our passports at customs.",
      chinese: "customs = 海关；我们在海关出示了护照。",
    },
    government: {
      focusWord: "government",
      sentence: "The government plans to build a new hospital.",
      chinese: "government = 政府；政府计划建造一家新医院。",
    },
    industry: {
      focusWord: "industry",
      sentence: "Tourism is an important industry in this region.",
      chinese: "industry = 行业；旅游业是这个地区的重要行业。",
    },
    international: {
      focusWord: "international",
      sentence: "Students from twelve countries attended the international conference.",
      chinese: "international = 国际的；来自十二个国家的学生参加了这场国际会议。",
    },
    law: {
      focusWord: "law",
      sentence: "The law requires drivers to wear seat belts.",
      chinese: "law = 法律；法律要求驾驶员系安全带。",
    },
    national: {
      focusWord: "national",
      sentence: "The national team trained before the match.",
      chinese: "national = 国家的；国家队在比赛前进行了训练。",
    },
    policeman: {
      focusWord: "policeman",
      sentence: "The policeman directed traffic near the school.",
      chinese: "policeman = 男警察；男警察在学校附近指挥交通。",
    },
    policewoman: {
      focusWord: "policewoman",
      sentence: "The policewoman found the missing child.",
      chinese: "policewoman = 女警察；女警察找到了走失的孩子。",
    },
    politician: {
      focusWord: "politician",
      sentence: "The local politician answered questions about the new road.",
      chinese: "politician = 政治家；当地政治家回答了有关新道路的问题。",
    },
    boot: {
      focusWord: "boot",
      sentence: "One of my walking boots is still wet.",
      chinese: "boot = 靴子；我的一只徒步靴还是湿的。",
    },
    bracelet: {
      focusWord: "bracelet",
      sentence: "Emma wore a silver bracelet to the party.",
      chinese: "bracelet = 手镯；埃玛戴着一个银手镯参加聚会。",
    },
    cap: {
      focusWord: "cap",
      sentence: "Put on a cap to keep the sun out of your eyes.",
      chinese: "cap = 帽子；戴上帽子，别让阳光照到眼睛。",
    },
    clothes: {
      focusWord: "clothes",
      sentence: "I packed enough clothes for the weekend.",
      chinese: "clothes = 衣服；我为周末带了足够的衣服。",
    },
    clothing: {
      focusWord: "clothing",
      sentence: "Warm clothing is essential in the mountains.",
      chinese: "clothing = 衣物；在山区，保暖衣物必不可少。",
    },
    coat: {
      focusWord: "coat",
      sentence: "Hang your coat by the door.",
      chinese: "coat = 外套；把你的外套挂在门边。",
    },
    dress: {
      focusWord: "dress",
      sentence: "She chose a blue dress for the school dance.",
      chinese: "dress = 连衣裙；她为学校舞会选了一条蓝色连衣裙。",
    },
    fashion: {
      focusWord: "fashion",
      sentence: "Maya hopes to work in fashion one day.",
      chinese: "fashion = 时尚行业；玛雅希望将来从事时尚行业。",
    },
    glove: {
      focusWord: "glove",
      sentence: "I found one glove under the bus seat.",
      chinese: "glove = 手套；我在公交车座位下面找到了一只手套。",
    },
    handbag: {
      focusWord: "handbag",
      sentence: "Her keys were at the bottom of her handbag.",
      chinese: "handbag = 手提包；她的钥匙在手提包底部。",
    },
    hat: {
      focusWord: "hat",
      sentence: "This wool hat keeps my head warm.",
      chinese: "hat = 帽子；这顶羊毛帽能让我的头保持温暖。",
    },
    jacket: {
      focusWord: "jacket",
      sentence: "Take a light jacket because it may get cold.",
      chinese: "jacket = 夹克；带一件薄夹克，因为天气可能会变冷。",
    },
    jeans: {
      focusWord: "jeans",
      sentence: "These jeans are too long for me.",
      chinese: "jeans = 牛仔裤；这条牛仔裤对我来说太长了。",
    },
    necklace: {
      focusWord: "necklace",
      sentence: "The necklace was a gift from her grandmother.",
      chinese: "necklace = 项链；这条项链是她祖母送的礼物。",
    },
    ring: {
      focusWord: "ring",
      sentence: "He gave her a ring for her birthday.",
      chinese: "ring = 戒指；他送给她一枚戒指作为生日礼物。",
    },
    ringback: {
      focusWord: "ring back",
      sentence: "I will ring you back after my class.",
      chinese: "ring back = 回电话；我下课后会给你回电话。",
    },
    ringup: {
      focusWord: "ring up",
      sentence: "Please ring up the hotel and check our booking.",
      chinese: "ring up = 打电话；请给酒店打电话确认我们的预订。",
    },
    shirt: {
      focusWord: "shirt",
      sentence: "Ben wore a clean white shirt to the interview.",
      chinese: "shirt = 衬衫；本穿着一件干净的白衬衫去面试。",
    },
    shoe: {
      focusWord: "shoe",
      sentence: "There is a small stone in my shoe.",
      chinese: "shoe = 鞋；我的鞋里有一颗小石子。",
    },
    skirt: {
      focusWord: "skirt",
      sentence: "This skirt has two useful pockets.",
      chinese: "skirt = 裙子；这条裙子有两个实用的口袋。",
    },
    sock: {
      focusWord: "sock",
      sentence: "I cannot find the other sock.",
      chinese: "sock = 袜子；我找不到另一只袜子。",
    },
    sweatshirt: {
      focusWord: "sweatshirt",
      sentence: "I put on a sweatshirt after football practice.",
      chinese: "sweatshirt = 运动衫；足球训练后我穿上了一件运动衫。",
    },
    swimsuit: {
      focusWord: "swimsuit",
      sentence: "Remember to pack your swimsuit for the pool.",
      chinese: "swimsuit = 泳衣；记得带上去泳池穿的泳衣。",
    },
    tracksuit: {
      focusWord: "tracksuit",
      sentence: "The team arrived wearing matching tracksuits.",
      chinese: "tracksuit = 运动服；队员们穿着配套的运动服到达了。",
    },
    trousers: {
      focusWord: "trousers",
      sentence: "These trousers need a new button.",
      chinese: "trousers = 裤子；这条裤子需要换一颗新纽扣。",
    },
    tshirt: {
      focusWord: "T-shirt",
      sentence: "I bought a T-shirt with the festival name on it.",
      chinese: "T-shirt = T恤；我买了一件印有节日名称的T恤。",
    },
    underpants: {
      focusWord: "underpants",
      sentence: "Pack clean underpants for each day of the trip.",
      chinese: "underpants = 内裤；旅行期间每天都要带一条干净内裤。",
    },
    underwear: {
      focusWord: "underwear",
      sentence: "Keep clean underwear in the top drawer.",
      chinese: "underwear = 内衣；把干净内衣放在最上面的抽屉里。",
    },
    wear: {
      focusWord: "wear",
      sentence: "You must wear a helmet when riding this bike.",
      chinese: "wear = 穿戴；骑这辆自行车时必须戴头盔。",
    },
    wearout: {
      focusWord: "wear out",
      sentence: "These cheap shoes may wear out quickly.",
      chinese: "wear out = 磨坏；这些便宜的鞋可能很快就会磨坏。",
    },
    blank: {
      focusWord: "blank",
      sentence: "Leave this box blank if the question does not apply to you.",
      chinese: "blank = 空白的；如果这个问题不适用于你，就把这一栏留空。",
    },
    card: {
      focusWord: "card",
      sentence: "We made a birthday card for our teacher.",
      chinese: "card = 卡片；我们为老师做了一张生日卡片。",
    },
    cotton: {
      focusWord: "cotton",
      sentence: "This shirt is made of soft cotton.",
      chinese: "cotton = 棉；这件衬衫由柔软的棉制成。",
    },
    display: {
      focusWord: "display",
      sentence: "The museum has a display of old toys.",
      chinese: "display = 展览；博物馆有一个旧玩具展览。",
    },
    equipment: {
      focusWord: "equipment",
      sentence: "The school bought new sports equipment.",
      chinese: "equipment = 设备；学校购买了新的体育设备。",
    },
    goods: {
      focusWord: "goods",
      sentence: "The shop sells locally made goods.",
      chinese: "goods = 商品；这家商店出售当地制造的商品。",
    },
    idcard: {
      focusWord: "ID card",
      sentence: "Show your ID card at the entrance.",
      chinese: "ID card = 身份证件；请在入口处出示身份证件。",
    },
    identitycard: {
      focusWord: "identity card",
      sentence: "I keep my identity card in my wallet.",
      chinese: "identity card = 身份证件；我把身份证件放在钱包里。",
    },
    leather: {
      focusWord: "leather",
      sentence: "These boots are made of brown leather.",
      chinese: "leather = 皮革；这双靴子由棕色皮革制成。",
    },
    lighter: {
      focusWord: "lighter",
      sentence: "Keep the lighter away from young children.",
      chinese: "lighter = 打火机；让打火机远离年幼的孩子。",
    },
    liquid: {
      focusWord: "liquid",
      sentence: "Water is a liquid at room temperature.",
      chinese: "liquid = 液体；水在室温下是液体。",
    },
    material: {
      focusWord: "material",
      sentence: "We chose a strong material for the school bags.",
      chinese: "material = 材料；我们为书包选择了一种结实的材料。",
    },
    metal: {
      focusWord: "metal",
      sentence: "The bridge is made of metal.",
      chinese: "metal = 金属；这座桥由金属制成。",
    },
    object: {
      focusWord: "object",
      sentence: "The shiny object on the beach was a coin.",
      chinese: "object = 物体；海滩上那个闪亮的物体是一枚硬币。",
    },
    oil: {
      focusWord: "oil",
      sentence: "Heat a little oil in the pan.",
      chinese: "oil = 油；在锅里加热一点油。",
    },
    plastic: {
      focusWord: "plastic",
      sentence: "Try not to use single-use plastic.",
      chinese: "plastic = 塑料；尽量不要使用一次性塑料。",
    },
    silver: {
      focusWord: "silver",
      sentence: "The spoon is made of real silver.",
      chinese: "silver = 银；这把勺子由纯银制成。",
    },
    stone: {
      focusWord: "stone",
      sentence: "The old wall was built from local stone.",
      chinese: "stone = 石头；这面老墙由当地石料砌成。",
    },
    wool: {
      focusWord: "wool",
      sentence: "This warm scarf is made of wool.",
      chinese: "wool = 羊毛；这条暖和的围巾由羊毛制成。",
    },
    toy: {
      focusWord: "toy",
      sentence: "The child pushed a wooden toy train across the floor.",
      chinese: "toy = 玩具；孩子推着一列木制玩具火车穿过地板。",
    },
    address: {
      focusWord: "address",
      sentence: "Write your home address at the top of the form.",
      chinese: "address = 地址；在表格顶部写下你的家庭地址。",
    },
    area: {
      focusWord: "area",
      sentence: "This is a quiet area near the station.",
      chinese: "area = 地区；这是车站附近一个安静的地区。",
    },
    building: {
      focusWord: "building",
      sentence: "The library is the oldest building in our town.",
      chinese: "building = 建筑物；图书馆是我们镇上最古老的建筑物。",
    },
    centre: {
      focusWord: "centre",
      sentence: "The hotel is in the centre of the city.",
      chinese: "centre = 中心；酒店位于市中心。",
    },
    city: {
      focusWord: "city",
      sentence: "More than a million people live in this city.",
      chinese: "city = 城市；这座城市居住着一百多万人。",
    },
    corner: {
      focusWord: "corner",
      sentence: "I will meet you at the corner of King Street.",
      chinese: "corner = 街角；我会在国王街的街角和你见面。",
    },
    country: {
      focusWord: "country",
      sentence: "Japan is a country in East Asia.",
      chinese: "country = 国家；日本是东亚的一个国家。",
    },
    east: {
      focusWord: "east",
      sentence: "The sun rises in the east.",
      chinese: "east = 东方；太阳从东方升起。",
    },
    entrance: {
      focusWord: "entrance",
      sentence: "We waited for our guide by the main entrance.",
      chinese: "entrance = 入口；我们在正门入口旁等导游。",
    },
    exit: {
      focusWord: "exit",
      sentence: "The emergency exit is at the back of the hall.",
      chinese: "exit = 出口；紧急出口在大厅后面。",
    },
    australia: {
      focusWord: "Australia",
      sentence: "My cousin moved to Australia last year.",
      chinese: "Australia = 澳大利亚；我表哥去年搬到了澳大利亚。",
    },
    location: {
      focusWord: "location",
      sentence: "This beach is a perfect location for a picnic.",
      chinese: "location = 地点；这个海滩是野餐的理想地点。",
    },
    neighbourhood: {
      focusWord: "neighbourhood",
      sentence: "There are several small parks in our neighbourhood.",
      chinese: "neighbourhood = 社区；我们社区里有几个小公园。",
    },
    north: {
      focusWord: "north",
      sentence: "The mountains are in the north of the country.",
      chinese: "north = 北部；这些山位于这个国家的北部。",
    },
    park: {
      focusWord: "park",
      sentence: "The children played football in the park.",
      chinese: "park = 公园；孩子们在公园里踢足球。",
    },
    place: {
      focusWord: "place",
      sentence: "This cafe is a good place to study.",
      chinese: "place = 地方；这家咖啡馆是学习的好地方。",
    },
    public: {
      focusWord: "public",
      sentence: "The garden is open to the public every day.",
      chinese: "public = 公众；这个花园每天向公众开放。",
    },
    region: {
      focusWord: "region",
      sentence: "This region is famous for its lakes.",
      chinese: "region = 地区；这个地区以湖泊闻名。",
    },
    south: {
      focusWord: "south",
      sentence: "They grow oranges in the south of Spain.",
      chinese: "south = 南部；西班牙南部种植橙子。",
    },
    sportscentre: {
      focusWord: "sports centre",
      sentence: "We go swimming at the sports centre on Fridays.",
      chinese: "sports centre = 体育中心；我们星期五去体育中心游泳。",
    },
    street: {
      focusWord: "street",
      sentence: "There is a post office across the street.",
      chinese: "street = 街道；街对面有一家邮局。",
    },
    takeplace: {
      focusWord: "take place",
      sentence: "The school concert will take place on Thursday.",
      chinese: "take place = 举行；学校音乐会将在星期四举行。",
    },
    town: {
      focusWord: "town",
      sentence: "Our town has a busy market on Saturdays.",
      chinese: "town = 城镇；我们镇星期六有一个热闹的市场。",
    },
    village: {
      focusWord: "village",
      sentence: "Only two hundred people live in the village.",
      chinese: "village = 村庄；这个村庄只有两百人居住。",
    },
    west: {
      focusWord: "west",
      sentence: "Dark clouds were moving in from the west.",
      chinese: "west = 西方；乌云正从西方飘来。",
    },
    animal: {
      focusWord: "animal",
      sentence: "Every animal at the shelter needs a safe home.",
      chinese: "animal = 动物；收容所里的每只动物都需要一个安全的家。",
    },
    ant: {
      focusWord: "ant",
      sentence: "An ant carried a leaf across the path.",
      chinese: "ant = 蚂蚁；一只蚂蚁叼着叶子穿过小路。",
    },
    bear: {
      focusWord: "bear",
      sentence: "We saw a brown bear beside the river.",
      chinese: "bear = 熊；我们在河边看到了一只棕熊。",
    },
    bee: {
      focusWord: "bee",
      sentence: "A bee landed on the yellow flower.",
      chinese: "bee = 蜜蜂；一只蜜蜂落在黄色花朵上。",
    },
    bird: {
      focusWord: "bird",
      sentence: "A small bird built a nest in the tree.",
      chinese: "bird = 鸟；一只小鸟在树上筑了巢。",
    },
    cat: {
      focusWord: "cat",
      sentence: "The cat was asleep under the kitchen table.",
      chinese: "cat = 猫；那只猫在厨房桌子下面睡着了。",
    },
    cow: {
      focusWord: "cow",
      sentence: "The farmer feeds each cow early in the morning.",
      chinese: "cow = 奶牛；农民一大早给每头奶牛喂食。",
    },
    dog: {
      focusWord: "dog",
      sentence: "Our dog waits by the door when I come home.",
      chinese: "dog = 狗；我回家时，我们的狗会在门边等着。",
    },
    duck: {
      focusWord: "duck",
      sentence: "A duck swam across the pond with its young.",
      chinese: "duck = 鸭子；一只鸭子带着幼鸭游过池塘。",
    },
    elephant: {
      focusWord: "elephant",
      sentence: "The elephant used its trunk to pick up the branch.",
      chinese: "elephant = 大象；大象用鼻子捡起了树枝。",
    },
    giraffe: {
      focusWord: "giraffe",
      sentence: "The giraffe reached the leaves at the top of the tree.",
      chinese: "giraffe = 长颈鹿；长颈鹿够到了树顶的叶子。",
    },
    horse: {
      focusWord: "horse",
      sentence: "She learned to ride a horse on the farm.",
      chinese: "horse = 马；她在农场学会了骑马。",
    },
    insect: {
      focusWord: "insect",
      sentence: "This insect has bright green wings.",
      chinese: "insect = 昆虫；这种昆虫有鲜绿色的翅膀。",
    },
    lion: {
      focusWord: "lion",
      sentence: "The lion rested in the shade during the afternoon.",
      chinese: "lion = 狮子；狮子下午在阴凉处休息。",
    },
    monkey: {
      focusWord: "monkey",
      sentence: "The monkey climbed quickly to the top branch.",
      chinese: "monkey = 猴子；猴子很快爬到了最高的树枝上。",
    },
    mouse: {
      focusWord: "mouse",
      sentence: "A tiny mouse ran behind the cupboard.",
      chinese: "mouse = 老鼠；一只小老鼠跑到了碗柜后面。",
    },
    penguin: {
      focusWord: "penguin",
      sentence: "The penguin kept its egg warm on the ice.",
      chinese: "penguin = 企鹅；企鹅在冰面上给蛋保暖。",
    },
    puppy: {
      focusWord: "puppy",
      sentence: "The puppy followed me around the garden.",
      chinese: "puppy = 小狗；小狗跟着我在花园里到处走。",
    },
    rabbit: {
      focusWord: "rabbit",
      sentence: "The rabbit disappeared into a hole.",
      chinese: "rabbit = 兔子；兔子消失在一个洞里。",
    },
    snake: {
      focusWord: "snake",
      sentence: "The snake lay quietly on a warm rock.",
      chinese: "snake = 蛇；蛇安静地趴在一块温暖的岩石上。",
    },
    tiger: {
      focusWord: "tiger",
      sentence: "A tiger can move silently through tall grass.",
      chinese: "tiger = 老虎；老虎能悄无声息地穿过高草。",
    },
    zebra: {
      focusWord: "zebra",
      sentence: "Each zebra has a different pattern of stripes.",
      chinese: "zebra = 斑马；每匹斑马都有不同的条纹图案。",
    },
    guided: {
      focusWord: "guided",
      sentence: "We joined a guided tour of the old castle.",
      chinese: "guided = 有导游的；我们参加了老城堡的导览游。",
    },
    tourism: {
      focusWord: "tourism",
      sentence: "Tourism provides many jobs in this coastal town.",
      chinese: "tourism = 旅游业；旅游业为这个海滨小镇提供了许多工作。",
    },
    touristinformationcentre: {
      focusWord: "tourist information centre",
      sentence: "The tourist information centre gave us a free map.",
      chinese: "tourist information centre = 游客信息中心；游客信息中心给了我们一张免费地图。",
    },
    athlete: {
      focusWord: "athlete",
      sentence: "The athlete trains for two hours every morning.",
      chinese: "athlete = 运动员；这名运动员每天早上训练两个小时。",
    },
    athletics: {
      focusWord: "athletics",
      sentence: "Athletics includes running, jumping, and throwing events.",
      chinese: "athletics = 田径运动；田径运动包括跑、跳和投掷项目。",
    },
    baseball: {
      focusWord: "baseball",
      sentence: "We played baseball in the park after school.",
      chinese: "baseball = 棒球；放学后我们在公园里打棒球。",
    },
    basketball: {
      focusWord: "basketball",
      sentence: "Our basketball practice starts at half past four.",
      chinese: "basketball = 篮球；我们的篮球训练四点半开始。",
    },
    cdplayer: {
      focusWord: "CD player",
      sentence: "This old CD player still works well.",
      chinese: "CD player = CD播放机；这台旧光盘播放机仍然很好用。",
    },
    coach: {
      focusWord: "coach",
      sentence: "The coach showed us a better way to pass the ball.",
      chinese: "coach = 教练；教练向我们示范了更好的传球方法。",
    },
    dvdplayer: {
      focusWord: "DVD player",
      sentence: "Connect the DVD player to the television.",
      chinese: "DVD player = DVD播放机；把光盘播放机连接到电视上。",
    },
    extremesport: {
      focusWord: "extreme sport",
      sentence: "Rock climbing can be a dangerous extreme sport.",
      chinese: "extreme sport = 极限运动；攀岩可能是一项危险的极限运动。",
    },
    footballplayer: {
      focusWord: "football player",
      sentence: "The football player scored twice in the final.",
      chinese: "football player = 足球运动员；这名足球运动员在决赛中进了两球。",
    },
    golf: {
      focusWord: "golf",
      sentence: "My grandfather plays golf on Sunday mornings.",
      chinese: "golf = 高尔夫球；我祖父星期天早上打高尔夫球。",
    },
    gym: {
      focusWord: "gym",
      sentence: "I go to the gym after work on Tuesdays.",
      chinese: "gym = 健身房；我星期二下班后去健身房。",
    },
    gymnastics: {
      focusWord: "gymnastics",
      sentence: "Gymnastics requires strength and balance.",
      chinese: "gymnastics = 体操；体操需要力量和平衡能力。",
    },
    hockey: {
      focusWord: "hockey",
      sentence: "Our school hockey team won the match.",
      chinese: "hockey = 曲棍球；我们学校的曲棍球队赢得了比赛。",
    },
    icehockey: {
      focusWord: "ice hockey",
      sentence: "Ice hockey players wear helmets and thick gloves.",
      chinese: "ice hockey = 冰球；冰球运动员戴头盔和厚手套。",
    },
    iceskating: {
      focusWord: "ice skating",
      sentence: "We went ice skating on the frozen lake.",
      chinese: "ice skating = 滑冰；我们去结冰的湖上滑冰了。",
    },
    match: {
      focusWord: "match",
      sentence: "The match ended with a score of two to one.",
      chinese: "match = 比赛；比赛以二比一的比分结束。",
    },
    motorracing: {
      focusWord: "motor-racing",
      sentence: "Motor-racing drivers must react very quickly.",
      chinese: "motor-racing = 赛车运动；赛车手必须反应非常迅速。",
    },
    player: {
      focusWord: "player",
      sentence: "Each player shook hands after the game.",
      chinese: "player = 运动员；比赛后每位运动员都握了手。",
    },
    pool: {
      focusWord: "pool",
      sentence: "We played pool while we waited for the bus.",
      chinese: "pool = 台球；等公交车时我们打了台球。",
    },
    racing: {
      focusWord: "racing",
      sentence: "Horse racing is popular in this region.",
      chinese: "racing = 赛马；赛马在这个地区很受欢迎。",
    },
    rugby: {
      focusWord: "rugby",
      sentence: "Rugby players often pass the ball backwards.",
      chinese: "rugby = 橄榄球；橄榄球运动员经常向后传球。",
    },
    skate: {
      focusWord: "skate",
      sentence: "Children can skate safely on this indoor rink.",
      chinese: "skate = 滑冰；孩子们可以在这个室内冰场安全地滑冰。",
    },
    skating: {
      focusWord: "skating",
      sentence: "Skating is easier when the ice is smooth.",
      chinese: "skating = 滑冰运动；冰面平滑时滑冰更容易。",
    },
    skiing: {
      focusWord: "skiing",
      sentence: "We learned skiing during our winter holiday.",
      chinese: "skiing = 滑雪；我们寒假期间学习了滑雪。",
    },
    sport: {
      focusWord: "sport",
      sentence: "Swimming is my favourite sport.",
      chinese: "sport = 运动；游泳是我最喜欢的运动。",
    },
    swim: {
      focusWord: "swim",
      sentence: "I swim ten lengths before breakfast.",
      chinese: "swim = 游泳；我早餐前游十个来回。",
    },
    swimmingcostume: {
      focusWord: "swimming costume",
      sentence: "Her swimming costume was still wet after the lesson.",
      chinese: "swimming costume = 泳衣；课程结束后她的泳衣还是湿的。",
    },
    swimmingpool: {
      focusWord: "swimming pool",
      sentence: "The swimming pool is closed for repairs today.",
      chinese: "swimming pool = 游泳池；游泳池今天因维修而关闭。",
    },
    tabletennis: {
      focusWord: "table tennis",
      sentence: "We played table tennis in the youth club.",
      chinese: "table tennis = 乒乓球；我们在青少年俱乐部打了乒乓球。",
    },
    team: {
      focusWord: "team",
      sentence: "Every member of the team arrived on time.",
      chinese: "team = 队伍；队里的每名成员都准时到达。",
    },
    volleyball: {
      focusWord: "volleyball",
      sentence: "The students played volleyball on the beach.",
      chinese: "volleyball = 排球；学生们在海滩上打排球。",
    },
    yoga: {
      focusWord: "yoga",
      sentence: "Yoga helps me relax after a busy day.",
      chinese: "yoga = 瑜伽；瑜伽帮助我在忙碌一天后放松。",
    },
    amount: {
      focusWord: "amount",
      sentence: "Drink a small amount of water during each break.",
      chinese: "amount = 数量；每次休息时喝少量的水。",
    },
    average: {
      focusWord: "average",
      sentence: "Her average score this season is eighty percent.",
      chinese: "average = 平均数；她本赛季的平均得分是百分之八十。",
    },
    count: {
      focusWord: "count",
      sentence: "Count how many laps you can run in ten minutes.",
      chinese: "count = 数数；数一数你十分钟能跑多少圈。",
    },
    degree: {
      focusWord: "degree",
      sentence: "The temperature fell by one degree during the race.",
      chinese: "degree = 度；比赛期间气温下降了一度。",
    },
    depth: {
      focusWord: "depth",
      sentence: "The depth of this pool is two metres.",
      chinese: "depth = 深度；这个泳池的深度是两米。",
    },
    double: {
      focusWord: "double",
      sentence: "We ran double the usual distance today.",
      chinese: "double = 两倍的；我们今天跑了平常两倍的距离。",
    },
    half: {
      focusWord: "half",
      sentence: "Half of the team practised indoors.",
      chinese: "half = 一半；队伍中有一半的人在室内训练。",
    },
    height: {
      focusWord: "height",
      sentence: "The height of the basketball hoop is fixed.",
      chinese: "height = 高度；篮球架的高度是固定的。",
    },
    kilometre: {
      focusWord: "kilometre",
      sentence: "The final kilometre of the race was uphill.",
      chinese: "kilometre = 千米；比赛最后一千米是上坡路。",
    },
    metre: {
      focusWord: "metre",
      sentence: "She won the race by less than a metre.",
      chinese: "metre = 米；她以不到一米的优势赢得了比赛。",
    },
    mile: {
      focusWord: "mile",
      sentence: "He can run a mile in under seven minutes.",
      chinese: "mile = 英里；他能在七分钟内跑完一英里。",
    },
    number: {
      focusWord: "number",
      sentence: "Write your race number on the form.",
      chinese: "number = 号码；在表格上写下你的比赛号码。",
    },
    pair: {
      focusWord: "pair",
      sentence: "I need a new pair of running shoes.",
      chinese: "pair = 一双；我需要一双新的跑鞋。",
    },
    percent: {
      focusWord: "percent",
      sentence: "About sixty percent of the class joined a sports club.",
      chinese: "percent = 百分比；班里大约百分之六十的学生加入了体育俱乐部。",
    },
    point: {
      focusWord: "point",
      sentence: "Our team earned one point for the draw.",
      chinese: "point = 分；我们队因平局获得了一分。",
    },
    quarter: {
      focusWord: "quarter",
      sentence: "The first quarter of the game was very close.",
      chinese: "quarter = 一节；比赛第一节双方比分很接近。",
    },
    score: {
      focusWord: "score",
      sentence: "The final score was three to two.",
      chinese: "score = 比分；最终比分是三比二。",
    },
    total: {
      focusWord: "total",
      sentence: "Add the three times to find the total.",
      chinese: "total = 总数；把三次用时相加得出总数。",
    },
    afternoon: {
      focusWord: "afternoon",
      sentence: "I usually do my homework in the afternoon.",
      chinese: "afternoon = 下午；我通常在下午做家庭作业。",
    },
    afterwards: {
      focusWord: "afterwards",
      sentence: "We watched the match and had dinner afterwards.",
      chinese: "afterwards = 后来；我们看了比赛，之后吃了晚饭。",
    },
    age: {
      focusWord: "age",
      sentence: "She started learning the piano at the age of six.",
      chinese: "age = 年龄；她六岁时开始学钢琴。",
    },
    aged: {
      focusWord: "aged",
      sentence: "The club is for children aged eight to twelve.",
      chinese: "aged = 年龄为；这个俱乐部面向八到十二岁的儿童。",
    },
    ages: {
      focusWord: "ages",
      sentence: "We waited for ages before the bus arrived.",
      chinese: "ages = 很长时间；公交车到来前我们等了很久。",
    },
    atthesametime: {
      focusWord: "at the same time",
      sentence: "The two runners crossed the line at the same time.",
      chinese: "at the same time = 同时；两名跑步者同时越过终点线。",
    },
    birthday: {
      focusWord: "birthday",
      sentence: "We made a cake for Dad's birthday.",
      chinese: "birthday = 生日；我们为爸爸的生日做了一个蛋糕。",
    },
    day: {
      focusWord: "day",
      sentence: "It rained all day on Monday.",
      chinese: "day = 一天；星期一下了一整天的雨。",
    },
    recently: {
      focusWord: "recently",
      sentence: "I recently joined the school chess club.",
      chinese: "recently = 最近；我最近加入了学校国际象棋俱乐部。",
    },
    early: {
      focusWord: "early",
      sentence: "We arrived early enough to choose good seats.",
      chinese: "early = 早；我们到得够早，可以挑选好座位。",
    },
    evening: {
      focusWord: "evening",
      sentence: "I read for half an hour every evening.",
      chinese: "evening = 晚上；我每天晚上读半个小时的书。",
    },
    fulltime: {
      focusWord: "full time",
      sentence: "My aunt works full time at the hospital.",
      chinese: "full time = 全职；我阿姨在医院全职工作。",
    },
    goodafternoon: {
      focusWord: "good afternoon",
      sentence: "Good afternoon, Mrs Lee.",
      chinese: "good afternoon = 下午好；李老师，下午好。",
    },
    goodevening: {
      focusWord: "good evening",
      sentence: "Good evening, everyone, and welcome to the show.",
      chinese: "good evening = 晚上好；大家晚上好，欢迎观看演出。",
    },
    goodmorning: {
      focusWord: "good morning",
      sentence: "Good morning, Mr Brown.",
      chinese: "good morning = 早上好；布朗先生，早上好。",
    },
    goodnight: {
      focusWord: "good night",
      sentence: "I said good night and went upstairs.",
      chinese: "good night = 晚安；我说了晚安就上楼了。",
    },
    hour: {
      focusWord: "hour",
      sentence: "The journey takes about an hour.",
      chinese: "hour = 小时；这段旅程大约需要一个小时。",
    },
    immediately: {
      focusWord: "immediately",
      sentence: "Please call me immediately if the plan changes.",
      chinese: "immediately = 立即；如果计划有变化，请立即给我打电话。",
    },
    intime: {
      focusWord: "in time",
      sentence: "We reached the station in time to catch the train.",
      chinese: "in time = 及时；我们及时赶到车站，搭上了火车。",
    },
    late: {
      focusWord: "late",
      sentence: "The bus was twenty minutes late this morning.",
      chinese: "late = 迟到的；今天早上公交车晚了二十分钟。",
    },
    lookafter: {
      focusWord: "look after",
      sentence: "Can you look after my dog this weekend?",
      chinese: "look after = 照顾；这个周末你能照顾我的狗吗？",
    },
    middleaged: {
      focusWord: "middle-aged",
      sentence: "A middle-aged woman helped us find the address.",
      chinese: "middle-aged = 中年的；一位中年女士帮我们找到了地址。",
    },
    minute: {
      focusWord: "minute",
      sentence: "The film starts in one minute.",
      chinese: "minute = 分钟；电影一分钟后开始。",
    },
    month: {
      focusWord: "month",
      sentence: "We visit our grandparents once a month.",
      chinese: "month = 月；我们每个月看望祖父母一次。",
    },
    morning: {
      focusWord: "morning",
      sentence: "The streets are quiet early in the morning.",
      chinese: "morning = 早晨；清晨时街道很安静。",
    },
    night: {
      focusWord: "night",
      sentence: "The temperature falls quickly at night.",
      chinese: "night = 夜晚；夜晚气温下降得很快。",
    },
    occasion: {
      focusWord: "occasion",
      sentence: "On one occasion, we saw dolphins near the boat.",
      chinese: "occasion = 一次；有一次，我们在船附近看到了海豚。",
    },
    ontime: {
      focusWord: "on time",
      sentence: "Everyone arrived on time for the meeting.",
      chinese: "on time = 准时；每个人都准时到达参加会议。",
    },
    overnight: {
      focusWord: "overnight",
      sentence: "We stayed overnight in a small village.",
      chinese: "overnight = 过夜；我们在一个小村庄住了一夜。",
    },
    parttime: {
      focusWord: "part time",
      sentence: "Leo works part time in a bookshop.",
      chinese: "part time = 兼职；利奥在一家书店兼职工作。",
    },
    second: {
      focusWord: "second",
      sentence: "Wait a second while I find the key.",
      chinese: "second = 秒；等一下，我找找钥匙。",
    },
    soon: {
      focusWord: "soon",
      sentence: "The rain stopped, and the sun came out soon afterwards.",
      chinese: "soon = 很快；雨停了，很快太阳就出来了。",
    },
    time: {
      focusWord: "time",
      sentence: "What time does the museum close?",
      chinese: "time = 时间；博物馆几点关门？",
    },
    today: {
      focusWord: "today",
      sentence: "I have a dentist appointment today.",
      chinese: "today = 今天；我今天预约了看牙医。",
    },
    tomorrow: {
      focusWord: "tomorrow",
      sentence: "We will finish the project tomorrow.",
      chinese: "tomorrow = 明天；我们明天会完成这个项目。",
    },
    week: {
      focusWord: "week",
      sentence: "Our team practises three times a week.",
      chinese: "week = 星期；我们队每周训练三次。",
    },
    while: {
      focusWord: "while",
      sentence: "While I waited for the bus, I read a magazine.",
      chinese: "while = 当...时；等公交车时，我看了一本杂志。",
    },
    year: {
      focusWord: "year",
      sentence: "My brother will start college next year.",
      chinese: "year = 年；我哥哥明年将开始上大学。",
    },
    yesterday: {
      focusWord: "yesterday",
      sentence: "I returned the library book yesterday.",
      chinese: "yesterday = 昨天；我昨天归还了图书馆的书。",
    },
    circle: {
      focusWord: "circle",
      sentence: "Draw a circle around the correct answer.",
      chinese: "circle = 圆圈；在正确答案周围画一个圆圈。",
    },
    gram: {
      focusWord: "gram",
      sentence: "One gram is a very small unit of weight.",
      chinese: "gram = 克；一克是很小的重量单位。",
    },
    halfprice: {
      focusWord: "half-price",
      sentence: "Student tickets are half-price on Mondays.",
      chinese: "half-price = 半价的；学生票星期一半价。",
    },
    inhalf: {
      focusWord: "in half",
      sentence: "Cut the apple in half and share it.",
      chinese: "in half = 分成两半；把苹果切成两半一起分享。",
    },
    intwo: {
      focusWord: "in two",
      sentence: "The old rope broke in two.",
      chinese: "in two = 断成两截；那根旧绳子断成了两截。",
    },
    litre: {
      focusWord: "litre",
      sentence: "We took a litre of water on the walk.",
      chinese: "litre = 升；我们徒步时带了一升水。",
    },
    million: {
      focusWord: "million",
      sentence: "More than a million people visit the museum each year.",
      chinese: "million = 百万；每年有一百多万人参观这座博物馆。",
    },
    single: {
      focusWord: "single",
      sentence: "I need a single ticket to Oxford.",
      chinese: "single = 单程的；我需要一张去牛津的单程票。",
    },
    size: {
      focusWord: "size",
      sentence: "Do you have these shoes in a larger size?",
      chinese: "size = 尺码；这双鞋有更大的尺码吗？",
    },
    square: {
      focusWord: "square",
      sentence: "A square has four equal sides.",
      chinese: "square = 正方形；正方形有四条相等的边。",
    },
    weight: {
      focusWord: "weight",
      sentence: "The maximum weight for this bag is ten kilograms.",
      chinese: "weight = 重量；这个包的最大重量是十千克。",
    },
    baseon: {
      focusWord: "base on",
      sentence: "Base your answer on information in the text.",
      chinese: "base on = 以...为依据；根据课文中的信息回答。",
    },
    beover: {
      focusWord: "be over",
      sentence: "The lesson will be over at three thirty.",
      chinese: "be over = 结束；这节课三点半结束。",
    },
    breakdown: {
      focusWord: "break down",
      sentence: "Our car broke down on the way to the airport.",
      chinese: "break down = 出故障；我们的汽车在去机场的路上坏了。",
    },
    breakin: {
      focusWord: "break in",
      sentence: "Someone tried to break in through the kitchen window.",
      chinese: "break in = 闯入；有人试图从厨房窗户闯进来。",
    },
    breakup: {
      focusWord: "break up",
      sentence: "Mia and Ben decided to break up.",
      chinese: "break up = 分手；米娅和本决定分手。",
    },
    callfor: {
      focusWord: "call for",
      sentence: "The injured walker called for help.",
      chinese: "call for = 呼救；受伤的徒步者大声呼救。",
    },
    callin: {
      focusWord: "call in",
      sentence: "Sam had to call in sick this morning.",
      chinese: "call in = 打电话通知；萨姆今天早上不得不打电话请病假。",
    },
    checkin: {
      focusWord: "check in",
      sentence: "We need to check in at the hotel before six.",
      chinese: "check in = 办理入住；我们需要在六点前到酒店办理入住。",
    },
    checkout: {
      focusWord: "check out",
      sentence: "Guests must check out of the hotel by eleven.",
      chinese: "check out = 退房；客人必须在十一点前退房。",
    },
    chillout: {
      focusWord: "chill out",
      sentence: "I like to chill out with music after school.",
      chinese: "chill out = 放松；放学后我喜欢听音乐放松。",
    },
    crossout: {
      focusWord: "cross out",
      sentence: "Cross out the word that does not belong.",
      chinese: "cross out = 划掉；划掉不属于这一组的单词。",
    },
    cutup: {
      focusWord: "cut up",
      sentence: "Cut up the vegetables before adding them to the soup.",
      chinese: "cut up = 切碎；把蔬菜切碎后再放进汤里。",
    },
    dealwith: {
      focusWord: "deal with",
      sentence: "We need to deal with this problem today.",
      chinese: "deal with = 处理；我们今天需要处理这个问题。",
    },
    fillin: {
      focusWord: "fill in",
      sentence: "Please fill in every box on the form.",
      chinese: "fill in = 填写；请填写表格上的每一栏。",
    },
    fillup: {
      focusWord: "fill up",
      sentence: "Fill up your water bottle before the walk.",
      chinese: "fill up = 装满；徒步前把你的水瓶装满。",
    },
    hangout: {
      focusWord: "hang out",
      sentence: "We often hang out at the sports centre.",
      chinese: "hang out = 闲逛；我们经常在体育中心一起消磨时间。",
    },
    hangup: {
      focusWord: "hang up",
      sentence: "Do not hang up until I find the address.",
      chinese: "hang up = 挂断电话；在我找到地址前别挂电话。",
    },
    knockdown: {
      focusWord: "knock down",
      sentence: "The builders knocked down the old wall.",
      chinese: "knock down = 拆除；建筑工人拆掉了那面旧墙。",
    },
    liedown: {
      focusWord: "lie down",
      sentence: "You should lie down if you feel dizzy.",
      chinese: "lie down = 躺下；如果你感到头晕，就应该躺下。",
    },
    passon: {
      focusWord: "pass on",
      sentence: "Please pass on this message to your sister.",
      chinese: "pass on = 转告；请把这条消息转告给你妹妹。",
    },
    recommend: {
      focusWord: "recommend",
      sentence: "I recommend the vegetable soup at this cafe.",
      chinese: "recommend = 推荐；我推荐这家咖啡馆的蔬菜汤。",
    },
    review: {
      focusWord: "review",
      sentence: "Review your notes before the test.",
      chinese: "review = 复习；考试前复习你的笔记。",
    },
    say: {
      focusWord: "say",
      sentence: "Please say your name clearly.",
      chinese: "say = 说；请清楚地说出你的名字。",
    },
    sentence: {
      focusWord: "sentence",
      sentence: "Write one sentence about the picture.",
      chinese: "sentence = 句子；写一个描述这幅图片的句子。",
    },
    sitdown: {
      focusWord: "sit down",
      sentence: "Please sit down beside your partner.",
      chinese: "sit down = 坐下；请坐在你的搭档旁边。",
    },
    speak: {
      focusWord: "speak",
      sentence: "Could you speak more slowly, please?",
      chinese: "speak = 说话；请问你能说慢一点吗？",
    },
    splitup: {
      focusWord: "split up",
      sentence: "The teacher split us up into four groups.",
      chinese: "split up = 分组；老师把我们分成了四组。",
    },
    talk: {
      focusWord: "talk",
      sentence: "We need to talk about tomorrow's trip.",
      chinese: "talk = 交谈；我们需要谈谈明天的旅行。",
    },
    tell: {
      focusWord: "tell",
      sentence: "Tell me what happened after the match.",
      chinese: "tell = 告诉；告诉我比赛后发生了什么。",
    },
    thank: {
      focusWord: "thank",
      sentence: "I wrote to thank her for the present.",
      chinese: "thank = 感谢；我写信感谢她送的礼物。",
    },
    thankyou: {
      focusWord: "thank you",
      sentence: "Thank you for helping me carry the boxes.",
      chinese: "thank you = 谢谢；谢谢你帮我搬这些箱子。",
    },
    throwaway: {
      focusWord: "throw away",
      sentence: "Do not throw away bottles that can be recycled.",
      chinese: "throw away = 扔掉；不要扔掉可以回收的瓶子。",
    },
    tidyup: {
      focusWord: "tidy up",
      sentence: "Please tidy up your room before dinner.",
      chinese: "tidy up = 整理；晚饭前请整理好你的房间。",
    },
    understand: {
      focusWord: "understand",
      sentence: "I understand the question now.",
      chinese: "understand = 理解；我现在明白这个问题了。",
    },
    wakeup: {
      focusWord: "wake up",
      sentence: "I usually wake up before my alarm rings.",
      chinese: "wake up = 醒来；我通常在闹钟响之前醒来。",
    },
    washup: {
      focusWord: "wash up",
      sentence: "I will wash up after we finish dinner.",
      chinese: "wash up = 洗餐具；我们吃完晚饭后我来洗餐具。",
    },
    word: {
      focusWord: "word",
      sentence: "Look up the new word in your dictionary.",
      chinese: "word = 单词；在字典里查一下这个新单词。",
    },
    noone: {
      focusWord: "no one",
      sentence: "No one knew the answer to the final question.",
      chinese: "no one = 没有人；没有人知道最后一个问题的答案。",
    },
    shape: {
      focusWord: "shape",
      sentence: "The table is round in shape.",
      chinese: "shape = 形状；这张桌子的形状是圆的。",
    },
    politics: {
      focusWord: "politics",
      sentence: "Her brother studies politics at university.",
      chinese: "politics = 政治学；她哥哥在大学学习政治学。",
    },
    relationship: {
      focusWord: "relationship",
      sentence: "I have a good relationship with my neighbours.",
      chinese: "relationship = 关系；我和邻居关系很好。",
    },
    rule: {
      focusWord: "rule",
      sentence: "Our school has a rule against using phones in class.",
      chinese: "rule = 规则；我们学校规定课堂上不能使用手机。",
    },
    society: {
      focusWord: "society",
      sentence: "Education is important for the whole society.",
      chinese: "society = 社会；教育对整个社会都很重要。",
    },
    trade: {
      focusWord: "trade",
      sentence: "Trade between the two countries has increased.",
      chinese: "trade = 贸易；两国之间的贸易增加了。",
    },
    traditional: {
      focusWord: "traditional",
      sentence: "The dancers wore traditional clothing.",
      chinese: "traditional = 传统的；舞者们穿着传统服装。",
    },
    theatre: {
      focusWord: "theatre",
      sentence: "We watched a comedy at the theatre.",
      chinese: "theatre = 剧院；我们在剧院看了一部喜剧。",
    },
    maincourse: {
      focusWord: "main course",
      sentence: "I chose fish and rice for my main course.",
      chinese: "main course = 主菜；我选择鱼和米饭作为主菜。",
    },
    ofcourse: {
      focusWord: "of course",
      sentence: "Of course you can borrow my dictionary.",
      chinese: "of course = 当然；你当然可以借我的字典。",
    },
    studies: {
      focusWord: "studies",
      sentence: "Her studies take up most of her week.",
      chinese: "studies = 学业；她的学业占去了她一周的大部分时间。",
    },
    moviestar: {
      focusWord: "movie star",
      sentence: "The movie star signed autographs outside the cinema.",
      chinese: "movie star = 电影明星；这位电影明星在电影院外签名。",
    },
    "accommodation": {
      focusWord: "accommodation",
      sentence: "Our hotel provides comfortable accommodation near the beach.",
      chinese: "accommodation = 住宿；我们的酒店在海滩附近提供舒适的住宿。",
    },
    "achievement": {
      focusWord: "achievement",
      sentence: "Finishing the race was a great achievement for Mia.",
      chinese: "achievement = 成就；完成比赛对米娅来说是一项很大的成就。",
    },
    "action": {
      focusWord: "action",
      sentence: "The school took action to reduce plastic waste.",
      chinese: "action = 行动；学校采取行动减少塑料垃圾。",
    },
    "activity": {
      focusWord: "activity",
      sentence: "Swimming is my favourite summer activity.",
      chinese: "activity = 活动；游泳是我最喜欢的夏季活动。",
    },
    "addition": {
      focusWord: "addition",
      sentence: "The new sports hall is a useful addition to our school.",
      chinese: "addition = 新增事物；新体育馆是学校一项实用的新增设施。",
    },
    "airconditioning": {
      focusWord: "air conditioning",
      sentence: "The air conditioning kept the classroom cool.",
      chinese: "air conditioning = 空调；空调让教室保持凉爽。",
    },
    "ambition": {
      focusWord: "ambition",
      sentence: "Her ambition is to become a doctor.",
      chinese: "ambition = 志向；她的志向是成为一名医生。",
    },
    "ambulance": {
      focusWord: "ambulance",
      sentence: "An ambulance arrived within five minutes.",
      chinese: "ambulance = 救护车；一辆救护车在五分钟内赶到了。",
    },
    "appearance": {
      focusWord: "appearance",
      sentence: "The actor changed his appearance for the film.",
      chinese: "appearance = 外貌；这位演员为了电影改变了自己的外貌。",
    },
    "appointment": {
      focusWord: "appointment",
      sentence: "I have a dentist appointment at two o'clock.",
      chinese: "appointment = 预约；我预约了两点去看牙医。",
    },
    "argument": {
      focusWord: "argument",
      sentence: "They had an argument about whose turn it was.",
      chinese: "argument = 争吵；他们为了轮到谁而争吵。",
    },
    "arrangement": {
      focusWord: "arrangement",
      sentence: "We made an arrangement to meet outside the station.",
      chinese: "arrangement = 安排；我们安排在车站外见面。",
    },
    "attention": {
      focusWord: "attention",
      sentence: "Please pay attention to the safety instructions.",
      chinese: "attention = 注意；请注意安全说明。",
    },
    "attraction": {
      focusWord: "attraction",
      sentence: "The castle is the town's main tourist attraction.",
      chinese: "attraction = 景点；这座城堡是镇上主要的旅游景点。",
    },
    "cancel": {
      focusWord: "cancel",
      sentence: "They had to cancel the match because of the storm.",
      chinese: "cancel = 取消；他们因为暴风雨不得不取消比赛。",
    },
    "case": {
      focusWord: "case",
      sentence: "In this case, taking the bus is quicker.",
      chinese: "case = 情况；在这种情况下，乘公交车更快。",
    },
    "celebration": {
      focusWord: "celebration",
      sentence: "We had a small celebration after the exam.",
      chinese: "celebration = 庆祝活动；考试后我们举行了一个小型庆祝活动。",
    },
    "celebrity": {
      focusWord: "celebrity",
      sentence: "A local celebrity opened the new theatre.",
      chinese: "celebrity = 名人；一位当地名人为新剧院揭幕。",
    },
    "championship": {
      focusWord: "championship",
      sentence: "Our team won the national championship.",
      chinese: "championship = 冠军称号；我们队赢得了全国冠军称号。",
    },
    "chance": {
      focusWord: "chance",
      sentence: "I had a chance to practise English with a visitor.",
      chinese: "chance = 机会；我有机会和一位游客练习英语。",
    },
    "charity": {
      focusWord: "charity",
      sentence: "The concert raised money for a children's charity.",
      chinese: "charity = 慈善机构；这场音乐会为一家儿童慈善机构筹款。",
    },
    "collection": {
      focusWord: "collection",
      sentence: "The museum has a collection of old photographs.",
      chinese: "collection = 收藏品；博物馆收藏了一批老照片。",
    },
    "comment": {
      focusWord: "comment",
      sentence: "The teacher wrote a helpful comment on my essay.",
      chinese: "comment = 评语；老师在我的作文上写了一条有帮助的评语。",
    },
    "communication": {
      focusWord: "communication",
      sentence: "Good communication helps the team work well together.",
      chinese: "communication = 沟通；良好的沟通有助于团队顺利合作。",
    },
    "competition": {
      focusWord: "competition",
      sentence: "Leo entered a photography competition.",
      chinese: "competition = 比赛；利奥参加了一场摄影比赛。",
    },
    "composition": {
      focusWord: "composition",
      sentence: "We wrote a composition about our holidays.",
      chinese: "composition = 作文；我们写了一篇关于假期的作文。",
    },
    "condition": {
      focusWord: "condition",
      sentence: "The bicycle is old but still in good condition.",
      chinese: "condition = 状况；这辆自行车虽然旧，但状况仍然很好。",
    },
    "conference": {
      focusWord: "conference",
      sentence: "Our teachers attended an education conference in London.",
      chinese: "conference = 会议；我们的老师在伦敦参加了一场教育会议。",
    },
    "congratulations": {
      focusWord: "congratulations",
      sentence: "Congratulations on passing your driving test!",
      chinese: "congratulations = 祝贺；祝贺你通过驾驶考试！",
    },
    "connection": {
      focusWord: "connection",
      sentence: "There is a direct train connection between the two cities.",
      chinese: "connection = 交通连接；这两座城市之间有直达列车相连。",
    },
    "correction": {
      focusWord: "correction",
      sentence: "Please make this correction before you print the poster.",
      chinese: "correction = 改正；打印海报前请改正这个地方。",
    },
    "dancer": {
      focusWord: "dancer",
      sentence: "The dancer practised every morning before the show.",
      chinese: "dancer = 舞者；这位舞者在演出前每天早上练习。",
    },
    "defence": {
      focusWord: "defence",
      sentence: "The team worked hard in defence during the second half.",
      chinese: "defence = 防守；球队在下半场努力防守。",
    },
    "department": {
      focusWord: "department",
      sentence: "You can find tents in the camping department.",
      chinese: "department = 部门；你可以在露营用品部门找到帐篷。",
    },
    "destination": {
      focusWord: "destination",
      sentence: "Paris was the final destination on our trip.",
      chinese: "destination = 目的地；巴黎是我们旅程的最终目的地。",
    },
    "development": {
      focusWord: "development",
      sentence: "This course supports the development of practical skills.",
      chinese: "development = 发展；这门课程有助于发展实用技能。",
    },
    "difference": {
      focusWord: "difference",
      sentence: "There is a big difference between the two pictures.",
      chinese: "difference = 区别；这两幅图片之间有很大区别。",
    },
    "disappointment": {
      focusWord: "disappointment",
      sentence: "Missing the final was a great disappointment.",
      chinese: "disappointment = 失望之事；错过决赛是一件非常令人失望的事。",
    },
    "distance": {
      focusWord: "distance",
      sentence: "The distance from our house to school is two kilometres.",
      chinese: "distance = 距离；从我们家到学校的距离是两公里。",
    },
    "documentary": {
      focusWord: "documentary",
      sentence: "We watched a documentary about ocean wildlife.",
      chinese: "documentary = 纪录片；我们看了一部关于海洋野生动物的纪录片。",
    },
    "drivinglicence": {
      focusWord: "driving licence",
      sentence: "You need a driving licence to rent this car.",
      chinese: "driving licence = 驾驶执照；租这辆车需要驾驶执照。",
    },
    "election": {
      focusWord: "election",
      sentence: "Students voted for their class representative in the election.",
      chinese: "election = 选举；学生们在选举中投票选出班级代表。",
    },
    "electricity": {
      focusWord: "electricity",
      sentence: "The storm cut off the electricity for an hour.",
      chinese: "electricity = 电力；暴风雨导致停电一小时。",
    },
    "elementary": {
      focusWord: "elementary",
      sentence: "The course teaches elementary French.",
      chinese: "elementary = 初级的；这门课程教授初级法语。",
    },
    "employment": {
      focusWord: "employment",
      sentence: "The new factory will provide employment for local people.",
      chinese: "employment = 就业机会；新工厂将为当地人提供就业机会。",
    },
    "entertainment": {
      focusWord: "entertainment",
      sentence: "The hotel offers live entertainment every evening.",
      chinese: "entertainment = 娱乐表演；这家酒店每晚都有现场娱乐表演。",
    },
    "excitement": {
      focusWord: "excitement",
      sentence: "The children shouted with excitement when the band appeared.",
      chinese: "excitement = 兴奋；乐队出现时，孩子们兴奋地叫了起来。",
    },
    "exhibition": {
      focusWord: "exhibition",
      sentence: "The gallery is holding an exhibition of student art.",
      chinese: "exhibition = 展览；这家画廊正在举办学生艺术展。",
    },
    "expedition": {
      focusWord: "expedition",
      sentence: "They joined an expedition to study animals in the rainforest.",
      chinese: "expedition = 探险考察；他们参加了一次研究雨林动物的探险考察。",
    },
    "experience": {
      focusWord: "experience",
      sentence: "Working at the cafe gave her useful experience.",
      chinese: "experience = 经验；在咖啡馆工作给了她有用的经验。",
    },
    "experienced": {
      focusWord: "experienced",
      sentence: "We need an experienced guide for the mountain walk.",
      chinese: "experienced = 有经验的；这次山间徒步需要一位有经验的向导。",
    },
    "explanation": {
      focusWord: "explanation",
      sentence: "Her explanation made the difficult rule easy to understand.",
      chinese: "explanation = 解释；她的解释让这条复杂的规则变得容易理解。",
    },
    "fiction": {
      focusWord: "fiction",
      sentence: "This story is fiction, but it feels realistic.",
      chinese: "fiction = 虚构故事；这个故事是虚构的，但感觉很真实。",
    },
    "fitness": {
      focusWord: "fitness",
      sentence: "Cycling to school has improved my fitness.",
      chinese: "fitness = 体能；骑自行车上学提高了我的体能。",
    },
    "friendship": {
      focusWord: "friendship",
      sentence: "Their friendship began on the first day of school.",
      chinese: "friendship = 友谊；他们的友谊始于开学第一天。",
    },
    "generation": {
      focusWord: "generation",
      sentence: "People of my grandparents' generation wrote more letters.",
      chinese: "generation = 一代人；我祖父母那一代人写更多书信。",
    },
    "glance": {
      focusWord: "glance",
      sentence: "I took a quick glance at the timetable.",
      chinese: "glance = 一瞥；我快速看了一眼时间表。",
    },
    "graduation": {
      focusWord: "graduation",
      sentence: "Her family came to the graduation ceremony.",
      chinese: "graduation = 毕业典礼；她的家人来参加毕业典礼。",
    },
    "happiness": {
      focusWord: "happiness",
      sentence: "Spending time with friends brings me happiness.",
      chinese: "happiness = 快乐；和朋友共度时光给我带来快乐。",
    },
    "identification": {
      focusWord: "identification",
      sentence: "You must show identification before entering the building.",
      chinese: "identification = 身份证明；进入大楼前必须出示身份证明。",
    },
    "illness": {
      focusWord: "illness",
      sentence: "He missed two weeks of school because of an illness.",
      chinese: "illness = 疾病；他因为生病缺了两周课。",
    },
    "immigration": {
      focusWord: "immigration",
      sentence: "The museum has an exhibition about immigration to the city.",
      chinese: "immigration = 移民；博物馆有一个关于移民来到这座城市的展览。",
    },
    "importance": {
      focusWord: "importance",
      sentence: "The coach explained the importance of regular practice.",
      chinese: "importance = 重要性；教练解释了定期训练的重要性。",
    },
    "improvement": {
      focusWord: "improvement",
      sentence: "There has been a clear improvement in her pronunciation.",
      chinese: "improvement = 进步；她的发音有了明显进步。",
    },
    "inadvance": {
      focusWord: "in advance",
      sentence: "Book your tickets in advance to get a lower price.",
      chinese: "in advance = 提前；提前订票可以获得更低的价格。",
    },
    "incase": {
      focusWord: "in case",
      sentence: "Take an umbrella in case it rains later.",
      chinese: "in case = 以防；带把伞，以防稍后下雨。",
    },
    "influence": {
      focusWord: "influence",
      sentence: "Music has a strong influence on his paintings.",
      chinese: "influence = 影响；音乐对他的绘画有很大影响。",
    },
    "information": {
      focusWord: "information",
      sentence: "The website provides useful information about the course.",
      chinese: "information = 信息；这个网站提供有关课程的实用信息。",
    },
    "instance": {
      focusWord: "instance",
      sentence: "For instance, you could travel by train instead.",
      chinese: "instance = 例子；例如，你可以改乘火车。",
    },
    "instructions": {
      focusWord: "instructions",
      sentence: "Read the instructions before using the machine.",
      chinese: "instructions = 使用说明；使用机器前请阅读说明。",
    },
    "instrument": {
      focusWord: "instrument",
      sentence: "The piano was the first instrument she learned to play.",
      chinese: "instrument = 乐器；钢琴是她学会演奏的第一种乐器。",
    },
    "introduction": {
      focusWord: "introduction",
      sentence: "The book begins with a short introduction to the subject.",
      chinese: "introduction = 导论；这本书以一段简短的主题导论开篇。",
    },
    "invention": {
      focusWord: "invention",
      sentence: "The bicycle was an important invention.",
      chinese: "invention = 发明；自行车是一项重要发明。",
    },
    "invitation": {
      focusWord: "invitation",
      sentence: "I received an invitation to Maya's birthday party.",
      chinese: "invitation = 邀请函；我收到了玛雅生日聚会的邀请函。",
    },
    "licence": {
      focusWord: "licence",
      sentence: "The restaurant has a licence to serve food outdoors.",
      chinese: "licence = 许可证；这家餐厅有在户外供应食物的许可证。",
    },
    "matter": {
      focusWord: "matter",
      sentence: "We discussed the matter after class.",
      chinese: "matter = 事情；我们课后讨论了这件事。",
    },
    "membership": {
      focusWord: "membership",
      sentence: "Gym membership costs twenty pounds a month.",
      chinese: "membership = 会员资格；健身房会员资格每月收费二十英镑。",
    },
    "method": {
      focusWord: "method",
      sentence: "This method makes new words easier to remember.",
      chinese: "method = 方法；这种方法让新单词更容易记住。",
    },
    "moment": {
      focusWord: "moment",
      sentence: "Please wait a moment while I check your booking.",
      chinese: "moment = 片刻；请稍等片刻，我查看一下你的预订。",
    },
    "monument": {
      focusWord: "monument",
      sentence: "The monument was built to remember local soldiers.",
      chinese: "monument = 纪念碑；这座纪念碑是为纪念当地士兵而建的。",
    },
    "nationality": {
      focusWord: "nationality",
      sentence: "The form asks for your name and nationality.",
      chinese: "nationality = 国籍；表格要求填写你的姓名和国籍。",
    },
    "occupation": {
      focusWord: "occupation",
      sentence: "Please write your occupation on the application form.",
      chinese: "occupation = 职业；请在申请表上填写你的职业。",
    },
    "operation": {
      focusWord: "operation",
      sentence: "My grandfather is recovering after his knee operation.",
      chinese: "operation = 手术；我祖父做完膝盖手术后正在康复。",
    },
    "opportunity": {
      focusWord: "opportunity",
      sentence: "The school trip gave us an opportunity to practise French.",
      chinese: "opportunity = 机会；学校旅行给了我们练习法语的机会。",
    },
    "option": {
      focusWord: "option",
      sentence: "Taking the early train is our best option.",
      chinese: "option = 选择；乘早班火车是我们最好的选择。",
    },
    "organisation": {
      focusWord: "organisation",
      sentence: "She works for an organisation that protects wildlife.",
      chinese: "organisation = 组织；她为一个保护野生动物的组织工作。",
    },
    "pavement": {
      focusWord: "pavement",
      sentence: "Keep your bicycle off the pavement.",
      chinese: "pavement = 人行道；不要在人行道上骑自行车。",
    },
    "pence": {
      focusWord: "pence",
      sentence: "The postcard cost ninety pence.",
      chinese: "pence = 便士；这张明信片售价九十便士。",
    },
    "performance": {
      focusWord: "performance",
      sentence: "The audience enjoyed the band's final performance.",
      chinese: "performance = 演出；观众很喜欢乐队的最后一场演出。",
    },
    "pity": {
      focusWord: "pity",
      sentence: "It is a pity that you cannot come with us.",
      chinese: "pity = 遗憾；你不能和我们一起来，真遗憾。",
    },
    "population": {
      focusWord: "population",
      sentence: "The town has a population of about twenty thousand.",
      chinese: "population = 人口；这个镇大约有两万人口。",
    },
    "position": {
      focusWord: "position",
      sentence: "Move the chair into a more comfortable position.",
      chinese: "position = 位置；把椅子移到一个更舒适的位置。",
    },
    "possibility": {
      focusWord: "possibility",
      sentence: "There is a possibility that the flight will be delayed.",
      chinese: "possibility = 可能性；航班有可能延误。",
    },
    "power": {
      focusWord: "power",
      sentence: "The storm left the village without power.",
      chinese: "power = 电力；暴风雨导致村庄停电。",
    },
    "preparation": {
      focusWord: "preparation",
      sentence: "Good preparation helped us finish the project on time.",
      chinese: "preparation = 准备；充分的准备帮助我们按时完成项目。",
    },
    "prescription": {
      focusWord: "prescription",
      sentence: "The doctor gave me a prescription for some medicine.",
      chinese: "prescription = 处方；医生给我开了一张药物处方。",
    },
    "presentation": {
      focusWord: "presentation",
      sentence: "Nina gave a presentation about climate change.",
      chinese: "presentation = 演讲；尼娜做了一场关于气候变化的演讲。",
    },
    "production": {
      focusWord: "production",
      sentence: "The factory increased its production of bicycles.",
      chinese: "production = 产量；这家工厂提高了自行车产量。",
    },
    "qualification": {
      focusWord: "qualification",
      sentence: "A teaching qualification is required for this job.",
      chinese: "qualification = 资格证书；这份工作要求具备教师资格证书。",
    },
    "quality": {
      focusWord: "quality",
      sentence: "The quality of the food was excellent.",
      chinese: "quality = 质量；食物的质量非常好。",
    },
    "quantity": {
      focusWord: "quantity",
      sentence: "Use only a small quantity of salt in the soup.",
      chinese: "quantity = 数量；这道汤里只放少量盐。",
    },
    "questionnaire": {
      focusWord: "questionnaire",
      sentence: "Please complete the questionnaire after the course.",
      chinese: "questionnaire = 问卷；课程结束后请完成这份问卷。",
    },
    "reality": {
      focusWord: "reality",
      sentence: "Her dream of becoming a pilot became a reality.",
      chinese: "reality = 现实；她成为飞行员的梦想变成了现实。",
    },
    "reception": {
      focusWord: "reception",
      sentence: "Ask for the key at reception when you arrive.",
      chinese: "reception = 接待处；到达时请去接待处领取钥匙。",
    },
    "receptionist": {
      focusWord: "receptionist",
      sentence: "The receptionist booked a taxi for us.",
      chinese: "receptionist = 接待员；接待员为我们预订了一辆出租车。",
    },
    "refreshments": {
      focusWord: "refreshments",
      sentence: "Light refreshments will be served after the meeting.",
      chinese: "refreshments = 茶点；会议结束后将提供简单茶点。",
    },
    "registration": {
      focusWord: "registration",
      sentence: "Online registration closes on Friday.",
      chinese: "registration = 注册；网上注册将于星期五截止。",
    },
    "relation": {
      focusWord: "relation",
      sentence: "The report explains the relation between exercise and sleep.",
      chinese: "relation = 关系；这份报告解释了运动与睡眠之间的关系。",
    },
    "relaxation": {
      focusWord: "relaxation",
      sentence: "I listen to quiet music for relaxation.",
      chinese: "relaxation = 放松；我听轻柔的音乐来放松。",
    },
    "result": {
      focusWord: "result",
      sentence: "The test result will arrive by email.",
      chinese: "result = 结果；考试结果将通过电子邮件发送。",
    },
    "retirement": {
      focusWord: "retirement",
      sentence: "My grandfather plans to travel after retirement.",
      chinese: "retirement = 退休；我祖父计划退休后去旅行。",
    },
    "romance": {
      focusWord: "romance",
      sentence: "The film is a romance set in Paris.",
      chinese: "romance = 爱情故事；这部电影是一个以巴黎为背景的爱情故事。",
    },
    "sciencefiction": {
      focusWord: "science fiction",
      sentence: "My brother enjoys science fiction about life on other planets.",
      chinese: "science fiction = 科幻小说；我弟弟喜欢关于其他星球生命的科幻小说。",
    },
    "secret": {
      focusWord: "secret",
      sentence: "Can you keep this plan a secret?",
      chinese: "secret = 秘密；你能对这个计划保密吗？",
    },
    "section": {
      focusWord: "section",
      sentence: "Read the final section of the article.",
      chinese: "section = 部分；阅读这篇文章的最后一部分。",
    },
    "security": {
      focusWord: "security",
      sentence: "The hotel has good security at night.",
      chinese: "security = 安保措施；这家酒店夜间的安保措施很好。",
    },
    "securityguard": {
      focusWord: "security guard",
      sentence: "The security guard showed us the emergency exit.",
      chinese: "security guard = 保安；保安向我们指出了紧急出口。",
    },
    "silence": {
      focusWord: "silence",
      sentence: "There was complete silence during the exam.",
      chinese: "silence = 安静；考试期间一片安静。",
    },
    "situation": {
      focusWord: "situation",
      sentence: "We stayed calm in a difficult situation.",
      chinese: "situation = 情况；我们在困难的情况下保持冷静。",
    },
    "solution": {
      focusWord: "solution",
      sentence: "We found a simple solution to the problem.",
      chinese: "solution = 解决办法；我们找到了这个问题的简单解决办法。",
    },
    "spaceship": {
      focusWord: "spaceship",
      sentence: "The spaceship landed safely on the moon.",
      chinese: "spaceship = 宇宙飞船；宇宙飞船安全降落在月球上。",
    },
    "suggestion": {
      focusWord: "suggestion",
      sentence: "Ella made a useful suggestion for the school trip.",
      chinese: "suggestion = 建议；埃拉为学校旅行提出了一条有用的建议。",
    },
    "tournament": {
      focusWord: "tournament",
      sentence: "Our school is hosting a chess tournament.",
      chinese: "tournament = 锦标赛；我们学校正在举办国际象棋锦标赛。",
    },
    "translation": {
      focusWord: "translation",
      sentence: "I read an English translation of the novel.",
      chinese: "translation = 译本；我读了这部小说的英文译本。",
    },
    "unemployment": {
      focusWord: "unemployment",
      sentence: "The new jobs helped reduce unemployment in the town.",
      chinese: "unemployment = 失业；这些新工作帮助减少了镇上的失业现象。",
    },
    "a": {
      focusWord: "a / an",
      sentence: "I saw a dog and an elephant at the zoo.",
      chinese: "a / an = 一个；我在动物园看到一只狗和一头大象。",
    },
    "about": {
      focusWord: "about",
      sentence: "We talked about our plans for the weekend.",
      chinese: "about = 关于；我们谈了周末的计划。",
    },
    "above": {
      focusWord: "above",
      sentence: "The clock hangs above the classroom door.",
      chinese: "above = 在上方；时钟挂在教室门的上方。",
    },
    "absolutely": {
      focusWord: "absolutely",
      sentence: "You are absolutely right about the answer.",
      chinese: "absolutely = 完全地；你的答案完全正确。",
    },
    "accordingto": {
      focusWord: "according to",
      sentence: "According to the timetable, the train leaves at nine.",
      chinese: "according to = 根据；根据时间表，火车九点出发。",
    },
    "across": {
      focusWord: "across",
      sentence: "We walked across the bridge to the station.",
      chinese: "across = 穿过；我们穿过桥走到车站。",
    },
    "actually": {
      focusWord: "actually",
      sentence: "I thought the cafe was closed, but it is actually open.",
      chinese: "actually = 实际上；我以为咖啡馆关门了，但它实际上还开着。",
    },
    "after": {
      focusWord: "after",
      sentence: "We went for a walk after dinner.",
      chinese: "after = 在...之后；晚饭后我们去散步了。",
    },
    "again": {
      focusWord: "again",
      sentence: "Could you say that again, please?",
      chinese: "again = 再一次；请问你能再说一次吗？",
    },
    "against": {
      focusWord: "against",
      sentence: "Do not lean your bicycle against the window.",
      chinese: "against = 倚靠；不要把自行车靠在窗户上。",
    },
    "ago": {
      focusWord: "ago",
      sentence: "We moved here three years ago.",
      chinese: "ago = 以前；我们三年前搬到这里。",
    },
    "ahead": {
      focusWord: "ahead",
      sentence: "Go straight ahead and turn left at the bank.",
      chinese: "ahead = 向前；一直向前走，在银行处左转。",
    },
    "alike": {
      focusWord: "alike",
      sentence: "The twins look alike, but they have different interests.",
      chinese: "alike = 相像；这对双胞胎看起来很像，但兴趣不同。",
    },
    "all": {
      focusWord: "all",
      sentence: "All the students finished the test on time.",
      chinese: "all = 所有的；所有学生都按时完成了考试。",
    },
    "almost": {
      focusWord: "almost",
      sentence: "It is almost time to leave.",
      chinese: "almost = 几乎；差不多该离开了。",
    },
    "alone": {
      focusWord: "alone",
      sentence: "I do not like walking home alone at night.",
      chinese: "alone = 独自；我不喜欢夜里独自走回家。",
    },
    "along": {
      focusWord: "along",
      sentence: "We cycled along the river.",
      chinese: "along = 沿着；我们沿着河骑自行车。",
    },
    "aloud": {
      focusWord: "aloud",
      sentence: "Please read the first paragraph aloud.",
      chinese: "aloud = 出声地；请出声朗读第一段。",
    },
    "already": {
      focusWord: "already",
      sentence: "I have already finished my homework.",
      chinese: "already = 已经；我已经完成家庭作业了。",
    },
    "also": {
      focusWord: "also",
      sentence: "The hotel has a pool and also offers free breakfast.",
      chinese: "also = 也；这家酒店有游泳池，也提供免费早餐。",
    },
    "although": {
      focusWord: "although",
      sentence: "Although it was raining, we continued the match.",
      chinese: "although = 虽然；虽然下着雨，我们还是继续了比赛。",
    },
    "altogether": {
      focusWord: "altogether",
      sentence: "There were twelve students altogether.",
      chinese: "altogether = 总共；总共有十二名学生。",
    },
    "always": {
      focusWord: "always",
      sentence: "My bus always arrives at eight.",
      chinese: "always = 总是；我的公交车总是在八点到达。",
    },
    "am": {
      focusWord: "a.m",
      sentence: "The museum opens at nine a.m.",
      chinese: "a.m = 上午；博物馆上午九点开放。",
    },
    "among": {
      focusWord: "among",
      sentence: "We found a quiet place among the trees.",
      chinese: "among = 在...之中；我们在树林中找到了一个安静的地方。",
    },
    "an": {
      focusWord: "an",
      sentence: "She ate an apple before school.",
      chinese: "an = 一个；她上学前吃了一个苹果。",
    },
    "and": {
      focusWord: "and",
      sentence: "Mia and Leo walked to school together.",
      chinese: "and = 和；米娅和利奥一起步行去学校。",
    },
    "another": {
      focusWord: "another",
      sentence: "Could I have another glass of water?",
      chinese: "another = 另一个；可以再给我一杯水吗？",
    },
    "any": {
      focusWord: "any",
      sentence: "Do you have any questions about the trip?",
      chinese: "any = 任何；你对这次旅行有任何问题吗？",
    },
    "anybody": {
      focusWord: "anybody",
      sentence: "Is anybody sitting in this seat?",
      chinese: "anybody = 任何人；这个座位有人坐吗？",
    },
    "anymore": {
      focusWord: "anymore",
      sentence: "We do not use that old computer anymore.",
      chinese: "anymore = 不再；我们不再使用那台旧电脑了。",
    },
    "anyone": {
      focusWord: "anyone",
      sentence: "Anyone can join the school art club.",
      chinese: "anyone = 任何人；任何人都可以加入学校艺术社团。",
    },
    "anything": {
      focusWord: "anything",
      sentence: "Did you buy anything at the market?",
      chinese: "anything = 任何东西；你在市场买东西了吗？",
    },
    "anyway": {
      focusWord: "anyway",
      sentence: "It was raining, but we went for a walk anyway.",
      chinese: "anyway = 无论如何；虽然下雨了，但我们还是去散步了。",
    },
    "anywhere": {
      focusWord: "anywhere",
      sentence: "You can sit anywhere in the room.",
      chinese: "anywhere = 任何地方；你可以坐在房间里的任何地方。",
    },
    "apart": {
      focusWord: "apart",
      sentence: "The two houses are only a few metres apart.",
      chinese: "apart = 相距；这两栋房子只相距几米。",
    },
    "apartfrom": {
      focusWord: "apart from",
      sentence: "Apart from the rain, we had a wonderful holiday.",
      chinese: "apart from = 除...之外；除了下雨之外，我们度过了一个美好的假期。",
    },
    "approximately": {
      focusWord: "approximately",
      sentence: "The journey takes approximately forty minutes.",
      chinese: "approximately = 大约；这段旅程大约需要四十分钟。",
    },
    "around": {
      focusWord: "around",
      sentence: "We walked around the lake after lunch.",
      chinese: "around = 绕着；午饭后我们绕着湖散步。",
    },
    "as": {
      focusWord: "as",
      sentence: "She works as a nurse at the local hospital.",
      chinese: "as = 作为；她在当地医院当护士。",
    },
    "aslongas": {
      focusWord: "as long as",
      sentence: "You can borrow my bike as long as you return it today.",
      chinese: "as long as = 只要；只要你今天归还，就可以借我的自行车。",
    },
    "aswell": {
      focusWord: "as well",
      sentence: "Tom plays football and swims as well.",
      chinese: "as well = 也；汤姆踢足球，也游泳。",
    },
    "at": {
      focusWord: "at",
      sentence: "Meet me at the station at six.",
      chinese: "at = 在；六点在车站和我见面。",
    },
    "atall": {
      focusWord: "at all",
      sentence: "I was not tired at all after the walk.",
      chinese: "at all = 一点也不；散步后我一点也不累。",
    },
    "atfirst": {
      focusWord: "at first",
      sentence: "At first, the new rules seemed confusing.",
      chinese: "at first = 起初；起初，这些新规则似乎令人困惑。",
    },
    "atlast": {
      focusWord: "at last",
      sentence: "The bus arrived at last.",
      chinese: "at last = 终于；公交车终于到了。",
    },
    "atleast": {
      focusWord: "at least",
      sentence: "Try to read for at least twenty minutes a day.",
      chinese: "at least = 至少；尽量每天阅读至少二十分钟。",
    },
    "atonce": {
      focusWord: "at once",
      sentence: "Please call the doctor at once.",
      chinese: "at once = 立刻；请立刻给医生打电话。",
    },
    "atpresent": {
      focusWord: "at present",
      sentence: "The museum is closed at present.",
      chinese: "at present = 目前；博物馆目前不开放。",
    },
    "away": {
      focusWord: "away",
      sentence: "The beach is only five minutes away.",
      chinese: "away = 相距；海滩离这里只有五分钟路程。",
    },
    "back": {
      focusWord: "back",
      sentence: "Please put the book back on the shelf.",
      chinese: "back = 回原处；请把书放回书架。",
    },
    "backwards": {
      focusWord: "backwards",
      sentence: "He took two steps backwards.",
      chinese: "backwards = 向后；他向后退了两步。",
    },
    "badly": {
      focusWord: "badly",
      sentence: "The team played badly in the first half.",
      chinese: "badly = 糟糕地；球队上半场表现得很差。",
    },
    "becauseof": {
      focusWord: "because of",
      sentence: "The match was cancelled because of the snow.",
      chinese: "because of = 因为；比赛因为下雪而取消了。",
    },
    "before": {
      focusWord: "before",
      sentence: "Wash your hands before dinner.",
      chinese: "before = 在...之前；晚饭前洗手。",
    },
    "behind": {
      focusWord: "behind",
      sentence: "The car park is behind the hotel.",
      chinese: "behind = 在...后面；停车场在酒店后面。",
    },
    "below": {
      focusWord: "below",
      sentence: "Please write your answer below the picture.",
      chinese: "below = 在下面；请把答案写在图片下面。",
    },
    "beneath": {
      focusWord: "beneath",
      sentence: "The keys were hidden beneath a pile of papers.",
      chinese: "beneath = 在...下方；钥匙藏在一堆纸下面。",
    },
    "beside": {
      focusWord: "beside",
      sentence: "Come and sit beside me.",
      chinese: "beside = 在旁边；过来坐在我旁边。",
    },
    "besides": {
      focusWord: "besides",
      sentence: "Besides English, she also speaks French.",
      chinese: "besides = 除...之外还；除了英语，她还会说法语。",
    },
    "between": {
      focusWord: "between",
      sentence: "The cafe is between the bank and the post office.",
      chinese: "between = 在...之间；咖啡馆在银行和邮局之间。",
    },
    "beyond": {
      focusWord: "beyond",
      sentence: "The path continues beyond the bridge.",
      chinese: "beyond = 在...另一边；这条小路延伸到桥的另一边。",
    },
    "both": {
      focusWord: "both",
      sentence: "Both answers are correct.",
      chinese: "both = 两者都；两个答案都正确。",
    },
    "but": {
      focusWord: "but",
      sentence: "The room is small but comfortable.",
      chinese: "but = 但是；房间很小，但是很舒适。",
    },
    "by": {
      focusWord: "by",
      sentence: "We travelled to Oxford by train.",
      chinese: "by = 乘；我们乘火车去了牛津。",
    },
    "bymistake": {
      focusWord: "by mistake",
      sentence: "I took your bag by mistake.",
      chinese: "by mistake = 错误地；我不小心拿错了你的包。",
    },
    "byname": {
      focusWord: "by name",
      sentence: "The teacher knows every student by name.",
      chinese: "by name = 知道名字；老师知道每个学生的名字。",
    },
    "bye": {
      focusWord: "bye",
      sentence: "Bye, see you tomorrow!",
      chinese: "bye = 再见；再见，明天见！",
    },
    "can": {
      focusWord: "can",
      sentence: "You can borrow my dictionary.",
      chinese: "can = 可以；你可以借我的字典。",
    },
    "something": {
      focusWord: "something",
      sentence: "There is something interesting in this box.",
      chinese: "something = 某物；这个箱子里有件有趣的东西。",
    },
    "carefully": {
      focusWord: "carefully",
      sentence: "Read the question carefully before answering.",
      chinese: "carefully = 仔细地；回答前仔细阅读问题。",
    },
    "certainly": {
      focusWord: "certainly",
      sentence: "I will certainly help you with the project.",
      chinese: "certainly = 一定；我一定会帮你完成这个项目。",
    },
    "cheers": {
      focusWord: "cheers",
      sentence: "Cheers for helping me with the boxes.",
      chinese: "cheers = 谢谢；谢谢你帮我搬箱子。",
    },
    "clearly": {
      focusWord: "clearly",
      sentence: "Please speak clearly during the recording.",
      chinese: "clearly = 清楚地；录音时请清楚地说话。",
    },
    "completely": {
      focusWord: "completely",
      sentence: "The road was completely empty at night.",
      chinese: "completely = 完全地；夜里这条路完全没有车辆。",
    },
  };
}

const reviewedExampleKeyOverrides: Record<string, string> = {
  workout: "workoutnoun",
  "check-in": "checkinnoun",
  checkout: "checkoutnoun",
};

export function getWordExample(word: VocabularyItem): WordExample {
  const examples = getReviewedWordExamples();
  const term = cleanExampleTerm(word.term);
  const key = reviewedExampleKeyOverrides[term.toLowerCase()] ?? normalizeSpokenText(term);
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
