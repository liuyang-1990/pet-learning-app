# PET Grammar 007 Example Batch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 50 reviewed PET/B1 examples for the next grammar-theme cluster.

**Architecture:** Store approved content in `data/example-candidates/grammar-007.json` and promote identical entries into `getReviewedWordExamples()`. Use the same slash-term normalization as `normalizeVocabularyTerm()` so `v / versus` and `well made / well-made` resolve correctly, while candidate data remains unimported by runtime code.

**Tech Stack:** Next.js 15, TypeScript, Vitest, Vite Node, Google Translate audit script.

## Global Constraints

- Exactly 50 currently missing official grammar terms, from `these` through `would` in remaining vocabulary order.
- Reviewed registry coverage rises from 1335 to 1385; accessible official rows rise from 1340 to 1390.
- Grammar accessible coverage rises from 279/338 to 329/338.
- Candidate data remains unimported by application code.
- Every entry passes ledger alignment, intended-sense checks, bilingual audit, full tests, and production build.

---

### Task 1: Add Failing Coverage Tests

**Files:**
- Modify: `src/lib/pet-learning-app.test.ts`

- [ ] Add `grammarSeventhBatch` using the 50 table terms below.
- [ ] Require all selected terms to return reviewed sentences, registry count at least 1385, and grammar coverage at least 329/338.
- [ ] Add candidate-ledger alignment and exact sense assertions, including both slash-form terms.
- [ ] Run `npx vitest run src/lib/pet-learning-app.test.ts -t "seventh grammar"` and verify three failures because content is absent.
- [ ] Commit with `git commit -m "test: require seventh grammar example batch"`.

### Task 2: Create And Promote The Reviewed Entries

**Files:**
- Create: `data/example-candidates/grammar-007.json`
- Modify: `src/lib/pet-learning-app.ts`

The ledger uses `batchId: grammar-007`, `status: promoted`, and these exact entries:

| Term | Focus Word | Sentence | Chinese |
| --- | --- | --- | --- |
| these | these | These shoes are too small. | these = 这些；这些鞋太小了。 |
| they | they | They are waiting outside. | they = 他们；他们正在外面等候。 |
| this | this | This book belongs to Ella. | this = 这本；这本书是埃拉的。 |
| those | those | Those mountains are beautiful. | those = 那些；那些山很美。 |
| though | though | Though it was cold, we went swimming. | though = 虽然；虽然天气很冷，我们还是去游泳了。 |
| till | till | Wait here till I come back. | till = 直到；在这里等到我回来。 |
| to | to | We walked to the station. | to = 到；我们步行到了车站。 |
| together | together | We cooked dinner together. | together = 一起；我们一起做了晚饭。 |
| tonight | tonight | We are seeing a film tonight. | tonight = 今晚；我们今晚要去看电影。 |
| too | too | This bag is too heavy. | too = 太；这个包太重了。 |
| totally | totally | I totally agree with you. | totally = 完全；我完全同意你的看法。 |
| toward | toward | She walked toward the entrance. | toward = 朝向；她朝入口走去。 |
| twice | twice | I have visited Rome twice. | twice = 两次；我去过罗马两次。 |
| typically | typically | The journey typically takes an hour. | typically = 通常；这段旅程通常需要一个小时。 |
| under | under | Your shoes are under the bed. | under = 在...下面；你的鞋在床下面。 |
| underneath | underneath | The cat is hiding underneath the table. | underneath = 在...下面；猫正躲在桌子下面。 |
| unfortunately | unfortunately | Unfortunately, the museum was closed. | unfortunately = 不幸的是；不幸的是，博物馆关门了。 |
| unless | unless | You cannot enter unless you have a ticket. | unless = 除非；除非你有票，否则不能进入。 |
| until | until | The library is open until eight. | until = 直到；图书馆开放到八点。 |
| unusual | unusual | It is unusual to see snow here in April. | unusual = 不寻常的；四月在这里看到雪并不寻常。 |
| up | up | She ran up the stairs. | up = 向上；她跑上了楼梯。 |
| upon | upon | The book was lying upon the table. | upon = 在...上；书放在桌子上。 |
| up to | up to | This lift can carry up to eight people. | up to = 最多；这部电梯最多可载八人。 |
| up to date | up to date | This map is not up to date. | up to date = 最新的；这张地图不是最新的。 |
| urgently | urgently | The hospital urgently needs more nurses. | urgently = 迫切地；这家医院迫切需要更多护士。 |
| us | us | Please send us the details. | us = 我们；请把详细信息发给我们。 |
| used to | used to | We used to live near the sea. | used to = 过去常常；我们过去住在海边。 |
| v / versus | versus | The final is Brazil versus Spain. | versus = 对阵；决赛由巴西对阵西班牙。 |
| very | very | This book is very useful. | very = 非常；这本书非常有用。 |
| via | via | Please send the document via email. | via = 通过；请通过电子邮件发送文件。 |
| we | we | We live near the park. | we = 我们；我们住在公园附近。 |
| well done | well done | Well done, you passed the exam! | well done = 做得好；做得好，你通过考试了！ |
| well made / well-made | well made | This jacket is well made and should last for years. | well made = 做工精良；这件夹克做工精良，应该能穿很多年。 |
| what | what | What are you looking for? | what = 什么；你在找什么？ |
| whatever | whatever | Choose whatever you like. | whatever = 无论什么；选择任何你喜欢的东西。 |
| when | when | When does the shop close? | when = 什么时候；商店什么时候关门？ |
| whenever | whenever | Call me whenever you need help. | whenever = 无论何时；无论何时需要帮助都可以给我打电话。 |
| where | where | Where did you buy that coat? | where = 在哪里；你在哪里买的那件外套？ |
| wherever | wherever | You can sit wherever you like. | wherever = 无论哪里；你喜欢坐哪里都可以。 |
| whether | whether | I do not know whether he will come. | whether = 是否；我不知道他是否会来。 |
| which | which | Which bus goes to the airport? | which = 哪一辆；哪一辆公交车去机场？ |
| who | who | Who is your English teacher? | who = 谁；谁是你的英语老师？ |
| whole | whole | We spent the whole day at the beach. | whole = 整个；我们在海滩度过了整整一天。 |
| whose | whose | Whose phone is this? | whose = 谁的；这是谁的手机？ |
| why | why | Why are you laughing? | why = 为什么；你为什么笑？ |
| will | will | I will call you tomorrow. | will = 将会；我明天会给你打电话。 |
| with | with | I went to the cinema with my friends. | with = 和...一起；我和朋友们一起去了电影院。 |
| within | within | Please reply within five days. | within = 在...以内；请在五天内回复。 |
| without | without | He left without saying goodbye. | without = 没有；他没有告别就离开了。 |
| would | would | Would you like a cup of tea? | would = 愿意；你想喝杯茶吗？ |

- [ ] Create the ledger from all 50 rows.
- [ ] Promote every row with the exact slash normalization used by `getWordExample()`.
- [ ] Run the targeted tests and verify all pass.
- [ ] Commit with `git commit -m "feat: add seventh reviewed grammar examples"`.

### Task 3: Audit, Verify, And Integrate

**Files:**
- Modify if required: `scripts/audit-reviewed-pet-examples.ts`
- Regenerate: `src/lib/generated/pet-word-example-audit.ts`

- [ ] Run `npm run audit:examples` and inspect every flag against cached forward and back translations.
- [ ] Correct real mismatches in plan, ledger, and registry; manually confirm only valid contextual senses or synonyms with comments.
- [ ] Verify audit reports 1385 reviewed examples and 0 need review.
- [ ] Run `npm test` and verify 106 tests pass.
- [ ] Run `npm run build` and verify the production build succeeds.
- [ ] Commit with `git commit -m "test: audit seventh grammar example batch"`.
- [ ] Push `main`, verify local and remote SHA match, verify coverage is 1390/3099 with grammar at 329/338, and verify the production service returns HTTP 200.
