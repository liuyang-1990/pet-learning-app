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
  // These time and number examples use valid contextual senses or synonyms.
  "ages", // a very long time, not people's ages
  "day", // day / 日 / 一天
  "occasion", // one occurrence / one occasion
  "second", // a brief moment / second, not ordinal "second"
  "week", // week / 周 / 星期
  "intwo", // split into two pieces
  // These sport and measurement examples use valid contextual senses or synonyms.
  "player", // an athlete / player, not a video-game player
  "pool", // the cue sport, not a swimming pool
  "amount", // quantity, not an amount of money
  "degree", // a temperature degree, not an academic degree
  "double", // twice the distance
  "kilometre", // kilometre / 公里 / 千米
  "number", // a race number, not quantity
  "point", // a point in a score
  "quarter", // one period of a game
  // These place examples use valid contextual senses or Chinese synonyms.
  "area", // a district / area, not surface area
  "location", // a suitable place / location
  "neighbourhood", // local community / neighbourhood
  "takeplace", // an event being held, not merely happening
  // These clothing and materials examples use valid contextual senses or Chinese synonyms.
  "boot", // footwear, not starting a computer
  "clothing", // clothing / garments
  "ring", // jewellery, not a circular shape
  "wear", // have clothing on, not become worn
  "display", // a museum exhibition, not a screen
  "goods", // merchandise / products
  "object", // a physical item, not an abstract object
  // Google's isolated gloss remained untranslated; both sentence directions match.
  "headteacher",
  "land",
  // These work and society examples use valid contextual senses or Chinese synonyms.
  "business", // a commercial activity / business
  "mechanic", // car mechanic / repair worker
  "onbusiness", // travelling for work / on business
  "police", // the police as an organisation investigating a theft
  "workout", // calculate / figure out, not exercise
  "custom", // a local tradition, not a customised product
  // Both sentence directions preserve the harbour painting meaning.
  "painting",
  // These entertainment examples use valid contextual senses or Chinese synonyms.
  "character", // a person in a story, not personality
  "mystery", // mystery / riddle
  "paint", // apply colour, not the noun "paint"
  "show", // a talent performance, not the verb "display"
  "showup", // arrive / appear
  "soundtrack", // film music / original soundtrack
  // Google's isolated gloss remained untranslated; both sentence directions match 青少年.
  "teenager",
  // These food and dining examples use valid synonyms or contextual senses.
  "drink", // a beverage, not the verb "to drink"
  "potato", // potato / 马铃薯 / 土豆
  "cooker", // stove / cooking appliance
  // These shopping and money examples use valid synonyms or contextual senses.
  "cost", // price / amount something costs
  "inorder", // arranged by size / in size order
  "mall", // shopping centre / mall
  "sell", // sell / offer for sale
  "change", // money returned by a cashier, not transformation
  "cheque", // bank cheque; isolated Google gloss incorrectly chose "check"
  // These technology and communication examples use valid Chinese synonyms.
  "phone", // phone / mobile phone
  "detail", // detail / detailed information
  // These communication examples use valid contextual senses or Chinese synonyms.
  "baseon", // use information as the basis for an answer
  "breakdown", // a car stops working, not an emotional collapse
  "chillout", // relax, not only calm down
  "knockdown", // demolish a wall, not knock over a person
  "passon", // relay a message
  "review", // study notes again, not write a critical review
  "understand", // understand / comprehend
  "studies", // school or university work, not research projects
  // These ideas examples use valid contextual senses or Chinese synonyms.
  "addition", // a useful new facility, not arithmetic
  "ambition", // a positive career aspiration, not excessive ambition
  "argument", // a disagreement, not a formal line of reasoning
  "case", // a particular situation, not a legal case or container
  "competition", // an organised contest, not competition as a general force
  "composition", // a school essay, not the structure of an object
  "condition", // physical state, not a requirement
  "congratulations", // congratulations / best wishes
  "difference", // difference / distinction
  "expedition", // an organised research journey, not a military campaign
  // These second-batch ideas examples use valid contextual senses or Chinese synonyms.
  "fiction", // an invented story, not only a novel as a physical genre
  "fitness", // physical condition, not a fitness activity
  "happiness", // happiness / joy
  "identification", // proof of identity, not the act of recognising something
  "incase", // as a precaution / in case
  "introduction", // an introductory section, not introducing a person
  "operation", // a medical procedure, not operating a machine
  "performance", // a live musical performance, not general performance quality
  "pity", // regret / what a shame
  // These ideas-tail and grammar examples use valid contextual senses or Chinese synonyms.
  "registration", // online registration / sign-up
  "romance", // a love story, not romance as an abstract feeling
  "silence", // complete quiet, not refusing to speak
  "absolutely", // completely / absolutely
  "across", // crossing a bridge from one side to the other
  "against", // leaning on a surface, not opposing something
  "alike", // similar in appearance
  "all", // every member of the student group
  "also", // also / in addition
  // These second-batch grammar examples use valid contextual senses or Chinese synonyms.
  "apart", // separated by a measured distance
  "around", // following a route around the lake
  "aswell", // also / too
  "atlast", // finally, after waiting
  "away", // a measured travel time from here
  "beyond", // on the farther side of the bridge
  "by", // travelling by means of a train
  "certainly", // definitely / certainly
  "cheers", // informal British thanks, not a toast
  // These third-batch grammar examples use valid contextual senses or Chinese synonyms.
  "definitely", // definitely / certainly
  "dozen", // exactly twelve, expressed as 一打
  "either", // either one of two choices
  "else", // something additional, not "otherwise"
  "eventhough", // although / even though
  "everybody", // everybody / everyone
  "everyone", // everyone / each person
  "exactly", // at precisely ten o'clock
  "extremely", // extremely / very
  "fairly", // moderately / quite, not in a fair manner
  "few", // a small number of students
  "finally", // eventually / at last
  "frequently", // at short intervals / frequently
  "from", // the starting point of a journey
  "further", // additional information, not greater distance
  "generally", // usually / in general
  // These fourth-batch grammar examples use valid contextual senses or Chinese synonyms.
  "hey", // hey / hi, expressed naturally as 嗨 rather than Google's 嘿
  "hi", // hi / hello, expressed as 你好 rather than Google's 嗨
  "incredibly", // an intensifier meaning extremely / 非常 in this sentence
  "instead", // choosing walking as the alternative / 改为步行
  "itself", // the reflexive sense "by itself" / 自己
  "just", // the recent-perfect sense / 刚刚, not "only"
  // These fifth-batch grammar examples use valid contextual senses or Chinese synonyms.
  "no", // the determiner sense "no milk" / 没有牛奶, not the isolated negative 不
  "none", // not one of the keys / 一个也没有
  "nowhere", // no place to sit / 没有地方坐
  "ohdear", // the exclamation 哎呀 / oh dear, not a term of address
  "only", // the restrictive determiner 只有, not merely 仅 as an isolated adverb
  "other", // the other member of a pair / 另一个
  "outof", // movement from inside a bag / 从...里面, not "because of"
  "own", // the possessive adjective 自己的, not the verb "possess"
  "particularly", // especially / 尤其
  // These sixth-batch grammar examples use valid contextual senses or grammar labels.
  "shall", // the suggestion form "shall we" / 要不要
  "such", // the degree construction "such a beautiful day" / 如此
  "terribly", // the intensifier "terribly sorry" / 非常, not "in a terrible way"
  "the", // the definite-article grammar label 定冠词; Chinese naturally omits it in the sentence
  // These seventh-batch grammar examples use valid contextual senses or Chinese synonyms.
  "too", // excessive degree / 太, not the additive sense "also"
  "usedto", // past habit / 过去常常, not "be accustomed to"
  "v", // versus in a sports fixture / 对阵
  "when", // the question word 什么时候, not only the conjunction "when"
  "whenever", // at any time / 无论何时
  "which", // selecting one bus / 哪一辆
  "with", // accompaniment / 和...一起
  "would", // the polite offer "would you like" / 想要
  // These transport and travel examples use valid synonyms or contextual senses.
  "bus", // bus / public bus
  "flight", // scheduled flight, not flight in general
  "guide", // a tour guide, not a guidebook
  "reserve", // book a seat, not keep in reserve
  // These health examples use valid synonyms or context-dependent senses.
  "byaccident", // accidentally / unintentionally
  "hurt", // feel pain, not only become injured
  "medicine", // medication, not only the field of medicine
  "sick", // nauseous / feeling ill
  "unfit", // physically out of condition, not unsuitable
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
  // These first-batch objects examples use valid contextual senses or symbols.
  "atsymbol", // at sign / @ symbol; isolated Google gloss mistranslates it as a location phrase
  "baker", // a person who makes or sells bread; isolated Google gloss treats it as the surname Baker
  // These second-batch objects examples use valid contextual senses of polysemous words.
  "bargain", // a cheap purchase / good deal, not the verb "negotiate"
  "bat", // sports equipment, not the animal
  "board", // a classroom writing board, not a company board
  "branch", // part of a tree, not a bank branch
  // These third-batch objects examples use valid contextual senses of polysemous words.
  "bush", // a shrub, not the surname Bush
  "cab", // a taxi, not a vehicle driver's compartment
  // These fifth-batch objects examples use valid contextual noun senses.
  "court", // a sports court, not a law court
  "crash", // a car accident, not a computer crash
  "crossing", // a pedestrian crossing, not the gerund "crossing"
  "cruise", // a holiday by ship, not the verb "cruise"
  "cut", // a small wound, not the verb "cut"
  // These sixth-batch objects examples use valid synonyms or contextual noun senses.
  "doll", // doll / toy figure, expressed naturally as 玩偶 rather than Google's 娃娃
  "license", // a driver's license; 执照 and 许可证 are valid contextual synonyms
  "entry", // museum admission / entry, not a dictionary entry
  "episode", // one episode of a show, not a plot incident
  "event", // a sports event / organised activity, not only a generic incident
  // These seventh-batch objects examples use valid contextual noun senses.
  "fare", // bus fare / ticket price, expressed as 车费 in context
  "fault", // responsibility for a problem, not a mechanical fault
  "favour", // do someone a favour / help, not preference
  "fight", // a physical fight, naturally expressed as 打架
  "figure", // a number in reported data, not a picture or body shape
  "firm", // a company, not the adjective "firm"
  "form", // a document to fill in, not shape or type
  "gap", // a small physical opening, not an abstract difference
  // These eighth-batch objects examples use valid contextual senses or synonyms.
  "grade", // a school mark / grade, not only a level
  "grant", // a noun meaning funding, not the verb "grant"
  "handwriting", // handwriting / written script, naturally expressed as 笔迹
  "heater", // a room heater / heating device, naturally expressed as 暖气 in context
  "hit", // a popular song, not the verb "hit"
  // These ninth-batch objects examples use valid contextual senses or synonyms.
  "hurry", // the noun phrase "in a hurry", not the imperative "hurry!"
  "ingredient", // ingredient / cake material, expressed as 原料 in context
  "initial", // a first letter, not the adjective "initial"
  "instructor", // sports instructor / coach, expressed naturally as 教练
  "interval", // a break in a performance or match, not just a time interval
  "iron", // the appliance for clothes, not the metal
  "issue", // an issue of a magazine, not a problem
  "judge", // a competition judge / referee, not a court judge
  "kilogramme", // kilogramme / kilogram / 千克 / 公斤
  "kit", // first-aid kit / 急救包, not a generic set
  // These tenth-batch objects examples use valid contextual senses or synonyms.
  "level", // a game level, expressed as 关卡 in context
  "lots", // the quantifier "lots of", not land lots
  "mate", // British informal friend, not a partner
  // These eleventh-batch objects examples use valid contextual noun senses.
  "part", // a machine component, expressed as 零件 in context
  "partner", // a project partner / teammate, expressed as 搭档
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

  for (let index = 0; index < pending.length; index += 4) {
    const batch = pending.slice(index, index + 4);
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
        ["-4", "--http1.1", "--fail", "--silent", "--show-error", "--retry", "4", "--retry-all-errors", "--retry-delay", "2", "--max-time", "30", url],
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
