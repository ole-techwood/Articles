import type { HistoryDTO } from "../model";
import { historySlice } from "./history.slice";

/**
 * Repository for managing history in browser storage.
 */
class HistoryRepository {
  /**
   * Service used to access the data.
   */
  private readonly storageService: typeof historySlice;

  constructor(storageService: typeof historySlice) {
    this.storageService = storageService;
  }

  /**
   * Saves a new result to the beginning of the history array.
   *
   * @param result - The new result to save (HistoryDTO)
   */
  saveAnswer(result: HistoryDTO) {
    return this.storageService.getState().saveAnswer(result);
  }

  /**
   * Returns an array of all saved history results.
   * If no history exists, returns an empty array.
   *
   * @returns Array of history records.
   */
  getHistory() {
    return this.storageService((state) => state.history);
  }
}

/**
 * Factory function to create a HistoryRepository instance with an attached `historySlice` as `storageService`.
 *
 * @returns A new HistoryRepository instance
 */
export const historyRepositoryFactory = () =>
  new HistoryRepository(historySlice);
