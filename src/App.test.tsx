// @vitest-environment jsdom

import { cleanup, fireEvent, render, renderHook, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { afterEach, describe, expect, it, vi } from "vitest";

import App from "./App";
import { categories } from "./ui/lib/data";
import { STORY_DURATION, usePlayback } from "./ui/lib/usePlayback";

afterEach(() => cleanup());

describe("menu data", () => {
	it("opens with Margherita and distinct per-serving nutrition facts", () => {
		const margherita = categories[0].items[0];
		const nutritionValues = categories.flatMap((category) =>
			category.items.map((item) => Object.values(item.nutrition).join("-")),
		);

		expect(margherita.name).toBe("Margherita");
		expect(margherita.nutrition).toEqual({
			calories: 720,
			protein: 28,
			carbohydrates: 82,
			fat: 29,
		});
		expect(new Set(nutritionValues).size).toBe(18);
	});
});

describe("usePlayback", () => {
	it("advances stories after six seconds and stops at the final story", () => {
		vi.useFakeTimers();
		const { result } = renderHook(() => usePlayback());

		act(() => vi.advanceTimersByTime(STORY_DURATION));
		expect(result.current.storyIndex).toBe(1);

		act(() => vi.advanceTimersByTime(STORY_DURATION * 2));
		expect(result.current.storyIndex).toBe(2);
		expect(result.current.elapsed).toBe(STORY_DURATION);
		expect(result.current.playing).toBe(false);
		vi.useRealTimers();
	});
});

describe("Menu Browser", () => {
	it("renders Margherita and its nutrition facts initially", () => {
		render(<App />);

		expect(screen.getByRole("heading", { name: "Margherita" })).toBeInTheDocument();
		expect(screen.getByText("720 kcal")).toBeInTheDocument();
		expect(screen.getByText("28g")).toBeInTheDocument();
		expect(screen.getByText("82g")).toBeInTheDocument();
		expect(screen.getByText("29g")).toBeInTheDocument();
		expect(screen.getAllByRole("progressbar")).toHaveLength(3);
	});

	it("selects a Category and keeps manual navigation within its Story Sequence", () => {
		render(<App />);

		fireEvent.click(screen.getByRole("button", { name: /Pasta/ }));
		expect(screen.getByRole("heading", { name: "Cacio e Pepe" })).toBeInTheDocument();
		expect(screen.getByText("640 kcal")).toBeInTheDocument();

		fireEvent.click(screen.getAllByRole("button", { name: "Previous story" })[0]);
		expect(screen.getByRole("heading", { name: "Cacio e Pepe" })).toBeInTheDocument();

		fireEvent.click(screen.getAllByRole("button", { name: "Next story" })[0]);
		expect(screen.getByRole("heading", { name: "Tagliatelle al Ragù" })).toBeInTheDocument();
	});

	it("pauses while touch is held and replays after the final Story", () => {
		vi.useFakeTimers();
		render(<App />);
		const frame = screen.getByRole("region", { name: /Pizza story 1 of 3/ });

		fireEvent.touchStart(frame);
		act(() => vi.advanceTimersByTime(7000));
		expect(screen.getByRole("heading", { name: "Margherita" })).toBeInTheDocument();
		fireEvent.touchEnd(frame);
		act(() => vi.advanceTimersByTime(6000));
		act(() => vi.advanceTimersByTime(6000));
		act(() => vi.advanceTimersByTime(6000));
		expect(screen.getByRole("heading", { name: "Ortolana" })).toBeInTheDocument();
		fireEvent.click(screen.getByRole("button", { name: "Replay Story Sequence" }));
		expect(screen.getByRole("heading", { name: "Margherita" })).toBeInTheDocument();
		vi.useRealTimers();
	});
});
