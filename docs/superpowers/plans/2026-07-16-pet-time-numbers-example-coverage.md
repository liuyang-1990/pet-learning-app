# PET Time And Numbers Example Batch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 50 reviewed PET/B1 time and number examples and complete the time theme.

**Architecture:** Store approved content in `data/example-candidates/time-numbers-001.json` and promote identical entries into `getReviewedWordExamples()`. The 39 time keys cover 41 time rows because full-time and part-time spelling variants share keys; the `while` example also safely serves the grammar row `while / whilst`.

**Tech Stack:** Next.js 15, TypeScript, Vitest, Vite Node, Google Translate audit script.

## Global Constraints

- Exactly 50 currently missing normalized terms: 39 unique time keys and 11 remaining number terms.
- All 41 official time rows return reviewed sentences; numbers coverage rises from 19/32 to 30/32.
- `while` uses the conjunction sense so the grammar alias `while / whilst` receives the same valid example.
- Reviewed registry coverage rises from 835 to 885; accessible official rows rise from 837 to 890.
- Candidate data remains unimported by application code.
- Every entry passes ledger alignment, bilingual audit, full tests, and production build.

---

### Task 1: Add Failing Coverage Tests

**Files:**
- Modify: `src/lib/pet-learning-app.test.ts`

- [ ] Add `timeNumbersBatch` using the 50 table terms below.
- [ ] Require every selected entry and all 41 time rows to return reviewed sentences, with registry count at least 885.
- [ ] Prove both full-time and part-time spelling variants resolve, and `while / whilst` receives the conjunction example.
- [ ] Add ledger alignment and exact sense assertions for `age`, `ages`, `in time`, `look after`, `occasion`, `on time`, `second`, `while`, `half-price`, `single`, and `square`.
- [ ] Run `npm test -- src/lib/pet-learning-app.test.ts -t "time numbers"` and verify failure because content is absent.
- [ ] Commit with `git commit -m "test: require time numbers batch"`.

### Task 2: Create And Promote The Reviewed Entries

**Files:**
- Create: `data/example-candidates/time-numbers-001.json`
- Modify: `src/lib/pet-learning-app.ts`

The ledger uses `batchId: time-numbers-001`, `status: promoted`, and these exact entries:

| Term | Focus Word | Sentence | Chinese |
| --- | --- | --- | --- |
| afternoon | afternoon | I usually do my homework in the afternoon. | afternoon = 下午；我通常在下午做家庭作业。 |
| afterwards | afterwards | We watched the match and had dinner afterwards. | afterwards = 后来；我们看了比赛，之后吃了晚饭。 |
| age | age | She started learning the piano at the age of six. | age = 年龄；她六岁时开始学钢琴。 |
| aged | aged | The club is for children aged eight to twelve. | aged = 年龄为；这个俱乐部面向八到十二岁的儿童。 |
| ages | ages | We waited for ages before the bus arrived. | ages = 很长时间；公交车到来前我们等了很久。 |
| at the same time | at the same time | The two runners crossed the line at the same time. | at the same time = 同时；两名跑步者同时越过终点线。 |
| birthday | birthday | We made a cake for Dad's birthday. | birthday = 生日；我们为爸爸的生日做了一个蛋糕。 |
| day | day | It rained all day on Monday. | day = 一天；星期一下了一整天的雨。 |
| recently | recently | I recently joined the school chess club. | recently = 最近；我最近加入了学校国际象棋俱乐部。 |
| early | early | We arrived early enough to choose good seats. | early = 早；我们到得够早，可以挑选好座位。 |
| evening | evening | I read for half an hour every evening. | evening = 晚上；我每天晚上读半个小时的书。 |
| full time | full time | My aunt works full time at the hospital. | full time = 全职；我阿姨在医院全职工作。 |
| good afternoon | good afternoon | Good afternoon, Mrs Lee. | good afternoon = 下午好；李老师，下午好。 |
| good evening | good evening | Good evening, everyone, and welcome to the show. | good evening = 晚上好；大家晚上好，欢迎观看演出。 |
| good morning | good morning | Good morning, Mr Brown. | good morning = 早上好；布朗先生，早上好。 |
| good night | good night | I said good night and went upstairs. | good night = 晚安；我说了晚安就上楼了。 |
| hour | hour | The journey takes about an hour. | hour = 小时；这段旅程大约需要一个小时。 |
| immediately | immediately | Please call me immediately if the plan changes. | immediately = 立即；如果计划有变化，请立即给我打电话。 |
| in time | in time | We reached the station in time to catch the train. | in time = 及时；我们及时赶到车站，搭上了火车。 |
| late | late | The bus was twenty minutes late this morning. | late = 迟到的；今天早上公交车晚了二十分钟。 |
| look after | look after | Can you look after my dog this weekend? | look after = 照顾；这个周末你能照顾我的狗吗？ |
| middle-aged | middle-aged | A middle-aged woman helped us find the address. | middle-aged = 中年的；一位中年女士帮我们找到了地址。 |
| minute | minute | The film starts in one minute. | minute = 分钟；电影一分钟后开始。 |
| month | month | We visit our grandparents once a month. | month = 月；我们每个月看望祖父母一次。 |
| morning | morning | The streets are quiet early in the morning. | morning = 早晨；清晨时街道很安静。 |
| night | night | The temperature falls quickly at night. | night = 夜晚；夜晚气温下降得很快。 |
| occasion | occasion | On one occasion, we saw dolphins near the boat. | occasion = 一次；有一次，我们在船附近看到了海豚。 |
| on time | on time | Everyone arrived on time for the meeting. | on time = 准时；每个人都准时到达参加会议。 |
| overnight | overnight | We stayed overnight in a small village. | overnight = 过夜；我们在一个小村庄住了一夜。 |
| part time | part time | Leo works part time in a bookshop. | part time = 兼职；利奥在一家书店兼职工作。 |
| second | second | Wait a second while I find the key. | second = 秒；等一下，我找找钥匙。 |
| soon | soon | The rain stopped, and the sun came out soon afterwards. | soon = 很快；雨停了，很快太阳就出来了。 |
| time | time | What time does the museum close? | time = 时间；博物馆几点关门？ |
| today | today | I have a dentist appointment today. | today = 今天；我今天预约了看牙医。 |
| tomorrow | tomorrow | We will finish the project tomorrow. | tomorrow = 明天；我们明天会完成这个项目。 |
| week | week | Our team practises three times a week. | week = 星期；我们队每周训练三次。 |
| while | while | While I waited for the bus, I read a magazine. | while = 当...时；等公交车时，我看了一本杂志。 |
| year | year | My brother will start college next year. | year = 年；我哥哥明年将开始上大学。 |
| yesterday | yesterday | I returned the library book yesterday. | yesterday = 昨天；我昨天归还了图书馆的书。 |
| circle | circle | Draw a circle around the correct answer. | circle = 圆圈；在正确答案周围画一个圆圈。 |
| gram | gram | One gram is a very small unit of weight. | gram = 克；一克是很小的重量单位。 |
| half-price | half-price | Student tickets are half-price on Mondays. | half-price = 半价的；学生票星期一半价。 |
| in half | in half | Cut the apple in half and share it. | in half = 分成两半；把苹果切成两半一起分享。 |
| in two | in two | The old rope broke in two. | in two = 断成两截；那根旧绳子断成了两截。 |
| litre | litre | We took a litre of water on the walk. | litre = 升；我们徒步时带了一升水。 |
| million | million | More than a million people visit the museum each year. | million = 百万；每年有一百多万人参观这座博物馆。 |
| single | single | I need a single ticket to Oxford. | single = 单程的；我需要一张去牛津的单程票。 |
| size | size | Do you have these shoes in a larger size? | size = 尺码；这双鞋有更大的尺码吗？ |
| square | square | A square has four equal sides. | square = 正方形；正方形有四条相等的边。 |
| weight | weight | The maximum weight for this bag is ten kilograms. | weight = 重量；这个包的最大重量是十千克。 |

- [ ] Create the ledger from all 50 rows.
- [ ] Promote every row with the normalized key used by `getWordExample()`.
- [ ] Run the targeted tests and verify all pass.
- [ ] Commit with `git commit -m "feat: add reviewed time numbers examples"`.

### Task 3: Audit, Verify, And Integrate

**Files:**
- Modify if required: `scripts/audit-reviewed-pet-examples.ts`
- Regenerate: `src/lib/generated/pet-word-example-audit.ts`

- [ ] Copy the root translation cache into the worktree before the first audit.
- [ ] Run `npm run audit:examples` and inspect every flag.
- [ ] Correct real mismatches in both sources; manually confirm only valid synonym or polysemy cases with comments.
- [ ] Verify audit reports 885 reviewed examples and 0 need review.
- [ ] Run `npm test` and `npm run build`.
- [ ] Commit with `git commit -m "test: audit time numbers batch"`.
- [ ] Merge the worktree translation cache back into the root cache before cleanup.
- [ ] Merge into `main`, remove the temporary worktree, rerun `npm test`, and push `main`.
