import fs from "node:fs";
import path from "node:path";

import {
  createDemoHousehold,
  initializePart2ImagePool,
  normalizeVocabularyTerm,
  type DailySessionRecord,
  type HouseholdSpace,
  type Prompt,
  type RecentRecording,
  type SeenWord,
  type WeakWord,
  type WeakWordMistakeRecord,
  type WordBankItem,
} from "@/lib/pet-learning-app";

type SqliteDatabase = {
  exec: (sql: string) => void;
  prepare: (sql: string) => {
    get: (...params: unknown[]) => unknown;
    all: (...params: unknown[]) => unknown[];
    run: (...params: unknown[]) => unknown;
  };
};

type SqliteModule = {
  DatabaseSync: new (filename: string) => SqliteDatabase;
};

const { DatabaseSync } = require("node:sqlite") as SqliteModule;

const householdId = "default-household";

let database: SqliteDatabase | null = null;

export function getHouseholdId() {
  return householdId;
}

export function getDatabase() {
  if (database) return database;

  const dbPath = path.resolve(process.cwd(), process.env.DATABASE_PATH ?? "./data/pet-learning.sqlite");
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  database = new DatabaseSync(dbPath);
  database.exec("PRAGMA journal_mode = WAL;");
  database.exec("PRAGMA foreign_keys = ON;");
  ensureSchema(database);
  ensureSeedData(database);
  return database;
}

export function getHouseholdSpace(): HouseholdSpace {
  const db = getDatabase();
  const household = db
    .prepare("SELECT learner_name, daily_new_word_count, daily_weak_word_limit, current_word_theme FROM households WHERE id = ?")
    .get(householdId) as
    | {
        learner_name: string;
        daily_new_word_count: number;
        daily_weak_word_limit: number;
        current_word_theme: string;
      }
    | undefined;
  const legacyWeakWordRows = db
    .prepare(
      "SELECT term, chinese_gloss, review_stage, due_on, mastered, reason, correct_attempts, total_attempts, source FROM weak_words WHERE household_id = ? ORDER BY created_at ASC",
    )
    .all(householdId);
  const legacyWordBank = legacyWeakWordRows
    .filter(isLegacyWordBankRow)
    .map(mapLegacyWordBankItem);
  const weakWords = legacyWeakWordRows
    .filter((row) => !isLegacyWordBankRow(row))
    .map(mapWeakWord);

  return initializePart2ImagePool({
    learnerName: household?.learner_name ?? "Alex",
    settings: {
      dailyNewWordCount: household?.daily_new_word_count ?? 5,
      dailyWeakWordLimit: household?.daily_weak_word_limit ?? 5,
      currentWordTheme: household?.current_word_theme ?? "school",
    },
    wordBank: uniqueWordBankItems([
      ...db
        .prepare(
          "SELECT term, chinese_gloss, theme, source FROM word_bank WHERE household_id = ? ORDER BY created_at ASC",
        )
        .all(householdId)
        .map(mapWordBankItem),
      ...legacyWordBank,
    ]),
    seenWords: db
      .prepare(
        "SELECT term, chinese_gloss, theme, seen_on, successful_uses FROM seen_words WHERE household_id = ? ORDER BY seen_on ASC, term ASC",
      )
      .all(householdId)
      .map(mapSeenWord),
    weakWords,
    wordMistakes: db
      .prepare(
        "SELECT id, term, reviewed_on, mistake_count FROM word_review_mistakes WHERE household_id = ? ORDER BY reviewed_on ASC, term ASC",
      )
      .all(householdId)
      .map(mapMistakeRecord),
    dailySessions: db
      .prepare(
        "SELECT id, completed_on, duration_minutes, feedback_summary FROM daily_sessions WHERE household_id = ? ORDER BY completed_on ASC",
      )
      .all(householdId)
      .map(mapDailySession),
    recentRecordings: db
      .prepare(
        "SELECT id, prompt_title, recorded_at, audio_url, transcript FROM recent_recordings WHERE household_id = ? ORDER BY recorded_at DESC",
      )
      .all(householdId)
      .map(mapRecording),
    presetPrompts: db
      .prepare(
        "SELECT id, title, question, part, image_url FROM prompts WHERE household_id = ? AND enabled = 1 ORDER BY created_at ASC",
      )
      .all(householdId)
      .map(mapPrompt),
  });
}

export function saveHouseholdSpace(household: HouseholdSpace) {
  const db = getDatabase();
  const nextHousehold = initializePart2ImagePool(household);

  db.exec("BEGIN");
  try {
    db.prepare("UPDATE households SET learner_name = ?, daily_new_word_count = ?, daily_weak_word_limit = ?, current_word_theme = ?, updated_at = ? WHERE id = ?").run(
      nextHousehold.learnerName,
      nextHousehold.settings?.dailyNewWordCount ?? 5,
      nextHousehold.settings?.dailyWeakWordLimit ?? 5,
      nextHousehold.settings?.currentWordTheme ?? "school",
      new Date().toISOString(),
      householdId,
    );

    db.prepare("DELETE FROM word_bank WHERE household_id = ?").run(householdId);
    db.prepare("DELETE FROM seen_words WHERE household_id = ?").run(householdId);
    db.prepare("DELETE FROM weak_words WHERE household_id = ?").run(householdId);
    db.prepare("DELETE FROM word_review_mistakes WHERE household_id = ?").run(householdId);
    db.prepare("DELETE FROM prompts WHERE household_id = ?").run(householdId);
    db.prepare("DELETE FROM daily_sessions WHERE household_id = ?").run(householdId);
    db.prepare("DELETE FROM recent_recordings WHERE household_id = ?").run(householdId);

    for (const word of nextHousehold.wordBank ?? []) {
      insertWordBankItem(db, word);
    }
    for (const word of nextHousehold.seenWords ?? []) {
      insertSeenWord(db, word);
    }
    for (const word of nextHousehold.weakWords) {
      insertWeakWord(db, word);
    }
    for (const mistake of nextHousehold.wordMistakes ?? []) {
      insertMistakeRecord(db, mistake);
    }
    for (const prompt of nextHousehold.presetPrompts) {
      insertPrompt(db, prompt);
    }
    for (const session of nextHousehold.dailySessions) {
      insertDailySession(db, session);
    }
    for (const recording of nextHousehold.recentRecordings) {
      insertRecording(db, recording);
    }

    db.exec("COMMIT");
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }

  return getHouseholdSpace();
}

function ensureSchema(db: SqliteDatabase) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS households (
      id TEXT PRIMARY KEY,
      learner_name TEXT NOT NULL,
      entry_code TEXT NOT NULL,
      daily_new_word_count INTEGER NOT NULL DEFAULT 5,
      daily_weak_word_limit INTEGER NOT NULL DEFAULT 5,
      current_word_theme TEXT NOT NULL DEFAULT 'school',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS word_bank (
      id TEXT PRIMARY KEY,
      household_id TEXT NOT NULL,
      term TEXT NOT NULL,
      chinese_gloss TEXT NOT NULL,
      theme TEXT NOT NULL,
      source TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      UNIQUE(household_id, term),
      FOREIGN KEY(household_id) REFERENCES households(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS seen_words (
      id TEXT PRIMARY KEY,
      household_id TEXT NOT NULL,
      term TEXT NOT NULL,
      chinese_gloss TEXT NOT NULL,
      theme TEXT NOT NULL,
      seen_on TEXT NOT NULL,
      successful_uses INTEGER NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      UNIQUE(household_id, term),
      FOREIGN KEY(household_id) REFERENCES households(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS weak_words (
      id TEXT PRIMARY KEY,
      household_id TEXT NOT NULL,
      term TEXT NOT NULL,
      chinese_gloss TEXT NOT NULL,
      review_stage TEXT NOT NULL,
      due_on TEXT NOT NULL,
      mastered INTEGER NOT NULL,
      reason TEXT NOT NULL DEFAULT 'usage',
      correct_attempts INTEGER NOT NULL DEFAULT 0,
      total_attempts INTEGER NOT NULL DEFAULT 0,
      source TEXT NOT NULL DEFAULT 'topic',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      UNIQUE(household_id, term),
      FOREIGN KEY(household_id) REFERENCES households(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS word_review_mistakes (
      id TEXT PRIMARY KEY,
      household_id TEXT NOT NULL,
      term TEXT NOT NULL,
      reviewed_on TEXT NOT NULL,
      mistake_count INTEGER NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      UNIQUE(household_id, term, reviewed_on),
      FOREIGN KEY(household_id) REFERENCES households(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS prompts (
      id TEXT PRIMARY KEY,
      household_id TEXT NOT NULL,
      title TEXT NOT NULL,
      question TEXT NOT NULL,
      part TEXT NOT NULL,
      image_url TEXT,
      enabled INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      FOREIGN KEY(household_id) REFERENCES households(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS daily_sessions (
      id TEXT PRIMARY KEY,
      household_id TEXT NOT NULL,
      completed_on TEXT NOT NULL,
      duration_minutes INTEGER NOT NULL,
      feedback_summary TEXT,
      created_at TEXT NOT NULL,
      FOREIGN KEY(household_id) REFERENCES households(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS recent_recordings (
      id TEXT PRIMARY KEY,
      household_id TEXT NOT NULL,
      prompt_title TEXT NOT NULL,
      recorded_at TEXT NOT NULL,
      audio_url TEXT NOT NULL,
      transcript TEXT,
      created_at TEXT NOT NULL,
      FOREIGN KEY(household_id) REFERENCES households(id) ON DELETE CASCADE
    );
  `);
  ensureColumn(db, "households", "daily_new_word_count", "INTEGER NOT NULL DEFAULT 5");
  ensureColumn(db, "households", "daily_weak_word_limit", "INTEGER NOT NULL DEFAULT 5");
  ensureColumn(db, "households", "current_word_theme", "TEXT NOT NULL DEFAULT 'school'");
  ensureColumn(db, "weak_words", "reason", "TEXT NOT NULL DEFAULT 'usage'");
  ensureColumn(db, "weak_words", "correct_attempts", "INTEGER NOT NULL DEFAULT 0");
  ensureColumn(db, "weak_words", "total_attempts", "INTEGER NOT NULL DEFAULT 0");
}

function ensureSeedData(db: SqliteDatabase) {
  const existing = db.prepare("SELECT id FROM households WHERE id = ?").get(householdId);

  if (existing) {
    ensureBuiltInWordBank(db);
    return;
  }

  const now = new Date().toISOString();
  const demo = createDemoHousehold();
  const officialVocabulary = loadOfficialPetVocabulary();
  db.prepare("INSERT INTO households (id, learner_name, entry_code, daily_new_word_count, daily_weak_word_limit, current_word_theme, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)").run(
    householdId,
    "Alex",
    process.env.LEARNER_ENTRY_CODE ?? "123456",
    demo.settings.dailyNewWordCount,
    demo.settings.dailyWeakWordLimit,
    demo.settings.currentWordTheme,
    now,
    now,
  );

  for (const word of officialVocabulary) insertWordBankItem(db, word);
  for (const word of demo.seenWords) insertSeenWord(db, word);
  for (const word of demo.weakWords) insertWeakWord(db, word);
  for (const mistake of demo.wordMistakes) insertMistakeRecord(db, mistake);
  for (const prompt of demo.presetPrompts) insertPrompt(db, prompt);
  for (const session of demo.dailySessions) insertDailySession(db, session);
  for (const recording of demo.recentRecordings) insertRecording(db, recording);
}

function ensureBuiltInWordBank(db: SqliteDatabase) {
  const officialVocabulary = loadOfficialPetVocabulary();

  for (const word of officialVocabulary) {
    insertWordBankItemIfMissing(db, word);
  }
}

function loadOfficialPetVocabulary(): WordBankItem[] {
  const generatedPath = path.resolve(process.cwd(), "./src/lib/generated/pet-vocabulary.json");

  if (!fs.existsSync(generatedPath)) {
    return createDemoHousehold().wordBank;
  }

  const items = JSON.parse(fs.readFileSync(generatedPath, "utf8")) as WordBankItem[];

  return items.filter((word) => word.term && word.theme && word.source);
}

function ensureColumn(db: SqliteDatabase, table: string, column: string, definition: string) {
  const columns = db.prepare(`PRAGMA table_info(${table})`).all() as Array<{ name: string }>;
  const exists = columns.some((item) => item.name === column);

  if (!exists) {
    db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
  }
}

function insertWordBankItem(db: SqliteDatabase, word: WordBankItem) {
  const now = new Date().toISOString();
  db.prepare(
    "INSERT OR REPLACE INTO word_bank (id, household_id, term, chinese_gloss, theme, source, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
  ).run(
    `bank-${word.term.toLowerCase()}`,
    householdId,
    word.term,
    word.chineseGloss,
    word.theme,
    word.source,
    now,
    now,
  );
}

function insertWordBankItemIfMissing(db: SqliteDatabase, word: WordBankItem) {
  const existing = db
    .prepare("SELECT term FROM word_bank WHERE household_id = ? AND lower(term) = lower(?)")
    .get(householdId, word.term);

  if (existing) return;

  insertWordBankItem(db, word);
}

function insertSeenWord(db: SqliteDatabase, word: SeenWord) {
  const now = new Date().toISOString();
  db.prepare(
    "INSERT OR REPLACE INTO seen_words (id, household_id, term, chinese_gloss, theme, seen_on, successful_uses, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
  ).run(
    `seen-${word.term.toLowerCase()}`,
    householdId,
    word.term,
    word.chineseGloss,
    word.theme,
    word.seenOn,
    word.successfulUses,
    now,
    now,
  );
}

function insertWeakWord(db: SqliteDatabase, word: WeakWord) {
  const now = new Date().toISOString();
  db.prepare(
    "INSERT OR REPLACE INTO weak_words (id, household_id, term, chinese_gloss, review_stage, due_on, mastered, reason, correct_attempts, total_attempts, source, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
  ).run(
    `word-${word.term.toLowerCase()}`,
    householdId,
    word.term,
    word.chineseGloss,
    word.reviewStage,
    word.dueOn,
    word.mastered ? 1 : 0,
    word.reason,
    word.correctAttempts,
    word.totalAttempts,
    "weak",
    now,
    now,
  );
}

function insertMistakeRecord(db: SqliteDatabase, mistake: WeakWordMistakeRecord) {
  const now = new Date().toISOString();
  db.prepare(
    "INSERT OR REPLACE INTO word_review_mistakes (id, household_id, term, reviewed_on, mistake_count, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
  ).run(
    mistake.id,
    householdId,
    mistake.term,
    mistake.reviewedOn,
    mistake.mistakeCount,
    now,
    now,
  );
}

function insertPrompt(db: SqliteDatabase, prompt: Prompt) {
  const now = new Date().toISOString();
  db.prepare(
    "INSERT OR REPLACE INTO prompts (id, household_id, title, question, part, image_url, enabled, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
  ).run(prompt.id, householdId, prompt.title, prompt.question, prompt.part, prompt.imageUrl ?? null, 1, now, now);
}

function insertDailySession(db: SqliteDatabase, session: DailySessionRecord) {
  db.prepare(
    "INSERT OR REPLACE INTO daily_sessions (id, household_id, completed_on, duration_minutes, feedback_summary, created_at) VALUES (?, ?, ?, ?, ?, ?)",
  ).run(
    session.id,
    householdId,
    session.completedOn,
    session.durationMinutes,
    session.feedbackSummary ?? null,
    new Date().toISOString(),
  );
}

function insertRecording(db: SqliteDatabase, recording: RecentRecording) {
  db.prepare(
    "INSERT OR REPLACE INTO recent_recordings (id, household_id, prompt_title, recorded_at, audio_url, transcript, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
  ).run(
    recording.id,
    householdId,
    recording.promptTitle,
    recording.recordedAt,
    recording.audioUrl,
    "transcript" in recording ? recording.transcript ?? null : null,
    new Date().toISOString(),
  );
}

function mapWeakWord(row: unknown): WeakWord {
  const item = row as {
    term: string;
    chinese_gloss: string;
    review_stage: WeakWord["reviewStage"];
    due_on: string;
    mastered: number;
    reason?: WeakWord["reason"];
    correct_attempts?: number;
    total_attempts?: number;
  };

  return {
    term: item.term,
    chineseGloss: item.chinese_gloss,
    reviewStage: item.review_stage,
    dueOn: item.due_on,
    mastered: Boolean(item.mastered),
    reason: item.reason ?? "usage",
    correctAttempts: item.correct_attempts ?? 0,
    totalAttempts: item.total_attempts ?? 0,
  };
}

function mapWordBankItem(row: unknown): WordBankItem {
  const item = row as {
    term: string;
    chinese_gloss: string;
    theme: string;
    source: string;
  };

  const term = normalizeVocabularyTerm(item.term);

  return {
    term,
    chineseGloss: item.chinese_gloss,
    theme: item.theme || inferWordTheme(term),
    source: item.source,
  };
}

function mapLegacyWordBankItem(row: unknown): WordBankItem {
  const item = row as {
    term: string;
    chinese_gloss: string;
    source?: string;
  };

  const term = normalizeVocabularyTerm(item.term);

  return {
    term,
    chineseGloss: item.chinese_gloss,
    theme: inferWordTheme(term),
    source: item.source ?? "cambridge-b1-preliminary-vocabulary-list-2025",
  };
}

function mapSeenWord(row: unknown): SeenWord {
  const item = row as {
    term: string;
    chinese_gloss: string;
    theme: string;
    seen_on: string;
    successful_uses: number;
  };

  return {
    term: item.term,
    chineseGloss: item.chinese_gloss,
    theme: item.theme,
    seenOn: item.seen_on,
    successfulUses: item.successful_uses,
  };
}

function mapMistakeRecord(row: unknown): WeakWordMistakeRecord {
  const item = row as {
    id: string;
    term: string;
    reviewed_on: string;
    mistake_count: number;
  };

  return {
    id: item.id,
    term: item.term,
    reviewedOn: item.reviewed_on,
    mistakeCount: item.mistake_count,
  };
}

function mapPrompt(row: unknown): Prompt {
  const item = row as {
    id: string;
    title: string;
    question: string;
    part: Prompt["part"];
    image_url: string | null;
  };

  return {
    id: item.id,
    title: item.title,
    question: item.question,
    part: item.part,
    imageUrl: item.image_url ?? undefined,
  };
}

function mapDailySession(row: unknown): DailySessionRecord {
  const item = row as {
    id: string;
    completed_on: string;
    duration_minutes: number;
    feedback_summary: string | null;
  };

  return {
    id: item.id,
    completedOn: item.completed_on,
    durationMinutes: item.duration_minutes,
    feedbackSummary: item.feedback_summary ?? undefined,
  };
}

function mapRecording(row: unknown): RecentRecording {
  const item = row as {
    id: string;
    prompt_title: string;
    recorded_at: string;
    audio_url: string;
    transcript?: string | null;
  };

  return {
    id: item.id,
    promptTitle: item.prompt_title,
    recordedAt: item.recorded_at,
    audioUrl: item.audio_url,
    transcript: item.transcript ?? undefined,
  };
}

function uniqueWordBankItems(words: WordBankItem[]): WordBankItem[] {
  const byTerm = new Map<string, WordBankItem>();

  for (const word of words) {
    const term = normalizeVocabularyTerm(word.term);
    if (!term) continue;

    const key = term.toLowerCase();
    const normalizedWord = { ...word, term };
    const existing = byTerm.get(key);

    if (!existing || word.term === term && existing.chineseGloss === "Cambridge B1/PET 官方词表") {
      byTerm.set(key, normalizedWord);
    }
  }

  return Array.from(byTerm.values());
}

function isLegacyWordBankRow(row: unknown) {
  const item = row as { chinese_gloss?: string; source?: string };

  return (
    item.source?.startsWith("cambridge-") ||
    item.chinese_gloss === "Cambridge B1/PET 官方词表"
  );
}

function inferWordTheme(term: string) {
  const lower = term.toLowerCase();
  const themeTerms: Record<string, string[]> = {
    school: ["school", "class", "teacher", "student", "homework", "subject", "exam", "library", "lesson"],
    family: ["family", "mother", "father", "parent", "brother", "sister", "cousin", "grand"],
    food: ["food", "bread", "cake", "coffee", "restaurant", "meal", "fruit", "vegetable", "breakfast"],
    travel: ["airport", "bus", "train", "hotel", "passport", "ticket", "travel", "journey", "station"],
    sport: ["sport", "football", "tennis", "swim", "cycling", "basketball", "gym", "race"],
    work: ["job", "work", "office", "manager", "doctor", "engineer", "teacher", "assistant"],
    nature: ["animal", "environment", "forest", "river", "weather", "mountain", "beach", "tree"],
  };

  for (const [theme, terms] of Object.entries(themeTerms)) {
    if (terms.some((item) => lower.includes(item))) {
      return theme;
    }
  }

  return "general";
}
