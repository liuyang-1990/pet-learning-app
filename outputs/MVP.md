# PET Learning App MVP

## 1. Product Positioning

This is a mobile-first web prototype for one rising sixth-grade Learner preparing for Cambridge B1 Preliminary (PET). The app helps the Learner build a daily speaking habit, practise PET Speaking Part 1 and Part 2, improve British English pronunciation, and review PET-relevant vocabulary.

The Guardian's role is lightweight: monitor recent progress, review recent recordings, and add a small amount of practice content. The app is not a school LMS, a full course platform, or a general English chatbot.

## 2. MVP Goals

The MVP should prove that the Learner can willingly complete a 10-15 minute Daily Session for two weeks and that Weak Words begin to improve through repeated practice.

Success indicators:

- The Learner completes at least 10 Daily Sessions in 14 days.
- Each Daily Session usually takes 10-15 minutes.
- Repeated Weak Words decrease or move toward mastered Review Stages.
- The Learner is willing to Retake answers without feeling punished.
- The Guardian can understand recent progress within one minute.

## 3. Non-Goals

The MVP will not include:

- Full PET mock tests.
- Full PET Speaking Parts 3 and 4.
- Exam-style total score, pass probability, or official examiner grading.
- Multi-learner profiles, classes, or teacher workflows.
- Native iOS, Android, or WeChat mini program implementation.
- Offline completion of Daily Sessions.
- Heavy game systems such as coins, shops, leaderboards, or virtual economies.
- Permanent audio archive.
- Internet image search or automatic third-party image scraping.

## 4. Primary Users

**Learner**:
The child preparing for PET. The Learner uses the app directly for Daily Sessions, speaking practice, vocabulary review, Retakes, and Light Rewards.

**Guardian**:
The parent or adult who signs in, reviews progress, listens to Recent Recordings, and adds small amounts of Guardian Content.

## 5. Core Learning Experience

### 5.1 Daily Session

A Daily Session is the main learning unit. It should take 10-15 minutes and include:

1. Review due Weak Words.
2. Complete PET Speaking Practice using Exam-Style Prompts.
3. Receive Chinese Feedback, English examples, and Pronunciation Feedback.
4. Practise new or repeated Weak Words from the session.
5. Receive a Light Reward for completion.

### 5.2 Speaking Practice

The MVP focuses on:

- Speaking Part 1: familiar personal questions about school, family, hobbies, routines, preferences, and daily life.
- Speaking Part 2: picture-based speaking using preset or Guardian-uploaded Part 2 Images.

The speaking experience should be exam-style rather than free chat:

- Ask one structured prompt at a time.
- Allow limited follow-up if the answer is too short or off-topic.
- Move forward when the Learner has given a usable answer.
- Allow up to two Retakes per prompt.

### 5.3 Pronunciation

The app should use a British English Target for:

- Model audio.
- Shadowing and repeat-after-me practice.
- Pronunciation Feedback.

Pronunciation Feedback should be sentence-level and word-level:

- Tell the Learner whether the sentence was clear.
- Highlight specific words that may be unclear, mispronounced, or stressed unnaturally.
- Provide British English model audio for shadowing.
- Avoid phoneme-level lessons in the MVP.

### 5.4 Vocabulary Review

Vocabulary Review combines:

- Topic Words from PET-relevant themes.
- Weak Words produced by the Learner's own speaking mistakes, missing words, misuse, or unclear pronunciation.

Chinese Glosses are allowed for comprehension. Practice output should stay English-first:

- See Chinese, say or type English.
- Listen and choose the word.
- Shadow the British English model audio.
- Complete or produce short English sentences.

Weak Words should use simple Review Stages:

- New.
- Tomorrow.
- Three days later.
- Mastered.

Correct answers move words forward. Missed, misused, or unclearly pronounced words move back or remain due.

## 6. MVP Pages

### 6.1 Learner Home

Purpose: help the Learner start today's practice quickly.

Must show:

- Start Daily Session action.
- Practice Streak.
- Due Weak Words.
- Recent Light Reward or mastered-word moment.

### 6.2 Daily Session

Purpose: run the main 10-15 minute learning flow.

Must support:

- Weak Word warm-up.
- Speaking Part 1 prompts.
- Speaking Part 2 image prompts.
- Browser recording.
- Retakes, limited to two per prompt.
- Transcription.
- AI Feedback.
- Sentence-Level Pronunciation Feedback.
- Follow-up Vocabulary Review.

### 6.3 Vocabulary Review

Purpose: let the Learner practise Weak Words and Topic Words outside the main session.

Must support:

- Due Weak Words.
- Topic Word sets.
- Chinese Glosses.
- English Output exercises.
- British English model audio.
- Review Stage updates.

### 6.4 Guardian Progress

Purpose: let the Guardian understand recent progress quickly.

Must show:

- Last 7 days of Daily Sessions.
- Practice Streak.
- Recent Weak Words.
- Words that became mastered.
- Recent Recordings retained for up to 7 days.
- Short summaries of Practice Feedback.

### 6.5 Guardian Content

Purpose: let the Guardian lightly adjust practice material.

Must support:

- Add or edit Topic Words.
- Add Speaking Part 1 questions.
- Upload Part 2 Images.
- View AI-Assisted Prompts generated from uploaded images.
- Disable or remove unsuitable prompts or words.

## 7. Data and Privacy

The MVP uses one Household Space and one Single Learner.

The Guardian signs in with a lightweight Guardian Login. The Learner should use a Learner Entry Code or fixed family practice link, not a separate username and password.

Recent Recordings are retained for up to 7 days for Guardian review. Longer-term data may include:

- Transcripts.
- AI Feedback.
- Weak Words.
- Review Stages.
- Daily Session records.
- Practice Streak.
- Guardian Content.

Original audio should not become a permanent archive.

## 8. AI Capabilities

The MVP should use AI for:

- Speech transcription.
- AI Feedback on relevance, answer completeness, vocabulary use, and correctable mistakes.
- Sentence-Level Pronunciation Feedback.
- British English model sentence generation.
- Weak Word extraction.
- Example sentence generation.
- AI-Assisted Prompts for Guardian-uploaded Part 2 Images.

Feedback strategy:

- Explain improvement points in Chinese.
- Provide English example answers and better sentence options.
- Avoid total scores and pass/fail claims.
- Keep feedback short enough for a sixth-grade Learner to act on immediately.

## 9. Technical Direction

The first implementation should be a mobile-first Next.js web app with a simple database and cloud AI APIs.

Expected technical pieces:

- Next.js / React frontend.
- Mobile-first responsive UI.
- Browser audio recording.
- API endpoints for upload, transcription, feedback, and content generation.
- Database tables or collections for Household Space, Daily Session, Weak Word, Review Stage, Guardian Content, and Recent Recording metadata.
- Cloud storage or equivalent for recordings with 7-day retention.
- British English TTS or model audio generation.

The MVP requires network access. Offline Daily Sessions are deferred.

## 10. Future-Proofing

The MVP should leave room for:

- Mock Test as a separate future flow.
- PET Speaking Parts 3 and 4.
- Multiple learners.
- WeChat mini program or native app packaging.
- More advanced pronunciation analysis.
- Richer Guardian reports.

The MVP should not build these features now, but data naming and navigation should avoid blocking them.

## 11. First Build Slice

A practical first build slice:

1. Create the mobile Learner Home.
2. Implement one Daily Session path with preset Speaking Part 1 prompts.
3. Add browser recording and transcription.
4. Generate short Chinese Feedback with English examples.
5. Extract Weak Words and show a simple Vocabulary Review.
6. Add Guardian Progress for the last 7 days.
7. Add 7-day Recent Recording retention.

After that slice works, add Speaking Part 2 Images and Guardian Content.

## 12. Open Questions

These can be decided during implementation:

- Which exact speech-to-text and TTS providers to use.
- Whether pronunciation feedback is powered by a dedicated speech assessment API or by transcription confidence plus AI analysis.
- Whether Guardian Login uses email, phone number, or passwordless magic link.
- Which database and storage provider to use for the prototype.
- How many preset Topic Words and Speaking prompts are needed for the first two-week trial.
