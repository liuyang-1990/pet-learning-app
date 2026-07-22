# PET Objects 001 Example Batch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add reviewed PET/B1 examples for the first 50 remaining objects-theme terms.

**Architecture:** Store approved content in `data/example-candidates/objects-001.json` and promote identical entries into `getReviewedWordExamples()`. Keep candidate data unimported by runtime code and verify ledger alignment, intended senses, bilingual quality, tests, and production build.

**Tech Stack:** Next.js 15, TypeScript, Vitest, Vite SSR loader, Google Translate audit script.

## Global Constraints

- Exactly 50 currently missing official objects-theme terms, from `access` through `barber` in remaining vocabulary order.
- Reviewed registry coverage rises from 1394 to 1444; accessible official rows rise from 1399 to 1449.
- Objects accessible coverage rises from 54/972 to 104/972.
- Candidate data remains unimported by application code.
- Every entry passes ledger alignment, intended-sense checks, bilingual audit, full tests, and production build.

---

### Task 1: Add Failing Coverage Tests

**Files:**
- Modify: `src/lib/pet-learning-app.test.ts`

- [ ] Add `objectsFirstBatch` using the 50 table terms below.
- [ ] Require all selected terms to return reviewed sentences, registry count at least 1444, and objects coverage at least 104/972.
- [ ] Add candidate-ledger alignment and exact sense assertions.
- [ ] Run `npx vitest run src/lib/pet-learning-app.test.ts -t "first objects"` and verify three failures because content is absent.
- [ ] Commit with `git commit -m "test: require first objects example batch"`.

### Task 2: Create And Promote The Reviewed Entries

**Files:**
- Create: `data/example-candidates/objects-001.json`
- Modify: `src/lib/pet-learning-app.ts`

The ledger uses `batchId: objects-001`, `status: promoted`, and these exact entries:

| Term | Focus Word | Sentence | Chinese |
| --- | --- | --- | --- |
| access | access | You need a password to get access to the website. | access = 访问权限；你需要密码才能访问这个网站。 |
| ad | ad | I saw an ad for a new bike. | ad = 广告；我看到了一则新自行车的广告。 |
| advantage | advantage | Living near school is a big advantage. | advantage = 优势；住在学校附近是一个很大的优势。 |
| adventure | adventure | Our camping trip was a real adventure. | adventure = 冒险；我们的露营旅行真是一次冒险。 |
| aim | aim | My aim is to pass the exam. | aim = 目标；我的目标是通过考试。 |
| air force | air force | Her brother joined the air force last year. | air force = 空军；她哥哥去年加入了空军。 |
| airline | airline | This airline flies to Madrid every day. | airline = 航空公司；这家航空公司每天都有航班飞往马德里。 |
| alarm | alarm | The alarm woke us up at six. | alarm = 闹钟；闹钟在六点把我们叫醒了。 |
| alarm clock | alarm clock | I put my alarm clock beside my bed. | alarm clock = 闹钟；我把闹钟放在床边。 |
| album | album | She showed me her holiday photo album. | album = 相册；她给我看了她的假日相册。 |
| alphabet | alphabet | Children learn the alphabet at school. | alphabet = 字母表；孩子们在学校学习字母表。 |
| ankle | ankle | He hurt his ankle during the match. | ankle = 脚踝；他在比赛中伤了脚踝。 |
| anniversary | anniversary | They celebrated their wedding anniversary. | anniversary = 周年纪念日；他们庆祝了结婚周年纪念日。 |
| answerphone | answerphone | Please leave a message on the answerphone. | answerphone = 电话答录机；请在电话答录机上留言。 |
| apology | apology | She wrote an apology after missing the meeting. | apology = 道歉；她错过会议后写了一封道歉信。 |
| apple | apple | I ate an apple after lunch. | apple = 苹果；午饭后我吃了一个苹果。 |
| architect | architect | The architect designed our new library. | architect = 建筑师；这位建筑师设计了我们的新图书馆。 |
| architecture | architecture | I love the architecture of old towns. | architecture = 建筑；我喜欢古老城镇的建筑。 |
| Arithmetic | arithmetic | Arithmetic was my favourite maths topic. | arithmetic = 算术；算术曾是我最喜欢的数学内容。 |
| armchair | armchair | Grandpa reads in his armchair every evening. | armchair = 扶手椅；爷爷每天晚上坐在扶手椅里读书。 |
| army | army | The army helped after the flood. | army = 军队；洪水过后军队提供了帮助。 |
| arrival | arrival | We waited for the arrival of the train. | arrival = 到达；我们等待火车到达。 |
| aspirin | aspirin | The nurse gave me an aspirin for my headache. | aspirin = 阿司匹林；护士给了我一片阿司匹林治头痛。 |
| astronaut | astronaut | The astronaut spoke to students from space. | astronaut = 宇航员；宇航员从太空和学生们讲话。 |
| at / @ | at sign | Write the at sign between your name and the website. | at sign = @符号；在你的名字和网站之间写上@符号。 |
| atmosphere | atmosphere | The cafe has a friendly atmosphere. | atmosphere = 气氛；这家咖啡馆气氛友好。 |
| attack | attack | The team started a strong attack. | attack = 进攻；球队发动了一次强有力的进攻。 |
| attitude | attitude | A positive attitude helps you learn. | attitude = 态度；积极的态度有助于学习。 |
| author | author | The author signed my book. | author = 作者；作者在我的书上签了名。 |
| autumn | autumn | The leaves turn yellow in autumn. | autumn = 秋天；秋天树叶会变黄。 |
| babysitter | babysitter | The babysitter looked after the twins. | babysitter = 临时保姆；临时保姆照看那对双胞胎。 |
| backpack | backpack | Put your lunch in your backpack. | backpack = 背包；把午餐放进你的背包里。 |
| backpacker | backpacker | The backpacker stayed in a cheap hostel. | backpacker = 背包客；那位背包客住在一家便宜的旅舍。 |
| backpacking | backpacking | Backpacking across Europe was exciting. | backpacking = 背包旅行；在欧洲背包旅行很令人兴奋。 |
| badminton | badminton | We play badminton after school. | badminton = 羽毛球；我们放学后打羽毛球。 |
| bag | bag | She packed a bag for the weekend. | bag = 包；她为周末收拾了一个包。 |
| baggage | baggage | Our baggage arrived late at the airport. | baggage = 行李；我们的行李在机场晚到了。 |
| baker | baker | The baker sells fresh bread every morning. | baker = 面包师；面包师每天早晨卖新鲜面包。 |
| balcony | balcony | We had breakfast on the balcony. | balcony = 阳台；我们在阳台上吃了早饭。 |
| ball | ball | The ball rolled under the car. | ball = 球；球滚到了汽车下面。 |
| ballet | ballet | She goes to ballet class on Fridays. | ballet = 芭蕾舞；她星期五去上芭蕾舞课。 |
| balloon | balloon | The red balloon flew into the sky. | balloon = 气球；红色气球飞上了天空。 |
| banana | banana | He put a banana in his lunch box. | banana = 香蕉；他把一根香蕉放进午餐盒。 |
| band | band | The school band played at the concert. | band = 乐队；学校乐队在音乐会上演奏。 |
| bandage | bandage | The nurse put a bandage on my knee. | bandage = 绷带；护士在我的膝盖上缠了绷带。 |
| banker | banker | The banker explained the loan carefully. | banker = 银行家；银行家仔细解释了贷款。 |
| banking | banking | Online banking makes it easy to pay bills. | banking = 银行业务；网上银行业务让付账更容易。 |
| bar | bar | We met at a small bar near the station. | bar = 酒吧；我们在车站附近的一家小酒吧见面。 |
| barbecue | barbecue | We had a barbecue in the garden. | barbecue = 烧烤；我们在花园里吃了烧烤。 |
| barber | barber | The barber cut my hair before the party. | barber = 理发师；聚会前理发师给我剪了头发。 |

- [ ] Create the ledger from all 50 rows.
- [ ] Promote every row with the normalized key used by `getWordExample()`.
- [ ] Run the targeted tests and verify all pass.
- [ ] Commit with `git commit -m "feat: add first reviewed objects examples"`.

### Task 3: Audit, Verify, And Integrate

**Files:**
- Modify if required: `scripts/audit-reviewed-pet-examples.ts`
- Regenerate: `src/lib/generated/pet-word-example-audit.ts`

- [ ] Run `npm run audit:examples` and inspect every flag against cached forward and back translations.
- [ ] Correct real mismatches in plan, ledger, and registry; manually confirm only valid contextual senses or synonyms with comments.
- [ ] Verify audit reports 1444 reviewed examples and 0 need review.
- [ ] Run `npm test` and verify 109 tests pass.
- [ ] Run `npm run build` and verify the production build succeeds.
- [ ] Commit with `git commit -m "test: audit first objects example batch"`.
- [ ] Push `main`, verify local and remote SHA match, verify coverage is 1449/3099 with objects at 104/972, and verify the production service returns HTTP 200.
