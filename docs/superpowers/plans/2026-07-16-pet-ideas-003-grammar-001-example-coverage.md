# PET Ideas 003 And Grammar 001 Example Batch Implementation Plan

**Goal:** Add 50 reviewed PET/B1 examples, completing the ideas theme and starting the grammar theme.

**Architecture:** Store approved content in `data/example-candidates/ideas-003-grammar-001.json` and promote identical entries into `getReviewedWordExamples()`. Keep candidate data unimported by runtime code and verify coverage, ledger alignment, intended senses, bilingual quality, tests, and production build.

**Tech Stack:** Next.js 15, TypeScript, Vitest, Vite Node, Google Translate audit script.

## Global Constraints

- Exactly 50 currently missing official terms: all 25 remaining ideas terms and the first 25 remaining grammar terms.
- Reviewed registry coverage rises from 1035 to 1085; accessible official rows rise from 1040 to 1090.
- Ideas reaches 133/133; grammar reaches 29/338.
- Candidate data remains unimported by application code.
- Every entry passes ledger alignment, intended-sense checks, bilingual audit, full tests, and production build.

---

### Task 1: Add Failing Coverage Tests

**Files:**
- Modify: `src/lib/pet-learning-app.test.ts`

- [ ] Add `ideasGrammarBatch` using the 50 table terms below.
- [ ] Require all selected terms to return reviewed sentences, registry count at least 1085, complete ideas coverage, and grammar coverage at least 25.
- [ ] Add candidate-ledger alignment and exact sense assertions.
- [ ] Run the targeted tests and verify failure because content is absent.
- [ ] Commit with `git commit -m "test: require ideas grammar example batch"`.

### Task 2: Create And Promote The Reviewed Entries

**Files:**
- Create: `data/example-candidates/ideas-003-grammar-001.json`
- Modify: `src/lib/pet-learning-app.ts`

The ledger uses `batchId: ideas-003-grammar-001`, `status: promoted`, and these exact entries:

| Term | Focus Word | Sentence | Chinese |
| --- | --- | --- | --- |
| quantity | quantity | Use only a small quantity of salt in the soup. | quantity = 数量；这道汤里只放少量盐。 |
| questionnaire | questionnaire | Please complete the questionnaire after the course. | questionnaire = 问卷；课程结束后请完成这份问卷。 |
| reality | reality | Her dream of becoming a pilot became a reality. | reality = 现实；她成为飞行员的梦想变成了现实。 |
| reception | reception | Ask for the key at reception when you arrive. | reception = 接待处；到达时请去接待处领取钥匙。 |
| receptionist | receptionist | The receptionist booked a taxi for us. | receptionist = 接待员；接待员为我们预订了一辆出租车。 |
| refreshments | refreshments | Light refreshments will be served after the meeting. | refreshments = 茶点；会议结束后将提供简单茶点。 |
| registration | registration | Online registration closes on Friday. | registration = 注册；网上注册将于星期五截止。 |
| relation | relation | The report explains the relation between exercise and sleep. | relation = 关系；这份报告解释了运动与睡眠之间的关系。 |
| relaxation | relaxation | I listen to quiet music for relaxation. | relaxation = 放松；我听轻柔的音乐来放松。 |
| result | result | The test result will arrive by email. | result = 结果；考试结果将通过电子邮件发送。 |
| retirement | retirement | My grandfather plans to travel after retirement. | retirement = 退休；我祖父计划退休后去旅行。 |
| romance | romance | The film is a romance set in Paris. | romance = 爱情故事；这部电影是一个以巴黎为背景的爱情故事。 |
| science fiction | science fiction | My brother enjoys science fiction about life on other planets. | science fiction = 科幻小说；我弟弟喜欢关于其他星球生命的科幻小说。 |
| secret | secret | Can you keep this plan a secret? | secret = 秘密；你能对这个计划保密吗？ |
| section | section | Read the final section of the article. | section = 部分；阅读这篇文章的最后一部分。 |
| security | security | The hotel has good security at night. | security = 安保措施；这家酒店夜间的安保措施很好。 |
| security guard | security guard | The security guard showed us the emergency exit. | security guard = 保安；保安向我们指出了紧急出口。 |
| silence | silence | There was complete silence during the exam. | silence = 安静；考试期间一片安静。 |
| situation | situation | We stayed calm in a difficult situation. | situation = 情况；我们在困难的情况下保持冷静。 |
| solution | solution | We found a simple solution to the problem. | solution = 解决办法；我们找到了这个问题的简单解决办法。 |
| spaceship | spaceship | The spaceship landed safely on the moon. | spaceship = 宇宙飞船；宇宙飞船安全降落在月球上。 |
| suggestion | suggestion | Ella made a useful suggestion for the school trip. | suggestion = 建议；埃拉为学校旅行提出了一条有用的建议。 |
| tournament | tournament | Our school is hosting a chess tournament. | tournament = 锦标赛；我们学校正在举办国际象棋锦标赛。 |
| translation | translation | I read an English translation of the novel. | translation = 译本；我读了这部小说的英文译本。 |
| unemployment | unemployment | The new jobs helped reduce unemployment in the town. | unemployment = 失业；这些新工作帮助减少了镇上的失业现象。 |
| a / an | a / an | I saw a dog and an elephant at the zoo. | a / an = 一个；我在动物园看到一只狗和一头大象。 |
| about | about | We talked about our plans for the weekend. | about = 关于；我们谈了周末的计划。 |
| above | above | The clock hangs above the classroom door. | above = 在上方；时钟挂在教室门的上方。 |
| absolutely | absolutely | You are absolutely right about the answer. | absolutely = 完全地；你的答案完全正确。 |
| according to | according to | According to the timetable, the train leaves at nine. | according to = 根据；根据时间表，火车九点出发。 |
| across | across | We walked across the bridge to the station. | across = 穿过；我们穿过桥走到车站。 |
| actually | actually | I thought the cafe was closed, but it is actually open. | actually = 实际上；我以为咖啡馆关门了，但它实际上还开着。 |
| after | after | We went for a walk after dinner. | after = 在...之后；晚饭后我们去散步了。 |
| again | again | Could you say that again, please? | again = 再一次；请问你能再说一次吗？ |
| against | against | Do not lean your bicycle against the window. | against = 倚靠；不要把自行车靠在窗户上。 |
| ago | ago | We moved here three years ago. | ago = 以前；我们三年前搬到这里。 |
| ahead | ahead | Go straight ahead and turn left at the bank. | ahead = 向前；一直向前走，在银行处左转。 |
| alike | alike | The twins look alike, but they have different interests. | alike = 相像；这对双胞胎看起来很像，但兴趣不同。 |
| all | all | All the students finished the test on time. | all = 所有的；所有学生都按时完成了考试。 |
| almost | almost | It is almost time to leave. | almost = 几乎；差不多该离开了。 |
| alone | alone | I do not like walking home alone at night. | alone = 独自；我不喜欢夜里独自走回家。 |
| along | along | We cycled along the river. | along = 沿着；我们沿着河骑自行车。 |
| aloud | aloud | Please read the first paragraph aloud. | aloud = 出声地；请出声朗读第一段。 |
| already | already | I have already finished my homework. | already = 已经；我已经完成家庭作业了。 |
| also | also | The hotel has a pool and also offers free breakfast. | also = 也；这家酒店有游泳池，也提供免费早餐。 |
| although | although | Although it was raining, we continued the match. | although = 虽然；虽然下着雨，我们还是继续了比赛。 |
| altogether | altogether | There were twelve students altogether. | altogether = 总共；总共有十二名学生。 |
| always | always | My bus always arrives at eight. | always = 总是；我的公交车总是在八点到达。 |
| a.m | a.m | The museum opens at nine a.m. | a.m = 上午；博物馆上午九点开放。 |
| among | among | We found a quiet place among the trees. | among = 在...之中；我们在树林中找到了一个安静的地方。 |

- [ ] Create the ledger from all 50 rows.
- [ ] Promote every row with the normalized key used by `getWordExample()`.
- [ ] Run the targeted tests and verify all pass.
- [ ] Commit with `git commit -m "feat: add reviewed ideas grammar examples"`.

### Task 3: Audit, Verify, And Integrate

**Files:**
- Modify if required: `scripts/audit-reviewed-pet-examples.ts`
- Regenerate: `src/lib/generated/pet-word-example-audit.ts`

- [ ] Copy the root translation cache into the worktree before the first audit.
- [ ] Run `npm run audit:examples` and inspect every flag.
- [ ] Correct real mismatches in plan, ledger, and registry; manually confirm only valid contextual senses or synonyms with comments.
- [ ] Verify audit reports 1085 reviewed examples and 0 need review.
- [ ] Run `npm test` and `npm run build`.
- [ ] Commit with `git commit -m "test: audit ideas grammar example batch"`.
- [ ] Merge cache back to root, merge into `main`, clean the worktree, rerun tests, push, and verify service health.
