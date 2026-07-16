# PET Ideas 002 Example Batch Implementation Plan

**Goal:** Add 50 reviewed PET/B1 examples for the second remaining ideas-theme cluster.

**Architecture:** Store approved content in `data/example-candidates/ideas-002.json` and promote identical entries into `getReviewedWordExamples()`. Keep candidate data unimported by runtime code and verify every entry through coverage, ledger, sense, bilingual audit, test, and build gates.

**Tech Stack:** Next.js 15, TypeScript, Vitest, Vite Node, Google Translate audit script.

## Global Constraints

- Exactly 50 currently missing official ideas terms, from `experienced` through `quality` in vocabulary order.
- Reviewed registry coverage rises from 985 to 1035; accessible official rows rise from 990 to 1040.
- Ideas-theme accessible coverage rises from 58/133 to 108/133.
- Candidate data remains unimported by application code.
- Every entry passes ledger alignment, intended-sense checks, bilingual audit, full tests, and production build.

---

### Task 1: Add Failing Coverage Tests

**Files:**
- Modify: `src/lib/pet-learning-app.test.ts`

- [ ] Add `ideasSecondBatch` using the 50 table terms below.
- [ ] Require all selected terms to return reviewed sentences, registry count 1035, and ideas coverage 108/133.
- [ ] Add candidate-ledger alignment and exact sense assertions.
- [ ] Run the targeted tests and verify failure because content is absent.
- [ ] Commit with `git commit -m "test: require second ideas example batch"`.

### Task 2: Create And Promote The Reviewed Entries

**Files:**
- Create: `data/example-candidates/ideas-002.json`
- Modify: `src/lib/pet-learning-app.ts`

The ledger uses `batchId: ideas-002`, `status: promoted`, and these exact entries:

| Term | Focus Word | Sentence | Chinese |
| --- | --- | --- | --- |
| experienced | experienced | We need an experienced guide for the mountain walk. | experienced = 有经验的；这次山间徒步需要一位有经验的向导。 |
| explanation | explanation | Her explanation made the difficult rule easy to understand. | explanation = 解释；她的解释让这条复杂的规则变得容易理解。 |
| fiction | fiction | This story is fiction, but it feels realistic. | fiction = 虚构故事；这个故事是虚构的，但感觉很真实。 |
| fitness | fitness | Cycling to school has improved my fitness. | fitness = 体能；骑自行车上学提高了我的体能。 |
| friendship | friendship | Their friendship began on the first day of school. | friendship = 友谊；他们的友谊始于开学第一天。 |
| generation | generation | People of my grandparents' generation wrote more letters. | generation = 一代人；我祖父母那一代人写更多书信。 |
| glance | glance | I took a quick glance at the timetable. | glance = 一瞥；我快速看了一眼时间表。 |
| graduation | graduation | Her family came to the graduation ceremony. | graduation = 毕业典礼；她的家人来参加毕业典礼。 |
| happiness | happiness | Spending time with friends brings me happiness. | happiness = 快乐；和朋友共度时光给我带来快乐。 |
| identification | identification | You must show identification before entering the building. | identification = 身份证明；进入大楼前必须出示身份证明。 |
| illness | illness | He missed two weeks of school because of an illness. | illness = 疾病；他因为生病缺了两周课。 |
| immigration | immigration | The museum has an exhibition about immigration to the city. | immigration = 移民；博物馆有一个关于移民来到这座城市的展览。 |
| importance | importance | The coach explained the importance of regular practice. | importance = 重要性；教练解释了定期训练的重要性。 |
| improvement | improvement | There has been a clear improvement in her pronunciation. | improvement = 进步；她的发音有了明显进步。 |
| in advance | in advance | Book your tickets in advance to get a lower price. | in advance = 提前；提前订票可以获得更低的价格。 |
| in case | in case | Take an umbrella in case it rains later. | in case = 以防；带把伞，以防稍后下雨。 |
| influence | influence | Music has a strong influence on his paintings. | influence = 影响；音乐对他的绘画有很大影响。 |
| information | information | The website provides useful information about the course. | information = 信息；这个网站提供有关课程的实用信息。 |
| instance | instance | For instance, you could travel by train instead. | instance = 例子；例如，你可以改乘火车。 |
| instructions | instructions | Read the instructions before using the machine. | instructions = 使用说明；使用机器前请阅读说明。 |
| instrument | instrument | The piano was the first instrument she learned to play. | instrument = 乐器；钢琴是她学会演奏的第一种乐器。 |
| introduction | introduction | The book begins with a short introduction to the subject. | introduction = 导论；这本书以一段简短的主题导论开篇。 |
| invention | invention | The bicycle was an important invention. | invention = 发明；自行车是一项重要发明。 |
| invitation | invitation | I received an invitation to Maya's birthday party. | invitation = 邀请函；我收到了玛雅生日聚会的邀请函。 |
| licence | licence | The restaurant has a licence to serve food outdoors. | licence = 许可证；这家餐厅有在户外供应食物的许可证。 |
| matter | matter | We discussed the matter after class. | matter = 事情；我们课后讨论了这件事。 |
| membership | membership | Gym membership costs twenty pounds a month. | membership = 会员资格；健身房会员资格每月收费二十英镑。 |
| method | method | This method makes new words easier to remember. | method = 方法；这种方法让新单词更容易记住。 |
| moment | moment | Please wait a moment while I check your booking. | moment = 片刻；请稍等片刻，我查看一下你的预订。 |
| monument | monument | The monument was built to remember local soldiers. | monument = 纪念碑；这座纪念碑是为纪念当地士兵而建的。 |
| nationality | nationality | The form asks for your name and nationality. | nationality = 国籍；表格要求填写你的姓名和国籍。 |
| occupation | occupation | Please write your occupation on the application form. | occupation = 职业；请在申请表上填写你的职业。 |
| operation | operation | My grandfather is recovering after his knee operation. | operation = 手术；我祖父做完膝盖手术后正在康复。 |
| opportunity | opportunity | The school trip gave us an opportunity to practise French. | opportunity = 机会；学校旅行给了我们练习法语的机会。 |
| option | option | Taking the early train is our best option. | option = 选择；乘早班火车是我们最好的选择。 |
| organisation | organisation | She works for an organisation that protects wildlife. | organisation = 组织；她为一个保护野生动物的组织工作。 |
| pavement | pavement | Keep your bicycle off the pavement. | pavement = 人行道；不要在人行道上骑自行车。 |
| pence | pence | The postcard cost ninety pence. | pence = 便士；这张明信片售价九十便士。 |
| performance | performance | The audience enjoyed the band's final performance. | performance = 演出；观众很喜欢乐队的最后一场演出。 |
| pity | pity | It is a pity that you cannot come with us. | pity = 遗憾；你不能和我们一起来，真遗憾。 |
| population | population | The town has a population of about twenty thousand. | population = 人口；这个镇大约有两万人口。 |
| position | position | Move the chair into a more comfortable position. | position = 位置；把椅子移到一个更舒适的位置。 |
| possibility | possibility | There is a possibility that the flight will be delayed. | possibility = 可能性；航班有可能延误。 |
| power | power | The storm left the village without power. | power = 电力；暴风雨导致村庄停电。 |
| preparation | preparation | Good preparation helped us finish the project on time. | preparation = 准备；充分的准备帮助我们按时完成项目。 |
| prescription | prescription | The doctor gave me a prescription for some medicine. | prescription = 处方；医生给我开了一张药物处方。 |
| presentation | presentation | Nina gave a presentation about climate change. | presentation = 演讲；尼娜做了一场关于气候变化的演讲。 |
| production | production | The factory increased its production of bicycles. | production = 产量；这家工厂提高了自行车产量。 |
| qualification | qualification | A teaching qualification is required for this job. | qualification = 资格证书；这份工作要求具备教师资格证书。 |
| quality | quality | The quality of the food was excellent. | quality = 质量；食物的质量非常好。 |

- [ ] Create the ledger from all 50 rows.
- [ ] Promote every row with the normalized key used by `getWordExample()`.
- [ ] Run the targeted tests and verify all pass.
- [ ] Commit with `git commit -m "feat: add second reviewed ideas examples"`.

### Task 3: Audit, Verify, And Integrate

**Files:**
- Modify if required: `scripts/audit-reviewed-pet-examples.ts`
- Regenerate: `src/lib/generated/pet-word-example-audit.ts`

- [ ] Copy the root translation cache into the worktree before the first audit.
- [ ] Run `npm run audit:examples` and inspect every flag.
- [ ] Correct real mismatches in plan, ledger, and registry; manually confirm only valid contextual senses or synonyms with comments.
- [ ] Verify audit reports 1035 reviewed examples and 0 need review.
- [ ] Run `npm test` and `npm run build`.
- [ ] Commit with `git commit -m "test: audit second ideas example batch"`.
- [ ] Merge cache back to root, merge into `main`, clean the worktree, rerun tests, push, and verify service health.
