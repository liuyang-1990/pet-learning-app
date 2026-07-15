# PET Work And Society Example Batch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 50 reviewed PET/B1 work and society examples and make all 42 official work-theme rows accessible.

**Architecture:** Store approved content in `data/example-candidates/work-society-001.json` and promote identical entries into `getReviewedWordExamples()`. Tests prove that 50 unique normalized keys are added, including one `dr` entry that serves both official doctor/Dr row variants.

**Tech Stack:** Next.js 15, TypeScript, Vitest, Vite Node, Google Translate audit script.

## Global Constraints

- Exactly 50 currently missing normalized terms: all 36 unique work keys and 14 society keys.
- The `doctor / Dr` and `Dr / doctor` official rows share the normalized key `dr`; both become accessible through one reviewed entry.
- The 37 currently missing work rows join 5 previously reviewed rows, so all 42 official work rows return reviewed sentences after this batch.
- Reviewed registry coverage rises from at least 635 to at least 685; accessible official rows rise from 636 to 687.
- Candidate data remains unimported by application code.
- Every batch entry passes ledger alignment, bilingual audit, full tests, and production build.

---

### Task 1: Add Failing Coverage Tests

**Files:**
- Modify: `src/lib/pet-learning-app.test.ts`

- [ ] Add `workSocietyBatch` using the 50 table terms below.
- [ ] Require all 50 selected keys and all 42 official work rows to return reviewed sentences, with registry count at least 685.
- [ ] Add exact candidate-ledger alignment and sense assertions for `business`, `doctor / Dr`, `out of work`, `work out`, `admission`, `custom`, and `customs`.
- [ ] Run `npm test -- src/lib/pet-learning-app.test.ts -t "work society"` and verify failure because content is absent.
- [ ] Commit with `git commit -m "test: require work society batch"`.

### Task 2: Create And Promote The Reviewed Entries

**Files:**
- Create: `data/example-candidates/work-society-001.json`
- Modify: `src/lib/pet-learning-app.ts`

The ledger uses `batchId: work-society-001`, `status: promoted`, and these exact entries:

| Term | Focus Word | Sentence | Chinese |
| --- | --- | --- | --- |
| accountant | accountant | The accountant checked the company's bills. | accountant = 会计师；会计师核对了公司的账单。 |
| actor | actor | The actor played a young detective in the film. | actor = 男演员；这位男演员在电影中扮演一名年轻侦探。 |
| actress | actress | The actress spoke to the audience after the play. | actress = 女演员；演出后，这位女演员与观众交谈。 |
| artist | artist | A local artist painted this picture of the harbour. | artist = 艺术家；一位当地艺术家画了这幅港口图。 |
| booking office | booking office | We collected our train tickets from the booking office. | booking office = 售票处；我们从售票处取了火车票。 |
| business | business | Her parents started a small food business. | business = 生意；她父母开创了一家小型食品生意。 |
| businessman | businessman | The businessman travelled abroad to meet a customer. | businessman = 男商人；这位男商人出国去见一位客户。 |
| businesswoman | businesswoman | The businesswoman opened her first shop at twenty-five. | businesswoman = 女商人；这位女商人二十五岁时开了第一家店。 |
| career | career | She hopes to have a career in medicine. | career = 职业生涯；她希望从事医疗工作。 |
| chef | chef | The chef prepared a special meal for the guests. | chef = 厨师；厨师为客人们准备了一顿特别的饭菜。 |
| CV | CV | Send your CV with the job application. | CV = 简历；请把简历和求职申请一起寄出。 |
| dentist | dentist | The dentist checked my teeth and gave me some advice. | dentist = 牙医；牙医检查了我的牙齿并给了我一些建议。 |
| designer | designer | The designer created a comfortable school uniform. | designer = 设计师；设计师设计了一套舒适的校服。 |
| doctor / Dr | doctor | The doctor examined my injured arm. | doctor = 医生；医生检查了我受伤的手臂。 |
| email | email | I sent my manager an email about the meeting. | email = 电子邮件；我给经理发了一封关于会议的电子邮件。 |
| factory | factory | This factory produces parts for electric cars. | factory = 工厂；这家工厂生产电动汽车零件。 |
| farmer | farmer | The farmer grows vegetables and keeps chickens. | farmer = 农民；这位农民种蔬菜并养鸡。 |
| job | job | Mia applied for a summer job at the cafe. | job = 工作；米娅申请了咖啡馆的暑期工作。 |
| journalist | journalist | The journalist interviewed the winning athlete. | journalist = 记者；记者采访了获胜的运动员。 |
| lawyer | lawyer | The lawyer gave the family some legal advice. | lawyer = 律师；律师给了这家人一些法律建议。 |
| mechanic | mechanic | The mechanic repaired our car this morning. | mechanic = 修理工；修理工今天早上修好了我们的汽车。 |
| nurse | nurse | The nurse checked the patient's temperature. | nurse = 护士；护士测量了病人的体温。 |
| on business | on business | My father is in Singapore on business this week. | on business = 因公；我父亲本周因公在新加坡。 |
| out of work | out of work | Jack was out of work for two months. | out of work = 失业；杰克失业了两个月。 |
| pilot | pilot | The pilot landed the plane safely in heavy rain. | pilot = 飞行员；飞行员在大雨中安全降落了飞机。 |
| police | police | The police are investigating the stolen bicycles. | police = 警察；警方正在调查自行车失窃案。 |
| police officer | police officer | A police officer asked us to move the car. | police officer = 警察；一名警察让我们把车开走。 |
| post office | post office | I sent the parcel from the post office. | post office = 邮局；我从邮局寄出了包裹。 |
| profession | profession | Teaching is a profession that requires patience. | profession = 职业；教师是一种需要耐心的职业。 |
| professional | professional | Ask a professional to repair the broken cooker. | professional = 专业人士；请专业人士修理坏掉的炉灶。 |
| secretary | secretary | The secretary arranged a meeting for Friday. | secretary = 秘书；秘书安排了星期五的会议。 |
| shop assistant | shop assistant | The shop assistant helped me find the right size. | shop assistant = 店员；店员帮我找到了合适的尺码。 |
| staff | staff | The hotel staff were friendly and helpful. | staff = 全体员工；酒店员工友好又乐于助人。 |
| work | work | My mother starts work at eight every morning. | work = 工作；我妈妈每天早上八点开始工作。 |
| worker | worker | Each factory worker wears a safety helmet. | worker = 工人；每名工厂工人都戴安全帽。 |
| work out | work out | We need to work out the total cost of the trip. | work out = 算出；我们需要算出这次旅行的总费用。 |
| admission | admission | Admission to the museum is free on Sundays. | admission = 入场；星期天博物馆免费入场。 |
| agency | agency | She found the job through an employment agency. | agency = 中介机构；她通过一家职业介绍机构找到了工作。 |
| company | company | My uncle works for an international software company. | company = 公司；我叔叔在一家国际软件公司工作。 |
| culture | culture | Food is an important part of every culture. | culture = 文化；食物是每种文化的重要组成部分。 |
| custom | custom | Taking off your shoes indoors is a local custom. | custom = 风俗；进屋脱鞋是当地的风俗。 |
| customs | customs | We showed our passports at customs. | customs = 海关；我们在海关出示了护照。 |
| government | government | The government plans to build a new hospital. | government = 政府；政府计划建造一家新医院。 |
| industry | industry | Tourism is an important industry in this region. | industry = 行业；旅游业是这个地区的重要行业。 |
| international | international | Students from twelve countries attended the international conference. | international = 国际的；来自十二个国家的学生参加了这场国际会议。 |
| law | law | The law requires drivers to wear seat belts. | law = 法律；法律要求驾驶员系安全带。 |
| national | national | The national team trained before the match. | national = 国家的；国家队在比赛前进行了训练。 |
| policeman | policeman | The policeman directed traffic near the school. | policeman = 男警察；男警察在学校附近指挥交通。 |
| policewoman | policewoman | The policewoman found the missing child. | policewoman = 女警察；女警察找到了走失的孩子。 |
| politician | politician | The local politician answered questions about the new road. | politician = 政治家；当地政治家回答了有关新道路的问题。 |

- [ ] Create the ledger from all 50 rows.
- [ ] Promote every row with the same normalized key used by `getWordExample()`.
- [ ] Run the targeted tests and verify all pass.
- [ ] Commit with `git commit -m "feat: add reviewed work society examples"`.

### Task 3: Audit, Verify, And Integrate

**Files:**
- Modify if required: `scripts/audit-reviewed-pet-examples.ts`
- Regenerate: `src/lib/generated/pet-word-example-audit.ts`

- [ ] Run `npm run audit:examples` and inspect every flag.
- [ ] Correct real mismatches in both sources; manually confirm only valid synonym or polysemy cases with comments.
- [ ] Verify audit reports 685 reviewed examples and 0 need review.
- [ ] Run `npm test` and `npm run build`.
- [ ] Commit with `git commit -m "test: audit work society batch"`.
- [ ] Merge into `main`, remove the temporary worktree, rerun `npm test` from root, and push `main`.
