# PET Objects 009 Example Batch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add reviewed PET/B1 examples for the ninth 50 remaining objects-theme terms.

**Architecture:** Store approved content in `data/example-candidates/objects-009.json` and promote identical entries into `getReviewedWordExamples()`. Keep candidate data unimported by runtime code and verify ambiguous noun senses such as `humour / humor`, `ID`, `initial`, `interest`, `iron`, `issue`, `jumper`, `keeper`, `kit`, and `label`.

**Tech Stack:** Next.js 15, TypeScript, Vitest, Vite SSR loader, Google Translate audit script.

## Global Constraints

- Exactly 50 currently missing official objects-theme terms, from `honeymoon` through `laboratory` in remaining vocabulary order.
- Reviewed registry coverage rises from 1794 to 1844; accessible official rows rises from 1799 to 1849.
- Objects accessible coverage rises from 454/972 to 504/972.
- Candidate data remains unimported by application code.
- Every entry passes ledger alignment, intended-sense checks, bilingual audit, full tests, and production build.

---

### Task 1: Add Failing Coverage Tests

**Files:**
- Modify: `src/lib/pet-learning-app.test.ts`

- [ ] Add `objectsNinthBatch` using the 50 table terms below.
- [ ] Require all selected terms to return reviewed sentences, registry count at least 1844, and objects coverage at least 504/972.
- [ ] Add candidate-ledger alignment and exact sense assertions.
- [ ] Run `npx vitest run src/lib/pet-learning-app.test.ts -t "ninth objects"` and verify three failures because content is absent.
- [ ] Commit with `git commit -m "test: require ninth objects example batch"`.

### Task 2: Create And Promote The Reviewed Entries

**Files:**
- Create: `data/example-candidates/objects-009.json`
- Modify: `src/lib/pet-learning-app.ts`

The ledger uses `batchId: objects-009`, `status: promoted`, and these exact entries:

| Term | Focus Word | Sentence | Chinese |
| --- | --- | --- | --- |
| honeymoon | honeymoon | They spent their honeymoon in Greece. | honeymoon = 蜜月；他们在希腊度蜜月。 |
| hoodie | hoodie | He wore a blue hoodie to school. | hoodie = 连帽衫；他穿着一件蓝色连帽衫去学校。 |
| housewife | housewife | The housewife planned meals for the week. | housewife = 家庭主妇；这位家庭主妇计划了一周的饭菜。 |
| hug | hug | She gave her brother a big hug. | hug = 拥抱；她给了弟弟一个大大的拥抱。 |
| humour / humor | humor | The film has a lot of gentle humor. | humor = 幽默；这部电影有许多温和的幽默。 |
| hunger | hunger | Hunger made the children quiet. | hunger = 饥饿；饥饿让孩子们安静下来。 |
| hurry | hurry | We were in a hurry after breakfast. | hurry = 匆忙；早饭后我们很匆忙。 |
| hut | hut | The old hut stood near the forest. | hut = 小屋；旧小屋在森林附近。 |
| ice | ice | There was ice on the road this morning. | ice = 冰；今天早上路上有冰。 |
| ice skates | ice skates | She put on her ice skates at the rink. | ice skates = 冰鞋；她在溜冰场穿上冰鞋。 |
| ID | ID | Show your ID at the entrance. | ID = 身份证件；在入口处出示你的身份证件。 |
| idea | idea | That is a good idea for the project. | idea = 想法；这是这个项目的一个好想法。 |
| inch | inch | The shelf is one inch too wide. | inch = 英寸；这个架子宽了一英寸。 |
| ingredient | ingredient | Sugar is the main ingredient in this cake. | ingredient = 原料；糖是这个蛋糕的主要原料。 |
| initial | initial | Write your initial at the top of the page. | initial = 首字母；把你的首字母写在页面顶部。 |
| ink | ink | The printer needs black ink. | ink = 墨水；打印机需要黑色墨水。 |
| inquiry | inquiry | The office answered my inquiry by email. | inquiry = 询问；办公室通过电子邮件回答了我的询问。 |
| instructor | instructor | The ski instructor helped the beginners. | instructor = 教练；滑雪教练帮助了初学者。 |
| interest | interest | She showed interest in photography. | interest = 兴趣；她表现出对摄影的兴趣。 |
| interval | interval | We bought drinks during the interval. | interval = 中场休息；我们在中场休息时买了饮料。 |
| interviewer | interviewer | The interviewer asked about my experience. | interviewer = 面试官；面试官询问了我的经验。 |
| inventor | inventor | The inventor showed us a new machine. | inventor = 发明家；发明家向我们展示了一台新机器。 |
| iron | iron | The iron was too hot for the shirt. | iron = 熨斗；熨斗对这件衬衫来说太烫了。 |
| ironing | ironing | I finished the ironing before dinner. | ironing = 熨衣服；我晚饭前熨完了衣服。 |
| issue | issue | The latest issue of the magazine is out. | issue = 期号；这本杂志的最新一期出版了。 |
| item | item | Choose one item from the menu. | item = 项目；从菜单中选择一项。 |
| jail | jail | The thief spent a night in jail. | jail = 监狱；小偷在监狱里待了一晚。 |
| jar | jar | Open the jar of strawberry jam. | jar = 罐子；打开那罐草莓酱。 |
| jazz | jazz | Jazz was playing in the cafe. | jazz = 爵士乐；咖啡馆里播放着爵士乐。 |
| jet | jet | A jet flew high above the clouds. | jet = 喷气式飞机；一架喷气式飞机在云层上方高飞。 |
| jewellery | jewellery | She keeps her jewellery in a small box. | jewellery = 珠宝；她把珠宝放在一个小盒子里。 |
| jogging | jogging | Jogging before breakfast wakes me up. | jogging = 慢跑；早饭前慢跑让我清醒。 |
| joke | joke | His joke made everyone laugh. | joke = 笑话；他的笑话让大家都笑了。 |
| judge | judge | The judge listened to both teams. | judge = 裁判；裁判听取了两队的意见。 |
| jug | jug | Pour the milk into the jug. | jug = 壶；把牛奶倒进壶里。 |
| jump | jump | The horse made a high jump. | jump = 跳跃；那匹马做了一个高跳。 |
| jumper | jumper | She wore a warm jumper in class. | jumper = 套头毛衣；她在课堂上穿了一件暖和的套头毛衣。 |
| jungle | jungle | The jungle was full of strange sounds. | jungle = 丛林；丛林里充满了奇怪的声音。 |
| kangaroo | kangaroo | A kangaroo crossed the road slowly. | kangaroo = 袋鼠；一只袋鼠慢慢穿过马路。 |
| keeper | keeper | The zoo keeper fed the lions. | keeper = 饲养员；动物园饲养员喂了狮子。 |
| kick | kick | His kick sent the ball into the goal. | kick = 踢；他的一脚把球送进了球门。 |
| kid | kid | The kid carried a red backpack. | kid = 孩子；那个孩子背着一个红色背包。 |
| kilogramme | kilogramme | This bag weighs one kilogramme. | kilogramme = 千克；这个袋子重一千克。 |
| kiss | kiss | She gave the baby a kiss. | kiss = 吻；她亲了宝宝一下。 |
| kit | kit | The first-aid kit is in the kitchen. | kit = 工具包；急救包在厨房里。 |
| kite | kite | The kite flew over the beach. | kite = 风筝；风筝在海滩上空飞翔。 |
| kitten | kitten | The kitten slept in a basket. | kitten = 小猫；小猫睡在篮子里。 |
| knowledge | knowledge | Her knowledge of history is excellent. | knowledge = 知识；她的历史知识非常出色。 |
| label | label | Read the label before you wash the shirt. | label = 标签；洗衬衫前阅读标签。 |
| laboratory | laboratory | The students worked in the science laboratory. | laboratory = 实验室；学生们在科学实验室工作。 |

- [ ] Create the ledger from all 50 rows.
- [ ] Promote every row with the normalized key used by `getWordExample()`.
- [ ] Run the targeted tests and verify all pass.
- [ ] Commit with `git commit -m "feat: add ninth reviewed objects examples"`.

### Task 3: Audit, Verify, And Integrate

**Files:**
- Modify if required: `scripts/audit-reviewed-pet-examples.ts`
- Regenerate: `src/lib/generated/pet-word-example-audit.ts`

- [ ] Run `npm run audit:examples` and inspect every flag against cached forward and back translations.
- [ ] Correct real mismatches in plan, ledger, and registry; manually confirm only valid contextual senses or synonyms with comments.
- [ ] Verify audit reports 1844 reviewed examples and 0 need review.
- [ ] Run `npm test` and verify all tests pass.
- [ ] Run `npm run build` and verify the production build succeeds.
- [ ] Commit with `git commit -m "test: audit ninth objects example batch"`.
- [ ] Push `main`, verify local and remote SHA match, verify coverage is 1849/3099 with objects at 504/972, and verify the production service returns HTTP 200.
