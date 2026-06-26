# PET Learning App

This context defines the learning domain language for a small app that helps a rising sixth-grade learner prepare for Cambridge B1 Preliminary (PET) through speaking practice and vocabulary review.

## Language

**Learner**:
The child preparing for PET and using the app for daily practice.
_Avoid_: User, student, child

**Guardian**:
The parent or adult who monitors progress and may configure practice content for the learner.
_Avoid_: User, admin, teacher

**Speaking Practice**:
Daily spoken-English practice for PET preparation, focused first on Cambridge B1 Preliminary Speaking Part 1 and Part 2.
_Avoid_: Oral training, conversation module, speaking course

**Speaking Part 1**:
The PET speaking interview task where the learner answers familiar personal questions about topics such as home, school, hobbies, routines, and preferences.
_Avoid_: Self-introduction, chat

**Speaking Part 2**:
The PET speaking photo-description task where the learner talks about a picture or scene using clear observation and location language.
_Avoid_: Picture talk, image exercise

**Pronunciation Feedback**:
Feedback that helps the learner notice spoken words that are unclear, mispronounced, or stressed unnaturally enough to affect comprehension.
_Avoid_: Accent correction, phonics lesson, pronunciation score

**Sentence-Level Pronunciation Feedback**:
Pronunciation feedback that evaluates a whole spoken sentence and highlights specific words that may need rerecording or shadowing.
_Avoid_: Phoneme-level correction, accent grading

**British English Target**:
The pronunciation and model-audio standard for speaking practice, using British English voices and feedback expectations.
_Avoid_: American accent, mixed accent, accent preference

**Vocabulary Review**:
Short repeated practice of PET-relevant words selected from common exam topics and the learner's own speaking mistakes.
_Avoid_: Word memorization, dictionary, vocabulary course

**Topic Word**:
A PET-relevant word from a common theme such as school, family, hobbies, food, travel, health, or environment.
_Avoid_: Preset word, textbook word

**Weak Word**:
A word the learner missed, misused, could not recall, or pronounced unclearly during speaking practice.
_Avoid_: Wrong word, mistake word, error item

**Chinese Gloss**:
A Chinese meaning or explanation used to help the learner understand an English word or prompt without replacing English output practice.
_Avoid_: Translation mode, Chinese answer

**English Output**:
The learner's spoken or written English answer during speaking and vocabulary practice.
_Avoid_: Response, answer, translation

**Daily Session**:
A 10-15 minute learning unit that combines weak-word review, PET speaking practice, and follow-up vocabulary practice.
_Avoid_: Lesson, class, task set

**Exam-Style Prompt**:
A structured PET-style speaking prompt that guides the learner through a target task and allows limited follow-up questions.
_Avoid_: Free chat, conversation starter, chatbot message

**Guardian Review**:
The guardian's lightweight view of recent daily sessions, weak words, and speaking-practice completion.
_Avoid_: Admin dashboard, teacher report, analytics

**Guardian Content**:
Practice content added or adjusted by the guardian, including topic words, Part 1 questions, and Part 2 images.
_Avoid_: Curriculum, courseware, backend data

**Preset Prompt**:
A PET-style speaking prompt included by default so the learner can practice within a stable exam-relevant range.
_Avoid_: Fixed question, template, seed prompt

**AI Feedback**:
Personalized feedback generated from the learner's English output, focused on clarity, relevance, vocabulary use, and correctable mistakes.
_Avoid_: Score, grading, report

**Chinese Feedback**:
Learner-facing feedback written in Chinese to explain what to improve, paired with English examples rather than replacing English practice.
_Avoid_: Chinese lesson, translated correction

**Practice Feedback**:
Encouraging completion feedback plus a small number of concrete next-step improvements after a daily session.
_Avoid_: Total score, exam score, pass probability

**Retake**:
A learner's additional recording attempt for the same speaking prompt, limited to two retakes per prompt in the first version.
_Avoid_: Retry, redo, unlimited practice

**Review Stage**:
The weak-word review state that controls when a word appears again, using simple stages such as new, tomorrow, three days later, and mastered.
_Avoid_: Memory score, spaced repetition algorithm, Leitner box

**Mock Test**:
A future PET-style exam simulation that runs a fuller timed speaking flow separately from daily practice.
_Avoid_: Daily session, test mode, exam score

**Practice Streak**:
The learner's pattern of completing daily sessions over time, used to understand consistency without turning practice into exam scoring.
_Avoid_: Attendance, check-in, retention metric

**Household Space**:
The private family workspace that owns the single learner's daily sessions, weak words, guardian content, recent recordings, and progress history.
_Avoid_: Account, tenant, classroom

**Guardian Login**:
The lightweight guardian sign-in that protects the household space without requiring the learner to manage credentials.
_Avoid_: Admin login, parent account, role system

**Learner Entry Code**:
A short family entry code or link that lets the learner start practice without managing a username or password.
_Avoid_: Child login, student password, access token

**Light Reward**:
A small motivational acknowledgement such as a completion badge, practice streak, or mastered-word moment.
_Avoid_: Coin, shop, leaderboard, game economy

**AI-Assisted Prompt**:
A PET-style prompt generated or adapted by AI from guardian content, especially a Part 2 image.
_Avoid_: Fully generated lesson, free chat prompt

**Part 2 Image**:
A preset or guardian-uploaded image used as the visual basis for a Speaking Part 2 prompt.
_Avoid_: Picture asset, photo, image question

**Recent Recording**:
A learner audio recording retained for guardian review for up to 7 days before being deleted or replaced.
_Avoid_: Audio archive, permanent recording, speaking history

**Mobile Web App**:
The first-version delivery surface for both learner practice and guardian review, optimized for phone and tablet browsers.
_Avoid_: WeChat mini program, native app, desktop site

**Single Learner**:
The first-version household model where one learner owns the daily sessions, weak words, recordings, and progress history.
_Avoid_: Child account, learner profile, class member
