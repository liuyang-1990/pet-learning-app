# PET Objects 003 Example Batch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add reviewed PET/B1 examples for the third 50 remaining objects-theme terms.

**Architecture:** Store approved content in `data/example-candidates/objects-003.json` and promote identical entries into `getReviewedWordExamples()`. Keep candidate data unimported by runtime code and add an exact-term override for `café / cafe` so the accented slash form resolves to the stable `cafe` reviewed key.

**Tech Stack:** Next.js 15, TypeScript, Vitest, Vite SSR loader, Google Translate audit script.

## Global Constraints

- Exactly 50 currently missing official objects-theme terms, from `brochure` through `charge` in remaining vocabulary order.
- Reviewed registry coverage rises from 1494 to 1544; accessible official rows rises from 1499 to 1549.
- Objects accessible coverage rises from 154/972 to 204/972.
- Candidate data remains unimported by application code.
- Every entry passes ledger alignment, intended-sense checks, bilingual audit, full tests, and production build.

---

### Task 1: Add Failing Coverage Tests

**Files:**
- Modify: `src/lib/pet-learning-app.test.ts`

- [ ] Add `objectsThirdBatch` using the 50 table terms below.
- [ ] Require all selected terms to return reviewed sentences, registry count at least 1544, and objects coverage at least 204/972.
- [ ] Add candidate-ledger alignment and exact sense assertions.
- [ ] Run `npx vitest run src/lib/pet-learning-app.test.ts -t "third objects"` and verify three failures because content is absent.
- [ ] Commit with `git commit -m "test: require third objects example batch"`.

### Task 2: Create And Promote The Reviewed Entries

**Files:**
- Create: `data/example-candidates/objects-003.json`
- Modify: `src/lib/pet-learning-app.ts`

The ledger uses `batchId: objects-003`, `status: promoted`, and these exact entries:

| Term | Focus Word | Sentence | Chinese |
| --- | --- | --- | --- |
| brochure | brochure | Pick up a brochure at the tourist office. | brochure = 小册子；在旅游办公室拿一本小册子。 |
| brush | brush | Use this brush to clean your shoes. | brush = 刷子；用这把刷子清洁你的鞋。 |
| bucket | bucket | Fill the bucket with water. | bucket = 桶；把桶装满水。 |
| bug | bug | The computer game has a small bug. | bug = 程序错误；这个电脑游戏有一个小程序错误。 |
| bulb | bulb | We need a new bulb for the lamp. | bulb = 灯泡；这盏灯需要一个新灯泡。 |
| bull | bull | The bull stood in the field. | bull = 公牛；那头公牛站在田里。 |
| bunch | bunch | She bought a bunch of flowers. | bunch = 一束；她买了一束花。 |
| bush | bush | A small bush grew beside the path. | bush = 灌木；小路旁长着一丛小灌木。 |
| butcher | butcher | The butcher cut the meat carefully. | butcher = 屠夫；屠夫仔细地切肉。 |
| butter | butter | Spread some butter on the bread. | butter = 黄油；在面包上抹些黄油。 |
| butterfly | butterfly | A butterfly landed on the flower. | butterfly = 蝴蝶；一只蝴蝶落在花上。 |
| button | button | Press the red button to start. | button = 按钮；按红色按钮开始。 |
| buyer | buyer | The buyer asked about the price. | buyer = 买家；买家询问了价格。 |
| cab | cab | We took a cab to the station. | cab = 出租车；我们乘出租车去了车站。 |
| cabbage | cabbage | Add the cabbage to the soup. | cabbage = 卷心菜；把卷心菜加进汤里。 |
| cabin | cabin | We stayed in a small cabin by the lake. | cabin = 小木屋；我们住在湖边的一间小木屋里。 |
| cabinet | cabinet | The plates are in the kitchen cabinet. | cabinet = 橱柜；盘子在厨房橱柜里。 |
| cable | cable | The cable connects the screen to the computer. | cable = 电缆；这根电缆把屏幕连接到电脑上。 |
| café / cafe | cafe | Let's meet at the cafe after school. | cafe = 咖啡馆；我们放学后在咖啡馆见面吧。 |
| cafeteria | cafeteria | Students eat lunch in the cafeteria. | cafeteria = 自助餐厅；学生们在自助餐厅吃午饭。 |
| calf | calf | The young calf stayed close to its mother. | calf = 小牛；小牛紧挨着它的妈妈。 |
| camel | camel | A camel can carry heavy bags in the desert. | camel = 骆驼；骆驼能在沙漠里驮重包。 |
| camp | camp | The summer camp starts in July. | camp = 营地；夏令营在七月开始。 |
| campsite | campsite | Our campsite was near the river. | campsite = 露营地；我们的露营地在河边。 |
| canal | canal | We walked along the canal in the evening. | canal = 运河；晚上我们沿着运河散步。 |
| candidate | candidate | Each candidate gave a short speech. | candidate = 候选人；每位候选人都做了简短演讲。 |
| candle | candle | She lit a candle during the power cut. | candle = 蜡烛；停电时她点了一支蜡烛。 |
| candy | candy | The children shared a bag of candy. | candy = 糖果；孩子们分享了一袋糖果。 |
| canteen | canteen | The canteen sells hot meals at lunchtime. | canteen = 食堂；食堂午餐时间卖热饭。 |
| captain | captain | The captain thanked the team after the match. | captain = 队长；比赛后队长感谢了全队。 |
| care | care | The old house needs a lot of care. | care = 照料；这座老房子需要大量照料。 |
| carrot | carrot | Cut the carrot into small pieces. | carrot = 胡萝卜；把胡萝卜切成小块。 |
| cartoon | cartoon | We watched a funny cartoon on TV. | cartoon = 卡通片；我们在电视上看了一部有趣的卡通片。 |
| cashpoint | cashpoint | There is a cashpoint outside the bank. | cashpoint = 自动取款机；银行外面有一台自动取款机。 |
| castle | castle | The castle is on top of the hill. | castle = 城堡；城堡在山顶上。 |
| cathedral | cathedral | The cathedral has beautiful windows. | cathedral = 大教堂；这座大教堂有美丽的窗户。 |
| cattle | cattle | The farmer keeps cattle on the farm. | cattle = 牛群；农民在农场养牛群。 |
| cave | cave | We explored a dark cave near the beach. | cave = 洞穴；我们探索了海滩附近的一个黑暗洞穴。 |
| ceiling | ceiling | The lamp hangs from the ceiling. | ceiling = 天花板；灯从天花板上垂下来。 |
| centimetre | centimetre | The pencil is one centimetre longer than mine. | centimetre = 厘米；这支铅笔比我的长一厘米。 |
| central heating | central heating | The central heating keeps the house warm. | central heating = 中央供暖；中央供暖让房子保持温暖。 |
| century | century | This bridge was built last century. | century = 世纪；这座桥建于上个世纪。 |
| cereal | cereal | I usually have cereal for breakfast. | cereal = 谷物；我通常早餐吃麦片。 |
| ceremony | ceremony | The prize ceremony began at noon. | ceremony = 仪式；颁奖仪式在中午开始。 |
| certificate | certificate | She received a certificate for the course. | certificate = 证书；她获得了这门课程的证书。 |
| chain | chain | He locked the bike with a chain. | chain = 链条；他用链条锁住自行车。 |
| challenge | challenge | Climbing the hill was a real challenge. | challenge = 挑战；爬这座山真是一次挑战。 |
| champion | champion | The champion held up the gold cup. | champion = 冠军；冠军举起了金杯。 |
| channel | channel | Change the channel if the film is boring. | channel = 频道；如果电影无聊就换个频道。 |
| charge | charge | There is no charge for museum entry. | charge = 费用；博物馆入场不收费。 |

- [ ] Create the ledger from all 50 rows.
- [ ] Promote every row with the normalized key used by `getWordExample()`.
- [ ] Run the targeted tests and verify all pass.
- [ ] Commit with `git commit -m "feat: add third reviewed objects examples"`.

### Task 3: Audit, Verify, And Integrate

**Files:**
- Modify if required: `scripts/audit-reviewed-pet-examples.ts`
- Regenerate: `src/lib/generated/pet-word-example-audit.ts`

- [ ] Run `npm run audit:examples` and inspect every flag against cached forward and back translations.
- [ ] Correct real mismatches in plan, ledger, and registry; manually confirm only valid contextual senses or synonyms with comments.
- [ ] Verify audit reports 1544 reviewed examples and 0 need review.
- [ ] Run `npm test` and verify all tests pass.
- [ ] Run `npm run build` and verify the production build succeeds.
- [ ] Commit with `git commit -m "test: audit third objects example batch"`.
- [ ] Push `main`, verify local and remote SHA match, verify coverage is 1549/3099 with objects at 204/972, and verify the production service returns HTTP 200.
