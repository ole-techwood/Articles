import { historyRepositoryFactory } from "../data";

export const useHistoryList = () => {
  const historyRepository = historyRepositoryFactory();

  return { history };
};
