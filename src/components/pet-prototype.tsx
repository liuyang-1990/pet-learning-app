"use client";

import {
  BarChart3,
  BookOpen,
  CheckCircle2,
  Clock,
  FolderPlus,
  Home,
  ImageIcon,
  MessageCircle,
  Mic,
  Play,
  RotateCcw,
  Trophy,
  Upload,
  Volume2,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  addGuardianPrompt,
  addGuardianTopicWord,
  addRecentRecording,
  assessWordShadowing,
  completeDailySession,
  completeVocabularyReview,
  continuePart1Conversation,
  createDemoHousehold,
  getGuardianProgress,
  getLearnerHome,
  submitSpeakingAttempt,
  startDailySession,
  type DailySession,
  type HouseholdSpace,
  type Part1ConversationResult,
  type Part1ConversationTurn,
  type Prompt,
  type RecentRecording,
  type SpeakingAttemptResult,
  type WeakWord,
  type WordShadowingFeedback,
} from "@/lib/pet-learning-app";

type Tab = "home" | "session" | "vocabulary" | "guardian" | "content";

export function PetPrototype() {
  const [household, setHousehold, syncState] = useServerHousehold();
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [session, setSession] = useState<DailySession | null>(null);
  const [sessionStartedAt, setSessionStartedAt] = useState<Date | null>(null);
  const [attemptNumber, setAttemptNumber] = useState(1);
  const [transcript, setTranscript] = useState(
    "I like science because it is interesting and I usually learn new things.",
  );
  const [feedback, setFeedback] = useState<SpeakingAttemptResult | null>(null);
  const [part1Turns, setPart1Turns] = useState<Part1ConversationTurn[]>([]);
  const [part1FollowUp, setPart1FollowUp] = useState<string | null>(null);
  const [part1Feedback, setPart1Feedback] = useState<Part1ConversationResult | null>(null);
  const [shadowInputs, setShadowInputs] = useState<Record<string, string>>({});
  const [shadowFeedback, setShadowFeedback] = useState<Record<string, WordShadowingFeedback>>({});
  const [isRecording, setIsRecording] = useState(false);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [recordingError, setRecordingError] = useState<string | null>(null);
  const [currentRecordingUrl, setCurrentRecordingUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const now = useMemo(() => new Date(), []);

  const learnerHome = useMemo(() => getLearnerHome(household, now), [household, now]);
  const guardianProgress = useMemo(() => getGuardianProgress(household, now), [household, now]);

  const startPractice = () => {
    const startedAt = new Date();
    setSession(startDailySession(household, startedAt));
    setSessionStartedAt(startedAt);
    setAttemptNumber(1);
    setFeedback(null);
    setPart1Turns([]);
    setPart1FollowUp(null);
    setPart1Feedback(null);
    setShadowInputs({});
    setShadowFeedback({});
    setCurrentRecordingUrl(null);
    setRecordingError(null);
    setActiveTab("session");
  };

  const submitAttempt = async () => {
    if (!session) return;

    let conversation = continuePart1Conversation(session, {
      promptId: "part-1-school",
      learnerAnswer: transcript,
      previousTurns: part1Turns,
    });
    let attemptFeedback = submitSpeakingAttempt(session, {
      promptId: "part-1-school",
      transcript,
      attemptNumber,
    });

    setIsAiThinking(true);
    try {
      const response = await fetch("/api/ai/part1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session,
          promptId: "part-1-school",
          learnerAnswer: transcript,
          attemptNumber,
          previousTurns: part1Turns,
        }),
      });

      if (response.ok) {
        const data = (await response.json()) as {
          conversation: Part1ConversationResult;
          feedback: SpeakingAttemptResult;
        };
        conversation = data.conversation;
        attemptFeedback = data.feedback;
      }
    } finally {
      setIsAiThinking(false);
    }

    setPart1Turns((current) => [...current, conversation.turn]);
    setPart1FollowUp(conversation.examinerFollowUp);
    setPart1Feedback(conversation);
    setFeedback(attemptFeedback);
    setTranscript("");
  };

  const retake = () => {
    if (attemptNumber >= 3) return;

    setAttemptNumber((value) => value + 1);
    setFeedback(null);
    setPart1Feedback(null);
  };

  const updateShadowInput = (word: string, value: string) => {
    setShadowInputs((current) => ({ ...current, [word]: value }));
  };

  const checkShadowing = (word: WeakWord) => {
    const spokenText = shadowInputs[word.term] || word.term;
    setShadowFeedback((current) => ({
      ...current,
      [word.term]: assessWordShadowing({ word: word.term, spokenText }),
    }));
  };

  const toggleRecording = async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      return;
    }

    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      setRecordingError("当前浏览器不支持录音，可以先手动输入转写文本。");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      chunksRef.current = [];
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };
      recorder.onstop = () => {
        stream.getTracks().forEach((track) => track.stop());
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || "audio/webm" });
        const audioUrl = URL.createObjectURL(blob);
        setCurrentRecordingUrl(audioUrl);
        setIsRecording(false);
        void uploadRecording(blob, "Talking about school").then((result) => {
          if (!result) {
            setHousehold((current) =>
              addRecentRecording(
                current,
                {
                  promptTitle: "Talking about school",
                  audioUrl,
                },
                new Date(),
              ),
            );
            return;
          }

          setHousehold(result.household);
          if (result.transcript) {
            setTranscript(result.transcript);
          }
          setCurrentRecordingUrl(result.recording.audioUrl);
        });
      };

      mediaRecorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);
      setRecordingError(null);
    } catch {
      setRecordingError("无法获取麦克风权限，可以检查浏览器权限后再试。");
      setIsRecording(false);
    }
  };

  const completeSession = () => {
    if (!session) return;

    const minutes = Math.max(
      1,
      Math.round(((Date.now() - (sessionStartedAt?.getTime() ?? Date.now())) / 60000) || 12),
    );

    setHousehold((current) =>
      completeDailySession(
        current,
        session,
        {
          durationMinutes: minutes,
          feedback,
        },
        new Date(),
      ),
    );
    setSession(null);
    setSessionStartedAt(null);
    setFeedback(null);
    setAttemptNumber(1);
    setActiveTab("guardian");
  };

  const completeReview = (word: WeakWord, correct: boolean) => {
    setHousehold((current) =>
      completeVocabularyReview(
        current,
        [{ term: word.term, correct }],
        new Date(),
      ),
    );
  };

  const addTopicWord = (term: string, chineseGloss: string) => {
    setHousehold((current) =>
      addGuardianTopicWord(current, {
        term,
        chineseGloss,
        dueOn: toDateKey(new Date()),
      }),
    );
  };

  const addPrompt = (input: { title: string; question: string; part: Prompt["part"]; imageUrl?: string }) => {
    setHousehold((current) => addGuardianPrompt(current, input));
  };

  const resetDemoData = () => {
    setHousehold(createDemoHousehold());
    setSession(null);
    setFeedback(null);
    setAttemptNumber(1);
    setActiveTab("home");
  };

  return (
    <main className="app-shell">
      <section className="phone-frame" aria-label="PET Learning App">
        <header className="top-bar">
          <div>
            <p className="eyebrow">PET Speaking</p>
            <h1>今日练习</h1>
          </div>
          <span className="sync-pill">{syncState}</span>
          <button className="icon-button" aria-label="播放英音示范">
            <Volume2 size={20} />
          </button>
        </header>

        <nav className="tab-bar" aria-label="主导航">
          <TabButton active={activeTab === "home"} icon={<Home size={18} />} onClick={() => setActiveTab("home")}>
            首页
          </TabButton>
          <TabButton active={activeTab === "session"} icon={<Mic size={18} />} onClick={() => setActiveTab("session")}>
            练习
          </TabButton>
          <TabButton active={activeTab === "vocabulary"} icon={<BookOpen size={18} />} onClick={() => setActiveTab("vocabulary")}>
            单词
          </TabButton>
          <TabButton active={activeTab === "guardian"} icon={<BarChart3 size={18} />} onClick={() => setActiveTab("guardian")}>
            进度
          </TabButton>
          <TabButton active={activeTab === "content"} icon={<FolderPlus size={18} />} onClick={() => setActiveTab("content")}>
            内容
          </TabButton>
        </nav>

        <div className="screen">
          {activeTab === "home" && (
            <LearnerHomeView
              dueWeakWords={learnerHome.dueWeakWords}
              practiceStreakDays={learnerHome.practiceStreakDays}
              onStart={startPractice}
            />
          )}

          {activeTab === "session" && (
            <DailySessionView
              session={session}
              attemptNumber={attemptNumber}
              transcript={transcript}
              feedback={feedback}
              isAiThinking={isAiThinking}
              part1Turns={part1Turns}
              part1FollowUp={part1FollowUp}
              part1Feedback={part1Feedback}
              shadowInputs={shadowInputs}
              shadowFeedback={shadowFeedback}
              isRecording={isRecording}
              recordingError={recordingError}
              currentRecordingUrl={currentRecordingUrl}
              onStart={startPractice}
              onTranscriptChange={setTranscript}
              onSubmit={submitAttempt}
              onRetake={retake}
              onToggleRecording={toggleRecording}
              onCompleteSession={completeSession}
              onSpeak={speakBritish}
              onShadowInputChange={updateShadowInput}
              onCheckShadowing={checkShadowing}
            />
          )}

          {activeTab === "vocabulary" && (
            <VocabularyView
              words={learnerHome.dueWeakWords}
              onComplete={completeReview}
            />
          )}

          {activeTab === "guardian" && (
            <GuardianProgressView progress={guardianProgress} recordings={household.recentRecordings} />
          )}

          {activeTab === "content" && (
            <GuardianContentView
              prompts={household.presetPrompts}
              onAddTopicWord={addTopicWord}
              onAddPrompt={addPrompt}
              onResetDemoData={resetDemoData}
            />
          )}
        </div>
      </section>
    </main>
  );
}

function LearnerHomeView({
  dueWeakWords,
  practiceStreakDays,
  onStart,
}: {
  dueWeakWords: WeakWord[];
  practiceStreakDays: number;
  onStart: () => void;
}) {
  return (
    <div className="stack">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">10-15 分钟</p>
          <h2>先复习，再开口</h2>
          <p>今天练 Part 1 和 Part 2，反馈会用中文讲清楚，再给英文示范句。</p>
        </div>
        <button className="primary-button" onClick={onStart}>
          <Play size={18} />
          开始今日练习
        </button>
      </section>

      <section className="stats-grid" aria-label="今日概览">
        <Metric icon={<Trophy size={18} />} value={`${practiceStreakDays} 天连续练习`} label="轻奖励" />
        <Metric icon={<BookOpen size={18} />} value={`${dueWeakWords.length} 个待复习`} label="Weak Words" />
      </section>

      <section className="panel">
        <div className="section-title">
          <h2>今天的 Weak Words</h2>
          <span>英音跟读</span>
        </div>
        <WordList words={dueWeakWords} />
      </section>
    </div>
  );
}

function DailySessionView({
  session,
  attemptNumber,
  transcript,
  feedback,
  isAiThinking,
  part1Turns,
  part1FollowUp,
  part1Feedback,
  shadowInputs,
  shadowFeedback,
  isRecording,
  recordingError,
  currentRecordingUrl,
  onStart,
  onTranscriptChange,
  onSubmit,
  onRetake,
  onToggleRecording,
  onCompleteSession,
  onSpeak,
  onShadowInputChange,
  onCheckShadowing,
}: {
  session: DailySession | null;
  attemptNumber: number;
  transcript: string;
  feedback: SpeakingAttemptResult | null;
  isAiThinking: boolean;
  part1Turns: Part1ConversationTurn[];
  part1FollowUp: string | null;
  part1Feedback: Part1ConversationResult | null;
  shadowInputs: Record<string, string>;
  shadowFeedback: Record<string, WordShadowingFeedback>;
  isRecording: boolean;
  recordingError: string | null;
  currentRecordingUrl: string | null;
  onStart: () => void;
  onTranscriptChange: (value: string) => void;
  onSubmit: () => void;
  onRetake: () => void;
  onToggleRecording: () => void;
  onCompleteSession: () => void;
  onSpeak: (text: string) => void;
  onShadowInputChange: (word: string, value: string) => void;
  onCheckShadowing: (word: WeakWord) => void;
}) {
  if (!session) {
    return (
      <section className="empty-state">
        <Mic size={34} />
        <h2>准备开始 Daily Session</h2>
        <p>系统会先带你复习 Weak Words，然后进入 PET 风格口语题。</p>
        <button className="primary-button" onClick={onStart}>
          <Play size={18} />
          开始今日练习
        </button>
      </section>
    );
  }

  const part1 = session.steps.find((step) => step.kind === "speaking_part_1");
  const part2 = session.steps.find((step) => step.kind === "speaking_part_2");
  const warmup = session.steps.find((step) => step.kind === "weak_word_warmup");
  const currentQuestion =
    part1FollowUp && part1FollowUp !== "Thank you. Let's move on to the next question."
      ? part1FollowUp
      : part1?.kind === "speaking_part_1"
        ? part1.prompt.question
        : "";

  return (
    <div className="stack">
      <section className="panel">
        <div className="section-title">
          <h2>Daily Session</h2>
          <span>英音目标</span>
        </div>
        {warmup?.kind === "weak_word_warmup" && (
          <WordShadowingList
            words={warmup.words}
            inputs={shadowInputs}
            feedback={shadowFeedback}
            onSpeak={onSpeak}
            onInputChange={onShadowInputChange}
            onCheck={onCheckShadowing}
          />
        )}
      </section>

      {part1?.kind === "speaking_part_1" && (
        <section className="practice-card">
          <div className="prompt-head">
            <div>
              <p className="eyebrow">AI Examiner · Speaking Part 1</p>
              <h2>{part1.prompt.title}</h2>
            </div>
            <span>最多 2 次重录</span>
          </div>
          <div className="conversation">
            <div className="chat-row examiner">
              <MessageCircle size={18} />
              <p>{part1.prompt.question}</p>
              <button className="icon-button compact-icon" aria-label="播放考官问题" onClick={() => onSpeak(part1.prompt.question)}>
                <Volume2 size={16} />
              </button>
            </div>
            {part1Turns.map((turn) => (
              <div className="chat-pair" key={turn.id}>
                <div className="chat-row learner">
                  <strong>我</strong>
                  <p>{turn.learnerAnswer}</p>
                </div>
                {turn.id === part1Turns.at(-1)?.id && part1FollowUp && (
                  <div className="chat-row examiner">
                    <MessageCircle size={18} />
                    <p>{part1FollowUp}</p>
                    <button className="icon-button compact-icon" aria-label="播放追问" onClick={() => onSpeak(part1FollowUp)}>
                      <Volume2 size={16} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="prompt-question">{currentQuestion}</p>
          <div className="record-row">
            <button className={isRecording ? "danger-button" : "secondary-button"} onClick={onToggleRecording}>
              <Mic size={18} />
              {isRecording ? "停止录音" : "开始录音"}
            </button>
            <button className="secondary-button" onClick={onRetake} disabled={attemptNumber >= 3}>
              <RotateCcw size={18} />
              第 {attemptNumber} 次
            </button>
          </div>
          {recordingError && <p className="inline-error">{recordingError}</p>}
          {currentRecordingUrl && (
            <div className="audio-review">
              <span>本次录音</span>
              <audio controls src={currentRecordingUrl} />
            </div>
          )}
          <label className="field">
            <span>转写文本</span>
            <textarea value={transcript} onChange={(event) => onTranscriptChange(event.target.value)} rows={4} />
          </label>
          <button className="primary-button full-width" onClick={onSubmit} disabled={isAiThinking || !transcript.trim()}>
            <CheckCircle2 size={18} />
            {isAiThinking ? "AI 考官思考中" : "回答并听追问"}
          </button>
        </section>
      )}

      {(feedback || part1Feedback) && (
        <section className="feedback-panel">
          <div className="section-title">
            <h2>AI Feedback</h2>
            <span>不显示总分</span>
          </div>
          {part1Feedback && <p>{part1Feedback.turnFeedback.chinese}</p>}
          {feedback && <blockquote>{feedback.feedback.exampleAnswer}</blockquote>}
          {feedback && (
            <div className="pronunciation">
              <Volume2 size={18} />
              <span>{feedback.feedback.pronunciation.summary}</span>
            </div>
          )}
          {feedback && feedback.weakWords.length > 0 && (
            <div className="feedback-words">
              {feedback.weakWords.map((word) => (
                <span className="chip" key={word.term}>
                  {word.term}
                  <small>{word.chineseGloss}</small>
                </span>
              ))}
            </div>
          )}
          <button className="primary-button full-width" onClick={onCompleteSession}>
            <CheckCircle2 size={18} />
            完成今日练习
          </button>
        </section>
      )}

      {part2?.kind === "speaking_part_2" && (
        <section className="image-prompt">
          <div className="image-placeholder">
            <ImageIcon size={28} />
            <span>Part 2 Image</span>
          </div>
          <div>
            <p className="eyebrow">Speaking Part 2</p>
            <h2>{part2.prompt.title}</h2>
            <p>{part2.prompt.question}</p>
          </div>
        </section>
      )}
    </div>
  );
}

function VocabularyView({
  words,
  onComplete,
}: {
  words: WeakWord[];
  onComplete: (word: WeakWord, correct: boolean) => void;
}) {
  return (
    <div className="stack">
      <section className="panel">
        <div className="section-title">
          <h2>单词复习</h2>
          <span>中文理解，英文输出</span>
        </div>
        {words.length === 0 && (
          <div className="mini-empty">
            <CheckCircle2 size={22} />
            <p>今天没有到期的 Weak Words。可以去家长内容里补充 Topic Words。</p>
          </div>
        )}
        <div className="word-review-list">
          {words.map((word) => (
            <article className="word-review" key={word.term}>
              <div>
                <h3>{word.term}</h3>
                <p>{word.chineseGloss}</p>
                <span>{stageLabel(word.reviewStage)}</span>
              </div>
              <div className="split-actions">
                <button className="secondary-button" onClick={() => onComplete(word, false)}>
                  再练
                </button>
                <button className="primary-button" onClick={() => onComplete(word, true)}>
                  会了
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function GuardianProgressView({
  progress,
  recordings,
}: {
  progress: ReturnType<typeof getGuardianProgress>;
  recordings: RecentRecording[];
}) {
  return (
    <div className="stack">
      <section className="panel">
        <div className="section-title">
          <h2>家长进度</h2>
          <span>最近 7 天</span>
        </div>
        <div className="timeline">
          {progress.recentSessions.map((session) => (
            <div className="timeline-item" key={session.id}>
              <span>{session.completedOn}</span>
              <strong>{session.durationMinutes} 分钟</strong>
              {session.feedbackSummary && <p>{session.feedbackSummary}</p>}
            </div>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="section-title">
          <h2>Recent Recordings</h2>
          <span>7 天保留</span>
        </div>
        {recordings.length === 0 && (
          <div className="mini-empty">
            <Mic size={22} />
            <p>完成一次录音后，这里会显示最近 7 天的回听入口。</p>
          </div>
        )}
        {recordings.map((recording) => (
          <div className="recording-row" key={recording.id}>
            <Mic size={18} />
            <div>
              <strong>{recording.promptTitle}</strong>
              <p>{new Date(recording.recordedAt).toLocaleDateString("zh-CN")}</p>
            </div>
            {recording.audioUrl.startsWith("blob:") && <audio controls src={recording.audioUrl} />}
          </div>
        ))}
      </section>

      <section className="panel">
        <div className="section-title">
          <h2>已掌握</h2>
          <span>{progress.masteredWords.length} 个词</span>
        </div>
        <div className="chips">
          {progress.masteredWords.map((word) => (
            <span className="chip mastered" key={word}>
              {word}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}

function GuardianContentView({
  prompts,
  onAddTopicWord,
  onAddPrompt,
  onResetDemoData,
}: {
  prompts: Prompt[];
  onAddTopicWord: (term: string, chineseGloss: string) => void;
  onAddPrompt: (input: { title: string; question: string; part: Prompt["part"]; imageUrl?: string }) => void;
  onResetDemoData: () => void;
}) {
  const [wordTerm, setWordTerm] = useState("playground");
  const [wordGloss, setWordGloss] = useState("操场");
  const [promptTitle, setPromptTitle] = useState("After school");
  const [promptQuestion, setPromptQuestion] = useState("What do you usually do after school?");
  const [part, setPart] = useState<Prompt["part"]>("part_1");
  const [imagePreview, setImagePreview] = useState<string | undefined>();

  const saveWord = () => {
    onAddTopicWord(wordTerm, wordGloss);
    setWordTerm("");
    setWordGloss("");
  };

  const savePrompt = () => {
    onAddPrompt({
      title: promptTitle,
      question: promptQuestion,
      part,
      imageUrl: imagePreview,
    });
    setPromptTitle("");
    setPromptQuestion("");
    setImagePreview(undefined);
  };

  const handleImage = (file: File | undefined) => {
    if (!file) return;
    setPart("part_2");
    setImagePreview(URL.createObjectURL(file));
    if (!promptTitle) {
      setPromptTitle("Uploaded image practice");
    }
    if (!promptQuestion) {
      setPromptQuestion("Look at the picture and describe what you can see.");
    }
  };

  return (
    <div className="stack">
      <section className="panel">
        <div className="section-title">
          <h2>家长内容</h2>
          <span>轻量补充</span>
        </div>
        <label className="field">
          <span>添加 Topic Word</span>
          <input value={wordTerm} onChange={(event) => setWordTerm(event.target.value)} placeholder="playground" />
        </label>
        <label className="field">
          <span>中文释义</span>
          <input value={wordGloss} onChange={(event) => setWordGloss(event.target.value)} placeholder="操场" />
        </label>
        <button className="secondary-button full-width" onClick={saveWord}>
          <BookOpen size={18} />
          保存 Topic Word
        </button>
      </section>

      <section className="panel">
        <div className="section-title">
          <h2>Speaking Prompt</h2>
          <span>{prompts.length} 条可用</span>
        </div>
        <div className="segmented">
          <button className={part === "part_1" ? "segment active" : "segment"} onClick={() => setPart("part_1")}>
            Part 1
          </button>
          <button className={part === "part_2" ? "segment active" : "segment"} onClick={() => setPart("part_2")}>
            Part 2
          </button>
        </div>
        <label className="field">
          <span>标题</span>
          <input value={promptTitle} onChange={(event) => setPromptTitle(event.target.value)} placeholder="After school" />
        </label>
        <label className="field">
          <span>问题</span>
          <textarea value={promptQuestion} onChange={(event) => setPromptQuestion(event.target.value)} rows={3} />
        </label>
        <label className="file-drop">
          <Upload size={18} />
          <span>上传 Part 2 图片</span>
          <input type="file" accept="image/*" onChange={(event) => handleImage(event.target.files?.[0])} />
        </label>
        {imagePreview && (
          <img className="image-preview" src={imagePreview} alt="Guardian uploaded Part 2 practice" />
        )}
        <button className="primary-button full-width" onClick={savePrompt}>
          <FolderPlus size={18} />
          保存 Prompt
        </button>
      </section>

      <section className="note-band">
        <p>上传图片后，AI 会生成 PET Part 2 风格提示和关键词；Guardian 可以先检查再给 Learner 使用。</p>
        <button className="text-button" onClick={onResetDemoData}>
          重置演示数据
        </button>
      </section>
    </div>
  );
}

function Metric({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="metric">
      {icon}
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function WordList({ words, compact = false }: { words: WeakWord[]; compact?: boolean }) {
  return (
    <div className={compact ? "chips compact" : "chips"}>
      {words.map((word) => (
        <span className="chip" key={word.term}>
          {word.term}
          <small>{word.chineseGloss}</small>
        </span>
      ))}
    </div>
  );
}

function WordShadowingList({
  words,
  inputs,
  feedback,
  onSpeak,
  onInputChange,
  onCheck,
}: {
  words: WeakWord[];
  inputs: Record<string, string>;
  feedback: Record<string, WordShadowingFeedback>;
  onSpeak: (text: string) => void;
  onInputChange: (word: string, value: string) => void;
  onCheck: (word: WeakWord) => void;
}) {
  if (words.length === 0) {
    return (
      <div className="mini-empty">
        <CheckCircle2 size={22} />
        <p>今天没有到期 Weak Words，可以直接进入 Speaking Part 1。</p>
      </div>
    );
  }

  return (
    <div className="shadow-list">
      {words.map((word) => {
        const result = feedback[word.term];

        return (
          <article className="shadow-card" key={word.term}>
            <div className="shadow-word">
              <div>
                <h3>{word.term}</h3>
                <p>{word.chineseGloss}</p>
              </div>
              <button className="secondary-button" onClick={() => onSpeak(word.term)}>
                <Volume2 size={18} />
                英音
              </button>
            </div>
            <label className="field compact-field">
              <span>跟读后输入识别到的英文</span>
              <input
                value={inputs[word.term] ?? ""}
                onChange={(event) => onInputChange(word.term, event.target.value)}
                placeholder={word.term}
              />
            </label>
            <div className="split-actions">
              <button className="secondary-button" onClick={() => onSpeak(`I can say ${word.term} clearly.`)}>
                <Play size={18} />
                句子示范
              </button>
              <button className="primary-button" onClick={() => onCheck(word)}>
                <CheckCircle2 size={18} />
                跟读反馈
              </button>
            </div>
            {result && (
              <p className={result.status === "clear" ? "shadow-feedback clear" : "shadow-feedback needs-practice"}>
                {result.feedback}
              </p>
            )}
          </article>
        );
      })}
    </div>
  );
}

function TabButton({
  active,
  icon,
  onClick,
  children,
}: {
  active: boolean;
  icon: React.ReactNode;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button className={active ? "tab active" : "tab"} onClick={onClick}>
      {icon}
      <span>{children}</span>
    </button>
  );
}

function useServerHousehold() {
  const [household, setHousehold] = useState<HouseholdSpace>(() => createDemoHousehold());
  const [loaded, setLoaded] = useState(false);
  const [syncState, setSyncState] = useState("连接中");

  useEffect(() => {
    let cancelled = false;

    fetch("/api/household")
      .then((response) => response.json())
      .then((data: { household: HouseholdSpace }) => {
        if (cancelled) return;
        setHousehold(data.household);
        setLoaded(true);
        setSyncState("已连接");
      })
      .catch(() => {
        if (cancelled) return;
        setLoaded(true);
        setSyncState("本地模式");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!loaded) return;

    const timeout = window.setTimeout(() => {
      setSyncState("保存中");
      fetch("/api/household", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ household }),
      })
        .then(() => setSyncState("已保存"))
        .catch(() => setSyncState("保存失败"));
    }, 450);

    return () => window.clearTimeout(timeout);
  }, [household, loaded]);

  return [household, setHousehold, syncState] as const;
}

async function uploadRecording(blob: Blob, promptTitle: string) {
  const form = new FormData();
  form.append("audio", blob, "speaking.webm");
  form.append("promptTitle", promptTitle);

  try {
    const response = await fetch("/api/audio/transcribe", {
      method: "POST",
      body: form,
    });

    if (!response.ok) return null;

    return (await response.json()) as {
      transcript: string;
      recording: RecentRecording;
      household: HouseholdSpace;
    };
  } catch {
    return null;
  }
}

async function speakBritish(text: string) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;

  try {
    const response = await fetch("/api/audio/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.onended = () => URL.revokeObjectURL(url);
      await audio.play();
      return;
    }
  } catch {
    // Fall back to the browser voice below.
  }

  const utterance = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis.getVoices();
  const britishVoice =
    voices.find((voice) => voice.lang === "en-GB") ??
    voices.find((voice) => voice.lang.startsWith("en"));

  if (britishVoice) {
    utterance.voice = britishVoice;
  }

  utterance.lang = britishVoice?.lang ?? "en-GB";
  utterance.rate = 0.86;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

function toDateKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function stageLabel(stage: WeakWord["reviewStage"]) {
  if (stage === "new") return "新出现";
  if (stage === "tomorrow") return "明天复习";
  if (stage === "threeDaysLater") return "三天后复习";
  return "已掌握";
}
