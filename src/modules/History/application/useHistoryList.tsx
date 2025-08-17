import { historyRepositoryFactory } from "../data";
import { historyRecords } from "../model";

export const useHistoryList = () => {
  const historyRepository = historyRepositoryFactory();

  const history = historyRepository.getHistory();

  const result = historyRecords.safeParse(history);

  if (result.error) {
    return { error: result.error.message, history: [] };
  }

  return { history };
};
