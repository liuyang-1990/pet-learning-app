# PET Places, Animals, And Travel Example Batch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 50 reviewed PET/B1 place, animal, and travel examples and complete all three themes.

**Architecture:** Store approved content in `data/example-candidates/places-animals-travel-001.json` and promote identical entries into `getReviewedWordExamples()`. Tests use official vocabulary rows and runtime lookup to prove selected entries, complete-theme coverage, and ambiguous senses.

**Tech Stack:** Next.js 15, TypeScript, Vitest, Vite Node, Google Translate audit script.

## Global Constraints

- Exactly 50 currently missing normalized terms: 25 places terms, 22 animal terms, and 3 travel terms.
- All 26 official places rows, all 23 animal rows, and all 26 travel rows return reviewed sentences after this batch.
- Reviewed registry coverage rises from 735 to 785; accessible official rows rise from 737 to 787.
- Candidate data remains unimported by application code.
- Every entry passes ledger alignment, bilingual audit, full tests, and production build.

---

### Task 1: Add Failing Coverage Tests

**Files:**
- Modify: `src/lib/pet-learning-app.test.ts`

- [ ] Add `placesAnimalsTravelBatch` using the 50 table terms below.
- [ ] Require all selected entries and every row in all three themes to return reviewed sentences, with registry count exactly 785.
- [ ] Add ledger alignment and exact sense assertions for `centre / center`, `corner`, `country`, `public`, `take place`, `bear`, `duck`, `mouse`, `guided`, and `tourism`.
- [ ] Run `npm test -- src/lib/pet-learning-app.test.ts -t "places animals travel"` and verify failure because content is absent.
- [ ] Commit with `git commit -m "test: require places animals travel batch"`.

### Task 2: Create And Promote The Reviewed Entries

**Files:**
- Create: `data/example-candidates/places-animals-travel-001.json`
- Modify: `src/lib/pet-learning-app.ts`

The ledger uses `batchId: places-animals-travel-001`, `status: promoted`, and these exact entries:

| Term | Focus Word | Sentence | Chinese |
| --- | --- | --- | --- |
| address | address | Write your home address at the top of the form. | address = 地址；在表格顶部写下你的家庭地址。 |
| area | area | This is a quiet area near the station. | area = 地区；这是车站附近一个安静的地区。 |
| building | building | The library is the oldest building in our town. | building = 建筑物；图书馆是我们镇上最古老的建筑物。 |
| centre / center | centre | The hotel is in the centre of the city. | centre = 中心；酒店位于市中心。 |
| city | city | More than a million people live in this city. | city = 城市；这座城市居住着一百多万人。 |
| corner | corner | I will meet you at the corner of King Street. | corner = 街角；我会在国王街的街角和你见面。 |
| country | country | Japan is a country in East Asia. | country = 国家；日本是东亚的一个国家。 |
| east | east | The sun rises in the east. | east = 东方；太阳从东方升起。 |
| entrance | entrance | We waited for our guide by the main entrance. | entrance = 入口；我们在正门入口旁等导游。 |
| exit | exit | The emergency exit is at the back of the hall. | exit = 出口；紧急出口在大厅后面。 |
| Australia | Australia | My cousin moved to Australia last year. | Australia = 澳大利亚；我表哥去年搬到了澳大利亚。 |
| location | location | This beach is a perfect location for a picnic. | location = 地点；这个海滩是野餐的理想地点。 |
| neighbourhood | neighbourhood | There are several small parks in our neighbourhood. | neighbourhood = 社区；我们社区里有几个小公园。 |
| north | north | The mountains are in the north of the country. | north = 北部；这些山位于这个国家的北部。 |
| park | park | The children played football in the park. | park = 公园；孩子们在公园里踢足球。 |
| place | place | This cafe is a good place to study. | place = 地方；这家咖啡馆是学习的好地方。 |
| public | public | The garden is open to the public every day. | public = 公众；这个花园每天向公众开放。 |
| region | region | This region is famous for its lakes. | region = 地区；这个地区以湖泊闻名。 |
| south | south | They grow oranges in the south of Spain. | south = 南部；西班牙南部种植橙子。 |
| sports centre | sports centre | We go swimming at the sports centre on Fridays. | sports centre = 体育中心；我们星期五去体育中心游泳。 |
| street | street | There is a post office across the street. | street = 街道；街对面有一家邮局。 |
| take place | take place | The school concert will take place on Thursday. | take place = 举行；学校音乐会将在星期四举行。 |
| town | town | Our town has a busy market on Saturdays. | town = 城镇；我们镇星期六有一个热闹的市场。 |
| village | village | Only two hundred people live in the village. | village = 村庄；这个村庄只有两百人居住。 |
| west | west | Dark clouds were moving in from the west. | west = 西方；乌云正从西方飘来。 |
| animal | animal | Every animal at the shelter needs a safe home. | animal = 动物；收容所里的每只动物都需要一个安全的家。 |
| ant | ant | An ant carried a leaf across the path. | ant = 蚂蚁；一只蚂蚁叼着叶子穿过小路。 |
| bear | bear | We saw a brown bear beside the river. | bear = 熊；我们在河边看到了一只棕熊。 |
| bee | bee | A bee landed on the yellow flower. | bee = 蜜蜂；一只蜜蜂落在黄色花朵上。 |
| bird | bird | A small bird built a nest in the tree. | bird = 鸟；一只小鸟在树上筑了巢。 |
| cat | cat | The cat was asleep under the kitchen table. | cat = 猫；那只猫在厨房桌子下面睡着了。 |
| cow | cow | The farmer feeds each cow early in the morning. | cow = 奶牛；农民一大早给每头奶牛喂食。 |
| dog | dog | Our dog waits by the door when I come home. | dog = 狗；我回家时，我们的狗会在门边等着。 |
| duck | duck | A duck swam across the pond with its young. | duck = 鸭子；一只鸭子带着幼鸭游过池塘。 |
| elephant | elephant | The elephant used its trunk to pick up the branch. | elephant = 大象；大象用鼻子捡起了树枝。 |
| giraffe | giraffe | The giraffe reached the leaves at the top of the tree. | giraffe = 长颈鹿；长颈鹿够到了树顶的叶子。 |
| horse | horse | She learned to ride a horse on the farm. | horse = 马；她在农场学会了骑马。 |
| insect | insect | This insect has bright green wings. | insect = 昆虫；这种昆虫有鲜绿色的翅膀。 |
| lion | lion | The lion rested in the shade during the afternoon. | lion = 狮子；狮子下午在阴凉处休息。 |
| monkey | monkey | The monkey climbed quickly to the top branch. | monkey = 猴子；猴子很快爬到了最高的树枝上。 |
| mouse | mouse | A tiny mouse ran behind the cupboard. | mouse = 老鼠；一只小老鼠跑到了碗柜后面。 |
| penguin | penguin | The penguin kept its egg warm on the ice. | penguin = 企鹅；企鹅在冰面上给蛋保暖。 |
| puppy | puppy | The puppy followed me around the garden. | puppy = 小狗；小狗跟着我在花园里到处走。 |
| rabbit | rabbit | The rabbit disappeared into a hole. | rabbit = 兔子；兔子消失在一个洞里。 |
| snake | snake | The snake lay quietly on a warm rock. | snake = 蛇；蛇安静地趴在一块温暖的岩石上。 |
| tiger | tiger | A tiger can move silently through tall grass. | tiger = 老虎；老虎能悄无声息地穿过高草。 |
| zebra | zebra | Each zebra has a different pattern of stripes. | zebra = 斑马；每匹斑马都有不同的条纹图案。 |
| guided | guided | We joined a guided tour of the old castle. | guided = 有导游的；我们参加了老城堡的导览游。 |
| tourism | tourism | Tourism provides many jobs in this coastal town. | tourism = 旅游业；旅游业为这个海滨小镇提供了许多工作。 |
| tourist information centre | tourist information centre | The tourist information centre gave us a free map. | tourist information centre = 游客信息中心；游客信息中心给了我们一张免费地图。 |

- [ ] Create the ledger from all 50 rows.
- [ ] Promote every row with the normalized key used by `getWordExample()`.
- [ ] Run the targeted tests and verify all pass.
- [ ] Commit with `git commit -m "feat: add reviewed places animals travel examples"`.

### Task 3: Audit, Verify, And Integrate

**Files:**
- Modify if required: `scripts/audit-reviewed-pet-examples.ts`
- Regenerate: `src/lib/generated/pet-word-example-audit.ts`

- [ ] Merge the root translation cache into the worktree cache before the first audit.
- [ ] Run `npm run audit:examples` and inspect every flag.
- [ ] Correct real mismatches in both sources; manually confirm only valid synonym or polysemy cases with comments.
- [ ] Verify audit reports 785 reviewed examples and 0 need review.
- [ ] Run `npm test` and `npm run build`.
- [ ] Commit with `git commit -m "test: audit places animals travel batch"`.
- [ ] Merge into `main`, remove the temporary worktree, rerun `npm test`, and push `main`.
