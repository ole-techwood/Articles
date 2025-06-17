import { historyRepositoryFactory } from "../data";

export const useHistoryList = () => {
  const historyRepository = historyRepositoryFactory();

  const history = historyRepository.getHistory();

  return { history };
};
