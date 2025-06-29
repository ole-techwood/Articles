import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { HistoryRecord } from "../model";

export type HistorySlice = {
  history: HistoryRecord[];
  saveAnswer: (result: HistoryRecord) => void;
  clearHistory: () => void;
};

export const historySlice = create<HistorySlice>()(
  persist(
    (set) => ({
      history: [],

      // Saves the user's answer to the localStorage
      saveAnswer: (answer) =>
        set((state) => ({ history: [answer, ...state.history] })),

      // Clears the history from the localStorage
      clearHistory: () => set({ history: [] }),
    }),
    {
      // localStorage key
      name: "history",

      // Tells Zustand to use localStorage as a persistent storage for our data
      storage: createJSONStorage(() => localStorage),
    }
  )
);
