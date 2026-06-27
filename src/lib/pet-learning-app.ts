export type ReviewStage = "new" | "tomorrow" | "threeDaysLater" | "mastered";

export type WeakWord = {
  term: string;
  chineseGloss: string;
  reviewStage: ReviewStage;
  dueOn: string;
  mastered: boolean;
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
  dailyWeakWordLimit: number;
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
  weakWords: WeakWord[];
  wordMistakes: WeakWordMistakeRecord[];
  dailySessions: DailySessionRecord[];
  recentRecordings: RecentRecording[];
  presetPrompts: Prompt[];
};

export type LearnerHome = {
  learnerName: string;
  practiceStreakDays: number;
  dueWeakWords: WeakWord[];
  canStartDailySession: boolean;
};

export type DailySession = {
  id: string;
  status: "in_progress";
  startedAt: string;
  steps: Array<
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
};

export type WordShadowingFeedback = {
  status: "clear" | "needs_practice";
  feedback: string;
  modelPhrase: string;
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

export function createDemoHousehold(): HouseholdSpace {
  return {
    learnerName: "Alex",
    settings: {
      dailyWeakWordLimit: defaultDailyWeakWordLimit,
    },
    weakWords: [
      {
        term: "usually",
        chineseGloss: "通常",
        reviewStage: "tomorrow",
        dueOn: "2026-06-26",
        mastered: false,
      },
      {
        term: "because",
        chineseGloss: "因为",
        reviewStage: "new",
        dueOn: "2026-06-26",
        mastered: false,
      },
      {
        term: "environment",
        chineseGloss: "环境",
        reviewStage: "threeDaysLater",
        dueOn: "2026-06-26",
        mastered: false,
      },
      {
        term: "picture",
        chineseGloss: "图片",
        reviewStage: "new",
        dueOn: "2026-06-28",
        mastered: false,
      },
      {
        term: "background",
        chineseGloss: "背景",
        reviewStage: "new",
        dueOn: "2026-06-28",
        mastered: false,
      },
      {
        term: "playground",
        chineseGloss: "操场",
        reviewStage: "new",
        dueOn: "2026-06-29",
        mastered: false,
      },
      {
        term: "library",
        chineseGloss: "图书馆",
        reviewStage: "mastered",
        dueOn: "2026-06-20",
        mastered: true,
      },
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
        imageUrl: createDefaultPart2ImageDataUrl(),
      },
    ],
  };
}

export function getLearnerHome(household: HouseholdSpace, now: Date): LearnerHome {
  const today = dateKey(now);
  const dueWeakWords = selectDailyWeakWords(household, today);

  return {
    learnerName: household.learnerName,
    practiceStreakDays: countPracticeStreak(household.dailySessions, today),
    dueWeakWords,
    canStartDailySession: true,
  };
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
      { kind: "weak_word_warmup", words: home.dueWeakWords },
      { kind: "speaking_part_1", prompt: part1Prompt },
      { kind: "speaking_part_2", prompt: part2Prompt },
      { kind: "vocabulary_review", words: home.dueWeakWords },
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
    imageUrl: createDefaultPart2ImageDataUrl(),
  };
}

export function getPart2ImageChoices(prompt: Prompt, prompts: Prompt[] = []): string[] {
  return uniqueValues([
    prompt.imageUrl,
    ...prompts
      .filter((item) => item.part === "part_2")
      .map((item) => item.imageUrl),
    createDefaultPart2ImageDataUrl(),
    createPart2SceneImageDataUrl("Classroom activity", "#f6efe5", "#86b7d6", "#e7a45f"),
    createPart2SceneImageDataUrl("Family kitchen", "#fff3c9", "#74a57f", "#d96c5f"),
    createPart2SceneImageDataUrl("Sports day", "#e4f2ff", "#66b37a", "#557bb6"),
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
  const clear = spoken.includes(target);

  return {
    status: clear ? "clear" : "needs_practice",
    feedback: clear
      ? `“${input.word}” 听起来比较清楚，可以放进句子里继续练。`
      : `“${input.word}” 还不够清楚，请听英音示范后再跟读一次。`,
    modelPhrase: `I can say ${input.word} clearly.`,
  };
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
    weakWords: household.weakWords.map((word) => {
      const correct = resultsByTerm.get(word.term);

      if (correct === undefined) {
        return word;
      }

      const reviewStage = correct
        ? nextReviewStage(word.reviewStage)
        : previousReviewStage(word.reviewStage);

      return {
        ...word,
        reviewStage,
        mastered: reviewStage === "mastered",
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
      dailyWeakWordLimit: clampDailyWeakWordLimit(dailyWeakWordLimit),
    },
  };
}

export function addGuardianTopicWord(
  household: HouseholdSpace,
  input: GuardianTopicWordInput,
): HouseholdSpace {
  const existing = household.weakWords.some(
    (word) => word.term.toLowerCase() === input.term.trim().toLowerCase(),
  );

  if (existing || !input.term.trim()) {
    return household;
  }

  return {
    ...household,
    weakWords: [
      ...household.weakWords,
      {
        term: input.term.trim(),
        chineseGloss: input.chineseGloss.trim() || "待补充",
        reviewStage: "new",
        dueOn: input.dueOn,
        mastered: false,
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
  const limit = clampDailyWeakWordLimit(
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

function countPracticeStreak(records: DailySessionRecord[], today: string): number {
  const completedDays = new Set(records.map((record) => record.completedOn));
  let cursor = previousDateKey(today);
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
  const candidates: Array<Omit<WeakWord, "dueOn" | "mastered" | "reviewStage">> = [
    { term: "usually", chineseGloss: "通常" },
    { term: "because", chineseGloss: "因为" },
    { term: "environment", chineseGloss: "环境" },
  ];

  return candidates
    .filter((candidate) => lower.includes(candidate.term))
    .map((candidate) => ({
      ...candidate,
      reviewStage: "new",
      dueOn: "2026-06-27",
      mastered: false,
    }));
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

function mergeWeakWords(current: WeakWord[], incoming: WeakWord[]): WeakWord[] {
  const byTerm = new Map(current.map((word) => [word.term.toLowerCase(), word]));

  for (const word of incoming) {
    const key = word.term.toLowerCase();
    const existing = byTerm.get(key);

    byTerm.set(key, existing ? { ...existing, mastered: false } : word);
  }

  return Array.from(byTerm.values());
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

function clampDailyWeakWordLimit(value: number): number {
  if (!Number.isFinite(value)) {
    return defaultDailyWeakWordLimit;
  }

  return Math.min(20, Math.max(1, Math.round(value)));
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

function createDefaultPart2ImageDataUrl() {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="900" height="620" viewBox="0 0 900 620">
      <rect width="900" height="620" fill="#d9ecff"/>
      <circle cx="760" cy="100" r="54" fill="#f8c95d"/>
      <rect y="410" width="900" height="210" fill="#8ccf8a"/>
      <path d="M0 415 C130 350 210 430 340 370 C480 300 560 420 700 360 C780 330 840 345 900 320 L900 430 L0 430 Z" fill="#6fbf7c"/>
      <rect x="80" y="295" width="160" height="86" rx="12" fill="#b67a45"/>
      <rect x="95" y="255" width="18" height="132" fill="#6e4b2a"/>
      <rect x="210" y="255" width="18" height="132" fill="#6e4b2a"/>
      <circle cx="515" cy="288" r="34" fill="#f0b38b"/>
      <rect x="485" y="322" width="62" height="92" rx="18" fill="#4b78a8"/>
      <line x1="492" y1="352" x2="430" y2="385" stroke="#2d425a" stroke-width="14" stroke-linecap="round"/>
      <line x1="542" y1="352" x2="604" y2="376" stroke="#2d425a" stroke-width="14" stroke-linecap="round"/>
      <line x1="500" y1="410" x2="472" y2="490" stroke="#283747" stroke-width="16" stroke-linecap="round"/>
      <line x1="535" y1="410" x2="570" y2="490" stroke="#283747" stroke-width="16" stroke-linecap="round"/>
      <circle cx="650" cy="318" r="28" fill="#f1c29c"/>
      <rect x="622" y="348" width="56" height="78" rx="16" fill="#db6d55"/>
      <line x1="626" y1="376" x2="585" y2="420" stroke="#7d332a" stroke-width="12" stroke-linecap="round"/>
      <line x1="672" y1="376" x2="720" y2="410" stroke="#7d332a" stroke-width="12" stroke-linecap="round"/>
      <circle cx="705" cy="410" r="27" fill="#ffffff" stroke="#333" stroke-width="4"/>
      <path d="M125 260 C90 210 115 145 178 148 C230 150 257 204 235 257 Z" fill="#4f9d69"/>
      <rect x="170" y="250" width="22" height="135" fill="#79553b"/>
      <text x="450" y="570" text-anchor="middle" font-family="Arial" font-size="34" font-weight="700" fill="#24496c">Park scene</text>
    </svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function createPart2SceneImageDataUrl(
  label: string,
  sky: string,
  ground: string,
  accent: string,
) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="900" height="620" viewBox="0 0 900 620">
      <rect width="900" height="620" fill="${sky}"/>
      <rect y="410" width="900" height="210" fill="${ground}"/>
      <rect x="95" y="130" width="235" height="170" rx="18" fill="#ffffff" stroke="#2d425a" stroke-width="8"/>
      <line x1="125" y1="178" x2="300" y2="178" stroke="${accent}" stroke-width="14" stroke-linecap="round"/>
      <line x1="125" y1="226" x2="255" y2="226" stroke="#6d7f8f" stroke-width="12" stroke-linecap="round"/>
      <circle cx="455" cy="270" r="35" fill="#efb88f"/>
      <rect x="420" y="304" width="72" height="98" rx="20" fill="${accent}"/>
      <line x1="430" y1="340" x2="365" y2="382" stroke="#6b3b2a" stroke-width="14" stroke-linecap="round"/>
      <line x1="488" y1="340" x2="555" y2="382" stroke="#6b3b2a" stroke-width="14" stroke-linecap="round"/>
      <line x1="438" y1="400" x2="405" y2="500" stroke="#2d425a" stroke-width="17" stroke-linecap="round"/>
      <line x1="475" y1="400" x2="510" y2="500" stroke="#2d425a" stroke-width="17" stroke-linecap="round"/>
      <circle cx="640" cy="292" r="32" fill="#f2c29d"/>
      <rect x="610" y="324" width="65" height="96" rx="18" fill="#5d8cc1"/>
      <line x1="616" y1="356" x2="560" y2="402" stroke="#70402c" stroke-width="13" stroke-linecap="round"/>
      <line x1="669" y1="356" x2="730" y2="390" stroke="#70402c" stroke-width="13" stroke-linecap="round"/>
      <ellipse cx="720" cy="450" rx="54" ry="20" fill="#ffffff" stroke="#2d425a" stroke-width="5"/>
      <rect x="155" y="410" width="130" height="70" rx="10" fill="#b77a4d"/>
      <rect x="185" y="350" width="70" height="62" rx="8" fill="#d9a15f"/>
      <text x="450" y="570" text-anchor="middle" font-family="Arial" font-size="34" font-weight="700" fill="#24496c">${label}</text>
    </svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
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
