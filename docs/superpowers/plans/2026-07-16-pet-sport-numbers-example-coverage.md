# PET Sport And Numbers Example Batch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 50 reviewed PET/B1 sport and measurement examples and complete the sport theme.

**Architecture:** Store approved content in `data/example-candidates/sport-numbers-001.json` and promote identical entries into `getReviewedWordExamples()`. Tests prove all selected entries, complete sport coverage, ledger alignment, and ambiguous senses.

**Tech Stack:** Next.js 15, TypeScript, Vitest, Vite Node, Google Translate audit script.

## Global Constraints

- Exactly 50 currently missing normalized terms: all 32 remaining sport terms and 18 score, count, or measurement terms.
- All 36 official sport rows return reviewed sentences after this batch.
- Reviewed registry coverage rises from 785 to 835; accessible official rows rise from 787 to 837.
- Candidate data remains unimported by application code.
- Every entry passes ledger alignment, bilingual audit, full tests, and production build.

---

### Task 1: Add Failing Coverage Tests

**Files:**
- Modify: `src/lib/pet-learning-app.test.ts`

- [ ] Add `sportNumbersBatch` using the 50 table terms below.
- [ ] Require every selected entry and all 36 sport rows to return reviewed sentences, with registry count at least 835.
- [ ] Add ledger alignment and exact sense assertions for `coach`, `pool`, `player`, `skate`, `amount`, `average`, `double`, `point`, and `score`.
- [ ] Run `npm test -- src/lib/pet-learning-app.test.ts -t "sport numbers"` and verify failure because content is absent.
- [ ] Commit with `git commit -m "test: require sport numbers batch"`.

### Task 2: Create And Promote The Reviewed Entries

**Files:**
- Create: `data/example-candidates/sport-numbers-001.json`
- Modify: `src/lib/pet-learning-app.ts`

The ledger uses `batchId: sport-numbers-001`, `status: promoted`, and these exact entries:

| Term | Focus Word | Sentence | Chinese |
| --- | --- | --- | --- |
| athlete | athlete | The athlete trains for two hours every morning. | athlete = 运动员；这名运动员每天早上训练两个小时。 |
| athletics | athletics | Athletics includes running, jumping, and throwing events. | athletics = 田径运动；田径运动包括跑、跳和投掷项目。 |
| baseball | baseball | We played baseball in the park after school. | baseball = 棒球；放学后我们在公园里打棒球。 |
| basketball | basketball | Our basketball practice starts at half past four. | basketball = 篮球；我们的篮球训练四点半开始。 |
| CD player | CD player | This old CD player still works well. | CD player = CD播放机；这台旧光盘播放机仍然很好用。 |
| coach | coach | The coach showed us a better way to pass the ball. | coach = 教练；教练向我们示范了更好的传球方法。 |
| DVD player | DVD player | Connect the DVD player to the television. | DVD player = DVD播放机；把光盘播放机连接到电视上。 |
| extreme sport | extreme sport | Rock climbing can be a dangerous extreme sport. | extreme sport = 极限运动；攀岩可能是一项危险的极限运动。 |
| football player | football player | The football player scored twice in the final. | football player = 足球运动员；这名足球运动员在决赛中进了两球。 |
| golf | golf | My grandfather plays golf on Sunday mornings. | golf = 高尔夫球；我祖父星期天早上打高尔夫球。 |
| gym | gym | I go to the gym after work on Tuesdays. | gym = 健身房；我星期二下班后去健身房。 |
| gymnastics | gymnastics | Gymnastics requires strength and balance. | gymnastics = 体操；体操需要力量和平衡能力。 |
| hockey | hockey | Our school hockey team won the match. | hockey = 曲棍球；我们学校的曲棍球队赢得了比赛。 |
| ice hockey | ice hockey | Ice hockey players wear helmets and thick gloves. | ice hockey = 冰球；冰球运动员戴头盔和厚手套。 |
| ice skating | ice skating | We went ice skating on the frozen lake. | ice skating = 滑冰；我们去结冰的湖上滑冰了。 |
| match | match | The match ended with a score of two to one. | match = 比赛；比赛以二比一的比分结束。 |
| motor-racing | motor-racing | Motor-racing drivers must react very quickly. | motor-racing = 赛车运动；赛车手必须反应非常迅速。 |
| player | player | Each player shook hands after the game. | player = 运动员；比赛后每位运动员都握了手。 |
| pool | pool | We played pool while we waited for the bus. | pool = 台球；等公交车时我们打了台球。 |
| racing | racing | Horse racing is popular in this region. | racing = 赛马；赛马在这个地区很受欢迎。 |
| rugby | rugby | Rugby players often pass the ball backwards. | rugby = 橄榄球；橄榄球运动员经常向后传球。 |
| skate | skate | Children can skate safely on this indoor rink. | skate = 滑冰；孩子们可以在这个室内冰场安全地滑冰。 |
| skating | skating | Skating is easier when the ice is smooth. | skating = 滑冰运动；冰面平滑时滑冰更容易。 |
| skiing | skiing | We learned skiing during our winter holiday. | skiing = 滑雪；我们寒假期间学习了滑雪。 |
| sport | sport | Swimming is my favourite sport. | sport = 运动；游泳是我最喜欢的运动。 |
| swim | swim | I swim ten lengths before breakfast. | swim = 游泳；我早餐前游十个来回。 |
| swimming costume | swimming costume | Her swimming costume was still wet after the lesson. | swimming costume = 泳衣；课程结束后她的泳衣还是湿的。 |
| swimming pool | swimming pool | The swimming pool is closed for repairs today. | swimming pool = 游泳池；游泳池今天因维修而关闭。 |
| table tennis | table tennis | We played table tennis in the youth club. | table tennis = 乒乓球；我们在青少年俱乐部打了乒乓球。 |
| team | team | Every member of the team arrived on time. | team = 队伍；队里的每名成员都准时到达。 |
| volleyball | volleyball | The students played volleyball on the beach. | volleyball = 排球；学生们在海滩上打排球。 |
| yoga | yoga | Yoga helps me relax after a busy day. | yoga = 瑜伽；瑜伽帮助我在忙碌一天后放松。 |
| amount | amount | Drink a small amount of water during each break. | amount = 数量；每次休息时喝少量的水。 |
| average | average | Her average score this season is eighty percent. | average = 平均数；她本赛季的平均得分是百分之八十。 |
| count | count | Count how many laps you can run in ten minutes. | count = 数数；数一数你十分钟能跑多少圈。 |
| degree | degree | The temperature fell by one degree during the race. | degree = 度；比赛期间气温下降了一度。 |
| depth | depth | The depth of this pool is two metres. | depth = 深度；这个泳池的深度是两米。 |
| double | double | We ran double the usual distance today. | double = 两倍的；我们今天跑了平常两倍的距离。 |
| half | half | Half of the team practised indoors. | half = 一半；队伍中有一半的人在室内训练。 |
| height | height | The height of the basketball hoop is fixed. | height = 高度；篮球架的高度是固定的。 |
| kilometre | kilometre | The final kilometre of the race was uphill. | kilometre = 千米；比赛最后一千米是上坡路。 |
| metre | metre | She won the race by less than a metre. | metre = 米；她以不到一米的优势赢得了比赛。 |
| mile | mile | He can run a mile in under seven minutes. | mile = 英里；他能在七分钟内跑完一英里。 |
| number | number | Write your race number on the form. | number = 号码；在表格上写下你的比赛号码。 |
| pair | pair | I need a new pair of running shoes. | pair = 一双；我需要一双新的跑鞋。 |
| percent | percent | About sixty percent of the class joined a sports club. | percent = 百分比；班里大约百分之六十的学生加入了体育俱乐部。 |
| point | point | Our team earned one point for the draw. | point = 分；我们队因平局获得了一分。 |
| quarter | quarter | The first quarter of the game was very close. | quarter = 一节；比赛第一节双方比分很接近。 |
| score | score | The final score was three to two. | score = 比分；最终比分是三比二。 |
| total | total | Add the three times to find the total. | total = 总数；把三次用时相加得出总数。 |

- [ ] Create the ledger from all 50 rows.
- [ ] Promote every row with the normalized key used by `getWordExample()`.
- [ ] Run the targeted tests and verify all pass.
- [ ] Commit with `git commit -m "feat: add reviewed sport numbers examples"`.

### Task 3: Audit, Verify, And Integrate

**Files:**
- Modify if required: `scripts/audit-reviewed-pet-examples.ts`
- Regenerate: `src/lib/generated/pet-word-example-audit.ts`

- [ ] Copy the root translation cache into the worktree before the first audit.
- [ ] Run `npm run audit:examples` and inspect every flag.
- [ ] Correct real mismatches in both sources; manually confirm only valid synonym or polysemy cases with comments.
- [ ] Verify audit reports 835 reviewed examples and 0 need review.
- [ ] Run `npm test` and `npm run build`.
- [ ] Commit with `git commit -m "test: audit sport numbers batch"`.
- [ ] Merge the worktree translation cache back into the root cache before cleanup.
- [ ] Merge into `main`, remove the temporary worktree, rerun `npm test`, and push `main`.
