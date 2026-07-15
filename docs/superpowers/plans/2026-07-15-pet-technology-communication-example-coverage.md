# PET Technology And Communication Example Batch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 50 reviewed PET/B1 technology and communication examples and make every official technology-theme row accessible.

**Architecture:** Store approved content in `data/example-candidates/technology-communication-001.json` and promote identical entries into `getReviewedWordExamples()`. Tests use the official vocabulary JSON and runtime lookup to prove all selected entries and the complete technology theme are accessible.

**Tech Stack:** Next.js 15, TypeScript, Vitest, Vite Node, Google Translate audit script.

## Global Constraints

- Exactly 50 currently missing normalized terms: all 25 remaining `technology` terms and 25 core `communication` terms.
- All 28 official technology rows return reviewed sentences after this batch.
- Reviewed registry coverage rises from at least 435 to at least 485.
- Candidate data remains unimported by application code.
- Every batch entry passes ledger alignment, bilingual audit, full tests, and production build.

---

### Task 1: Add Failing Coverage Tests

**Files:**
- Modify: `src/lib/pet-learning-app.test.ts`

- [ ] Add `technologyCommunicationBatch` using the 50 table terms below.
- [ ] Require all 50 selected terms and all 28 official technology rows to return reviewed sentences, with registry count at least 485.
- [ ] Add exact candidate-ledger alignment and sense assertions for `application`, `mobile`, `screen`, `advert`, `call`, and `text message`.
- [ ] Run `npm test -- src/lib/pet-learning-app.test.ts -t "technology communication"` and verify failure because content is absent.
- [ ] Commit with `git commit -m "test: require technology communication batch"`.

### Task 2: Create And Promote The Reviewed Entries

**Files:**
- Create: `data/example-candidates/technology-communication-001.json`
- Modify: `src/lib/pet-learning-app.ts`

The ledger uses `batchId: technology-communication-001`, `status: promoted`, and these exact entries:

| Term | Sentence | Chinese |
| --- | --- | --- |
| app | I use a weather app to check tomorrow's forecast. | app = 应用程序；我用天气应用程序查看明天的天气预报。 |
| application | This application helps students practise new vocabulary. | application = 应用程序；这个应用程序帮助学生练习新词汇。 |
| camera | This camera takes clear photos in low light. | camera = 相机；这台相机在光线暗时也能拍出清晰照片。 |
| CD | This CD contains all the songs from the concert. | CD = 光盘；这张光盘收录了演唱会的所有歌曲。 |
| cell phone | Please turn off your cell phone during the film. | cell phone = 手机；电影播放期间请关掉手机。 |
| digital | We bought a digital clock for the kitchen. | digital = 数字式的；我们给厨房买了一个数字时钟。 |
| download | You can download the map before your trip. | download = 下载；旅行前你可以下载地图。 |
| DVD | We watched the film on DVD last night. | DVD = 数字视频光盘；我们昨晚用光盘看了这部电影。 |
| electronic | The library sends electronic reminders for late books. | electronic = 电子的；图书馆会发送电子提醒，通知逾期未还的书。 |
| internet | The internet connection at the hotel was very slow. | internet = 互联网；酒店的网络连接很慢。 |
| laptop | I take my laptop to the library when I study. | laptop = 笔记本电脑；我学习时会把笔记本电脑带到图书馆。 |
| mobile | You can use the mobile version of the website. | mobile = 移动版的；你可以使用这个网站的移动版本。 |
| online | We booked our train tickets online. | online = 在线；我们在网上预订了火车票。 |
| password | Choose a password that is difficult to guess. | password = 密码；选择一个难以猜出的密码。 |
| PC | The new software works on any modern PC. | PC = 个人电脑；这款新软件可以在任何现代个人电脑上运行。 |
| phone | My phone ran out of battery on the way home. | phone = 手机；回家路上我的手机没电了。 |
| screen | The words on the screen are too small to read. | screen = 屏幕；屏幕上的字太小，看不清。 |
| software | We installed new drawing software at school. | software = 软件；我们在学校安装了新的绘图软件。 |
| tablet | She reads electronic books on her tablet. | tablet = 平板电脑；她用平板电脑阅读电子书。 |
| technology | Modern technology makes it easier to work from home. | technology = 技术；现代技术让居家办公更容易。 |
| upload | Please upload your photo before Friday. | upload = 上传；请在星期五前上传你的照片。 |
| video | I made a short video of our school concert. | video = 视频；我为学校音乐会拍了一段短视频。 |
| video clip | The teacher showed us a video clip about space. | video clip = 视频片段；老师给我们看了一段关于太空的视频。 |
| video game | This video game is more fun with two players. | video game = 电子游戏；这款电子游戏两个人玩更有趣。 |
| website | The museum website lists its opening times. | website = 网站；博物馆网站列出了开放时间。 |
| accent | She speaks English with a strong French accent. | accent = 口音；她说英语时带有浓重的法国口音。 |
| advert | I saw an advert for the new sports centre. | advert = 广告；我看到了一则新体育中心的广告。 |
| advertise | The café uses social media to advertise its lunches. | advertise = 做广告；咖啡馆利用社交媒体宣传午餐。 |
| advertisement | The advertisement showed the price of each phone. | advertisement = 广告；这则广告展示了每款手机的价格。 |
| advise | I advise you to save a copy of the document. | advise = 建议；我建议你保存一份文件副本。 |
| announce | The school will announce the competition results tomorrow. | announce = 宣布；学校明天将公布比赛结果。 |
| announcement | We heard an announcement about the delayed train. | announcement = 公告；我们听到了一则关于火车晚点的通知。 |
| ask | I asked the assistant how to reset my password. | ask = 询问；我问工作人员怎样重置密码。 |
| call | Please call me when your train arrives. | call = 打电话；火车到站时请给我打电话。 |
| confirm | Please confirm your email address before continuing. | confirm = 确认；继续操作前请确认你的电子邮箱地址。 |
| conversation | We had a long conversation about online safety. | conversation = 交谈；我们就网络安全进行了长时间交谈。 |
| describe | Can you describe the person you saw? | describe = 描述；你能描述一下你看到的那个人吗？ |
| description | The hotel description says every room has internet access. | description = 描述；酒店说明写着每个房间都能上网。 |
| detail | The website gives details about the course. | detail = 详情；网站提供了课程的详细信息。 |
| dial up | I used to dial up the internet through our phone line. | dial up = 拨号上网；我过去通过家里的电话线上网。 |
| discuss | We need to discuss the problem before replying. | discuss = 讨论；回复前我们需要讨论这个问题。 |
| enquiry | Send your enquiry to the address on the website. | enquiry = 询问；请把你的咨询发送到网站上的地址。 |
| interview | The reporter interviewed the actor after the show. | interview = 采访；演出结束后，记者采访了那位演员。 |
| letter | I wrote a letter to thank my host family. | letter = 信；我写信感谢寄宿家庭。 |
| meaning | I checked the meaning of the word online. | meaning = 含义；我在网上查了这个词的含义。 |
| mention | He forgot to mention the change of meeting time. | mention = 提到；他忘了提到会议时间的变更。 |
| pronounce | How do you pronounce this name? | pronounce = 发音；这个名字怎么读？ |
| pronunciation | Listening to podcasts can improve your pronunciation. | pronunciation = 发音；听播客可以改善你的发音。 |
| reply | I sent a quick reply to her message. | reply = 回复；我很快回复了她的消息。 |
| text message | I sent Dad a text message when I arrived. | text message = 短信；我到达时给爸爸发了一条短信。 |

- [ ] Create the ledger from all 50 rows.
- [ ] Promote every row with the same normalized key used by `getWordExample()`; uppercase focus words retain their official display form.
- [ ] Run the targeted tests and verify all pass.
- [ ] Commit with `git commit -m "feat: add reviewed technology communication examples"`.

### Task 3: Audit, Verify, And Integrate

**Files:**
- Modify if required: `scripts/audit-reviewed-pet-examples.ts`
- Regenerate: `src/lib/generated/pet-word-example-audit.ts`

- [ ] Run `npm run audit:examples` and inspect every flag.
- [ ] Correct real mismatches in both sources; manually confirm only valid synonym or polysemy cases with comments.
- [ ] Verify audit reports 485 reviewed examples and 0 need review.
- [ ] Run `npm test` and `npm run build`.
- [ ] Commit with `git commit -m "test: audit technology communication batch"`.
- [ ] Merge into `main`, remove the temporary worktree, rerun `npm test` from root, and push `main`.
