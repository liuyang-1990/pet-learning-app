# PET Communication And Small Themes Example Batch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 50 reviewed PET/B1 communication and residual-theme examples and complete six vocabulary themes.

**Architecture:** Store approved content in `data/example-candidates/communication-small-themes-001.json` and promote identical entries into `getReviewedWordExamples()`. Replace the one-off `workout` lookup guard with an exact-term override table so compressed-key collisions (`check in/check-in`, `check out/checkout`, `work out/workout`) can receive independent examples in future object batches.

**Tech Stack:** Next.js 15, TypeScript, Vitest, Vite Node, Google Translate audit script.

## Global Constraints

- Exactly 50 currently missing normalized terms: all 37 remaining communication terms and 13 residual terms from numbers, society, entertainment, school, and nature.
- Communication reaches 70/70, numbers 32/32, society 20/20, entertainment 54/54, school 21/21, and nature 47/47.
- `check-in`, `checkout`, and `workout` remain unreviewed until exact override entries are authored; they never inherit unrelated compressed-key examples.
- Reviewed registry coverage rises from 885 to 935; accessible official rows rise from 890 to 940.
- Candidate data remains unimported by application code.
- Every entry passes ledger alignment, bilingual audit, full tests, and production build.

---

### Task 1: Add Failing Coverage Tests

**Files:**
- Modify: `src/lib/pet-learning-app.test.ts`

- [ ] Add `communicationSmallThemesBatch` using the 50 table terms below.
- [ ] Require every selected entry and every row in all six completed themes to return reviewed sentences, with registry count at least 935.
- [ ] Assert `check-in`, `checkout`, and `workout` still return `sentence: null`.
- [ ] Add ledger alignment and exact sense assertions for `base on`, `break down`, `break up`, `check in`, `check out`, `hang up`, `split up`, `shape`, `rule`, `trade`, `main course`, and `studies`.
- [ ] Run `npm test -- src/lib/pet-learning-app.test.ts -t "communication small themes"` and verify failure because content is absent.
- [ ] Commit with `git commit -m "test: require communication small themes batch"`.

### Task 2: Create And Promote The Reviewed Entries

**Files:**
- Create: `data/example-candidates/communication-small-themes-001.json`
- Modify: `src/lib/pet-learning-app.ts`

The ledger uses `batchId: communication-small-themes-001`, `status: promoted`, and these exact entries:

| Term | Focus Word | Sentence | Chinese |
| --- | --- | --- | --- |
| base on | base on | Base your answer on information in the text. | base on = 以...为依据；根据课文中的信息回答。 |
| be over | be over | The lesson will be over at three thirty. | be over = 结束；这节课三点半结束。 |
| break down | break down | Our car broke down on the way to the airport. | break down = 出故障；我们的汽车在去机场的路上坏了。 |
| break in | break in | Someone tried to break in through the kitchen window. | break in = 闯入；有人试图从厨房窗户闯进来。 |
| break up | break up | Mia and Ben decided to break up. | break up = 分手；米娅和本决定分手。 |
| call for | call for | The injured walker called for help. | call for = 呼救；受伤的徒步者大声呼救。 |
| call in | call in | Sam had to call in sick this morning. | call in = 打电话通知；萨姆今天早上不得不打电话请病假。 |
| check in | check in | We need to check in at the hotel before six. | check in = 办理入住；我们需要在六点前到酒店办理入住。 |
| check out | check out | Guests must check out of the hotel by eleven. | check out = 退房；客人必须在十一点前退房。 |
| chill out | chill out | I like to chill out with music after school. | chill out = 放松；放学后我喜欢听音乐放松。 |
| cross out | cross out | Cross out the word that does not belong. | cross out = 划掉；划掉不属于这一组的单词。 |
| cut up | cut up | Cut up the vegetables before adding them to the soup. | cut up = 切碎；把蔬菜切碎后再放进汤里。 |
| deal with | deal with | We need to deal with this problem today. | deal with = 处理；我们今天需要处理这个问题。 |
| fill in | fill in | Please fill in every box on the form. | fill in = 填写；请填写表格上的每一栏。 |
| fill up | fill up | Fill up your water bottle before the walk. | fill up = 装满；徒步前把你的水瓶装满。 |
| hang out | hang out | We often hang out at the sports centre. | hang out = 闲逛；我们经常在体育中心一起消磨时间。 |
| hang up | hang up | Do not hang up until I find the address. | hang up = 挂断电话；在我找到地址前别挂电话。 |
| knock down | knock down | The builders knocked down the old wall. | knock down = 拆除；建筑工人拆掉了那面旧墙。 |
| lie down | lie down | You should lie down if you feel dizzy. | lie down = 躺下；如果你感到头晕，就应该躺下。 |
| pass on | pass on | Please pass on this message to your sister. | pass on = 转告；请把这条消息转告给你妹妹。 |
| recommend | recommend | I recommend the vegetable soup at this cafe. | recommend = 推荐；我推荐这家咖啡馆的蔬菜汤。 |
| review | review | Review your notes before the test. | review = 复习；考试前复习你的笔记。 |
| say | say | Please say your name clearly. | say = 说；请清楚地说出你的名字。 |
| sentence | sentence | Write one sentence about the picture. | sentence = 句子；写一个描述这幅图片的句子。 |
| sit down | sit down | Please sit down beside your partner. | sit down = 坐下；请坐在你的搭档旁边。 |
| speak | speak | Could you speak more slowly, please? | speak = 说话；请问你能说慢一点吗？ |
| split up | split up | The teacher split us up into four groups. | split up = 分组；老师把我们分成了四组。 |
| talk | talk | We need to talk about tomorrow's trip. | talk = 交谈；我们需要谈谈明天的旅行。 |
| tell | tell | Tell me what happened after the match. | tell = 告诉；告诉我比赛后发生了什么。 |
| thank | thank | I wrote to thank her for the present. | thank = 感谢；我写信感谢她送的礼物。 |
| thank you | thank you | Thank you for helping me carry the boxes. | thank you = 谢谢；谢谢你帮我搬这些箱子。 |
| throw away | throw away | Do not throw away bottles that can be recycled. | throw away = 扔掉；不要扔掉可以回收的瓶子。 |
| tidy up | tidy up | Please tidy up your room before dinner. | tidy up = 整理；晚饭前请整理好你的房间。 |
| understand | understand | I understand the question now. | understand = 理解；我现在明白这个问题了。 |
| wake up | wake up | I usually wake up before my alarm rings. | wake up = 醒来；我通常在闹钟响之前醒来。 |
| wash up | wash up | I will wash up after we finish dinner. | wash up = 洗餐具；我们吃完晚饭后我来洗餐具。 |
| word | word | Look up the new word in your dictionary. | word = 单词；在字典里查一下这个新单词。 |
| no one | no one | No one knew the answer to the final question. | no one = 没有人；没有人知道最后一个问题的答案。 |
| shape | shape | The table is round in shape. | shape = 形状；这张桌子的形状是圆的。 |
| politics | politics | Her brother studies politics at university. | politics = 政治学；她哥哥在大学学习政治学。 |
| relationship | relationship | I have a good relationship with my neighbours. | relationship = 关系；我和邻居关系很好。 |
| rule | rule | Our school has a rule against using phones in class. | rule = 规则；我们学校规定课堂上不能使用手机。 |
| society | society | Education is important for the whole society. | society = 社会；教育对整个社会都很重要。 |
| trade | trade | Trade between the two countries has increased. | trade = 贸易；两国之间的贸易增加了。 |
| traditional | traditional | The dancers wore traditional clothing. | traditional = 传统的；舞者们穿着传统服装。 |
| theatre | theatre | We watched a comedy at the theatre. | theatre = 剧院；我们在剧院看了一部喜剧。 |
| main course | main course | I chose fish and rice for my main course. | main course = 主菜；我选择鱼和米饭作为主菜。 |
| of course | of course | Of course you can borrow my dictionary. | of course = 当然；你当然可以借我的字典。 |
| studies | studies | Her studies take up most of her week. | studies = 学业；她的学业占去了她一周的大部分时间。 |
| movie star | movie star | The movie star signed autographs outside the cinema. | movie star = 电影明星；这位电影明星在电影院外签名。 |

- [ ] Create the ledger from all 50 rows.
- [ ] Promote every row with the normalized key used by `getWordExample()`.
- [ ] Add exact lookup overrides for `workout`, `check-in`, and `checkout`; no override entry exists until that exact term is reviewed.
- [ ] Run the targeted tests and verify all pass.
- [ ] Commit with `git commit -m "feat: add reviewed communication small theme examples"`.

### Task 3: Audit, Verify, And Integrate

**Files:**
- Modify if required: `scripts/audit-reviewed-pet-examples.ts`
- Regenerate: `src/lib/generated/pet-word-example-audit.ts`

- [ ] Copy the root translation cache into the worktree before the first audit.
- [ ] Run `npm run audit:examples` and inspect every flag.
- [ ] Correct real mismatches in both sources; manually confirm only valid synonym or polysemy cases with comments.
- [ ] Verify audit reports 935 reviewed examples and 0 need review.
- [ ] Run `npm test` and `npm run build`.
- [ ] Commit with `git commit -m "test: audit communication small themes batch"`.
- [ ] Merge the worktree translation cache back into the root cache before cleanup.
- [ ] Merge into `main`, remove the temporary worktree, rerun `npm test`, and push `main`.
