"use client";

import {
  BarChart3,
  BookOpen,
  CheckCircle2,
  FolderPlus,
  Home,
  ImageIcon,
  Mic,
  Play,
  RotateCcw,
  Trophy,
  Upload,
  Volume2,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  completeVocabularyReview,
  createDemoHousehold,
  getGuardianProgress,
  getLearnerHome,
  submitSpeakingAttempt,
  startDailySession,
  type DailySession,
  type HouseholdSpace,
  type SpeakingAttemptResult,
  type WeakWord,
} from "@/lib/pet-learning-app";

type Tab = "home" | "session" | "vocabulary" | "guardian" | "content";

const today = new Date("2026-06-26T08:00:00+08:00");

export function PetPrototype() {
  const [household, setHousehold] = useState<HouseholdSpace>(() => createDemoHousehold());
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [session, setSession] = useState<DailySession | null>(null);
  const [attemptNumber, setAttemptNumber] = useState(1);
  const [transcript, setTranscript] = useState(
    "I like science because it is interesting and I usually learn new things.",
  );
  const [feedback, setFeedback] = useState<SpeakingAttemptResult | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const learnerHome = useMemo(() => getLearnerHome(household, today), [household]);
  const guardianProgress = useMemo(() => getGuardianProgress(household, today), [household]);

  const startPractice = () => {
    setSession(startDailySession(household, new Date("2026-06-26T08:05:00+08:00")));
    setAttemptNumber(1);
    setFeedback(null);
    setActiveTab("session");
  };

  const submitAttempt = () => {
    if (!session) return;

    setFeedback(
      submitSpeakingAttempt(session, {
        promptId: "part-1-school",
        transcript,
        attemptNumber,
      }),
    );
  };

  const retake = () => {
    if (attemptNumber >= 3) return;

    setAttemptNumber((value) => value + 1);
    setFeedback(null);
  };

  const completeReview = (word: WeakWord, correct: boolean) => {
    setHousehold((current) =>
      completeVocabularyReview(
        current,
        [{ term: word.term, correct }],
        new Date("2026-06-26T08:20:00+08:00"),
      ),
    );
  };

  return (
    <main className="app-shell">
      <section className="phone-frame" aria-label="PET Learning App">
        <header className="top-bar">
          <div>
            <p className="eyebrow">PET Speaking</p>
            <h1>今日练习</h1>
          </div>
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
              isRecording={isRecording}
              onStart={startPractice}
              onTranscriptChange={setTranscript}
              onSubmit={submitAttempt}
              onRetake={retake}
              onToggleRecording={() => setIsRecording((value) => !value)}
            />
          )}

          {activeTab === "vocabulary" && (
            <VocabularyView
              words={learnerHome.dueWeakWords}
              onComplete={completeReview}
            />
          )}

          {activeTab === "guardian" && (
            <GuardianProgressView progress={guardianProgress} />
          )}

          {activeTab === "content" && <GuardianContentView />}
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
  isRecording,
  onStart,
  onTranscriptChange,
  onSubmit,
  onRetake,
  onToggleRecording,
}: {
  session: DailySession | null;
  attemptNumber: number;
  transcript: string;
  feedback: SpeakingAttemptResult | null;
  isRecording: boolean;
  onStart: () => void;
  onTranscriptChange: (value: string) => void;
  onSubmit: () => void;
  onRetake: () => void;
  onToggleRecording: () => void;
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

  return (
    <div className="stack">
      <section className="panel">
        <div className="section-title">
          <h2>Daily Session</h2>
          <span>英音目标</span>
        </div>
        {warmup?.kind === "weak_word_warmup" && <WordList words={warmup.words} compact />}
      </section>

      {part1?.kind === "speaking_part_1" && (
        <section className="practice-card">
          <div className="prompt-head">
            <div>
              <p className="eyebrow">Speaking Part 1</p>
              <h2>{part1.prompt.title}</h2>
            </div>
            <span>最多 2 次重录</span>
          </div>
          <p className="prompt-question">{part1.prompt.question}</p>
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
          <label className="field">
            <span>转写文本</span>
            <textarea value={transcript} onChange={(event) => onTranscriptChange(event.target.value)} rows={4} />
          </label>
          <button className="primary-button full-width" onClick={onSubmit}>
            <CheckCircle2 size={18} />
            生成反馈
          </button>
        </section>
      )}

      {feedback && (
        <section className="feedback-panel">
          <div className="section-title">
            <h2>Practice Feedback</h2>
            <span>不显示总分</span>
          </div>
          <p>{feedback.feedback.chinese}</p>
          <blockquote>{feedback.feedback.exampleAnswer}</blockquote>
          <div className="pronunciation">
            <Volume2 size={18} />
            <span>{feedback.feedback.pronunciation.summary}</span>
          </div>
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

function GuardianProgressView({ progress }: { progress: ReturnType<typeof getGuardianProgress> }) {
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
            </div>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="section-title">
          <h2>Recent Recordings</h2>
          <span>7 天保留</span>
        </div>
        {progress.recentRecordings.map((recording) => (
          <div className="recording-row" key={recording.id}>
            <Mic size={18} />
            <div>
              <strong>{recording.promptTitle}</strong>
              <p>{new Date(recording.recordedAt).toLocaleDateString("zh-CN")}</p>
            </div>
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

function GuardianContentView() {
  return (
    <div className="stack">
      <section className="panel">
        <div className="section-title">
          <h2>家长内容</h2>
          <span>轻量补充</span>
        </div>
        <label className="field">
          <span>添加 Part 1 问题</span>
          <input defaultValue="What do you usually do after school?" />
        </label>
        <label className="field">
          <span>添加 Topic Word</span>
          <input defaultValue="playground" />
        </label>
        <button className="secondary-button full-width">
          <Upload size={18} />
          上传 Part 2 图片
        </button>
      </section>

      <section className="note-band">
        <p>上传图片后，AI 会生成 PET Part 2 风格提示和关键词；Guardian 可以先检查再给 Learner 使用。</p>
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

function stageLabel(stage: WeakWord["reviewStage"]) {
  if (stage === "new") return "新出现";
  if (stage === "tomorrow") return "明天复习";
  if (stage === "threeDaysLater") return "三天后复习";
  return "已掌握";
}
