import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PetPrototype } from "./pet-prototype";

describe("PetPrototype", () => {
  it("starts with learner practice and avoids score-style gamification", () => {
    render(<PetPrototype />);

    expect(screen.getByRole("heading", { name: "今日练习" })).toBeInTheDocument();
    expect(screen.getByText("4 天连续练习")).toBeInTheDocument();
    expect(screen.queryByText(/总分|通过率|金币|排行榜/)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "开始今日练习" }));

    expect(screen.getByText("Talking about school")).toBeInTheDocument();
    expect(screen.getByText("英音目标")).toBeInTheDocument();
    expect(screen.getByText("最多 2 次重录")).toBeInTheDocument();
  });
});
