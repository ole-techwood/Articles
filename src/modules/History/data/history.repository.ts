import type { CreateHistoryRecordDTO } from "../model";
import { historySlice } from "./history.slice";

/**
 * Repository for managing history in browser storage.
 */
class HistoryRepository {
  /**
   * Service used to access the data.
   */
  private readonly slice: typeof historySlice;

  constructor(slice: typeof historySlice) {
    this.slice = slice;
  }

  /**
   * Saves a new result to the beginning of the history array.
   *
   * Append `createdAt` timestamp to indicate when the record was created
   *
   * @param createHistoryRecordDto - The new result to save
   */
  saveAnswer(createHistoryRecordDto: CreateHistoryRecordDTO) {
    return this.slice
      .getState()
      .saveAnswer({ ...createHistoryRecordDto, createdAt: Date.now() });
  }

  /**
   * Returns an array of all saved history records.
   * If no history exists, returns an empty array.
   *
   * @returns Array of history records.
   */
  getHistory() {
    return this.slice((state) => state.history);
  }
}

/**
 * Factory function to create a HistoryRepository instance.
 *
 * @returns A new HistoryRepository instance
 */
export const historyRepositoryFactory = () =>
  new HistoryRepository(historySlice);
