import { historySlice } from "./history.slice";

/**
 * Repository for managing history in browser storage.
 */
class HistoryRepository {
  /**
   * Service used to access the data.
   */
  private readonly historySlice: typeof historySlice;

  constructor(historySlice: typeof historySlice) {
    this.historySlice = historySlice;
  }

  /**
   * Saves a new result to the beginning of the history array.
   *
   * @param result - The new result to save
   */
  saveAnswer(result: any) {
    return this.storageService.getState().saveAnswer(result);
  }

  /**
   * Returns an array of all saved history records.
   * If no history exists, returns an empty array.
   *
   * @returns Array of history records.
   */
  getHistory() {
    return this.storageService((state) => state.history);
  }
}

/**
 * Factory function to create a HistoryRepository instance.
 *
 * @returns A new HistoryRepository instance
 */
export const historyRepositoryFactory = () =>
  new HistoryRepository(historySlice);
