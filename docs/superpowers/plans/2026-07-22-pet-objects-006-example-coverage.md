# PET Objects 006 Example Batch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add reviewed PET/B1 examples for the sixth 50 remaining objects-theme terms.

**Architecture:** Store approved content in `data/example-candidates/objects-006.json` and promote identical entries into `getReviewedWordExamples()`. Keep candidate data unimported by runtime code and verify ambiguous noun senses such as `disc jockey`, `disk`, `drive`, `license`, `entry`, `exchange`, `exchange rate`, and `excuse`.

**Tech Stack:** Next.js 15, TypeScript, Vitest, Vite SSR loader, Google Translate audit script.

## Global Constraints

- Exactly 50 currently missing official objects-theme terms, from `disc jockey` through `expert` in remaining vocabulary order.
- Reviewed registry coverage rises from 1644 to 1694; accessible official rows rises from 1649 to 1699.
- Objects accessible coverage rises from 304/972 to 354/972.
- Candidate data remains unimported by application code.
- Every entry passes ledger alignment, intended-sense checks, bilingual audit, full tests, and production build.

---

### Task 1: Add Failing Coverage Tests

**Files:**
- Modify: `src/lib/pet-learning-app.test.ts`

- [ ] Add `objectsSixthBatch` using the 50 table terms below.
- [ ] Require all selected terms to return reviewed sentences, registry count at least 1694, and objects coverage at least 354/972.
- [ ] Add candidate-ledger alignment and exact sense assertions.
- [ ] Run `npx vitest run src/lib/pet-learning-app.test.ts -t "sixth objects"` and verify three failures because content is absent.
- [ ] Commit with `git commit -m "test: require sixth objects example batch"`.

### Task 2: Create And Promote The Reviewed Entries

**Files:**
- Create: `data/example-candidates/objects-006.json`
- Modify: `src/lib/pet-learning-app.ts`

The ledger uses `batchId: objects-006`, `status: promoted`, and these exact entries:

| Term | Focus Word | Sentence | Chinese |
| --- | --- | --- | --- |
| disc jockey | disc jockey | The disc jockey played music at the party. | disc jockey = 唱片骑师；唱片骑师在聚会上播放音乐。 |
| disco | disco | The hotel has a small disco downstairs. | disco = 迪斯科舞厅；酒店楼下有一个小迪斯科舞厅。 |
| discovery | discovery | The discovery of the old map excited the class. | discovery = 发现；旧地图的发现让全班很兴奋。 |
| discussion | discussion | We had a discussion about the school trip. | discussion = 讨论；我们讨论了学校旅行。 |
| disease | disease | This disease spreads quickly in winter. | disease = 疾病；这种疾病在冬天传播很快。 |
| dishwasher | dishwasher | Put the plates in the dishwasher. | dishwasher = 洗碗机；把盘子放进洗碗机。 |
| disk | disk | Save the photos on this disk. | disk = 磁盘；把照片保存在这张磁盘上。 |
| district | district | This district has many small shops. | district = 区；这个区有许多小商店。 |
| diver | diver | The diver found a shell under the water. | diver = 潜水员；潜水员在水下发现了一个贝壳。 |
| diving | diving | Diving is popular on this island. | diving = 潜水；潜水在这座岛上很受欢迎。 |
| doll | doll | The child put the doll on the bed. | doll = 玩偶；孩子把玩偶放在床上。 |
| dolphin | dolphin | A dolphin swam beside the boat. | dolphin = 海豚；一只海豚在船旁游动。 |
| donkey | donkey | The donkey carried bags up the hill. | donkey = 驴；驴把袋子驮上山。 |
| dot | dot | Put a dot above the letter i. | dot = 点；在字母 i 上方加一个点。 |
| doubt | doubt | I had no doubt that she was right. | doubt = 怀疑；我毫不怀疑她是对的。 |
| drawer | drawer | The keys are in the top drawer. | drawer = 抽屉；钥匙在最上面的抽屉里。 |
| dream | dream | His dream is to become a pilot. | dream = 梦想；他的梦想是成为一名飞行员。 |
| drive | drive | The drive to the lake took two hours. | drive = 车程；去湖边的车程花了两个小时。 |
| driver | driver | The driver stopped at the red light. | driver = 司机；司机在红灯前停下。 |
| license | license | You need a license to drive a car. | license = 执照；开车需要执照。 |
| drugstore | drugstore | The drugstore sells medicine and shampoo. | drugstore = 药店；药店出售药品和洗发水。 |
| drum | drum | He played the drum in the school band. | drum = 鼓；他在学校乐队里打鼓。 |
| dustbin | dustbin | Throw the empty bottle in the dustbin. | dustbin = 垃圾桶；把空瓶扔进垃圾桶。 |
| duty | duty | It is my duty to lock the classroom. | duty = 责任；锁教室是我的责任。 |
| duvet | duvet | The duvet kept me warm all night. | duvet = 羽绒被；羽绒被让我整晚都很暖和。 |
| earache | earache | She stayed home because of an earache. | earache = 耳痛；她因为耳痛待在家里。 |
| earring | earring | She lost one silver earring. | earring = 耳环；她丢了一只银耳环。 |
| economics | economics | Economics helps us understand money and trade. | economics = 经济学；经济学帮助我们理解金钱和贸易。 |
| edge | edge | Do not stand too close to the edge. | edge = 边缘；不要站得离边缘太近。 |
| effect | effect | The medicine had a strong effect. | effect = 效果；这种药效果很强。 |
| effort | effort | Your effort made the project better. | effort = 努力；你的努力让这个项目更好了。 |
| elbow | elbow | He hurt his elbow during basketball practice. | elbow = 肘部；他在篮球训练中伤了肘部。 |
| elevator | elevator | Take the elevator to the fifth floor. | elevator = 电梯；乘电梯到五楼。 |
| embassy | embassy | The embassy is closed on Sunday. | embassy = 大使馆；大使馆星期日关闭。 |
| employee | employee | Every employee must wear an ID card. | employee = 雇员；每位雇员都必须佩戴身份证件。 |
| employer | employer | Her employer offered a training course. | employer = 雇主；她的雇主提供了一门培训课程。 |
| ending | ending | The ending of the story surprised me. | ending = 结尾；这个故事的结尾让我很惊讶。 |
| enemy | enemy | In the game, the enemy hides behind the wall. | enemy = 敌人；在游戏中，敌人躲在墙后。 |
| energy | energy | Solar energy can heat water. | energy = 能源；太阳能可以加热水。 |
| engine | engine | The car engine sounded strange. | engine = 发动机；汽车发动机听起来很奇怪。 |
| engineering | engineering | Engineering is a popular university subject. | engineering = 工程学；工程学是一门受欢迎的大学科目。 |
| entry | entry | The museum entry is free for children. | entry = 入场；儿童可以免费入场博物馆。 |
| envelope | envelope | Put the letter in an envelope. | envelope = 信封；把信放进信封里。 |
| episode | episode | The next episode starts at eight. | episode = 一集；下一集八点开始。 |
| eraser | eraser | Use an eraser to remove the pencil mark. | eraser = 橡皮；用橡皮擦掉铅笔痕迹。 |
| event | event | The sports event begins at nine. | event = 活动；体育活动九点开始。 |
| exchange | exchange | The student exchange lasted two weeks. | exchange = 交换；这次学生交换持续了两周。 |
| exchange rate | exchange rate | Check the exchange rate before you travel. | exchange rate = 汇率；旅行前查看汇率。 |
| excuse | excuse | He gave a weak excuse for being late. | excuse = 借口；他为迟到找了一个站不住脚的借口。 |
| expert | expert | An expert checked the old painting. | expert = 专家；一位专家检查了那幅旧画。 |

- [ ] Create the ledger from all 50 rows.
- [ ] Promote every row with the normalized key used by `getWordExample()`.
- [ ] Run the targeted tests and verify all pass.
- [ ] Commit with `git commit -m "feat: add sixth reviewed objects examples"`.

### Task 3: Audit, Verify, And Integrate

**Files:**
- Modify if required: `scripts/audit-reviewed-pet-examples.ts`
- Regenerate: `src/lib/generated/pet-word-example-audit.ts`

- [ ] Run `npm run audit:examples` and inspect every flag against cached forward and back translations.
- [ ] Correct real mismatches in plan, ledger, and registry; manually confirm only valid contextual senses or synonyms with comments.
- [ ] Verify audit reports 1694 reviewed examples and 0 need review.
- [ ] Run `npm test` and verify all tests pass.
- [ ] Run `npm run build` and verify the production build succeeds.
- [ ] Commit with `git commit -m "test: audit sixth objects example batch"`.
- [ ] Push `main`, verify local and remote SHA match, verify coverage is 1699/3099 with objects at 354/972, and verify the production service returns HTTP 200.
