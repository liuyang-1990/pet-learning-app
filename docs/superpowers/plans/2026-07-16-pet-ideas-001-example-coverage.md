# PET Ideas 001 Example Batch Implementation Plan

**Goal:** Add 50 reviewed PET/B1 examples for the first remaining ideas-theme cluster.

**Architecture:** Store approved content in `data/example-candidates/ideas-001.json` and promote identical entries into `getReviewedWordExamples()`. Keep candidate data unimported by runtime code and verify every promoted entry through tests and the bilingual audit.

**Tech Stack:** Next.js 15, TypeScript, Vitest, Vite Node, Google Translate audit script.

## Global Constraints

- Exactly 50 currently missing official terms, from `accommodation` through `experience` in the remaining ideas-theme order.
- Reviewed registry coverage rises from 935 to 985; accessible official rows rise from 940 to 990.
- Candidate data remains unimported by application code.
- Every entry passes ledger alignment, intended-sense checks, bilingual audit, full tests, and production build.

---

### Task 1: Add Failing Coverage Tests

**Files:**
- Modify: `src/lib/pet-learning-app.test.ts`

- [ ] Add `ideasFirstBatch` using the 50 table terms below.
- [ ] Require all selected terms to return reviewed sentences and registry count to reach at least 985.
- [ ] Assert ideas-theme accessible coverage increases to 58 of 133 rows.
- [ ] Add ledger alignment and exact sense assertions for ambiguous terms.
- [ ] Run the targeted tests and verify they fail because content is absent.
- [ ] Commit with `git commit -m "test: require first ideas example batch"`.

### Task 2: Create And Promote The Reviewed Entries

**Files:**
- Create: `data/example-candidates/ideas-001.json`
- Modify: `src/lib/pet-learning-app.ts`

The ledger uses `batchId: ideas-001`, `status: promoted`, and these exact entries:

| Term | Focus Word | Sentence | Chinese |
| --- | --- | --- | --- |
| accommodation | accommodation | Our hotel provides comfortable accommodation near the beach. | accommodation = 住宿；我们的酒店在海滩附近提供舒适的住宿。 |
| achievement | achievement | Finishing the race was a great achievement for Mia. | achievement = 成就；完成比赛对米娅来说是一项很大的成就。 |
| action | action | The school took action to reduce plastic waste. | action = 行动；学校采取行动减少塑料垃圾。 |
| activity | activity | Swimming is my favourite summer activity. | activity = 活动；游泳是我最喜欢的夏季活动。 |
| addition | addition | The new sports hall is a useful addition to our school. | addition = 新增事物；新体育馆是学校一项实用的新增设施。 |
| air conditioning | air conditioning | The air conditioning kept the classroom cool. | air conditioning = 空调；空调让教室保持凉爽。 |
| ambition | ambition | Her ambition is to become a doctor. | ambition = 志向；她的志向是成为一名医生。 |
| ambulance | ambulance | An ambulance arrived within five minutes. | ambulance = 救护车；一辆救护车在五分钟内赶到了。 |
| appearance | appearance | The actor changed his appearance for the film. | appearance = 外貌；这位演员为了电影改变了自己的外貌。 |
| appointment | appointment | I have a dentist appointment at two o'clock. | appointment = 预约；我预约了两点去看牙医。 |
| argument | argument | They had an argument about whose turn it was. | argument = 争吵；他们为了轮到谁而争吵。 |
| arrangement | arrangement | We made an arrangement to meet outside the station. | arrangement = 安排；我们安排在车站外见面。 |
| attention | attention | Please pay attention to the safety instructions. | attention = 注意；请注意安全说明。 |
| attraction | attraction | The castle is the town's main tourist attraction. | attraction = 景点；这座城堡是镇上主要的旅游景点。 |
| cancel | cancel | They had to cancel the match because of the storm. | cancel = 取消；他们因为暴风雨不得不取消比赛。 |
| case | case | In this case, taking the bus is quicker. | case = 情况；在这种情况下，乘公交车更快。 |
| celebration | celebration | We had a small celebration after the exam. | celebration = 庆祝活动；考试后我们举行了一个小型庆祝活动。 |
| celebrity | celebrity | A local celebrity opened the new theatre. | celebrity = 名人；一位当地名人为新剧院揭幕。 |
| championship | championship | Our team won the national championship. | championship = 冠军称号；我们队赢得了全国冠军称号。 |
| chance | chance | I had a chance to practise English with a visitor. | chance = 机会；我有机会和一位游客练习英语。 |
| charity | charity | The concert raised money for a children's charity. | charity = 慈善机构；这场音乐会为一家儿童慈善机构筹款。 |
| collection | collection | The museum has a collection of old photographs. | collection = 收藏品；博物馆收藏了一批老照片。 |
| comment | comment | The teacher wrote a helpful comment on my essay. | comment = 评语；老师在我的作文上写了一条有帮助的评语。 |
| communication | communication | Good communication helps the team work well together. | communication = 沟通；良好的沟通有助于团队顺利合作。 |
| competition | competition | Leo entered a photography competition. | competition = 比赛；利奥参加了一场摄影比赛。 |
| composition | composition | We wrote a composition about our holidays. | composition = 作文；我们写了一篇关于假期的作文。 |
| condition | condition | The bicycle is old but still in good condition. | condition = 状况；这辆自行车虽然旧，但状况仍然很好。 |
| conference | conference | Our teachers attended an education conference in London. | conference = 会议；我们的老师在伦敦参加了一场教育会议。 |
| congratulations | congratulations | Congratulations on passing your driving test! | congratulations = 祝贺；祝贺你通过驾驶考试！ |
| connection | connection | There is a direct train connection between the two cities. | connection = 交通连接；这两座城市之间有直达列车相连。 |
| correction | correction | Please make this correction before you print the poster. | correction = 改正；打印海报前请改正这个地方。 |
| dancer | dancer | The dancer practised every morning before the show. | dancer = 舞者；这位舞者在演出前每天早上练习。 |
| defence | defence | The team worked hard in defence during the second half. | defence = 防守；球队在下半场努力防守。 |
| department | department | You can find tents in the camping department. | department = 部门；你可以在露营用品部门找到帐篷。 |
| destination | destination | Paris was the final destination on our trip. | destination = 目的地；巴黎是我们旅程的最终目的地。 |
| development | development | This course supports the development of practical skills. | development = 发展；这门课程有助于发展实用技能。 |
| difference | difference | There is a big difference between the two pictures. | difference = 区别；这两幅图片之间有很大区别。 |
| disappointment | disappointment | Missing the final was a great disappointment. | disappointment = 失望之事；错过决赛是一件非常令人失望的事。 |
| distance | distance | The distance from our house to school is two kilometres. | distance = 距离；从我们家到学校的距离是两公里。 |
| documentary | documentary | We watched a documentary about ocean wildlife. | documentary = 纪录片；我们看了一部关于海洋野生动物的纪录片。 |
| driving licence | driving licence | You need a driving licence to rent this car. | driving licence = 驾驶执照；租这辆车需要驾驶执照。 |
| election | election | Students voted for their class representative in the election. | election = 选举；学生们在选举中投票选出班级代表。 |
| electricity | electricity | The storm cut off the electricity for an hour. | electricity = 电力；暴风雨导致停电一小时。 |
| elementary | elementary | The course teaches elementary French. | elementary = 初级的；这门课程教授初级法语。 |
| employment | employment | The new factory will provide employment for local people. | employment = 就业机会；新工厂将为当地人提供就业机会。 |
| entertainment | entertainment | The hotel offers live entertainment every evening. | entertainment = 娱乐表演；这家酒店每晚都有现场娱乐表演。 |
| excitement | excitement | The children shouted with excitement when the band appeared. | excitement = 兴奋；乐队出现时，孩子们兴奋地叫了起来。 |
| exhibition | exhibition | The gallery is holding an exhibition of student art. | exhibition = 展览；这家画廊正在举办学生艺术展。 |
| expedition | expedition | They joined an expedition to study animals in the rainforest. | expedition = 探险考察；他们参加了一次研究雨林动物的探险考察。 |
| experience | experience | Working at the cafe gave her useful experience. | experience = 经验；在咖啡馆工作给了她有用的经验。 |

- [ ] Create the ledger from all 50 rows.
- [ ] Promote every row with the normalized key used by `getWordExample()`.
- [ ] Run the targeted tests and verify all pass.
- [ ] Commit with `git commit -m "feat: add first reviewed ideas examples"`.

### Task 3: Audit, Verify, And Integrate

**Files:**
- Modify if required: `scripts/audit-reviewed-pet-examples.ts`
- Regenerate: `src/lib/generated/pet-word-example-audit.ts`

- [ ] Copy the root translation cache into the worktree before the first audit.
- [ ] Run `npm run audit:examples` and inspect every flag.
- [ ] Correct real mismatches in both sources; manually confirm only valid synonym or polysemy cases with comments.
- [ ] Verify audit reports 985 reviewed examples and 0 need review.
- [ ] Run `npm test` and `npm run build`.
- [ ] Commit with `git commit -m "test: audit first ideas example batch"`.
- [ ] Merge the worktree translation cache back into the root cache before cleanup.
- [ ] Merge into `main`, remove the temporary worktree, rerun `npm test`, push `main`, and verify the service.
