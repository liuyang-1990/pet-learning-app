# PET Grammar 005 Example Batch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 50 reviewed PET/B1 examples for the next grammar-theme cluster.

**Architecture:** Store approved content in `data/example-candidates/grammar-005.json` and promote identical entries into `getReviewedWordExamples()`. Keep candidate data unimported by runtime code and verify coverage, ledger alignment, intended senses, bilingual quality, tests, and production build.

**Tech Stack:** Next.js 15, TypeScript, Vitest, Vite Node, Google Translate audit script.

## Global Constraints

- Exactly 50 currently missing official grammar terms, from `neither` through `please` in remaining vocabulary order.
- Reviewed registry coverage rises from 1235 to 1285; accessible official rows rise from 1240 to 1290.
- Grammar accessible coverage rises from 179/338 to 229/338.
- Candidate data remains unimported by application code.
- Every entry passes ledger alignment, intended-sense checks, bilingual audit, full tests, and production build.

---

### Task 1: Add Failing Coverage Tests

**Files:**
- Modify: `src/lib/pet-learning-app.test.ts`

- [ ] Add `grammarFifthBatch` using the 50 table terms below.
- [ ] Require all selected terms to return reviewed sentences, registry count at least 1285, and grammar coverage at least 229/338.
- [ ] Add candidate-ledger alignment and exact sense assertions.
- [ ] Run `npx vitest run src/lib/pet-learning-app.test.ts -t "fifth grammar"` and verify three failures because content is absent.
- [ ] Commit with `git commit -m "test: require fifth grammar example batch"`.

### Task 2: Create And Promote The Reviewed Entries

**Files:**
- Create: `data/example-candidates/grammar-005.json`
- Modify: `src/lib/pet-learning-app.ts`

The ledger uses `batchId: grammar-005`, `status: promoted`, and these exact entries:

| Term | Focus Word | Sentence | Chinese |
| --- | --- | --- | --- |
| neither | neither | Neither answer is correct. | neither = 两个都不；两个答案都不正确。 |
| never | never | I have never tried skiing. | never = 从未；我从未尝试过滑雪。 |
| next to | next to | The pharmacy is next to the bank. | next to = 在...旁边；药店在银行旁边。 |
| no | no | There is no milk left in the fridge. | no = 没有；冰箱里没有牛奶了。 |
| nobody | nobody | Nobody knew the answer. | nobody = 没有人；没有人知道答案。 |
| none | none | None of these keys opens the door. | none = 一个也没有；这些钥匙一个也打不开门。 |
| normally | normally | I normally get home before six. | normally = 通常；我通常六点前到家。 |
| not | not | This seat is not available. | not = 不；这个座位不能使用。 |
| nothing | nothing | There is nothing in the box. | nothing = 什么都没有；盒子里什么都没有。 |
| now | now | I am busy now. | now = 现在；我现在很忙。 |
| nowadays | nowadays | Nowadays, many people work from home. | nowadays = 如今；如今许多人在家工作。 |
| nowhere | nowhere | We had nowhere to sit. | nowhere = 没有地方；我们没有地方坐。 |
| obviously | obviously | Obviously, you need a ticket to enter. | obviously = 显然；显然，你需要门票才能进入。 |
| occasionally | occasionally | We occasionally eat at that restaurant. | occasionally = 偶尔；我们偶尔在那家餐馆吃饭。 |
| o’clock | o'clock | The lesson starts at eight o'clock. | o'clock = 点钟；课程八点开始。 |
| of | of | I would like a cup of tea. | of = ...的；我想喝一杯茶。 |
| off | off | Please turn off the lights. | off = 关闭；请关灯。 |
| often | often | We often play tennis after school. | often = 经常；我们经常放学后打网球。 |
| oh | oh | Oh, I forgot my keys! | oh = 哦；哦，我忘带钥匙了！ |
| oh dear | oh dear | Oh dear, we have missed the last train. | oh dear = 哎呀；哎呀，我们错过末班火车了。 |
| on | on | The book is on the table. | on = 在...上；书在桌子上。 |
| on board | on board | All the passengers are now on board. | on board = 在车船飞机上；所有乘客现在都已登乘。 |
| once | once | I go swimming once a week. | once = 一次；我每周游泳一次。 |
| one | one | I need one more ticket. | one = 一个；我还需要一张票。 |
| on fire | on fire | The old building was on fire. | on fire = 着火；那栋旧楼着火了。 |
| only | only | Only members can use the gym. | only = 只有；只有会员可以使用健身房。 |
| on purpose | on purpose | He broke the cup on purpose. | on purpose = 故意；他故意打破了杯子。 |
| on request | on request | Extra towels are available on request. | on request = 应要求；如有需要可以提供额外毛巾。 |
| onto | onto | The cat jumped onto the table. | onto = 到...上；猫跳到了桌子上。 |
| or | or | Would you like tea or coffee? | or = 或者；你想要茶还是咖啡？ |
| other | other | Where is the other shoe? | other = 另一个；另一只鞋在哪里？ |
| otherwise | otherwise | Leave now, otherwise you will miss the bus. | otherwise = 否则；现在就走，否则你会错过公交车。 |
| ought | ought | You ought to apologise to her. | ought = 应该；你应该向她道歉。 |
| our | our | Our classroom is on the second floor. | our = 我们的；我们的教室在二楼。 |
| ours | ours | The blue tent is ours. | ours = 我们的；蓝色帐篷是我们的。 |
| ourselves | ourselves | We painted the room ourselves. | ourselves = 我们亲自；我们亲自粉刷了房间。 |
| out | out | She went out after dinner. | out = 出去；她晚饭后出去了。 |
| outdoors | outdoors | The children spent the afternoon outdoors. | outdoors = 在户外；孩子们在户外度过了下午。 |
| out of | out of | He took a notebook out of his bag. | out of = 从...里面；他从包里拿出一本笔记本。 |
| out of date | out of date | This travel guide is out of date. | out of date = 过时的；这本旅行指南已经过时了。 |
| over | over | The lesson is over at four o'clock. | over = 结束；课程四点结束。 |
| own | own | I have my own room. | own = 自己的；我有自己的房间。 |
| pardon | pardon | Pardon me, could you repeat that? | pardon = 请原谅；请原谅，你能再说一遍吗？ |
| partly | partly | The path was partly covered by snow. | partly = 部分地；小路部分被雪覆盖。 |
| particularly | particularly | I particularly enjoyed the final song. | particularly = 尤其；我尤其喜欢最后一首歌。 |
| per | per | Tickets cost twelve pounds per person. | per = 每；票价为每人十二英镑。 |
| perfectly | perfectly | I can hear you perfectly. | perfectly = 完全地；我能完全听清你说话。 |
| perhaps | perhaps | Perhaps we should ask the teacher. | perhaps = 也许；也许我们应该问问老师。 |
| personally | personally | I personally prefer the earlier train. | personally = 就个人而言；就个人而言，我更喜欢较早的火车。 |
| please | please | Please close the window. | please = 请；请关上窗户。 |

- [ ] Create the ledger from all 50 rows.
- [ ] Promote every row with the normalized key used by `getWordExample()`.
- [ ] Run the targeted tests and verify all pass.
- [ ] Commit with `git commit -m "feat: add fifth reviewed grammar examples"`.

### Task 3: Audit, Verify, And Integrate

**Files:**
- Modify if required: `scripts/audit-reviewed-pet-examples.ts`
- Regenerate: `src/lib/generated/pet-word-example-audit.ts`

- [ ] Run `npm run audit:examples` and inspect every flag against cached forward and back translations.
- [ ] Correct real mismatches in plan, ledger, and registry; manually confirm only valid contextual senses or synonyms with comments.
- [ ] Verify audit reports 1285 reviewed examples and 0 need review.
- [ ] Run `npm test` and verify 100 tests pass.
- [ ] Run `npm run build` and verify the production build succeeds.
- [ ] Commit with `git commit -m "test: audit fifth grammar example batch"`.
- [ ] Push `main`, verify local and remote SHA match, verify coverage is 1290/3099 with grammar at 229/338, and verify the production service returns HTTP 200.
