import fs from "node:fs";
import path from "node:path";

import {
  createDemoHousehold,
  type DailySessionRecord,
  type HouseholdSpace,
  type Prompt,
  type RecentRecording,
  type WeakWord,
  type WeakWordMistakeRecord,
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
    .prepare("SELECT learner_name, daily_weak_word_limit FROM households WHERE id = ?")
    .get(householdId) as { learner_name: string; daily_weak_word_limit: number } | undefined;

  return {
    learnerName: household?.learner_name ?? "Alex",
    settings: {
      dailyWeakWordLimit: household?.daily_weak_word_limit ?? 5,
    },
    weakWords: db
      .prepare(
        "SELECT term, chinese_gloss, review_stage, due_on, mastered FROM weak_words WHERE household_id = ? ORDER BY created_at ASC",
      )
      .all(householdId)
      .map(mapWeakWord),
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
  };
}

export function saveHouseholdSpace(household: HouseholdSpace) {
  const db = getDatabase();

  db.exec("BEGIN");
  try {
    db.prepare("UPDATE households SET learner_name = ?, daily_weak_word_limit = ?, updated_at = ? WHERE id = ?").run(
      household.learnerName,
      household.settings?.dailyWeakWordLimit ?? 5,
      new Date().toISOString(),
      householdId,
    );

    db.prepare("DELETE FROM weak_words WHERE household_id = ?").run(householdId);
    db.prepare("DELETE FROM word_review_mistakes WHERE household_id = ?").run(householdId);
    db.prepare("DELETE FROM prompts WHERE household_id = ?").run(householdId);
    db.prepare("DELETE FROM daily_sessions WHERE household_id = ?").run(householdId);
    db.prepare("DELETE FROM recent_recordings WHERE household_id = ?").run(householdId);

    for (const word of household.weakWords) {
      insertWeakWord(db, word);
    }
    for (const mistake of household.wordMistakes ?? []) {
      insertMistakeRecord(db, mistake);
    }
    for (const prompt of household.presetPrompts) {
      insertPrompt(db, prompt);
    }
    for (const session of household.dailySessions) {
      insertDailySession(db, session);
    }
    for (const recording of household.recentRecordings) {
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
      daily_weak_word_limit INTEGER NOT NULL DEFAULT 5,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS weak_words (
      id TEXT PRIMARY KEY,
      household_id TEXT NOT NULL,
      term TEXT NOT NULL,
      chinese_gloss TEXT NOT NULL,
      review_stage TEXT NOT NULL,
      due_on TEXT NOT NULL,
      mastered INTEGER NOT NULL,
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
  ensureColumn(db, "households", "daily_weak_word_limit", "INTEGER NOT NULL DEFAULT 5");
}

function ensureSeedData(db: SqliteDatabase) {
  const existing = db.prepare("SELECT id FROM households WHERE id = ?").get(householdId);

  if (existing) return;

  const now = new Date().toISOString();
  const demo = createDemoHousehold();
  db.prepare("INSERT INTO households (id, learner_name, entry_code, daily_weak_word_limit, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)").run(
    householdId,
    "Alex",
    process.env.LEARNER_ENTRY_CODE ?? "123456",
    demo.settings.dailyWeakWordLimit,
    now,
    now,
  );

  for (const word of demo.weakWords) insertWeakWord(db, word);
  for (const mistake of demo.wordMistakes) insertMistakeRecord(db, mistake);
  for (const prompt of demo.presetPrompts) insertPrompt(db, prompt);
  for (const session of demo.dailySessions) insertDailySession(db, session);
  for (const recording of demo.recentRecordings) insertRecording(db, recording);
}

function ensureColumn(db: SqliteDatabase, table: string, column: string, definition: string) {
  const columns = db.prepare(`PRAGMA table_info(${table})`).all() as Array<{ name: string }>;
  const exists = columns.some((item) => item.name === column);

  if (!exists) {
    db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
  }
}

function insertWeakWord(db: SqliteDatabase, word: WeakWord) {
  const now = new Date().toISOString();
  db.prepare(
    "INSERT OR REPLACE INTO weak_words (id, household_id, term, chinese_gloss, review_stage, due_on, mastered, source, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
  ).run(
    `word-${word.term.toLowerCase()}`,
    householdId,
    word.term,
    word.chineseGloss,
    word.reviewStage,
    word.dueOn,
    word.mastered ? 1 : 0,
    "topic",
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
  };

  return {
    term: item.term,
    chineseGloss: item.chinese_gloss,
    reviewStage: item.review_stage,
    dueOn: item.due_on,
    mastered: Boolean(item.mastered),
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
