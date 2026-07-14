# PET Family People Feelings Example Batch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (- [ ]) syntax for tracking.

**Goal:** Add 50 reviewed PET/B1 examples for family, people, and basic feelings vocabulary.

**Architecture:** Store approved content in data/example-candidates/family-people-feelings-001.json and promote identical entries into getReviewedWordExamples(). Tests use runtime lookup to prove every ledger entry is accessible after normalization.

**Tech Stack:** Next.js 15, TypeScript, Vitest, Vite Node, Google Translate audit script.

## Global Constraints

- Exactly 50 currently missing official terms: 13 family, 23 people, and 14 feelings terms.
- Reviewed coverage rises from at least 235 to at least 285.
- Candidate data remains unimported.
- Every batch entry passes ledger alignment, audit, tests, and build.

---

### Task 1: Add Failing Coverage Tests

**Files:**
- Modify: src/lib/pet-learning-app.test.ts

- [ ] Add familyPeopleFeelingsBatch using the 50 table terms below.
- [ ] Add tests requiring 50 sentences, reviewed count at least 285, and exact candidate-ledger alignment using focusWord, sentence, and chinese.
- [ ] Add exact sense tests for man, Madam, female, and feel like.
- [ ] Run npm test -- src/lib/pet-learning-app.test.ts -t "family people feelings" and verify failure because content is absent.
- [ ] Commit with git commit -m "test: require family people feelings batch".

### Task 2: Create And Promote The Reviewed Entries

**Files:**
- Create: data/example-candidates/family-people-feelings-001.json
- Modify: src/lib/pet-learning-app.ts

The ledger uses batchId family-people-feelings-001, status promoted, and these exact entries:

| Term | Sentence | Chinese |
| --- | --- | --- |
| aunt | My aunt visits us every Sunday afternoon. | aunt = 阿姨；我阿姨每个星期天下午来看我们。 |
| daughter | Their daughter started secondary school this year. | daughter = 女儿；他们的女儿今年开始上中学。 |
| family | My family eats dinner together every evening. | family = 家人；我的家人每天晚上一起吃晚饭。 |
| father | Her father drives her to school on rainy days. | father = 父亲；下雨天她父亲开车送她上学。 |
| grandfather | My grandfather tells us funny stories about his childhood. | grandfather = 祖父；我祖父给我们讲他童年的趣事。 |
| grandmother | His grandmother grows vegetables in her garden. | grandmother = 祖母；他的祖母在花园里种蔬菜。 |
| husband | Her husband works at the hospital near our house. | husband = 丈夫；她丈夫在我们家附近的医院工作。 |
| married | They have been married for ten years. | married = 已婚的；他们已经结婚十年了。 |
| mother | My mother taught me how to make soup. | mother = 母亲；我母亲教我怎样做汤。 |
| son | Their son plays basketball after school. | son = 儿子；他们的儿子放学后打篮球。 |
| teenager | The teenager saved money for a new bicycle. | teenager = 青少年；这名青少年攒钱买一辆新自行车。 |
| uncle | My uncle lives in a town by the sea. | uncle = 叔叔；我叔叔住在一个海边小镇。 |
| wife | His wife is a science teacher. | wife = 妻子；他的妻子是一名科学老师。 |
| adult | An adult must sign this form before the trip. | adult = 成年人；旅行前必须由一名成年人签署这张表。 |
| baby | The baby fell asleep in the car. | baby = 婴儿；婴儿在车里睡着了。 |
| boy | The boy returned the lost wallet to its owner. | boy = 男孩；那个男孩把丢失的钱包还给了失主。 |
| child | Every child needs a safe place to learn. | child = 孩子；每个孩子都需要一个安全的学习场所。 |
| crowd | A large crowd waited outside the stadium. | crowd = 人群；一大群人在体育场外等待。 |
| female | The female athlete won the final race. | female = 女性的；那位女运动员赢得了决赛。 |
| friend | My friend helped me prepare for the exam. | friend = 朋友；我的朋友帮我准备考试。 |
| girl | The girl found a quiet seat on the bus. | girl = 女孩；那个女孩在公共汽车上找到了一个安静的座位。 |
| group | Our group finished the project before lunch. | group = 小组；我们小组在午饭前完成了项目。 |
| hero | The firefighter became a local hero after the rescue. | hero = 英雄；救援后，那名消防员成了当地英雄。 |
| king | The king lived in the old castle. | king = 国王；国王住在那座古老的城堡里。 |
| Madam | Excuse me, Madam, is this seat yours? | Madam = 女士；对不起，女士，这个座位是您的吗？ |
| male | The male bird has bright blue feathers. | male = 雄性的；雄鸟有鲜蓝色的羽毛。 |
| man | A man helped us carry the heavy box. | man = 男人；一名男子帮我们搬了那个重箱子。 |
| member | Each member of the team received a medal. | member = 成员；队里的每个成员都获得了一枚奖牌。 |
| Mr | Mr Brown teaches us English on Mondays. | Mr = 先生；布朗先生每星期一教我们英语。 |
| Mrs | Mrs Green lives in the flat above ours. | Mrs = 夫人；格林夫人住在我们楼上的公寓。 |
| Ms | Ms Lee is the new school librarian. | Ms = 女士；李女士是学校新来的图书管理员。 |
| people | Many people use this park at weekends. | people = 人们；周末很多人使用这个公园。 |
| person | Only one person knew the correct answer. | person = 人；只有一个人知道正确答案。 |
| queen | The queen opened the new hospital. | queen = 女王；女王为新医院揭幕。 |
| role | My role in the play is a young doctor. | role = 角色；我在戏剧中扮演一名年轻医生。 |
| woman | The woman at the desk answered my question. | woman = 女人；桌旁的那位女士回答了我的问题。 |
| afraid | I was afraid when I heard the loud noise. | afraid = 害怕的；听到巨响时我很害怕。 |
| angry | Dad was angry because I broke the window. | angry = 生气的；因为我打破了窗户，爸爸很生气。 |
| ashamed | I felt ashamed after I told the lie. | ashamed = 惭愧的；说谎后我感到很惭愧。 |
| awful | The soup tasted awful, so I could not finish it. | awful = 糟糕的；汤的味道很糟，所以我没能喝完。 |
| bored | We felt bored during the long delay. | bored = 无聊的；长时间延误期间我们感到很无聊。 |
| boring | The film was boring, and several people left early. | boring = 无聊的；电影很无聊，有几个人提前离开了。 |
| bother | Does the noise from the road bother you? | bother = 烦扰；路上的噪音会打扰你吗？ |
| comfortable | This chair is comfortable enough for reading. | comfortable = 舒服的；这把椅子坐着看书很舒服。 |
| confused | I felt confused by the complicated instructions. | confused = 困惑的；复杂的说明让我感到困惑。 |
| danger | The sign warned swimmers about the danger. | danger = 危险；标志提醒游泳者注意危险。 |
| excited | The children were excited about the school trip. | excited = 兴奋的；孩子们对学校旅行感到兴奋。 |
| exciting | The final match was exciting until the last minute. | exciting = 令人兴奋的；决赛直到最后一分钟都很精彩。 |
| fear | Her fear of dogs began when she was young. | fear = 害怕；她对狗的恐惧从小时候就开始了。 |
| feel like | I feel like having some hot soup. | feel like = 想要；我想喝一些热汤。 |

- [ ] Create the ledger from all 50 rows.
- [ ] Promote all rows with normalized lowercase keys; feel like uses feellike.
- [ ] Run the targeted tests and verify all pass.
- [ ] Commit with git commit -m "feat: add reviewed family people feelings examples".

### Task 3: Audit, Verify, And Integrate

- [ ] Run npm run audit:examples and inspect every flag.
- [ ] Correct real mismatches in both sources; manually confirm only valid polysemous senses with comments.
- [ ] Verify audit reports 285 reviewed examples and 0 need review.
- [ ] Run npm test and npm run build.
- [ ] Commit with git commit -m "test: audit family people feelings batch".
- [ ] Merge into main, remove the temporary worktree, rerun npm test from root, and push main.

