# PET Shopping And Money Example Batch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 50 reviewed PET/B1 shopping and money examples and make every official shopping- and money-theme row accessible.

**Architecture:** Store approved content in `data/example-candidates/shopping-money-001.json` and promote identical entries into `getReviewedWordExamples()`. Tests use the official vocabulary JSON and runtime lookup to prove all selected entries and both complete themes are accessible.

**Tech Stack:** Next.js 15, TypeScript, Vitest, Vite Node, Google Translate audit script.

## Global Constraints

- Exactly 50 currently missing normalized terms: all 28 `shopping` terms, all 17 `money` terms, and 5 closely related terms.
- All 28 official shopping rows and all 17 official money rows return reviewed sentences after this batch.
- Reviewed registry coverage rises from at least 485 to at least 535.
- Candidate data remains unimported by application code.
- Every batch entry passes ledger alignment, bilingual audit, full tests, and production build.

---

### Task 1: Add Failing Coverage Tests

**Files:**
- Modify: `src/lib/pet-learning-app.test.ts`

- [ ] Add `shoppingMoneyBatch` using the 50 table terms below.
- [ ] Require all 50 selected terms, all 28 shopping rows, and all 17 money rows to return reviewed sentences, with registry count at least 535.
- [ ] Add exact candidate-ledger alignment and sense assertions for `mall`, `order`, `account`, `save`, `pound`, and `change`.
- [ ] Run `npm test -- src/lib/pet-learning-app.test.ts -t "shopping money"` and verify failure because content is absent.
- [ ] Commit with `git commit -m "test: require shopping money batch"`.

### Task 2: Create And Promote The Reviewed Entries

**Files:**
- Create: `data/example-candidates/shopping-money-001.json`
- Modify: `src/lib/pet-learning-app.ts`

The ledger uses `batchId: shopping-money-001`, `status: promoted`, and these exact entries:

| Term | Sentence | Chinese |
| --- | --- | --- |
| buy | I need to buy a new notebook for school. | buy = 购买；我需要为上学买一本新笔记本。 |
| cash | The café only accepts cash. | cash = 现金；这家咖啡馆只收现金。 |
| cash machine | I took some money out of the cash machine. | cash machine = 自动取款机；我从自动取款机取了一些钱。 |
| cheap | These trainers were cheap but very comfortable. | cheap = 便宜的；这双运动鞋很便宜，但穿着很舒服。 |
| cost | How much does this jacket cost? | cost = 价钱；这件夹克多少钱？ |
| customer | The assistant helped a customer find the right size. | customer = 顾客；店员帮助一位顾客找到了合适的尺码。 |
| department store | We bought the lamp at a department store. | department store = 百货商店；我们在一家百货商店买了这盏灯。 |
| expensive | That restaurant is too expensive for us. | expensive = 昂贵的；那家餐馆对我们来说太贵了。 |
| for sale | The old bicycle is for sale. | for sale = 待售；那辆旧自行车正在出售。 |
| grocery store | I stopped at the grocery store to buy milk. | grocery store = 食品店；我在食品店停下来买牛奶。 |
| in order | Please put the books in order by size. | in order = 按顺序；请按大小顺序摆放这些书。 |
| in order to | I saved money in order to buy a laptop. | in order to = 为了；我存钱是为了买一台笔记本电脑。 |
| mall | We met near the entrance to the shopping mall. | mall = 购物中心；我们在购物中心入口附近见面。 |
| market | Fresh fruit is cheaper at the local market. | market = 市场；当地市场的新鲜水果更便宜。 |
| on sale | These shoes are on sale this week. | on sale = 打折出售；这双鞋本周打折出售。 |
| order | I ordered a birthday cake from the bakery. | order = 订购；我从面包店订购了一个生日蛋糕。 |
| out of order | The cash machine is out of order. | out of order = 出故障；自动取款机坏了。 |
| parcel | A parcel arrived for you this morning. | parcel = 包裹；今天早上有你的一个包裹送到。 |
| pay | Can I pay by credit card? | pay = 付款；我可以用信用卡付款吗？ |
| price | The price of the ticket includes lunch. | price = 价格；票价包含午餐。 |
| queue | We waited in a long queue at the checkout. | queue = 队列；我们在收银台排了很长的队。 |
| receipt | Keep the receipt in case you need to return the shirt. | receipt = 收据；保留收据，以防你需要退掉这件衬衫。 |
| sale | The shop has a summer sale every July. | sale = 促销；这家商店每年七月都有夏季促销。 |
| sell | They sell fresh bread every morning. | sell = 出售；他们每天早上出售新鲜面包。 |
| shop | This shop closes at six on Saturdays. | shop = 商店；这家商店星期六六点关门。 |
| shopping | We went shopping for school clothes. | shopping = 购物；我们去买上学穿的衣服。 |
| store | The store offers free delivery on large items. | store = 商店；这家商店为大件商品提供免费送货。 |
| supermarket | The supermarket is busy on Friday evenings. | supermarket = 超市；超市星期五晚上很忙。 |
| account | I checked the balance in my account before paying the bill. | account = 账户；付账前我查看了账户余额。 |
| afford | We cannot afford a new car this year. | afford = 买得起；今年我们买不起新车。 |
| bank | I went to the bank to change some money. | bank = 银行；我去银行兑换了一些钱。 |
| bank account | My wages are paid into my bank account. | bank account = 银行账户；我的工资会存入银行账户。 |
| bill | Could we have the bill, please? | bill = 账单；请给我们账单好吗？ |
| borrow | Can I borrow ten pounds until tomorrow? | borrow = 借入；我可以借十英镑到明天吗？ |
| cent | The stamp costs fifty cents. | cent = 分；这枚邮票售价五十分。 |
| coin | I found a coin under the table. | coin = 硬币；我在桌子下面发现了一枚硬币。 |
| dollar | This sandwich costs five dollars. | dollar = 美元；这个三明治五美元。 |
| euro | The museum ticket costs twelve euros. | euro = 欧元；博物馆门票十二欧元。 |
| lend | Could you lend me some money for lunch? | lend = 借给；你能借给我一些午饭钱吗？ |
| money | I do not have enough money for both books. | money = 钱；我的钱不够买这两本书。 |
| pocket money | Sam saves half of his pocket money each week. | pocket money = 零用钱；萨姆每周把一半零用钱存起来。 |
| pound | The book only cost one pound. | pound = 英镑；这本书只花了一英镑。 |
| save | I am saving for a new phone. | save = 存钱；我正在存钱买一部新手机。 |
| value | This phone offers good value for the price. | value = 价值；这部手机按这个价格来说很划算。 |
| worth | The painting is worth more than a thousand pounds. | worth = 值...的；这幅画价值一千多英镑。 |
| change | The cashier gave me the wrong change. | change = 找回的零钱；收银员找错了零钱给我。 |
| credit card | I used my credit card to book the hotel. | credit card = 信用卡；我用信用卡预订了酒店。 |
| wallet | I keep my bank cards in my wallet. | wallet = 钱包；我把银行卡放在钱包里。 |
| discount | Students receive a ten percent discount. | discount = 折扣；学生可享受九折优惠。 |
| cheque | He paid the bill by cheque. | cheque = 支票；他用支票付了账单。 |

- [ ] Create the ledger from all 50 rows.
- [ ] Promote every row with the same normalized key used by `getWordExample()`.
- [ ] Run the targeted tests and verify all pass.
- [ ] Commit with `git commit -m "feat: add reviewed shopping money examples"`.

### Task 3: Audit, Verify, And Integrate

**Files:**
- Modify if required: `scripts/audit-reviewed-pet-examples.ts`
- Regenerate: `src/lib/generated/pet-word-example-audit.ts`

- [ ] Run `npm run audit:examples` and inspect every flag.
- [ ] Correct real mismatches in both sources; manually confirm only valid synonym or polysemy cases with comments.
- [ ] Verify audit reports 535 reviewed examples and 0 need review.
- [ ] Run `npm test` and `npm run build`.
- [ ] Commit with `git commit -m "test: audit shopping money batch"`.
- [ ] Merge into `main`, remove the temporary worktree, rerun `npm test` from root, and push `main`.
