# PET Food And Dining Example Batch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 50 reviewed PET/B1 food and dining examples and make every official food-theme row accessible.

**Architecture:** Store approved content in `data/example-candidates/food-dining-001.json` and promote identical entries into `getReviewedWordExamples()`. Tests use the official vocabulary JSON and runtime lookup to prove all selected entries and the complete food theme are accessible.

**Tech Stack:** Next.js 15, TypeScript, Vitest, Vite Node, Google Translate audit script.

## Global Constraints

- Exactly 50 currently missing normalized terms: all 34 remaining `food` terms and 16 dining or kitchen terms.
- All 39 official food rows return reviewed sentences after this batch.
- Reviewed registry coverage rises from at least 535 to at least 585.
- Candidate data remains unimported by application code.
- Every batch entry passes ledger alignment, bilingual audit, full tests, and production build.

---

### Task 1: Add Failing Coverage Tests

**Files:**
- Modify: `src/lib/pet-learning-app.test.ts`

- [ ] Add `foodDiningBatch` using the 50 table terms below.
- [ ] Require all 50 selected terms and all 39 official food rows to return reviewed sentences, with registry count at least 585.
- [ ] Add exact candidate-ledger alignment and sense assertions for `drink`, `meal`, `traffic jam`, `dish`, `glass`, and `cook`.
- [ ] Run `npm test -- src/lib/pet-learning-app.test.ts -t "food dining"` and verify failure because content is absent.
- [ ] Commit with `git commit -m "test: require food dining batch"`.

### Task 2: Create And Promote The Reviewed Entries

**Files:**
- Create: `data/example-candidates/food-dining-001.json`
- Modify: `src/lib/pet-learning-app.ts`

The ledger uses `batchId: food-dining-001`, `status: promoted`, and these exact entries:

| Term | Sentence | Chinese |
| --- | --- | --- |
| bean | Add a few beans to the salad. | bean = 豆子；在沙拉里加几颗豆子。 |
| bread | This bread is still warm from the oven. | bread = 面包；这个面包刚出炉还热着。 |
| burger | I ordered a chicken burger and a salad. | burger = 汉堡包；我点了一个鸡肉汉堡和一份沙拉。 |
| cake | Mum baked a chocolate cake for my birthday. | cake = 蛋糕；妈妈为我的生日烤了一个巧克力蛋糕。 |
| cheese | Would you like some cheese in your sandwich? | cheese = 奶酪；你的三明治里要加些奶酪吗？ |
| chicken | We had chicken and rice for dinner. | chicken = 鸡肉；我们晚餐吃了鸡肉和米饭。 |
| coffee | My dad drinks coffee without sugar. | coffee = 咖啡；我爸爸喝咖啡不加糖。 |
| dinner | We usually have dinner at seven. | dinner = 晚餐；我们通常七点吃晚餐。 |
| drink | Would you like a cold drink with your meal? | drink = 饮料；你用餐时想喝杯冷饮吗？ |
| egg | I boiled an egg for breakfast. | egg = 鸡蛋；我早餐煮了一个鸡蛋。 |
| fast food | Eating fast food every day is not healthy. | fast food = 快餐；每天吃快餐不健康。 |
| fish | The restaurant serves fresh fish from the lake. | fish = 鱼；这家餐馆供应湖里的鲜鱼。 |
| food | We took enough food for the whole trip. | food = 食物；我们带了足够整个旅程吃的食物。 |
| French fries | The children shared a plate of French fries. | French fries = 炸薯条；孩子们分着吃了一盘炸薯条。 |
| hungry | I was hungry after swimming for an hour. | hungry = 饥饿的；游了一个小时后我饿了。 |
| ice cream | We bought ice cream on the way to the beach. | ice cream = 冰淇淋；去海滩的路上我们买了冰淇淋。 |
| jam | I spread strawberry jam on my toast. | jam = 果酱；我在烤面包上抹了草莓果酱。 |
| juice | She poured some orange juice into a glass. | juice = 果汁；她往玻璃杯里倒了一些橙汁。 |
| lunch | I packed a sandwich for lunch. | lunch = 午餐；我带了一个三明治当午餐。 |
| meal | Breakfast is the most important meal of my day. | meal = 一餐；早餐是我一天中最重要的一餐。 |
| meat | This dish contains meat, so it is not vegetarian. | meat = 肉；这道菜含肉，所以不是素食。 |
| mineral water | We ordered two bottles of mineral water. | mineral water = 矿泉水；我们点了两瓶矿泉水。 |
| pizza | We made pizza together on Saturday night. | pizza = 披萨；星期六晚上我们一起做了披萨。 |
| potato | Cut the potato into small pieces before cooking it. | potato = 土豆；烹饪前把土豆切成小块。 |
| rice | The rice will be ready in ten minutes. | rice = 米饭；米饭十分钟后就好。 |
| salad | This salad has tomatoes, cheese, and olives. | salad = 沙拉；这份沙拉里有西红柿、奶酪和橄榄。 |
| salt | Add a little salt to the soup. | salt = 盐；在汤里加一点盐。 |
| soup | The vegetable soup warmed us up. | soup = 汤；蔬菜汤让我们暖和起来。 |
| sugar | There is too much sugar in this drink. | sugar = 糖；这杯饮料里的糖太多了。 |
| supper | We had a light supper before the concert. | supper = 晚餐；音乐会前我们吃了一顿简单的晚餐。 |
| tea | Would you like tea or coffee? | tea = 茶；你想喝茶还是咖啡？ |
| thirsty | Take some water because the walk may make you thirsty. | thirsty = 口渴的；带些水，因为走路可能会让你口渴。 |
| traffic jam | We missed lunch because of a long traffic jam. | traffic jam = 交通堵塞；我们因为长时间堵车错过了午餐。 |
| water | Drink plenty of water after exercise. | water = 水；运动后要多喝水。 |
| bowl | She ate a bowl of soup for lunch. | bowl = 碗；她午餐喝了一碗汤。 |
| cup | I made a cup of tea for Grandma. | cup = 杯；我给奶奶泡了一杯茶。 |
| dish | This vegetable dish is easy to prepare. | dish = 菜肴；这道蔬菜菜品很容易做。 |
| glass | He poured me a glass of water. | glass = 玻璃杯；他给我倒了一杯水。 |
| knife | Use a sharp knife to cut the bread. | knife = 刀；用一把锋利的刀切面包。 |
| menu | The waiter brought us the menu. | menu = 菜单；服务员把菜单拿给我们。 |
| plate | Put the sandwiches on a large plate. | plate = 盘子；把三明治放在一个大盘子里。 |
| spoon | I need a spoon for my soup. | spoon = 勺子；我喝汤需要一把勺子。 |
| waiter | The waiter took our order. | waiter = 男服务员；男服务员记下了我们点的菜。 |
| waitress | The waitress brought us two coffees. | waitress = 女服务员；女服务员给我们端来两杯咖啡。 |
| mug | He drinks hot chocolate from a large mug. | mug = 马克杯；他用一个大马克杯喝热巧克力。 |
| recipe | This recipe makes enough soup for four people. | recipe = 食谱；这份食谱做出的汤够四个人喝。 |
| cook | My uncle works as a cook in a hotel. | cook = 厨师；我叔叔在一家酒店当厨师。 |
| cooker | Turn off the cooker when the soup is ready. | cooker = 炉灶；汤煮好后关掉炉灶。 |
| kettle | Put the kettle on and make some tea. | kettle = 水壶；把水壶烧上，泡些茶。 |
| pan | Heat the oil in a large pan. | pan = 平底锅；在一个大平底锅里把油加热。 |

- [ ] Create the ledger from all 50 rows.
- [ ] Promote every row with the same normalized key used by `getWordExample()`.
- [ ] Run the targeted tests and verify all pass.
- [ ] Commit with `git commit -m "feat: add reviewed food dining examples"`.

### Task 3: Audit, Verify, And Integrate

**Files:**
- Modify if required: `scripts/audit-reviewed-pet-examples.ts`
- Regenerate: `src/lib/generated/pet-word-example-audit.ts`

- [ ] Run `npm run audit:examples` and inspect every flag.
- [ ] Correct real mismatches in both sources; manually confirm only valid synonym or polysemy cases with comments.
- [ ] Verify audit reports 585 reviewed examples and 0 need review.
- [ ] Run `npm test` and `npm run build`.
- [ ] Commit with `git commit -m "test: audit food dining batch"`.
- [ ] Merge into `main`, remove the temporary worktree, rerun `npm test` from root, and push `main`.
