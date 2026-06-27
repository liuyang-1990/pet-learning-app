import { describe, expect, it } from "vitest";
import {
  addGuardianPrompt,
  addGuardianTopicWord,
  addRecentRecording,
  assessWordShadowing,
  continuePart1Conversation,
  completeDailySession,
  completeVocabularyReview,
  createDemoHousehold,
  ensurePart2Image,
  getPart2ImageChoices,
  getGuardianProgress,
  getLearnerHome,
  purgeExpiredRecentRecordings,
  submitPart2Answer,
  submitSpeakingAttempt,
  startDailySession,
  updateDailyWeakWordLimit,
} from "./pet-learning-app";

describe("PET Learning App", () => {
  it("shows the learner what is due today and starts a daily session", () => {
    const household = createDemoHousehold();

    const home = getLearnerHome(household, new Date("2026-06-26T08:00:00+08:00"));

    expect(home.practiceStreakDays).toBe(4);
    expect(home.dueWeakWords).toHaveLength(5);
    expect(home.dueWeakWords.map((word) => word.term).slice(0, 2)).toEqual([
      "environment",
      "usually",
    ]);
    expect(home.canStartDailySession).toBe(true);

    const session = startDailySession(household, new Date("2026-06-26T08:05:00+08:00"));

    expect(session.status).toBe("in_progress");
    expect(session.steps.map((step) => step.kind)).toEqual([
      "weak_word_warmup",
      "speaking_part_1",
      "speaking_part_2",
      "vocabulary_review",
    ]);
    expect(session.steps[1]?.prompt.title).toContain("school");
  });

  it("lets guardians cap daily words and keeps yesterday's hardest mistakes first", () => {
    const household = updateDailyWeakWordLimit(createDemoHousehold(), 2);

    const home = getLearnerHome(household, new Date("2026-06-26T08:00:00+08:00"));

    expect(household.settings.dailyWeakWordLimit).toBe(2);
    expect(home.dueWeakWords.map((word) => word.term)).toEqual([
      "environment",
      "usually",
    ]);
  });

  it("limits retakes and turns a speaking attempt into actionable feedback", () => {
    const household = createDemoHousehold();
    const session = startDailySession(household, new Date("2026-06-26T08:05:00+08:00"));

    const result = submitSpeakingAttempt(session, {
      promptId: "part-1-school",
      transcript: "I like science because it is interesting but I usually say it slowly.",
      attemptNumber: 3,
    });

    expect(result.acceptedAttemptNumber).toBe(3);
    expect(result.canRetakeAgain).toBe(false);
    expect(result.feedback.chinese).toContain("回答完整");
    expect(result.feedback.exampleAnswer).toContain("I like science because");
    expect(result.feedback.pronunciation.targetAccent).toBe("British English");
    expect(result.feedback.pronunciation.wordsToShadow).toEqual(["usually"]);
    expect(result.weakWords.map((word) => word.term)).toEqual(["usually", "because"]);
  });

  it("moves weak words through simple review stages", () => {
    const household = createDemoHousehold();

    const updated = completeVocabularyReview(
      household,
      [
        { term: "because", correct: true },
        { term: "usually", correct: true },
        { term: "environment", correct: true },
      ],
      new Date("2026-06-26T08:20:00+08:00"),
    );

    expect(updated.weakWords.find((word) => word.term === "because")?.reviewStage).toBe(
      "tomorrow",
    );
    expect(updated.weakWords.find((word) => word.term === "usually")?.reviewStage).toBe(
      "threeDaysLater",
    );
    expect(updated.weakWords.find((word) => word.term === "environment")?.reviewStage).toBe(
      "mastered",
    );
  });

  it("shows guardian progress with only recent sessions and recordings", () => {
    const household = createDemoHousehold();
    const now = new Date("2026-06-26T20:00:00+08:00");

    const progress = getGuardianProgress(household, now);

    expect(progress.recentSessions.map((session) => session.completedOn)).toEqual([
      "2026-06-22",
      "2026-06-23",
      "2026-06-24",
      "2026-06-25",
    ]);
    expect(progress.recentRecordings.map((recording) => recording.promptTitle)).toEqual([
      "Talking about school",
    ]);
    expect(progress.masteredWords).toEqual(["library"]);

    const cleaned = purgeExpiredRecentRecordings(household, now);

    expect(cleaned.recentRecordings.map((recording) => recording.id)).toEqual([
      "recording-recent",
    ]);
  });

  it("lets the guardian add content that appears in learner practice", () => {
    const household = addGuardianPrompt(
      addGuardianTopicWord(createDemoHousehold(), {
        term: "playground",
        chineseGloss: "操场",
        dueOn: "2026-06-26",
      }),
      {
        title: "After school",
        question: "What do you usually do after school?",
        part: "part_1",
      },
    );

    const home = getLearnerHome(household, new Date("2026-06-26T08:00:00+08:00"));

    expect(home.dueWeakWords.map((word) => word.term)).toContain("playground");
    expect(household.presetPrompts.at(-1)?.title).toBe("After school");
  });

  it("completes a daily session by keeping progress, feedback words, and recent recordings", () => {
    const household = createDemoHousehold();
    const session = startDailySession(household, new Date("2026-06-26T08:05:00+08:00"));
    const feedback = submitSpeakingAttempt(session, {
      promptId: "part-1-school",
      transcript: "I usually read because the environment is quiet.",
      attemptNumber: 1,
    });

    const withRecording = addRecentRecording(
      household,
      {
        promptTitle: "Talking about school",
        audioUrl: "blob:recent-recording",
      },
      new Date("2026-06-26T08:12:00+08:00"),
    );
    const completed = completeDailySession(
      withRecording,
      session,
      {
        durationMinutes: 13,
        feedback,
      },
      new Date("2026-06-26T08:25:00+08:00"),
    );

    expect(completed.dailySessions.at(-1)).toMatchObject({
      id: "session-2026-06-26",
      completedOn: "2026-06-26",
      durationMinutes: 13,
    });
    expect(completed.weakWords.map((word) => word.term)).toEqual(
      expect.arrayContaining(["usually", "because", "environment"]),
    );
    expect(completed.recentRecordings.map((recording) => recording.audioUrl)).toContain(
      "blob:recent-recording",
    );
  });

  it("continues speaking part 1 with examiner follow-up questions", () => {
    const household = createDemoHousehold();
    const session = startDailySession(household, new Date("2026-06-26T08:05:00+08:00"));

    const firstTurn = continuePart1Conversation(session, {
      promptId: "part-1-school",
      learnerAnswer: "Science.",
      previousTurns: [],
    });

    expect(firstTurn.examinerFollowUp).toBe("Can you tell me more about that?");
    expect(firstTurn.turnFeedback.chinese).toContain("太短");
    expect(firstTurn.conversationComplete).toBe(false);

    const secondTurn = continuePart1Conversation(session, {
      promptId: "part-1-school",
      learnerAnswer: "I like science because experiments are exciting.",
      previousTurns: [firstTurn.turn],
    });

    expect(secondTurn.examinerFollowUp).toContain("How often");
    expect(secondTurn.turnFeedback.chinese).toContain("原因");
  });

  it("gives word-level shadowing feedback for weak words", () => {
    const clear = assessWordShadowing({
      word: "usually",
      spokenText: "usually",
    });
    const unclear = assessWordShadowing({
      word: "environment",
      spokenText: "enviroment",
    });

    expect(clear.status).toBe("clear");
    expect(clear.feedback).toContain("清楚");
    expect(unclear.status).toBe("needs_practice");
    expect(unclear.feedback).toContain("再跟读");
  });

  it("provides a part 2 image and gives feedback on a picture description", () => {
    const household = createDemoHousehold();
    const session = startDailySession(household, new Date("2026-06-26T08:05:00+08:00"));
    const part2 = session.steps.find((step) => step.kind === "speaking_part_2");

    expect(part2?.kind).toBe("speaking_part_2");
    expect(part2?.kind === "speaking_part_2" && ensurePart2Image(part2.prompt).imageUrl).toContain(
      "data:image/svg+xml",
    );

    const result = submitPart2Answer(session, {
      promptId: "part-2-park",
      transcript:
        "In the picture, there are children playing in a park. A woman is sitting on a bench because the weather is sunny.",
      attemptNumber: 1,
    });

    expect(result.feedback.chinese).toContain("图片");
    expect(result.feedback.exampleAnswer).toContain("In the picture");
    expect(result.feedback.pronunciation.targetAccent).toBe("British English");
    expect(result.weakWords.map((word) => word.term)).toEqual(
      expect.arrayContaining(["because"]),
    );
  });

  it("offers multiple built-in images for speaking part 2 practice", () => {
    const household = createDemoHousehold();
    const prompt = household.presetPrompts.find((item) => item.part === "part_2");

    expect(prompt).toBeDefined();
    expect(prompt && getPart2ImageChoices(prompt)).toHaveLength(4);
  });
});
