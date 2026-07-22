# PET Objects 007 Example Batch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add reviewed PET/B1 examples for the seventh 50 remaining objects-theme terms.

**Architecture:** Store approved content in `data/example-candidates/objects-007.json` and promote identical entries into `getReviewedWordExamples()`. Keep candidate data unimported by runtime code and verify ambiguous noun senses such as `fan`, `fare`, `fault`, `favour`, `figure`, `firm`, `form`, `full stop`, `glasses`, and `global warming`.

**Tech Stack:** Next.js 15, TypeScript, Vitest, Vite SSR loader, Google Translate audit script.

## Global Constraints

- Exactly 50 currently missing official objects-theme terms, from `explorer` through `global warming` in remaining vocabulary order.
- Reviewed registry coverage rises from 1694 to 1744; accessible official rows rises from 1699 to 1749.
- Objects accessible coverage rises from 354/972 to 404/972.
- Candidate data remains unimported by application code.
- Every entry passes ledger alignment, intended-sense checks, bilingual audit, full tests, and production build.

---

### Task 1: Add Failing Coverage Tests

**Files:**
- Modify: `src/lib/pet-learning-app.test.ts`

- [ ] Add `objectsSeventhBatch` using the 50 table terms below.
- [ ] Require all selected terms to return reviewed sentences, registry count at least 1744, and objects coverage at least 404/972.
- [ ] Add candidate-ledger alignment and exact sense assertions.
- [ ] Run `npx vitest run src/lib/pet-learning-app.test.ts -t "seventh objects"` and verify three failures because content is absent.
- [ ] Commit with `git commit -m "test: require seventh objects example batch"`.

### Task 2: Create And Promote The Reviewed Entries

**Files:**
- Create: `data/example-candidates/objects-007.json`
- Modify: `src/lib/pet-learning-app.ts`

The ledger uses `batchId: objects-007`, `status: promoted`, and these exact entries:

| Term | Focus Word | Sentence | Chinese |
| --- | --- | --- | --- |
| explorer | explorer | The explorer crossed the desert on foot. | explorer = 探险家；探险家徒步穿过了沙漠。 |
| facilities | facilities | The campsite has good facilities for families. | facilities = 设施；这个露营地有适合家庭的良好设施。 |
| fact | fact | It is a fact that water freezes at zero degrees. | fact = 事实；水在零度结冰是一个事实。 |
| fan | fan | A fan kept the room cool. | fan = 风扇；一台风扇让房间保持凉爽。 |
| fare | fare | The bus fare is two pounds. | fare = 车费；公交车费是两英镑。 |
| farming | farming | Farming is hard work in dry weather. | farming = 农业；干燥天气里的农业工作很辛苦。 |
| farmland | farmland | The new road crosses farmland. | farmland = 农田；这条新路穿过农田。 |
| fault | fault | The accident was not my fault. | fault = 过错；这次事故不是我的过错。 |
| favour | favour | Can you do me a favour after class? | favour = 帮忙；下课后你能帮我一个忙吗？ |
| fee | fee | The course fee includes books. | fee = 费用；课程费用包括书本。 |
| feeling | feeling | I had a strange feeling before the exam. | feeling = 感觉；考试前我有一种奇怪的感觉。 |
| fever | fever | A high fever kept him in bed. | fever = 发烧；高烧让他卧床休息。 |
| fight | fight | The fight started outside the stadium. | fight = 打架；打架发生在体育场外。 |
| figure | figure | This figure shows how many students came. | figure = 数字；这个数字显示来了多少学生。 |
| fire | fire | The fire damaged two houses. | fire = 火灾；这场火灾损坏了两所房子。 |
| firefighter | firefighter | The firefighter rescued a child from the house. | firefighter = 消防员；消防员从房子里救出一个孩子。 |
| firm | firm | My aunt works for a large firm. | firm = 公司；我姑姑在一家大公司工作。 |
| first name | first name | Write your first name on the form. | first name = 名；把你的名写在表格上。 |
| fishing | fishing | Fishing is not allowed in this river. | fishing = 钓鱼；这条河里不允许钓鱼。 |
| flag | flag | The flag flew above the school gate. | flag = 旗帜；旗帜在学校大门上方飘扬。 |
| flavour | flavour | Strawberry is my favourite ice cream flavour. | flavour = 味道；草莓是我最喜欢的冰淇淋味道。 |
| flood | flood | The flood covered the road with water. | flood = 洪水；洪水淹没了道路。 |
| flour | flour | Mix the flour with warm water. | flour = 面粉；把面粉和温水混合。 |
| flu | flu | He missed school because of the flu. | flu = 流感；他因为流感没去上学。 |
| flute | flute | She plays the flute in the school band. | flute = 长笛；她在学校乐队里吹长笛。 |
| fog | fog | Thick fog delayed the morning train. | fog = 雾；浓雾延误了早班火车。 |
| fool | fool | Do not be a fool near deep water. | fool = 傻瓜；在深水附近不要犯傻。 |
| footballer | footballer | The footballer scored in the final minute. | footballer = 足球运动员；足球运动员在最后一分钟进球。 |
| forecast | forecast | The weather forecast says it will rain. | forecast = 预报；天气预报说会下雨。 |
| foreigner | foreigner | The guide helped the foreigner buy a ticket. | foreigner = 外国人；导游帮那位外国人买票。 |
| form | form | Fill in this form before the lesson. | form = 表格；上课前填写这张表格。 |
| fortnight | fortnight | My cousin stayed with us for a fortnight. | fortnight = 两周；我表弟和我们住了两周。 |
| fountain | fountain | There is a fountain in the town square. | fountain = 喷泉；城镇广场上有一座喷泉。 |
| frame | frame | The photo is in a wooden frame. | frame = 相框；照片装在木制相框里。 |
| freezer | freezer | Put the ice cream in the freezer. | freezer = 冰柜；把冰淇淋放进冰柜。 |
| frog | frog | A green frog jumped into the pond. | frog = 青蛙；一只绿色青蛙跳进池塘。 |
| frying pan | frying pan | Heat the oil in a frying pan. | frying pan = 煎锅；在煎锅里加热油。 |
| fuel | fuel | This car uses less fuel than our old one. | fuel = 燃料；这辆车比我们的旧车耗油更少。 |
| full stop | full stop | Put a full stop at the end of the sentence. | full stop = 句号；在句末加一个句号。 |
| fur | fur | The cat's fur was soft and warm. | fur = 毛；猫的毛柔软又暖和。 |
| gale | gale | A gale blew down several trees. | gale = 大风；一阵大风吹倒了几棵树。 |
| gap | gap | There is a small gap between the doors. | gap = 缝隙；两扇门之间有一条小缝。 |
| garlic | garlic | Add garlic to the soup. | garlic = 大蒜；往汤里加大蒜。 |
| gas | gas | Gas is used for cooking in this house. | gas = 煤气；这所房子用煤气做饭。 |
| gate | gate | Meet me at the front gate. | gate = 大门；在前门和我见面。 |
| geography | geography | Geography teaches us about countries and rivers. | geography = 地理；地理教我们了解国家和河流。 |
| gift | gift | I bought a gift for my sister. | gift = 礼物；我给妹妹买了一份礼物。 |
| girlfriend | girlfriend | His girlfriend is waiting outside the cinema. | girlfriend = 女朋友；他的女朋友在电影院外面等。 |
| glasses | glasses | I need my glasses to read the menu. | glasses = 眼镜；我需要戴眼镜才能看菜单。 |
| global warming | global warming | Global warming is changing the climate. | global warming = 全球变暖；全球变暖正在改变气候。 |

- [ ] Create the ledger from all 50 rows.
- [ ] Promote every row with the normalized key used by `getWordExample()`.
- [ ] Run the targeted tests and verify all pass.
- [ ] Commit with `git commit -m "feat: add seventh reviewed objects examples"`.

### Task 3: Audit, Verify, And Integrate

**Files:**
- Modify if required: `scripts/audit-reviewed-pet-examples.ts`
- Regenerate: `src/lib/generated/pet-word-example-audit.ts`

- [ ] Run `npm run audit:examples` and inspect every flag against cached forward and back translations.
- [ ] Correct real mismatches in plan, ledger, and registry; manually confirm only valid contextual senses or synonyms with comments.
- [ ] Verify audit reports 1744 reviewed examples and 0 need review.
- [ ] Run `npm test` and verify all tests pass.
- [ ] Run `npm run build` and verify the production build succeeds.
- [ ] Commit with `git commit -m "test: audit seventh objects example batch"`.
- [ ] Push `main`, verify local and remote SHA match, verify coverage is 1749/3099 with objects at 404/972, and verify the production service returns HTTP 200.
