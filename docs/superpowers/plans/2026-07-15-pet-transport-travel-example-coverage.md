# PET Transport And Travel Example Batch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 50 reviewed PET/B1 transport and travel examples and make every official transport-theme row accessible.

**Architecture:** Store approved content in `data/example-candidates/transport-travel-001.json` and promote identical entries into `getReviewedWordExamples()`. Tests use the official vocabulary JSON and runtime lookup to prove all selected entries and the complete transport theme are accessible.

**Tech Stack:** Next.js 15, TypeScript, Vitest, Vite Node, Google Translate audit script.

## Global Constraints

- Exactly 50 currently missing normalized terms: all 31 remaining `transport` terms and 19 core `travel` terms.
- All 33 official transport rows return reviewed sentences after this batch.
- Reviewed registry coverage rises from at least 385 to at least 435.
- Candidate data remains unimported by application code.
- Every batch entry passes ledger alignment, bilingual audit, full tests, and production build.

---

### Task 1: Add Failing Coverage Tests

**Files:**
- Modify: `src/lib/pet-learning-app.test.ts`

- [ ] Add `transportTravelBatch` using the 50 table terms below.
- [ ] Require all 50 selected terms and all 33 official transport rows to return reviewed sentences, with registry count at least 435.
- [ ] Add exact candidate-ledger alignment and sense assertions for `flight`, `plane`, `platform`, `transport`, `reserve`, and `trip`.
- [ ] Run `npm test -- src/lib/pet-learning-app.test.ts -t "transport travel"` and verify failure because content is absent.
- [ ] Commit with `git commit -m "test: require transport travel batch"`.

### Task 2: Create And Promote The Reviewed Entries

**Files:**
- Create: `data/example-candidates/transport-travel-001.json`
- Modify: `src/lib/pet-learning-app.ts`

The ledger uses `batchId: transport-travel-001`, `status: promoted`, and these exact entries:

| Term | Sentence | Chinese |
| --- | --- | --- |
| aeroplane | Our aeroplane landed ten minutes early. | aeroplane = 飞机；我们的飞机提前十分钟降落。 |
| bicycle | I ride my bicycle to school on sunny days. | bicycle = 自行车；晴天我骑自行车上学。 |
| bike | Mia left her bike outside the library. | bike = 自行车；米娅把自行车停在图书馆外。 |
| boat | We took a small boat across the lake. | boat = 船；我们乘一艘小船穿过湖面。 |
| bus | The bus was full, so we had to stand. | bus = 公共汽车；公共汽车上坐满了人，所以我们只好站着。 |
| bus station | Meet me outside the bus station at noon. | bus station = 公交车站；中午在公交车站外和我会合。 |
| bus stop | The nearest bus stop is across the road. | bus stop = 公共汽车站；最近的公交车站在马路对面。 |
| car | Dad washed the car before our trip. | car = 汽车；旅行前爸爸洗了车。 |
| car park | We left the car in the hotel car park. | car park = 停车场；我们把车停在酒店停车场。 |
| ferry | The ferry takes an hour to reach the island. | ferry = 渡船；渡船需要一小时到达小岛。 |
| flight | Our flight to Madrid leaves at six. | flight = 航班；我们飞往马德里的航班六点起飞。 |
| gas station | We stopped at a gas station to fill the tank. | gas station = 加油站；我们在加油站停车加满油箱。 |
| lorry | A large lorry was blocking the narrow road. | lorry = 卡车；一辆大卡车堵住了狭窄的道路。 |
| motorbike | He wears a helmet whenever he rides his motorbike. | motorbike = 摩托车；他每次骑摩托车都戴头盔。 |
| motorcycle | A police officer arrived on a motorcycle. | motorcycle = 摩托车；一名警察骑摩托车赶到。 |
| motorway | Traffic was slow on the motorway this morning. | motorway = 高速公路；今天早上高速公路上车流缓慢。 |
| petrol station | Is there a petrol station near the airport? | petrol station = 加油站；机场附近有加油站吗？ |
| plane | We could see the mountains from the plane. | plane = 飞机；我们从飞机上能看到群山。 |
| platform | The train to Oxford leaves from platform four. | platform = 站台；开往牛津的火车从四号站台出发。 |
| police station | She took the lost wallet to the police station. | police station = 警察局；她把捡到的钱包送到了警察局。 |
| public transport | Public transport is cheaper than driving in the city. | public transport = 公共交通；在城里乘坐公共交通比开车便宜。 |
| road | Be careful when you cross this busy road. | road = 道路；穿过这条繁忙的道路时要小心。 |
| ship | The ship carried food to the remote island. | ship = 船；这艘船把食物运到偏远的小岛。 |
| subway | We took the subway to the city centre. | subway = 地铁；我们乘地铁去了市中心。 |
| taxi | We called a taxi to take us to the airport. | taxi = 出租车；我们叫了一辆出租车送我们去机场。 |
| traffic | Heavy traffic made us late for the concert. | traffic = 交通；拥堵的交通使我们看演唱会迟到了。 |
| traffic light | Turn left at the next traffic light. | traffic light = 红绿灯；在下一个红绿灯处左转。 |
| train | The train arrived at the station on time. | train = 火车；火车准时到站。 |
| tram | A tram runs from the square to the museum. | tram = 有轨电车；有轨电车从广场开往博物馆。 |
| transport | The city needs better transport for its growing population. | transport = 交通运输；这座城市需要为不断增长的人口提供更好的交通服务。 |
| underground | We travelled by underground during the rush hour. | underground = 地铁；高峰时段我们乘地铁出行。 |
| abroad | My sister plans to study abroad next year. | abroad = 国外；我姐姐计划明年出国学习。 |
| camping | We went camping beside the river last weekend. | camping = 露营；上周末我们在河边露营。 |
| guide | Our guide showed us the oldest part of the city. | guide = 导游；导游带我们参观了城市最古老的区域。 |
| holiday | We spent our summer holiday by the sea. | holiday = 假期；我们在海边度过了暑假。 |
| hostel | The hostel offers cheap rooms for young travellers. | hostel = 青年旅舍；这家青年旅舍为年轻旅行者提供便宜的房间。 |
| hotel | Our hotel was only five minutes from the beach. | hotel = 酒店；我们的酒店离海滩只有五分钟路程。 |
| luggage | Please keep your luggage with you at the airport. | luggage = 行李；在机场请随身看管好行李。 |
| map | I used a map to find the castle. | map = 地图；我用地图找到了城堡。 |
| on holiday | We met a friendly family while we were on holiday. | on holiday = 在度假；我们度假时遇到了友好的一家人。 |
| on vacation | They are on vacation in Canada this week. | on vacation = 在度假；他们这周正在加拿大度假。 |
| reservation | I made a reservation for two nights at the hotel. | reservation = 预订；我在酒店预订了两个晚上的房间。 |
| reserve | You should reserve your train seat in advance. | reserve = 预订；你应该提前预订火车座位。 |
| sightseeing | We spent the morning sightseeing in Rome. | sightseeing = 观光；我们上午在罗马观光。 |
| suitcase | My suitcase was too heavy to carry upstairs. | suitcase = 手提箱；我的手提箱太重，搬不上楼。 |
| tour guide | The tour guide explained the history of the castle. | tour guide = 导游；导游讲解了城堡的历史。 |
| tourist | The tourist asked me for directions to the museum. | tourist = 游客；那位游客向我询问去博物馆的路。 |
| travel | Train travel is often relaxing and comfortable. | travel = 旅行；乘火车旅行通常轻松又舒适。 |
| travel agent | The travel agent helped us find a cheaper flight. | travel agent = 旅行社职员；旅行社职员帮我们找到了一趟更便宜的航班。 |
| trip | Our school trip to the science museum was excellent. | trip = 旅行；学校组织的科学博物馆之行很棒。 |

- [ ] Create the ledger from all 50 rows.
- [ ] Promote every row with the same normalized key used by `getWordExample()`.
- [ ] Run the targeted tests and verify all pass.
- [ ] Commit with `git commit -m "feat: add reviewed transport travel examples"`.

### Task 3: Audit, Verify, And Integrate

**Files:**
- Modify if required: `scripts/audit-reviewed-pet-examples.ts`
- Regenerate: `src/lib/generated/pet-word-example-audit.ts`

- [ ] Run `npm run audit:examples` and inspect every flag.
- [ ] Correct real mismatches in both sources; manually confirm only valid synonym or polysemy cases with comments.
- [ ] Verify audit reports 435 reviewed examples and 0 need review.
- [ ] Run `npm test` and `npm run build`.
- [ ] Commit with `git commit -m "test: audit transport travel batch"`.
- [ ] Merge into `main`, remove the temporary worktree, rerun `npm test` from root, and push `main`.
