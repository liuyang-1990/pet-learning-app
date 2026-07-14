# PET Health And Body Example Batch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 50 reviewed PET/B1 examples that make every official health-theme row accessible and cover five related health-state qualities.

**Architecture:** Store approved content in `data/example-candidates/health-body-001.json` and promote identical entries into `getReviewedWordExamples()`. The ledger contains one normalized `face to face` representative; runtime tests prove it also covers the official `face-to-face` alias.

**Tech Stack:** Next.js 15, TypeScript, Vitest, Vite Node, Google Translate audit script.

## Global Constraints

- Exactly 50 currently missing normalized terms: 45 unique health keys and 5 related qualities keys.
- The 45 health keys make all 46 official health rows accessible because `face to face` and `face-to-face` share one runtime key.
- Reviewed registry coverage rises from at least 335 to at least 385.
- Candidate data remains unimported by application code.
- Every batch entry passes ledger alignment, bilingual audit, full tests, and production build.

---

### Task 1: Add Failing Coverage Tests

**Files:**
- Modify: `src/lib/pet-learning-app.test.ts`

- [ ] Add `healthBodyBatch` using the 50 table terms below.
- [ ] Require all 50 selected terms and all 46 official health rows to return reviewed sentences, with registry count at least 385.
- [ ] Add exact candidate-ledger alignment and sense assertions for `face to face`, `face-to-face`, `fit`, `hand in`, `hand out`, `patient`, and `tooth / teeth`.
- [ ] Run `npm test -- src/lib/pet-learning-app.test.ts -t "health body"` and verify failure because content is absent.
- [ ] Commit with `git commit -m "test: require health body batch"`.

### Task 2: Create And Promote The Reviewed Entries

**Files:**
- Create: `data/example-candidates/health-body-001.json`
- Modify: `src/lib/pet-learning-app.ts`

The ledger uses `batchId: health-body-001`, `status: promoted`, and these exact entries:

| Term | Sentence | Chinese |
| --- | --- | --- |
| accident | Tom broke his arm in a cycling accident. | accident = 事故；汤姆在一次骑车事故中摔断了手臂。 |
| ache | I have a dull ache in my left shoulder. | ache = 疼痛；我的左肩隐隐作痛。 |
| arm | He wore a bandage around his arm. | arm = 手臂；他的手臂上缠着绷带。 |
| blood | The nurse took a small sample of blood. | blood = 血；护士采了一小份血样。 |
| body | Your body needs rest after hard exercise. | body = 身体；剧烈运动后，你的身体需要休息。 |
| by accident | I took your coat by accident because ours look similar. | by accident = 不小心；我不小心拿了你的外套，因为我们的外套看起来很像。 |
| by hand | This wooden toy was painted by hand. | by hand = 手工；这个木制玩具是手工上色的。 |
| clinic | The doctor works at a small clinic near the station. | clinic = 诊所；医生在车站附近的一家小诊所工作。 |
| ear | The doctor looked inside my ear. | ear = 耳朵；医生检查了我的耳朵里面。 |
| emergency | Call this number if there is an emergency. | emergency = 紧急情况；如有紧急情况，请拨打这个号码。 |
| eye | Something flew into my eye while I was cycling. | eye = 眼睛；骑车时有东西飞进了我的眼睛。 |
| face | Wash your face before you go to bed. | face = 脸；睡觉前洗脸。 |
| face to face | We discussed the problem face to face. | face to face = 面对面；我们面对面讨论了这个问题。 |
| finger | I cut my finger while preparing dinner. | finger = 手指；准备晚饭时，我割伤了手指。 |
| fit | These shoes fit me perfectly. | fit = 合身；这双鞋我穿着正合适。 |
| foot | I hurt my foot during football practice. | foot = 脚；足球训练时我伤了脚。 |
| get fit | She joined a swimming club to get fit. | get fit = 强身健体；她加入游泳俱乐部来增强体质。 |
| hand | Raise your hand if you know the answer. | hand = 手；如果你知道答案，请举手。 |
| hand-held | The guide used a hand-held radio to call for help. | hand-held = 手持式的；导游用手持对讲机呼救。 |
| hand in | Please hand in the medical form before Friday. | hand in = 交上；请在星期五前交上医疗表格。 |
| hand out | The nurse handed out masks at the entrance. | hand out = 分发；护士在入口处分发口罩。 |
| head | Wear a helmet to protect your head. | head = 头；戴头盔保护头部。 |
| health | Regular exercise is good for your health. | health = 健康；经常锻炼对健康有益。 |
| healthy | A healthy breakfast gives me energy for school. | healthy = 健康的；健康的早餐让我有精力上学。 |
| heart | Exercise makes your heart stronger. | heart = 心脏；锻炼能让你的心脏更强健。 |
| hospital | She was taken to hospital after the accident. | hospital = 医院；事故发生后，她被送往医院。 |
| hurt | My knee still hurts when I climb stairs. | hurt = 疼；我爬楼梯时膝盖仍然会疼。 |
| ill | Leo stayed home because he was ill. | ill = 生病的；利奥因为生病待在家里。 |
| knee | I fell and hurt my knee. | knee = 膝盖；我摔倒伤了膝盖。 |
| left-hand | Use the left-hand door to enter the clinic. | left-hand = 左边的；请从左边的门进入诊所。 |
| leg | Her leg was sore after the long run. | leg = 腿；长跑后她的腿很酸痛。 |
| medicine | Take this medicine after breakfast. | medicine = 药；早餐后服用这种药。 |
| mouth | Cover your mouth when you cough. | mouth = 嘴；咳嗽时请捂住嘴。 |
| neck | My neck felt stiff after the long journey. | neck = 脖子；长途旅行后我的脖子很僵硬。 |
| nose | My nose is blocked because I have a cold. | nose = 鼻子；我感冒了，所以鼻子不通气。 |
| on foot | The clinic is close enough to reach on foot. | on foot = 步行；诊所很近，可以步行到达。 |
| pain | Tell the doctor where you feel the pain. | pain = 疼痛；告诉医生你哪里疼。 |
| pregnant | The pregnant woman was offered a seat on the bus. | pregnant = 怀孕的；公交车上有人给那位孕妇让座。 |
| rescue | The mountain rescue team found the injured walker. | rescue = 救援；山地救援队找到了受伤的徒步者。 |
| right-hand | The pharmacy is on the right-hand side of the road. | right-hand = 右边的；药店在道路右侧。 |
| second-hand | I bought a second-hand bicycle from my neighbour. | second-hand = 二手的；我从邻居那里买了一辆二手自行车。 |
| shoulder | I carried the bag over my shoulder. | shoulder = 肩膀；我把包挎在肩上。 |
| sick | I felt sick after eating too much cake. | sick = 恶心的；吃了太多蛋糕后，我觉得恶心。 |
| stomach ache | I had a stomach ache after lunch. | stomach ache = 胃痛；午饭后我胃疼。 |
| tooth / teeth | I need to see a dentist because my tooth hurts. | tooth = 牙齿；我的牙疼，需要去看牙医。 |
| painful | The cut was painful for several days. | painful = 疼痛的；这个伤口疼了好几天。 |
| patient | The patient waited quietly to see the doctor. | patient = 病人；病人安静地等着看医生。 |
| sore | My throat is sore, so it hurts to speak. | sore = 疼痛的；我喉咙痛，说话也疼。 |
| unfit | I felt unfit after months without exercise. | unfit = 身体不健康的；几个月没锻炼后，我觉得身体状态很差。 |
| unwell | Sara felt unwell and went home early. | unwell = 身体不适的；萨拉觉得不舒服，提前回家了。 |

- [ ] Create the ledger from all 50 rows.
- [ ] Promote entries with normalized keys; `tooth / teeth` uses `tooth` and `face to face` uses `facetoface`.
- [ ] Run the targeted tests and verify all pass.
- [ ] Commit with `git commit -m "feat: add reviewed health body examples"`.

### Task 3: Audit, Verify, And Integrate

**Files:**
- Modify if required: `scripts/audit-reviewed-pet-examples.ts`
- Regenerate: `src/lib/generated/pet-word-example-audit.ts`

- [ ] Run `npm run audit:examples` and inspect every flag.
- [ ] Correct real mismatches in both sources; manually confirm only valid synonym or polysemy cases with comments.
- [ ] Verify audit reports 385 reviewed examples and 0 need review.
- [ ] Run `npm test` and `npm run build`.
- [ ] Commit with `git commit -m "test: audit health body batch"`.
- [ ] Merge into `main`, remove the temporary worktree, rerun `npm test` from root, and push `main`.
