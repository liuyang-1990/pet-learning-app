import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { reviewedWordExampleAudit } from "./generated/pet-word-example-audit";
import { generatedWordExamples } from "./generated/pet-word-examples";
import {
  addGuardianPrompt,
  addGuardianTopicWord,
  addRecentRecording,
  assessWordShadowing,
  continuePart1Conversation,
  completeDailySession,
  completeVocabularyReview,
  createDemoHousehold,
  ensurePart2Image,
  getWordExample,
  getPart2ImageChoices,
  getGuardianProgress,
  getLearnerHome,
  getReviewedWordExamples,
  initializePart2ImagePool,
  purgeExpiredRecentRecordings,
  recordWordShadowingFeedback,
  submitPart2Answer,
  submitSpeakingAttempt,
  startDailySession,
  updateDailyWeakWordLimit,
} from "./pet-learning-app";

const firstNatureWeatherBatch = [
  { term: "cloudy", chineseGloss: "多云的；有愁容的；云的" },
  { term: "crop", chineseGloss: "农作物；产量；平头" },
  { term: "dust", chineseGloss: "灰尘；尘埃；粉末" },
  { term: "dusty", chineseGloss: "灰尘多的；无聊的；含糊的" },
  { term: "environmental", chineseGloss: "周围的；环境的；环保的" },
  { term: "farm", chineseGloss: "农场；农田；耕种" },
  { term: "field", chineseGloss: "领域；田地；场地" },
  { term: "garden", chineseGloss: "花园；果园；菜园" },
  { term: "hill", chineseGloss: "小山；丘陵；小土堆" },
  { term: "island", chineseGloss: "岛；岛屿；孤立地区" },
  { term: "moon", chineseGloss: "月亮；月球；月光" },
  { term: "nature", chineseGloss: "自然；大自然；本性" },
  { term: "ocean", chineseGloss: "海洋；广阔；许多" },
  { term: "recycled", chineseGloss: "回收利用( recycle的过去式和过去分词 )；再利用；再次应用" },
  { term: "season", chineseGloss: "季节；时节；当令期" },
  { term: "snow", chineseGloss: "雪；积雪；下雪" },
  { term: "star", chineseGloss: "星；恒星；星形物" },
  { term: "sun", chineseGloss: "太阳；日；日光" },
  { term: "thunder", chineseGloss: "雷；雷声；打雷" },
  { term: "windy", chineseGloss: "多风的；风强的；腹胀的" },
  { term: "air", chineseGloss: "空气；旋律；态度" },
  { term: "clean", chineseGloss: "干净的；清白的；简洁的" },
  { term: "cold", chineseGloss: "感冒；寒冷；寒冷的" },
  { term: "cool", chineseGloss: "凉爽；凉爽的空气；凉爽的" },
  { term: "dark", chineseGloss: "黑暗；夜；黄昏" },
  { term: "dirty", chineseGloss: "肮脏的；卑鄙的；弄脏" },
  { term: "dry", chineseGloss: "干的；无酒的；枯燥无味的" },
  { term: "fresh", chineseGloss: "新鲜的；新奇的；另外的" },
  { term: "green", chineseGloss: "绿色；绿色颜料；绿色的" },
  { term: "ground", chineseGloss: "土地；战场；场地" },
  { term: "hot", chineseGloss: "热的；热心的；辣的" },
  { term: "land", chineseGloss: "陆地；地面；地界" },
  { term: "light", chineseGloss: "光；光亮；灯" },
  { term: "outdoor", chineseGloss: "户外的；屋外的；露天的" },
  { term: "outside", chineseGloss: "外面；外表；外界" },
  { term: "rock", chineseGloss: "岩石；岩礁；石头" },
  { term: "space", chineseGloss: "位置；空间；距离" },
  { term: "storm", chineseGloss: "暴风雨；骚动；风波" },
  { term: "temperature", chineseGloss: "温度；发烧；热度" },
  { term: "warm", chineseGloss: "暖和的；暖的；温暖的" },
  { term: "wet", chineseGloss: "湿气；潮湿；水分" },
  { term: "wild", chineseGloss: "荒野；荒地；野性的" },
  { term: "wood", chineseGloss: "木材；木制品；植林于" },
  { term: "wooden", chineseGloss: "木制的；呆笨的；木然的" },
  { term: "world", chineseGloss: "世界；地球；宇宙" },
  { term: "bright", chineseGloss: "明亮的；聪明的；鲜明的" },
  { term: "clear", chineseGloss: "清楚的；明确的；澄清的" },
  { term: "deep", chineseGloss: "深的；深入地；深渊" },
  { term: "high", chineseGloss: "高度；高处；高的" },
  { term: "low", chineseGloss: "低点；低价；低" },
] as const;

const schoolStudyBatch = [
  "answer", "article", "bookcase", "bookshelf", "chapter", "college", "course",
  "dictionary", "education", "essay", "calendar", "exercise", "explain",
  "grammar", "learn", "mark", "maths / mathematics", "mistake", "note", "notebook",
  "paper", "pencil", "pencil case", "pupil", "read", "reading", "research", "revise",
  "science", "spelling", "study", "teach", "teaching", "test", "textbook", "university",
  "write", "write down", "calculator", "computer", "desk", "document", "file", "keyboard",
  "language", "message", "question", "record", "skill", "translate",
] as const;

const homeFamilyBatch = [
  "apartment", "apartment building", "bath", "bathroom", "bed", "bedroom", "blanket",
  "bottle", "bottle bank", "carpet", "chair", "changing room", "cottage", "cupboard",
  "cushion", "dining room", "door", "flat", "floor", "fork", "fridge", "furniture",
  "garage", "guest-house", "hall", "home", "house", "housework", "key", "kitchen",
  "lamp", "living room", "mirror", "property", "roof", "room", "shelf", "shower",
  "sitting room", "sofa", "table", "table-cloth", "toothpaste", "waiting room", "wall",
  "window", "brother", "dad", "mum", "sister",
] as const;

const familyPeopleFeelingsBatch = [
  "aunt", "daughter", "family", "father", "grandfather", "grandmother",
  "husband", "married", "mother", "son", "teenager", "uncle", "wife",
  "adult", "baby", "boy", "child", "crowd", "female", "friend", "girl",
  "group", "hero", "king", "Madam", "male", "man", "member", "Mr", "Mrs",
  "Ms", "people", "person", "queen", "role", "woman", "afraid", "angry",
  "ashamed", "awful", "bored", "boring", "bother", "comfortable", "confused",
  "danger", "excited", "exciting", "fear", "feel like",
] as const;

const feelingsReactionsBatch = [
  "fun", "funny", "glad", "happy", "hate", "hope", "hopeless", "horrible",
  "in love", "like", "lonely", "look like", "love", "mad", "mind", "mood",
  "nervous", "peace", "pleased", "prefer", "proud", "sad", "shocking", "stress",
  "surprise", "surprised", "tired", "trust", "uncomfortable", "unpleasant", "wish",
  "worried", "amazed", "amazing", "amusing", "annoyed", "anxious", "brave", "calm",
  "cheerful", "confident", "delighted", "depressed", "disappointed", "disappointing",
  "embarrassed", "embarrassing", "exhausted", "frightened", "frightening",
] as const;

const healthBodyBatch = [
  "accident", "ache", "arm", "blood", "body", "by accident", "by hand", "clinic",
  "ear", "emergency", "eye", "face", "face to face", "finger", "fit", "foot",
  "get fit", "hand", "hand-held", "hand in", "hand out", "head", "health", "healthy",
  "heart", "hospital", "hurt", "ill", "knee", "left-hand", "leg", "medicine", "mouth",
  "neck", "nose", "on foot", "pain", "pregnant", "rescue", "right-hand", "second-hand",
  "shoulder", "sick", "stomach ache", "tooth / teeth", "painful", "patient", "sore",
  "unfit", "unwell",
] as const;

const transportTravelBatch = [
  "aeroplane", "bicycle", "bike", "boat", "bus", "bus station", "bus stop", "car",
  "car park", "ferry", "flight", "gas station", "lorry", "motorbike", "motorcycle",
  "motorway", "petrol station", "plane", "platform", "police station", "public transport",
  "road", "ship", "subway", "taxi", "traffic", "traffic light", "train", "tram",
  "transport", "underground", "abroad", "camping", "guide", "holiday", "hostel", "hotel",
  "luggage", "map", "on holiday", "on vacation", "reservation", "reserve", "sightseeing",
  "suitcase", "tour guide", "tourist", "travel", "travel agent", "trip",
] as const;

const technologyCommunicationBatch = [
  "app", "application", "camera", "CD", "cell phone", "digital", "download", "DVD",
  "electronic", "internet", "laptop", "mobile", "online", "password", "PC", "phone",
  "screen", "software", "tablet", "technology", "upload", "video", "video clip",
  "video game", "website", "accent", "advert", "advertise", "advertisement", "advise",
  "announce", "announcement", "ask", "call", "confirm", "conversation", "describe",
  "description", "detail", "dial up", "discuss", "enquiry", "interview", "letter",
  "meaning", "mention", "pronounce", "pronunciation", "reply", "text message",
] as const;

const shoppingMoneyBatch = [
  "buy", "cash", "cash machine", "cheap", "cost", "customer", "department store",
  "expensive", "for sale", "grocery store", "in order", "in order to", "mall", "market",
  "on sale", "order", "out of order", "parcel", "pay", "price", "queue", "receipt", "sale",
  "sell", "shop", "shopping", "store", "supermarket", "account", "afford", "bank",
  "bank account", "bill", "borrow", "cent", "coin", "dollar", "euro", "lend", "money",
  "pocket money", "pound", "save", "value", "worth", "change", "credit card", "wallet",
  "discount", "cheque",
] as const;

const foodDiningBatch = [
  "bean", "bread", "burger", "cake", "cheese", "chicken", "coffee", "dinner", "drink",
  "egg", "fast food", "fish", "food", "French fries", "hungry", "ice cream", "jam", "juice",
  "lunch", "meal", "meat", "mineral water", "pizza", "potato", "rice", "salad", "salt",
  "soup", "sugar", "supper", "tea", "thirsty", "traffic jam", "water", "bowl", "cup",
  "dish", "glass", "knife", "menu", "plate", "spoon", "waiter", "waitress", "mug",
  "recipe", "cook", "cooker", "kettle", "pan",
] as const;

const entertainmentMediaBatch = [
  "art", "audience", "board game", "character", "chat show", "cinema", "club", "comic",
  "concert", "dance", "dancing", "detective", "drama", "draw", "drawing", "festival",
  "film", "film maker", "firework", "gallery", "game", "headline", "hobby", "imagination",
  "magazine", "movie", "movie theater", "museum", "music", "mystery", "newspaper", "novel",
  "paint", "painting", "party", "poem", "pop", "program", "radio", "series", "show",
  "show up", "song", "soundtrack", "stage", "story", "superhero", "talent", "talk show",
  "television",
] as const;

const workSocietyBatch = [
  "accountant", "actor", "actress", "artist", "booking office", "business", "businessman",
  "businesswoman", "career", "chef", "CV", "dentist", "designer", "doctor / Dr", "email",
  "factory", "farmer", "job", "journalist", "lawyer", "mechanic", "nurse", "on business",
  "out of work", "pilot", "police", "police officer", "post office", "profession",
  "professional", "secretary", "shop assistant", "staff", "work", "worker", "work out",
  "admission", "agency", "company", "culture", "custom", "customs", "government", "industry",
  "international", "law", "national", "policeman", "policewoman", "politician",
] as const;

describe("PET Learning App", () => {
  it("ships an official-scale cleaned PET vocabulary grouped by theme", () => {
    const vocabularyPath = path.resolve(process.cwd(), "src/lib/generated/pet-vocabulary.json");
    const words = JSON.parse(fs.readFileSync(vocabularyPath, "utf8")) as Array<{
      term: string;
      chineseGloss: string;
      theme: string;
      source: string;
    }>;
    const themes = new Set(words.map((word) => word.theme));

    expect(words.length).toBeGreaterThan(3000);
    expect(themes.size).toBeGreaterThan(20);
    expect(themes.has("general")).toBe(false);
    expect(themes.has("daily-life")).toBe(false);
    expect(words.every((word) => word.theme && word.term === word.term.trim())).toBe(true);
    expect(words.every((word) => /[\u4e00-\u9fff]/.test(word.chineseGloss))).toBe(true);
    expect(words.every((word) => !word.chineseGloss.includes("Cambridge B1/PET 官方词表"))).toBe(true);
    expect(words.every((word) => !word.chineseGloss.includes("中文释义待补充"))).toBe(true);
    expect(words.find((word) => word.term === "sunny")?.chineseGloss).toContain("晴朗");
    expect(words.some((word) => word.term === "of the school" || word.term === "of the school.")).toBe(false);
    expect(words.every((word) => word.source === "cambridge-b1-preliminary-vocabulary-list-2025")).toBe(true);
  });

  it("shows the learner what is due today and starts a daily session", () => {
    const household = createDemoHousehold();

    const home = getLearnerHome(household, new Date("2026-06-26T08:00:00+08:00"));

    expect(home.practiceStreakDays).toBe(4);
    expect(home.dailyNewWords).toHaveLength(5);
    expect(home.dailyWeakWords).toHaveLength(4);
    expect(home.dailyWeakWords.map((word) => word.term).slice(0, 2)).toEqual([
      "environment",
      "usually",
    ]);
    expect(home.canStartDailySession).toBe(true);

    const session = startDailySession(household, new Date("2026-06-26T08:05:00+08:00"));

    expect(session.status).toBe("in_progress");
    expect(session.steps.map((step) => step.kind)).toEqual([
      "new_word_practice",
      "weak_word_warmup",
      "speaking_part_1",
      "speaking_part_2",
      "vocabulary_review",
    ]);
    expect(session.steps[2]?.prompt.title).toContain("school");
  });

  it("lets guardians cap daily words and keeps yesterday's hardest mistakes first", () => {
    const household = updateDailyWeakWordLimit(createDemoHousehold(), 2);

    const home = getLearnerHome(household, new Date("2026-06-26T08:00:00+08:00"));

    expect(household.settings.dailyWeakWordLimit).toBe(2);
    expect(home.dailyWeakWords.map((word) => word.term)).toEqual([
      "environment",
      "usually",
    ]);
  });

  it("uses the selected nature theme for daily new words", () => {
    const household = {
      ...createDemoHousehold(),
      settings: {
        ...createDemoHousehold().settings,
        currentWordTheme: "nature",
      },
    };

    const home = getLearnerHome(household, new Date("2026-06-26T08:00:00+08:00"));
    const terms = home.dailyNewWords.map((word) => word.term);

    expect(home.dailyNewWords).toHaveLength(5);
    expect(home.dailyNewWords.every((word) => word.theme === "nature")).toBe(true);
    expect(terms).toEqual(
      expect.arrayContaining(["wildlife", "beach", "recycle", "mountain", "weather"]),
    );
    expect(terms).not.toContain("subject");
  });

  it("counts climate and climate change as one learning unit", () => {
    const household = {
      ...createDemoHousehold(),
      settings: {
        ...createDemoHousehold().settings,
        currentWordTheme: "nature",
        dailyNewWordCount: 5,
      },
      wordBank: [
        { term: "climate", chineseGloss: "气候", theme: "nature", source: "cambridge" },
        { term: "climate change", chineseGloss: "气候变化", theme: "nature", source: "cambridge" },
        { term: "weather", chineseGloss: "天气", theme: "nature", source: "cambridge" },
      ],
      seenWords: [],
      weakWords: [],
    };

    const home = getLearnerHome(household, new Date("2026-06-26T08:00:00+08:00"));
    const climateTerms = home.dailyNewWords.filter((word) =>
      ["climate", "climate change"].includes(word.term),
    );

    expect(climateTerms).toHaveLength(1);
    expect(home.dailyNewWords.map((word) => word.term)).toContain("weather");
  });

  it("limits retakes and turns a speaking attempt into actionable feedback", () => {
    const household = createDemoHousehold();
    const session = startDailySession(household, new Date("2026-06-26T08:05:00+08:00"));

    const result = submitSpeakingAttempt(session, {
      promptId: "part-1-school",
      transcript: "I like science because it is interesting but I usually say it slowly.",
      attemptNumber: 3,
    });

    expect(result.acceptedAttemptNumber).toBe(3);
    expect(result.canRetakeAgain).toBe(false);
    expect(result.feedback.chinese).toContain("回答完整");
    expect(result.feedback.exampleAnswer).toContain("I like science because");
    expect(result.feedback.pronunciation.targetAccent).toBe("British English");
    expect(result.feedback.pronunciation.wordsToShadow).toEqual(["usually"]);
    expect(result.weakWords.map((word) => word.term)).toEqual(["usually", "because"]);
  });

  it("moves weak words through simple review stages", () => {
    const household = createDemoHousehold();

    const updated = completeVocabularyReview(
      household,
      [
        { term: "because", correct: true },
        { term: "usually", correct: true },
        { term: "environment", correct: true },
      ],
      new Date("2026-06-26T08:20:00+08:00"),
    );

    expect(updated.weakWords.find((word) => word.term === "because")?.reviewStage).toBe(
      "tomorrow",
    );
    expect(updated.weakWords.find((word) => word.term === "usually")?.reviewStage).toBe(
      "threeDaysLater",
    );
    expect(updated.weakWords.find((word) => word.term === "environment")?.reviewStage).toBe(
      "mastered",
    );
  });

  it("shows guardian progress with only recent sessions and recordings", () => {
    const household = createDemoHousehold();
    const now = new Date("2026-06-26T20:00:00+08:00");

    const progress = getGuardianProgress(household, now);

    expect(progress.recentSessions.map((session) => session.completedOn)).toEqual([
      "2026-06-22",
      "2026-06-23",
      "2026-06-24",
      "2026-06-25",
    ]);
    expect(progress.recentRecordings.map((recording) => recording.promptTitle)).toEqual([
      "Talking about school",
    ]);
    expect(progress.masteredWords).toEqual(["library"]);

    const cleaned = purgeExpiredRecentRecordings(household, now);

    expect(cleaned.recentRecordings.map((recording) => recording.id)).toEqual([
      "recording-recent",
    ]);
  });

  it("lets the guardian add content that appears in learner practice", () => {
    const household = addGuardianPrompt(
      addGuardianTopicWord(createDemoHousehold(), {
        term: "assembly",
        chineseGloss: "集会",
        dueOn: "2026-06-26",
      }),
      {
        title: "After school",
        question: "What do you usually do after school?",
        part: "part_1",
      },
    );

    const home = getLearnerHome(household, new Date("2026-06-26T08:00:00+08:00"));

    expect(home.dailyNewWords.map((word) => word.term)).toContain("assembly");
    expect(household.presetPrompts.at(-1)?.title).toBe("After school");
  });

  it("completes a daily session by keeping progress, feedback words, and recent recordings", () => {
    const household = createDemoHousehold();
    const session = startDailySession(household, new Date("2026-06-26T08:05:00+08:00"));
    const feedback = submitSpeakingAttempt(session, {
      promptId: "part-1-school",
      transcript: "I usually read because the environment is quiet.",
      attemptNumber: 1,
    });

    const withRecording = addRecentRecording(
      household,
      {
        promptTitle: "Talking about school",
        audioUrl: "blob:recent-recording",
      },
      new Date("2026-06-26T08:12:00+08:00"),
    );
    const completed = completeDailySession(
      withRecording,
      session,
      {
        durationMinutes: 13,
        feedback,
      },
      new Date("2026-06-26T08:25:00+08:00"),
    );

    expect(completed.dailySessions.at(-1)).toMatchObject({
      id: "session-2026-06-26",
      completedOn: "2026-06-26",
      durationMinutes: 13,
    });
    expect(completed.weakWords.map((word) => word.term)).toEqual(
      expect.arrayContaining(["usually", "because", "environment"]),
    );
    expect(completed.recentRecordings.map((recording) => recording.audioUrl)).toContain(
      "blob:recent-recording",
    );
    expect(getLearnerHome(completed, new Date("2026-06-26T08:30:00+08:00")).practiceStreakDays).toBe(5);
  });

  it("turns unclear word shadowing into a pronunciation weak word", () => {
    const household = createDemoHousehold();
    const feedback = assessWordShadowing({
      word: "subject",
      chineseGloss: "科目",
      spokenText: "",
    });

    const updated = recordWordShadowingFeedback(
      household,
      {
        word: "subject",
        chineseGloss: "科目",
        feedback,
      },
      new Date("2026-06-26T08:12:00+08:00"),
    );

    expect(updated.weakWords.find((word) => word.term === "subject")).toMatchObject({
      chineseGloss: "科目",
      reason: "pronunciation",
      mastered: false,
    });
  });

  it("continues speaking part 1 with examiner follow-up questions", () => {
    const household = createDemoHousehold();
    const session = startDailySession(household, new Date("2026-06-26T08:05:00+08:00"));

    const firstTurn = continuePart1Conversation(session, {
      promptId: "part-1-school",
      learnerAnswer: "Science.",
      previousTurns: [],
    });

    expect(firstTurn.examinerFollowUp).toBe("Can you tell me more about that?");
    expect(firstTurn.turnFeedback.chinese).toContain("太短");
    expect(firstTurn.conversationComplete).toBe(false);

    const secondTurn = continuePart1Conversation(session, {
      promptId: "part-1-school",
      learnerAnswer: "I like science because experiments are exciting.",
      previousTurns: [firstTurn.turn],
    });

    expect(secondTurn.examinerFollowUp).toContain("How often");
    expect(secondTurn.turnFeedback.chinese).toContain("原因");
  });

  it("gives word-level shadowing feedback for weak words", () => {
    const clear = assessWordShadowing({
      word: "usually",
      chineseGloss: "通常",
      spokenText: "usually",
    });
    const unclear = assessWordShadowing({
      word: "environment",
      chineseGloss: "环境",
      spokenText: "enviroment",
    });
    const missed = assessWordShadowing({
      word: "because",
      chineseGloss: "因为",
      spokenText: "",
    });

    expect(clear.status).toBe("strong");
    expect(clear.score).toBeGreaterThanOrEqual(85);
    expect(clear.example.sentence).toContain("usually");
    expect(clear.details.pronunciation.score).toBeGreaterThanOrEqual(85);
    expect(clear.source).toBe("transcript_match");
    expect(unclear.status).toBe("okay");
    expect(unclear.score).toBeGreaterThanOrEqual(65);
    expect(unclear.transcript).toBe("enviroment");
    expect(missed.status).toBe("needs_practice");
    expect(missed.feedback).toContain("没有稳定识别");
    expect(missed.details.clarity.feedback).toContain("麦克风");
  });

  it("uses audio AI pronunciation assessment when available", () => {
    const result = assessWordShadowing({
      word: "teacher",
      chineseGloss: "老师",
      spokenText: "teacher",
      assessment: {
        overallScore: 82,
        pronunciation: { score: 78, feedback: "t 音清楚，结尾可以再轻一点。" },
        stress: { score: 85, feedback: "重音位置自然。" },
        clarity: { score: 88, feedback: "声音清楚，速度合适。" },
        feedback: "整体能听清 teacher，再注意结尾不要拖长。",
      },
    });

    expect(result.score).toBe(82);
    expect(result.source).toBe("audio_ai");
    expect(result.details.pronunciation.score).toBe(78);
    expect(result.details.stress.feedback).toContain("重音");
    expect(result.feedback).toContain("teacher");
  });

  it("shows spoken examples with the word and Chinese meaning", () => {
    const example = getWordExample({ term: "background", chineseGloss: "背景" });
    const examExample = getWordExample({
      term: "examination / exam",
      chineseGloss: "考试",
    });
    const schoolExample = getWordExample({
      term: "of the school.",
      chineseGloss: "Cambridge B1/PET 官方词表",
    });
    const weatherExample = getWordExample({ term: "weather", chineseGloss: "天气" });
    const sunnyExample = getWordExample({
      term: "sunny",
      chineseGloss: "晴朗的",
    });
    const treeExample = getWordExample({ term: "tree", chineseGloss: "树" });
    const wasteExample = getWordExample({ term: "waste", chineseGloss: "废物；浪费" });
    const weatherForecastExample = getWordExample({
      term: "weather forecast",
      chineseGloss: "天气预报",
    });
    const naturalExample = getWordExample({ term: "natural", chineseGloss: "自然的；天然的" });
    const climateExample = getWordExample({ term: "climate", chineseGloss: "气候" });
    const climateChangeExample = getWordExample({ term: "climate change", chineseGloss: "气候变化" });
    const fallback = getWordExample({ term: "project", chineseGloss: "项目" });

    expect(example.focusWord).toBe("background");
    expect(example.sentence).toContain("background");
    expect(example.chinese).toContain("背景");
    expect(examExample.focusWord).toBe("exam");
    expect(examExample.sentence).toContain("English exam");
    expect(schoolExample.focusWord).toBe("school");
    expect(schoolExample.sentence).toContain("school");
    expect(weatherExample.sentence).toContain("weather");
    expect(weatherExample.sentence).not.toContain("bag");
    expect(sunnyExample.sentence).toContain("sunny");
    expect(sunnyExample.chinese).toContain("晴朗");
    expect(sunnyExample.chinese).not.toContain("中文释义待补充");
    expect(sunnyExample.chinese).not.toContain("书包");
    expect(treeExample.sentence).toBe("There is a tall tree outside my bedroom window.");
    expect(treeExample.sentence).not.toContain("The word");
    expect(wasteExample.sentence).toBe("Please put the waste in the bin before we leave.");
    expect(wasteExample.sentence).not.toContain("reading homework");
    expect(weatherForecastExample.sentence).toBe("The weather forecast said it would rain later.");
    expect(weatherForecastExample.sentence).not.toContain("during our walk in the park");
    expect(naturalExample.sentence).toBe("The juice tasted natural, not too sweet.");
    expect(naturalExample.sentence).not.toContain("the natural");
    expect(climateExample.sentence).toBe("The climate here is warm and wet for most of the year.");
    expect(climateChangeExample.sentence).toBe("Climate change is making some summers hotter.");
    expect(fallback.sentence).not.toContain("I heard the word");
    expect(fallback.sentence).not.toContain("The word");
    expect(fallback.sentence).not.toContain("reading homework");
    expect(fallback.sentence).not.toContain("Let's talk about");
    expect(fallback.sentence).not.toContain("in my bag");
    expect(fallback.chinese).not.toContain("书包");
    expect(fallback.sentence).toContain("project");
    expect(fallback.chinese).toContain("项目");
  });

  it("adds the first reviewed nature and weather example batch", () => {
    const examples = firstNatureWeatherBatch.map((word) => ({
      word,
      example: getWordExample(word),
    }));
    const forbiddenPhrases = [
      "I heard the word",
      "I learned the word",
      "The word",
      "reading homework",
      "Let's talk about",
      "in my bag",
      "the cloudy",
    ];

    expect(firstNatureWeatherBatch).toHaveLength(50);
    expect(Object.keys(getReviewedWordExamples()).length).toBeGreaterThanOrEqual(135);
    expect(examples.map(({ example }) => example.sentence).filter(Boolean)).toHaveLength(50);

    for (const { word, example } of examples) {
      expect(example.focusWord.toLowerCase()).toContain(word.term.split(" ")[0]);
      expect(example.chinese).toContain(word.term);
      expect(example.chinese).toContain("；");
      for (const phrase of forbiddenPhrases) {
        expect(example.sentence).not.toContain(phrase);
      }
    }
  });

  it("uses reviewed learner-facing examples for cloudy and nearby weather words", () => {
    expect(getWordExample({ term: "cloudy", chineseGloss: "多云的；有愁容的；云的" })).toMatchObject({
      focusWord: "cloudy",
      sentence: "It was cloudy, but it did not rain.",
      chinese: "cloudy = 多云的；天气多云，但没有下雨。",
    });
    expect(getWordExample({ term: "windy", chineseGloss: "多风的；风强的；腹胀的" })).toMatchObject({
      sentence: "It was windy, and my hair blew everywhere.",
      chinese: "windy = 多风的；风很大，我的头发被吹得到处乱飞。",
    });
    expect(getWordExample({ term: "storm", chineseGloss: "暴风雨；骚动；风波" })).toMatchObject({
      sentence: "The storm damaged two trees near our school.",
      chinese: "storm = 暴风雨；暴风雨损坏了我们学校附近的两棵树。",
    });
  });

  it("adds the reviewed school and study example batch", () => {
    const examples = schoolStudyBatch.map((term) => getWordExample({ term, chineseGloss: "" }));
    const forbiddenPhrases = ["I heard the word", "I learned the word", "The word", "reading homework"];

    expect(schoolStudyBatch).toHaveLength(50);
    expect(Object.keys(getReviewedWordExamples()).length).toBeGreaterThanOrEqual(185);
    expect(examples.map((example) => example.sentence).filter(Boolean)).toHaveLength(50);

    for (const [index, example] of examples.entries()) {
      const aliases = schoolStudyBatch[index]
        .split("/")
        .map((alias) => alias.trim().split(" ")[0].toLowerCase());
      expect(aliases.some((alias) => example.focusWord.toLowerCase().includes(alias))).toBe(true);
      expect(example.chinese).toContain("；");
      for (const phrase of forbiddenPhrases) expect(example.sentence).not.toContain(phrase);
    }
  });

  it("uses school and study senses for ambiguous reviewed terms", () => {
    expect(getWordExample({ term: "course", chineseGloss: "课程；路线；过程" })).toMatchObject({
      focusWord: "course",
      sentence: "This course teaches us how to write short essays.",
      chinese: "course = 课程；这门课程教我们怎样写短文。",
    });
    expect(getWordExample({ term: "mark", chineseGloss: "标志；分数；马克" })).toMatchObject({
      focusWord: "mark",
      sentence: "I got a high mark in my science test.",
      chinese: "mark = 分数；我的科学测试得了高分。",
    });
    expect(getWordExample({ term: "translate", chineseGloss: "翻译；解释；转化" })).toMatchObject({
      focusWord: "translate",
      sentence: "Can you translate this sentence into Chinese?",
      chinese: "translate = 翻译；你能把这个句子翻译成中文吗？",
    });
  });

  it("keeps the school study candidate ledger aligned with reviewed examples", () => {
    const candidatePath = path.resolve(
      process.cwd(),
      "data/example-candidates/school-study-001.json",
    );
    const candidate = JSON.parse(fs.readFileSync(candidatePath, "utf8")) as {
      entries: Array<{
        term: string;
        focusWord: string;
        sentence: string;
        chinese: string;
      }>;
    };

    expect(candidate.entries).toHaveLength(50);
    for (const entry of candidate.entries) {
      expect(getWordExample({ term: entry.term, chineseGloss: "" })).toMatchObject({
        focusWord: entry.focusWord,
        sentence: entry.sentence,
        chinese: entry.chinese,
      });
    }
  });

  it("adds the reviewed home and family example batch", () => {
    const examples = homeFamilyBatch.map((term) => getWordExample({ term, chineseGloss: "" }));

    expect(homeFamilyBatch).toHaveLength(50);
    expect(Object.keys(getReviewedWordExamples()).length).toBeGreaterThanOrEqual(235);
    expect(examples.map((example) => example.sentence).filter(Boolean)).toHaveLength(50);
  });

  it("keeps the home family candidate ledger aligned with reviewed examples", () => {
    const candidatePath = path.resolve(
      process.cwd(),
      "data/example-candidates/home-family-001.json",
    );
    expect(fs.existsSync(candidatePath)).toBe(true);
    if (!fs.existsSync(candidatePath)) return;

    const candidate = JSON.parse(
      fs.readFileSync(candidatePath, "utf8"),
    ) as {
      entries: Array<{ term: string; focusWord: string; sentence: string; chinese: string }>;
    };

    expect(candidate.entries).toHaveLength(50);
    for (const entry of candidate.entries) {
      expect(getWordExample({ term: entry.term, chineseGloss: "" })).toMatchObject({
        focusWord: entry.focusWord,
        sentence: entry.sentence,
        chinese: entry.chinese,
      });
    }
  });

  it("uses home and family senses for ambiguous reviewed terms", () => {
    expect(getWordExample({ term: "flat", chineseGloss: "平坦的；单调的；无力的" })).toMatchObject({
      sentence: "Her flat is on the third floor.",
      chinese: "flat = 公寓；她的公寓在三楼。",
    });
    expect(getWordExample({ term: "property", chineseGloss: "财产；所有权；性质" })).toMatchObject({
      sentence: "Their house is their most valuable property.",
      chinese: "property = 财产；他们的房子是最有价值的财产。",
    });
    expect(getWordExample({ term: "mum", chineseGloss: "菊花；沉默；沉默的" })).toMatchObject({
      sentence: "My mum reads with me before bed.",
      chinese: "mum = 妈妈；我妈妈睡前和我一起阅读。",
    });
  });

  it("adds the reviewed family people feelings example batch", () => {
    const examples = familyPeopleFeelingsBatch.map((term) =>
      getWordExample({ term, chineseGloss: "" }),
    );

    expect(familyPeopleFeelingsBatch).toHaveLength(50);
    expect(Object.keys(getReviewedWordExamples()).length).toBeGreaterThanOrEqual(285);
    expect(examples.map((example) => example.sentence).filter(Boolean)).toHaveLength(50);
  });

  it("keeps the family people feelings ledger aligned with reviewed examples", () => {
    const candidatePath = path.resolve(
      process.cwd(),
      "data/example-candidates/family-people-feelings-001.json",
    );
    expect(fs.existsSync(candidatePath)).toBe(true);
    if (!fs.existsSync(candidatePath)) return;

    const candidate = JSON.parse(fs.readFileSync(candidatePath, "utf8")) as {
      entries: Array<{ term: string; focusWord: string; sentence: string; chinese: string }>;
    };
    expect(candidate.entries).toHaveLength(50);
    for (const entry of candidate.entries) {
      expect(getWordExample({ term: entry.term, chineseGloss: "" })).toMatchObject({
        focusWord: entry.focusWord,
        sentence: entry.sentence,
        chinese: entry.chinese,
      });
    }
  });

  it("uses intended senses for family people feelings terms", () => {
    expect(getWordExample({ term: "man", chineseGloss: "一把；少量" })).toMatchObject({
      sentence: "A man helped us carry the heavy box.",
      chinese: "man = 男人；一名男子帮我们搬了那个重箱子。",
    });
    expect(getWordExample({ term: "Madam", chineseGloss: "女士；夫人" })).toMatchObject({
      sentence: "Excuse me, Madam, is this seat yours?",
      chinese: "Madam = 女士；对不起，女士，这个座位是您的吗？",
    });
    expect(getWordExample({ term: "feel like", chineseGloss: "想要" })).toMatchObject({
      sentence: "I feel like having some hot soup.",
      chinese: "feel like = 想要；我想喝一些热汤。",
    });
  });

  it("adds the reviewed feelings reactions example batch", () => {
    const examples = feelingsReactionsBatch.map((term) =>
      getWordExample({ term, chineseGloss: "" }),
    );

    expect(feelingsReactionsBatch).toHaveLength(50);
    expect(Object.keys(getReviewedWordExamples()).length).toBeGreaterThanOrEqual(335);
    expect(examples.map((example) => example.sentence).filter(Boolean)).toHaveLength(50);
  });

  it("keeps the feelings reactions ledger aligned with reviewed examples", () => {
    const candidatePath = path.resolve(
      process.cwd(),
      "data/example-candidates/feelings-reactions-001.json",
    );
    expect(fs.existsSync(candidatePath)).toBe(true);
    if (!fs.existsSync(candidatePath)) return;

    const candidate = JSON.parse(fs.readFileSync(candidatePath, "utf8")) as {
      entries: Array<{ term: string; focusWord: string; sentence: string; chinese: string }>;
    };
    expect(candidate.entries).toHaveLength(50);
    for (const entry of candidate.entries) {
      expect(getWordExample({ term: entry.term, chineseGloss: "" })).toMatchObject({
        focusWord: entry.focusWord,
        sentence: entry.sentence,
        chinese: entry.chinese,
      });
    }
  });

  it("uses intended senses for feelings reactions terms", () => {
    expect(getWordExample({ term: "like", chineseGloss: "相似的；同样的；喜欢" })).toMatchObject({
      sentence: "I like listening to music while I cook.",
      chinese: "like = 喜欢；我喜欢做饭时听音乐。",
    });
    expect(getWordExample({ term: "look like", chineseGloss: "看起来相像" })).toMatchObject({
      sentence: "You look like your mother when you smile.",
      chinese: "look like = 看起来像；你微笑时看起来很像你妈妈。",
    });
    expect(getWordExample({ term: "mind", chineseGloss: "思想；愿望；智力" })).toMatchObject({
      sentence: "I changed my mind and chose the red jacket.",
      chinese: "mind = 想法；我改变了主意，选择了红色夹克。",
    });
    expect(getWordExample({ term: "mad", chineseGloss: "疯狂的；生气的" })).toMatchObject({
      sentence: "Mum was mad at me for losing the house key.",
      chinese: "mad = 生气的；我弄丢家门钥匙，妈妈很生我的气。",
    });
    expect(getWordExample({ term: "wish", chineseGloss: "希望；愿望；祝愿" })).toMatchObject({
      sentence: "I wish I could stay on holiday for another week.",
      chinese: "wish = 希望；我希望能再度假一个星期。",
    });
  });

  it("adds the reviewed health body batch and covers every health row", () => {
    const vocabularyPath = path.resolve(
      process.cwd(),
      "src/lib/generated/pet-vocabulary.json",
    );
    const words = JSON.parse(fs.readFileSync(vocabularyPath, "utf8")) as Array<{
      term: string;
      chineseGloss: string;
      theme: string;
    }>;
    const healthWords = words.filter((word) => word.theme === "health");
    const selectedExamples = healthBodyBatch.map((term) =>
      getWordExample({ term, chineseGloss: "" }),
    );
    const healthExamples = healthWords.map((word) => getWordExample(word));

    expect(healthBodyBatch).toHaveLength(50);
    expect(healthWords).toHaveLength(46);
    expect(Object.keys(getReviewedWordExamples()).length).toBeGreaterThanOrEqual(385);
    expect(selectedExamples.map((example) => example.sentence).filter(Boolean)).toHaveLength(50);
    expect(healthExamples.map((example) => example.sentence).filter(Boolean)).toHaveLength(46);
  });

  it("keeps the health body ledger aligned with reviewed examples", () => {
    const candidatePath = path.resolve(
      process.cwd(),
      "data/example-candidates/health-body-001.json",
    );
    expect(fs.existsSync(candidatePath)).toBe(true);
    if (!fs.existsSync(candidatePath)) return;

    const candidate = JSON.parse(fs.readFileSync(candidatePath, "utf8")) as {
      entries: Array<{ term: string; focusWord: string; sentence: string; chinese: string }>;
    };
    expect(candidate.entries).toHaveLength(50);
    for (const entry of candidate.entries) {
      expect(getWordExample({ term: entry.term, chineseGloss: "" })).toMatchObject({
        focusWord: entry.focusWord,
        sentence: entry.sentence,
        chinese: entry.chinese,
      });
    }
  });

  it("uses intended senses and normalized aliases for health body terms", () => {
    const faceToFaceExample = {
      focusWord: "face to face",
      sentence: "We discussed the problem face to face.",
      chinese: "face to face = 面对面；我们面对面讨论了这个问题。",
    };
    expect(getWordExample({ term: "face to face", chineseGloss: "面对面" })).toMatchObject(
      faceToFaceExample,
    );
    expect(getWordExample({ term: "face-to-face", chineseGloss: "面对面" })).toMatchObject(
      faceToFaceExample,
    );
    expect(getWordExample({ term: "fit", chineseGloss: "适宜；合身；发作" })).toMatchObject({
      sentence: "These shoes fit me perfectly.",
      chinese: "fit = 合身；这双鞋我穿着正合适。",
    });
    expect(getWordExample({ term: "hand in", chineseGloss: "交上；缴纳" })).toMatchObject({
      sentence: "Please hand in the medical form before Friday.",
      chinese: "hand in = 交上；请在星期五前交上医疗表格。",
    });
    expect(getWordExample({ term: "hand out", chineseGloss: "分发" })).toMatchObject({
      sentence: "The nurse handed out masks at the entrance.",
      chinese: "hand out = 分发；护士在入口处分发口罩。",
    });
    expect(getWordExample({ term: "patient", chineseGloss: "病人；忍耐的" })).toMatchObject({
      sentence: "The patient waited quietly to see the doctor.",
      chinese: "patient = 病人；病人安静地等着看医生。",
    });
    expect(getWordExample({ term: "tooth / teeth", chineseGloss: "牙齿" })).toMatchObject({
      focusWord: "tooth",
      sentence: "I need to see a dentist because my tooth hurts.",
      chinese: "tooth = 牙齿；我的牙疼，需要去看牙医。",
    });
  });

  it("adds the reviewed transport travel batch and covers every transport row", () => {
    const vocabularyPath = path.resolve(
      process.cwd(),
      "src/lib/generated/pet-vocabulary.json",
    );
    const words = JSON.parse(fs.readFileSync(vocabularyPath, "utf8")) as Array<{
      term: string;
      chineseGloss: string;
      theme: string;
    }>;
    const transportWords = words.filter((word) => word.theme === "transport");
    const selectedExamples = transportTravelBatch.map((term) =>
      getWordExample({ term, chineseGloss: "" }),
    );
    const transportExamples = transportWords.map((word) => getWordExample(word));

    expect(transportTravelBatch).toHaveLength(50);
    expect(transportWords).toHaveLength(33);
    expect(Object.keys(getReviewedWordExamples()).length).toBeGreaterThanOrEqual(435);
    expect(selectedExamples.map((example) => example.sentence).filter(Boolean)).toHaveLength(50);
    expect(transportExamples.map((example) => example.sentence).filter(Boolean)).toHaveLength(33);
  });

  it("keeps the transport travel ledger aligned with reviewed examples", () => {
    const candidatePath = path.resolve(
      process.cwd(),
      "data/example-candidates/transport-travel-001.json",
    );
    expect(fs.existsSync(candidatePath)).toBe(true);
    if (!fs.existsSync(candidatePath)) return;

    const candidate = JSON.parse(fs.readFileSync(candidatePath, "utf8")) as {
      entries: Array<{ term: string; focusWord: string; sentence: string; chinese: string }>;
    };
    expect(candidate.entries).toHaveLength(50);
    for (const entry of candidate.entries) {
      expect(getWordExample({ term: entry.term, chineseGloss: "" })).toMatchObject({
        focusWord: entry.focusWord,
        sentence: entry.sentence,
        chinese: entry.chinese,
      });
    }
  });

  it("uses intended transport travel senses for ambiguous terms", () => {
    expect(getWordExample({ term: "flight", chineseGloss: "飞行；射程；逃走" })).toMatchObject({
      sentence: "Our flight to Madrid leaves at six.",
      chinese: "flight = 航班；我们飞往马德里的航班六点起飞。",
    });
    expect(getWordExample({ term: "plane", chineseGloss: "平面；扁平物；机翼" })).toMatchObject({
      sentence: "We could see the mountains from the plane.",
      chinese: "plane = 飞机；我们从飞机上能看到群山。",
    });
    expect(getWordExample({ term: "platform", chineseGloss: "站台；讲台" })).toMatchObject({
      sentence: "The train to Oxford leaves from platform four.",
      chinese: "platform = 站台；开往牛津的火车从四号站台出发。",
    });
    expect(getWordExample({ term: "transport", chineseGloss: "运输；激动" })).toMatchObject({
      sentence: "The city needs better transport for its growing population.",
      chinese: "transport = 交通运输；这座城市需要为不断增长的人口提供更好的交通服务。",
    });
    expect(getWordExample({ term: "reserve", chineseGloss: "储备品；后备军" })).toMatchObject({
      sentence: "You should reserve your train seat in advance.",
      chinese: "reserve = 预订；你应该提前预订火车座位。",
    });
    expect(getWordExample({ term: "trip", chineseGloss: "旅行；绊倒；摔倒" })).toMatchObject({
      sentence: "Our school trip to the science museum was excellent.",
      chinese: "trip = 旅行；学校组织的科学博物馆之行很棒。",
    });
  });

  it("adds the reviewed technology communication batch and covers every technology row", () => {
    const vocabularyPath = path.resolve(
      process.cwd(),
      "src/lib/generated/pet-vocabulary.json",
    );
    const words = JSON.parse(fs.readFileSync(vocabularyPath, "utf8")) as Array<{
      term: string;
      chineseGloss: string;
      theme: string;
    }>;
    const technologyWords = words.filter((word) => word.theme === "technology");
    const selectedExamples = technologyCommunicationBatch.map((term) =>
      getWordExample({ term, chineseGloss: "" }),
    );
    const technologyExamples = technologyWords.map((word) => getWordExample(word));

    expect(technologyCommunicationBatch).toHaveLength(50);
    expect(technologyWords).toHaveLength(28);
    expect(Object.keys(getReviewedWordExamples()).length).toBeGreaterThanOrEqual(485);
    expect(selectedExamples.map((example) => example.sentence).filter(Boolean)).toHaveLength(50);
    expect(technologyExamples.map((example) => example.sentence).filter(Boolean)).toHaveLength(28);
  });

  it("keeps the technology communication ledger aligned with reviewed examples", () => {
    const candidatePath = path.resolve(
      process.cwd(),
      "data/example-candidates/technology-communication-001.json",
    );
    expect(fs.existsSync(candidatePath)).toBe(true);
    if (!fs.existsSync(candidatePath)) return;

    const candidate = JSON.parse(fs.readFileSync(candidatePath, "utf8")) as {
      entries: Array<{ term: string; focusWord: string; sentence: string; chinese: string }>;
    };
    expect(candidate.entries).toHaveLength(50);
    for (const entry of candidate.entries) {
      expect(getWordExample({ term: entry.term, chineseGloss: "" })).toMatchObject({
        focusWord: entry.focusWord,
        sentence: entry.sentence,
        chinese: entry.chinese,
      });
    }
  });

  it("uses intended technology communication senses for ambiguous terms", () => {
    expect(getWordExample({ term: "application", chineseGloss: "应用；申请" })).toMatchObject({
      sentence: "This application helps students practise new vocabulary.",
      chinese: "application = 应用程序；这个应用程序帮助学生练习新词汇。",
    });
    expect(getWordExample({ term: "mobile", chineseGloss: "移动的；易变的" })).toMatchObject({
      sentence: "You can use the mobile version of the website.",
      chinese: "mobile = 移动版的；你可以使用这个网站的移动版本。",
    });
    expect(getWordExample({ term: "screen", chineseGloss: "幕；屏风" })).toMatchObject({
      sentence: "The words on the screen are too small to read.",
      chinese: "screen = 屏幕；屏幕上的字太小，看不清。",
    });
    expect(getWordExample({ term: "advert", chineseGloss: "引起注意；留意" })).toMatchObject({
      sentence: "I saw an advert for the new sports centre.",
      chinese: "advert = 广告；我看到了一则新体育中心的广告。",
    });
    expect(getWordExample({ term: "call", chineseGloss: "呼叫；访问；打电话" })).toMatchObject({
      sentence: "Please call me when your train arrives.",
      chinese: "call = 打电话；火车到站时请给我打电话。",
    });
    expect(getWordExample({ term: "text message", chineseGloss: "正文消息" })).toMatchObject({
      sentence: "I sent Dad a text message when I arrived.",
      chinese: "text message = 短信；我到达时给爸爸发了一条短信。",
    });
  });

  it("adds the reviewed shopping money batch and covers both complete themes", () => {
    const vocabularyPath = path.resolve(
      process.cwd(),
      "src/lib/generated/pet-vocabulary.json",
    );
    const words = JSON.parse(fs.readFileSync(vocabularyPath, "utf8")) as Array<{
      term: string;
      chineseGloss: string;
      theme: string;
    }>;
    const shoppingWords = words.filter((word) => word.theme === "shopping");
    const moneyWords = words.filter((word) => word.theme === "money");
    const selectedExamples = shoppingMoneyBatch.map((term) =>
      getWordExample({ term, chineseGloss: "" }),
    );
    const themeExamples = [...shoppingWords, ...moneyWords].map((word) =>
      getWordExample(word),
    );

    expect(shoppingMoneyBatch).toHaveLength(50);
    expect(shoppingWords).toHaveLength(28);
    expect(moneyWords).toHaveLength(17);
    expect(Object.keys(getReviewedWordExamples()).length).toBeGreaterThanOrEqual(535);
    expect(selectedExamples.map((example) => example.sentence).filter(Boolean)).toHaveLength(50);
    expect(themeExamples.map((example) => example.sentence).filter(Boolean)).toHaveLength(45);
  });

  it("keeps the shopping money ledger aligned with reviewed examples", () => {
    const candidatePath = path.resolve(
      process.cwd(),
      "data/example-candidates/shopping-money-001.json",
    );
    expect(fs.existsSync(candidatePath)).toBe(true);
    if (!fs.existsSync(candidatePath)) return;

    const candidate = JSON.parse(fs.readFileSync(candidatePath, "utf8")) as {
      entries: Array<{ term: string; focusWord: string; sentence: string; chinese: string }>;
    };
    expect(candidate.entries).toHaveLength(50);
    for (const entry of candidate.entries) {
      expect(getWordExample({ term: entry.term, chineseGloss: "" })).toMatchObject({
        focusWord: entry.focusWord,
        sentence: entry.sentence,
        chinese: entry.chinese,
      });
    }
  });

  it("uses intended shopping money senses for ambiguous terms", () => {
    expect(getWordExample({ term: "mall", chineseGloss: "林荫路" })).toMatchObject({
      sentence: "We met near the entrance to the shopping mall.",
      chinese: "mall = 购物中心；我们在购物中心入口附近见面。",
    });
    expect(getWordExample({ term: "order", chineseGloss: "次序；命令" })).toMatchObject({
      sentence: "I ordered a birthday cake from the bakery.",
      chinese: "order = 订购；我从面包店订购了一个生日蛋糕。",
    });
    expect(getWordExample({ term: "account", chineseGloss: "报告；解释" })).toMatchObject({
      sentence: "I checked the balance in my account before paying the bill.",
      chinese: "account = 账户；付账前我查看了账户余额。",
    });
    expect(getWordExample({ term: "save", chineseGloss: "救球；解救" })).toMatchObject({
      sentence: "I am saving for a new phone.",
      chinese: "save = 存钱；我正在存钱买一部新手机。",
    });
    expect(getWordExample({ term: "pound", chineseGloss: "磅；英镑；重击" })).toMatchObject({
      sentence: "The book only cost one pound.",
      chinese: "pound = 英镑；这本书只花了一英镑。",
    });
    expect(getWordExample({ term: "change", chineseGloss: "变化；找头" })).toMatchObject({
      sentence: "The cashier gave me the wrong change.",
      chinese: "change = 找回的零钱；收银员找错了零钱给我。",
    });
  });

  it("adds the reviewed food dining batch and covers every food row", () => {
    const vocabularyPath = path.resolve(
      process.cwd(),
      "src/lib/generated/pet-vocabulary.json",
    );
    const words = JSON.parse(fs.readFileSync(vocabularyPath, "utf8")) as Array<{
      term: string;
      chineseGloss: string;
      theme: string;
    }>;
    const foodWords = words.filter((word) => word.theme === "food");
    const selectedExamples = foodDiningBatch.map((term) =>
      getWordExample({ term, chineseGloss: "" }),
    );
    const foodExamples = foodWords.map((word) => getWordExample(word));

    expect(foodDiningBatch).toHaveLength(50);
    expect(foodWords).toHaveLength(39);
    expect(Object.keys(getReviewedWordExamples()).length).toBeGreaterThanOrEqual(585);
    expect(selectedExamples.map((example) => example.sentence).filter(Boolean)).toHaveLength(50);
    expect(foodExamples.map((example) => example.sentence).filter(Boolean)).toHaveLength(39);
  });

  it("keeps the food dining ledger aligned with reviewed examples", () => {
    const candidatePath = path.resolve(
      process.cwd(),
      "data/example-candidates/food-dining-001.json",
    );
    expect(fs.existsSync(candidatePath)).toBe(true);
    if (!fs.existsSync(candidatePath)) return;

    const candidate = JSON.parse(fs.readFileSync(candidatePath, "utf8")) as {
      entries: Array<{ term: string; focusWord: string; sentence: string; chinese: string }>;
    };
    expect(candidate.entries).toHaveLength(50);
    for (const entry of candidate.entries) {
      expect(getWordExample({ term: entry.term, chineseGloss: "" })).toMatchObject({
        focusWord: entry.focusWord,
        sentence: entry.sentence,
        chinese: entry.chinese,
      });
    }
  });

  it("uses intended food dining senses for ambiguous terms", () => {
    expect(getWordExample({ term: "drink", chineseGloss: "饮料；喝" })).toMatchObject({
      sentence: "Would you like a cold drink with your meal?",
      chinese: "drink = 饮料；你用餐时想喝杯冷饮吗？",
    });
    expect(getWordExample({ term: "meal", chineseGloss: "一餐；粗粉" })).toMatchObject({
      sentence: "Breakfast is the most important meal of my day.",
      chinese: "meal = 一餐；早餐是我一天中最重要的一餐。",
    });
    expect(getWordExample({ term: "traffic jam", chineseGloss: "交通阻塞" })).toMatchObject({
      sentence: "We missed lunch because of a long traffic jam.",
      chinese: "traffic jam = 交通堵塞；我们因为长时间堵车错过了午餐。",
    });
    expect(getWordExample({ term: "dish", chineseGloss: "盘子；菜肴" })).toMatchObject({
      sentence: "This vegetable dish is easy to prepare.",
      chinese: "dish = 菜肴；这道蔬菜菜品很容易做。",
    });
    expect(getWordExample({ term: "glass", chineseGloss: "玻璃；玻璃杯" })).toMatchObject({
      sentence: "He poured me a glass of water.",
      chinese: "glass = 玻璃杯；他给我倒了一杯水。",
    });
    expect(getWordExample({ term: "cook", chineseGloss: "厨子；烹调" })).toMatchObject({
      sentence: "My uncle works as a cook in a hotel.",
      chinese: "cook = 厨师；我叔叔在一家酒店当厨师。",
    });
  });

  it("adds the reviewed entertainment media batch and leaves only two theme rows", () => {
    const vocabularyPath = path.resolve(
      process.cwd(),
      "src/lib/generated/pet-vocabulary.json",
    );
    const words = JSON.parse(fs.readFileSync(vocabularyPath, "utf8")) as Array<{
      term: string;
      chineseGloss: string;
      theme: string;
    }>;
    const entertainmentWords = words.filter((word) => word.theme === "entertainment");
    const selectedExamples = entertainmentMediaBatch.map((term) =>
      getWordExample({ term, chineseGloss: "" }),
    );
    const missingEntertainmentTerms = entertainmentWords
      .filter((word) => getWordExample(word).sentence === null)
      .map((word) => word.term);

    expect(entertainmentMediaBatch).toHaveLength(50);
    expect(entertainmentWords).toHaveLength(54);
    expect(Object.keys(getReviewedWordExamples()).length).toBeGreaterThanOrEqual(635);
    expect(selectedExamples.map((example) => example.sentence).filter(Boolean)).toHaveLength(50);
    expect(missingEntertainmentTerms).toEqual(["theatre", "toy"]);
  });

  it("keeps the entertainment media ledger aligned with reviewed examples", () => {
    const candidatePath = path.resolve(
      process.cwd(),
      "data/example-candidates/entertainment-media-001.json",
    );
    expect(fs.existsSync(candidatePath)).toBe(true);
    if (!fs.existsSync(candidatePath)) return;

    const candidate = JSON.parse(fs.readFileSync(candidatePath, "utf8")) as {
      entries: Array<{ term: string; focusWord: string; sentence: string; chinese: string }>;
    };
    expect(candidate.entries).toHaveLength(50);
    for (const entry of candidate.entries) {
      expect(getWordExample({ term: entry.term, chineseGloss: "" })).toMatchObject({
        focusWord: entry.focusWord,
        sentence: entry.sentence,
        chinese: entry.chinese,
      });
    }
  });

  it("uses intended entertainment media senses for ambiguous terms", () => {
    expect(getWordExample({ term: "art", chineseGloss: "冠词（article）" })).toMatchObject({
      sentence: "We studied modern art at the gallery.",
      chinese: "art = 艺术；我们在画廊学习了现代艺术。",
    });
    expect(getWordExample({ term: "character", chineseGloss: "个性；字符；人物" })).toMatchObject({
      sentence: "My favourite character in the story is a brave girl.",
      chinese: "character = 人物；故事中我最喜欢的人物是一个勇敢的女孩。",
    });
    expect(getWordExample({ term: "pop", chineseGloss: "砰然声；含气饮料" })).toMatchObject({
      sentence: "My sister listens to pop on the radio.",
      chinese: "pop = 流行音乐；我姐姐用收音机听流行音乐。",
    });
    expect(getWordExample({ term: "program", chineseGloss: "节目；程序" })).toMatchObject({
      sentence: "My favourite science program starts at eight.",
      chinese: "program = 节目；我最喜欢的科学节目八点开始。",
    });
    expect(getWordExample({ term: "show up", chineseGloss: "揭露；露面" })).toMatchObject({
      sentence: "Ben promised to show up before the film began.",
      chinese: "show up = 露面；本答应在电影开始前到场。",
    });
  });

  it("adds the reviewed work society batch and covers every work row", () => {
    const vocabularyPath = path.resolve(
      process.cwd(),
      "src/lib/generated/pet-vocabulary.json",
    );
    const words = JSON.parse(fs.readFileSync(vocabularyPath, "utf8")) as Array<{
      term: string;
      chineseGloss: string;
      theme: string;
    }>;
    const workWords = words.filter((word) => word.theme === "work");
    const selectedExamples = workSocietyBatch.map((term) =>
      getWordExample({ term, chineseGloss: "" }),
    );
    const workExamples = workWords.map((word) => getWordExample(word));

    expect(workSocietyBatch).toHaveLength(50);
    expect(workWords).toHaveLength(42);
    expect(Object.keys(getReviewedWordExamples()).length).toBeGreaterThanOrEqual(685);
    expect(selectedExamples.map((example) => example.sentence).filter(Boolean)).toHaveLength(50);
    expect(workExamples.map((example) => example.sentence).filter(Boolean)).toHaveLength(42);
  });

  it("keeps the work society ledger aligned with reviewed examples", () => {
    const candidatePath = path.resolve(
      process.cwd(),
      "data/example-candidates/work-society-001.json",
    );
    expect(fs.existsSync(candidatePath)).toBe(true);
    if (!fs.existsSync(candidatePath)) return;

    const candidate = JSON.parse(fs.readFileSync(candidatePath, "utf8")) as {
      entries: Array<{ term: string; focusWord: string; sentence: string; chinese: string }>;
    };
    expect(candidate.entries).toHaveLength(50);
    for (const entry of candidate.entries) {
      expect(getWordExample({ term: entry.term, chineseGloss: "" })).toMatchObject({
        focusWord: entry.focusWord,
        sentence: entry.sentence,
        chinese: entry.chinese,
      });
    }
  });

  it("uses intended work society senses for ambiguous terms", () => {
    expect(getWordExample({ term: "business", chineseGloss: "事情；业务" })).toMatchObject({
      sentence: "Her parents started a small food business.",
      chinese: "business = 生意；她父母开创了一家小型食品生意。",
    });
    expect(getWordExample({ term: "doctor / Dr", chineseGloss: "医生；博士" })).toMatchObject({
      focusWord: "doctor",
      sentence: "The doctor examined my injured arm.",
      chinese: "doctor = 医生；医生检查了我受伤的手臂。",
    });
    expect(getWordExample({ term: "Dr / doctor", chineseGloss: "变性反应" })).toMatchObject({
      focusWord: "doctor",
      sentence: "The doctor examined my injured arm.",
    });
    expect(getWordExample({ term: "out of work", chineseGloss: "机器有毛病" })).toMatchObject({
      sentence: "Jack was out of work for two months.",
      chinese: "out of work = 失业；杰克失业了两个月。",
    });
    expect(getWordExample({ term: "work out", chineseGloss: "设计出；计算出" })).toMatchObject({
      sentence: "We need to work out the total cost of the trip.",
      chinese: "work out = 算出；我们需要算出这次旅行的总费用。",
    });
    expect(getWordExample({ term: "workout", chineseGloss: "锻炼；训练" })).toMatchObject({
      focusWord: "workout",
      sentence: null,
      chinese: "workout = 锻炼；训练",
    });
    expect(getWordExample({ term: "admission", chineseGloss: "承认；入场费" })).toMatchObject({
      sentence: "Admission to the museum is free on Sundays.",
      chinese: "admission = 入场；星期天博物馆免费入场。",
    });
    expect(getWordExample({ term: "custom", chineseGloss: "风俗；海关" })).toMatchObject({
      sentence: "Taking off your shoes indoors is a local custom.",
      chinese: "custom = 风俗；进屋脱鞋是当地的风俗。",
    });
    expect(getWordExample({ term: "customs", chineseGloss: "海关；风俗" })).toMatchObject({
      sentence: "We showed our passports at customs.",
      chinese: "customs = 海关；我们在海关出示了护照。",
    });
  });

  it("never presents unreviewed generated text as a natural PET example", () => {
    const vocabularyPath = path.resolve(process.cwd(), "src/lib/generated/pet-vocabulary.json");
    const words = JSON.parse(fs.readFileSync(vocabularyPath, "utf8")) as Array<{
      term: string;
      chineseGloss: string;
      source: string;
    }>;
    const officialWords = words.filter((word) =>
      word.source === "cambridge-b1-preliminary-vocabulary-list-2025",
    );
    const unreviewedWords = officialWords
      .map((word) => ({ word, example: getWordExample(word) }))
      .filter(({ example }) => example.sentence === null);
    const invalidReviewedExamples = officialWords
      .map((word) => ({ word, example: getWordExample(word) }))
      .filter(({ word, example }) => {
        if (!example.sentence) return false;

        const focusKey = example.focusWord.toLowerCase().replace(/[^a-z]+/g, "");
        const chineseSentence = example.chinese.split("；").slice(1).join("；");
        const rawTermInChinese =
          focusKey.length > 2 &&
          new RegExp(`(^|[^a-z])${focusKey}([^a-z]|$)`, "i").test(chineseSentence);

        return (
          rawTermInChinese ||
          word.chineseGloss.includes("白痴")
        );
      });

    expect(officialWords).toHaveLength(words.length);
    expect(generatedWordExamples).toEqual({});
    expect(unreviewedWords.length).toBeGreaterThan(0);
    expect(invalidReviewedExamples).toEqual([]);
  });

  it("only exposes reviewed example content to learners", () => {
    expect(generatedWordExamples.ability).toBeUndefined();
    expect(generatedWordExamples.able).toBeUndefined();

    expect(getWordExample({ term: "ability", chineseGloss: "能力" })).toMatchObject({
      sentence: "She has the ability to explain hard ideas clearly.",
      chinese: "ability = 能力；她有能力把难懂的想法解释清楚。",
    });
    expect(getWordExample({ term: "able", chineseGloss: "能够的" })).toMatchObject({
      sentence: "She is able to explain the answer clearly.",
      chinese: "able = 能干的；能够的；她能够把答案解释清楚。",
      auditStatus: "pass",
    });
  });

  it("covers every learner-facing example with a Google translation audit", () => {
    expect(Object.keys(reviewedWordExampleAudit).sort()).toEqual(
      Object.keys(getReviewedWordExamples()).sort(),
    );
    expect(
      Object.values(reviewedWordExampleAudit).filter((audit) => audit.status === "needs_review"),
    ).toEqual([]);
  });

  it("normalizes duplicate vocabulary fragments before selecting daily new words", () => {
    const household = {
      ...createDemoHousehold(),
      settings: {
        ...createDemoHousehold().settings,
        currentWordTheme: "school",
      },
      wordBank: [
        { term: "of the school.", chineseGloss: "Cambridge B1/PET 官方词表", theme: "school", source: "cambridge" },
        { term: "school", chineseGloss: "学校", theme: "school", source: "guardian" },
        { term: "classroom", chineseGloss: "教室", theme: "school", source: "guardian" },
      ],
      seenWords: [],
      weakWords: [],
    };

    const home = getLearnerHome(household, new Date("2026-06-26T08:00:00+08:00"));

    expect(home.dailyNewWords.map((word) => word.term)).toEqual(
      expect.arrayContaining(["school", "classroom"]),
    );
    expect(home.dailyNewWords.map((word) => word.term)).not.toContain("of the school.");
    expect(home.dailyNewWords.filter((word) => word.term === "school")).toHaveLength(1);
  });

  it("provides a part 2 image and gives feedback on a picture description", () => {
    const household = createDemoHousehold();
    const session = startDailySession(household, new Date("2026-06-26T08:05:00+08:00"));
    const part2 = session.steps.find((step) => step.kind === "speaking_part_2");

    expect(part2?.kind).toBe("speaking_part_2");
    expect(part2?.kind === "speaking_part_2" && ensurePart2Image(part2.prompt).imageUrl).toMatch(
      /^https:\/\/images\.unsplash\.com\/photo-/,
    );

    const result = submitPart2Answer(session, {
      promptId: "part-2-park",
      transcript:
        "In the picture, there are children playing in a park. A woman is sitting on a bench because the weather is sunny.",
      attemptNumber: 1,
    });

    expect(result.feedback.chinese).toContain("图片");
    expect(result.feedback.exampleAnswer).toContain("In the picture");
    expect(result.feedback.pronunciation.targetAccent).toBe("British English");
    expect(result.weakWords.map((word) => word.term)).toEqual(
      expect.arrayContaining(["because"]),
    );
  });

  it("offers multiple built-in images for speaking part 2 practice", () => {
    const household = createDemoHousehold();
    const prompt = household.presetPrompts.find((item) => item.part === "part_2");

    expect(prompt).toBeDefined();
    const builtInChoices = prompt ? getPart2ImageChoices(prompt) : [];

    expect(builtInChoices).toHaveLength(32);
    expect(builtInChoices.every((imageUrl) => imageUrl.startsWith("https://images.unsplash.com/photo-"))).toBe(
      true,
    );
    expect(builtInChoices.some((imageUrl) => imageUrl.startsWith("data:image/svg+xml"))).toBe(false);
    expect(
      prompt &&
        getPart2ImageChoices(prompt, [
          ...household.presetPrompts,
          {
            id: "part-2-extra-image",
            title: "Extra image",
            question: "Look at the picture and describe what the people are doing.",
            part: "part_2",
            imageUrl: "data:image/png;base64,extra",
          },
        ]),
    ).toHaveLength(33);
  });

  it("upgrades legacy generated part 2 images to the real-photo pool", () => {
    const household = {
      ...createDemoHousehold(),
      presetPrompts: [
        {
          id: "part-2-legacy",
          title: "Legacy generated scene",
          question: "Look at the picture and describe what the people are doing.",
          part: "part_2" as const,
          imageUrl: "data:image/svg+xml;charset=utf-8,old-generated-scene",
        },
        {
          id: "part-2-upload",
          title: "Guardian uploaded scene",
          question: "Look at the picture and describe what the people are doing.",
          part: "part_2" as const,
          imageUrl: "data:image/png;base64,guardian-upload",
        },
      ],
    };

    const upgraded = initializePart2ImagePool(household);

    expect(upgraded.presetPrompts[0]?.imageUrl).toMatch(/^https:\/\/images\.unsplash\.com\/photo-/);
    expect(upgraded.presetPrompts[1]?.imageUrl).toBe("data:image/png;base64,guardian-upload");
  });
});
