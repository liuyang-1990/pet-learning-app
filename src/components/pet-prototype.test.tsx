import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { addGuardianPrompt, createDemoHousehold } from "@/lib/pet-learning-app";
import { PetPrototype } from "./pet-prototype";

describe("PetPrototype", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn((url: string, init?: RequestInit) => {
        if (url === "/api/household" && init?.method === "PUT") {
          return Promise.resolve(Response.json({ household: createDemoHousehold() }));
        }

        return Promise.resolve(Response.json({ household: createDemoHousehold() }));
      }),
    );
  });

  it("starts with learner practice and avoids score-style gamification", async () => {
    render(<PetPrototype />);

    expect(await screen.findByText("已连接")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "家庭入口" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Learner 登录" }));

    expect(screen.getByRole("heading", { name: "今日练习" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "首页" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "练习" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "单词" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "进度" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "内容" })).not.toBeInTheDocument();
    expect(screen.getByText(/\d+ 天连续练习/)).toBeInTheDocument();
    expect(screen.queryByText(/总分|通过率|金币|排行榜/)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "开始今日练习" }));

    expect(screen.getByText("Talking about school")).toBeInTheDocument();
    expect(screen.getByText("英音目标")).toBeInTheDocument();
    expect(screen.getByText("最多 2 次重录")).toBeInTheDocument();
    expect(screen.queryByLabelText("跟读后输入识别到的英文")).not.toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: "录音评分" }).length).toBeGreaterThan(0);
    expect(screen.getAllByText("自然口语例句").length).toBeGreaterThan(0);
    expect(screen.getByRole("button", { name: "随机切换 Part 2 图片" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "开始 Part 2 录音" })).toBeInTheDocument();
    expect(screen.getByLabelText("确认 Part 2 转写")).toBeInTheDocument();

  });

  it("shows guardian progress and content without learner practice tabs", async () => {
    render(<PetPrototype />);

    await screen.findByText("已连接");
    fireEvent.click(screen.getByRole("button", { name: "Guardian 登录" }));

    expect(screen.getByRole("heading", { name: "家长进度" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "进度" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "内容" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "首页" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "练习" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "单词" })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "内容" }));
    expect(screen.getByLabelText("每日新词数量")).toHaveValue(5);
    expect(screen.getByLabelText("每日 Weak Words 上限")).toHaveValue(5);
  });

  it("presents speaking part 1 and part 2 as spoken examiner flows with hidden text hints", async () => {
    render(<PetPrototype />);

    await screen.findByText("已连接");
    fireEvent.click(screen.getByRole("button", { name: "Learner 登录" }));
    fireEvent.click(screen.getByRole("button", { name: "开始今日练习" }));

    expect(screen.getByRole("heading", { name: "Speaking Part 1" })).toBeInTheDocument();
    expect(screen.getByText("先听考官问题，再录音回答。听不清时再打开 Text Hint。")).toBeInTheDocument();
    expect(screen.queryByText("What is your favourite subject at school, and why?")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "播放 Part 1 考官问题" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "显示 Part 1 Text Hint" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "开始 Part 1 录音" })).toBeInTheDocument();
    expect(screen.getByLabelText("确认 Part 1 转写")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "显示 Part 1 Text Hint" }));
    expect(screen.getByText("What is your favourite subject at school, and why?")).toBeInTheDocument();
    expect(screen.getByText("Text Hint Usage 只记录为听力支持，不扣分。")).toBeInTheDocument();

    expect(screen.getByRole("heading", { name: "Speaking Part 2" })).toBeInTheDocument();
    expect(screen.queryByText("图片一直可见；先听任务指令，再描述人物、动作、地点和位置。")).not.toBeInTheDocument();
    expect(screen.queryByText("Farm visit")).not.toBeInTheDocument();
    expect(screen.queryByText("Look at the picture and describe what the people are doing.")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "播放 Part 2 考官指令" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "显示 Part 2 Text Hint" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "开始 Part 2 录音" })).toBeInTheDocument();
    expect(screen.getByLabelText("确认 Part 2 转写")).toBeInTheDocument();
  });

  it("syncs remote guardian word theme changes into an open learner home", async () => {
    let remoteHousehold = {
      ...createDemoHousehold(),
      wordBank: [
        { term: "subject", chineseGloss: "科目", theme: "school", source: "cambridge" },
        { term: "class", chineseGloss: "课", theme: "school", source: "cambridge" },
        { term: "teacher", chineseGloss: "老师", theme: "school", source: "cambridge" },
        { term: "lesson", chineseGloss: "课程", theme: "school", source: "cambridge" },
        { term: "library", chineseGloss: "图书馆", theme: "school", source: "cambridge" },
        { term: "cousin", chineseGloss: "堂/表兄弟姐妹", theme: "family", source: "cambridge" },
      ],
      seenWords: [],
      weakWords: [],
    };
    vi.stubGlobal(
      "fetch",
      vi.fn((url: string, init?: RequestInit) => {
        if (url === "/api/household" && init?.method === "PUT") {
          remoteHousehold = JSON.parse(String(init.body)).household;
        }

        return Promise.resolve(Response.json({ household: remoteHousehold }));
      }),
    );

    render(<PetPrototype />);

    await screen.findByText("已连接");
    fireEvent.click(screen.getByRole("button", { name: "Learner 登录" }));

    expect(screen.getByText("subject")).toBeInTheDocument();
    expect(screen.queryByText("cousin")).not.toBeInTheDocument();

    remoteHousehold = {
      ...remoteHousehold,
      settings: {
        ...remoteHousehold.settings,
        currentWordTheme: "family",
      },
    };

    await waitFor(() => expect(screen.getByText("cousin")).toBeInTheDocument(), {
      timeout: 3500,
    });
  });

  it("submits answers against a guardian-added part 1 prompt", async () => {
    const household = addGuardianPrompt(createDemoHousehold(), {
      title: "Weekend plans",
      question: "What do you like doing at the weekend?",
      part: "part_1",
    });

    vi.stubGlobal(
      "fetch",
      vi.fn((url: string, init?: RequestInit) => {
        if (url === "/api/ai/part1") {
          return Promise.resolve(new Response(null, { status: 503 }));
        }

        if (url === "/api/household" && init?.method === "PUT") {
          return Promise.resolve(Response.json({ household: JSON.parse(String(init.body)).household }));
        }

        return Promise.resolve(Response.json({ household }));
      }),
    );

    render(<PetPrototype />);

    await screen.findByText("已连接");
    fireEvent.click(screen.getByRole("button", { name: "Learner 登录" }));
    fireEvent.click(screen.getByRole("button", { name: "开始今日练习" }));

    expect(screen.getByText("Weekend plans")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("确认 Part 1 转写"), {
      target: { value: "I usually play football with my friends." },
    });
    fireEvent.click(screen.getByRole("button", { name: "回答并听追问" }));

    expect(await screen.findByText("考官追问已准备，请先听音频。")).toBeInTheDocument();
  });

  it("applies guardian content controls to the learner experience", async () => {
    let remoteHousehold = {
      ...createDemoHousehold(),
      wordBank: [],
      seenWords: [],
      weakWords: [],
    };
    vi.stubGlobal(
      "fetch",
      vi.fn((url: string, init?: RequestInit) => {
        if (url === "/api/household" && init?.method === "PUT") {
          remoteHousehold = JSON.parse(String(init.body)).household;
        }

        return Promise.resolve(Response.json({ household: remoteHousehold }));
      }),
    );

    render(<PetPrototype />);

    await screen.findByText("已连接");
    fireEvent.click(screen.getByRole("button", { name: "Guardian 登录" }));
    fireEvent.click(screen.getByRole("button", { name: "内容" }));

    fireEvent.change(screen.getByLabelText("当前 Word Theme"), {
      target: { value: "family" },
    });
    fireEvent.change(screen.getByLabelText("每日 Weak Words 上限"), {
      target: { value: "2" },
    });
    fireEvent.click(screen.getByRole("button", { name: "保存 Daily 设置" }));
    fireEvent.change(screen.getByLabelText("添加 Topic Word"), {
      target: { value: "nephew" },
    });
    fireEvent.change(screen.getByLabelText("中文释义"), {
      target: { value: "侄子/外甥" },
    });
    fireEvent.click(screen.getByRole("button", { name: "保存 Topic Word" }));

    fireEvent.change(screen.getByLabelText("标题"), {
      target: { value: "Weekend plans" },
    });
    fireEvent.change(screen.getByLabelText("问题"), {
      target: { value: "What do you like doing at the weekend?" },
    });
    fireEvent.click(screen.getByRole("button", { name: "保存 Prompt" }));

    fireEvent.click(screen.getByRole("button", { name: "Part 2" }));
    fireEvent.change(screen.getByLabelText("标题"), {
      target: { value: "Market picture" },
    });
    fireEvent.change(screen.getByLabelText("问题"), {
      target: { value: "Look at the picture and describe what people are buying." },
    });
    fireEvent.click(screen.getByRole("button", { name: "保存 Prompt" }));

    fireEvent.click(screen.getByRole("button", { name: "退出" }));
    fireEvent.click(screen.getByRole("button", { name: "Learner 登录" }));

    expect(screen.getByText("nephew")).toBeInTheDocument();
    expect(screen.getByText("最多 2 个")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "开始今日练习" }));

    expect(screen.getByText("Weekend plans")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "显示 Part 1 Text Hint" }));
    expect(screen.getByText("What do you like doing at the weekend?")).toBeInTheDocument();

    expect(screen.getByText("Market picture")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "显示 Part 2 Text Hint" }));
    expect(screen.getByText("Look at the picture and describe what people are buying.")).toBeInTheDocument();
  });

  it("keeps daily setting edits as a draft until guardian saves them", async () => {
    let remoteHousehold = createDemoHousehold();
    vi.stubGlobal(
      "fetch",
      vi.fn((url: string, init?: RequestInit) => {
        if (url === "/api/household" && init?.method === "PUT") {
          remoteHousehold = JSON.parse(String(init.body)).household;
        }

        return Promise.resolve(Response.json({ household: remoteHousehold }));
      }),
    );

    render(<PetPrototype />);

    await screen.findByText("已连接");
    fireEvent.click(screen.getByRole("button", { name: "Guardian 登录" }));
    fireEvent.click(screen.getByRole("button", { name: "内容" }));

    fireEvent.change(screen.getByLabelText("当前 Word Theme"), {
      target: { value: "family" },
    });
    fireEvent.change(screen.getByLabelText("每日 Weak Words 上限"), {
      target: { value: "2" },
    });

    fireEvent.click(screen.getByRole("button", { name: "退出" }));
    fireEvent.click(screen.getByRole("button", { name: "Learner 登录" }));

    expect(screen.getByText("最多 5 个")).toBeInTheDocument();
  });
});
