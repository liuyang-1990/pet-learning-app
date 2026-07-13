# PET Example Coverage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the first reviewed PET example batch for 50 nature, weather, and outdoor vocabulary terms, including `cloudy`.

**Architecture:** Keep candidate examples as review material under `data/example-candidates/`, then promote accepted entries into `getReviewedWordExamples()` in `src/lib/pet-learning-app.ts`. Learner-facing code continues to read only reviewed examples, and the generated example fallback remains empty.

**Tech Stack:** Next.js 15, React 19, TypeScript, Vitest, Google Translate audit script via `npm run audit:examples`.

## Global Constraints

- Learner-facing examples must stay reviewed-only.
- Candidate examples must not be imported by application code.
- First batch covers 50 missing official vocabulary rows from nature, weather, and outdoor-adjacent terms.
- `cloudy` must have a reviewed learner-facing sentence.
- Generated example fallback stays disabled: `generatedWordExamples` remains `{}`.
- `npm run audit:examples`, `npm test`, and `npm run build` must pass before completion.

---

## File Structure

- Create `data/example-candidates/nature-weather-001.json`: review ledger for the first 50 candidate examples. This file is not imported by app code.
- Modify `src/lib/pet-learning-app.test.ts`: add regression tests for the first batch coverage, `cloudy`, minimum reviewed count, and bad fallback phrases.
- Modify `src/lib/pet-learning-app.ts`: promote the accepted 50 examples into `getReviewedWordExamples()`.
- Regenerate `src/lib/generated/pet-word-example-audit.ts`: created by `npm run audit:examples` after examples are promoted.
- Possibly update `data/google-translation-audit-cache.json`: produced by the audit script cache if new translation requests are made.

## First Batch Terms

Use exactly these 50 currently missing terms:

```text
cloudy, crop, dust, dusty, environmental, farm, field, garden, hill, island,
moon, nature, ocean, recycled, season, snow, star, sun, thunder, windy,
air, clean, cold, cool, dark, dirty, dry, fresh, green, ground,
hot, land, light, outdoor, outside, rock, space, storm, temperature, warm,
wet, wild, wood, wooden, world, bright, clear, deep, high, low
```

---

### Task 1: Add Failing Coverage Tests

**Files:**
- Modify: `src/lib/pet-learning-app.test.ts`

**Interfaces:**
- Consumes: `getWordExample(word: VocabularyItem): WordExample`
- Consumes: `getReviewedWordExamples(): Record<string, WordExample>`
- Produces: tests that require 50 new reviewed examples and no generated fallback content.

- [ ] **Step 1: Add the first batch term constant near the existing imports**

Add this block after the imports in `src/lib/pet-learning-app.test.ts`:

```ts
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
```

- [ ] **Step 2: Add reviewed batch regression tests**

Add these tests near the existing example tests in `src/lib/pet-learning-app.test.ts`:

```ts
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
```

- [ ] **Step 3: Run the new tests and verify they fail for the right reason**

Run:

```bash
npm test -- src/lib/pet-learning-app.test.ts -t "first reviewed nature and weather|cloudy and nearby weather"
```

Expected: FAIL because `cloudy` and the rest of the first batch still return `sentence: null`, and reviewed count is still 85.

- [ ] **Step 4: Commit the failing tests**

```bash
git add src/lib/pet-learning-app.test.ts
git commit -m "test: require first PET nature example batch"
```

---

### Task 2: Add Candidate Ledger And Promote Reviewed Examples

**Files:**
- Create: `data/example-candidates/nature-weather-001.json`
- Modify: `src/lib/pet-learning-app.ts`

**Interfaces:**
- Consumes: first batch tests from Task 1.
- Produces: 50 new entries in `getReviewedWordExamples()` keyed by normalized terms.

- [ ] **Step 1: Create the candidate review ledger**

Create `data/example-candidates/nature-weather-001.json` with this exact content:

```json
{
  "batchId": "nature-weather-001",
  "status": "promoted",
  "entries": [
    { "term": "cloudy", "focusWord": "cloudy", "sentence": "It was cloudy, but it did not rain.", "chinese": "cloudy = 多云的；天气多云，但没有下雨。" },
    { "term": "crop", "focusWord": "crop", "sentence": "The farmer sold his potato crop at the market.", "chinese": "crop = 农作物；农民在市场上卖了他的土豆作物。" },
    { "term": "dust", "focusWord": "dust", "sentence": "Dust covered the old table by the window.", "chinese": "dust = 灰尘；灰尘覆盖了窗边的旧桌子。" },
    { "term": "dusty", "focusWord": "dusty", "sentence": "My shoes got dusty on the dry path.", "chinese": "dusty = 灰尘多的；我的鞋在干燥的小路上沾满了灰尘。" },
    { "term": "environmental", "focusWord": "environmental", "sentence": "Our school started an environmental club last year.", "chinese": "environmental = 环保的；我们学校去年成立了一个环保俱乐部。" },
    { "term": "farm", "focusWord": "farm", "sentence": "We stayed on a farm during the summer holiday.", "chinese": "farm = 农场；暑假期间我们住在一个农场里。" },
    { "term": "field", "focusWord": "field", "sentence": "The sheep were standing in the field.", "chinese": "field = 田地；羊正站在田地里。" },
    { "term": "garden", "focusWord": "garden", "sentence": "We planted tomatoes in the garden behind our house.", "chinese": "garden = 菜园；我们在屋后的菜园里种了西红柿。" },
    { "term": "hill", "focusWord": "hill", "sentence": "The hill was steep, but the view was beautiful.", "chinese": "hill = 小山；这座小山很陡，但景色很美。" },
    { "term": "island", "focusWord": "island", "sentence": "We took a boat to a small island.", "chinese": "island = 岛；我们坐船去了一座小岛。" },
    { "term": "moon", "focusWord": "moon", "sentence": "The moon looked bright above the houses.", "chinese": "moon = 月亮；月亮在房子上方显得很明亮。" },
    { "term": "nature", "focusWord": "nature", "sentence": "Spending time in nature helps me feel calm.", "chinese": "nature = 大自然；在大自然中待一会儿能让我感到平静。" },
    { "term": "ocean", "focusWord": "ocean", "sentence": "The ocean was too rough for swimming.", "chinese": "ocean = 海洋；海面太汹涌，不适合游泳。" },
    { "term": "recycled", "focusWord": "recycled", "sentence": "This notebook is made from recycled paper.", "chinese": "recycled = 回收利用的；这个笔记本是用再生纸做的。" },
    { "term": "season", "focusWord": "season", "sentence": "Autumn is my favourite season because the weather is cool.", "chinese": "season = 季节；秋天是我最喜欢的季节，因为天气凉爽。" },
    { "term": "snow", "focusWord": "snow", "sentence": "Snow covered the road before breakfast.", "chinese": "snow = 雪；早饭前雪覆盖了道路。" },
    { "term": "star", "focusWord": "star", "sentence": "I saw one bright star in the dark sky.", "chinese": "star = 星；我在黑暗的天空中看到了一颗明亮的星星。" },
    { "term": "sun", "focusWord": "sun", "sentence": "The sun came out after the rain stopped.", "chinese": "sun = 太阳；雨停后太阳出来了。" },
    { "term": "thunder", "focusWord": "thunder", "sentence": "The thunder was loud, so we went inside.", "chinese": "thunder = 雷声；雷声很大，所以我们进屋了。" },
    { "term": "windy", "focusWord": "windy", "sentence": "It was windy, and my hair blew everywhere.", "chinese": "windy = 多风的；风很大，我的头发被吹得到处乱飞。" },
    { "term": "air", "focusWord": "air", "sentence": "The air feels fresh after heavy rain.", "chinese": "air = 空气；大雨后空气感觉很清新。" },
    { "term": "clean", "focusWord": "clean", "sentence": "Please keep the river clean for the fish.", "chinese": "clean = 干净的；请为了鱼让河水保持干净。" },
    { "term": "cold", "focusWord": "cold", "sentence": "It was cold, so I wore my thick coat.", "chinese": "cold = 寒冷的；天气很冷，所以我穿了厚外套。" },
    { "term": "cool", "focusWord": "cool", "sentence": "The evening was cool after a hot day.", "chinese": "cool = 凉爽的；炎热的一天之后，傍晚很凉爽。" },
    { "term": "dark", "focusWord": "dark", "sentence": "The sky became dark before the storm.", "chinese": "dark = 黑暗的；暴风雨前天空变暗了。" },
    { "term": "dirty", "focusWord": "dirty", "sentence": "My trousers got dirty after I sat on the ground.", "chinese": "dirty = 脏的；我坐在地上后裤子弄脏了。" },
    { "term": "dry", "focusWord": "dry", "sentence": "The ground was dry because it had not rained.", "chinese": "dry = 干的；因为没有下雨，地面是干的。" },
    { "term": "fresh", "focusWord": "fresh", "sentence": "We opened the window for some fresh air.", "chinese": "fresh = 新鲜的；我们打开窗户，好呼吸一些新鲜空气。" },
    { "term": "green", "focusWord": "green", "sentence": "The hills look green after spring rain.", "chinese": "green = 绿色的；春雨过后，小山看起来绿油油的。" },
    { "term": "ground", "focusWord": "ground", "sentence": "Put the picnic blanket on the ground.", "chinese": "ground = 地面；把野餐毯放在地面上。" },
    { "term": "hot", "focusWord": "hot", "sentence": "The sand was hot under my feet.", "chinese": "hot = 热的；我脚下的沙子很烫。" },
    { "term": "land", "focusWord": "land", "sentence": "The plane flew over land for two hours.", "chinese": "land = 陆地；飞机在陆地上空飞了两个小时。" },
    { "term": "light", "focusWord": "light", "sentence": "Morning light came through the bedroom window.", "chinese": "light = 光；晨光透过卧室窗户照了进来。" },
    { "term": "outdoor", "focusWord": "outdoor", "sentence": "We had an outdoor lesson in the school garden.", "chinese": "outdoor = 户外的；我们在学校花园里上了一节户外课。" },
    { "term": "outside", "focusWord": "outside", "sentence": "It was raining outside when I woke up.", "chinese": "outside = 外面；我醒来时外面正在下雨。" },
    { "term": "rock", "focusWord": "rock", "sentence": "I sat on a flat rock near the lake.", "chinese": "rock = 岩石；我坐在湖边一块平坦的岩石上。" },
    { "term": "space", "focusWord": "space", "sentence": "There is enough space for flowers beside the path.", "chinese": "space = 空间；小路旁有足够的空间种花。" },
    { "term": "storm", "focusWord": "storm", "sentence": "The storm damaged two trees near our school.", "chinese": "storm = 暴风雨；暴风雨损坏了我们学校附近的两棵树。" },
    { "term": "temperature", "focusWord": "temperature", "sentence": "The temperature dropped quickly in the evening.", "chinese": "temperature = 温度；傍晚温度下降得很快。" },
    { "term": "warm", "focusWord": "warm", "sentence": "The sun felt warm on my face.", "chinese": "warm = 温暖的；阳光照在我脸上感觉很温暖。" },
    { "term": "wet", "focusWord": "wet", "sentence": "The grass was wet after the rain.", "chinese": "wet = 潮湿的；雨后草地是湿的。" },
    { "term": "wild", "focusWord": "wild", "sentence": "We saw wild flowers beside the road.", "chinese": "wild = 野生的；我们在路边看到了野花。" },
    { "term": "wood", "focusWord": "wood", "sentence": "This table is made of strong wood.", "chinese": "wood = 木材；这张桌子是用结实的木材做的。" },
    { "term": "wooden", "focusWord": "wooden", "sentence": "The children crossed a small wooden bridge.", "chinese": "wooden = 木制的；孩子们走过了一座小木桥。" },
    { "term": "world", "focusWord": "world", "sentence": "People around the world need clean water.", "chinese": "world = 世界；世界各地的人都需要干净的水。" },
    { "term": "bright", "focusWord": "bright", "sentence": "The morning was bright after the clouds disappeared.", "chinese": "bright = 明亮的；云散后，早晨变得很明亮。" },
    { "term": "clear", "focusWord": "clear", "sentence": "The sky was clear, so we could see the stars.", "chinese": "clear = 晴朗的；天空晴朗，所以我们能看到星星。" },
    { "term": "deep", "focusWord": "deep", "sentence": "The lake is too deep for young swimmers.", "chinese": "deep = 深的；这个湖对年幼的游泳者来说太深了。" },
    { "term": "high", "focusWord": "high", "sentence": "The mountain looked high from the village.", "chinese": "high = 高的；从村子看，那座山显得很高。" },
    { "term": "low", "focusWord": "low", "sentence": "The sun was low when we walked home.", "chinese": "low = 低的；我们走回家时，太阳已经很低了。" }
  ]
}
```

- [ ] **Step 2: Promote the same 50 entries into `getReviewedWordExamples()`**

In `src/lib/pet-learning-app.ts`, add these entries inside the object returned by `getReviewedWordExamples()`, near the existing nature examples:

```ts
    cloudy: {
      focusWord: "cloudy",
      sentence: "It was cloudy, but it did not rain.",
      chinese: "cloudy = 多云的；天气多云，但没有下雨。",
    },
    crop: {
      focusWord: "crop",
      sentence: "The farmer sold his potato crop at the market.",
      chinese: "crop = 农作物；农民在市场上卖了他的土豆作物。",
    },
    dust: {
      focusWord: "dust",
      sentence: "Dust covered the old table by the window.",
      chinese: "dust = 灰尘；灰尘覆盖了窗边的旧桌子。",
    },
    dusty: {
      focusWord: "dusty",
      sentence: "My shoes got dusty on the dry path.",
      chinese: "dusty = 灰尘多的；我的鞋在干燥的小路上沾满了灰尘。",
    },
    environmental: {
      focusWord: "environmental",
      sentence: "Our school started an environmental club last year.",
      chinese: "environmental = 环保的；我们学校去年成立了一个环保俱乐部。",
    },
    farm: {
      focusWord: "farm",
      sentence: "We stayed on a farm during the summer holiday.",
      chinese: "farm = 农场；暑假期间我们住在一个农场里。",
    },
    field: {
      focusWord: "field",
      sentence: "The sheep were standing in the field.",
      chinese: "field = 田地；羊正站在田地里。",
    },
    garden: {
      focusWord: "garden",
      sentence: "We planted tomatoes in the garden behind our house.",
      chinese: "garden = 菜园；我们在屋后的菜园里种了西红柿。",
    },
    hill: {
      focusWord: "hill",
      sentence: "The hill was steep, but the view was beautiful.",
      chinese: "hill = 小山；这座小山很陡，但景色很美。",
    },
    island: {
      focusWord: "island",
      sentence: "We took a boat to a small island.",
      chinese: "island = 岛；我们坐船去了一座小岛。",
    },
    moon: {
      focusWord: "moon",
      sentence: "The moon looked bright above the houses.",
      chinese: "moon = 月亮；月亮在房子上方显得很明亮。",
    },
    nature: {
      focusWord: "nature",
      sentence: "Spending time in nature helps me feel calm.",
      chinese: "nature = 大自然；在大自然中待一会儿能让我感到平静。",
    },
    ocean: {
      focusWord: "ocean",
      sentence: "The ocean was too rough for swimming.",
      chinese: "ocean = 海洋；海面太汹涌，不适合游泳。",
    },
    recycled: {
      focusWord: "recycled",
      sentence: "This notebook is made from recycled paper.",
      chinese: "recycled = 回收利用的；这个笔记本是用再生纸做的。",
    },
    season: {
      focusWord: "season",
      sentence: "Autumn is my favourite season because the weather is cool.",
      chinese: "season = 季节；秋天是我最喜欢的季节，因为天气凉爽。",
    },
    snow: {
      focusWord: "snow",
      sentence: "Snow covered the road before breakfast.",
      chinese: "snow = 雪；早饭前雪覆盖了道路。",
    },
    star: {
      focusWord: "star",
      sentence: "I saw one bright star in the dark sky.",
      chinese: "star = 星；我在黑暗的天空中看到了一颗明亮的星星。",
    },
    sun: {
      focusWord: "sun",
      sentence: "The sun came out after the rain stopped.",
      chinese: "sun = 太阳；雨停后太阳出来了。",
    },
    thunder: {
      focusWord: "thunder",
      sentence: "The thunder was loud, so we went inside.",
      chinese: "thunder = 雷声；雷声很大，所以我们进屋了。",
    },
    windy: {
      focusWord: "windy",
      sentence: "It was windy, and my hair blew everywhere.",
      chinese: "windy = 多风的；风很大，我的头发被吹得到处乱飞。",
    },
```

Also add the remaining outdoor-adjacent entries near other general reviewed examples in the same object:

```ts
    air: {
      focusWord: "air",
      sentence: "The air feels fresh after heavy rain.",
      chinese: "air = 空气；大雨后空气感觉很清新。",
    },
    clean: {
      focusWord: "clean",
      sentence: "Please keep the river clean for the fish.",
      chinese: "clean = 干净的；请为了鱼让河水保持干净。",
    },
    cold: {
      focusWord: "cold",
      sentence: "It was cold, so I wore my thick coat.",
      chinese: "cold = 寒冷的；天气很冷，所以我穿了厚外套。",
    },
    cool: {
      focusWord: "cool",
      sentence: "The evening was cool after a hot day.",
      chinese: "cool = 凉爽的；炎热的一天之后，傍晚很凉爽。",
    },
    dark: {
      focusWord: "dark",
      sentence: "The sky became dark before the storm.",
      chinese: "dark = 黑暗的；暴风雨前天空变暗了。",
    },
    dirty: {
      focusWord: "dirty",
      sentence: "My trousers got dirty after I sat on the ground.",
      chinese: "dirty = 脏的；我坐在地上后裤子弄脏了。",
    },
    dry: {
      focusWord: "dry",
      sentence: "The ground was dry because it had not rained.",
      chinese: "dry = 干的；因为没有下雨，地面是干的。",
    },
    fresh: {
      focusWord: "fresh",
      sentence: "We opened the window for some fresh air.",
      chinese: "fresh = 新鲜的；我们打开窗户，好呼吸一些新鲜空气。",
    },
    green: {
      focusWord: "green",
      sentence: "The hills look green after spring rain.",
      chinese: "green = 绿色的；春雨过后，小山看起来绿油油的。",
    },
    ground: {
      focusWord: "ground",
      sentence: "Put the picnic blanket on the ground.",
      chinese: "ground = 地面；把野餐毯放在地面上。",
    },
    hot: {
      focusWord: "hot",
      sentence: "The sand was hot under my feet.",
      chinese: "hot = 热的；我脚下的沙子很烫。",
    },
    land: {
      focusWord: "land",
      sentence: "The plane flew over land for two hours.",
      chinese: "land = 陆地；飞机在陆地上空飞了两个小时。",
    },
    light: {
      focusWord: "light",
      sentence: "Morning light came through the bedroom window.",
      chinese: "light = 光；晨光透过卧室窗户照了进来。",
    },
    outdoor: {
      focusWord: "outdoor",
      sentence: "We had an outdoor lesson in the school garden.",
      chinese: "outdoor = 户外的；我们在学校花园里上了一节户外课。",
    },
    outside: {
      focusWord: "outside",
      sentence: "It was raining outside when I woke up.",
      chinese: "outside = 外面；我醒来时外面正在下雨。",
    },
    rock: {
      focusWord: "rock",
      sentence: "I sat on a flat rock near the lake.",
      chinese: "rock = 岩石；我坐在湖边一块平坦的岩石上。",
    },
    space: {
      focusWord: "space",
      sentence: "There is enough space for flowers beside the path.",
      chinese: "space = 空间；小路旁有足够的空间种花。",
    },
    storm: {
      focusWord: "storm",
      sentence: "The storm damaged two trees near our school.",
      chinese: "storm = 暴风雨；暴风雨损坏了我们学校附近的两棵树。",
    },
    temperature: {
      focusWord: "temperature",
      sentence: "The temperature dropped quickly in the evening.",
      chinese: "temperature = 温度；傍晚温度下降得很快。",
    },
    warm: {
      focusWord: "warm",
      sentence: "The sun felt warm on my face.",
      chinese: "warm = 温暖的；阳光照在我脸上感觉很温暖。",
    },
    wet: {
      focusWord: "wet",
      sentence: "The grass was wet after the rain.",
      chinese: "wet = 潮湿的；雨后草地是湿的。",
    },
    wild: {
      focusWord: "wild",
      sentence: "We saw wild flowers beside the road.",
      chinese: "wild = 野生的；我们在路边看到了野花。",
    },
    wood: {
      focusWord: "wood",
      sentence: "This table is made of strong wood.",
      chinese: "wood = 木材；这张桌子是用结实的木材做的。",
    },
    wooden: {
      focusWord: "wooden",
      sentence: "The children crossed a small wooden bridge.",
      chinese: "wooden = 木制的；孩子们走过了一座小木桥。",
    },
    world: {
      focusWord: "world",
      sentence: "People around the world need clean water.",
      chinese: "world = 世界；世界各地的人都需要干净的水。",
    },
    bright: {
      focusWord: "bright",
      sentence: "The morning was bright after the clouds disappeared.",
      chinese: "bright = 明亮的；云散后，早晨变得很明亮。",
    },
    clear: {
      focusWord: "clear",
      sentence: "The sky was clear, so we could see the stars.",
      chinese: "clear = 晴朗的；天空晴朗，所以我们能看到星星。",
    },
    deep: {
      focusWord: "deep",
      sentence: "The lake is too deep for young swimmers.",
      chinese: "deep = 深的；这个湖对年幼的游泳者来说太深了。",
    },
    high: {
      focusWord: "high",
      sentence: "The mountain looked high from the village.",
      chinese: "high = 高的；从村子看，那座山显得很高。",
    },
    low: {
      focusWord: "low",
      sentence: "The sun was low when we walked home.",
      chinese: "low = 低的；我们走回家时，太阳已经很低了。",
    },
```

- [ ] **Step 3: Run targeted tests**

Run:

```bash
npm test -- src/lib/pet-learning-app.test.ts -t "first reviewed nature and weather|cloudy and nearby weather"
```

Expected: PASS.

- [ ] **Step 4: Commit promoted examples and candidate ledger**

```bash
git add data/example-candidates/nature-weather-001.json src/lib/pet-learning-app.ts
git commit -m "feat: add first reviewed PET nature examples"
```

---

### Task 3: Refresh Audit And Verify Full Suite

**Files:**
- Modify: `src/lib/generated/pet-word-example-audit.ts`
- Possibly modify: `data/google-translation-audit-cache.json`

**Interfaces:**
- Consumes: 50 new reviewed examples from Task 2.
- Produces: audit entries for every reviewed example.

- [ ] **Step 1: Run the Google translation audit**

Run:

```bash
npm run audit:examples
```

Expected output:

```text
Audited 135 reviewed PET examples; 0 need review.
```

If the audit flags entries, edit the flagged examples in `src/lib/pet-learning-app.ts` and the matching candidate entries in `data/example-candidates/nature-weather-001.json`, then run `npm run audit:examples` again until the output reports zero flagged entries.

- [ ] **Step 2: Run the complete test suite**

Run:

```bash
npm test
```

Expected: all test files pass, including the audit key-set test.

- [ ] **Step 3: Run the production build**

Run:

```bash
npm run build
```

Expected: build completes successfully.

- [ ] **Step 4: Inspect the final diff**

Run:

```bash
git diff --stat
git diff -- src/lib/pet-learning-app.ts src/lib/pet-learning-app.test.ts
```

Expected: the diff contains the 50 reviewed examples, the coverage tests, and regenerated audit data. It does not re-enable `generatedWordExamples`.

- [ ] **Step 5: Commit audit and tests**

```bash
git add src/lib/pet-learning-app.test.ts src/lib/generated/pet-word-example-audit.ts data/google-translation-audit-cache.json
git commit -m "test: audit first PET nature example batch"
```

---

## Plan Self-Review

- Spec coverage: Task 1 locks reviewed count and `cloudy`; Task 2 creates the candidate ledger and promotes accepted examples; Task 3 runs audit, tests, and build.
- Red-flag scan: no incomplete-marker text or unspecified implementation steps remain.
- Type consistency: tests use existing `getWordExample()` and `getReviewedWordExamples()` signatures; promoted entries match the existing `WordExample` shape.
