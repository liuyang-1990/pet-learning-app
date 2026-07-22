# PET Objects 002 Example Batch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add reviewed PET/B1 examples for the second 50 remaining objects-theme terms.

**Architecture:** Store approved content in `data/example-candidates/objects-002.json` and promote identical entries into `getReviewedWordExamples()`. Keep candidate data unimported by runtime code and verify ledger alignment, intended senses, bilingual quality, tests, and production build.

**Tech Stack:** Next.js 15, TypeScript, Vitest, Vite SSR loader, Google Translate audit script.

## Global Constraints

- Exactly 50 currently missing official objects-theme terms, from `bargain` through `broccoli` in remaining vocabulary order.
- Reviewed registry coverage rises from 1444 to 1494; accessible official rows rise from 1449 to 1499.
- Objects accessible coverage rises from 104/972 to 154/972.
- Candidate data remains unimported by application code.
- Every entry passes ledger alignment, intended-sense checks, bilingual audit, full tests, and production build.

---

### Task 1: Add Failing Coverage Tests

**Files:**
- Modify: `src/lib/pet-learning-app.test.ts`

- [ ] Add `objectsSecondBatch` using the 50 table terms below.
- [ ] Require all selected terms to return reviewed sentences, registry count at least 1494, and objects coverage at least 154/972.
- [ ] Add candidate-ledger alignment and exact sense assertions.
- [ ] Run `npx vitest run src/lib/pet-learning-app.test.ts -t "second objects"` and verify three failures because content is absent.
- [ ] Commit with `git commit -m "test: require second objects example batch"`.

### Task 2: Create And Promote The Reviewed Entries

**Files:**
- Create: `data/example-candidates/objects-002.json`
- Modify: `src/lib/pet-learning-app.ts`

The ledger uses `batchId: objects-002`, `status: promoted`, and these exact entries:

| Term | Focus Word | Sentence | Chinese |
| --- | --- | --- | --- |
| bargain | bargain | This jacket was a real bargain in the sale. | bargain = 便宜货；这件夹克在促销中真是便宜货。 |
| basin | basin | Wash your hands in the basin. | basin = 洗手盆；在洗手盆里洗手。 |
| basket | basket | She carried the apples in a basket. | basket = 篮子；她用篮子装苹果。 |
| bat | bat | He hit the ball with a bat. | bat = 球棒；他用球棒击球。 |
| bathing suit | bathing suit | Pack your bathing suit for the beach. | bathing suit = 泳衣；去海滩时带上你的泳衣。 |
| bathtub | bathtub | The bathtub was full of warm water. | bathtub = 浴缸；浴缸里装满了温水。 |
| battery | battery | The camera needs a new battery. | battery = 电池；这台相机需要一块新电池。 |
| battle | battle | The battle lasted all night. | battle = 战斗；这场战斗持续了一整夜。 |
| bay | bay | The hotel looks over the bay. | bay = 海湾；这家酒店俯瞰海湾。 |
| beard | beard | My uncle has a short beard. | beard = 胡子；我叔叔留着短胡子。 |
| beauty | beauty | We enjoyed the beauty of the mountains. | beauty = 美；我们欣赏了群山的美。 |
| beef | beef | I ordered beef with rice. | beef = 牛肉；我点了牛肉配米饭。 |
| beginner | beginner | This course is good for a beginner. | beginner = 初学者；这门课适合初学者。 |
| beginning | beginning | The beginning of the film was funny. | beginning = 开头；这部电影的开头很有趣。 |
| behaviour | behaviour | His behaviour in class was excellent. | behaviour = 行为；他在课堂上的行为很棒。 |
| bell | bell | The school bell rang at nine. | bell = 铃；学校铃声在九点响了。 |
| belt | belt | He wears a black belt with his jeans. | belt = 腰带；他穿牛仔裤时系一条黑色腰带。 |
| benefit | benefit | One benefit of cycling is fresh air. | benefit = 好处；骑自行车的一个好处是能呼吸新鲜空气。 |
| bestseller | bestseller | Her first book became a bestseller. | bestseller = 畅销书；她的第一本书成了畅销书。 |
| bin | bin | Put the paper in the recycling bin. | bin = 垃圾桶；把纸放进回收垃圾桶。 |
| biography | biography | I read a biography of a famous singer. | biography = 传记；我读了一本著名歌手的传记。 |
| biology | biology | Biology teaches us about plants and animals. | biology = 生物学；生物学教我们了解植物和动物。 |
| birth | birth | The birth of the baby made everyone happy. | birth = 出生；宝宝的出生让大家都很高兴。 |
| biscuit | biscuit | Would you like a biscuit with your tea? | biscuit = 饼干；你想喝茶时吃块饼干吗？ |
| bit | bit | I need a bit of help with this bag. | bit = 一点；这个包我需要一点帮助。 |
| blackboard | blackboard | The teacher wrote the date on the blackboard. | blackboard = 黑板；老师把日期写在黑板上。 |
| block | block | He put a block of wood under the door. | block = 块；他把一块木头放在门下面。 |
| blog | blog | She writes a travel blog. | blog = 博客；她写一个旅行博客。 |
| blogger | blogger | The blogger shared photos of the city. | blogger = 博主；这位博主分享了这座城市的照片。 |
| blouse | blouse | She wore a blue blouse to work. | blouse = 女衬衫；她穿了一件蓝色女衬衫去上班。 |
| board | board | Write your answers on the board. | board = 板；把你的答案写在板上。 |
| boarding pass | boarding pass | Show your boarding pass at the gate. | boarding pass = 登机牌；在登机口出示你的登机牌。 |
| bomb | bomb | The old bomb was removed safely. | bomb = 炸弹；那枚旧炸弹被安全移走了。 |
| bone | bone | The dog found a bone in the garden. | bone = 骨头；狗在花园里找到了一根骨头。 |
| booking | booking | I made a booking for two rooms. | booking = 预订；我预订了两个房间。 |
| bookshop | bookshop | I bought a novel at the bookshop. | bookshop = 书店；我在书店买了一本小说。 |
| bookstore | bookstore | The bookstore closes at eight. | bookstore = 书店；这家书店八点关门。 |
| border | border | The river forms the border between the two countries. | border = 边界；这条河形成了两国之间的边界。 |
| boss | boss | My boss approved the plan. | boss = 老板；我的老板批准了这个计划。 |
| box | box | Put the toys in the box. | box = 盒子；把玩具放进盒子里。 |
| boxing | boxing | Boxing is popular at the sports centre. | boxing = 拳击；拳击在体育中心很受欢迎。 |
| boyfriend | boyfriend | Her boyfriend is studying music. | boyfriend = 男朋友；她的男朋友正在学习音乐。 |
| brain | brain | Your brain needs rest after a long exam. | brain = 大脑；长时间考试后你的大脑需要休息。 |
| brake | brake | The bike brake needs fixing. | brake = 刹车；这辆自行车的刹车需要修理。 |
| branch | branch | A branch fell from the tree. | branch = 树枝；一根树枝从树上掉了下来。 |
| breath | breath | Take a deep breath before you speak. | breath = 呼吸；说话前深呼吸。 |
| breeze | breeze | A cool breeze came through the window. | breeze = 微风；一阵凉爽的微风从窗户吹进来。 |
| bride | bride | The bride smiled during the ceremony. | bride = 新娘；新娘在仪式上微笑。 |
| bridge | bridge | We crossed the old bridge on foot. | bridge = 桥；我们步行穿过了那座老桥。 |
| broccoli | broccoli | Broccoli is my sister's favourite vegetable. | broccoli = 西兰花；西兰花是我妹妹最喜欢的蔬菜。 |

- [ ] Create the ledger from all 50 rows.
- [ ] Promote every row with the normalized key used by `getWordExample()`.
- [ ] Run the targeted tests and verify all pass.
- [ ] Commit with `git commit -m "feat: add second reviewed objects examples"`.

### Task 3: Audit, Verify, And Integrate

**Files:**
- Modify if required: `scripts/audit-reviewed-pet-examples.ts`
- Regenerate: `src/lib/generated/pet-word-example-audit.ts`

- [ ] Run `npm run audit:examples` and inspect every flag against cached forward and back translations.
- [ ] Correct real mismatches in plan, ledger, and registry; manually confirm only valid contextual senses or synonyms with comments.
- [ ] Verify audit reports 1494 reviewed examples and 0 need review.
- [ ] Run `npm test` and verify all tests pass.
- [ ] Run `npm run build` and verify the production build succeeds.
- [ ] Commit with `git commit -m "test: audit second objects example batch"`.
- [ ] Push `main`, verify local and remote SHA match, verify coverage is 1499/3099 with objects at 154/972, and verify the production service returns HTTP 200.
