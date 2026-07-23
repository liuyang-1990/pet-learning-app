# PET Objects 012 Example Batch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add reviewed PET/B1 examples for the twelfth 50 remaining objects-theme terms.

**Architecture:** Store approved content in `data/example-candidates/objects-012.json` and promote identical entries into `getReviewedWordExamples()`. Keep candidate data unimported by runtime code and verify ambiguous noun senses such as `period`, `pet`, `photo`, `photograph`, `piece`, `pin`, `pitch`, `play`, `plot`, `port`, and `post`.

**Tech Stack:** Next.js 15, TypeScript, Vitest, Vite SSR loader, Google Translate audit script.

## Global Constraints

- Exactly 50 currently missing official objects-theme terms, from `pasta` through `post` in remaining vocabulary order.
- Reviewed registry coverage rises from 1944 to 1994; accessible official rows rises from 1949 to 1999.
- Objects accessible coverage rises from 604/972 to 654/972.
- Candidate data remains unimported by application code.
- Every entry passes ledger alignment, intended-sense checks, bilingual audit, full tests, and production build.

---

### Task 1: Add Failing Coverage Tests

**Files:**
- Modify: `src/lib/pet-learning-app.test.ts`

- [ ] Add `objectsTwelfthBatch` using the 50 table terms below.
- [ ] Require all selected terms to return reviewed sentences, registry count at least 1994, and objects coverage at least 654/972.
- [ ] Add candidate-ledger alignment and exact sense assertions.
- [ ] Run `npx vitest run src/lib/pet-learning-app.test.ts -t "twelfth objects"` and verify three failures because content is absent.
- [ ] Commit with `git commit -m "test: require twelfth objects example batch"`.

### Task 2: Create And Promote The Reviewed Entries

**Files:**
- Create: `data/example-candidates/objects-012.json`
- Modify: `src/lib/pet-learning-app.ts`

The ledger uses `batchId: objects-012`, `status: promoted`, and these exact entries:

| Term | Focus Word | Sentence | Chinese |
| --- | --- | --- | --- |
| pasta | pasta | I cooked pasta for dinner. | pasta = 意大利面；我晚饭做了意大利面。 |
| path | path | Follow the path through the park. | path = 小路；沿着小路穿过公园。 |
| pattern | pattern | This shirt has a flower pattern. | pattern = 图案；这件衬衫有花朵图案。 |
| pea | pea | A pea rolled off the plate. | pea = 豌豆；一颗豌豆从盘子上滚了下来。 |
| peach | peach | The peach was soft and sweet. | peach = 桃子；这个桃子又软又甜。 |
| peak | peak | Snow covered the mountain peak. | peak = 山峰；雪覆盖了山峰。 |
| peanut | peanut | He ate a peanut before lunch. | peanut = 花生；他午饭前吃了一颗花生。 |
| pear | pear | She packed a pear in her lunchbox. | pear = 梨；她在午餐盒里装了一个梨。 |
| pedestrian | pedestrian | The pedestrian waited at the crossing. | pedestrian = 行人；行人在人行横道旁等待。 |
| pen | pen | Use a black pen for the form. | pen = 钢笔；用黑色钢笔填写表格。 |
| penfriend | penfriend | My penfriend lives in Canada. | penfriend = 笔友；我的笔友住在加拿大。 |
| penny | penny | I found a penny on the floor. | penny = 便士；我在地板上找到了一枚便士。 |
| pepper | pepper | Add pepper to the soup. | pepper = 胡椒；往汤里加胡椒。 |
| performer | performer | The performer bowed after the song. | performer = 表演者；表演者唱完歌后鞠躬。 |
| perfume | perfume | Her perfume smelled like roses. | perfume = 香水；她的香水闻起来像玫瑰。 |
| period | period | The first period starts at nine. | period = 课时；第一节课九点开始。 |
| permission | permission | We need permission to use the hall. | permission = 许可；我们需要许可才能使用大厅。 |
| pet | pet | My pet sleeps beside my bed. | pet = 宠物；我的宠物睡在我的床边。 |
| petrol | petrol | The car needs more petrol. | petrol = 汽油；汽车需要更多汽油。 |
| pharmacy | pharmacy | The pharmacy closes at six. | pharmacy = 药房；药房六点关门。 |
| photo | photo | I took a photo of the river. | photo = 照片；我拍了一张河流的照片。 |
| photocopy | photocopy | Make a photocopy of your passport. | photocopy = 复印件；复印一份你的护照。 |
| photograph | photograph | The photograph shows my old school. | photograph = 照片；这张照片展示了我的旧学校。 |
| photographer | photographer | The photographer waited for the sunset. | photographer = 摄影师；摄影师等待日落。 |
| photography | photography | Photography is her favourite hobby. | photography = 摄影；摄影是她最喜欢的爱好。 |
| phrase | phrase | Learn this useful phrase for travel. | phrase = 短语；学习这个旅行中有用的短语。 |
| physics | physics | Physics explains how light travels. | physics = 物理；物理解释光如何传播。 |
| piano | piano | The piano needs tuning. | piano = 钢琴；这架钢琴需要调音。 |
| picnic | picnic | We had a picnic beside the lake. | picnic = 野餐；我们在湖边野餐。 |
| pie | pie | Apple pie is my favourite dessert. | pie = 馅饼；苹果馅饼是我最喜欢的甜点。 |
| piece | piece | Take one piece of cake. | piece = 块；拿一块蛋糕。 |
| pig | pig | A pig slept in the shade. | pig = 猪；一头猪在阴凉处睡觉。 |
| pile | pile | A pile of books was on the desk. | pile = 一堆；桌上有一堆书。 |
| pill | pill | Take one pill after breakfast. | pill = 药片；早餐后吃一片药。 |
| pillow | pillow | The pillow was soft and clean. | pillow = 枕头；枕头又软又干净。 |
| pin | pin | Use a pin to hold the note on the board. | pin = 图钉；用图钉把便条固定在板上。 |
| pineapple | pineapple | Cut the pineapple into rings. | pineapple = 菠萝；把菠萝切成圆片。 |
| pipe | pipe | Water came from the broken pipe. | pipe = 管道；水从破裂的管道里流出来。 |
| pirate | pirate | The pirate found a box of gold. | pirate = 海盗；海盗发现了一箱金子。 |
| pitch | pitch | The football pitch was wet after the rain. | pitch = 球场；雨后足球场很湿。 |
| play | play | The school play starts tonight. | play = 戏剧；学校戏剧今晚开始。 |
| pleasure | pleasure | It was a pleasure to meet your family. | pleasure = 荣幸；认识你的家人是一件荣幸的事。 |
| plot | plot | The plot of the film was simple. | plot = 情节；这部电影的情节很简单。 |
| plug | plug | Put the plug into the wall socket. | plug = 插头；把插头插进墙上的插座。 |
| pocket | pocket | I put the key in my pocket. | pocket = 口袋；我把钥匙放进口袋。 |
| podcast | podcast | I listened to a podcast on the bus. | podcast = 播客；我在公交车上听了一个播客。 |
| poet | poet | The poet read a poem to the class. | poet = 诗人；诗人给全班朗读了一首诗。 |
| poetry | poetry | Poetry can express strong feelings. | poetry = 诗歌；诗歌能表达强烈的感情。 |
| port | port | The ship left the port at dawn. | port = 港口；船在黎明时离开港口。 |
| post | post | The morning post brought two letters. | post = 邮件；早上的邮件送来了两封信。 |

- [ ] Create the ledger from all 50 rows.
- [ ] Promote every row with the normalized key used by `getWordExample()`.
- [ ] Run the targeted tests and verify all pass.
- [ ] Commit with `git commit -m "feat: add twelfth reviewed objects examples"`.

### Task 3: Audit, Verify, And Integrate

**Files:**
- Modify if required: `scripts/audit-reviewed-pet-examples.ts`
- Regenerate: `src/lib/generated/pet-word-example-audit.ts`

- [ ] Run `npm run audit:examples` and inspect every flag against cached forward and back translations.
- [ ] Correct real mismatches in plan, ledger, and registry; manually confirm only valid contextual senses or synonyms with comments.
- [ ] Verify audit reports 1994 reviewed examples and 0 need review.
- [ ] Run `npm test` and verify all tests pass.
- [ ] Run `npm run build` and verify the production build succeeds.
- [ ] Commit with `git commit -m "test: audit twelfth objects example batch"`.
- [ ] Push `main`, verify local and remote SHA match, verify coverage is 1999/3099 with objects at 654/972, and verify the production service returns HTTP 200.
