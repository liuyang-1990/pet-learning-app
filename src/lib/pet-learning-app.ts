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
  weakWords: WeakWord[];
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

export function createDemoHousehold(): HouseholdSpace {
  return {
    learnerName: "Alex",
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
        term: "library",
        chineseGloss: "图书馆",
        reviewStage: "mastered",
        dueOn: "2026-06-20",
        mastered: true,
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
      },
    ],
  };
}

export function getLearnerHome(household: HouseholdSpace, now: Date): LearnerHome {
  const today = dateKey(now);
  const dueWeakWords = household.weakWords.filter(
    (word) => !word.mastered && word.dueOn <= today,
  );

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
  return date.toISOString().slice(0, 10);
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

function replaceById(records: DailySessionRecord[], incoming: DailySessionRecord) {
  const others = records.filter((record) => record.id !== incoming.id);
  return [...others, incoming].sort((a, b) => a.completedOn.localeCompare(b.completedOn));
}

function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
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
