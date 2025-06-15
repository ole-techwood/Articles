import { storageServiceFactory, type StorageService } from "@/shared/storage";
import type { HistoryDTO } from "../model";

class HistoryRepository {
  private readonly storageService: StorageService;
  private readonly storageKey = "history";

  constructor(storageService: StorageService) {
    this.storageService = storageService;
  }

  saveResult(result: HistoryDTO) {
    const historyRecordsStringified = this.storageService.getItem(
      this.storageKey
    );

    const history = [result];

    if (historyRecordsStringified) {
      const historyRecords: HistoryDTO[] = JSON.parse(
        historyRecordsStringified
      );

      return this.storageService.setItem(
        this.storageKey,
        JSON.stringify(history.concat(historyRecords))
      );
    }

    return this.storageService.setItem(
      this.storageKey,
      JSON.stringify(history)
    );
  }

  getResults(): HistoryDTO[] {
    const history = this.storageService.getItem(this.storageKey);

    return !history ? [] : JSON.parse(history);
  }
}

export const historyRepositoryFactory = () => {
  const storageService = storageServiceFactory();

  return new HistoryRepository(storageService);
};
