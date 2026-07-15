# PET Clothing And Materials Example Batch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 50 reviewed PET/B1 clothing, materials, and object examples and complete the clothing and materials themes.

**Architecture:** Store approved content in `data/example-candidates/clothing-materials-001.json` and promote identical entries into `getReviewedWordExamples()`. Tests use official vocabulary rows and runtime lookup to prove the selected entries, complete themes, and ambiguous senses are accessible.

**Tech Stack:** Next.js 15, TypeScript, Vitest, Vite Node, Google Translate audit script.

## Global Constraints

- Exactly 50 currently missing normalized terms: 30 clothing terms, 19 materials terms, and `toy`.
- All 31 official clothing rows and all 24 official materials rows return reviewed sentences after this batch.
- Entertainment coverage rises from 52/54 to 53/54, leaving only `theatre`.
- Reviewed registry coverage rises from 685 to 735; accessible official rows rise from 687 to 737.
- Candidate data remains unimported by application code.
- Every entry passes ledger alignment, bilingual audit, full tests, and production build.

---

### Task 1: Add Failing Coverage Tests

**Files:**
- Modify: `src/lib/pet-learning-app.test.ts`

- [ ] Add `clothingMaterialsBatch` using the 50 table terms below.
- [ ] Require all selected entries, all 31 clothing rows, and all 24 materials rows to return reviewed sentences, with registry count at least 735.
- [ ] Add ledger alignment and exact sense assertions for `dress`, `ring`, `ring back`, `ring up`, `wear out`, `blank`, `display`, `lighter`, and `material`.
- [ ] Run `npm test -- src/lib/pet-learning-app.test.ts -t "clothing materials"` and verify failure because content is absent.
- [ ] Commit with `git commit -m "test: require clothing materials batch"`.

### Task 2: Create And Promote The Reviewed Entries

**Files:**
- Create: `data/example-candidates/clothing-materials-001.json`
- Modify: `src/lib/pet-learning-app.ts`

The ledger uses `batchId: clothing-materials-001`, `status: promoted`, and these exact entries:

| Term | Focus Word | Sentence | Chinese |
| --- | --- | --- | --- |
| boot | boot | One of my walking boots is still wet. | boot = 靴子；我的一只徒步靴还是湿的。 |
| bracelet | bracelet | Emma wore a silver bracelet to the party. | bracelet = 手镯；埃玛戴着一个银手镯参加聚会。 |
| cap | cap | Put on a cap to keep the sun out of your eyes. | cap = 帽子；戴上帽子，别让阳光照到眼睛。 |
| clothes | clothes | I packed enough clothes for the weekend. | clothes = 衣服；我为周末带了足够的衣服。 |
| clothing | clothing | Warm clothing is essential in the mountains. | clothing = 衣物；在山区，保暖衣物必不可少。 |
| coat | coat | Hang your coat by the door. | coat = 外套；把你的外套挂在门边。 |
| dress | dress | She chose a blue dress for the school dance. | dress = 连衣裙；她为学校舞会选了一条蓝色连衣裙。 |
| fashion | fashion | Maya hopes to work in fashion one day. | fashion = 时尚行业；玛雅希望将来从事时尚行业。 |
| glove | glove | I found one glove under the bus seat. | glove = 手套；我在公交车座位下面找到了一只手套。 |
| handbag | handbag | Her keys were at the bottom of her handbag. | handbag = 手提包；她的钥匙在手提包底部。 |
| hat | hat | This wool hat keeps my head warm. | hat = 帽子；这顶羊毛帽能让我的头保持温暖。 |
| jacket | jacket | Take a light jacket because it may get cold. | jacket = 夹克；带一件薄夹克，因为天气可能会变冷。 |
| jeans | jeans | These jeans are too long for me. | jeans = 牛仔裤；这条牛仔裤对我来说太长了。 |
| necklace | necklace | The necklace was a gift from her grandmother. | necklace = 项链；这条项链是她祖母送的礼物。 |
| ring | ring | He gave her a ring for her birthday. | ring = 戒指；他送给她一枚戒指作为生日礼物。 |
| ring back | ring back | I will ring you back after my class. | ring back = 回电话；我下课后会给你回电话。 |
| ring up | ring up | Please ring up the hotel and check our booking. | ring up = 打电话；请给酒店打电话确认我们的预订。 |
| shirt | shirt | Ben wore a clean white shirt to the interview. | shirt = 衬衫；本穿着一件干净的白衬衫去面试。 |
| shoe | shoe | There is a small stone in my shoe. | shoe = 鞋；我的鞋里有一颗小石子。 |
| skirt | skirt | This skirt has two useful pockets. | skirt = 裙子；这条裙子有两个实用的口袋。 |
| sock | sock | I cannot find the other sock. | sock = 袜子；我找不到另一只袜子。 |
| sweatshirt | sweatshirt | I put on a sweatshirt after football practice. | sweatshirt = 运动衫；足球训练后我穿上了一件运动衫。 |
| swimsuit | swimsuit | Remember to pack your swimsuit for the pool. | swimsuit = 泳衣；记得带上去泳池穿的泳衣。 |
| tracksuit | tracksuit | The team arrived wearing matching tracksuits. | tracksuit = 运动服；队员们穿着配套的运动服到达了。 |
| trousers | trousers | These trousers need a new button. | trousers = 裤子；这条裤子需要换一颗新纽扣。 |
| T-shirt | T-shirt | I bought a T-shirt with the festival name on it. | T-shirt = T恤；我买了一件印有节日名称的T恤。 |
| underpants | underpants | Pack clean underpants for each day of the trip. | underpants = 内裤；旅行期间每天都要带一条干净内裤。 |
| underwear | underwear | Keep clean underwear in the top drawer. | underwear = 内衣；把干净内衣放在最上面的抽屉里。 |
| wear | wear | You must wear a helmet when riding this bike. | wear = 穿戴；骑这辆自行车时必须戴头盔。 |
| wear out | wear out | These cheap shoes may wear out quickly. | wear out = 磨坏；这些便宜的鞋可能很快就会磨坏。 |
| blank | blank | Leave this box blank if the question does not apply to you. | blank = 空白的；如果这个问题不适用于你，就把这一栏留空。 |
| card | card | We made a birthday card for our teacher. | card = 卡片；我们为老师做了一张生日卡片。 |
| cotton | cotton | This shirt is made of soft cotton. | cotton = 棉；这件衬衫由柔软的棉制成。 |
| display | display | The museum has a display of old toys. | display = 展览；博物馆有一个旧玩具展览。 |
| equipment | equipment | The school bought new sports equipment. | equipment = 设备；学校购买了新的体育设备。 |
| goods | goods | The shop sells locally made goods. | goods = 商品；这家商店出售当地制造的商品。 |
| ID card | ID card | Show your ID card at the entrance. | ID card = 身份证件；请在入口处出示身份证件。 |
| identity card | identity card | I keep my identity card in my wallet. | identity card = 身份证件；我把身份证件放在钱包里。 |
| leather | leather | These boots are made of brown leather. | leather = 皮革；这双靴子由棕色皮革制成。 |
| lighter | lighter | Keep the lighter away from young children. | lighter = 打火机；让打火机远离年幼的孩子。 |
| liquid | liquid | Water is a liquid at room temperature. | liquid = 液体；水在室温下是液体。 |
| material | material | We chose a strong material for the school bags. | material = 材料；我们为书包选择了一种结实的材料。 |
| metal | metal | The bridge is made of metal. | metal = 金属；这座桥由金属制成。 |
| object | object | The shiny object on the beach was a coin. | object = 物体；海滩上那个闪亮的物体是一枚硬币。 |
| oil | oil | Heat a little oil in the pan. | oil = 油；在锅里加热一点油。 |
| plastic | plastic | Try not to use single-use plastic. | plastic = 塑料；尽量不要使用一次性塑料。 |
| silver | silver | The spoon is made of real silver. | silver = 银；这把勺子由纯银制成。 |
| stone | stone | The old wall was built from local stone. | stone = 石头；这面老墙由当地石料砌成。 |
| wool | wool | This warm scarf is made of wool. | wool = 羊毛；这条暖和的围巾由羊毛制成。 |
| toy | toy | The child pushed a wooden toy train across the floor. | toy = 玩具；孩子推着一列木制玩具火车穿过地板。 |

- [ ] Create the ledger from all 50 rows.
- [ ] Promote every row with the normalized key used by `getWordExample()`.
- [ ] Run the targeted tests and verify all pass.
- [ ] Commit with `git commit -m "feat: add reviewed clothing materials examples"`.

### Task 3: Audit, Verify, And Integrate

**Files:**
- Modify if required: `scripts/audit-reviewed-pet-examples.ts`
- Regenerate: `src/lib/generated/pet-word-example-audit.ts`

- [ ] Run `npm run audit:examples` and inspect every flag.
- [ ] Correct real mismatches in both sources; manually confirm only valid synonym or polysemy cases with comments.
- [ ] Verify audit reports 735 reviewed examples and 0 need review.
- [ ] Run `npm test` and `npm run build`.
- [ ] Commit with `git commit -m "test: audit clothing materials batch"`.
- [ ] Merge into `main`, remove the temporary worktree, rerun `npm test`, and push `main`.
