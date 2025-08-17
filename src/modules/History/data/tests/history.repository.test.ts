import { describe, expect, it, vi, beforeEach } from "vitest";
import {
  HistoryRepository,
  historyRepositoryFactory,
} from "../history.repository";
import type { CreateHistoryRecordDTO } from "../../model";

// Mock historySlice
function createMockHistorySlice(
  getStateImpl?: any,
  selectorImpl?: any
): typeof import("../history.slice").historySlice {
  return Object.assign(selectorImpl || vi.fn(), {
    getState: getStateImpl || vi.fn(),
  }) as any;
}

describe("HistoryRepository", () => {
  let repository: ReturnType<typeof historyRepositoryFactory>;
  let mockSlice: typeof import("../history.slice").historySlice;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should save answer with timestamp and call slice saveAnswer method", () => {
    // Arrange
    const mockSaveAnswer = vi.fn();
    const mockGetState = vi.fn().mockReturnValue({
      saveAnswer: mockSaveAnswer,
    });

    mockSlice = createMockHistorySlice(mockGetState);
    repository = new HistoryRepository(mockSlice);

    const testInput: CreateHistoryRecordDTO = {
      flagImage: "https://example.com/flag.png",
      countryName: "Ukraine",
      userAnswer: "Kyiv",
    };

    const mockTimestamp = 1692345600000;
    vi.spyOn(Date, "now").mockReturnValue(mockTimestamp);

    // Act
    repository.saveAnswer(testInput);

    // Assert
    expect(mockGetState).toHaveBeenCalledTimes(1);
    expect(mockSaveAnswer).toHaveBeenCalledWith({
      ...testInput,
      createdAt: mockTimestamp,
    });
  });

  it("should return empty array when no history exists", () => {
    // Arrange
    const mockSelector = vi.fn().mockReturnValue([]);

    mockSlice = createMockHistorySlice(undefined, mockSelector);
    repository = new HistoryRepository(mockSlice);

    // Act
    const result = repository.getHistory();

    // Assert
    expect(mockSlice).toHaveBeenCalledWith(expect.any(Function));
    expect(result).toEqual([]);
  });

  it("should handle invalid input gracefully by still adding timestamp", () => {
    // Arrange
    const mockSaveAnswer = vi.fn();
    const mockGetState = vi.fn().mockReturnValue({
      saveAnswer: mockSaveAnswer,
    });

    mockSlice = createMockHistorySlice(mockGetState);
    repository = new HistoryRepository(mockSlice);

    const invalidInput = {
      flagImage: "",
      countryName: "",
      userAnswer: "",
    } as CreateHistoryRecordDTO;

    const mockTimestamp = 1692345600000;
    vi.spyOn(Date, "now").mockReturnValue(mockTimestamp);

    // Act
    repository.saveAnswer(invalidInput);

    // Assert
    expect(mockGetState).toHaveBeenCalledTimes(1);
    expect(mockSaveAnswer).toHaveBeenCalledWith({
      ...invalidInput,
      createdAt: mockTimestamp,
    });
  });
});
