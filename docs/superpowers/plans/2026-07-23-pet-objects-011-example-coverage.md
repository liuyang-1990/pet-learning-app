# PET Objects 011 Example Batch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add reviewed PET/B1 examples for the eleventh 50 remaining objects-theme terms.

**Architecture:** Store approved content in `data/example-candidates/objects-011.json` and promote identical entries into `getReviewedWordExamples()`. Keep candidate data unimported by runtime code and verify ambiguous noun senses such as `model`, `net`, `network`, `news`, `notice`, `opening hours`, `operator`, `pants`, `parking lot`, and `pass`.

**Tech Stack:** Next.js 15, TypeScript, Vitest, Vite SSR loader, Google Translate audit script.

## Global Constraints

- Exactly 50 currently missing official objects-theme terms, from `middle` through `passenger` in remaining vocabulary order.
- Reviewed registry coverage rises from 1894 to 1944; accessible official rows rises from 1899 to 1949.
- Objects accessible coverage rises from 554/972 to 604/972.
- Candidate data remains unimported by application code.
- Every entry passes ledger alignment, intended-sense checks, bilingual audit, full tests, and production build.

---

### Task 1: Add Failing Coverage Tests

**Files:**
- Modify: `src/lib/pet-learning-app.test.ts`

- [ ] Add `objectsEleventhBatch` using the 50 table terms below.
- [ ] Require all selected terms to return reviewed sentences, registry count at least 1944, and objects coverage at least 604/972.
- [ ] Add candidate-ledger alignment and exact sense assertions.
- [ ] Run `npx vitest run src/lib/pet-learning-app.test.ts -t "eleventh objects"` and verify three failures because content is absent.
- [ ] Commit with `git commit -m "test: require eleventh objects example batch"`.

### Task 2: Create And Promote The Reviewed Entries

**Files:**
- Create: `data/example-candidates/objects-011.json`
- Modify: `src/lib/pet-learning-app.ts`

The ledger uses `batchId: objects-011`, `status: promoted`, and these exact entries:

| Term | Focus Word | Sentence | Chinese |
| --- | --- | --- | --- |
| middle | middle | Put the vase in the middle of the table. | middle = 中间；把花瓶放在桌子中间。 |
| midnight | midnight | The train arrived at midnight. | midnight = 午夜；火车午夜到达。 |
| milk | milk | Pour some milk into the glass. | milk = 牛奶；往杯子里倒些牛奶。 |
| millimetre | millimetre | The gap is only one millimetre wide. | millimetre = 毫米；这个缝隙只有一毫米宽。 |
| model | model | He built a model of a plane. | model = 模型；他做了一个飞机模型。 |
| monster | monster | The monster in the story lived in a cave. | monster = 怪物；故事里的怪物住在洞穴里。 |
| mosquito | mosquito | A mosquito bit my arm. | mosquito = 蚊子；一只蚊子咬了我的胳膊。 |
| moustache | moustache | His moustache made him look older. | moustache = 胡子；他的胡子让他看起来更老。 |
| mushroom | mushroom | Add mushrooms to the soup. | mushroom = 蘑菇；往汤里加蘑菇。 |
| musician | musician | The musician played outside the station. | musician = 音乐家；音乐家在车站外演奏。 |
| name | name | Write your name on the ticket. | name = 名字；把你的名字写在票上。 |
| nephew | nephew | My nephew is learning to swim. | nephew = 侄子；我的侄子正在学游泳。 |
| nest | nest | A bird built a nest in the tree. | nest = 巢；一只鸟在树上筑了巢。 |
| net | net | The ball hit the tennis net. | net = 网；球打到了网球网。 |
| network | network | The office network stopped working. | network = 网络；办公室网络停止工作了。 |
| news | news | The news about the storm worried us. | news = 新闻；关于暴风雨的新闻让我们担心。 |
| niece | niece | My niece drew a picture for me. | niece = 侄女；我的侄女给我画了一幅画。 |
| nightclub | nightclub | The nightclub opens at ten. | nightclub = 夜总会；夜总会十点开门。 |
| nightlife | nightlife | The city has exciting nightlife. | nightlife = 夜生活；这座城市有令人兴奋的夜生活。 |
| nightmare | nightmare | The nightmare woke him up. | nightmare = 噩梦；噩梦把他惊醒了。 |
| noise | noise | The noise from the road was loud. | noise = 噪音；路上传来的噪音很大。 |
| noon | noon | The meeting starts at noon. | noon = 中午；会议中午开始。 |
| notepaper | notepaper | She wrote the address on notepaper. | notepaper = 便条纸；她把地址写在便条纸上。 |
| notice | notice | A notice on the door said closed. | notice = 通知；门上的通知写着关闭。 |
| noticeboard | noticeboard | The timetable is on the noticeboard. | noticeboard = 公告板；时间表在公告板上。 |
| novelist | novelist | The novelist signed books after the talk. | novelist = 小说家；小说家在讲座后签书。 |
| officer | officer | A police officer helped us cross the road. | officer = 警官；一名警官帮我们过马路。 |
| olive | olive | Put one olive on each pizza. | olive = 橄榄；每个披萨上放一颗橄榄。 |
| omelette | omelette | She made an omelette for breakfast. | omelette = 煎蛋卷；她早餐做了一个煎蛋卷。 |
| onion | onion | Cut the onion into small pieces. | onion = 洋葱；把洋葱切成小块。 |
| opening hours | opening hours | Check the opening hours before you visit. | opening hours = 营业时间；参观前查看营业时间。 |
| opera | opera | We saw an opera at the theatre. | opera = 歌剧；我们在剧院看了一场歌剧。 |
| operator | operator | The telephone operator connected the call. | operator = 接线员；电话接线员接通了电话。 |
| opinion | opinion | Everyone gave an opinion about the plan. | opinion = 意见；每个人都对计划发表了意见。 |
| orchestra | orchestra | The orchestra played for two hours. | orchestra = 管弦乐队；管弦乐队演奏了两个小时。 |
| oven | oven | Put the bread in the oven. | oven = 烤箱；把面包放进烤箱。 |
| owner | owner | The owner of the shop was friendly. | owner = 主人；商店主人很友好。 |
| packet | packet | I bought a packet of biscuits. | packet = 包；我买了一包饼干。 |
| page | page | Turn to page twenty. | page = 页；翻到第二十页。 |
| painter | painter | The painter used bright colours. | painter = 画家；画家使用了明亮的颜色。 |
| palace | palace | The palace garden is open to visitors. | palace = 宫殿；宫殿花园向游客开放。 |
| pants | pants | These pants are too long for me. | pants = 裤子；这条裤子对我来说太长了。 |
| paragraph | paragraph | Read the first paragraph again. | paragraph = 段落；再读一遍第一段。 |
| parking | parking | Parking is free after six. | parking = 停车；六点后停车免费。 |
| parking lot | parking lot | The parking lot was full by noon. | parking lot = 停车场；停车场到中午就满了。 |
| parrot | parrot | The parrot repeated my words. | parrot = 鹦鹉；鹦鹉重复了我的话。 |
| part | part | This small part belongs to the machine. | part = 零件；这个小零件属于那台机器。 |
| partner | partner | My project partner sent the slides. | partner = 搭档；我的项目搭档发来了幻灯片。 |
| pass | pass | You need a pass to enter the building. | pass = 通行证；进入这栋楼需要通行证。 |
| passenger | passenger | Each passenger showed a ticket. | passenger = 乘客；每位乘客都出示了票。 |

- [ ] Create the ledger from all 50 rows.
- [ ] Promote every row with the normalized key used by `getWordExample()`.
- [ ] Run the targeted tests and verify all pass.
- [ ] Commit with `git commit -m "feat: add eleventh reviewed objects examples"`.

### Task 3: Audit, Verify, And Integrate

**Files:**
- Modify if required: `scripts/audit-reviewed-pet-examples.ts`
- Regenerate: `src/lib/generated/pet-word-example-audit.ts`

- [ ] Run `npm run audit:examples` and inspect every flag against cached forward and back translations.
- [ ] Correct real mismatches in plan, ledger, and registry; manually confirm only valid contextual senses or synonyms with comments.
- [ ] Verify audit reports 1944 reviewed examples and 0 need review.
- [ ] Run `npm test` and verify all tests pass.
- [ ] Run `npm run build` and verify the production build succeeds.
- [ ] Commit with `git commit -m "test: audit eleventh objects example batch"`.
- [ ] Push `main`, verify local and remote SHA match, verify coverage is 1949/3099 with objects at 604/972, and verify the production service returns HTTP 200.
