# PET Grammar 006 Example Batch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 50 reviewed PET/B1 examples for the next grammar-theme cluster.

**Architecture:** Store approved content in `data/example-candidates/grammar-006.json` and promote identical entries into `getReviewedWordExamples()`. Keep candidate data unimported by runtime code and verify coverage, ledger alignment, intended senses, bilingual quality, tests, and production build.

**Tech Stack:** Next.js 15, TypeScript, Vitest, Vite Node, Google Translate audit script.

## Global Constraints

- Exactly 50 currently missing official grammar terms, from `plenty` through `therefore` in remaining vocabulary order.
- Reviewed registry coverage rises from 1285 to 1335; accessible official rows rise from 1290 to 1340.
- Grammar accessible coverage rises from 229/338 to 279/338.
- Candidate data remains unimported by application code.
- Every entry passes ledger alignment, intended-sense checks, bilingual audit, full tests, and production build.

---

### Task 1: Add Failing Coverage Tests

**Files:**
- Modify: `src/lib/pet-learning-app.test.ts`

- [ ] Add `grammarSixthBatch` using the 50 table terms below.
- [ ] Require all selected terms to return reviewed sentences, registry count at least 1335, and grammar coverage at least 279/338.
- [ ] Add candidate-ledger alignment and exact sense assertions.
- [ ] Run `npx vitest run src/lib/pet-learning-app.test.ts -t "sixth grammar"` and verify three failures because content is absent.
- [ ] Commit with `git commit -m "test: require sixth grammar example batch"`.

### Task 2: Create And Promote The Reviewed Entries

**Files:**
- Create: `data/example-candidates/grammar-006.json`
- Modify: `src/lib/pet-learning-app.ts`

The ledger uses `batchId: grammar-006`, `status: promoted`, and these exact entries:

| Term | Focus Word | Sentence | Chinese |
| --- | --- | --- | --- |
| plenty | plenty | We have plenty of time before the train leaves. | plenty = 充足；火车出发前我们有充足的时间。 |
| plus | plus | Two plus three equals five. | plus = 加；二加三等于五。 |
| p.m | p.m | The library closes at six p.m. | p.m = 下午；图书馆下午六点关门。 |
| possibly | possibly | We could possibly finish the work today. | possibly = 可能；我们可能今天完成这项工作。 |
| previously | previously | This shop was previously a bank. | previously = 以前；这家商店以前是一家银行。 |
| probably | probably | It will probably rain tomorrow. | probably = 很可能；明天很可能会下雨。 |
| properly | properly | Make sure the door is closed properly. | properly = 正确地；确保门已正确关好。 |
| quickly | quickly | She finished her breakfast quickly. | quickly = 很快地；她很快吃完了早餐。 |
| quietly | quietly | Please speak quietly in the library. | quietly = 轻声地；请在图书馆里轻声说话。 |
| quite | quite | The film was quite interesting. | quite = 相当；这部电影相当有趣。 |
| rarely | rarely | We rarely eat fast food. | rarely = 很少；我们很少吃快餐。 |
| rather | rather | The room is rather small. | rather = 相当；这个房间相当小。 |
| really | really | I really enjoyed the concert. | really = 真的；我真的很喜欢这场音乐会。 |
| reasonably | reasonably | The hotel is reasonably priced. | reasonably = 合理地；这家酒店定价合理。 |
| regarding | regarding | I am writing regarding your course. | regarding = 关于；我写信是想咨询你们的课程。 |
| regularly | regularly | I exercise regularly after work. | regularly = 定期地；我下班后定期锻炼。 |
| safely | safely | We arrived home safely. | safely = 安全地；我们安全到家了。 |
| seriously | seriously | You should take this warning seriously. | seriously = 认真地；你应该认真对待这个警告。 |
| several | several | Several students joined the club. | several = 几个；几个学生加入了俱乐部。 |
| shall | shall | Shall we meet outside the cinema? | shall = 要不要；我们要不要在电影院外见面？ |
| she | she | She is waiting at the bus stop. | she = 她；她正在公交车站等候。 |
| shortly | shortly | The train will arrive shortly. | shortly = 不久；火车很快就会到达。 |
| should | should | You should drink more water. | should = 应该；你应该多喝水。 |
| since | since | I have lived here since 2022. | since = 自从；我从2022年起就住在这里。 |
| sincerely | sincerely | I sincerely hope you can come. | sincerely = 真诚地；我真诚地希望你能来。 |
| slightly | slightly | This bag is slightly heavier than mine. | slightly = 稍微；这个包比我的稍微重一点。 |
| slowly | slowly | Please drive slowly near the school. | slowly = 慢慢地；请在学校附近慢慢开车。 |
| so | so | It was late, so we took a taxi. | so = 所以；天晚了，所以我们乘了出租车。 |
| some | some | Would you like some cake? | some = 一些；你想吃一些蛋糕吗？ |
| somebody | somebody | Somebody left a bag on the bus. | somebody = 有人；有人把包落在公交车上了。 |
| somehow | somehow | We somehow found the right path. | somehow = 不知怎么地；我们不知怎么地找到了正确的小路。 |
| someone | someone | Someone is waiting for you outside. | someone = 有人；有人在外面等你。 |
| sometimes | sometimes | I sometimes walk to school. | sometimes = 有时；我有时步行去学校。 |
| somewhere | somewhere | Let us find somewhere quiet to study. | somewhere = 某个地方；我们找个安静的地方学习吧。 |
| specially | specially | This cake was specially made for you. | specially = 特意地；这个蛋糕是特意为你做的。 |
| still | still | It is still raining outside. | still = 仍然；外面仍然在下雨。 |
| such | such | It was such a beautiful day. | such = 如此；那是如此美好的一天。 |
| suddenly | suddenly | The lights suddenly went out. | suddenly = 突然；灯突然熄灭了。 |
| terribly | terribly | I am terribly sorry about the mistake. | terribly = 非常；对于这个错误我非常抱歉。 |
| than | than | My sister is taller than me. | than = 比；我姐姐比我高。 |
| thanks | thanks | Thanks for helping me. | thanks = 谢谢；谢谢你帮助我。 |
| that | that | That house belongs to my uncle. | that = 那个；那栋房子是我叔叔的。 |
| the | the | Please close the door. | the = 定冠词；请关上门。 |
| their | their | The students put their bags under the desks. | their = 他们的；学生们把他们的包放在课桌下面。 |
| theirs | theirs | The bicycles by the gate are theirs. | theirs = 他们的；门边的自行车是他们的。 |
| them | them | I saw them at the station. | them = 他们；我在车站看见了他们。 |
| themselves | themselves | They made the costumes themselves. | themselves = 他们亲自；他们亲自制作了服装。 |
| then | then | Finish your homework, then you can play. | then = 然后；完成家庭作业，然后你就可以玩了。 |
| there | there | Put the box over there. | there = 那里；把箱子放到那里。 |
| therefore | therefore | The road was closed; therefore, we took another route. | therefore = 因此；道路封闭了，因此我们走了另一条路线。 |

- [ ] Create the ledger from all 50 rows.
- [ ] Promote every row with the normalized key used by `getWordExample()`.
- [ ] Run the targeted tests and verify all pass.
- [ ] Commit with `git commit -m "feat: add sixth reviewed grammar examples"`.

### Task 3: Audit, Verify, And Integrate

**Files:**
- Modify if required: `scripts/audit-reviewed-pet-examples.ts`
- Regenerate: `src/lib/generated/pet-word-example-audit.ts`

- [ ] Run `npm run audit:examples` and inspect every flag against cached forward and back translations.
- [ ] Correct real mismatches in plan, ledger, and registry; manually confirm only valid contextual senses or synonyms with comments.
- [ ] Verify audit reports 1335 reviewed examples and 0 need review.
- [ ] Run `npm test` and verify 103 tests pass.
- [ ] Run `npm run build` and verify the production build succeeds.
- [ ] Commit with `git commit -m "test: audit sixth grammar example batch"`.
- [ ] Push `main`, verify local and remote SHA match, verify coverage is 1340/3099 with grammar at 279/338, and verify the production service returns HTTP 200.
