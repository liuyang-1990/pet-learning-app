import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createDemoHousehold } from "@/lib/pet-learning-app";
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
    expect(screen.getByRole("heading", { name: "今日练习" })).toBeInTheDocument();
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
    expect(screen.getByRole("button", { name: "Part 2 录音转文本" })).toBeInTheDocument();
    expect(screen.getByLabelText("图片描述回答")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "内容" }));

    expect(screen.getByLabelText("每日新词数量")).toHaveValue(5);
    expect(screen.getByLabelText("每日 Weak Words 上限")).toHaveValue(5);
  });
});
