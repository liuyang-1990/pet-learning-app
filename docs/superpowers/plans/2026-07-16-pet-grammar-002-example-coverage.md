# PET Grammar 002 Example Batch Implementation Plan

**Goal:** Add 50 reviewed PET/B1 examples for the next grammar-theme cluster.

**Architecture:** Store approved content in `data/example-candidates/grammar-002.json` and promote identical entries into `getReviewedWordExamples()`. Keep candidate data unimported by runtime code and verify every entry through coverage, ledger, sense, bilingual audit, test, and build gates.

**Tech Stack:** Next.js 15, TypeScript, Vitest, Vite Node, Google Translate audit script.

## Global Constraints

- Exactly 50 currently missing official grammar terms, from `an` through `completely` in remaining vocabulary order.
- Reviewed registry coverage rises from 1085 to 1135; accessible official rows rise from 1090 to 1140.
- Grammar accessible coverage rises from 29/338 to 79/338.
- Candidate data remains unimported by application code.
- Every entry passes ledger alignment, intended-sense checks, bilingual audit, full tests, and production build.

---

### Task 1: Add Failing Coverage Tests

**Files:**
- Modify: `src/lib/pet-learning-app.test.ts`

- [ ] Add `grammarSecondBatch` using the 50 table terms below.
- [ ] Require all selected terms to return reviewed sentences, registry count at least 1135, and grammar coverage at least 79/338.
- [ ] Add candidate-ledger alignment and exact sense assertions.
- [ ] Run the targeted tests and verify failure because content is absent.
- [ ] Commit with `git commit -m "test: require second grammar example batch"`.

### Task 2: Create And Promote The Reviewed Entries

**Files:**
- Create: `data/example-candidates/grammar-002.json`
- Modify: `src/lib/pet-learning-app.ts`

The ledger uses `batchId: grammar-002`, `status: promoted`, and these exact entries:

| Term | Focus Word | Sentence | Chinese |
| --- | --- | --- | --- |
| an | an | She ate an apple before school. | an = 一个；她上学前吃了一个苹果。 |
| and | and | Mia and Leo walked to school together. | and = 和；米娅和利奥一起步行去学校。 |
| another | another | Could I have another glass of water? | another = 另一个；可以再给我一杯水吗？ |
| any | any | Do you have any questions about the trip? | any = 任何；你对这次旅行有任何问题吗？ |
| anybody | anybody | Is anybody sitting in this seat? | anybody = 任何人；这个座位有人坐吗？ |
| anymore | anymore | We do not use that old computer anymore. | anymore = 不再；我们不再使用那台旧电脑了。 |
| anyone | anyone | Anyone can join the school art club. | anyone = 任何人；任何人都可以加入学校艺术社团。 |
| anything | anything | Did you buy anything at the market? | anything = 任何东西；你在市场买东西了吗？ |
| anyway | anyway | It was raining, but we went for a walk anyway. | anyway = 无论如何；虽然下雨了，但我们还是去散步了。 |
| anywhere | anywhere | You can sit anywhere in the room. | anywhere = 任何地方；你可以坐在房间里的任何地方。 |
| apart | apart | The two houses are only a few metres apart. | apart = 相距；这两栋房子只相距几米。 |
| apart from | apart from | Apart from the rain, we had a wonderful holiday. | apart from = 除...之外；除了下雨之外，我们度过了一个美好的假期。 |
| approximately | approximately | The journey takes approximately forty minutes. | approximately = 大约；这段旅程大约需要四十分钟。 |
| around | around | We walked around the lake after lunch. | around = 绕着；午饭后我们绕着湖散步。 |
| as | as | She works as a nurse at the local hospital. | as = 作为；她在当地医院当护士。 |
| as long as | as long as | You can borrow my bike as long as you return it today. | as long as = 只要；只要你今天归还，就可以借我的自行车。 |
| as well | as well | Tom plays football and swims as well. | as well = 也；汤姆踢足球，也游泳。 |
| at | at | Meet me at the station at six. | at = 在；六点在车站和我见面。 |
| at all | at all | I was not tired at all after the walk. | at all = 一点也不；散步后我一点也不累。 |
| at first | at first | At first, the new rules seemed confusing. | at first = 起初；起初，这些新规则似乎令人困惑。 |
| at last | at last | The bus arrived at last. | at last = 终于；公交车终于到了。 |
| at least | at least | Try to read for at least twenty minutes a day. | at least = 至少；尽量每天阅读至少二十分钟。 |
| at once | at once | Please call the doctor at once. | at once = 立刻；请立刻给医生打电话。 |
| at present | at present | The museum is closed at present. | at present = 目前；博物馆目前不开放。 |
| away | away | The beach is only five minutes away. | away = 相距；海滩离这里只有五分钟路程。 |
| back | back | Please put the book back on the shelf. | back = 回原处；请把书放回书架。 |
| backwards | backwards | He took two steps backwards. | backwards = 向后；他向后退了两步。 |
| badly | badly | The team played badly in the first half. | badly = 糟糕地；球队上半场表现得很差。 |
| because of | because of | The match was cancelled because of the snow. | because of = 因为；比赛因为下雪而取消了。 |
| before | before | Wash your hands before dinner. | before = 在...之前；晚饭前洗手。 |
| behind | behind | The car park is behind the hotel. | behind = 在...后面；停车场在酒店后面。 |
| below | below | Please write your answer below the picture. | below = 在下面；请把答案写在图片下面。 |
| beneath | beneath | The keys were hidden beneath a pile of papers. | beneath = 在...下方；钥匙藏在一堆纸下面。 |
| beside | beside | Come and sit beside me. | beside = 在旁边；过来坐在我旁边。 |
| besides | besides | Besides English, she also speaks French. | besides = 除...之外还；除了英语，她还会说法语。 |
| between | between | The cafe is between the bank and the post office. | between = 在...之间；咖啡馆在银行和邮局之间。 |
| beyond | beyond | The path continues beyond the bridge. | beyond = 在...另一边；这条小路延伸到桥的另一边。 |
| both | both | Both answers are correct. | both = 两者都；两个答案都正确。 |
| but | but | The room is small but comfortable. | but = 但是；房间很小，但是很舒适。 |
| by | by | We travelled to Oxford by train. | by = 乘；我们乘火车去了牛津。 |
| by mistake | by mistake | I took your bag by mistake. | by mistake = 错误地；我不小心拿错了你的包。 |
| by name | by name | The teacher knows every student by name. | by name = 知道名字；老师知道每个学生的名字。 |
| bye | bye | Bye, see you tomorrow! | bye = 再见；再见，明天见！ |
| can | can | You can borrow my dictionary. | can = 可以；你可以借我的字典。 |
| something | something | There is something interesting in this box. | something = 某物；这个箱子里有件有趣的东西。 |
| carefully | carefully | Read the question carefully before answering. | carefully = 仔细地；回答前仔细阅读问题。 |
| certainly | certainly | I will certainly help you with the project. | certainly = 一定；我一定会帮你完成这个项目。 |
| cheers | cheers | Cheers for helping me with the boxes. | cheers = 谢谢；谢谢你帮我搬箱子。 |
| clearly | clearly | Please speak clearly during the recording. | clearly = 清楚地；录音时请清楚地说话。 |
| completely | completely | The road was completely empty at night. | completely = 完全地；夜里这条路完全没有车辆。 |

- [ ] Create the ledger from all 50 rows.
- [ ] Promote every row with the normalized key used by `getWordExample()`.
- [ ] Run the targeted tests and verify all pass.
- [ ] Commit with `git commit -m "feat: add second reviewed grammar examples"`.

### Task 3: Audit, Verify, And Integrate

**Files:**
- Modify if required: `scripts/audit-reviewed-pet-examples.ts`
- Regenerate: `src/lib/generated/pet-word-example-audit.ts`

- [ ] Copy the root translation cache into the worktree before the first audit.
- [ ] Run `npm run audit:examples` and inspect every flag.
- [ ] Correct real mismatches in plan, ledger, and registry; manually confirm only valid contextual senses or synonyms with comments.
- [ ] Verify audit reports 1135 reviewed examples and 0 need review.
- [ ] Run `npm test` and `npm run build`.
- [ ] Commit with `git commit -m "test: audit second grammar example batch"`.
- [ ] Merge cache back to root, merge into `main`, clean the worktree, rerun tests, push, and verify service health.
