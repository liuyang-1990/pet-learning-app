import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { getReviewedWordExamples } from "../src/lib/pet-learning-app";

type AuditStatus = "pass" | "needs_review";

type ExampleAudit = {
  status: AuditStatus;
  reasons: string[];
  chineseGloss: string;
  chineseSentence: string;
  googleGloss: string;
  googleChinese: string;
  googleBackTranslation: string;
};

const cachePath = path.resolve(process.cwd(), "data/google-translation-audit-cache.json");
const outputPath = path.resolve(process.cwd(), "src/lib/generated/pet-word-example-audit.ts");
const cache = readCache();
const manuallyConfirmedTerms = new Set([
  // These feelings examples use valid Chinese synonyms missed by gloss matching.
  "mind", // idea / thought in "change my mind", not only intellect
  "pleased", // satisfied / happy
  "proud", // proud / feeling pride
  "sad", // sad / sorrowful
  "tired", // tired / fatigued
  "annoyed", // annoyed / angry
  "depressed", // depressed / low in mood
  // These family and feelings examples use valid synonyms or context-dependent senses.
  "mother", // mother / mum
  "baby", // infant, not a term of affection
  "male", // male animal / bird
  "fear", // fear / being afraid
  "feellike", // want to, not resemble
  // These home-context examples use valid senses or Chinese synonyms missed by gloss matching.
  "bath", // washing in a bath
  "flat", // apartment, not level
  "guesthouse", // guest-house / lodging
  "sittingroom", // sitting room / living room
  "table", // dining table, not a data table
  // These school-context examples use valid non-default senses of polysemous terms.
  "lesson", // class period, not a moral lesson
  "break", // school break, not "to break"
  "exercise", // grammar practice, not physical exercise
  "mark", // test score, not a visible mark
  "note", // study notes, not an annotation
  "paper", // completed test paper, not material
  "pupil", // student, not the eye part
  "revise", // study before an exam, not edit text
  "textbook", // school book
  "message", // communication, not a note left behind
  "class",
  "classroom",
  "subject",
  "parent",
  "relative",
  "sunny",
  "race",
  "waste",
  "field",
  "cool",
  "rock",
]);

async function main() {
  const examples = getReviewedWordExamples();
  const entries = Object.entries(examples);
  const chineseGlosses = await translateAll(entries.map(([, example]) => example.focusWord), "en", "zh-CN");
  const chineseSentences = await translateAll(entries.map(([, example]) => example.sentence ?? ""), "en", "zh-CN");
  const originalChineseSentences = entries.map(([, example]) => splitChineseExample(example.chinese)[1]);
  const backTranslations = await translateAll(originalChineseSentences, "zh-CN", "en");
  const audits = Object.fromEntries(entries.map(([key, example], index) => {
    const [chineseGloss, chineseSentence] = splitChineseExample(example.chinese);
    const googleGloss = chineseGlosses[index];
    const googleChinese = chineseSentences[index];
    const googleBackTranslation = backTranslations[index];
    const reasons = findReviewReasons({
      chineseGloss,
      chineseSentence,
      googleGloss,
      googleChinese,
      googleBackTranslation,
    });

    const isManuallyConfirmed = manuallyConfirmedTerms.has(key);
    return [key, {
      status: isManuallyConfirmed || reasons.length === 0 ? "pass" : "needs_review",
      reasons: isManuallyConfirmed ? [] : reasons,
      chineseGloss,
      chineseSentence,
      googleGloss,
      googleChinese,
      googleBackTranslation,
    } satisfies ExampleAudit] as const;
  }));

  const learnerAudit = Object.fromEntries(
    Object.entries(audits).map(([term, audit]) => [term, {
      status: audit.status,
      reasons: audit.reasons,
    }]),
  );
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(
    outputPath,
    `export const reviewedWordExampleAudit = ${JSON.stringify(learnerAudit, null, 2)} as const;\n`,
  );
  writeCache();

  const flagged = Object.entries(audits).filter(([, audit]) => audit.status === "needs_review");
  console.log(`Audited ${entries.length} reviewed PET examples; ${flagged.length} need review.`);
  for (const [term, audit] of flagged) {
    console.log(`${term}: ${audit.reasons.join(", ")}`);
  }
}

async function translateAll(texts: string[], source: string, target: string): Promise<string[]> {
  const translated = new Map<string, string>();
  const pending = [...new Set(texts.filter((text) => {
    const cacheKey = `${source}:${target}:${text}`;
    const cached = cache[cacheKey];
    if (cached) translated.set(text, cached);
    return !cached;
  }))];

  for (let index = 0; index < pending.length; index += 12) {
    const batch = pending.slice(index, index + 12);
    const results = translateBatch(batch, source, target);
    if (results.length !== batch.length) {
      throw new Error(`Google translation batch count mismatch: expected ${batch.length}, received ${results.length}`);
    }

    for (let resultIndex = 0; resultIndex < batch.length; resultIndex += 1) {
      const text = batch[resultIndex];
      const translation = results[resultIndex];
      translated.set(text, translation);
      cache[`${source}:${target}:${text}`] = translation;
    }
    writeCache();
  }

  return texts.map((text) => translated.get(text) ?? "");
}

function translateBatch(texts: string[], source: string, target: string): string[] {
  const joined = texts.join("\n\n");

  const params = new URLSearchParams({
    client: "gtx",
    sl: source,
    tl: target,
    dt: "t",
    q: joined,
  });
  const url = `https://translate.googleapis.com/translate_a/single?${params}`;
  let body = "";

  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      body = execFileSync(
        "curl",
        ["--fail", "--silent", "--show-error", "--retry", "4", "--retry-all-errors", "--retry-delay", "2", "--max-time", "30", url],
        { encoding: "utf8" },
      );
      break;
    } catch (error) {
      if (attempt === 2) throw error;
    }
  }

  let payload: Array<Array<[string]>>;
  try {
    payload = JSON.parse(body) as Array<Array<[string]>>;
  } catch {
    throw new Error(`Google translation returned invalid JSON: ${body.slice(0, 300)}`);
  }
  const translation = payload[0]?.map((part) => part[0]).join("").trim();
  if (!translation) throw new Error(`Google translation returned no text for batch: ${joined}`);
  return translation.split(/\n\s*\n/).map((part) => part.trim());
}

function splitChineseExample(chinese: string): [string, string] {
  const separator = chinese.lastIndexOf("；");
  if (separator === -1) return [chinese.trim(), ""];

  return [chinese.slice(0, separator).trim(), chinese.slice(separator + 1).trim()];
}

function findReviewReasons(input: Omit<ExampleAudit, "status" | "reasons">): string[] {
  const reasons: string[] = [];
  const sentenceSimilarity = chineseCharacterSimilarity(input.chineseSentence, input.googleChinese);
  const backTranslationSimilarity = englishTokenSimilarity(input.googleBackTranslation, input.googleChinese);
  const glossSimilarity = chineseCharacterSimilarity(input.chineseGloss, input.googleGloss);

  if (sentenceSimilarity < 0.22 && backTranslationSimilarity < 0.35) {
    reasons.push("例句中英回译差异明显");
  }
  if (glossSimilarity < 0.14) {
    reasons.push("词义与 Google 翻译差异明显");
  }

  return reasons;
}

function chineseCharacterSimilarity(left: string, right: string): number {
  const leftSet = new Set(left.match(/[\u4e00-\u9fff]/g) ?? []);
  const rightSet = new Set(right.match(/[\u4e00-\u9fff]/g) ?? []);
  return setSimilarity(leftSet, rightSet);
}

function englishTokenSimilarity(left: string, right: string): number {
  const ignored = new Set(["a", "an", "and", "are", "as", "at", "be", "but", "for", "has", "have", "i", "in", "is", "it", "of", "on", "or", "she", "the", "to", "was", "we", "with", "you"]);
  const tokens = (value: string) => new Set(
    value.toLowerCase().match(/[a-z]+/g)?.filter((token) => !ignored.has(token)) ?? [],
  );
  return setSimilarity(tokens(left), tokens(right));
}

function setSimilarity<T>(left: Set<T>, right: Set<T>): number {
  const union = new Set([...left, ...right]);
  if (union.size === 0) return 1;

  const intersection = [...left].filter((item) => right.has(item));
  return intersection.length / union.size;
}

function readCache(): Record<string, string> {
  if (!fs.existsSync(cachePath)) return {};
  return JSON.parse(fs.readFileSync(cachePath, "utf8"));
}

function writeCache() {
  fs.mkdirSync(path.dirname(cachePath), { recursive: true });
  fs.writeFileSync(cachePath, `${JSON.stringify(cache, null, 2)}\n`);
}

void main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
