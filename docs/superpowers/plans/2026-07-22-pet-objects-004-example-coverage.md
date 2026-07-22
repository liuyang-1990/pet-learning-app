# PET Objects 004 Example Batch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add reviewed PET/B1 examples for the fourth 50 remaining objects-theme terms.

**Architecture:** Store approved content in `data/example-candidates/objects-004.json` and promote identical entries into `getReviewedWordExamples()`. Keep candidate data unimported by runtime code; fill the existing exact override targets for `check-in` and `checkout` noun senses instead of weakening those disambiguation rules.

**Tech Stack:** Next.js 15, TypeScript, Vitest, Vite SSR loader, Google Translate audit script.

## Global Constraints

- Exactly 50 currently missing official objects-theme terms, from `chat` through `cough` in remaining vocabulary order.
- Reviewed registry coverage rises from 1544 to 1594; accessible official rows rises from 1549 to 1599.
- Objects accessible coverage rises from 204/972 to 254/972.
- Candidate data remains unimported by application code.
- Existing `check-in` and `checkout` noun override targets must become reviewed examples, and older null assertions must be updated to the promoted noun senses.
- Every entry passes ledger alignment, intended-sense checks, bilingual audit, full tests, and production build.

---

### Task 1: Add Failing Coverage Tests

**Files:**
- Modify: `src/lib/pet-learning-app.test.ts`

- [ ] Add `objectsFourthBatch` using the 50 table terms below.
- [ ] Require all selected terms to return reviewed sentences, registry count at least 1594, and objects coverage at least 254/972.
- [ ] Add candidate-ledger alignment and exact sense assertions.
- [ ] Run `npx vitest run src/lib/pet-learning-app.test.ts -t "fourth objects"` and verify three failures because content is absent.
- [ ] Commit with `git commit -m "test: require fourth objects example batch"`.

### Task 2: Create And Promote The Reviewed Entries

**Files:**
- Create: `data/example-candidates/objects-004.json`
- Modify: `src/lib/pet-learning-app.ts`
- Modify: `src/lib/pet-learning-app.test.ts`

The ledger uses `batchId: objects-004`, `status: promoted`, and these exact entries:

| Term | Focus Word | Sentence | Chinese |
| --- | --- | --- | --- |
| chat | chat | We had a short chat after class. | chat = 聊天；课后我们简短地聊了一会儿。 |
| chatroom | chatroom | The teacher opened a safe chatroom for the class. | chatroom = 聊天室；老师为班级开了一个安全的聊天室。 |
| check | check | The mechanic did a quick check of the brakes. | check = 检查；机械师快速检查了刹车。 |
| check-in | check-in | Online check-in opens twenty-four hours before the flight. | check-in = 登机手续；网上登机手续在航班起飞前二十四小时开放。 |
| checkout | checkout | The checkout is near the front door. | checkout = 收银台；收银台在前门附近。 |
| cheek | cheek | A tear ran down her cheek. | cheek = 脸颊；一滴眼泪顺着她的脸颊流下。 |
| chemist | chemist | The chemist tested the water in the lab. | chemist = 化学家；化学家在实验室检测了水。 |
| chemistry | chemistry | Chemistry is difficult but interesting. | chemistry = 化学；化学很难但很有趣。 |
| chess | chess | We played chess during the break. | chess = 国际象棋；休息时我们下了国际象棋。 |
| chest of drawers | chest of drawers | Put your socks in the chest of drawers. | chest of drawers = 五斗柜；把你的袜子放进五斗柜里。 |
| childhood | childhood | She spent her childhood near the sea. | childhood = 童年；她在海边度过了童年。 |
| chilli | chilli | This chilli is too hot for me. | chilli = 辣椒；这个辣椒对我来说太辣了。 |
| chin | chin | He cut his chin when he fell. | chin = 下巴；他摔倒时划伤了下巴。 |
| chip | chip | She ate one potato chip before dinner. | chip = 薯片；晚饭前她吃了一片薯片。 |
| chocolate | chocolate | I bought a bar of chocolate. | chocolate = 巧克力；我买了一块巧克力。 |
| circus | circus | The circus came to town in spring. | circus = 马戏团；春天马戏团来到了镇上。 |
| cleaner | cleaner | The cleaner washed the classroom floor. | cleaner = 清洁工；清洁工清洗了教室地板。 |
| click | click | I heard a click when the door closed. | click = 咔哒声；门关上时我听到一声咔哒响。 |
| cliff | cliff | The path goes along the top of the cliff. | cliff = 悬崖；这条小路沿着悬崖顶延伸。 |
| climbing | climbing | Climbing is safer with a teacher. | climbing = 攀岩；有老师指导时攀岩更安全。 |
| clock | clock | The clock on the wall is slow. | clock = 时钟；墙上的时钟慢了。 |
| clown | clown | The clown made the children laugh. | clown = 小丑；小丑逗孩子们笑了。 |
| coast | coast | We drove along the coast at sunset. | coast = 海岸；日落时我们沿着海岸开车。 |
| coconut | coconut | She drank juice from a coconut. | coconut = 椰子；她喝了椰子里的汁。 |
| cod | cod | Cod is often served with chips. | cod = 鳕鱼；鳕鱼常和薯条一起上桌。 |
| cola | cola | He ordered a cola with his meal. | cola = 可乐；他点餐时要了一杯可乐。 |
| collar | collar | The shirt has a white collar. | collar = 衣领；这件衬衫有白色衣领。 |
| colleague | colleague | My colleague helped me finish the report. | colleague = 同事；我的同事帮我完成了报告。 |
| colour | colour | Blue is my favourite colour. | colour = 颜色；蓝色是我最喜欢的颜色。 |
| comb | comb | I keep a comb in my bag. | comb = 梳子；我包里放着一把梳子。 |
| comedy | comedy | We watched a comedy on Friday night. | comedy = 喜剧；星期五晚上我们看了一部喜剧。 |
| comfort | comfort | The soft blanket gave her comfort. | comfort = 安慰；柔软的毯子给了她安慰。 |
| comma | comma | Put a comma after the first word. | comma = 逗号；在第一个词后面加一个逗号。 |
| competitor | competitor | Each competitor wore a number. | competitor = 参赛者；每位参赛者都戴着号码。 |
| complaint | complaint | The hotel received a complaint about the noise. | complaint = 投诉；酒店收到了一起关于噪音的投诉。 |
| conclusion | conclusion | Write a short conclusion at the end. | conclusion = 结论；在结尾写一个简短结论。 |
| consonant | consonant | The letter b is a consonant. | consonant = 辅音；字母 b 是一个辅音。 |
| contact | contact | Add my email as a contact. | contact = 联系人；把我的电子邮件添加为联系人。 |
| contents | contents | Check the contents of the box. | contents = 内容物；检查盒子里的内容物。 |
| contest | contest | She won first prize in the writing contest. | contest = 比赛；她在写作比赛中获得了一等奖。 |
| continent | continent | Asia is the largest continent. | continent = 大洲；亚洲是最大的大洲。 |
| contract | contract | Read the contract before you sign it. | contract = 合同；签字前先阅读合同。 |
| control | control | The driver lost control of the car. | control = 控制；司机失去了对汽车的控制。 |
| cookery | cookery | Cookery lessons teach simple meals. | cookery = 烹饪；烹饪课教授简单餐食。 |
| cookie | cookie | I saved a cookie for my brother. | cookie = 曲奇饼；我给弟弟留了一块曲奇饼。 |
| cooking | cooking | Her cooking smells wonderful. | cooking = 烹饪；她做饭的味道很香。 |
| copy | copy | Please send me a copy of the form. | copy = 复印件；请给我一份表格复印件。 |
| corn | corn | We had corn with dinner. | corn = 玉米；我们晚饭吃了玉米。 |
| costume | costume | He wore a pirate costume to the party. | costume = 服装；他穿着海盗服装去参加聚会。 |
| cough | cough | She has a bad cough today. | cough = 咳嗽；她今天咳嗽得很厉害。 |

- [ ] Create the ledger from all 50 rows.
- [ ] Promote every row with the normalized key used by `getWordExample()`, using `checkinnoun` and `checkoutnoun` for the existing override targets.
- [ ] Update older `check-in` and `checkout` null assertions to the promoted noun examples.
- [ ] Run the targeted tests and verify all pass.
- [ ] Commit with `git commit -m "feat: add fourth reviewed objects examples"`.

### Task 3: Audit, Verify, And Integrate

**Files:**
- Modify if required: `scripts/audit-reviewed-pet-examples.ts`
- Regenerate: `src/lib/generated/pet-word-example-audit.ts`

- [ ] Run `npm run audit:examples` and inspect every flag against cached forward and back translations.
- [ ] Correct real mismatches in plan, ledger, and registry; manually confirm only valid contextual senses or synonyms with comments.
- [ ] Verify audit reports 1594 reviewed examples and 0 need review.
- [ ] Run `npm test` and verify all tests pass.
- [ ] Run `npm run build` and verify the production build succeeds.
- [ ] Commit with `git commit -m "test: audit fourth objects example batch"`.
- [ ] Push `main`, verify local and remote SHA match, verify coverage is 1599/3099 with objects at 254/972, and verify the production service returns HTTP 200.
