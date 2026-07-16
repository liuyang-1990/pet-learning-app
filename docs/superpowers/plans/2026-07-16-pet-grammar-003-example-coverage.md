# PET Grammar 003 Example Batch Implementation Plan

**Goal:** Add 50 reviewed PET/B1 examples for the next grammar-theme cluster.

**Architecture:** Store approved content in `data/example-candidates/grammar-003.json` and promote identical entries into `getReviewedWordExamples()`. Keep candidate data unimported by runtime code and verify coverage, ledger alignment, intended senses, bilingual quality, tests, and production build.

**Tech Stack:** Next.js 15, TypeScript, Vitest, Vite Node, Google Translate audit script.

## Global Constraints

- Exactly 50 currently missing official grammar terms, from `could` through `herself` in remaining vocabulary order.
- Reviewed registry coverage rises from 1135 to 1185; accessible official rows rise from 1140 to 1190.
- Grammar accessible coverage rises from 79/338 to 129/338.
- Candidate data remains unimported by application code.
- Every entry passes ledger alignment, intended-sense checks, bilingual audit, full tests, and production build.

---

### Task 1: Add Failing Coverage Tests

**Files:**
- Modify: `src/lib/pet-learning-app.test.ts`

- [ ] Add `grammarThirdBatch` using the 50 table terms below.
- [ ] Require all selected terms to return reviewed sentences, registry count at least 1185, and grammar coverage at least 129/338.
- [ ] Add candidate-ledger alignment and exact sense assertions.
- [ ] Run the targeted tests and verify failure because content is absent.
- [ ] Commit with `git commit -m "test: require third grammar example batch"`.

### Task 2: Create And Promote The Reviewed Entries

**Files:**
- Create: `data/example-candidates/grammar-003.json`
- Modify: `src/lib/pet-learning-app.ts`

The ledger uses `batchId: grammar-003`, `status: promoted`, and these exact entries:

| Term | Focus Word | Sentence | Chinese |
| --- | --- | --- | --- |
| could | could | Could you open the window, please? | could = 可以；请问你可以打开窗户吗？ |
| curiously | curiously | The child looked curiously inside the box. | curiously = 好奇地；这个孩子好奇地看着箱子里面。 |
| definitely | definitely | I will definitely come to the concert. | definitely = 一定；我一定会来参加音乐会。 |
| despite | despite | Despite the rain, we enjoyed the picnic. | despite = 尽管；尽管下雨，我们还是很享受野餐。 |
| directly | directly | The bus goes directly from the airport to the city centre. | directly = 直接地；这趟公交车从机场直达市中心。 |
| do | do | What do you usually do after school? | do = 做；你放学后通常做什么？ |
| down | down | She walked down the stairs slowly. | down = 向下；她慢慢走下楼梯。 |
| dozen | dozen | We bought a dozen eggs at the market. | dozen = 一打；我们在市场买了一打鸡蛋。 |
| due to | due to | The train was late due to heavy snow. | due to = 由于；火车由于大雪而晚点。 |
| during | during | Please keep quiet during the film. | during = 在...期间；电影播放期间请保持安静。 |
| each | each | Each student received a map. | each = 每个；每个学生都收到了一张地图。 |
| easily | easily | You can easily reach the museum by bus. | easily = 容易地；乘公交车可以很容易地到达博物馆。 |
| either | either | You can choose either the blue shirt or the green one. | either = 任一；你可以选择蓝衬衫或绿衬衫中的任意一件。 |
| else | else | Would you like anything else? | else = 其他；你还想要其他东西吗？ |
| enough | enough | We have enough food for everyone. | enough = 足够；我们有足够所有人吃的食物。 |
| especially | especially | I enjoy outdoor sports, especially cycling. | especially = 尤其；我喜欢户外运动，尤其是骑自行车。 |
| even | even | Even my little brother can solve this puzzle. | even = 甚至；甚至我弟弟也能解开这个谜题。 |
| even though | even though | Even though she was tired, she finished her homework. | even though = 尽管；尽管她很累，还是完成了家庭作业。 |
| ever | ever | Have you ever visited Scotland? | ever = 曾经；你曾经去过苏格兰吗？ |
| every | every | The library is open every day. | every = 每一；图书馆每天都开放。 |
| everybody | everybody | Everybody enjoyed the school concert. | everybody = 每个人；每个人都很喜欢学校音乐会。 |
| everyone | everyone | Everyone must bring a pencil to the test. | everyone = 每个人；每个人参加考试时都必须带一支铅笔。 |
| everything | everything | Everything is ready for the party. | everything = 一切；聚会的一切都准备好了。 |
| everywhere | everywhere | There were colourful flowers everywhere. | everywhere = 到处；到处都是五颜六色的花。 |
| exactly | exactly | The train arrived at exactly ten o'clock. | exactly = 恰好；火车恰好在十点到达。 |
| except | except | Everyone came to the meeting except Sam. | except = 除...之外；除了萨姆，每个人都来参加会议了。 |
| extremely | extremely | The mountain path was extremely steep. | extremely = 非常；这条山路非常陡峭。 |
| fairly | fairly | The test was fairly easy. | fairly = 相当；这次考试相当容易。 |
| far | far | How far is the station from here? | far = 多远；车站离这里有多远？ |
| few | few | Only a few students chose the early class. | few = 少数；只有少数学生选择了早课。 |
| finally | finally | We finally found the correct address. | finally = 终于；我们终于找到了正确的地址。 |
| for | for | This present is for your birthday. | for = 为；这份礼物是为你的生日准备的。 |
| forever | forever | I will remember this holiday forever. | forever = 永远；我会永远记住这个假期。 |
| fortunately | fortunately | Fortunately, nobody was hurt in the accident. | fortunately = 幸运地；幸运的是，事故中没有人受伤。 |
| forward | forward | Please step forward when your name is called. | forward = 向前；叫到你的名字时请向前一步。 |
| frequently | frequently | Buses run frequently during the morning. | frequently = 频繁地；上午公交车班次频繁。 |
| from | from | This train travels from London to Cambridge. | from = 从；这趟火车从伦敦开往剑桥。 |
| fully | fully | The hotel is fully booked this weekend. | fully = 完全地；这家酒店本周末已经全部订满。 |
| further | further | For further information, visit our website. | further = 更多的；如需更多信息，请访问我们的网站。 |
| generally | generally | The weather is generally warm in May. | generally = 通常；五月的天气通常很暖和。 |
| goodbye | goodbye | She waved goodbye before getting on the train. | goodbye = 再见；她上火车前挥手告别。 |
| happily | happily | The children played happily in the garden. | happily = 快乐地；孩子们在花园里快乐地玩耍。 |
| hardly | hardly | I could hardly hear the announcement. | hardly = 几乎不；我几乎听不见广播。 |
| have | have | We have two tickets for the show. | have = 有；我们有两张演出的票。 |
| he | he | He walks to school with his sister. | he = 他；他和妹妹一起步行去学校。 |
| hello | hello | I smiled and said hello to the new student. | hello = 你好；我微笑着向新同学问好。 |
| her | her | I gave her the book after class. | her = 她；我课后把书给了她。 |
| here | here | Please wait here until the bus arrives. | here = 这里；请在这里等到公交车到达。 |
| hers | hers | This blue jacket is hers. | hers = 她的；这件蓝色夹克是她的。 |
| herself | herself | Maya made the cake herself. | herself = 她亲自；玛雅亲自做了蛋糕。 |

- [ ] Create the ledger from all 50 rows.
- [ ] Promote every row with the normalized key used by `getWordExample()`.
- [ ] Run the targeted tests and verify all pass.
- [ ] Commit with `git commit -m "feat: add third reviewed grammar examples"`.

### Task 3: Audit, Verify, And Integrate

**Files:**
- Modify if required: `scripts/audit-reviewed-pet-examples.ts`
- Regenerate: `src/lib/generated/pet-word-example-audit.ts`

- [ ] Copy the root translation cache into the worktree before the first audit.
- [ ] Run `npm run audit:examples` and inspect every flag.
- [ ] Correct real mismatches in plan, ledger, and registry; manually confirm only valid contextual senses or synonyms with comments.
- [ ] Verify audit reports 1185 reviewed examples and 0 need review.
- [ ] Run `npm test` and `npm run build`.
- [ ] Commit with `git commit -m "test: audit third grammar example batch"`.
- [ ] Merge cache back to root, merge into `main`, clean the worktree, rerun tests, push, and verify service health.
