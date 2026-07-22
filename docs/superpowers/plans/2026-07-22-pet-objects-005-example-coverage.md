# PET Objects 005 Example Batch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add reviewed PET/B1 examples for the fifth 50 remaining objects-theme terms.

**Architecture:** Store approved content in `data/example-candidates/objects-005.json` and promote identical entries into `getReviewedWordExamples()`. Keep candidate data unimported by runtime code and verify ambiguous noun senses such as `court`, `cricket`, `date`, `desert`, `dessert`, and `disc / disk`.

**Tech Stack:** Next.js 15, TypeScript, Vitest, Vite SSR loader, Google Translate audit script.

## Global Constraints

- Exactly 50 currently missing official objects-theme terms, from `countryside` through `disc / disk` in remaining vocabulary order.
- Reviewed registry coverage rises from 1594 to 1644; accessible official rows rises from 1599 to 1649.
- Objects accessible coverage rises from 254/972 to 304/972.
- Candidate data remains unimported by application code.
- Every entry passes ledger alignment, intended-sense checks, bilingual audit, full tests, and production build.

---

### Task 1: Add Failing Coverage Tests

**Files:**
- Modify: `src/lib/pet-learning-app.test.ts`

- [ ] Add `objectsFifthBatch` using the 50 table terms below.
- [ ] Require all selected terms to return reviewed sentences, registry count at least 1644, and objects coverage at least 304/972.
- [ ] Add candidate-ledger alignment and exact sense assertions.
- [ ] Run `npx vitest run src/lib/pet-learning-app.test.ts -t "fifth objects"` and verify three failures because content is absent.
- [ ] Commit with `git commit -m "test: require fifth objects example batch"`.

### Task 2: Create And Promote The Reviewed Entries

**Files:**
- Create: `data/example-candidates/objects-005.json`
- Modify: `src/lib/pet-learning-app.ts`

The ledger uses `batchId: objects-005`, `status: promoted`, and these exact entries:

| Term | Focus Word | Sentence | Chinese |
| --- | --- | --- | --- |
| countryside | countryside | My grandparents live in the countryside. | countryside = 乡村；我的祖父母住在乡村。 |
| couple | couple | A young couple sat near the window. | couple = 夫妇；一对年轻夫妇坐在窗边。 |
| courage | courage | She showed courage during the difficult race. | courage = 勇气；她在艰难的比赛中表现出了勇气。 |
| court | court | We played tennis on the new court. | court = 球场；我们在新球场上打网球。 |
| cover | cover | The book cover is bright red. | cover = 封面；这本书的封面是鲜红色的。 |
| crash | crash | No one was hurt in the car crash. | crash = 撞车事故；这起汽车撞车事故中没有人受伤。 |
| creature | creature | The strange sea creature moved slowly. | creature = 生物；那只奇怪的海洋生物慢慢移动。 |
| credit | credit | You can pay by credit at this shop. | credit = 信用付款；你可以在这家商店用信用付款。 |
| crew | crew | The ship's crew worked all night. | crew = 船员；船员们工作了一整夜。 |
| cricket | cricket | Cricket is popular in many schools. | cricket = 板球；板球在许多学校很受欢迎。 |
| crime | crime | The police are investigating the crime. | crime = 犯罪；警方正在调查这起犯罪。 |
| criminal | criminal | The criminal left the city by train. | criminal = 罪犯；罪犯乘火车离开了这座城市。 |
| cross | cross | There is a red cross on the first-aid box. | cross = 十字；急救箱上有一个红十字。 |
| crossing | crossing | Use the crossing to get to the other side. | crossing = 人行横道；使用人行横道到达另一边。 |
| crossroads | crossroads | Turn left at the crossroads. | crossroads = 十字路口；在十字路口左转。 |
| cruise | cruise | They booked a cruise around the islands. | cruise = 邮轮旅行；他们预订了环岛邮轮旅行。 |
| cry | cry | I heard a cry from the next room. | cry = 叫声；我听到隔壁房间传来一声叫喊。 |
| cucumber | cucumber | Add some cucumber to the salad. | cucumber = 黄瓜；往沙拉里加些黄瓜。 |
| cure | cure | Doctors are still looking for a cure. | cure = 治疗方法；医生们仍在寻找一种治疗方法。 |
| currency | currency | The euro is the currency in France. | currency = 货币；欧元是法国的货币。 |
| curriculum | curriculum | Music is part of the school curriculum. | curriculum = 课程；音乐是学校课程的一部分。 |
| curry | curry | This vegetable curry is not too hot. | curry = 咖喱；这份蔬菜咖喱不太辣。 |
| curtain | curtain | Close the curtain before you sleep. | curtain = 窗帘；睡觉前拉上窗帘。 |
| cut | cut | He had a small cut on his finger. | cut = 伤口；他的手指上有一个小伤口。 |
| cycle | cycle | This diagram shows the water cycle. | cycle = 循环；这张图展示了水循环。 |
| cyclist | cyclist | The cyclist wore a bright yellow jacket. | cyclist = 骑自行车的人；骑自行车的人穿着亮黄色夹克。 |
| damage | damage | The storm caused damage to the roof. | damage = 损坏；暴风雨造成了屋顶损坏。 |
| data | data | The app stores the data safely. | data = 数据；这个应用安全地存储数据。 |
| date | date | Write the date at the top of the page. | date = 日期；把日期写在页面顶部。 |
| death | death | The story is about the death of a king. | death = 死亡；这个故事讲的是一位国王的死亡。 |
| decision | decision | We made a decision after lunch. | decision = 决定；午饭后我们做了决定。 |
| decrease | decrease | There was a decrease in ticket sales. | decrease = 下降；票务销售出现了下降。 |
| defeat | defeat | The team accepted its defeat calmly. | defeat = 失败；球队平静地接受了失败。 |
| delay | delay | The train delay lasted twenty minutes. | delay = 延误；火车延误持续了二十分钟。 |
| delivery | delivery | The delivery arrived before dinner. | delivery = 递送；这次递送在晚饭前到了。 |
| demand | demand | There is high demand for this phone. | demand = 需求；这款手机需求很高。 |
| departure | departure | Our departure was at seven in the morning. | departure = 出发；我们的出发时间是早上七点。 |
| deposit | deposit | We paid a small deposit for the room. | deposit = 定金；我们为房间付了一小笔定金。 |
| desert | desert | The desert is very cold at night. | desert = 沙漠；沙漠夜晚非常寒冷。 |
| design | design | I like the simple design of this phone. | design = 设计；我喜欢这部手机的简洁设计。 |
| dessert | dessert | We had ice cream for dessert. | dessert = 甜点；我们甜点吃了冰淇淋。 |
| diagram | diagram | The diagram explains how the machine works. | diagram = 图表；这张图表解释了机器如何工作。 |
| diary | diary | She writes in her diary every night. | diary = 日记；她每天晚上写日记。 |
| diet | diet | A healthy diet includes fruit and vegetables. | diet = 饮食；健康饮食包括水果和蔬菜。 |
| difficulty | difficulty | He had difficulty finding the address. | difficulty = 困难；他找这个地址时遇到了困难。 |
| diploma | diploma | She received her diploma in June. | diploma = 文凭；她在六月收到了文凭。 |
| director | director | The director spoke to the actors. | director = 导演；导演和演员们讲话。 |
| dirt | dirt | There was dirt on my shoes. | dirt = 泥土；我的鞋上有泥土。 |
| disadvantage | disadvantage | A long journey is the main disadvantage. | disadvantage = 缺点；路途遥远是主要缺点。 |
| disc / disk | disc | The computer saved the file on a disk. | disc = 磁盘；电脑把文件保存在磁盘上。 |

- [ ] Create the ledger from all 50 rows.
- [ ] Promote every row with the normalized key used by `getWordExample()`.
- [ ] Run the targeted tests and verify all pass.
- [ ] Commit with `git commit -m "feat: add fifth reviewed objects examples"`.

### Task 3: Audit, Verify, And Integrate

**Files:**
- Modify if required: `scripts/audit-reviewed-pet-examples.ts`
- Regenerate: `src/lib/generated/pet-word-example-audit.ts`

- [ ] Run `npm run audit:examples` and inspect every flag against cached forward and back translations.
- [ ] Correct real mismatches in plan, ledger, and registry; manually confirm only valid contextual senses or synonyms with comments.
- [ ] Verify audit reports 1644 reviewed examples and 0 need review.
- [ ] Run `npm test` and verify all tests pass.
- [ ] Run `npm run build` and verify the production build succeeds.
- [ ] Commit with `git commit -m "test: audit fifth objects example batch"`.
- [ ] Push `main`, verify local and remote SHA match, verify coverage is 1649/3099 with objects at 304/972, and verify the production service returns HTTP 200.
