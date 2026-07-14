# PET Feelings And Reactions Example Batch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 50 reviewed PET/B1 examples covering all remaining feelings terms and closely related emotional reactions.

**Architecture:** Store approved content in `data/example-candidates/feelings-reactions-001.json` and promote identical entries into `getReviewedWordExamples()`. Tests use runtime lookup to prove every ledger entry is accessible after the application's real normalization path.

**Tech Stack:** Next.js 15, TypeScript, Vitest, Vite Node, Google Translate audit script.

## Global Constraints

- Exactly 50 currently missing official terms: all 32 remaining `feelings` terms and 18 related `qualities` terms.
- Reviewed coverage rises from at least 285 to at least 335.
- Candidate data remains unimported by application code.
- Every batch entry passes ledger alignment, bilingual audit, full tests, and production build.
- Multi-sense terms use the exact sense demonstrated in the table and receive explicit regression assertions.

---

### Task 1: Add Failing Coverage Tests

**Files:**
- Modify: `src/lib/pet-learning-app.test.ts`

- [ ] Add `feelingsReactionsBatch` using the 50 table terms below.
- [ ] Add tests requiring 50 sentences, reviewed count at least 335, and exact candidate-ledger alignment using `focusWord`, `sentence`, and `chinese`.
- [ ] Add exact sense tests for `like`, `look like`, `mind`, `mad`, and `wish`.
- [ ] Run `npm test -- src/lib/pet-learning-app.test.ts -t "feelings reactions"` and verify failure because content is absent.
- [ ] Commit with `git commit -m "test: require feelings reactions batch"`.

### Task 2: Create And Promote The Reviewed Entries

**Files:**
- Create: `data/example-candidates/feelings-reactions-001.json`
- Modify: `src/lib/pet-learning-app.ts`

The ledger uses `batchId: feelings-reactions-001`, `status: promoted`, and these exact entries:

| Term | Sentence | Chinese |
| --- | --- | --- |
| fun | We had a lot of fun playing games at the party. | fun = 乐趣；我们在聚会上玩游戏，玩得很开心。 |
| funny | The story was so funny that everyone laughed. | funny = 好笑的；这个故事很好笑，大家都笑了。 |
| glad | I am glad you came to watch the match. | glad = 高兴的；我很高兴你来看比赛。 |
| happy | She felt happy when she passed her driving test. | happy = 快乐的；她通过驾驶考试时感到很开心。 |
| hate | I hate waiting for buses in the rain. | hate = 讨厌；我讨厌在雨中等公共汽车。 |
| hope | I hope the weather is sunny tomorrow. | hope = 希望；我希望明天天气晴朗。 |
| hopeless | The broken bike looked hopeless, but Dad managed to fix it. | hopeless = 没有希望的；那辆坏自行车看起来没法修了，但爸爸还是把它修好了。 |
| horrible | The milk smelled horrible, so I threw it away. | horrible = 糟糕的；牛奶闻起来很糟，所以我把它扔了。 |
| in love | They met at university and soon fell in love. | in love = 恋爱中；他们在大学相识，很快就相爱了。 |
| like | I like listening to music while I cook. | like = 喜欢；我喜欢做饭时听音乐。 |
| lonely | Ben felt lonely after moving to a new town. | lonely = 孤单的；搬到一个新城镇后，本感到很孤单。 |
| look like | You look like your mother when you smile. | look like = 看起来像；你微笑时看起来很像你妈妈。 |
| love | My grandparents love spending time in their garden. | love = 喜爱；我的祖父母喜欢在花园里度过时光。 |
| mad | Mum was mad at me for losing the house key. | mad = 生气的；我弄丢家门钥匙，妈妈很生我的气。 |
| mind | I changed my mind and chose the red jacket. | mind = 想法；我改变了主意，选择了红色夹克。 |
| mood | Music can improve my mood after a difficult day. | mood = 心情；辛苦一天后，音乐能改善我的心情。 |
| nervous | I always feel nervous before speaking in public. | nervous = 紧张的；公开讲话前我总是感到紧张。 |
| peace | Everyone hopes the two countries can live in peace. | peace = 和平；每个人都希望这两个国家能够和平相处。 |
| pleased | My teacher was pleased with my project. | pleased = 满意的；老师对我的项目很满意。 |
| prefer | I prefer walking to school when the weather is fine. | prefer = 更喜欢；天气好时，我更喜欢步行上学。 |
| proud | Her parents were proud of her exam results. | proud = 自豪的；她的父母为她的考试成绩感到自豪。 |
| sad | I felt sad when my best friend moved away. | sad = 难过的；我最好的朋友搬走时，我感到很难过。 |
| shocking | The documentary showed the shocking amount of plastic in the sea. | shocking = 令人震惊的；纪录片展示了海洋中数量惊人的塑料垃圾。 |
| stress | Exercise helps me deal with stress during exams. | stress = 压力；考试期间，运动帮助我应对压力。 |
| surprise | The party was a complete surprise to me. | surprise = 惊喜；这个聚会对我来说完全是个惊喜。 |
| surprised | We were surprised to see snow in April. | surprised = 感到惊讶的；四月看到下雪，我们很惊讶。 |
| tired | I was tired after carrying the boxes upstairs. | tired = 疲倦的；把箱子搬上楼后，我累了。 |
| trust | I trust Mia because she always tells the truth. | trust = 信任；我信任米娅，因为她总是说实话。 |
| uncomfortable | These wet shoes are making me uncomfortable. | uncomfortable = 不舒服的；这双湿鞋让我很不舒服。 |
| unpleasant | There was an unpleasant smell in the kitchen. | unpleasant = 令人不愉快的；厨房里有一股难闻的气味。 |
| wish | I wish I could stay on holiday for another week. | wish = 希望；我希望能再度假一个星期。 |
| worried | Dad was worried because I arrived home late. | worried = 担心的；因为我很晚才到家，爸爸很担心。 |
| amazed | I was amazed by the view from the mountain. | amazed = 惊讶的；山顶的景色令我惊叹。 |
| amazing | The science museum has an amazing space exhibition. | amazing = 令人惊叹的；科学博物馆有一个很棒的太空展览。 |
| amusing | Our guide told us some amusing stories. | amusing = 有趣的；导游给我们讲了一些有趣的故事。 |
| annoyed | Mia was annoyed when the bus left early. | annoyed = 恼火的；公共汽车提前开走时，米娅很恼火。 |
| anxious | I felt anxious while waiting for the test results. | anxious = 焦虑的；等待考试结果时，我感到焦虑。 |
| brave | It was brave of Leo to help the injured dog. | brave = 勇敢的；利奥帮助受伤的狗，这很勇敢。 |
| calm | Try to stay calm and tell me what happened. | calm = 冷静的；尽量保持冷静，告诉我发生了什么。 |
| cheerful | Our new neighbour is friendly and cheerful. | cheerful = 开朗的；我们的新邻居既友好又开朗。 |
| confident | Ana felt confident before her English presentation. | confident = 自信的；英语演讲前，安娜很有信心。 |
| delighted | We were delighted to hear that you won the prize. | delighted = 高兴的；听说你获奖了，我们非常高兴。 |
| depressed | He felt depressed after being ill for several weeks. | depressed = 沮丧的；生病几个星期后，他感到很沮丧。 |
| disappointed | I was disappointed when the concert was cancelled. | disappointed = 失望的；演唱会取消时，我很失望。 |
| disappointing | The team's performance was disappointing. | disappointing = 令人失望的；球队的表现令人失望。 |
| embarrassed | I felt embarrassed when I forgot her name. | embarrassed = 尴尬的；忘记她的名字时，我感到很尴尬。 |
| embarrassing | Falling over on stage was embarrassing. | embarrassing = 令人尴尬的；在舞台上摔倒很尴尬。 |
| exhausted | We were exhausted after the long walk. | exhausted = 筋疲力尽的；走了很长一段路后，我们筋疲力尽。 |
| frightened | The child was frightened by the thunder. | frightened = 害怕的；那个孩子被雷声吓到了。 |
| frightening | The storm was frightening, but everyone stayed safe. | frightening = 令人害怕的；暴风雨很吓人，但所有人都平安无事。 |

- [ ] Create the ledger from all 50 rows.
- [ ] Promote all rows with normalized lowercase keys; phrase keys remove spaces.
- [ ] Run the targeted tests and verify all pass.
- [ ] Commit with `git commit -m "feat: add reviewed feelings reactions examples"`.

### Task 3: Audit, Verify, And Integrate

**Files:**
- Modify if required: `scripts/audit-reviewed-pet-examples.ts`
- Regenerate: `src/lib/generated/pet-word-example-audit.ts`

- [ ] Run `npm run audit:examples` and inspect every flag.
- [ ] Correct real mismatches in both sources; manually confirm only valid synonym or polysemy cases with a comment naming the demonstrated sense.
- [ ] Verify audit reports 335 reviewed examples and 0 need review.
- [ ] Run `npm test` and `npm run build`.
- [ ] Commit with `git commit -m "test: audit feelings reactions batch"`.
- [ ] Merge into `main`, remove the temporary worktree, rerun `npm test` from root, and push `main`.
