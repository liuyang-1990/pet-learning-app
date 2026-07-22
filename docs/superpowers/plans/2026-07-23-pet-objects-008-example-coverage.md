# PET Objects 008 Example Batch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add reviewed PET/B1 examples for the eighth 50 remaining objects-theme terms.

**Architecture:** Store approved content in `data/example-candidates/objects-008.json` and promote identical entries into `getReviewedWordExamples()`. Keep candidate data unimported by runtime code and verify ambiguous noun senses such as `grade`, `graduate`, `grant`, `grill`, `guard`, `gum`, `hardware`, `heat`, `hit`, and `homepage`.

**Tech Stack:** Next.js 15, TypeScript, Vitest, Vite SSR loader, Google Translate audit script.

## Global Constraints

- Exactly 50 currently missing official objects-theme terms, from `goalkeeper` through `honey` in remaining vocabulary order.
- Reviewed registry coverage rises from 1744 to 1794; accessible official rows rises from 1749 to 1799.
- Objects accessible coverage rises from 404/972 to 454/972.
- Candidate data remains unimported by application code.
- Every entry passes ledger alignment, intended-sense checks, bilingual audit, full tests, and production build.

---

### Task 1: Add Failing Coverage Tests

**Files:**
- Modify: `src/lib/pet-learning-app.test.ts`

- [ ] Add `objectsEighthBatch` using the 50 table terms below.
- [ ] Require all selected terms to return reviewed sentences, registry count at least 1794, and objects coverage at least 454/972.
- [ ] Add candidate-ledger alignment and exact sense assertions.
- [ ] Run `npx vitest run src/lib/pet-learning-app.test.ts -t "eighth objects"` and verify three failures because content is absent.
- [ ] Commit with `git commit -m "test: require eighth objects example batch"`.

### Task 2: Create And Promote The Reviewed Entries

**Files:**
- Create: `data/example-candidates/objects-008.json`
- Modify: `src/lib/pet-learning-app.ts`

The ledger uses `batchId: objects-008`, `status: promoted`, and these exact entries:

| Term | Focus Word | Sentence | Chinese |
| --- | --- | --- | --- |
| goalkeeper | goalkeeper | The goalkeeper caught the ball easily. | goalkeeper = 守门员；守门员轻松接住了球。 |
| goat | goat | A goat stood on the hill. | goat = 山羊；一只山羊站在山坡上。 |
| grade | grade | She got a high grade in science. | grade = 成绩；她科学课得了高分。 |
| graduate | graduate | The graduate found a job in a bank. | graduate = 毕业生；这名毕业生在银行找到了一份工作。 |
| grandchild | grandchild | Their first grandchild was born in May. | grandchild = 孙辈；他们的第一个孙辈在五月出生。 |
| grandad | grandad | My grandad grows tomatoes in his garden. | grandad = 爷爷；我爷爷在花园里种西红柿。 |
| granddaughter | granddaughter | Her granddaughter plays the violin. | granddaughter = 孙女；她的孙女拉小提琴。 |
| grandma | grandma | Grandma made soup for lunch. | grandma = 奶奶；奶奶午饭做了汤。 |
| grandpa | grandpa | Grandpa told us a funny story. | grandpa = 爷爷；爷爷给我们讲了一个有趣的故事。 |
| grandson | grandson | Their grandson studies in London. | grandson = 孙子；他们的孙子在伦敦学习。 |
| granny | granny | Granny sent me a birthday card. | granny = 奶奶；奶奶寄给我一张生日卡。 |
| grant | grant | The school received a grant for new computers. | grant = 补助金；学校收到了一笔购买新电脑的补助金。 |
| grape | grape | She ate one green grape. | grape = 葡萄；她吃了一颗绿色葡萄。 |
| graphics | graphics | The game has bright graphics. | graphics = 图形；这个游戏有明亮的图形。 |
| greeting | greeting | He gave us a warm greeting at the door. | greeting = 问候；他在门口热情地问候了我们。 |
| grill | grill | Cook the fish under the grill for ten minutes. | grill = 烤架；把鱼放在烤架下烤十分钟。 |
| groom | groom | The groom arrived before the bride. | groom = 新郎；新郎比新娘先到。 |
| guard | guard | A guard checked our tickets at the gate. | guard = 警卫；一名警卫在门口检查了我们的票。 |
| guest | guest | Each guest received a small gift. | guest = 客人；每位客人都收到了一份小礼物。 |
| guidebook | guidebook | The guidebook lists cheap hotels. | guidebook = 旅行指南；这本旅行指南列出了便宜的酒店。 |
| guitar | guitar | He brought his guitar to the picnic. | guitar = 吉他；他把吉他带到了野餐。 |
| guitarist | guitarist | The guitarist played a slow song. | guitarist = 吉他手；吉他手弹了一首慢歌。 |
| gum | gum | She bought a packet of chewing gum. | gum = 口香糖；她买了一包口香糖。 |
| gun | gun | The museum displayed an old gun. | gun = 枪；博物馆展出了一把旧枪。 |
| guy | guy | The guy at the desk was very helpful. | guy = 家伙；桌边那个家伙很乐于助人。 |
| hair | hair | Her hair is short and curly. | hair = 头发；她的头发短而卷。 |
| haircut | haircut | He got a haircut before the interview. | haircut = 理发；他面试前理了发。 |
| hairdresser | hairdresser | The hairdresser cut my hair carefully. | hairdresser = 理发师；理发师仔细地给我剪头发。 |
| hairdryer | hairdryer | Use the hairdryer after your shower. | hairdryer = 吹风机；洗澡后用吹风机。 |
| handkerchief | handkerchief | He kept a clean handkerchief in his pocket. | handkerchief = 手帕；他口袋里放着一块干净的手帕。 |
| handlebars | handlebars | Hold the handlebars when you ride. | handlebars = 车把；骑车时握住车把。 |
| handwriting | handwriting | Your handwriting is easy to read. | handwriting = 笔迹；你的笔迹很容易读。 |
| harbour | harbour | Fishing boats filled the harbour. | harbour = 港口；渔船停满了港口。 |
| hardware | hardware | The shop sells computer hardware. | hardware = 硬件；这家商店出售电脑硬件。 |
| headache | headache | A bad headache made her lie down. | headache = 头痛；严重头痛让她躺了下来。 |
| headphones | headphones | Put on headphones before you listen. | headphones = 耳机；听之前戴上耳机。 |
| heat | heat | The heat from the fire warmed the room. | heat = 热量；火的热量让房间暖和起来。 |
| heater | heater | The heater stopped working last night. | heater = 暖气；暖气昨晚停止工作了。 |
| heating | heating | The heating comes on at six. | heating = 供暖；供暖六点开始。 |
| heel | heel | The heel of my shoe is broken. | heel = 鞋跟；我的鞋跟坏了。 |
| helicopter | helicopter | A helicopter landed near the hospital. | helicopter = 直升机；一架直升机降落在医院附近。 |
| helmet | helmet | Wear a helmet when you cycle. | helmet = 头盔；骑车时戴头盔。 |
| herb | herb | This herb smells like lemon. | herb = 香草；这种香草闻起来像柠檬。 |
| heroine | heroine | The heroine saves the village in the story. | heroine = 女主角；故事中的女主角拯救了村庄。 |
| hip hop | hip hop | Hip hop is popular with many teenagers. | hip hop = 嘻哈音乐；嘻哈音乐很受许多青少年欢迎。 |
| history | history | History was his favourite subject. | history = 历史；历史是他最喜欢的科目。 |
| hit | hit | The song became a hit last summer. | hit = 热门作品；这首歌去年夏天成了热门作品。 |
| hole | hole | There is a hole in my sock. | hole = 洞；我的袜子上有一个洞。 |
| homepage | homepage | The homepage has a search box. | homepage = 主页；主页上有一个搜索框。 |
| honey | honey | Add a spoonful of honey to the tea. | honey = 蜂蜜；往茶里加一勺蜂蜜。 |

- [ ] Create the ledger from all 50 rows.
- [ ] Promote every row with the normalized key used by `getWordExample()`.
- [ ] Run the targeted tests and verify all pass.
- [ ] Commit with `git commit -m "feat: add eighth reviewed objects examples"`.

### Task 3: Audit, Verify, And Integrate

**Files:**
- Modify if required: `scripts/audit-reviewed-pet-examples.ts`
- Regenerate: `src/lib/generated/pet-word-example-audit.ts`

- [ ] Run `npm run audit:examples` and inspect every flag against cached forward and back translations.
- [ ] Correct real mismatches in plan, ledger, and registry; manually confirm only valid contextual senses or synonyms with comments.
- [ ] Verify audit reports 1794 reviewed examples and 0 need review.
- [ ] Run `npm test` and verify all tests pass.
- [ ] Run `npm run build` and verify the production build succeeds.
- [ ] Commit with `git commit -m "test: audit eighth objects example batch"`.
- [ ] Push `main`, verify local and remote SHA match, verify coverage is 1799/3099 with objects at 454/972, and verify the production service returns HTTP 200.
