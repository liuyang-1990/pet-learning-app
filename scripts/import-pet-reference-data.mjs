import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

const householdId = "default-household";
const sourceUrl = "https://www.cambridgeenglish.org/Images/506887-b1-preliminary-vocabulary-list.pdf";
const dbPath = path.resolve(process.cwd(), process.env.DATABASE_PATH ?? "./data/pet-learning.sqlite");
const tempDir = path.join(os.tmpdir(), "pet-learning-seed");
const pdfPath = path.join(tempDir, "b1-preliminary-vocabulary-list.pdf");
const pythonPackagesPath = path.join(tempDir, "python-packages");

fs.mkdirSync(tempDir, { recursive: true });
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

downloadVocabularyPdf();
const words = extractVocabularyWords();
const scenes = buildPart2Scenes();
const db = new DatabaseSync(dbPath);

try {
  importWords(db, words);
  importPart2Scenes(db, scenes);
} finally {
  db.close();
}

console.log(`Imported ${words.length} Cambridge B1 Preliminary vocabulary items.`);
console.log(`Imported ${scenes.length} PET-style Speaking Part 2 image prompts.`);
console.log(`Database: ${dbPath}`);

function downloadVocabularyPdf() {
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

        match = re.match(rf"^(.+?)\s+\((?=[^)]*\b{parts}\b)[^)]+\)", line, re.I)
        if not match:
            continue

        term = match.group(1).strip()
        term = re.sub(r"\([^)]*\)", "", term)
        term = re.sub(r"\s*/\s*", " / ", term)
        term = re.sub(r"\s+", " ", term).strip(" -–—")

        if "/" in term and len(term.split("/")) > 3:
            continue
        if not re.search(r"[a-zA-Z]", term):
            continue
        if len(term) < 2 or len(term) > 45:
            continue
        if term.lower() in {"preliminary", "vocabulary", "list"}:
            continue

        terms.append(term)

seen = set()
unique_terms = []
for term in terms:
    key = term.lower()
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

function importWords(db, words) {
  const now = new Date().toISOString();
  const today = toDateKey(new Date());
  const statement = db.prepare(`
    INSERT INTO weak_words
      (id, household_id, term, chinese_gloss, review_stage, due_on, mastered, source, created_at, updated_at)
    VALUES
      (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(household_id, term) DO UPDATE SET
      chinese_gloss = COALESCE(weak_words.chinese_gloss, excluded.chinese_gloss),
      updated_at = excluded.updated_at
  `);

  db.exec("BEGIN");
  try {
    for (const word of words) {
      statement.run(
        `word-cambridge-${hashString(word)}-${slugify(word)}`,
        householdId,
        word,
        "Cambridge B1/PET 官方词表",
        "new",
        today,
        0,
        "cambridge-b1-preliminary-vocabulary-list-2025",
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

function toDateKey(date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");

  return `${year}-${month}-${day}`;
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

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
