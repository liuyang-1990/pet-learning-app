# PET Entertainment And Media Example Batch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 50 reviewed PET/B1 entertainment and media examples, leaving only `theatre` and `toy` uncovered in the entertainment theme.

**Architecture:** Store approved content in `data/example-candidates/entertainment-media-001.json` and promote identical entries into `getReviewedWordExamples()`. Tests use the official vocabulary JSON and runtime lookup to prove all selected entries are accessible and only two entertainment rows remain without reviewed examples.

**Tech Stack:** Next.js 15, TypeScript, Vitest, Vite Node, Google Translate audit script.

## Global Constraints

- Exactly 50 currently missing normalized terms from the `entertainment` theme.
- Entertainment coverage rises from 0/52 to 50/52; only `theatre` and `toy` remain.
- Reviewed registry coverage rises from at least 585 to at least 635.
- Candidate data remains unimported by application code.
- Every batch entry passes ledger alignment, bilingual audit, full tests, and production build.

---

### Task 1: Add Failing Coverage Tests

**Files:**
- Modify: `src/lib/pet-learning-app.test.ts`

- [ ] Add `entertainmentMediaBatch` using the 50 table terms below.
- [ ] Require all 50 selected terms to return reviewed sentences, with registry count at least 635 and entertainment coverage exactly 50/52.
- [ ] Add exact candidate-ledger alignment and sense assertions for `art`, `character`, `pop`, `program`, and `show up`.
- [ ] Run `npm test -- src/lib/pet-learning-app.test.ts -t "entertainment media"` and verify failure because content is absent.
- [ ] Commit with `git commit -m "test: require entertainment media batch"`.

### Task 2: Create And Promote The Reviewed Entries

**Files:**
- Create: `data/example-candidates/entertainment-media-001.json`
- Modify: `src/lib/pet-learning-app.ts`

The ledger uses `batchId: entertainment-media-001`, `status: promoted`, and these exact entries:

| Term | Sentence | Chinese |
| --- | --- | --- |
| art | We studied modern art at the gallery. | art = 艺术；我们在画廊学习了现代艺术。 |
| audience | The audience clapped loudly at the end of the show. | audience = 观众；演出结束时，观众热烈鼓掌。 |
| board game | We played a board game after dinner. | board game = 棋盘游戏；晚饭后我们玩了一个棋盘游戏。 |
| character | My favourite character in the story is a brave girl. | character = 人物；故事中我最喜欢的人物是一个勇敢的女孩。 |
| chat show | My parents watched a chat show last night. | chat show = 访谈节目；我父母昨晚看了一个访谈节目。 |
| cinema | Let us meet outside the cinema at seven. | cinema = 电影院；我们七点在电影院外见面吧。 |
| club | Mia joined the school photography club. | club = 俱乐部；米娅加入了学校摄影俱乐部。 |
| comic | Leo reads a comic on the bus to school. | comic = 连环漫画；利奥在去学校的公交车上看连环漫画。 |
| concert | The band gave a concert in the town hall. | concert = 音乐会；乐队在市政厅举办了一场音乐会。 |
| dance | We learned a traditional dance at the festival. | dance = 舞蹈；我们在节日活动中学了一种传统舞蹈。 |
| dancing | Ella enjoys dancing with her friends. | dancing = 跳舞；埃拉喜欢和朋友们一起跳舞。 |
| detective | The detective found an important clue in the room. | detective = 侦探；侦探在房间里发现了一条重要线索。 |
| drama | Our school drama is about friendship. | drama = 戏剧；我们的校园戏剧讲的是友谊。 |
| draw | Please draw a map of the route to your house. | draw = 画；请画一张去你家的路线图。 |
| drawing | Her drawing of the old bridge won a prize. | drawing = 图画；她画的那座老桥获得了奖项。 |
| festival | Our town holds a music festival every summer. | festival = 节日活动；我们镇每年夏天都举办音乐节。 |
| film | We watched a funny film on Friday evening. | film = 电影；星期五晚上我们看了一部有趣的电影。 |
| film maker | The young film maker recorded life in the village. | film maker = 电影制作人；这位年轻的电影制作人记录了村里的生活。 |
| firework | A bright firework exploded above the park. | firework = 烟花；一朵明亮的烟花在公园上空绽放。 |
| gallery | The local gallery displays paintings by young artists. | gallery = 画廊；当地画廊展出年轻艺术家的画作。 |
| game | This game is easy to learn but hard to win. | game = 游戏；这个游戏容易学，但很难获胜。 |
| headline | The newspaper headline caught my attention. | headline = 大标题；报纸的大标题引起了我的注意。 |
| hobby | Photography is a relaxing hobby for me. | hobby = 爱好；摄影对我来说是一项令人放松的爱好。 |
| imagination | Use your imagination to finish the story. | imagination = 想象力；发挥你的想象力来完成这个故事。 |
| magazine | I read an article in a science magazine. | magazine = 杂志；我在一本科学杂志上读了一篇文章。 |
| movie | The movie starts in ten minutes. | movie = 电影；电影十分钟后开始。 |
| movie theater | There is a new movie theater near the station. | movie theater = 电影院；车站附近有一家新电影院。 |
| museum | The museum has a room full of dinosaur bones. | museum = 博物馆；博物馆里有一个摆满恐龙骨骼的展厅。 |
| music | I listen to quiet music while I study. | music = 音乐；我学习时会听轻柔的音乐。 |
| mystery | Nobody could explain the mystery of the missing key. | mystery = 谜；没有人能解释钥匙失踪之谜。 |
| newspaper | Dad reads the newspaper every morning. | newspaper = 报纸；爸爸每天早上读报纸。 |
| novel | I am reading an adventure novel about two explorers. | novel = 小说；我正在读一本关于两位探险家的冒险小说。 |
| paint | Paint the sky pale blue and the clouds white. | paint = 绘画；把天空涂成浅蓝色，把云朵涂成白色。 |
| painting | This painting shows boats in a busy harbour. | painting = 画作；这幅画描绘了繁忙港口里的船只。 |
| party | We had a party for my cousin's birthday. | party = 聚会；我们为表弟的生日举办了聚会。 |
| poem | She wrote a short poem about the sea. | poem = 诗；她写了一首关于大海的短诗。 |
| pop | My sister listens to pop on the radio. | pop = 流行音乐；我姐姐用收音机听流行音乐。 |
| program | My favourite science program starts at eight. | program = 节目；我最喜欢的科学节目八点开始。 |
| radio | We heard the weather report on the radio. | radio = 收音机；我们从收音机里听到了天气预报。 |
| series | We watched the first episode of the new series. | series = 系列节目；我们看了这部新系列节目的第一集。 |
| show | The school talent show begins at six. | show = 演出；学校才艺表演六点开始。 |
| show up | Ben promised to show up before the film began. | show up = 露面；本答应在电影开始前到场。 |
| song | The choir sang a cheerful song. | song = 歌曲；合唱团唱了一首欢快的歌曲。 |
| soundtrack | The soundtrack made the final scene more exciting. | soundtrack = 电影配乐；电影配乐让最后一幕更加激动人心。 |
| stage | The actors walked onto the stage together. | stage = 舞台；演员们一起走上舞台。 |
| story | Grandma told us a story about her childhood. | story = 故事；奶奶给我们讲了一个她童年时的故事。 |
| superhero | The superhero wears a red cape in the film. | superhero = 超级英雄；电影里的超级英雄披着红色斗篷。 |
| talent | Nina has a talent for playing the piano. | talent = 才能；尼娜有弹钢琴的天赋。 |
| talk show | The actor spoke about his new film on a talk show. | talk show = 访谈节目；这位演员在访谈节目中谈到了他的新电影。 |
| television | Please switch off the television before you leave. | television = 电视；离开前请关掉电视。 |

- [ ] Create the ledger from all 50 rows.
- [ ] Promote every row with the same normalized key used by `getWordExample()`.
- [ ] Run the targeted tests and verify all pass.
- [ ] Commit with `git commit -m "feat: add reviewed entertainment media examples"`.

### Task 3: Audit, Verify, And Integrate

**Files:**
- Modify if required: `scripts/audit-reviewed-pet-examples.ts`
- Regenerate: `src/lib/generated/pet-word-example-audit.ts`

- [ ] Run `npm run audit:examples` and inspect every flag.
- [ ] Correct real mismatches in both sources; manually confirm only valid synonym or polysemy cases with comments.
- [ ] Verify audit reports 635 reviewed examples and 0 need review.
- [ ] Run `npm test` and `npm run build`.
- [ ] Commit with `git commit -m "test: audit entertainment media batch"`.
- [ ] Merge into `main`, remove the temporary worktree, rerun `npm test` from root, and push `main`.
