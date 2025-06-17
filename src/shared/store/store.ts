import { historySlice, type HistorySlice } from "@/modules/History/data";
import { create } from "zustand";

type Store = HistorySlice;

export const store = create<Store>()(() => ({
  ...historySlice(),
}));
