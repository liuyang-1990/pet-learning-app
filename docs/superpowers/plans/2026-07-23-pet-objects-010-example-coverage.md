# PET Objects 010 Example Batch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add reviewed PET/B1 examples for the tenth 50 remaining objects-theme terms.

**Architecture:** Store approved content in `data/example-candidates/objects-010.json` and promote identical entries into `getReviewedWordExamples()`. Keep candidate data unimported by runtime code and verify ambiguous noun senses such as `left`, `lie`, `life`, `lift`, `line`, `link`, `litter`, `load`, `lots / a lot`, and `mail`.

**Tech Stack:** Next.js 15, TypeScript, Vitest, Vite SSR loader, Google Translate audit script.

## Global Constraints

- Exactly 50 currently missing official objects-theme terms, from `lack` through `midday` in remaining vocabulary order.
- Reviewed registry coverage rises from 1844 to 1894; accessible official rows rises from 1849 to 1899.
- Objects accessible coverage rises from 504/972 to 554/972.
- Candidate data remains unimported by application code.
- Every entry passes ledger alignment, intended-sense checks, bilingual audit, full tests, and production build.

---

### Task 1: Add Failing Coverage Tests

**Files:**
- Modify: `src/lib/pet-learning-app.test.ts`

- [ ] Add `objectsTenthBatch` using the 50 table terms below.
- [ ] Require all selected terms to return reviewed sentences, registry count at least 1894, and objects coverage at least 554/972.
- [ ] Add candidate-ledger alignment and exact sense assertions.
- [ ] Run `npx vitest run src/lib/pet-learning-app.test.ts -t "tenth objects"` and verify three failures because content is absent.
- [ ] Commit with `git commit -m "test: require tenth objects example batch"`.

### Task 2: Create And Promote The Reviewed Entries

**Files:**
- Create: `data/example-candidates/objects-010.json`
- Modify: `src/lib/pet-learning-app.ts`

The ledger uses `batchId: objects-010`, `status: promoted`, and these exact entries:

| Term | Focus Word | Sentence | Chinese |
| --- | --- | --- | --- |
| lack | lack | A lack of sleep made him tired. | lack = 缺乏；缺乏睡眠让他很累。 |
| ladder | ladder | The ladder reached the top window. | ladder = 梯子；梯子够到了最上面的窗户。 |
| lady | lady | The lady at the desk smiled. | lady = 女士；桌边那位女士笑了。 |
| lamb | lamb | The lamb followed its mother. | lamb = 小羊；小羊跟着它的妈妈。 |
| landscape | landscape | The painting shows a mountain landscape. | landscape = 风景；这幅画展示了山地风景。 |
| laundry | laundry | The laundry is still wet. | laundry = 洗好的衣物；洗好的衣物还湿着。 |
| leader | leader | The team leader explained the plan. | leader = 领导者；队长解释了计划。 |
| leaf | leaf | A red leaf fell onto the path. | leaf = 叶子；一片红叶落到小路上。 |
| league | league | Their team joined a new league. | league = 联赛；他们的球队加入了一个新联赛。 |
| lecture | lecture | The lecture lasted one hour. | lecture = 讲座；这场讲座持续了一个小时。 |
| lecturer | lecturer | The lecturer answered every question. | lecturer = 讲师；讲师回答了每个问题。 |
| left | left | Keep to the left on this path. | left = 左边；在这条路上靠左走。 |
| leisure | leisure | Reading is her favourite leisure activity. | leisure = 休闲；阅读是她最喜欢的休闲活动。 |
| lemon | lemon | Add a slice of lemon to the water. | lemon = 柠檬；往水里加一片柠檬。 |
| lemonade | lemonade | We drank cold lemonade in the garden. | lemonade = 柠檬水；我们在花园里喝了冰柠檬水。 |
| length | length | Measure the length of the table. | length = 长度；测量桌子的长度。 |
| lettuce | lettuce | Put lettuce in the sandwich. | lettuce = 生菜；把生菜放进三明治。 |
| level | level | The game has ten levels. | level = 关卡；这个游戏有十个关卡。 |
| librarian | librarian | The librarian helped me find a book. | librarian = 图书管理员；图书管理员帮我找到了一本书。 |
| lie | lie | His lie caused a lot of trouble. | lie = 谎言；他的谎言造成了许多麻烦。 |
| life | life | Village life is quiet here. | life = 生活；这里的乡村生活很安静。 |
| lift | lift | Take the lift to the sixth floor. | lift = 电梯；乘电梯到六楼。 |
| lightning | lightning | Lightning lit up the sky. | lightning = 闪电；闪电照亮了天空。 |
| limit | limit | The speed limit is thirty kilometres an hour. | limit = 限制；限速是每小时三十公里。 |
| line | line | Draw a straight line across the page. | line = 线；在页面上画一条直线。 |
| link | link | Click the link to open the map. | link = 链接；点击链接打开地图。 |
| lip | lip | She had a cut on her lip. | lip = 嘴唇；她嘴唇上有一道伤口。 |
| literature | literature | Literature was his best subject. | literature = 文学；文学是他最擅长的科目。 |
| litter | litter | Please put litter in the bin. | litter = 垃圾；请把垃圾放进垃圾桶。 |
| load | load | The truck carried a heavy load. | load = 负载；卡车载着很重的货物。 |
| loan | loan | She got a loan to buy a car. | loan = 贷款；她获得贷款买车。 |
| lock | lock | The lock on the door is new. | lock = 锁；门上的锁是新的。 |
| locker | locker | Put your bag in the locker. | locker = 储物柜；把你的包放进储物柜。 |
| logo | logo | The company logo is green. | logo = 标志；公司的标志是绿色的。 |
| lots / a lot | lots | Lots of people waited outside. | lots = 许多；许多人在外面等待。 |
| lottery | lottery | He won a small prize in the lottery. | lottery = 彩票；他在彩票中赢了一个小奖。 |
| luck | luck | Good luck helped us find the hotel. | luck = 运气；好运帮我们找到了酒店。 |
| lunchtime | lunchtime | Lunchtime starts at twelve thirty. | lunchtime = 午餐时间；午餐时间十二点半开始。 |
| luxury | luxury | A private pool is a luxury. | luxury = 奢侈品；私人游泳池是一种奢侈品。 |
| machine | machine | This machine prints tickets. | machine = 机器；这台机器打印票。 |
| mail | mail | The mail arrived before breakfast. | mail = 邮件；邮件在早餐前到了。 |
| mango | mango | The mango was sweet and soft. | mango = 芒果；这个芒果又甜又软。 |
| marriage | marriage | Their marriage lasted fifty years. | marriage = 婚姻；他们的婚姻持续了五十年。 |
| mate | mate | My mate helped me carry the boxes. | mate = 朋友；我的朋友帮我搬箱子。 |
| melon | melon | We shared a cold melon after lunch. | melon = 甜瓜；午饭后我们分吃了一个冰甜瓜。 |
| memory | memory | The trip is a happy memory. | memory = 记忆；这次旅行是一段快乐的记忆。 |
| mess | mess | The kitchen was a mess after dinner. | mess = 混乱；晚饭后厨房一片混乱。 |
| microphone | microphone | Speak clearly into the microphone. | microphone = 麦克风；对着麦克风清楚地说话。 |
| microwave | microwave | Heat the soup in the microwave. | microwave = 微波炉；用微波炉加热汤。 |
| midday | midday | We arrived at midday. | midday = 中午；我们中午到达。 |

- [ ] Create the ledger from all 50 rows.
- [ ] Promote every row with the normalized key used by `getWordExample()`.
- [ ] Run the targeted tests and verify all pass.
- [ ] Commit with `git commit -m "feat: add tenth reviewed objects examples"`.

### Task 3: Audit, Verify, And Integrate

**Files:**
- Modify if required: `scripts/audit-reviewed-pet-examples.ts`
- Regenerate: `src/lib/generated/pet-word-example-audit.ts`

- [ ] Run `npm run audit:examples` and inspect every flag against cached forward and back translations.
- [ ] Correct real mismatches in plan, ledger, and registry; manually confirm only valid contextual senses or synonyms with comments.
- [ ] Verify audit reports 1894 reviewed examples and 0 need review.
- [ ] Run `npm test` and verify all tests pass.
- [ ] Run `npm run build` and verify the production build succeeds.
- [ ] Commit with `git commit -m "test: audit tenth objects example batch"`.
- [ ] Push `main`, verify local and remote SHA match, verify coverage is 1899/3099 with objects at 554/972, and verify the production service returns HTTP 200.
