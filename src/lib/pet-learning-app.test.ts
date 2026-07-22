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

const clothingMaterialsBatch = [
  "boot", "bracelet", "cap", "clothes", "clothing", "coat", "dress", "fashion", "glove",
  "handbag", "hat", "jacket", "jeans", "necklace", "ring", "ring back", "ring up", "shirt",
  "shoe", "skirt", "sock", "sweatshirt", "swimsuit", "tracksuit", "trousers", "T-shirt",
  "underpants", "underwear", "wear", "wear out", "blank", "card", "cotton", "display",
  "equipment", "goods", "ID card", "identity card", "leather", "lighter", "liquid",
  "material", "metal", "object", "oil", "plastic", "silver", "stone", "wool", "toy",
] as const;

const placesAnimalsTravelBatch = [
  "address", "area", "building", "centre / center", "city", "corner", "country", "east",
  "entrance", "exit", "Australia", "location", "neighbourhood", "north", "park", "place",
  "public", "region", "south", "sports centre", "street", "take place", "town", "village",
  "west", "animal", "ant", "bear", "bee", "bird", "cat", "cow", "dog", "duck", "elephant",
  "giraffe", "horse", "insect", "lion", "monkey", "mouse", "penguin", "puppy", "rabbit",
  "snake", "tiger", "zebra", "guided", "tourism", "tourist information centre",
] as const;

const sportNumbersBatch = [
  "athlete", "athletics", "baseball", "basketball", "CD player", "coach", "DVD player",
  "extreme sport", "football player", "golf", "gym", "gymnastics", "hockey", "ice hockey",
  "ice skating", "match", "motor-racing", "player", "pool", "racing", "rugby", "skate",
  "skating", "skiing", "sport", "swim", "swimming costume", "swimming pool", "table tennis",
  "team", "volleyball", "yoga", "amount", "average", "count", "degree", "depth", "double",
  "half", "height", "kilometre", "metre", "mile", "number", "pair", "percent", "point",
  "quarter", "score", "total",
] as const;

const timeNumbersBatch = [
  "afternoon", "afterwards", "age", "aged", "ages", "at the same time", "birthday", "day",
  "recently", "early", "evening", "full time", "good afternoon", "good evening", "good morning",
  "good night", "hour", "immediately", "in time", "late", "look after", "middle-aged", "minute",
  "month", "morning", "night", "occasion", "on time", "overnight", "part time", "second", "soon",
  "time", "today", "tomorrow", "week", "while", "year", "yesterday", "circle", "gram",
  "half-price", "in half", "in two", "litre", "million", "single", "size", "square", "weight",
] as const;

const communicationSmallThemesBatch = [
  "base on", "be over", "break down", "break in", "break up", "call for", "call in",
  "check in", "check out", "chill out", "cross out", "cut up", "deal with", "fill in",
  "fill up", "hang out", "hang up", "knock down", "lie down", "pass on", "recommend",
  "review", "say", "sentence", "sit down", "speak", "split up", "talk", "tell", "thank",
  "thank you", "throw away", "tidy up", "understand", "wake up", "wash up", "word",
  "no one", "shape", "politics", "relationship", "rule", "society", "trade", "traditional",
  "theatre", "main course", "of course", "studies", "movie star",
] as const;

const ideasFirstBatch = [
  "accommodation", "achievement", "action", "activity", "addition", "air conditioning",
  "ambition", "ambulance", "appearance", "appointment", "argument", "arrangement", "attention",
  "attraction", "cancel", "case", "celebration", "celebrity", "championship", "chance",
  "charity", "collection", "comment", "communication", "competition", "composition", "condition",
  "conference", "congratulations", "connection", "correction", "dancer", "defence", "department",
  "destination", "development", "difference", "disappointment", "distance", "documentary",
  "driving licence", "election", "electricity", "elementary", "employment", "entertainment",
  "excitement", "exhibition", "expedition", "experience",
] as const;

const ideasSecondBatch = [
  "experienced", "explanation", "fiction", "fitness", "friendship", "generation", "glance",
  "graduation", "happiness", "identification", "illness", "immigration", "importance",
  "improvement", "in advance", "in case", "influence", "information", "instance",
  "instructions", "instrument", "introduction", "invention", "invitation", "licence", "matter",
  "membership", "method", "moment", "monument", "nationality", "occupation", "operation",
  "opportunity", "option", "organisation", "pavement", "pence", "performance", "pity",
  "population", "position", "possibility", "power", "preparation", "prescription", "presentation",
  "production", "qualification", "quality",
] as const;

const ideasGrammarBatch = [
  "quantity", "questionnaire", "reality", "reception", "receptionist", "refreshments",
  "registration", "relation", "relaxation", "result", "retirement", "romance",
  "science fiction", "secret", "section", "security", "security guard", "silence",
  "situation", "solution", "spaceship", "suggestion", "tournament", "translation",
  "unemployment", "a / an", "about", "above", "absolutely", "according to", "across",
  "actually", "after", "again", "against", "ago", "ahead", "alike", "all", "almost",
  "alone", "along", "aloud", "already", "also", "although", "altogether", "always",
  "a.m", "among",
] as const;

const grammarSecondBatch = [
  "an", "and", "another", "any", "anybody", "anymore", "anyone", "anything", "anyway",
  "anywhere", "apart", "apart from", "approximately", "around", "as", "as long as",
  "as well", "at", "at all", "at first", "at last", "at least", "at once", "at present",
  "away", "back", "backwards", "badly", "because of", "before", "behind", "below",
  "beneath", "beside", "besides", "between", "beyond", "both", "but", "by", "by mistake",
  "by name", "bye", "can", "something", "carefully", "certainly", "cheers", "clearly",
  "completely",
] as const;

const grammarThirdBatch = [
  "could", "curiously", "definitely", "despite", "directly", "do", "down", "dozen",
  "due to", "during", "each", "easily", "either", "else", "enough", "especially", "even",
  "even though", "ever", "every", "everybody", "everyone", "everything", "everywhere",
  "exactly", "except", "extremely", "fairly", "far", "few", "finally", "for", "forever",
  "fortunately", "forward", "frequently", "from", "fully", "further", "generally",
  "goodbye", "happily", "hardly", "have", "he", "hello", "her", "here", "hers", "herself",
] as const;

const grammarFourthBatch = [
  "hey", "hi", "him", "himself", "his", "honestly", "hopefully", "how", "however",
  "how much", "if", "in", "including", "incredibly", "indeed", "indoors", "in fact",
  "in front of", "in ink", "in pencil", "inside", "instead", "in the end", "into", "IT",
  "its", "itself", "just", "lately", "less", "loudly", "luckily", "mainly", "many", "may",
  "maybe", "me", "meanwhile", "might", "mine", "minus", "more", "most", "mostly", "much",
  "must", "my", "myself", "near", "nearly",
] as const;

const grammarFifthBatch = [
  "neither", "never", "next to", "no", "nobody", "none", "normally", "not", "nothing",
  "now", "nowadays", "nowhere", "obviously", "occasionally", "o’clock", "of", "off", "often",
  "oh", "oh dear", "on", "on board", "once", "one", "on fire", "only", "on purpose",
  "on request", "onto", "or", "other", "otherwise", "ought", "our", "ours", "ourselves",
  "out", "outdoors", "out of", "out of date", "over", "own", "pardon", "partly",
  "particularly", "per", "perfectly", "perhaps", "personally", "please",
] as const;

const grammarSixthBatch = [
  "plenty", "plus", "p.m", "possibly", "previously", "probably", "properly", "quickly",
  "quietly", "quite", "rarely", "rather", "really", "reasonably", "regarding", "regularly",
  "safely", "seriously", "several", "shall", "she", "shortly", "should", "since", "sincerely",
  "slightly", "slowly", "so", "some", "somebody", "somehow", "someone", "sometimes",
  "somewhere", "specially", "still", "such", "suddenly", "terribly", "than", "thanks", "that",
  "the", "their", "theirs", "them", "themselves", "then", "there", "therefore",
] as const;

const grammarSeventhBatch = [
  "these", "they", "this", "those", "though", "till", "to", "together", "tonight", "too",
  "totally", "toward", "twice", "typically", "under", "underneath", "unfortunately",
  "unless", "until", "unusual", "up", "upon", "up to", "up to date", "urgently", "us",
  "used to", "v / versus", "very", "via", "we", "well done", "well made / well-made", "what",
  "whatever", "when", "whenever", "where", "wherever", "whether", "which", "who", "whole",
  "whose", "why", "will", "with", "within", "without", "would",
] as const;

const grammarEighthBatch = [
  "wow", "yeah", "yes", "yet", "you", "you know", "your", "yours", "yourself",
] as const;

const objectsFirstBatch = [
  "access", "ad", "advantage", "adventure", "aim", "air force", "airline", "alarm",
  "alarm clock", "album", "alphabet", "ankle", "anniversary", "answerphone",
  "apology", "apple", "architect", "architecture", "Arithmetic", "armchair", "army",
  "arrival", "aspirin", "astronaut", "at / @", "atmosphere", "attack", "attitude",
  "author", "autumn", "babysitter", "backpack", "backpacker", "backpacking",
  "badminton", "bag", "baggage", "baker", "balcony", "ball", "ballet", "balloon",
  "banana", "band", "bandage", "banker", "banking", "bar", "barbecue", "barber",
] as const;

const objectsSecondBatch = [
  "bargain", "basin", "basket", "bat", "bathing suit", "bathtub", "battery",
  "battle", "bay", "beard", "beauty", "beef", "beginner", "beginning",
  "behaviour", "bell", "belt", "benefit", "bestseller", "bin", "biography",
  "biology", "birth", "biscuit", "bit", "blackboard", "block", "blog",
  "blogger", "blouse", "board", "boarding pass", "bomb", "bone", "booking",
  "bookshop", "bookstore", "border", "boss", "box", "boxing", "boyfriend",
  "brain", "brake", "branch", "breath", "breeze", "bride", "bridge", "broccoli",
] as const;

const objectsThirdBatch = [
  "brochure", "brush", "bucket", "bug", "bulb", "bull", "bunch", "bush",
  "butcher", "butter", "butterfly", "button", "buyer", "cab", "cabbage",
  "cabin", "cabinet", "cable", "café / cafe", "cafeteria", "calf", "camel",
  "camp", "campsite", "canal", "candidate", "candle", "candy", "canteen",
  "captain", "care", "carrot", "cartoon", "cashpoint", "castle", "cathedral",
  "cattle", "cave", "ceiling", "centimetre", "central heating", "century",
  "cereal", "ceremony", "certificate", "chain", "challenge", "champion",
  "channel", "charge",
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

  it("adds the reviewed entertainment media batch and leaves at most two theme rows", () => {
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
    expect(missingEntertainmentTerms.length).toBeLessThanOrEqual(2);
    expect(missingEntertainmentTerms.every((term) => ["theatre", "toy"].includes(term))).toBe(true);
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

  it("adds the reviewed clothing materials batch and completes both themes", () => {
    const vocabularyPath = path.resolve(
      process.cwd(),
      "src/lib/generated/pet-vocabulary.json",
    );
    const words = JSON.parse(fs.readFileSync(vocabularyPath, "utf8")) as Array<{
      term: string;
      chineseGloss: string;
      theme: string;
    }>;
    const clothingWords = words.filter((word) => word.theme === "clothing");
    const materialWords = words.filter((word) => word.theme === "materials");
    const selectedExamples = clothingMaterialsBatch.map((term) =>
      getWordExample({ term, chineseGloss: "" }),
    );

    expect(clothingMaterialsBatch).toHaveLength(50);
    expect(clothingWords).toHaveLength(31);
    expect(materialWords).toHaveLength(24);
    expect(Object.keys(getReviewedWordExamples()).length).toBeGreaterThanOrEqual(735);
    expect(selectedExamples.map((example) => example.sentence).filter(Boolean)).toHaveLength(50);
    expect(clothingWords.every((word) => getWordExample(word).sentence !== null)).toBe(true);
    expect(materialWords.every((word) => getWordExample(word).sentence !== null)).toBe(true);
  });

  it("keeps the clothing materials ledger aligned with reviewed examples", () => {
    const candidatePath = path.resolve(
      process.cwd(),
      "data/example-candidates/clothing-materials-001.json",
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

  it("uses intended clothing materials senses for ambiguous terms", () => {
    expect(getWordExample({ term: "dress", chineseGloss: "穿衣；连衣裙" })).toMatchObject({
      sentence: "She chose a blue dress for the school dance.",
      chinese: "dress = 连衣裙；她为学校舞会选了一条蓝色连衣裙。",
    });
    expect(getWordExample({ term: "ring", chineseGloss: "环；铃声；戒指" })).toMatchObject({
      sentence: "He gave her a ring for her birthday.",
      chinese: "ring = 戒指；他送给她一枚戒指作为生日礼物。",
    });
    expect(getWordExample({ term: "ring back", chineseGloss: "回电话" })).toMatchObject({
      sentence: "I will ring you back after my class.",
      chinese: "ring back = 回电话；我下课后会给你回电话。",
    });
    expect(getWordExample({ term: "ring up", chineseGloss: "打电话；结账" })).toMatchObject({
      sentence: "Please ring up the hotel and check our booking.",
      chinese: "ring up = 打电话；请给酒店打电话确认我们的预订。",
    });
    expect(getWordExample({ term: "wear out", chineseGloss: "用坏；磨损" })).toMatchObject({
      sentence: "These cheap shoes may wear out quickly.",
      chinese: "wear out = 磨坏；这些便宜的鞋可能很快就会磨坏。",
    });
    expect(getWordExample({ term: "blank", chineseGloss: "空白；空白的" })).toMatchObject({
      sentence: "Leave this box blank if the question does not apply to you.",
      chinese: "blank = 空白的；如果这个问题不适用于你，就把这一栏留空。",
    });
    expect(getWordExample({ term: "display", chineseGloss: "显示；展览" })).toMatchObject({
      sentence: "The museum has a display of old toys.",
      chinese: "display = 展览；博物馆有一个旧玩具展览。",
    });
    expect(getWordExample({ term: "lighter", chineseGloss: "更轻的；打火机" })).toMatchObject({
      sentence: "Keep the lighter away from young children.",
      chinese: "lighter = 打火机；让打火机远离年幼的孩子。",
    });
    expect(getWordExample({ term: "material", chineseGloss: "材料；重要的" })).toMatchObject({
      sentence: "We chose a strong material for the school bags.",
      chinese: "material = 材料；我们为书包选择了一种结实的材料。",
    });
  });

  it("adds the reviewed places animals travel batch and completes all three themes", () => {
    const vocabularyPath = path.resolve(
      process.cwd(),
      "src/lib/generated/pet-vocabulary.json",
    );
    const words = JSON.parse(fs.readFileSync(vocabularyPath, "utf8")) as Array<{
      term: string;
      chineseGloss: string;
      theme: string;
    }>;
    const themeWords = ["places", "animals", "travel"].map((theme) =>
      words.filter((word) => word.theme === theme),
    );
    const selectedExamples = placesAnimalsTravelBatch.map((term) =>
      getWordExample({ term, chineseGloss: "" }),
    );

    expect(placesAnimalsTravelBatch).toHaveLength(50);
    expect(themeWords.map((items) => items.length)).toEqual([26, 23, 26]);
    expect(Object.keys(getReviewedWordExamples()).length).toBeGreaterThanOrEqual(785);
    expect(selectedExamples.map((example) => example.sentence).filter(Boolean)).toHaveLength(50);
    expect(themeWords.every((items) => items.every((word) => getWordExample(word).sentence !== null))).toBe(true);
  });

  it("keeps the places animals travel ledger aligned with reviewed examples", () => {
    const candidatePath = path.resolve(
      process.cwd(),
      "data/example-candidates/places-animals-travel-001.json",
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

  it("uses intended places animals travel senses for ambiguous terms", () => {
    expect(getWordExample({ term: "centre / center", chineseGloss: "中心" })).toMatchObject({
      focusWord: "centre",
      sentence: "The hotel is in the centre of the city.",
      chinese: "centre = 中心；酒店位于市中心。",
    });
    expect(getWordExample({ term: "corner", chineseGloss: "角；街角" })).toMatchObject({
      sentence: "I will meet you at the corner of King Street.",
      chinese: "corner = 街角；我会在国王街的街角和你见面。",
    });
    expect(getWordExample({ term: "country", chineseGloss: "国家；乡村" })).toMatchObject({
      sentence: "Japan is a country in East Asia.",
      chinese: "country = 国家；日本是东亚的一个国家。",
    });
    expect(getWordExample({ term: "public", chineseGloss: "公共的；公众" })).toMatchObject({
      sentence: "The garden is open to the public every day.",
      chinese: "public = 公众；这个花园每天向公众开放。",
    });
    expect(getWordExample({ term: "take place", chineseGloss: "发生；举行" })).toMatchObject({
      sentence: "The school concert will take place on Thursday.",
      chinese: "take place = 举行；学校音乐会将在星期四举行。",
    });
    expect(getWordExample({ term: "bear", chineseGloss: "熊；忍受" })).toMatchObject({
      sentence: "We saw a brown bear beside the river.",
      chinese: "bear = 熊；我们在河边看到了一只棕熊。",
    });
    expect(getWordExample({ term: "duck", chineseGloss: "鸭子；低头" })).toMatchObject({
      sentence: "A duck swam across the pond with its young.",
      chinese: "duck = 鸭子；一只鸭子带着幼鸭游过池塘。",
    });
    expect(getWordExample({ term: "mouse", chineseGloss: "老鼠；鼠标" })).toMatchObject({
      sentence: "A tiny mouse ran behind the cupboard.",
      chinese: "mouse = 老鼠；一只小老鼠跑到了碗柜后面。",
    });
    expect(getWordExample({ term: "guided", chineseGloss: "有导游的" })).toMatchObject({
      sentence: "We joined a guided tour of the old castle.",
      chinese: "guided = 有导游的；我们参加了老城堡的导览游。",
    });
    expect(getWordExample({ term: "tourism", chineseGloss: "旅游业" })).toMatchObject({
      sentence: "Tourism provides many jobs in this coastal town.",
      chinese: "tourism = 旅游业；旅游业为这个海滨小镇提供了许多工作。",
    });
  });

  it("adds the reviewed sport numbers batch and completes the sport theme", () => {
    const vocabularyPath = path.resolve(
      process.cwd(),
      "src/lib/generated/pet-vocabulary.json",
    );
    const words = JSON.parse(fs.readFileSync(vocabularyPath, "utf8")) as Array<{
      term: string;
      chineseGloss: string;
      theme: string;
    }>;
    const sportWords = words.filter((word) => word.theme === "sport");
    const selectedExamples = sportNumbersBatch.map((term) =>
      getWordExample({ term, chineseGloss: "" }),
    );

    expect(sportNumbersBatch).toHaveLength(50);
    expect(sportWords).toHaveLength(36);
    expect(Object.keys(getReviewedWordExamples()).length).toBeGreaterThanOrEqual(835);
    expect(selectedExamples.map((example) => example.sentence).filter(Boolean)).toHaveLength(50);
    expect(sportWords.every((word) => getWordExample(word).sentence !== null)).toBe(true);
  });

  it("keeps the sport numbers ledger aligned with reviewed examples", () => {
    const candidatePath = path.resolve(
      process.cwd(),
      "data/example-candidates/sport-numbers-001.json",
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

  it("uses intended sport numbers senses for ambiguous terms", () => {
    expect(getWordExample({ term: "coach", chineseGloss: "长途汽车；教练" })).toMatchObject({
      sentence: "The coach showed us a better way to pass the ball.",
      chinese: "coach = 教练；教练向我们示范了更好的传球方法。",
    });
    expect(getWordExample({ term: "pool", chineseGloss: "水池；台球" })).toMatchObject({
      sentence: "We played pool while we waited for the bus.",
      chinese: "pool = 台球；等公交车时我们打了台球。",
    });
    expect(getWordExample({ term: "player", chineseGloss: "运动员；播放器" })).toMatchObject({
      sentence: "Each player shook hands after the game.",
      chinese: "player = 运动员；比赛后每位运动员都握了手。",
    });
    expect(getWordExample({ term: "skate", chineseGloss: "滑冰；冰鞋" })).toMatchObject({
      sentence: "Children can skate safely on this indoor rink.",
      chinese: "skate = 滑冰；孩子们可以在这个室内冰场安全地滑冰。",
    });
    expect(getWordExample({ term: "amount", chineseGloss: "数量；总数" })).toMatchObject({
      sentence: "Drink a small amount of water during each break.",
      chinese: "amount = 数量；每次休息时喝少量的水。",
    });
    expect(getWordExample({ term: "average", chineseGloss: "平均数；平均的" })).toMatchObject({
      sentence: "Her average score this season is eighty percent.",
      chinese: "average = 平均数；她本赛季的平均得分是百分之八十。",
    });
    expect(getWordExample({ term: "double", chineseGloss: "双倍；两倍的" })).toMatchObject({
      sentence: "We ran double the usual distance today.",
      chinese: "double = 两倍的；我们今天跑了平常两倍的距离。",
    });
    expect(getWordExample({ term: "point", chineseGloss: "点；分" })).toMatchObject({
      sentence: "Our team earned one point for the draw.",
      chinese: "point = 分；我们队因平局获得了一分。",
    });
    expect(getWordExample({ term: "score", chineseGloss: "得分；比分" })).toMatchObject({
      sentence: "The final score was three to two.",
      chinese: "score = 比分；最终比分是三比二。",
    });
  });

  it("adds the reviewed time numbers batch and completes the time theme", () => {
    const vocabularyPath = path.resolve(
      process.cwd(),
      "src/lib/generated/pet-vocabulary.json",
    );
    const words = JSON.parse(fs.readFileSync(vocabularyPath, "utf8")) as Array<{
      term: string;
      chineseGloss: string;
      theme: string;
    }>;
    const timeWords = words.filter((word) => word.theme === "time");
    const selectedExamples = timeNumbersBatch.map((term) =>
      getWordExample({ term, chineseGloss: "" }),
    );

    expect(timeNumbersBatch).toHaveLength(50);
    expect(timeWords).toHaveLength(41);
    expect(Object.keys(getReviewedWordExamples()).length).toBeGreaterThanOrEqual(885);
    expect(selectedExamples.map((example) => example.sentence).filter(Boolean)).toHaveLength(50);
    expect(timeWords.every((word) => getWordExample(word).sentence !== null)).toBe(true);
    expect(getWordExample({ term: "full-time", chineseGloss: "全职" }).sentence).toBe(
      "My aunt works full time at the hospital.",
    );
    expect(getWordExample({ term: "part-time", chineseGloss: "兼职" }).sentence).toBe(
      "Leo works part time in a bookshop.",
    );
    expect(getWordExample({ term: "while / whilst", chineseGloss: "当...时" }).sentence).toBe(
      "While I waited for the bus, I read a magazine.",
    );
  });

  it("keeps the time numbers ledger aligned with reviewed examples", () => {
    const candidatePath = path.resolve(
      process.cwd(),
      "data/example-candidates/time-numbers-001.json",
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

  it("uses intended time numbers senses for ambiguous terms", () => {
    expect(getWordExample({ term: "age", chineseGloss: "年龄；时代" })).toMatchObject({
      sentence: "She started learning the piano at the age of six.",
      chinese: "age = 年龄；她六岁时开始学钢琴。",
    });
    expect(getWordExample({ term: "ages", chineseGloss: "很久；年龄" })).toMatchObject({
      sentence: "We waited for ages before the bus arrived.",
      chinese: "ages = 很长时间；公交车到来前我们等了很久。",
    });
    expect(getWordExample({ term: "in time", chineseGloss: "及时；最终" })).toMatchObject({
      sentence: "We reached the station in time to catch the train.",
      chinese: "in time = 及时；我们及时赶到车站，搭上了火车。",
    });
    expect(getWordExample({ term: "look after", chineseGloss: "照顾；目送" })).toMatchObject({
      sentence: "Can you look after my dog this weekend?",
      chinese: "look after = 照顾；这个周末你能照顾我的狗吗？",
    });
    expect(getWordExample({ term: "occasion", chineseGloss: "场合；机会" })).toMatchObject({
      sentence: "On one occasion, we saw dolphins near the boat.",
      chinese: "occasion = 一次；有一次，我们在船附近看到了海豚。",
    });
    expect(getWordExample({ term: "on time", chineseGloss: "准时" })).toMatchObject({
      sentence: "Everyone arrived on time for the meeting.",
      chinese: "on time = 准时；每个人都准时到达参加会议。",
    });
    expect(getWordExample({ term: "second", chineseGloss: "第二；秒" })).toMatchObject({
      sentence: "Wait a second while I find the key.",
      chinese: "second = 秒；等一下，我找找钥匙。",
    });
    expect(getWordExample({ term: "while", chineseGloss: "一会儿；当...时" })).toMatchObject({
      sentence: "While I waited for the bus, I read a magazine.",
      chinese: "while = 当...时；等公交车时，我看了一本杂志。",
    });
    expect(getWordExample({ term: "half-price", chineseGloss: "半价的" })).toMatchObject({
      sentence: "Student tickets are half-price on Mondays.",
      chinese: "half-price = 半价的；学生票星期一半价。",
    });
    expect(getWordExample({ term: "single", chineseGloss: "单一的；单程的" })).toMatchObject({
      sentence: "I need a single ticket to Oxford.",
      chinese: "single = 单程的；我需要一张去牛津的单程票。",
    });
    expect(getWordExample({ term: "square", chineseGloss: "广场；正方形" })).toMatchObject({
      sentence: "A square has four equal sides.",
      chinese: "square = 正方形；正方形有四条相等的边。",
    });
  });

  it("adds the reviewed communication small themes batch and completes six themes", () => {
    const vocabularyPath = path.resolve(
      process.cwd(),
      "src/lib/generated/pet-vocabulary.json",
    );
    const words = JSON.parse(fs.readFileSync(vocabularyPath, "utf8")) as Array<{
      term: string;
      chineseGloss: string;
      theme: string;
    }>;
    const completedThemes = [
      ["communication", 70],
      ["numbers", 32],
      ["society", 20],
      ["entertainment", 54],
      ["school", 21],
      ["nature", 47],
    ] as const;
    const selectedExamples = communicationSmallThemesBatch.map((term) =>
      getWordExample({ term, chineseGloss: "" }),
    );

    expect(communicationSmallThemesBatch).toHaveLength(50);
    expect(Object.keys(getReviewedWordExamples()).length).toBeGreaterThanOrEqual(935);
    expect(selectedExamples.map((example) => example.sentence).filter(Boolean)).toHaveLength(50);
    for (const [theme, expectedCount] of completedThemes) {
      const themeWords = words.filter((word) => word.theme === theme);
      expect(themeWords).toHaveLength(expectedCount);
      expect(themeWords.every((word) => getWordExample(word).sentence !== null)).toBe(true);
    }
    expect(getWordExample({ term: "check-in", chineseGloss: "报到；签到" })).toMatchObject({
      focusWord: "check-in",
      sentence: null,
      chinese: "check-in = 报到；签到",
    });
    expect(getWordExample({ term: "checkout", chineseGloss: "结帐台；检验" })).toMatchObject({
      focusWord: "checkout",
      sentence: null,
      chinese: "checkout = 结帐台；检验",
    });
    expect(getWordExample({ term: "workout", chineseGloss: "锻炼；训练" })).toMatchObject({
      focusWord: "workout",
      sentence: null,
      chinese: "workout = 锻炼；训练",
    });
  });

  it("keeps the communication small themes ledger aligned with reviewed examples", () => {
    const candidatePath = path.resolve(
      process.cwd(),
      "data/example-candidates/communication-small-themes-001.json",
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

  it("uses intended communication small themes senses for ambiguous terms", () => {
    const expectedExamples = {
      "base on": ["Base your answer on information in the text.", "base on = 以...为依据；根据课文中的信息回答。"],
      "break down": ["Our car broke down on the way to the airport.", "break down = 出故障；我们的汽车在去机场的路上坏了。"],
      "break up": ["Mia and Ben decided to break up.", "break up = 分手；米娅和本决定分手。"],
      "check in": ["We need to check in at the hotel before six.", "check in = 办理入住；我们需要在六点前到酒店办理入住。"],
      "check out": ["Guests must check out of the hotel by eleven.", "check out = 退房；客人必须在十一点前退房。"],
      "hang up": ["Do not hang up until I find the address.", "hang up = 挂断电话；在我找到地址前别挂电话。"],
      "split up": ["The teacher split us up into four groups.", "split up = 分组；老师把我们分成了四组。"],
      shape: ["The table is round in shape.", "shape = 形状；这张桌子的形状是圆的。"],
      rule: ["Our school has a rule against using phones in class.", "rule = 规则；我们学校规定课堂上不能使用手机。"],
      trade: ["Trade between the two countries has increased.", "trade = 贸易；两国之间的贸易增加了。"],
      "main course": ["I chose fish and rice for my main course.", "main course = 主菜；我选择鱼和米饭作为主菜。"],
      studies: ["Her studies take up most of her week.", "studies = 学业；她的学业占去了她一周的大部分时间。"],
    } as const;

    for (const [term, [sentence, chinese]] of Object.entries(expectedExamples)) {
      expect(getWordExample({ term, chineseGloss: "" })).toMatchObject({ sentence, chinese });
    }
  });

  it("adds the first ideas reviewed batch", () => {
    const vocabularyPath = path.resolve(
      process.cwd(),
      "src/lib/generated/pet-vocabulary.json",
    );
    const words = JSON.parse(fs.readFileSync(vocabularyPath, "utf8")) as Array<{
      term: string;
      chineseGloss: string;
      theme: string;
    }>;
    const ideasWords = words.filter((word) => word.theme === "ideas");
    const selectedExamples = ideasFirstBatch.map((term) =>
      getWordExample({ term, chineseGloss: "" }),
    );

    expect(ideasFirstBatch).toHaveLength(50);
    expect(Object.keys(getReviewedWordExamples()).length).toBeGreaterThanOrEqual(985);
    expect(selectedExamples.every((example) => example.sentence !== null)).toBe(true);
    expect(ideasWords).toHaveLength(133);
    expect(
      ideasWords.filter((word) => getWordExample(word).sentence !== null).length,
    ).toBeGreaterThanOrEqual(58);
  });

  it("keeps the first ideas ledger aligned with reviewed examples", () => {
    const candidatePath = path.resolve(
      process.cwd(),
      "data/example-candidates/ideas-001.json",
    );
    expect(fs.existsSync(candidatePath)).toBe(true);
    if (!fs.existsSync(candidatePath)) return;

    const candidate = JSON.parse(fs.readFileSync(candidatePath, "utf8")) as {
      entries: Array<{ term: string; focusWord: string; sentence: string; chinese: string }>;
    };
    expect(candidate.batchId).toBe("ideas-001");
    expect(candidate.entries).toHaveLength(50);
    for (const entry of candidate.entries) {
      expect(getWordExample({ term: entry.term, chineseGloss: "" })).toMatchObject({
        focusWord: entry.focusWord,
        sentence: entry.sentence,
        chinese: entry.chinese,
      });
    }
  });

  it("uses intended senses for the first ideas batch", () => {
    const expectedExamples = {
      addition: ["The new sports hall is a useful addition to our school.", "addition = 新增事物；新体育馆是学校一项实用的新增设施。"],
      appearance: ["The actor changed his appearance for the film.", "appearance = 外貌；这位演员为了电影改变了自己的外貌。"],
      appointment: ["I have a dentist appointment at two o'clock.", "appointment = 预约；我预约了两点去看牙医。"],
      argument: ["They had an argument about whose turn it was.", "argument = 争吵；他们为了轮到谁而争吵。"],
      attraction: ["The castle is the town's main tourist attraction.", "attraction = 景点；这座城堡是镇上主要的旅游景点。"],
      case: ["In this case, taking the bus is quicker.", "case = 情况；在这种情况下，乘公交车更快。"],
      collection: ["The museum has a collection of old photographs.", "collection = 收藏品；博物馆收藏了一批老照片。"],
      composition: ["We wrote a composition about our holidays.", "composition = 作文；我们写了一篇关于假期的作文。"],
      condition: ["The bicycle is old but still in good condition.", "condition = 状况；这辆自行车虽然旧，但状况仍然很好。"],
      connection: ["There is a direct train connection between the two cities.", "connection = 交通连接；这两座城市之间有直达列车相连。"],
      defence: ["The team worked hard in defence during the second half.", "defence = 防守；球队在下半场努力防守。"],
      elementary: ["The course teaches elementary French.", "elementary = 初级的；这门课程教授初级法语。"],
      employment: ["The new factory will provide employment for local people.", "employment = 就业机会；新工厂将为当地人提供就业机会。"],
      entertainment: ["The hotel offers live entertainment every evening.", "entertainment = 娱乐表演；这家酒店每晚都有现场娱乐表演。"],
      expedition: ["They joined an expedition to study animals in the rainforest.", "expedition = 探险考察；他们参加了一次研究雨林动物的探险考察。"],
      experience: ["Working at the cafe gave her useful experience.", "experience = 经验；在咖啡馆工作给了她有用的经验。"],
    } as const;

    for (const [term, [sentence, chinese]] of Object.entries(expectedExamples)) {
      expect(getWordExample({ term, chineseGloss: "" })).toMatchObject({ sentence, chinese });
    }
  });

  it("adds the second ideas reviewed batch", () => {
    const vocabularyPath = path.resolve(
      process.cwd(),
      "src/lib/generated/pet-vocabulary.json",
    );
    const words = JSON.parse(fs.readFileSync(vocabularyPath, "utf8")) as Array<{
      term: string;
      chineseGloss: string;
      theme: string;
    }>;
    const ideasWords = words.filter((word) => word.theme === "ideas");
    const selectedExamples = ideasSecondBatch.map((term) =>
      getWordExample({ term, chineseGloss: "" }),
    );

    expect(ideasSecondBatch).toHaveLength(50);
    expect(Object.keys(getReviewedWordExamples()).length).toBeGreaterThanOrEqual(1035);
    expect(selectedExamples.every((example) => example.sentence !== null)).toBe(true);
    expect(ideasWords).toHaveLength(133);
    expect(
      ideasWords.filter((word) => getWordExample(word).sentence !== null).length,
    ).toBeGreaterThanOrEqual(108);
  });

  it("keeps the second ideas ledger aligned with reviewed examples", () => {
    const candidatePath = path.resolve(
      process.cwd(),
      "data/example-candidates/ideas-002.json",
    );
    expect(fs.existsSync(candidatePath)).toBe(true);
    if (!fs.existsSync(candidatePath)) return;

    const candidate = JSON.parse(fs.readFileSync(candidatePath, "utf8")) as {
      batchId: string;
      entries: Array<{ term: string; focusWord: string; sentence: string; chinese: string }>;
    };
    expect(candidate.batchId).toBe("ideas-002");
    expect(candidate.entries).toHaveLength(50);
    for (const entry of candidate.entries) {
      expect(getWordExample({ term: entry.term, chineseGloss: "" })).toMatchObject({
        focusWord: entry.focusWord,
        sentence: entry.sentence,
        chinese: entry.chinese,
      });
    }
  });

  it("uses intended senses for the second ideas batch", () => {
    const expectedExamples = {
      fiction: ["This story is fiction, but it feels realistic.", "fiction = 虚构故事；这个故事是虚构的，但感觉很真实。"],
      fitness: ["Cycling to school has improved my fitness.", "fitness = 体能；骑自行车上学提高了我的体能。"],
      generation: ["People of my grandparents' generation wrote more letters.", "generation = 一代人；我祖父母那一代人写更多书信。"],
      identification: ["You must show identification before entering the building.", "identification = 身份证明；进入大楼前必须出示身份证明。"],
      "in advance": ["Book your tickets in advance to get a lower price.", "in advance = 提前；提前订票可以获得更低的价格。"],
      "in case": ["Take an umbrella in case it rains later.", "in case = 以防；带把伞，以防稍后下雨。"],
      instance: ["For instance, you could travel by train instead.", "instance = 例子；例如，你可以改乘火车。"],
      instrument: ["The piano was the first instrument she learned to play.", "instrument = 乐器；钢琴是她学会演奏的第一种乐器。"],
      matter: ["We discussed the matter after class.", "matter = 事情；我们课后讨论了这件事。"],
      occupation: ["Please write your occupation on the application form.", "occupation = 职业；请在申请表上填写你的职业。"],
      operation: ["My grandfather is recovering after his knee operation.", "operation = 手术；我祖父做完膝盖手术后正在康复。"],
      option: ["Taking the early train is our best option.", "option = 选择；乘早班火车是我们最好的选择。"],
      performance: ["The audience enjoyed the band's final performance.", "performance = 演出；观众很喜欢乐队的最后一场演出。"],
      power: ["The storm left the village without power.", "power = 电力；暴风雨导致村庄停电。"],
      presentation: ["Nina gave a presentation about climate change.", "presentation = 演讲；尼娜做了一场关于气候变化的演讲。"],
      production: ["The factory increased its production of bicycles.", "production = 产量；这家工厂提高了自行车产量。"],
      qualification: ["A teaching qualification is required for this job.", "qualification = 资格证书；这份工作要求具备教师资格证书。"],
      quality: ["The quality of the food was excellent.", "quality = 质量；食物的质量非常好。"],
    } as const;

    for (const [term, [sentence, chinese]] of Object.entries(expectedExamples)) {
      expect(getWordExample({ term, chineseGloss: "" })).toMatchObject({ sentence, chinese });
    }
  });

  it("adds the ideas grammar reviewed batch and completes ideas", () => {
    const vocabularyPath = path.resolve(
      process.cwd(),
      "src/lib/generated/pet-vocabulary.json",
    );
    const words = JSON.parse(fs.readFileSync(vocabularyPath, "utf8")) as Array<{
      term: string;
      chineseGloss: string;
      theme: string;
    }>;
    const ideasWords = words.filter((word) => word.theme === "ideas");
    const grammarWords = words.filter((word) => word.theme === "grammar");
    const selectedExamples = ideasGrammarBatch.map((term) =>
      getWordExample({ term, chineseGloss: "" }),
    );

    expect(ideasGrammarBatch).toHaveLength(50);
    expect(Object.keys(getReviewedWordExamples()).length).toBeGreaterThanOrEqual(1085);
    expect(selectedExamples.every((example) => example.sentence !== null)).toBe(true);
    expect(ideasWords).toHaveLength(133);
    expect(ideasWords.every((word) => getWordExample(word).sentence !== null)).toBe(true);
    expect(grammarWords).toHaveLength(338);
    expect(
      grammarWords.filter((word) => getWordExample(word).sentence !== null).length,
    ).toBeGreaterThanOrEqual(29);
  });

  it("keeps the ideas grammar ledger aligned with reviewed examples", () => {
    const candidatePath = path.resolve(
      process.cwd(),
      "data/example-candidates/ideas-003-grammar-001.json",
    );
    expect(fs.existsSync(candidatePath)).toBe(true);
    if (!fs.existsSync(candidatePath)) return;

    const candidate = JSON.parse(fs.readFileSync(candidatePath, "utf8")) as {
      batchId: string;
      entries: Array<{ term: string; focusWord: string; sentence: string; chinese: string }>;
    };
    expect(candidate.batchId).toBe("ideas-003-grammar-001");
    expect(candidate.entries).toHaveLength(50);
    for (const entry of candidate.entries) {
      expect(getWordExample({ term: entry.term, chineseGloss: "" })).toMatchObject({
        focusWord: entry.focusWord,
        sentence: entry.sentence,
        chinese: entry.chinese,
      });
    }
  });

  it("uses intended senses for the ideas grammar batch", () => {
    const expectedExamples = {
      reception: ["Ask for the key at reception when you arrive.", "reception = 接待处；到达时请去接待处领取钥匙。"],
      relation: ["The report explains the relation between exercise and sleep.", "relation = 关系；这份报告解释了运动与睡眠之间的关系。"],
      romance: ["The film is a romance set in Paris.", "romance = 爱情故事；这部电影是一个以巴黎为背景的爱情故事。"],
      security: ["The hotel has good security at night.", "security = 安保措施；这家酒店夜间的安保措施很好。"],
      silence: ["There was complete silence during the exam.", "silence = 安静；考试期间一片安静。"],
      solution: ["We found a simple solution to the problem.", "solution = 解决办法；我们找到了这个问题的简单解决办法。"],
      translation: ["I read an English translation of the novel.", "translation = 译本；我读了这部小说的英文译本。"],
      "a / an": ["I saw a dog and an elephant at the zoo.", "a / an = 一个；我在动物园看到一只狗和一头大象。"],
      about: ["We talked about our plans for the weekend.", "about = 关于；我们谈了周末的计划。"],
      above: ["The clock hangs above the classroom door.", "above = 在上方；时钟挂在教室门的上方。"],
      "according to": ["According to the timetable, the train leaves at nine.", "according to = 根据；根据时间表，火车九点出发。"],
      against: ["Do not lean your bicycle against the window.", "against = 倚靠；不要把自行车靠在窗户上。"],
      ahead: ["Go straight ahead and turn left at the bank.", "ahead = 向前；一直向前走，在银行处左转。"],
      alike: ["The twins look alike, but they have different interests.", "alike = 相像；这对双胞胎看起来很像，但兴趣不同。"],
      along: ["We cycled along the river.", "along = 沿着；我们沿着河骑自行车。"],
      aloud: ["Please read the first paragraph aloud.", "aloud = 出声地；请出声朗读第一段。"],
      although: ["Although it was raining, we continued the match.", "although = 虽然；虽然下着雨，我们还是继续了比赛。"],
      altogether: ["There were twelve students altogether.", "altogether = 总共；总共有十二名学生。"],
      "a.m": ["The museum opens at nine a.m.", "a.m = 上午；博物馆上午九点开放。"],
      among: ["We found a quiet place among the trees.", "among = 在...之中；我们在树林中找到了一个安静的地方。"],
    } as const;

    for (const [term, [sentence, chinese]] of Object.entries(expectedExamples)) {
      expect(getWordExample({ term, chineseGloss: "" })).toMatchObject({ sentence, chinese });
    }
  });

  it("adds the second grammar reviewed batch", () => {
    const vocabularyPath = path.resolve(
      process.cwd(),
      "src/lib/generated/pet-vocabulary.json",
    );
    const words = JSON.parse(fs.readFileSync(vocabularyPath, "utf8")) as Array<{
      term: string;
      chineseGloss: string;
      theme: string;
    }>;
    const grammarWords = words.filter((word) => word.theme === "grammar");
    const selectedExamples = grammarSecondBatch.map((term) =>
      getWordExample({ term, chineseGloss: "" }),
    );

    expect(grammarSecondBatch).toHaveLength(50);
    expect(Object.keys(getReviewedWordExamples()).length).toBeGreaterThanOrEqual(1135);
    expect(selectedExamples.every((example) => example.sentence !== null)).toBe(true);
    expect(grammarWords).toHaveLength(338);
    expect(
      grammarWords.filter((word) => getWordExample(word).sentence !== null).length,
    ).toBeGreaterThanOrEqual(79);
    expect(getWordExample({ term: "at / @", chineseGloss: "at符号" })).toMatchObject({
      focusWord: "at sign",
      sentence: "Write the at sign between your name and the website.",
      chinese: "at sign = @符号；在你的名字和网站之间写上@符号。",
    });
  });

  it("keeps the second grammar ledger aligned with reviewed examples", () => {
    const candidatePath = path.resolve(
      process.cwd(),
      "data/example-candidates/grammar-002.json",
    );
    expect(fs.existsSync(candidatePath)).toBe(true);
    if (!fs.existsSync(candidatePath)) return;

    const candidate = JSON.parse(fs.readFileSync(candidatePath, "utf8")) as {
      batchId: string;
      entries: Array<{ term: string; focusWord: string; sentence: string; chinese: string }>;
    };
    expect(candidate.batchId).toBe("grammar-002");
    expect(candidate.entries).toHaveLength(50);
    for (const entry of candidate.entries) {
      expect(getWordExample({ term: entry.term, chineseGloss: "" })).toMatchObject({
        focusWord: entry.focusWord,
        sentence: entry.sentence,
        chinese: entry.chinese,
      });
    }
  });

  it("uses intended senses for the second grammar batch", () => {
    const expectedExamples = {
      an: ["She ate an apple before school.", "an = 一个；她上学前吃了一个苹果。"],
      anymore: ["We do not use that old computer anymore.", "anymore = 不再；我们不再使用那台旧电脑了。"],
      anyway: ["It was raining, but we went for a walk anyway.", "anyway = 无论如何；虽然下雨了，但我们还是去散步了。"],
      apart: ["The two houses are only a few metres apart.", "apart = 相距；这两栋房子只相距几米。"],
      "apart from": ["Apart from the rain, we had a wonderful holiday.", "apart from = 除...之外；除了下雨之外，我们度过了一个美好的假期。"],
      around: ["We walked around the lake after lunch.", "around = 绕着；午饭后我们绕着湖散步。"],
      as: ["She works as a nurse at the local hospital.", "as = 作为；她在当地医院当护士。"],
      "as long as": ["You can borrow my bike as long as you return it today.", "as long as = 只要；只要你今天归还，就可以借我的自行车。"],
      "at all": ["I was not tired at all after the walk.", "at all = 一点也不；散步后我一点也不累。"],
      away: ["The beach is only five minutes away.", "away = 相距；海滩离这里只有五分钟路程。"],
      back: ["Please put the book back on the shelf.", "back = 回原处；请把书放回书架。"],
      badly: ["The team played badly in the first half.", "badly = 糟糕地；球队上半场表现得很差。"],
      besides: ["Besides English, she also speaks French.", "besides = 除...之外还；除了英语，她还会说法语。"],
      beyond: ["The path continues beyond the bridge.", "beyond = 在...另一边；这条小路延伸到桥的另一边。"],
      but: ["The room is small but comfortable.", "but = 但是；房间很小，但是很舒适。"],
      by: ["We travelled to Oxford by train.", "by = 乘；我们乘火车去了牛津。"],
      "by mistake": ["I took your bag by mistake.", "by mistake = 错误地；我不小心拿错了你的包。"],
      "by name": ["The teacher knows every student by name.", "by name = 知道名字；老师知道每个学生的名字。"],
      cheers: ["Cheers for helping me with the boxes.", "cheers = 谢谢；谢谢你帮我搬箱子。"],
    } as const;

    for (const [term, [sentence, chinese]] of Object.entries(expectedExamples)) {
      expect(getWordExample({ term, chineseGloss: "" })).toMatchObject({ sentence, chinese });
    }
  });

  it("adds the third grammar reviewed batch", () => {
    const vocabularyPath = path.resolve(
      process.cwd(),
      "src/lib/generated/pet-vocabulary.json",
    );
    const words = JSON.parse(fs.readFileSync(vocabularyPath, "utf8")) as Array<{
      term: string;
      chineseGloss: string;
      theme: string;
    }>;
    const grammarWords = words.filter((word) => word.theme === "grammar");
    const selectedExamples = grammarThirdBatch.map((term) =>
      getWordExample({ term, chineseGloss: "" }),
    );

    expect(grammarThirdBatch).toHaveLength(50);
    expect(Object.keys(getReviewedWordExamples()).length).toBeGreaterThanOrEqual(1185);
    expect(selectedExamples.every((example) => example.sentence !== null)).toBe(true);
    expect(grammarWords).toHaveLength(338);
    expect(
      grammarWords.filter((word) => getWordExample(word).sentence !== null).length,
    ).toBeGreaterThanOrEqual(129);
    expect(
      getWordExample({ term: "made of / from / out of", chineseGloss: "由...制成" }).sentence,
    ).toBeNull();
  });

  it("keeps the third grammar ledger aligned with reviewed examples", () => {
    const candidatePath = path.resolve(
      process.cwd(),
      "data/example-candidates/grammar-003.json",
    );
    expect(fs.existsSync(candidatePath)).toBe(true);
    if (!fs.existsSync(candidatePath)) return;

    const candidate = JSON.parse(fs.readFileSync(candidatePath, "utf8")) as {
      batchId: string;
      entries: Array<{ term: string; focusWord: string; sentence: string; chinese: string }>;
    };
    expect(candidate.batchId).toBe("grammar-003");
    expect(candidate.entries).toHaveLength(50);
    for (const entry of candidate.entries) {
      expect(getWordExample({ term: entry.term, chineseGloss: "" })).toMatchObject({
        focusWord: entry.focusWord,
        sentence: entry.sentence,
        chinese: entry.chinese,
      });
    }
  });

  it("uses intended senses for the third grammar batch", () => {
    const expectedExamples = {
      could: ["Could you open the window, please?", "could = 可以；请问你可以打开窗户吗？"],
      despite: ["Despite the rain, we enjoyed the picnic.", "despite = 尽管；尽管下雨，我们还是很享受野餐。"],
      directly: ["The bus goes directly from the airport to the city centre.", "directly = 直接地；这趟公交车从机场直达市中心。"],
      down: ["She walked down the stairs slowly.", "down = 向下；她慢慢走下楼梯。"],
      dozen: ["We bought a dozen eggs at the market.", "dozen = 一打；我们在市场买了一打鸡蛋。"],
      "due to": ["The train was late due to heavy snow.", "due to = 由于；火车由于大雪而晚点。"],
      either: ["You can choose either the blue shirt or the green one.", "either = 任一；你可以选择蓝衬衫或绿衬衫中的任意一件。"],
      even: ["Even my little brother can solve this puzzle.", "even = 甚至；甚至我弟弟也能解开这个谜题。"],
      "even though": ["Even though she was tired, she finished her homework.", "even though = 尽管；尽管她很累，还是完成了家庭作业。"],
      ever: ["Have you ever visited Scotland?", "ever = 曾经；你曾经去过苏格兰吗？"],
      except: ["Everyone came to the meeting except Sam.", "except = 除...之外；除了萨姆，每个人都来参加会议了。"],
      fairly: ["The test was fairly easy.", "fairly = 相当；这次考试相当容易。"],
      far: ["How far is the station from here?", "far = 多远；车站离这里有多远？"],
      few: ["Only a few students chose the early class.", "few = 少数；只有少数学生选择了早课。"],
      forward: ["Please step forward when your name is called.", "forward = 向前；叫到你的名字时请向前一步。"],
      fully: ["The hotel is fully booked this weekend.", "fully = 完全地；这家酒店本周末已经全部订满。"],
      further: ["For further information, visit our website.", "further = 更多的；如需更多信息，请访问我们的网站。"],
      hardly: ["I could hardly hear the announcement.", "hardly = 几乎不；我几乎听不见广播。"],
      hers: ["This blue jacket is hers.", "hers = 她的；这件蓝色夹克是她的。"],
      herself: ["Maya made the cake herself.", "herself = 她亲自；玛雅亲自做了蛋糕。"],
    } as const;

    for (const [term, [sentence, chinese]] of Object.entries(expectedExamples)) {
      expect(getWordExample({ term, chineseGloss: "" })).toMatchObject({ sentence, chinese });
    }
  });

  it("adds the fourth grammar reviewed batch", () => {
    const vocabularyPath = path.resolve(
      process.cwd(),
      "src/lib/generated/pet-vocabulary.json",
    );
    const words = JSON.parse(fs.readFileSync(vocabularyPath, "utf8")) as Array<{
      term: string;
      chineseGloss: string;
      theme: string;
    }>;
    const grammarWords = words.filter((word) => word.theme === "grammar");
    const selectedExamples = grammarFourthBatch.map((term) =>
      getWordExample({ term, chineseGloss: "" }),
    );

    expect(grammarFourthBatch).toHaveLength(50);
    expect(Object.keys(getReviewedWordExamples()).length).toBeGreaterThanOrEqual(1235);
    expect(selectedExamples.every((example) => example.sentence !== null)).toBe(true);
    expect(grammarWords).toHaveLength(338);
    expect(
      grammarWords.filter((word) => getWordExample(word).sentence !== null).length,
    ).toBeGreaterThanOrEqual(179);
    expect(
      getWordExample({ term: "made of / from / out of", chineseGloss: "由...制成" }).sentence,
    ).toBeNull();
  });

  it("keeps the fourth grammar ledger aligned with reviewed examples", () => {
    const candidatePath = path.resolve(
      process.cwd(),
      "data/example-candidates/grammar-004.json",
    );
    expect(fs.existsSync(candidatePath)).toBe(true);
    if (!fs.existsSync(candidatePath)) return;

    const candidate = JSON.parse(fs.readFileSync(candidatePath, "utf8")) as {
      batchId: string;
      entries: Array<{ term: string; focusWord: string; sentence: string; chinese: string }>;
    };
    expect(candidate.batchId).toBe("grammar-004");
    expect(candidate.entries).toHaveLength(50);
    expect(candidate.entries.map((entry) => entry.term)).toEqual(grammarFourthBatch);
    for (const entry of candidate.entries) {
      expect(getWordExample({ term: entry.term, chineseGloss: "" })).toMatchObject({
        focusWord: entry.focusWord,
        sentence: entry.sentence,
        chinese: entry.chinese,
      });
    }
  });

  it("uses intended senses for the fourth grammar batch", () => {
    const expectedExamples = {
      honestly: ["Honestly, I did not enjoy the film.", "honestly = 说实话；说实话，我不喜欢这部电影。"],
      hopefully: ["Hopefully, the weather will improve tomorrow.", "hopefully = 希望；希望明天天气会好转。"],
      however: ["The hotel was expensive; however, the service was excellent.", "however = 然而；这家酒店很贵，然而服务非常好。"],
      in: ["The keys are in my bag.", "in = 在...里面；钥匙在我的包里。"],
      including: ["Ten students, including Mia, joined the trip.", "including = 包括；包括米娅在内的十名学生参加了旅行。"],
      indoors: ["We stayed indoors because of the storm.", "indoors = 在室内；因为暴风雨，我们待在室内。"],
      "in ink": ["Please complete the form in ink.", "in ink = 用墨水；请用墨水填写表格。"],
      "in pencil": ["Write your first draft in pencil.", "in pencil = 用铅笔；用铅笔写初稿。"],
      instead: ["The bus was full, so we walked instead.", "instead = 改为；公交车满了，所以我们改为步行。"],
      IT: ["It is raining outside.", "it = 它；外面正在下雨。"],
      just: ["I have just finished my homework.", "just = 刚刚；我刚刚完成家庭作业。"],
      less: ["This bag costs less than the other one.", "less = 更少；这个包比另一个便宜。"],
      may: ["You may leave when you finish the test.", "may = 可以；完成考试后你可以离开。"],
      me: ["Could you help me carry this box?", "me = 我；你能帮我搬这个箱子吗？"],
      meanwhile: ["Dad cooked dinner; meanwhile, I set the table.", "meanwhile = 同时；爸爸做晚饭，同时我摆餐具。"],
      might: ["It might rain this afternoon.", "might = 可能；今天下午可能会下雨。"],
      mine: ["The seat by the window is mine.", "mine = 我的；窗边的座位是我的。"],
      minus: ["Ten minus three equals seven.", "minus = 减；十减三等于七。"],
      most: ["Most students walk to school.", "most = 大多数；大多数学生步行去学校。"],
      much: ["How much water should I add?", "much = 多少；我应该加多少水？"],
      near: ["Our hotel is near the station.", "near = 在附近；我们的酒店在车站附近。"],
      nearly: ["It is nearly time for lunch.", "nearly = 几乎；快到午饭时间了。"],
    } as const;

    for (const [term, [sentence, chinese]] of Object.entries(expectedExamples)) {
      expect(getWordExample({ term, chineseGloss: "" })).toMatchObject({ sentence, chinese });
    }
  });

  it("adds the fifth grammar reviewed batch", () => {
    const vocabularyPath = path.resolve(
      process.cwd(),
      "src/lib/generated/pet-vocabulary.json",
    );
    const words = JSON.parse(fs.readFileSync(vocabularyPath, "utf8")) as Array<{
      term: string;
      chineseGloss: string;
      theme: string;
    }>;
    const grammarWords = words.filter((word) => word.theme === "grammar");
    const selectedExamples = grammarFifthBatch.map((term) =>
      getWordExample({ term, chineseGloss: "" }),
    );

    expect(grammarFifthBatch).toHaveLength(50);
    expect(Object.keys(getReviewedWordExamples()).length).toBeGreaterThanOrEqual(1285);
    expect(selectedExamples.every((example) => example.sentence !== null)).toBe(true);
    expect(grammarWords).toHaveLength(338);
    expect(
      grammarWords.filter((word) => getWordExample(word).sentence !== null).length,
    ).toBeGreaterThanOrEqual(229);
    expect(
      getWordExample({ term: "made of / from / out of", chineseGloss: "由...制成" }).sentence,
    ).toBeNull();
    expect(
      getWordExample({ term: "step forward / back / out", chineseGloss: "向前、向后或出去" }).sentence,
    ).toBeNull();
  });

  it("keeps the fifth grammar ledger aligned with reviewed examples", () => {
    const candidatePath = path.resolve(
      process.cwd(),
      "data/example-candidates/grammar-005.json",
    );
    expect(fs.existsSync(candidatePath)).toBe(true);
    if (!fs.existsSync(candidatePath)) return;

    const candidate = JSON.parse(fs.readFileSync(candidatePath, "utf8")) as {
      batchId: string;
      entries: Array<{ term: string; focusWord: string; sentence: string; chinese: string }>;
    };
    expect(candidate.batchId).toBe("grammar-005");
    expect(candidate.entries).toHaveLength(50);
    expect(candidate.entries.map((entry) => entry.term)).toEqual(grammarFifthBatch);
    for (const entry of candidate.entries) {
      expect(getWordExample({ term: entry.term, chineseGloss: "" })).toMatchObject({
        focusWord: entry.focusWord,
        sentence: entry.sentence,
        chinese: entry.chinese,
      });
    }
  });

  it("uses intended senses for the fifth grammar batch", () => {
    const expectedExamples = {
      neither: ["Neither answer is correct.", "neither = 两个都不；两个答案都不正确。"],
      "next to": ["The pharmacy is next to the bank.", "next to = 在...旁边；药店在银行旁边。"],
      no: ["There is no milk left in the fridge.", "no = 没有；冰箱里没有牛奶了。"],
      none: ["None of these keys opens the door.", "none = 一个也没有；这些钥匙一个也打不开门。"],
      "o’clock": ["The lesson starts at eight o'clock.", "o'clock = 点钟；课程八点开始。"],
      of: ["I would like a cup of tea.", "of = ...的；我想喝一杯茶。"],
      off: ["Please turn off the lights.", "off = 关闭；请关灯。"],
      "oh dear": ["Oh dear, we have missed the last train.", "oh dear = 哎呀；哎呀，我们错过末班火车了。"],
      "on board": ["All the passengers are now on board.", "on board = 在车船飞机上；所有乘客现在都已登乘。"],
      once: ["I go swimming once a week.", "once = 一次；我每周游泳一次。"],
      "on fire": ["The old building was on fire.", "on fire = 着火；那栋旧楼着火了。"],
      only: ["Only members can use the gym.", "only = 只有；只有会员可以使用健身房。"],
      "on request": ["Extra towels are available on request.", "on request = 应要求；如有需要可以提供额外毛巾。"],
      otherwise: ["Leave now, otherwise you will miss the bus.", "otherwise = 否则；现在就走，否则你会错过公交车。"],
      ought: ["You ought to apologise to her.", "ought = 应该；你应该向她道歉。"],
      ourselves: ["We painted the room ourselves.", "ourselves = 我们亲自；我们亲自粉刷了房间。"],
      out: ["She went out after dinner.", "out = 出去；她晚饭后出去了。"],
      "out of": ["He took a notebook out of his bag.", "out of = 从...里面；他从包里拿出一本笔记本。"],
      over: ["The lesson is over at four o'clock.", "over = 结束；课程四点结束。"],
      pardon: ["Pardon me, could you repeat that?", "pardon = 请原谅；请原谅，你能再说一遍吗？"],
      per: ["Tickets cost twelve pounds per person.", "per = 每；票价为每人十二英镑。"],
      perfectly: ["I can hear you perfectly.", "perfectly = 完全地；我能完全听清你说话。"],
      personally: ["I personally prefer the earlier train.", "personally = 就个人而言；就个人而言，我更喜欢较早的火车。"],
    } as const;

    for (const [term, [sentence, chinese]] of Object.entries(expectedExamples)) {
      expect(getWordExample({ term, chineseGloss: "" })).toMatchObject({ sentence, chinese });
    }
  });

  it("adds the sixth grammar reviewed batch", () => {
    const vocabularyPath = path.resolve(
      process.cwd(),
      "src/lib/generated/pet-vocabulary.json",
    );
    const words = JSON.parse(fs.readFileSync(vocabularyPath, "utf8")) as Array<{
      term: string;
      chineseGloss: string;
      theme: string;
    }>;
    const grammarWords = words.filter((word) => word.theme === "grammar");
    const selectedExamples = grammarSixthBatch.map((term) =>
      getWordExample({ term, chineseGloss: "" }),
    );

    expect(grammarSixthBatch).toHaveLength(50);
    expect(Object.keys(getReviewedWordExamples()).length).toBeGreaterThanOrEqual(1335);
    expect(selectedExamples.every((example) => example.sentence !== null)).toBe(true);
    expect(grammarWords).toHaveLength(338);
    expect(
      grammarWords.filter((word) => getWordExample(word).sentence !== null).length,
    ).toBeGreaterThanOrEqual(279);
    expect(
      getWordExample({ term: "step forward / back / out", chineseGloss: "向前、向后或出去" }).sentence,
    ).toBeNull();
  });

  it("keeps the sixth grammar ledger aligned with reviewed examples", () => {
    const candidatePath = path.resolve(
      process.cwd(),
      "data/example-candidates/grammar-006.json",
    );
    expect(fs.existsSync(candidatePath)).toBe(true);
    if (!fs.existsSync(candidatePath)) return;

    const candidate = JSON.parse(fs.readFileSync(candidatePath, "utf8")) as {
      batchId: string;
      entries: Array<{ term: string; focusWord: string; sentence: string; chinese: string }>;
    };
    expect(candidate.batchId).toBe("grammar-006");
    expect(candidate.entries).toHaveLength(50);
    expect(candidate.entries.map((entry) => entry.term)).toEqual(grammarSixthBatch);
    for (const entry of candidate.entries) {
      expect(getWordExample({ term: entry.term, chineseGloss: "" })).toMatchObject({
        focusWord: entry.focusWord,
        sentence: entry.sentence,
        chinese: entry.chinese,
      });
    }
  });

  it("uses intended senses for the sixth grammar batch", () => {
    const expectedExamples = {
      plenty: ["We have plenty of time before the train leaves.", "plenty = 充足；火车出发前我们有充足的时间。"],
      plus: ["Two plus three equals five.", "plus = 加；二加三等于五。"],
      "p.m": ["The library closes at six p.m.", "p.m = 下午；图书馆下午六点关门。"],
      properly: ["Make sure the door is closed properly.", "properly = 正确地；确保门已正确关好。"],
      quite: ["The film was quite interesting.", "quite = 相当；这部电影相当有趣。"],
      rather: ["The room is rather small.", "rather = 相当；这个房间相当小。"],
      regarding: ["I am writing regarding your course.", "regarding = 关于；我写信是想咨询你们的课程。"],
      shall: ["Shall we meet outside the cinema?", "shall = 要不要；我们要不要在电影院外见面？"],
      since: ["I have lived here since 2022.", "since = 自从；我从2022年起就住在这里。"],
      so: ["It was late, so we took a taxi.", "so = 所以；天晚了，所以我们乘了出租车。"],
      somebody: ["Somebody left a bag on the bus.", "somebody = 有人；有人把包落在公交车上了。"],
      somewhere: ["Let us find somewhere quiet to study.", "somewhere = 某个地方；我们找个安静的地方学习吧。"],
      specially: ["This cake was specially made for you.", "specially = 特意地；这个蛋糕是特意为你做的。"],
      still: ["It is still raining outside.", "still = 仍然；外面仍然在下雨。"],
      such: ["It was such a beautiful day.", "such = 如此；那是如此美好的一天。"],
      terribly: ["I am terribly sorry about the mistake.", "terribly = 非常；对于这个错误我非常抱歉。"],
      the: ["Please close the door.", "the = 定冠词；请关上门。"],
      theirs: ["The bicycles by the gate are theirs.", "theirs = 他们的；门边的自行车是他们的。"],
      themselves: ["They made the costumes themselves.", "themselves = 他们亲自；他们亲自制作了服装。"],
      therefore: ["The road was closed; therefore, we took another route.", "therefore = 因此；道路封闭了，因此我们走了另一条路线。"],
    } as const;

    for (const [term, [sentence, chinese]] of Object.entries(expectedExamples)) {
      expect(getWordExample({ term, chineseGloss: "" })).toMatchObject({ sentence, chinese });
    }
  });

  it("adds the seventh grammar reviewed batch", () => {
    const vocabularyPath = path.resolve(
      process.cwd(),
      "src/lib/generated/pet-vocabulary.json",
    );
    const words = JSON.parse(fs.readFileSync(vocabularyPath, "utf8")) as Array<{
      term: string;
      chineseGloss: string;
      theme: string;
    }>;
    const grammarWords = words.filter((word) => word.theme === "grammar");
    const selectedExamples = grammarSeventhBatch.map((term) =>
      getWordExample({ term, chineseGloss: "" }),
    );

    expect(grammarSeventhBatch).toHaveLength(50);
    expect(Object.keys(getReviewedWordExamples()).length).toBeGreaterThanOrEqual(1385);
    expect(selectedExamples.every((example) => example.sentence !== null)).toBe(true);
    expect(grammarWords).toHaveLength(338);
    expect(
      grammarWords.filter((word) => getWordExample(word).sentence !== null).length,
    ).toBeGreaterThanOrEqual(329);
    expect(
      getWordExample({ term: "step forward / back / out", chineseGloss: "向前、向后或出去" }).sentence,
    ).toBeNull();
  });

  it("keeps the seventh grammar ledger aligned with reviewed examples", () => {
    const candidatePath = path.resolve(
      process.cwd(),
      "data/example-candidates/grammar-007.json",
    );
    expect(fs.existsSync(candidatePath)).toBe(true);
    if (!fs.existsSync(candidatePath)) return;

    const candidate = JSON.parse(fs.readFileSync(candidatePath, "utf8")) as {
      batchId: string;
      entries: Array<{ term: string; focusWord: string; sentence: string; chinese: string }>;
    };
    expect(candidate.batchId).toBe("grammar-007");
    expect(candidate.entries).toHaveLength(50);
    expect(candidate.entries.map((entry) => entry.term)).toEqual(grammarSeventhBatch);
    for (const entry of candidate.entries) {
      expect(getWordExample({ term: entry.term, chineseGloss: "" })).toMatchObject({
        focusWord: entry.focusWord,
        sentence: entry.sentence,
        chinese: entry.chinese,
      });
    }
  });

  it("uses intended senses for the seventh grammar batch", () => {
    const expectedExamples = {
      though: ["Though it was cold, we went swimming.", "though = 虽然；虽然天气很冷，我们还是去游泳了。"],
      till: ["Wait here till I come back.", "till = 直到；在这里等到我回来。"],
      too: ["This bag is too heavy.", "too = 太；这个包太重了。"],
      toward: ["She walked toward the entrance.", "toward = 朝向；她朝入口走去。"],
      typically: ["The journey typically takes an hour.", "typically = 通常；这段旅程通常需要一个小时。"],
      unless: ["You cannot enter unless you have a ticket.", "unless = 除非；除非你有票，否则不能进入。"],
      unusual: ["It is unusual to see snow here in April.", "unusual = 不寻常的；四月在这里看到雪并不寻常。"],
      upon: ["The book was lying upon the table.", "upon = 在...上；书放在桌子上。"],
      "up to": ["This lift can carry up to eight people.", "up to = 最多；这部电梯最多可载八人。"],
      "used to": ["We used to live near the sea.", "used to = 过去常常；我们过去住在海边。"],
      "v / versus": ["The final is Brazil versus Spain.", "versus = 对阵；决赛由巴西对阵西班牙。"],
      "well made / well-made": ["This jacket is well made and should last for years.", "well made = 做工精良；这件夹克做工精良，应该能穿很多年。"],
      whatever: ["Choose whatever you like.", "whatever = 无论什么；选择任何你喜欢的东西。"],
      whenever: ["Call me whenever you need help.", "whenever = 无论何时；无论何时需要帮助都可以给我打电话。"],
      wherever: ["You can sit wherever you like.", "wherever = 无论哪里；你喜欢坐哪里都可以。"],
      whether: ["I do not know whether he will come.", "whether = 是否；我不知道他是否会来。"],
      whole: ["We spent the whole day at the beach.", "whole = 整个；我们在海滩度过了整整一天。"],
      within: ["Please reply within five days.", "within = 在...以内；请在五天内回复。"],
      without: ["He left without saying goodbye.", "without = 没有；他没有告别就离开了。"],
      would: ["Would you like a cup of tea?", "would = 愿意；你想喝杯茶吗？"],
    } as const;

    for (const [term, [sentence, chinese]] of Object.entries(expectedExamples)) {
      expect(getWordExample({ term, chineseGloss: "" })).toMatchObject({ sentence, chinese });
    }
  });

  it("adds the final grammar reviewed batch", () => {
    const vocabularyPath = path.resolve(
      process.cwd(),
      "src/lib/generated/pet-vocabulary.json",
    );
    const words = JSON.parse(fs.readFileSync(vocabularyPath, "utf8")) as Array<{
      term: string;
      chineseGloss: string;
      theme: string;
    }>;
    const grammarWords = words.filter((word) => word.theme === "grammar");
    const selectedExamples = grammarEighthBatch.map((term) =>
      getWordExample({ term, chineseGloss: "" }),
    );

    expect(grammarEighthBatch).toHaveLength(9);
    expect(Object.keys(getReviewedWordExamples()).length).toBeGreaterThanOrEqual(1394);
    expect(selectedExamples.every((example) => example.sentence !== null)).toBe(true);
    expect(grammarWords).toHaveLength(338);
    expect(
      grammarWords.filter((word) => getWordExample(word).sentence !== null).length,
    ).toBe(338);
  });

  it("keeps the final grammar ledger aligned with reviewed examples", () => {
    const candidatePath = path.resolve(
      process.cwd(),
      "data/example-candidates/grammar-008.json",
    );
    expect(fs.existsSync(candidatePath)).toBe(true);
    if (!fs.existsSync(candidatePath)) return;

    const candidate = JSON.parse(fs.readFileSync(candidatePath, "utf8")) as {
      batchId: string;
      entries: Array<{ term: string; focusWord: string; sentence: string; chinese: string }>;
    };
    expect(candidate.batchId).toBe("grammar-008");
    expect(candidate.entries).toHaveLength(9);
    expect(candidate.entries.map((entry) => entry.term)).toEqual(grammarEighthBatch);
    for (const entry of candidate.entries) {
      expect(getWordExample({ term: entry.term, chineseGloss: "" })).toMatchObject({
        focusWord: entry.focusWord,
        sentence: entry.sentence,
        chinese: entry.chinese,
      });
    }
  });

  it("uses intended senses for the final grammar batch", () => {
    const expectedExamples = {
      wow: ["Wow, this view is amazing!", "wow = 哇；哇，这里的景色太棒了！"],
      yeah: ["Yeah, I can help you tomorrow.", "yeah = 是的；是的，我明天可以帮你。"],
      yes: ["Yes, I have finished my homework.", "yes = 是的；是的，我已经完成家庭作业了。"],
      yet: ["Have you finished your homework yet?", "yet = 还；你完成家庭作业了吗？"],
      you: ["You can sit here.", "you = 你；你可以坐在这里。"],
      "you know": ["You know, this is a difficult decision.", "you know = 你知道的；你知道的，这是一个艰难的决定。"],
      your: ["Is this your jacket?", "your = 你的；这是你的夹克吗？"],
      yours: ["This umbrella is yours.", "yours = 你的；这把伞是你的。"],
      yourself: ["Did you make this cake yourself?", "yourself = 你亲自；这个蛋糕是你亲自做的吗？"],
    } as const;

    for (const [term, [sentence, chinese]] of Object.entries(expectedExamples)) {
      expect(getWordExample({ term, chineseGloss: "" })).toMatchObject({ sentence, chinese });
    }
  });

  it("adds the first objects reviewed batch", () => {
    const vocabularyPath = path.resolve(
      process.cwd(),
      "src/lib/generated/pet-vocabulary.json",
    );
    const words = JSON.parse(fs.readFileSync(vocabularyPath, "utf8")) as Array<{
      term: string;
      chineseGloss: string;
      theme: string;
    }>;
    const objectsWords = words.filter((word) => word.theme === "objects");
    const selectedExamples = objectsFirstBatch.map((term) =>
      getWordExample({ term, chineseGloss: "" }),
    );

    expect(objectsFirstBatch).toHaveLength(50);
    expect(Object.keys(getReviewedWordExamples()).length).toBeGreaterThanOrEqual(1444);
    expect(selectedExamples.every((example) => example.sentence !== null)).toBe(true);
    expect(objectsWords).toHaveLength(972);
    expect(
      objectsWords.filter((word) => getWordExample(word).sentence !== null).length,
    ).toBeGreaterThanOrEqual(104);
  });

  it("keeps the first objects ledger aligned with reviewed examples", () => {
    const candidatePath = path.resolve(
      process.cwd(),
      "data/example-candidates/objects-001.json",
    );
    expect(fs.existsSync(candidatePath)).toBe(true);
    if (!fs.existsSync(candidatePath)) return;

    const candidate = JSON.parse(fs.readFileSync(candidatePath, "utf8")) as {
      batchId: string;
      entries: Array<{ term: string; focusWord: string; sentence: string; chinese: string }>;
    };
    expect(candidate.batchId).toBe("objects-001");
    expect(candidate.entries).toHaveLength(50);
    expect(candidate.entries.map((entry) => entry.term)).toEqual(objectsFirstBatch);
    for (const entry of candidate.entries) {
      expect(getWordExample({ term: entry.term, chineseGloss: "" })).toMatchObject({
        focusWord: entry.focusWord,
        sentence: entry.sentence,
        chinese: entry.chinese,
      });
    }
  });

  it("uses intended senses for the first objects batch", () => {
    const expectedExamples = {
      access: ["You need a password to get access to the website.", "access = 访问权限；你需要密码才能访问这个网站。"],
      ad: ["I saw an ad for a new bike.", "ad = 广告；我看到了一则新自行车的广告。"],
      aim: ["My aim is to pass the exam.", "aim = 目标；我的目标是通过考试。"],
      alarm: ["The fire alarm rang loudly.", "alarm = 警报器；火警警报器大声响了。"],
      "at / @": ["Write the at sign between your name and the website.", "at sign = @符号；在你的名字和网站之间写上@符号。"],
      attack: ["The team started a strong attack.", "attack = 进攻；球队发动了一次强有力的进攻。"],
      band: ["The school band played at the concert.", "band = 乐队；学校乐队在音乐会上演奏。"],
      bar: ["We met at a small bar near the station.", "bar = 酒吧；我们在车站附近的一家小酒吧见面。"],
    } as const;

    for (const [term, [sentence, chinese]] of Object.entries(expectedExamples)) {
      expect(getWordExample({ term, chineseGloss: "" })).toMatchObject({ sentence, chinese });
    }
  });

  it("adds the second objects reviewed batch", () => {
    const vocabularyPath = path.resolve(
      process.cwd(),
      "src/lib/generated/pet-vocabulary.json",
    );
    const words = JSON.parse(fs.readFileSync(vocabularyPath, "utf8")) as Array<{
      term: string;
      chineseGloss: string;
      theme: string;
    }>;
    const objectsWords = words.filter((word) => word.theme === "objects");
    const selectedExamples = objectsSecondBatch.map((term) =>
      getWordExample({ term, chineseGloss: "" }),
    );

    expect(objectsSecondBatch).toHaveLength(50);
    expect(Object.keys(getReviewedWordExamples()).length).toBeGreaterThanOrEqual(1494);
    expect(selectedExamples.every((example) => example.sentence !== null)).toBe(true);
    expect(objectsWords).toHaveLength(972);
    expect(
      objectsWords.filter((word) => getWordExample(word).sentence !== null).length,
    ).toBeGreaterThanOrEqual(154);
  });

  it("keeps the second objects ledger aligned with reviewed examples", () => {
    const candidatePath = path.resolve(
      process.cwd(),
      "data/example-candidates/objects-002.json",
    );
    expect(fs.existsSync(candidatePath)).toBe(true);
    if (!fs.existsSync(candidatePath)) return;

    const candidate = JSON.parse(fs.readFileSync(candidatePath, "utf8")) as {
      batchId: string;
      entries: Array<{ term: string; focusWord: string; sentence: string; chinese: string }>;
    };
    expect(candidate.batchId).toBe("objects-002");
    expect(candidate.entries).toHaveLength(50);
    expect(candidate.entries.map((entry) => entry.term)).toEqual(objectsSecondBatch);
    for (const entry of candidate.entries) {
      expect(getWordExample({ term: entry.term, chineseGloss: "" })).toMatchObject({
        focusWord: entry.focusWord,
        sentence: entry.sentence,
        chinese: entry.chinese,
      });
    }
  });

  it("uses intended senses for the second objects batch", () => {
    const expectedExamples = {
      bargain: ["This jacket was a real bargain in the sale.", "bargain = 便宜货；这件夹克在促销中真是便宜货。"],
      bat: ["He hit the ball with a bat.", "bat = 球棒；他用球棒击球。"],
      benefit: ["One benefit of cycling is fresh air.", "benefit = 好处；骑自行车的一个好处是能呼吸新鲜空气。"],
      block: ["He put a block of wood under the door.", "block = 块；他把一块木头放在门下面。"],
      board: ["Write your answers on the board.", "board = 板；把你的答案写在板上。"],
      booking: ["I made a booking for two rooms.", "booking = 预订；我预订了两个房间。"],
      boss: ["My boss approved the plan.", "boss = 老板；我的老板批准了这个计划。"],
      brake: ["The bike brake needs fixing.", "brake = 刹车；这辆自行车的刹车需要修理。"],
    } as const;

    for (const [term, [sentence, chinese]] of Object.entries(expectedExamples)) {
      expect(getWordExample({ term, chineseGloss: "" })).toMatchObject({ sentence, chinese });
    }
  });

  it("adds the third objects reviewed batch", () => {
    const vocabularyPath = path.resolve(
      process.cwd(),
      "src/lib/generated/pet-vocabulary.json",
    );
    const words = JSON.parse(fs.readFileSync(vocabularyPath, "utf8")) as Array<{
      term: string;
      chineseGloss: string;
      theme: string;
    }>;
    const objectsWords = words.filter((word) => word.theme === "objects");
    const selectedExamples = objectsThirdBatch.map((term) =>
      getWordExample({ term, chineseGloss: "" }),
    );

    expect(objectsThirdBatch).toHaveLength(50);
    expect(Object.keys(getReviewedWordExamples()).length).toBeGreaterThanOrEqual(1544);
    expect(selectedExamples.every((example) => example.sentence !== null)).toBe(true);
    expect(objectsWords).toHaveLength(972);
    expect(
      objectsWords.filter((word) => getWordExample(word).sentence !== null).length,
    ).toBeGreaterThanOrEqual(204);
  });

  it("keeps the third objects ledger aligned with reviewed examples", () => {
    const candidatePath = path.resolve(
      process.cwd(),
      "data/example-candidates/objects-003.json",
    );
    expect(fs.existsSync(candidatePath)).toBe(true);
    if (!fs.existsSync(candidatePath)) return;

    const candidate = JSON.parse(fs.readFileSync(candidatePath, "utf8")) as {
      batchId: string;
      entries: Array<{ term: string; focusWord: string; sentence: string; chinese: string }>;
    };
    expect(candidate.batchId).toBe("objects-003");
    expect(candidate.entries).toHaveLength(50);
    expect(candidate.entries.map((entry) => entry.term)).toEqual(objectsThirdBatch);
    for (const entry of candidate.entries) {
      expect(getWordExample({ term: entry.term, chineseGloss: "" })).toMatchObject({
        focusWord: entry.focusWord,
        sentence: entry.sentence,
        chinese: entry.chinese,
      });
    }
  });

  it("uses intended senses for the third objects batch", () => {
    const expectedExamples = {
      brochure: ["Pick up a brochure at the tourist office.", "brochure = 小册子；在旅游办公室拿一本小册子。"],
      bug: ["The computer game has a small bug.", "bug = 程序错误；这个电脑游戏有一个小程序错误。"],
      "café / cafe": ["Let's meet at the cafe after school.", "cafe = 咖啡馆；我们放学后在咖啡馆见面吧。"],
      calf: ["The young calf stayed close to its mother.", "calf = 小牛；小牛紧挨着它的妈妈。"],
      care: ["The old house needs a lot of care.", "care = 照料；这座老房子需要大量照料。"],
      challenge: ["Climbing the hill was a real challenge.", "challenge = 挑战；爬这座山真是一次挑战。"],
      channel: ["Change the channel if the film is boring.", "channel = 频道；如果电影无聊就换个频道。"],
      charge: ["There is no charge for museum entry.", "charge = 费用；博物馆入场不收费。"],
    } as const;

    for (const [term, [sentence, chinese]] of Object.entries(expectedExamples)) {
      expect(getWordExample({ term, chineseGloss: "" })).toMatchObject({ sentence, chinese });
    }
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
