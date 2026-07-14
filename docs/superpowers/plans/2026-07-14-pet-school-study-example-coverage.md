# PET School and Study Example Coverage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (- [ ]) syntax for tracking.

**Goal:** Add 50 reviewed PET/B1 examples for school and study vocabulary without exposing unreviewed examples to learners.

**Architecture:** The candidate ledger remains separate from application code. The same reviewed entries are promoted into getReviewedWordExamples(); getWordExample() remains reviewed-only. The audit script regenerates the checked learner-facing registry.

**Tech Stack:** Next.js 15, TypeScript, Vitest, Vite Node, Google Translate audit script.

## Global Constraints

- Learner-facing examples must stay reviewed-only.
- Candidate data must not be imported by application code.
- The batch covers exactly 50 terms and raises the reviewed minimum from 135 to 185.
- Each Chinese value uses term = gloss；sentence translation.
- Polysemous terms use their school or study sense.
- generatedWordExamples remains {}.
- npm run audit:examples, npm test, and npm run build must pass before completion.

---

## File Structure

- Modify src/lib/pet-learning-app.test.ts: require all 50 new reviewed examples and exact examples for ambiguous terms.
- Create data/example-candidates/school-study-001.json: review ledger only; it is not application input.
- Modify src/lib/pet-learning-app.ts: add the reviewed entries inside getReviewedWordExamples().
- Regenerate src/lib/generated/pet-word-example-audit.ts through the audit script.
- Modify scripts/audit-reviewed-pet-examples.ts only for confirmed false positives caused by an official polysemous Chinese gloss.

### Task 1: Lock The Batch In Tests

**Files:**
- Modify: src/lib/pet-learning-app.test.ts

**Interfaces:**
- Consumes: getReviewedWordExamples(): Record<string, WordExample>.
- Consumes: getWordExample(word: VocabularyItem): WordExample.
- Produces: a 50-term learner-facing example regression contract.

- [ ] **Step 1: Add the selected term constant after firstNatureWeatherBatch**

~~~ts
const schoolStudyBatch = [
  "answer", "article", "bookcase", "bookshelf", "chapter", "college", "course",
  "dictionary", "education", "essay", "calendar", "exercise", "explain",
  "grammar", "learn", "mark", "maths / mathematics", "mistake", "note", "notebook",
  "paper", "pencil", "pencil case", "pupil", "read", "reading", "research", "revise",
  "science", "spelling", "study", "teach", "teaching", "test", "textbook", "university",
  "write", "write down", "calculator", "computer", "desk", "document", "file", "keyboard",
  "language", "message", "question", "record", "skill", "translate",
] as const;
~~~

- [ ] **Step 2: Add the failing coverage and sense-regression tests**

~~~ts
  it("adds the reviewed school and study example batch", () => {
    const examples = schoolStudyBatch.map((term) => getWordExample({ term, chineseGloss: "" }));
    const forbiddenPhrases = ["I heard the word", "I learned the word", "The word", "reading homework"];

    expect(schoolStudyBatch).toHaveLength(50);
    expect(Object.keys(getReviewedWordExamples())).toHaveLength(185);
    expect(examples.map((example) => example.sentence).filter(Boolean)).toHaveLength(50);

    for (const [index, example] of examples.entries()) {
      expect(example.focusWord.toLowerCase()).toContain(schoolStudyBatch[index].split(" ")[0]);
      expect(example.chinese).toContain("；");
      for (const phrase of forbiddenPhrases) expect(example.sentence).not.toContain(phrase);
    }
  });

  it("uses school and study senses for ambiguous reviewed terms", () => {
    expect(getWordExample({ term: "course", chineseGloss: "课程；路线；过程" })).toMatchObject({
      focusWord: "course",
      sentence: "This course teaches us how to write short essays.",
      chinese: "course = 课程；这门课程教我们怎样写短文。",
    });
    expect(getWordExample({ term: "mark", chineseGloss: "标志；分数；马克" })).toMatchObject({
      focusWord: "mark",
      sentence: "I got a high mark in my science test.",
      chinese: "mark = 分数；我的科学测试得了高分。",
    });
    expect(getWordExample({ term: "translate", chineseGloss: "翻译；解释；转化" })).toMatchObject({
      focusWord: "translate",
      sentence: "Can you translate this sentence into Chinese?",
      chinese: "translate = 翻译；你能把这个句子翻译成中文吗？",
    });
  });
~~~

- [ ] **Step 3: Run the targeted tests to verify the red state**

Run: npm test -- src/lib/pet-learning-app.test.ts -t "school and study"

Expected: both tests fail because the entries are absent and the reviewed count remains 135.

- [ ] **Step 4: Commit the failing contract**

~~~bash
git add src/lib/pet-learning-app.test.ts
git commit -m "test: require school study example batch"
~~~

### Task 2: Record And Promote Reviewed Content

**Files:**
- Create: data/example-candidates/school-study-001.json
- Modify: src/lib/pet-learning-app.ts

**Interfaces:**
- Consumes: the 50 required keys from schoolStudyBatch.
- Produces: identical approved entries in the candidate ledger and reviewed registry.

- [ ] **Step 1: Create the candidate ledger with this exact reviewed content**

Create a JSON object with batchId "school-study-001", status "promoted", and an entries array. Every table row becomes one object with the fields term, focusWord, sentence, and chinese.

| Term | Sentence | Chinese |
| --- | --- | --- |
| answer | I wrote the answer at the top of my worksheet. | answer = 答案；我把答案写在练习纸的最上面。 |
| article | Our teacher gave us an article about space to read. | article = 文章；老师给了我们一篇关于太空的文章阅读。 |
| bookcase | The new bookcase is beside the classroom door. | bookcase = 书架；新书架在教室门旁边。 |
| bookshelf | Put the dictionary back on the bookshelf. | bookshelf = 书架；把词典放回书架上。 |
| chapter | We read the first chapter before the lesson. | chapter = 章；上课前我们读了第一章。 |
| college | My sister wants to study art at college. | college = 大学；我姐姐想在大学学习艺术。 |
| course | This course teaches us how to write short essays. | course = 课程；这门课程教我们怎样写短文。 |
| dictionary | Use a dictionary when you do not know a word. | dictionary = 词典；不知道一个单词时就用词典。 |
| education | Every child deserves a good education. | education = 教育；每个孩子都应得到良好的教育。 |
| essay | I finished my essay about my favourite place. | essay = 短文；我完成了关于我最喜欢的地方的短文。 |
| calendar | Our class calendar shows the dates of all the tests. | calendar = 日历；我们班的日历标出了所有测试的日期。 |
| exercise | We did a grammar exercise before lunch. | exercise = 练习；午饭前我们做了一道语法练习。 |
| explain | Please explain the question in a simpler way. | explain = 解释；请用更简单的方式解释这个问题。 |
| grammar | This grammar rule is easy to remember. | grammar = 语法；这条语法规则很容易记住。 |
| learn | We learn five new English words each week. | learn = 学习；我们每周学习五个新的英语单词。 |
| mark | I got a high mark in my science test. | mark = 分数；我的科学测试得了高分。 |
| maths / mathematics | Maths is easier when I check every answer. | maths / mathematics = 数学；我检查每个答案时，数学就更容易。 |
| mistake | I found one spelling mistake in my homework. | mistake = 错误；我在家庭作业中发现了一个拼写错误。 |
| note | Take notes while the teacher explains the topic. | note = 笔记；老师讲解这个主题时记笔记。 |
| notebook | My notebook is full of science notes. | notebook = 笔记本；我的笔记本里记满了科学笔记。 |
| paper | Hand your paper to the teacher when you finish. | paper = 试卷；完成后把试卷交给老师。 |
| pencil | Use a pencil to draw the diagram. | pencil = 铅笔；用铅笔画这张图。 |
| pencil case | My pencil case is under the desk. | pencil case = 铅笔盒；我的铅笔盒在书桌下面。 |
| pupil | Each pupil chose a book from the library. | pupil = 学生；每个学生都从图书馆选了一本书。 |
| read | Read the instructions before you start the test. | read = 阅读；开始测试前先阅读说明。 |
| reading | Reading every day improves my vocabulary. | reading = 阅读；每天阅读能提高我的词汇量。 |
| research | Our group did research for the history project. | research = 研究；我们小组为历史课题做了研究。 |
| revise | I revise my notes before an important test. | revise = 复习；重要测试前我复习笔记。 |
| science | Science helps us understand how plants grow. | science = 科学；科学帮助我们理解植物如何生长。 |
| spelling | Check the spelling before you send the message. | spelling = 拼写；发送消息前检查拼写。 |
| study | We study quietly in the library after school. | study = 学习；放学后我们在图书馆安静学习。 |
| teach | Our teacher can teach difficult ideas clearly. | teach = 教；我们的老师能清楚地讲授难懂的概念。 |
| teaching | Good teaching makes a hard subject easier. | teaching = 教学；好的教学能让难的科目变得容易。 |
| test | We have a vocabulary test on Friday morning. | test = 测试；我们星期五早上有词汇测试。 |
| textbook | Open your textbook to page twenty. | textbook = 教科书；把教科书翻到第二十页。 |
| university | He hopes to study engineering at university. | university = 大学；他希望在大学学习工程学。 |
| write | Write your name at the top of the page. | write = 写；把你的名字写在页面顶部。 |
| write down | Write down the homework before you leave class. | write down = 写下；离开教室前写下家庭作业。 |
| calculator | Use a calculator to check the final number. | calculator = 计算器；用计算器核对最后的数字。 |
| computer | We used the computer to finish our project. | computer = 电脑；我们用电脑完成了课题。 |
| desk | There is a map on the teacher's desk. | desk = 书桌；老师的桌子上有一张地图。 |
| document | Save the document before you close the computer. | document = 文件；关闭电脑前保存这份文件。 |
| file | Put the homework file in the class folder. | file = 文件；把家庭作业文件放进班级文件夹。 |
| keyboard | My keyboard is missing the letter A. | keyboard = 键盘；我的键盘少了字母 A。 |
| language | English is the language we practise after lunch. | language = 语言；英语是我们午饭后练习的语言。 |
| message | The teacher sent a message about tomorrow's lesson. | message = 消息；老师发了一条关于明天课程的消息。 |
| question | Raise your hand if you have a question. | question = 问题；如果你有问题就举手。 |
| record | The school keeps a record of every pupil's attendance. | record = 记录；学校保存每个学生的出勤记录。 |
| skill | Listening is an important skill for language learners. | skill = 技能；听力是语言学习者的重要技能。 |
| translate | Can you translate this sentence into Chinese? | translate = 翻译；你能把这个句子翻译成中文吗？ |

- [ ] **Step 2: Promote every table row into getReviewedWordExamples()**

Insert one entry for every term, using the table's exact focusWord, sentence, and Chinese value. Use the existing normalized property-key convention:

~~~ts
    calendar: {
      focusWord: "calendar",
      sentence: "Our class calendar shows the dates of all the tests.",
      chinese: "calendar = 日历；我们班的日历标出了所有测试的日期。",
    },
    maths: {
      focusWord: "maths / mathematics",
      sentence: "Maths is easier when I check every answer.",
      chinese: "maths / mathematics = 数学；我检查每个答案时，数学就更容易。",
    },
    pencilcase: {
      focusWord: "pencil case",
      sentence: "My pencil case is under the desk.",
      chinese: "pencil case = 铅笔盒；我的铅笔盒在书桌下面。",
    },
    writedown: {
      focusWord: "write down",
      sentence: "Write down the homework before you leave class.",
      chinese: "write down = 写下；离开教室前写下家庭作业。",
    },
~~~

For each one-word term, use its lowercase spelling as the key. Do not import the candidate JSON or change getWordExample().

- [ ] **Step 3: Run the targeted tests to verify the green state**

Run: npm test -- src/lib/pet-learning-app.test.ts -t "school and study"

Expected: 2 passed tests; the registry has exactly 185 entries and all selected terms return a sentence.

- [ ] **Step 4: Commit the reviewed content**

~~~bash
git add -f data/example-candidates/school-study-001.json
git add src/lib/pet-learning-app.ts src/lib/pet-learning-app.test.ts
git commit -m "feat: add reviewed school study examples"
~~~

### Task 3: Audit And Verify The Batch

**Files:**
- Modify: src/lib/generated/pet-word-example-audit.ts
- Possibly modify: scripts/audit-reviewed-pet-examples.ts

**Interfaces:**
- Consumes: all 185 entries from getReviewedWordExamples().
- Produces: one audit record per reviewed entry with needsReview: false.

- [ ] **Step 1: Regenerate the bilingual audit**

Run: npm run audit:examples

Expected: the generated audit covers 185 entries. Inspect every reported flag before editing content.

- [ ] **Step 2: Resolve flags only at the source**

For a real sense or translation mismatch, correct the reviewed entry and its matching candidate row, then rerun the audit. For a false-positive caused solely by an official polysemous gloss, add only that term to manuallyConfirmedTerms in scripts/audit-reviewed-pet-examples.ts and leave a nearby comment naming the demonstrated sense.

- [ ] **Step 3: Confirm a clean audit**

Run: npm run audit:examples

Expected: Audited 185 reviewed PET examples; 0 need review.

- [ ] **Step 4: Run full tests and the production build**

Run: npm test

Expected: all Vitest files pass with zero failed tests.

Run: npm run build

Expected: the Next.js production build exits with code 0.

- [ ] **Step 5: Commit generated audit and any resolution**

~~~bash
git add src/lib/generated/pet-word-example-audit.ts scripts/audit-reviewed-pet-examples.ts
git add -f data/example-candidates/school-study-001.json
git add src/lib/pet-learning-app.ts
git commit -m "test: audit school study example batch"
~~~
