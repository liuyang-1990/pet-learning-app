# PET Home and Family Example Batch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (- [ ]) syntax for tracking.

**Goal:** Add 50 reviewed PET/B1 examples for home and immediate-family vocabulary.

**Architecture:** Create a review-only ledger, promote the identical entries into getReviewedWordExamples(), and preserve reviewed-only learner behavior. The tests require every ledger entry to be returned by getWordExample() using the app's own normalization.

**Tech Stack:** Next.js 15, TypeScript, Vitest, Vite Node, Google Translate audit script.

## Global Constraints

- This batch has exactly 50 terms: 46 home terms and brother, dad, mum, sister.
- Candidate content is not imported by application code.
- The reviewed count rises from 185 to 235.
- Chinese text uses term = gloss；sentence translation.
- Polysemous terms must use the home or family sense.
- npm run audit:examples, npm test, and npm run build must pass before integration.

---

### Task 1: Add The Failing Home And Family Contract

**Files:**
- Modify: src/lib/pet-learning-app.test.ts

**Interfaces:**
- Consumes: getWordExample(word: VocabularyItem) and getReviewedWordExamples().
- Produces: the 50-term coverage and candidate-ledger alignment contract.

- [ ] **Step 1: Add the batch constant**

~~~ts
const homeFamilyBatch = [
  "apartment", "apartment building", "bath", "bathroom", "bed", "bedroom", "blanket",
  "bottle", "bottle bank", "carpet", "chair", "changing room", "cottage", "cupboard",
  "cushion", "dining room", "door", "flat", "floor", "fork", "fridge", "furniture",
  "garage", "guest-house", "hall", "home", "house", "housework", "key", "kitchen",
  "lamp", "living room", "mirror", "property", "roof", "room", "shelf", "shower",
  "sitting room", "sofa", "table", "table-cloth", "toothpaste", "waiting room", "wall",
  "window", "brother", "dad", "mum", "sister",
] as const;
~~~

- [ ] **Step 2: Add coverage, ledger-alignment, and sense tests**

~~~ts
  it("adds the reviewed home and family example batch", () => {
    const examples = homeFamilyBatch.map((term) => getWordExample({ term, chineseGloss: "" }));

    expect(homeFamilyBatch).toHaveLength(50);
    expect(Object.keys(getReviewedWordExamples())).toHaveLength(235);
    expect(examples.map((example) => example.sentence).filter(Boolean)).toHaveLength(50);
  });

  it("keeps the home family candidate ledger aligned with reviewed examples", () => {
    const candidate = JSON.parse(
      fs.readFileSync(path.resolve(process.cwd(), "data/example-candidates/home-family-001.json"), "utf8"),
    ) as { entries: Array<{ term: string; focusWord: string; sentence: string; chinese: string }> };

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
~~~

- [ ] **Step 3: Verify the red state**

Run: npm test -- src/lib/pet-learning-app.test.ts -t "home and family|home family"

Expected: tests fail because none of the 50 terms has a reviewed sentence and the reviewed count remains 185.

- [ ] **Step 4: Commit the failing tests**

~~~bash
git add src/lib/pet-learning-app.test.ts
git commit -m "test: require home family example batch"
~~~

### Task 2: Create And Promote The Reviewed Entries

**Files:**
- Create: data/example-candidates/home-family-001.json
- Modify: src/lib/pet-learning-app.ts

**Interfaces:**
- Consumes: the exact term list in homeFamilyBatch.
- Produces: 50 matching ledger and reviewed-registry entries.

- [ ] **Step 1: Create the candidate ledger with these exact entries**

| Term | Sentence | Chinese |
| --- | --- | --- |
| apartment | My aunt lives in a small apartment near the park. | apartment = 公寓；我阿姨住在公园附近的一间小公寓里。 |
| apartment building | The apartment building has a lift near the entrance. | apartment building = 公寓大楼；这栋公寓大楼在入口旁有一部电梯。 |
| bath | I had a warm bath before bedtime. | bath = 沐浴；睡觉前我洗了个热水澡。 |
| bathroom | The bathroom window was open after the shower. | bathroom = 浴室；淋浴后浴室的窗户开着。 |
| bed | I made my bed before I went to school. | bed = 床；上学前我整理了床铺。 |
| bedroom | My bedroom is quiet in the early morning. | bedroom = 卧室；清晨我的卧室很安静。 |
| blanket | Put another blanket on the bed because it is cold. | blanket = 毛毯；天冷了，在床上再放一条毛毯。 |
| bottle | Please put the empty bottle in the bin. | bottle = 瓶子；请把空瓶子放进垃圾箱。 |
| bottle bank | We took empty bottles to the bottle bank on Saturday. | bottle bank = 玻璃瓶回收站；星期六我们把空瓶子送到玻璃瓶回收站。 |
| carpet | The cat is sleeping on the blue carpet. | carpet = 地毯；猫正睡在蓝色地毯上。 |
| chair | There is a chair beside my desk. | chair = 椅子；我的书桌旁有一把椅子。 |
| changing room | Leave your coat in the changing room. | changing room = 更衣室；把外套留在更衣室里。 |
| cottage | We rented a small cottage by the sea. | cottage = 小屋；我们在海边租了一间小屋。 |
| cupboard | The cups are in the cupboard above the sink. | cupboard = 碗柜；杯子在水槽上方的碗柜里。 |
| cushion | The sofa has two soft cushions. | cushion = 垫子；沙发上有两个柔软的垫子。 |
| dining room | We eat dinner together in the dining room. | dining room = 饭厅；我们在饭厅一起吃晚饭。 |
| door | Please close the door when you leave the room. | door = 门；离开房间时请关门。 |
| flat | Her flat is on the third floor. | flat = 公寓；她的公寓在三楼。 |
| floor | My wet shoes made marks on the floor. | floor = 地板；我的湿鞋在地板上留下了印子。 |
| fork | Use a fork to eat the salad. | fork = 叉子；用叉子吃沙拉。 |
| fridge | The milk is in the fridge. | fridge = 冰箱；牛奶在冰箱里。 |
| furniture | We chose new furniture for the living room. | furniture = 家具；我们为客厅挑选了新家具。 |
| garage | Dad keeps his bicycle in the garage. | garage = 车库；爸爸把自行车放在车库里。 |
| guest-house | We stayed in a quiet guest-house near the beach. | guest-house = 招待所；我们住在海滩附近一家安静的招待所。 |
| hall | Please leave your shoes in the hall. | hall = 门厅；请把鞋放在门厅里。 |
| home | I was happy to be home after the long journey. | home = 家；长途旅行后回到家我很高兴。 |
| house | Our house has a small garden behind it. | house = 房子；我们房子后面有一个小花园。 |
| housework | We share the housework at weekends. | housework = 家务；周末我们分担家务。 |
| key | I cannot find the key to the front door. | key = 钥匙；我找不到前门的钥匙。 |
| kitchen | Mum is making soup in the kitchen. | kitchen = 厨房；妈妈正在厨房里做汤。 |
| lamp | Turn on the lamp when it gets dark. | lamp = 灯；天黑时打开灯。 |
| living room | We watched a film in the living room. | living room = 客厅；我们在客厅看了一部电影。 |
| mirror | I looked in the mirror before leaving home. | mirror = 镜子；离家前我照了照镜子。 |
| property | Their house is their most valuable property. | property = 财产；他们的房子是最有价值的财产。 |
| roof | Rain was falling loudly on the roof. | roof = 屋顶；雨正大声地落在屋顶上。 |
| room | Is there enough room for another chair? | room = 空间；还有足够空间放另一把椅子吗？ |
| shelf | Put the photo on the top shelf. | shelf = 架子；把照片放在最上面的架子上。 |
| shower | I took a quick shower before breakfast. | shower = 淋浴；早饭前我快速冲了个澡。 |
| sitting room | We played a game in the sitting room. | sitting room = 起居室；我们在起居室里玩了一个游戏。 |
| sofa | The dog jumped onto the sofa. | sofa = 沙发；狗跳到了沙发上。 |
| table | Please set the table for dinner. | table = 餐桌；请为晚饭摆好餐桌。 |
| table-cloth | The red table-cloth is clean and dry. | table-cloth = 台布；这块红色台布干净又干燥。 |
| toothpaste | I need more toothpaste for my toothbrush. | toothpaste = 牙膏；我的牙刷需要更多牙膏。 |
| waiting room | We waited in the waiting room before the dentist saw me. | waiting room = 等候室；牙医看我之前，我们在等候室等着。 |
| wall | There is a family photo on the wall. | wall = 墙；墙上有一张全家福。 |
| window | Open the window to let in some fresh air. | window = 窗户；打开窗户让新鲜空气进来。 |
| brother | My brother helps me carry the shopping bags. | brother = 兄弟；我哥哥帮我提购物袋。 |
| dad | My dad cooks breakfast on Sundays. | dad = 爸爸；我爸爸星期天做早饭。 |
| mum | My mum reads with me before bed. | mum = 妈妈；我妈妈睡前和我一起阅读。 |
| sister | My sister keeps her books on the shelf. | sister = 姐妹；我姐姐把书放在架子上。 |

- [ ] **Step 2: Add the same entries to getReviewedWordExamples()**

Use the table values exactly. Use normalized lowercase keys: apartmentbuilding, bottlebank, changingroom, diningroom, guesthouse, livingroom, sittingroom, tablecloth, and waitingroom for the corresponding multi-word or hyphenated terms. Use each one-word term directly as its key. Do not import the ledger or change getWordExample().

- [ ] **Step 3: Verify the green state**

Run: npm test -- src/lib/pet-learning-app.test.ts -t "home and family|home family"

Expected: all three tests pass; getReviewedWordExamples() contains 235 entries.

- [ ] **Step 4: Commit promoted content**

~~~bash
git add -f data/example-candidates/home-family-001.json
git add src/lib/pet-learning-app.ts src/lib/pet-learning-app.test.ts
git commit -m "feat: add reviewed home family examples"
~~~

### Task 3: Audit And Integrate

**Files:**
- Modify: src/lib/generated/pet-word-example-audit.ts
- Possibly modify: scripts/audit-reviewed-pet-examples.ts

- [ ] **Step 1: Run the audit**

Run: npm run audit:examples

Expected: 235 reviewed entries. Inspect every flagged term against its sentence and official Chinese gloss.

- [ ] **Step 2: Resolve audit results**

Correct any true content mismatch in both the ledger and reviewed registry. For a false positive caused only by a polysemous official gloss, add the exact normalized key to manuallyConfirmedTerms with a nearby comment that names the demonstrated sense. Rerun the audit.

- [ ] **Step 3: Verify the batch**

Run: npm run audit:examples

Expected: Audited 235 reviewed PET examples; 0 need review.

Run: npm test

Expected: all Vitest tests pass.

Run: npm run build

Expected: Next.js exits with code 0.

- [ ] **Step 4: Commit audit output**

~~~bash
git add src/lib/generated/pet-word-example-audit.ts scripts/audit-reviewed-pet-examples.ts
git add -f data/example-candidates/home-family-001.json
git add src/lib/pet-learning-app.ts src/lib/pet-learning-app.test.ts
git commit -m "test: audit home family example batch"
~~~
