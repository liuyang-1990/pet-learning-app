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
  sentence: string;
  focusWord: string;
  chinese: string;
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
        imageUrl: createDefaultPart2ImageDataUrl(),
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

export function getWordExample(word: VocabularyItem): WordExample {
  const examples: Record<string, WordExample> = {
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
  };
  const term = cleanExampleTerm(word.term);
  const key = normalizeSpokenText(term);

  return (
    examples[key] ?? {
      focusWord: term,
      ...makeNaturalFallbackExample(term, word.chineseGloss),
    }
  );
}

export function displayWordGloss(gloss: string): string {
  return gloss === "Cambridge B1/PET 官方词表" ? "PET 词汇" : gloss;
}

function cleanExampleTerm(term: string): string {
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

function makeNaturalFallbackExample(
  term: string,
  chineseGloss: string,
): Omit<WordExample, "focusWord"> {
  const normalized = normalizeSpokenText(term);
  const displayGloss = displayWordGloss(chineseGloss);
  const meaning =
    displayGloss === "PET 词汇" || displayGloss === ""
      ? "中文释义待补充"
      : displayGloss;
  const sentence = fallbackSentenceForTerm(term, normalized);

  return {
    sentence,
    chinese: `${term} = ${meaning}；${translateFallbackSentence(term, sentence)}`,
  };
}

function fallbackSentenceForTerm(term: string, normalized: string): string {
  if (term.includes(" ")) {
    return `I can talk about ${term} in my speaking answer.`;
  }

  if (normalized.endsWith("ly") && normalized.length > 4) {
    return `She answered ${term} when the teacher asked her.`;
  }

  if (normalized.endsWith("ed") && normalized.length > 4) {
    return `I felt really ${term} after the long lesson.`;
  }

  if (normalized.endsWith("ing") && normalized.length > 5) {
    return `This activity is ${term}, so I want to try it again.`;
  }

  if (
    normalized.endsWith("ful") ||
    normalized.endsWith("ive") ||
    normalized.endsWith("able") ||
    normalized.endsWith("al")
  ) {
    return `That sounds really ${term}, but I need more time.`;
  }

  const templates = [
    `My teacher asked us to write about ${term} today.`,
    `I need to check the ${term} before class.`,
    `Let's talk about the ${term} after school.`,
    `I put the ${term} in my bag before I left.`,
  ];
  const index = normalized.charCodeAt(0) % templates.length || 0;

  return templates[index];
}

function translateFallbackSentence(term: string, sentence: string): string {
  if (sentence.includes("speaking answer")) {
    return `我可以在口语回答里谈到 ${term}。`;
  }

  if (sentence.includes("answered")) {
    return `老师问她时，她${term}地回答了。`;
  }

  if (sentence.includes("felt really")) {
    return `上完很长的一节课后，我感到很${term}。`;
  }

  if (sentence.includes("activity")) {
    return `这个活动很${term}，所以我想再试一次。`;
  }

  if (sentence.includes("sounds really")) {
    return `那听起来很${term}，但我还需要更多时间。`;
  }

  if (sentence.includes("write about")) {
    return `老师让我们今天写一写 ${term}。`;
  }

  if (sentence.includes("check the")) {
    return `上课前我需要检查一下 ${term}。`;
  }

  if (sentence.includes("talk about")) {
    return `我们放学后聊聊 ${term} 吧。`;
  }

  return `我离开前把 ${term} 放进了书包。`;
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
    ...(household.seenWords ?? []).map((word) => word.term.toLowerCase()),
    ...(household.weakWords ?? []).map((word) => word.term.toLowerCase()),
  ]);
  const unseenWords = (household.wordBank ?? []).filter(
    (word) => !blockedTerms.has(word.term.toLowerCase()),
  );
  const themed = unseenWords.filter((word) => word.theme === theme);
  const themedSelection = seededShuffle(themed, `${household.learnerName}:${today}:${theme}:new-words`);

  if (themedSelection.length >= limit) {
    return themedSelection.slice(0, limit);
  }

  const selectedTerms = new Set(themedSelection.map((word) => word.term.toLowerCase()));
  const fallback = seededShuffle(
    unseenWords.filter((word) => !selectedTerms.has(word.term.toLowerCase())),
    `${household.learnerName}:${today}:fallback-new-words`,
  );

  return [...themedSelection, ...fallback].slice(0, limit);
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
