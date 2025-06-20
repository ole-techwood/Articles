import { beforeEach, describe, expect, it } from "vitest";
import { historySlice } from "../history.slice";

// Mock localStorage for Zustand persist
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("historySlice", () => {
  let slice: typeof historySlice;

  const sample = {
    flagImage: "flag.png",
    countryName: "Ukraine",
    userAnswer: "Ukraine",
  };

  // Start from scratch each test case - clear the history
  beforeEach(() => {
    window.localStorage.clear();

    slice = historySlice;
    slice.getState().clearHistory();
  });

  it("should initialize with empty history", () => {
    expect(slice.getState().history).toEqual([]);
  });

  it("should save an answer to history", () => {
    slice.getState().saveAnswer(sample);

    expect(slice.getState().history[0]).toEqual(sample);
  });

  it("should save multiple answers in correct order", () => {
    const answer = {
      flagImage: "b.png",
      countryName: "Poland",
      userAnswer: "Poland",
    };

    // sample is inserted first, but should appear last in the final array
    slice.getState().saveAnswer(sample);

    // answer is inserted last, but should appear first in the final array
    slice.getState().saveAnswer(answer);

    expect(slice.getState().history[0]).toEqual(answer);

    // sample is second, because Zustand append new value at the start of the array
    expect(slice.getState().history[1]).toEqual(sample);
  });

  it("should clear history", () => {
    slice.getState().saveAnswer(sample);
    slice.getState().clearHistory();

    expect(slice.getState().history).toEqual([]);
  });
});
