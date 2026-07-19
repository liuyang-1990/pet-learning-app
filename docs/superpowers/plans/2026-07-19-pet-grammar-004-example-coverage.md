# PET Grammar 004 Example Batch Implementation Plan

**Goal:** Add 50 reviewed PET/B1 examples for the next grammar-theme cluster.

**Architecture:** Store approved content in `data/example-candidates/grammar-004.json` and promote identical entries into `getReviewedWordExamples()`. Keep candidate data unimported by runtime code and verify coverage, ledger alignment, intended senses, bilingual quality, tests, and production build.

**Tech Stack:** Next.js 15, TypeScript, Vitest, Vite Node, Google Translate audit script.

## Global Constraints

- Exactly 50 currently missing official grammar terms, from `hey` through `nearly` in remaining vocabulary order.
- Reviewed registry coverage rises from 1185 to 1235; accessible official rows rise from 1190 to 1240.
- Grammar accessible coverage rises from 129/338 to 179/338.
- Candidate data remains unimported by application code.
- Every entry passes ledger alignment, intended-sense checks, bilingual audit, full tests, and production build.

---

### Task 1: Add Failing Coverage Tests

**Files:**
- Modify: `src/lib/pet-learning-app.test.ts`

- [ ] Add `grammarFourthBatch` using the 50 table terms below.
- [ ] Require all selected terms to return reviewed sentences, registry count at least 1235, and grammar coverage at least 179/338.
- [ ] Add candidate-ledger alignment and exact sense assertions.
- [ ] Run the targeted tests and verify failure because content is absent.
- [ ] Commit with `git commit -m "test: require fourth grammar example batch"`.

### Task 2: Create And Promote The Reviewed Entries

**Files:**
- Create: `data/example-candidates/grammar-004.json`
- Modify: `src/lib/pet-learning-app.ts`

The ledger uses `batchId: grammar-004`, `status: promoted`, and these exact entries:

| Term | Focus Word | Sentence | Chinese |
| --- | --- | --- | --- |
| hey | hey | Hey, wait for me! | hey = 嗨；嗨，等等我！ |
| hi | hi | Hi, my name is Leo. | hi = 你好；你好，我叫利奥。 |
| him | him | I met him outside the library. | him = 他；我在图书馆外遇见了他。 |
| himself | himself | Ben fixed the bicycle himself. | himself = 他亲自；本亲自修好了自行车。 |
| his | his | That red backpack is his. | his = 他的；那个红色背包是他的。 |
| honestly | honestly | Honestly, I did not enjoy the film. | honestly = 说实话；说实话，我不喜欢这部电影。 |
| hopefully | hopefully | Hopefully, the weather will improve tomorrow. | hopefully = 希望；希望明天天气会好转。 |
| how | how | How did you travel to the island? | how = 如何；你是如何去那座岛的？ |
| however | however | The hotel was expensive; however, the service was excellent. | however = 然而；这家酒店很贵，然而服务非常好。 |
| how much | how much | How much does this jacket cost? | how much = 多少钱；这件夹克多少钱？ |
| if | if | Call me if you need any help. | if = 如果；如果你需要帮助，请给我打电话。 |
| in | in | The keys are in my bag. | in = 在...里面；钥匙在我的包里。 |
| including | including | Ten students, including Mia, joined the trip. | including = 包括；包括米娅在内的十名学生参加了旅行。 |
| incredibly | incredibly | The view from the mountain was incredibly beautiful. | incredibly = 非常；山上的景色非常美丽。 |
| indeed | indeed | The exam was difficult indeed. | indeed = 的确；这次考试的确很难。 |
| indoors | indoors | We stayed indoors because of the storm. | indoors = 在室内；因为暴风雨，我们待在室内。 |
| in fact | in fact | I thought Leo was French, but in fact he is Belgian. | in fact = 事实上；我以为利奥是法国人，但事实上他是比利时人。 |
| in front of | in front of | There is a bus stop in front of the school. | in front of = 在...前面；学校前面有一个公交车站。 |
| in ink | in ink | Please complete the form in ink. | in ink = 用墨水；请用墨水填写表格。 |
| in pencil | in pencil | Write your first draft in pencil. | in pencil = 用铅笔；用铅笔写初稿。 |
| inside | inside | It was warm inside the cafe. | inside = 在里面；咖啡馆里面很暖和。 |
| instead | instead | The bus was full, so we walked instead. | instead = 改为；公交车满了，所以我们改为步行。 |
| in the end | in the end | In the end, we chose the smaller hotel. | in the end = 最后；最后，我们选择了较小的酒店。 |
| into | into | She put the books into her bag. | into = 进入；她把书放进了包里。 |
| IT | it | It is raining outside. | it = 它；外面正在下雨。 |
| its | its | The dog wagged its tail happily. | its = 它的；那只狗高兴地摇着尾巴。 |
| itself | itself | The door closed by itself. | itself = 它自己；门自己关上了。 |
| just | just | I have just finished my homework. | just = 刚刚；我刚刚完成家庭作业。 |
| lately | lately | Have you seen Maya lately? | lately = 最近；你最近见过玛雅吗？ |
| less | less | This bag costs less than the other one. | less = 更少；这个包比另一个便宜。 |
| loudly | loudly | The audience cheered loudly after the song. | loudly = 大声地；歌曲结束后，观众大声欢呼。 |
| luckily | luckily | Luckily, we caught the last bus. | luckily = 幸运地；幸运的是，我们赶上了末班公交车。 |
| mainly | mainly | The course is mainly for beginners. | mainly = 主要地；这门课程主要面向初学者。 |
| many | many | Many people visit the castle each year. | many = 许多；每年有许多人参观这座城堡。 |
| may | may | You may leave when you finish the test. | may = 可以；完成考试后你可以离开。 |
| maybe | maybe | Maybe we can meet after lunch. | maybe = 也许；也许我们可以午饭后见面。 |
| me | me | Could you help me carry this box? | me = 我；你能帮我搬这个箱子吗？ |
| meanwhile | meanwhile | Dad cooked dinner; meanwhile, I set the table. | meanwhile = 同时；爸爸做晚饭，同时我摆餐具。 |
| might | might | It might rain this afternoon. | might = 可能；今天下午可能会下雨。 |
| mine | mine | The seat by the window is mine. | mine = 我的；窗边的座位是我的。 |
| minus | minus | Ten minus three equals seven. | minus = 减；十减三等于七。 |
| more | more | We need more chairs for the meeting. | more = 更多；会议需要更多椅子。 |
| most | most | Most students walk to school. | most = 大多数；大多数学生步行去学校。 |
| mostly | mostly | The audience was mostly teenagers. | mostly = 大多；观众大多是青少年。 |
| much | much | How much water should I add? | much = 多少；我应该加多少水？ |
| must | must | You must wear a helmet when cycling. | must = 必须；骑自行车时必须戴头盔。 |
| my | my | My sister lives in London. | my = 我的；我姐姐住在伦敦。 |
| myself | myself | I made this card myself. | myself = 我亲自；这张卡片是我亲自做的。 |
| near | near | Our hotel is near the station. | near = 在附近；我们的酒店在车站附近。 |
| nearly | nearly | It is nearly time for lunch. | nearly = 几乎；快到午饭时间了。 |

- [ ] Create the ledger from all 50 rows.
- [ ] Promote every row with the normalized key used by `getWordExample()`.
- [ ] Run the targeted tests and verify all pass.
- [ ] Commit with `git commit -m "feat: add fourth reviewed grammar examples"`.

### Task 3: Audit, Verify, And Integrate

**Files:**
- Modify if required: `scripts/audit-reviewed-pet-examples.ts`
- Regenerate: `src/lib/generated/pet-word-example-audit.ts`

- [ ] Copy the root translation cache into the worktree before the first audit.
- [ ] Run `npm run audit:examples` and inspect every flag.
- [ ] Correct real mismatches in plan, ledger, and registry; manually confirm only valid contextual senses or synonyms with comments.
- [ ] Verify audit reports 1235 reviewed examples and 0 need review.
- [ ] Run `npm test` and `npm run build`.
- [ ] Commit with `git commit -m "test: audit fourth grammar example batch"`.
- [ ] Merge cache back to root, merge into `main`, clean the worktree, rerun tests, push, and verify service health.
