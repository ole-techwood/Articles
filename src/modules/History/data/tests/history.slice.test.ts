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
  let store: typeof historySlice;

  const sample = {
    flagImage: "flag.png",
    countryName: "Ukraine",
    userAnswer: "Ukraine",
  };

  // Start from scratch each test case - clear the history
  beforeEach(() => {
    window.localStorage.clear();

    store = historySlice;
    store.getState().clearHistory();
  });

  it("should initialize with empty history", () => {
    expect(store.getState().history).toEqual([]);
  });

  it("should save an answer to history", () => {
    store.getState().saveAnswer(sample);

    expect(store.getState().history[0]).toEqual(sample);
  });

  it("should save multiple answers in correct order", () => {
    const answer = {
      flagImage: "b.png",
      countryName: "Poland",
      userAnswer: "Poland",
    };

    // sample is inserted first, but should appear last in the final array
    store.getState().saveAnswer(sample);

    // answer is inserted last, but should appear first in the final array
    store.getState().saveAnswer(answer);

    expect(store.getState().history[0]).toEqual(answer);

    // sample is second, because Zustand append new value at the start of the array
    expect(store.getState().history[1]).toEqual(sample);
  });

  it("should clear history", () => {
    store.getState().saveAnswer(sample);
    store.getState().clearHistory();

    expect(store.getState().history).toEqual([]);
  });
});
