// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { afterEach, describe, expect, it, vi } from "vitest";

import { categories } from "../../lib/data";
import { StoryFrame } from "../StoryFrame";

describe("StoryFrame", () => {
  afterEach(() => cleanup());

  const category = categories[0];
  const item = category.items[0];

  it("renders the active story and progress state", () => {
    render(
      <StoryFrame
        category={category}
        item={item}
        storyIndex={0}
        isFirstStory={true}
        isLastStory={false}
        onPrevious={vi.fn()}
        onNext={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("region", { name: "Pizza story 1 of 3" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Margherita" }),
    ).toBeInTheDocument();
    expect(screen.getByText("€12.00")).toBeInTheDocument();
    expect(screen.getByText("1 / 3")).toBeInTheDocument();
    expect(
      screen.getAllByRole("button", { name: "Previous story" })[0],
    ).toBeDisabled();
    expect(
      screen.getAllByRole("button", { name: "Next story" })[0],
    ).not.toBeDisabled();
  });

  it("calls the provided handlers when the story controls are clicked", () => {
    const onPrevious = vi.fn();
    const onNext = vi.fn();

    render(
      <StoryFrame
        category={category}
        item={item}
        storyIndex={1}
        isFirstStory={false}
        isLastStory={false}
        onPrevious={onPrevious}
        onNext={onNext}
      />,
    );

    fireEvent.click(
      screen.getAllByRole("button", { name: "Previous story" })[0],
    );
    fireEvent.click(screen.getAllByRole("button", { name: "Next story" })[0]);

    expect(onPrevious).toHaveBeenCalledTimes(1);
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it("calls the navigation handler on left and right arrow keys", () => {
    const onPrevious = vi.fn();
    const onNext = vi.fn();

    render(
      <StoryFrame
        category={category}
        item={item}
        storyIndex={1}
        isFirstStory={false}
        isLastStory={false}
        onPrevious={onPrevious}
        onNext={onNext}
      />,
    );

    fireEvent.keyDown(
      screen.getAllByRole("button", { name: "Previous story" })[0],
      { key: "ArrowLeft" },
    );
    fireEvent.keyDown(
      screen.getAllByRole("button", { name: "Next story" })[0],
      { key: "ArrowRight" },
    );

    expect(onPrevious).toHaveBeenCalledTimes(1);
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it("disables both edge buttons when the story is at a boundary", () => {
    render(
      <StoryFrame
        category={category}
        item={item}
        storyIndex={0}
        isFirstStory={true}
        isLastStory={true}
        onPrevious={vi.fn()}
        onNext={vi.fn()}
      />,
    );

    expect(
      screen.getAllByRole("button", { name: "Previous story" })[0],
    ).toBeDisabled();
    expect(
      screen.getAllByRole("button", { name: "Previous story" })[1],
    ).toBeDisabled();
    expect(
      screen.getAllByRole("button", { name: "Next story" })[0],
    ).toBeDisabled();
    expect(
      screen.getAllByRole("button", { name: "Next story" })[1],
    ).toBeDisabled();
  });
});
