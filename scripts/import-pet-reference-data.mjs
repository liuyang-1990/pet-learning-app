import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

const householdId = "default-household";
const sourceUrl = "https://www.cambridgeenglish.org/Images/506887-b1-preliminary-vocabulary-list.pdf";
const dbPath = path.resolve(process.cwd(), process.env.DATABASE_PATH ?? "./data/pet-learning.sqlite");
const generatedVocabularyPath = path.resolve(process.cwd(), "./src/lib/generated/pet-vocabulary.json");
const tempDir = path.join(os.tmpdir(), "pet-learning-seed");
const pdfPath = path.join(tempDir, "b1-preliminary-vocabulary-list.pdf");
const pythonPackagesPath = path.join(tempDir, "python-packages");
const ecdictCsvPath = path.join(tempDir, "ecdict.csv");
const ecdictPackageDir = path.join(tempDir, "ecdict-package");

fs.mkdirSync(tempDir, { recursive: true });
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

function main() {
  downloadVocabularyPdf();
  const words = extractVocabularyWords();
  const translations = loadEcdictTranslations(words.map((word) => word.term));
  const vocabulary = words.map((term) => ({
    term: term.term,
    chineseGloss: translateVocabularyTerm(term.term, translations, term.pos),
    theme: inferTheme(term.term, term.pos),
    source: "cambridge-b1-preliminary-vocabulary-list-2025",
  }));
  assertCompleteChineseGlosses(vocabulary);
  const scenes = buildPart2Scenes();
  const db = new DatabaseSync(dbPath);

  try {
    ensureReferenceSchema(db);
    writeGeneratedVocabulary(vocabulary);
    writeGeneratedExamples();
    importWords(db, vocabulary);
    importPart2Scenes(db, scenes);
  } finally {
    db.close();
  }

  console.log(`Imported ${vocabulary.length} Cambridge B1 Preliminary vocabulary items.`);
  console.log(`Imported ${scenes.length} PET-style Speaking Part 2 image prompts.`);
  console.log(`Vocabulary JSON: ${generatedVocabularyPath}`);
  console.log(`Database: ${dbPath}`);
}

function downloadVocabularyPdf() {
  if (fs.existsSync(pdfPath) && fs.statSync(pdfPath).size > 800_000) {
    return;
  }

  execFileSync(
    "curl",
    ["--http1.1", "-L", sourceUrl, "-o", pdfPath],
    { stdio: "inherit" },
  );
}

function extractVocabularyWords() {
  ensurePythonPdfParser();

  const code = String.raw`
import json
import re
import sys

sys.path.insert(0, "${pythonPackagesPath}")
from pypdf import PdfReader

reader = PdfReader("${pdfPath}")
parts = r"(?:abbrev|adj|ad|adv|av|conj|det|exclam|mv|n|phr|pl|prep|pron|v)"
terms = []

for page_number in range(3, 40):
    text = reader.pages[page_number].extract_text() or ""
    for raw_line in text.splitlines():
        line = " ".join(raw_line.strip().split())
        if not line:
            continue
        if line.startswith(("Page ", "©", "List", "for Schools", "Preliminary and")):
            continue
        if line.startswith("•") or re.fullmatch(r"[A-Z]", line):
            continue

        match = re.match(rf"^(.+?)\s+\((?=[^)]*\b{parts}\b)([^)]+)\)", line, re.I)
        if not match:
            continue

        term = match.group(1).strip()
        pos_text = match.group(2).strip().lower()
        pos_match = re.search(rf"\b{parts}\b", pos_text, re.I)
        pos = pos_match.group(0).lower() if pos_match else ""
        term = re.sub(r"\([^)]*\)", "", term)
        term = re.sub(r"\s*/\s*", " / ", term)
        term = re.sub(r"\s+", " ", term).strip(" -–—")
        term = re.sub(r"[.;:,!?)]+$", "", term).strip()
        term = re.sub(r"\bwhile,\s+whilst\b", "while / whilst", term, flags=re.I)
        term = term.replace("O.K.", "OK")

        if "/" in term and len(term.split("/")) > 3:
            continue
        if not re.search(r"[a-zA-Z]", term):
            continue
        if len(term) < 2 or len(term) > 45:
            continue
        if term.lower() in {"preliminary", "vocabulary", "list", "of the school"}:
            continue

        terms.append({"term": term, "pos": pos})

seen = set()
unique_terms = []
for term in terms:
    key = term["term"].lower()
    if key not in seen:
        seen.add(key)
        unique_terms.append(term)

print(json.dumps(unique_terms, ensure_ascii=False))
`;

  const output = execFileSync("python3", ["-c", code], { encoding: "utf8" });
  return JSON.parse(output);
}

function ensurePythonPdfParser() {
  const checkCode = `import sys; sys.path.insert(0, "${pythonPackagesPath}"); import pypdf`;

  try {
    execFileSync("python3", ["-c", checkCode], { stdio: "ignore" });
  } catch {
    execFileSync(
      "python3",
      ["-m", "pip", "install", "--quiet", "--target", pythonPackagesPath, "pypdf"],
      { stdio: "inherit" },
    );
  }
}

function loadEcdictTranslations(terms) {
  ensureEcdictCsv();

  const desiredKeys = new Set(terms.flatMap((term) => candidateLookupKeys(term)));
  const translations = new Map();
  const lines = fs.readFileSync(ecdictCsvPath, "utf8").split(/\r?\n/);

  for (let index = 1; index < lines.length; index += 1) {
    const line = lines[index];
    if (!line) continue;

    const columns = parseCsvLine(line);
    const word = normalizeLookupKey(columns[0] ?? "");

    if (desiredKeys.has(word) && columns[3]) {
      translations.set(word, cleanTranslation(columns[3]));
    }
  }

  return translations;
}

function ensureEcdictCsv() {
  if (fs.existsSync(ecdictCsvPath) && fs.statSync(ecdictCsvPath).size > 50_000_000) {
    return;
  }

  fs.rmSync(ecdictPackageDir, { recursive: true, force: true });
  fs.mkdirSync(ecdictPackageDir, { recursive: true });

  const npmPackOutput = execFileSync(
    "npm",
    ["pack", "ecdict", "--pack-destination", tempDir],
    { encoding: "utf8" },
  ).trim();
  const tarball = path.join(tempDir, npmPackOutput.split(/\r?\n/).at(-1) ?? "ecdict-0.0.4.tgz");

  execFileSync(
    "tar",
    ["-xzf", tarball, "-C", ecdictPackageDir, "--strip-components=1"],
    { stdio: "ignore" },
  );
  fs.copyFileSync(path.join(ecdictPackageDir, "assets", "ecdict.csv"), ecdictCsvPath);
}

function parseCsvLine(line) {
  const columns = [];
  let current = "";
  let quoted = false;

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];

    if (character === "\"") {
      if (quoted && line[index + 1] === "\"") {
        current += "\"";
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (character === "," && !quoted) {
      columns.push(current);
      current = "";
    } else {
      current += character;
    }
  }

  columns.push(current);
  return columns;
}

function translateVocabularyTerm(term, translations, pos = "") {
  const override = chineseGlossOverrides.get(normalizeLookupKey(term));
  if (override) return override;

  const direct = lookupTranslation(term, translations);
  if (direct) return direct;

  const slashParts = term.split(/\s*\/\s*/).map((part) => part.trim()).filter(Boolean);
  if (slashParts.length > 1) {
    const translatedParts = uniqueValues(
      slashParts.map((part) => translateVocabularyTerm(part, translations, pos)),
    );

    if (translatedParts.length > 0) {
      return translatedParts.slice(0, 3).join("；");
    }
  }

  const phraseParts = term.split(/\s+/).filter(Boolean);
  if (phraseParts.length > 1) {
    const translatedParts = uniqueValues(
      phraseParts
        .map((part) => lookupTranslation(part, translations))
        .filter(Boolean),
    );

    if (translatedParts.length > 0) {
      return translatedParts.slice(0, 3).join("；");
    }
  }

  return fallbackChineseGloss(term, pos);
}

function lookupTranslation(term, translations) {
  for (const key of candidateLookupKeys(term)) {
    const translation = translations.get(key);

    if (translation) {
      return translation;
    }
  }

  return "";
}

function candidateLookupKeys(term) {
  const normalized = normalizeLookupKey(term);
  const keys = new Set([normalized]);

  keys.add(normalized.replaceAll("-", " "));
  keys.add(normalized.replaceAll(" ", "-"));
  keys.add(normalized.replace(/\s*\([^)]*\)\s*/g, " ").replace(/\s+/g, " ").trim());

  if (normalized === "ok") {
    keys.add("okay");
    keys.add("o.k.");
  }

  for (const part of normalized.split(/\s*\/\s*/)) {
    if (part) keys.add(part);
  }

  for (const key of [...keys]) {
    if (key.endsWith("ies") && key.length > 4) keys.add(`${key.slice(0, -3)}y`);
    if (key.endsWith("es") && key.length > 4) keys.add(key.slice(0, -2));
    if (key.endsWith("s") && key.length > 3) keys.add(key.slice(0, -1));
  }

  return [...keys].filter(Boolean);
}

function normalizeLookupKey(value) {
  return value
    .toLowerCase()
    .replace(/\bo\.k\.\b/g, "ok")
    .replace(/[’']/g, "'")
    .replace(/\s*\/\s*/g, " / ")
    .replace(/\s+/g, " ")
    .replace(/[.;:,!?)]+$/g, "")
    .trim();
}

function cleanTranslation(value) {
  const parts = value
    .replaceAll("\\r\\n", "\n")
    .replaceAll("\\n", "\n")
    .replace(/\[[^\]]+\]/g, "")
    .split(/[\n;；,，]/)
    .map((part) => part
      .replace(/^(?:abbr|adj|adv|art|aux|conj|det|int|n|num|pl|prep|pron|v|vi|vt|a)\.\s*/i, "")
      .replace(/^[（(][^)）]+[)）]\s*/, "")
      .trim())
    .filter((part) => /[\u4e00-\u9fff]/.test(part))
    .filter((part) => !part.startsWith("网络"))
    .filter((part) => !part.includes("待补充"));

  return uniqueValues(parts)
    .slice(0, 3)
    .join("；")
    .replace(/\s+/g, " ")
    .trim();
}

function uniqueValues(values) {
  const seen = new Set();
  const result = [];

  for (const value of values) {
    const cleaned = String(value ?? "").trim();
    if (!cleaned || seen.has(cleaned)) continue;
    seen.add(cleaned);
    result.push(cleaned);
  }

  return result;
}

function fallbackChineseGloss(term, pos = "") {
  const theme = inferTheme(term, pos);

  return `${themeChineseLabels[theme] ?? "PET"}相关词汇`;
}

function assertCompleteChineseGlosses(vocabulary) {
  const invalid = vocabulary.filter(
    (word) =>
      !word.chineseGloss ||
      word.chineseGloss.includes("Cambridge B1/PET 官方词表") ||
      word.chineseGloss.includes("中文释义待补充") ||
      !/[\u4e00-\u9fff]/.test(word.chineseGloss),
  );

  if (invalid.length > 0) {
    throw new Error(
      `Generated vocabulary has ${invalid.length} invalid Chinese glosses: ${invalid
        .slice(0, 10)
        .map((word) => word.term)
        .join(", ")}`,
    );
  }
}

const themeChineseLabels = {
  actions: "动作",
  animals: "动物",
  clothing: "服装",
  communication: "交流",
  entertainment: "娱乐",
  family: "家庭",
  feelings: "情绪",
  food: "饮食",
  grammar: "语法",
  health: "健康",
  home: "家居",
  ideas: "概念",
  materials: "材料",
  money: "金钱",
  nature: "自然",
  numbers: "数字",
  objects: "物品",
  people: "人物",
  places: "地点",
  qualities: "性质",
  school: "学校",
  shopping: "购物",
  society: "社会",
  sport: "运动",
  technology: "科技",
  time: "时间",
  transport: "交通",
  travel: "旅行",
  work: "工作",
};

const chineseGlossOverrides = new Map(Object.entries({
  "a / an": "不定冠词；一个",
  "air conditioning": "空调",
  "all right / alright": "好的；没问题",
  "am": "是；上午",
  "can": "能够；可以",
  "cd": "光盘",
  "cheers": "谢谢；干杯",
  "congratulations": "祝贺；恭喜",
  "did": "do 的过去式",
  "does": "do 的第三人称单数",
  "dvd": "数字视频光盘",
  "had": "have 的过去式",
  "has": "have 的第三人称单数",
  "it": "它；它是",
  "license": "执照；许可证",
  "may": "可以；可能",
  "mr": "先生",
  "mrs": "夫人；太太",
  "ms": "女士",
  "must": "必须",
  "natural": "自然的；天然的",
  "ok": "好的；可以",
  "ought": "应该",
  "p.m": "下午；晚上",
  "pc": "个人电脑",
  "school": "学校",
  "shall": "将要；应该",
  "sunny": "晴朗的",
  "tv": "电视",
  "used to": "过去常常",
  "was": "是；be 的过去式",
  "webcam": "网络摄像头",
  "were": "是；be 的过去式",
  "will": "将要；会",
  "would": "将会；愿意",
}));

function writeGeneratedVocabulary(vocabulary) {
  fs.mkdirSync(path.dirname(generatedVocabularyPath), { recursive: true });
  fs.writeFileSync(
    generatedVocabularyPath,
    `${JSON.stringify(vocabulary, null, 2)}\n`,
  );
}

function writeGeneratedExamples() {
  execFileSync(process.execPath, ["scripts/generate-pet-word-examples.mjs"], {
    stdio: "inherit",
  });
}

function importWords(db, vocabulary) {
  const now = new Date().toISOString();
  const statement = db.prepare(`
    INSERT INTO word_bank
      (id, household_id, term, chinese_gloss, theme, source, created_at, updated_at)
    VALUES
      (?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(household_id, term) DO UPDATE SET
      chinese_gloss = excluded.chinese_gloss,
      theme = excluded.theme,
      source = excluded.source,
      updated_at = excluded.updated_at
  `);

  db.exec("BEGIN");
  try {
    db.prepare("DELETE FROM word_bank WHERE household_id = ? AND (source LIKE 'cambridge-b1-preliminary-vocabulary-list%' OR source = 'demo')").run(householdId);

    for (const word of vocabulary) {
      statement.run(
        `word-cambridge-${hashString(word.term)}-${slugify(word.term)}`,
        householdId,
        word.term,
        word.chineseGloss,
        word.theme,
        word.source,
        now,
        now,
      );
    }
    db.exec("COMMIT");
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
}

function ensureReferenceSchema(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS word_bank (
      id TEXT PRIMARY KEY,
      household_id TEXT NOT NULL,
      term TEXT NOT NULL,
      chinese_gloss TEXT NOT NULL,
      theme TEXT NOT NULL,
      source TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      UNIQUE(household_id, term)
    );
  `);
}

function importPart2Scenes(db, scenes) {
  const now = new Date().toISOString();
  const statement = db.prepare(`
    INSERT OR REPLACE INTO prompts
      (id, household_id, title, question, part, image_url, enabled, created_at, updated_at)
    VALUES
      (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  db.exec("BEGIN");
  try {
    for (const scene of scenes) {
      statement.run(
        `part-2-${slugify(scene.title)}`,
        householdId,
        scene.title,
        "Look at the picture and describe what the people are doing.",
        "part_2",
        createSceneImageDataUrl(scene),
        1,
        now,
        now,
      );
    }
    db.exec("COMMIT");
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
}

function buildPart2Scenes() {
  return [
    ["Park football", "#d9ecff", "#85c77a", "#db6d55"],
    ["Classroom project", "#f6efe5", "#86b7d6", "#e7a45f"],
    ["Family kitchen", "#fff3c9", "#74a57f", "#d96c5f"],
    ["Sports day", "#e4f2ff", "#66b37a", "#557bb6"],
    ["Library study", "#eef0f7", "#c7a77b", "#5e7fb5"],
    ["Cafe conversation", "#fff0dd", "#b9c98a", "#c45d4d"],
    ["Bus stop", "#e7f3ff", "#8bb38d", "#3d6f99"],
    ["School corridor", "#f4f4ea", "#9bbad3", "#be7a4c"],
    ["Shopping centre", "#f7ecff", "#b5c89a", "#8d65b8"],
    ["Beach picnic", "#dff3ff", "#e8c36f", "#5b9ecb"],
    ["Museum visit", "#efe7dc", "#a8b1ba", "#915c45"],
    ["Swimming pool", "#d8f2ff", "#6db7c7", "#4b78a8"],
    ["Birthday party", "#fff1f7", "#b7c66b", "#dd7aa5"],
    ["Train station", "#e8eef4", "#9ba8b5", "#d19a52"],
    ["Computer lesson", "#edf5ff", "#7da6c8", "#65a06a"],
    ["Music practice", "#fff3df", "#b0a2ca", "#d36b5b"],
    ["Doctor waiting room", "#eef7f1", "#a2c6bd", "#587da5"],
    ["Art class", "#f8efe5", "#8bbd88", "#d28b47"],
    ["Rainy street", "#dce7f2", "#7d8da1", "#e0b34d"],
    ["Camping trip", "#e8f5dd", "#6eac69", "#c87b4a"],
    ["Zoo visit", "#e8f3dc", "#88b76f", "#5a8ab8"],
    ["Science lab", "#eef4f8", "#9ec2cc", "#d76558"],
    ["Garden work", "#e9f6df", "#78b66f", "#c98748"],
    ["Airport check-in", "#edf2fb", "#9ca8c0", "#5e83bd"],
    ["Bookshop", "#f6ecdf", "#b59572", "#587a9b"],
    ["Cinema queue", "#ebe7f7", "#a999c8", "#d27a55"],
    ["Restaurant meal", "#fff1e5", "#b0c58a", "#c95b54"],
    ["Cycling path", "#dff2ff", "#79bd7a", "#6a89c4"],
    ["Clothes shop", "#fff0f0", "#c8a3b0", "#5b82a8"],
    ["Farm visit", "#e7f6dc", "#83b96b", "#b56f42"],
  ].map(([title, sky, ground, accent]) => ({ title, sky, ground, accent }));
}

function createSceneImageDataUrl(scene) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="900" height="620" viewBox="0 0 900 620">
      <rect width="900" height="620" fill="${scene.sky}"/>
      <rect y="410" width="900" height="210" fill="${scene.ground}"/>
      <circle cx="750" cy="105" r="48" fill="#f3ca5f" opacity="0.92"/>
      <rect x="95" y="145" width="235" height="150" rx="18" fill="#ffffff" stroke="#2d425a" stroke-width="7"/>
      <line x1="125" y1="190" x2="300" y2="190" stroke="${scene.accent}" stroke-width="13" stroke-linecap="round"/>
      <line x1="125" y1="235" x2="265" y2="235" stroke="#6d7f8f" stroke-width="11" stroke-linecap="round"/>
      <circle cx="455" cy="273" r="35" fill="#efb88f"/>
      <rect x="420" y="306" width="72" height="98" rx="20" fill="${scene.accent}"/>
      <line x1="430" y1="342" x2="365" y2="382" stroke="#6b3b2a" stroke-width="14" stroke-linecap="round"/>
      <line x1="488" y1="342" x2="555" y2="382" stroke="#6b3b2a" stroke-width="14" stroke-linecap="round"/>
      <line x1="438" y1="402" x2="405" y2="500" stroke="#2d425a" stroke-width="17" stroke-linecap="round"/>
      <line x1="475" y1="402" x2="510" y2="500" stroke="#2d425a" stroke-width="17" stroke-linecap="round"/>
      <circle cx="640" cy="292" r="32" fill="#f2c29d"/>
      <rect x="610" y="324" width="65" height="96" rx="18" fill="#5d8cc1"/>
      <line x1="616" y1="356" x2="560" y2="402" stroke="#70402c" stroke-width="13" stroke-linecap="round"/>
      <line x1="669" y1="356" x2="730" y2="390" stroke="#70402c" stroke-width="13" stroke-linecap="round"/>
      <ellipse cx="715" cy="450" rx="54" ry="20" fill="#ffffff" stroke="#2d425a" stroke-width="5"/>
      <rect x="160" y="410" width="130" height="70" rx="10" fill="#b77a4d"/>
      <rect x="190" y="350" width="70" height="62" rx="8" fill="#d9a15f"/>
      <text x="450" y="570" text-anchor="middle" font-family="Arial" font-size="34" font-weight="700" fill="#24496c">${escapeXml(scene.title)}</text>
    </svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function slugify(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

function hashString(value) {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return (hash >>> 0).toString(36);
}

function inferTheme(term, pos = "") {
  const lower = term.toLowerCase();
  const tokens = lower.split(/[^a-z]+/).filter(Boolean);
  const tokenSet = new Set(tokens);
  const hasToken = (...items) => items.some((item) => tokenSet.has(item));
  const hasText = (...items) => items.some((item) => lower.includes(item));

  if (getGrammarTerms().has(lower)) return "grammar";
  if (hasToken("one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "hundred", "thousand", "million", "number", "count", "percent", "metre", "meter", "kilometre", "mile", "gram", "kilo", "litre", "liter", "half", "quarter", "double", "single", "pair", "total", "amount", "average", "score", "point", "degree", "temperature", "depth", "height", "weight", "size", "shape", "circle", "square")) return "numbers";
  if (hasToken("school", "class", "classroom", "teacher", "student", "pupil", "homework", "subject", "exam", "examination", "library", "lesson", "college", "university", "course", "study", "studies", "project") || hasText("headteacher", "primary school")) return "school";
  if (hasToken("family", "mother", "mum", "father", "dad", "parent", "brother", "sister", "cousin", "grandfather", "grandmother", "grandparent", "uncle", "aunt", "husband", "wife", "daughter", "son", "relative", "married", "teenager")) return "family";
  if (hasToken("food", "bread", "cake", "coffee", "tea", "restaurant", "meal", "fruit", "vegetable", "breakfast", "lunch", "dinner", "supper", "sandwich", "burger", "pizza", "bean", "egg", "cheese", "chicken", "meat", "fish", "rice", "potato", "salad", "soup", "sugar", "salt", "jam", "juice", "water", "drink", "hungry", "thirsty") || hasText("french fries", "ice cream")) return "food";
  if (hasToken("airport", "passport", "hotel", "hostel", "tourist", "tourism", "holiday", "vacation", "journey", "trip", "abroad", "travel", "traveller", "guide", "guided", "camping", "sightseeing", "luggage", "suitcase", "map", "ticket", "reserve", "reservation")) return "travel";
  if (hasToken("bus", "train", "tram", "taxi", "car", "lorry", "truck", "motorcycle", "motorbike", "bicycle", "bike", "cycling", "aeroplane", "airplane", "plane", "flight", "boat", "ship", "ferry", "underground", "subway", "motorway", "road", "traffic", "station", "platform", "transport")) return "transport";
  if (hasToken("sport", "football", "tennis", "swimming", "swim", "basketball", "volleyball", "baseball", "gym", "gymnastics", "athlete", "athletics", "race", "racing", "skiing", "skate", "skating", "hockey", "rugby", "golf", "yoga", "match", "team", "coach", "player", "pool")) return "sport";
  if (hasToken("job", "work", "office", "manager", "doctor", "engineer", "assistant", "accountant", "actor", "actress", "artist", "business", "businessman", "businesswoman", "career", "chef", "dentist", "designer", "factory", "farmer", "journalist", "lawyer", "mechanic", "nurse", "pilot", "police", "secretary", "staff", "worker", "profession", "professional", "meeting", "email", "cv")) return "work";
  if (hasToken("animal", "bird", "cat", "dog", "horse", "zebra", "fish", "insect", "bee", "ant", "bear", "cow", "duck", "elephant", "giraffe", "lion", "monkey", "mouse", "penguin", "puppy", "rabbit", "snake", "tiger", "wildlife")) return "animals";
  if (hasToken("environment", "forest", "river", "lake", "sea", "ocean", "weather", "rain", "rainy", "sun", "sunny", "snow", "wind", "windy", "cloud", "cloudy", "thunder", "mountain", "beach", "tree", "flower", "grass", "plant", "garden", "farm", "field", "hill", "island", "nature", "natural", "recycle", "recycled", "pollution", "planet", "earth", "sky", "star", "moon", "season", "crop", "climate", "environmental", "waste", "dust", "dusty")) return "nature";
  if (hasToken("house", "home", "flat", "apartment", "room", "kitchen", "bathroom", "bedroom", "garden", "garage", "furniture", "chair", "table", "desk", "bed", "sofa", "door", "window", "wall", "floor", "roof", "cupboard", "fridge", "mirror", "shower", "lamp", "carpet", "blanket", "shelf", "key", "hall", "bath", "cushion", "fork", "bottle", "toothpaste", "housework", "cottage", "property")) return "home";
  if (hasToken("shop", "shopping", "store", "market", "supermarket", "mall", "customer", "buy", "bought", "sell", "sold", "sale", "price", "cheap", "expensive", "cash", "cost", "pay", "paid", "receipt", "order", "parcel", "queue", "size")) return "shopping";
  if (hasToken("bank", "money", "cash", "coin", "dollar", "euro", "pound", "cent", "percent", "account", "bill", "budget", "borrow", "lend", "save", "worth", "value", "afford")) return "money";
  if (hasToken("body", "head", "face", "eye", "ear", "nose", "mouth", "tooth", "teeth", "neck", "shoulder", "arm", "hand", "finger", "leg", "knee", "foot", "feet", "heart", "blood", "ache", "pain", "hurt", "ill", "sick", "medicine", "clinic", "hospital", "doctor", "nurse", "healthy", "health", "fit", "pregnant", "accident", "emergency", "rescue")) return "health";
  if (hasToken("computer", "laptop", "tablet", "phone", "mobile", "camera", "video", "dvd", "cd", "player", "pc", "it", "internet", "website", "online", "screen", "keyboard", "mouse", "software", "app", "application", "digital", "electronic", "technology", "download", "upload", "password", "file")) return "technology";
  if (hasToken("music", "song", "soundtrack", "film", "movie", "cinema", "theatre", "concert", "stage", "show", "television", "tv", "radio", "programme", "program", "party", "festival", "museum", "gallery", "art", "painting", "paint", "draw", "drawing", "dance", "dancing", "drama", "game", "toy", "hobby", "magazine", "newspaper", "book", "story", "novel", "poem", "club", "pop", "comic", "detective", "character", "superhero", "firework", "audience", "series", "mystery", "imagination", "talent", "chapter", "headline")) return "entertainment";
  if (hasToken("clothes", "clothing", "shirt", "t-shirt", "jeans", "trousers", "dress", "skirt", "coat", "jacket", "shoe", "shoes", "boot", "hat", "cap", "glove", "sock", "underwear", "uniform", "wear", "wore", "worn", "bracelet", "ring", "necklace", "fashion", "swimsuit", "underpants", "tracksuit", "handbag", "sweatshirt", "well-dressed")) return "clothing";
  if (hasToken("cotton", "wood", "wooden", "metal", "plastic", "glass", "paper", "card", "stone", "gold", "silver", "leather", "wool", "oil", "liquid", "material", "object", "equipment", "tool", "goods", "display", "blank", "lighter")) return "materials";
  if (hasToken("time", "hour", "minute", "second", "day", "week", "month", "year", "morning", "afternoon", "evening", "night", "today", "tomorrow", "yesterday", "soon", "early", "late", "recently", "immediately", "already", "still", "while", "during", "before", "after", "afterwards", "until", "a.m", "p.m", "am", "pm", "overnight", "occasion", "birthday", "season", "age", "aged", "ages")) return "time";
  if (hasToken("happy", "sad", "angry", "afraid", "ashamed", "bored", "boring", "excited", "exciting", "worried", "nervous", "proud", "surprised", "tired", "comfortable", "uncomfortable", "fear", "fun", "funny", "hope", "hopeless", "wish", "prefer", "like", "love", "hate", "trust", "pleased", "glad", "mad", "horrible", "shocking", "confused", "mood", "lonely", "unpleasant", "awful", "danger", "stress", "surprise", "peace", "mind", "bother")) return "feelings";
  if (hasToken("say", "tell", "talk", "speak", "spoken", "ask", "answer", "question", "reply", "thank", "letter", "message", "call", "conversation", "discuss", "explain", "describe", "description", "announce", "announcement", "advert", "advertise", "advertisement", "advice", "advise", "accent", "language", "sentence", "word", "meaning", "grammar", "pronounce", "pronunciation", "mention", "enquiry", "interview", "recommend", "review", "note", "detail", "understand", "confirm")) return "communication";
  if (hasToken("person", "people", "man", "woman", "boy", "girl", "child", "children", "adult", "baby", "friend", "neighbour", "male", "female", "queen", "king", "mr", "mrs", "ms", "madam", "group", "crowd", "member", "role", "hero")) return "people";
  if (hasToken("city", "town", "village", "country", "australia", "street", "square", "park", "place", "building", "centre", "center", "corner", "entrance", "exit", "address", "area", "region", "world", "north", "south", "east", "west", "location", "neighbourhood", "public")) return "places";
  if (hasToken("government", "politics", "politician", "policeman", "policewoman", "law", "rule", "public", "national", "international", "industry", "company", "agency", "trade", "custom", "customs", "admission", "relationship", "community", "society", "culture", "traditional")) return "society";
  if (hasToken("big", "small", "large", "little", "long", "short", "high", "low", "old", "new", "young", "good", "bad", "great", "important", "interesting", "difficult", "easy", "possible", "impossible", "able", "accurate", "active", "advanced", "acceptable", "beautiful", "colourful", "comfortable", "different", "same", "special", "responsible", "shiny", "rough", "broken", "messy", "foreign", "traditional", "plain", "strong", "suitable", "unexpected", "frequent", "equal", "empty", "alive", "ready", "creative", "direct", "slow", "powerful", "likely", "lively", "written", "disabled")) return "qualities";
  if (getActionTerms().has(tokens[0] ?? lower) || hasToken("identify", "sort", "confirm", "attract", "arrange", "repair", "serve", "contain", "divide", "gain", "steal", "behave", "laugh", "fly", "update", "beat", "detect")) return "actions";
  if (hasText("tion", "ment", "ness", "ity", "ship", "ance", "ence") || hasToken("ability", "ambition", "case", "method", "reason", "result", "matter", "secret", "appearance", "power")) return "ideas";

  if (pos === "v" || pos === "mv" || pos === "av") return "actions";
  if (pos === "adj") return "qualities";
  if (pos === "adv" || pos === "ad" || pos === "prep" || pos === "pron" || pos === "det" || pos === "conj" || pos === "exclam") return "grammar";
  if (pos === "phr") return "communication";
  if (pos === "n" || pos === "pl" || pos === "abbrev") return "objects";

  return "ideas";
}

var grammarTermsCache;
function getGrammarTerms() {
  grammarTermsCache ??= new Set([
  "a / an", "a.m", "p.m", "about", "above", "across", "after", "against", "all", "almost", "along", "already",
  "also", "although", "always", "am", "among", "an", "and", "another", "any", "anybody", "anyone",
  "anything", "around", "as", "as long as", "at", "back", "because", "before", "behind", "below",
  "beside", "between", "both", "but", "by", "can", "could", "did", "do", "does", "during", "each",
  "either", "else", "enough", "especially", "even", "ever", "every", "everybody", "everyone",
  "everything", "except", "few", "for", "from", "had", "has", "have", "he", "her", "hers", "herself",
  "him", "himself", "his", "how", "however", "i", "if", "in", "inside", "instead", "into", "it", "its",
  "itself", "just", "less", "many", "may", "me", "might", "mine", "more", "most", "much", "must", "my",
  "myself", "near", "nearly", "neither", "never", "no", "nobody", "none", "nor", "not", "nothing",
  "of", "off", "often", "on", "once", "one", "only", "or", "other", "ought", "our", "ours", "ourselves",
  "out", "outside", "over", "own", "quite", "rather", "shall", "she", "should", "since", "so", "some",
  "somebody", "someone", "something", "still", "such", "than", "that", "the", "their", "theirs", "them",
  "themselves", "then", "there", "therefore", "these", "they", "this", "those", "through", "to", "too",
  "under", "unless", "until", "up", "us", "used to", "very", "via", "was", "we", "were", "what",
  "whatever", "when", "where", "whether", "which", "while / whilst", "who", "whoever", "whole", "whom",
  "whose", "why", "will", "with", "within", "without", "would", "yet", "you", "your", "yours", "yourself",
  "yourselves",
  ]);

  return grammarTermsCache;
}

var actionTermsCache;
function getActionTerms() {
  actionTermsCache ??= new Set([
  "accept", "accompany", "achieve", "act", "add", "admire", "admit", "advance", "affect", "agree",
  "allow", "appear", "apply", "arrive", "avoid", "become", "begin", "believe", "bring", "build",
  "carry", "catch", "change", "choose", "collect", "come", "complete", "continue", "create", "decide",
  "develop", "discover", "do", "drop", "end", "enter", "expect", "fail", "fall", "feel", "find",
  "finish", "follow", "forget", "get", "give", "go", "grab", "grow", "guess", "happen", "help",
  "hold", "include", "join", "keep", "know", "leave", "let", "look", "lose", "make", "manage", "move",
  "need", "offer", "open", "pick", "plan", "prepare", "put", "quit", "reach", "receive", "remember",
  "return", "run", "seem", "send", "set", "show", "start", "stay", "stop", "take", "try", "turn",
  "use", "visit", "wait", "walk", "want", "watch", "win", "write",
  ]);

  return actionTermsCache;
}

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

main();
