import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useHistoryList } from "../useHistoryList";
import type { HistoryRecord } from "../../model";

// Mock the data module
vi.mock("../../data", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../../data")>();
  return {
    ...actual,
    historyRepositoryFactory: vi.fn(),
  };
});

// Mock the model module
vi.mock("../../model", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../../model")>();
  return {
    ...actual,
    historyRecords: {
      safeParse: vi.fn(),
    },
  };
});

describe("useHistoryList", () => {
  let mockHistoryRepository: any;
  let mockHistoryRepositoryFactory: any;
  let mockHistoryRecords: any;

  beforeEach(async () => {
    // Reset all mocks
    vi.clearAllMocks();

    // Setup mock repository
    mockHistoryRepository = {
      getHistory: vi.fn(),
    };

    // Import and setup mock modules
    const dataModule = await import("../../data");
    mockHistoryRepositoryFactory = vi.mocked(
      dataModule.historyRepositoryFactory
    );
    mockHistoryRepositoryFactory.mockReturnValue(mockHistoryRepository);

    const modelModule = await import("../../model");
    mockHistoryRecords = vi.mocked(modelModule.historyRecords);
  });

  it("should return valid history when repository provides correct data", () => {
    // Arrange
    const mockValidHistory: HistoryRecord[] = [
      {
        flagImage: "https://example.com/ukraine-flag.png",
        countryName: "Ukraine",
        userAnswer: "Kyiv",
        createdAt: 1692345600000,
      },
      {
        flagImage: "https://example.com/poland-flag.png",
        countryName: "Poland",
        userAnswer: "Warsaw",
        createdAt: 1692345500000,
      },
    ];

    mockHistoryRepository.getHistory.mockReturnValue(mockValidHistory);
    mockHistoryRecords.safeParse.mockReturnValue({
      success: true,
      data: mockValidHistory,
      error: undefined,
    });

    // Act
    const { result } = renderHook(() => useHistoryList());

    // Assert
    expect(mockHistoryRepositoryFactory).toHaveBeenCalledTimes(1);
    expect(mockHistoryRepository.getHistory).toHaveBeenCalledTimes(1);
    expect(mockHistoryRecords.safeParse).toHaveBeenCalledWith(mockValidHistory);
    expect(result.current).toEqual({ history: mockValidHistory });
    expect(result.current).not.toHaveProperty("error");
  });

  it("should handle empty history array gracefully", () => {
    // Arrange
    const emptyHistory: HistoryRecord[] = [];

    mockHistoryRepository.getHistory.mockReturnValue(emptyHistory);
    mockHistoryRecords.safeParse.mockReturnValue({
      success: true,
      data: emptyHistory,
      error: undefined,
    });

    // Act
    const { result } = renderHook(() => useHistoryList());

    // Assert
    expect(mockHistoryRepositoryFactory).toHaveBeenCalledTimes(1);
    expect(mockHistoryRepository.getHistory).toHaveBeenCalledTimes(1);
    expect(mockHistoryRecords.safeParse).toHaveBeenCalledWith(emptyHistory);
    expect(result.current).toEqual({ history: emptyHistory });
    expect(result.current).not.toHaveProperty("error");
  });

  it("should return error when validation fails with invalid data", () => {
    // Arrange
    const invalidHistory = [
      {
        flagImage: "", // invalid: empty string
        countryName: "Ukraine",
        userAnswer: "Kyiv",
        // missing createdAt field
      },
    ];

    const mockValidationError = {
      message:
        "Validation failed: flagImage must not be empty, createdAt is required",
      issues: [
        {
          path: ["flagImage"],
          message: "String must contain at least 1 character(s)",
        },
        { path: ["createdAt"], message: "Required" },
      ],
    };

    mockHistoryRepository.getHistory.mockReturnValue(invalidHistory);
    mockHistoryRecords.safeParse.mockReturnValue({
      success: false,
      error: mockValidationError,
    });

    // Act
    const { result } = renderHook(() => useHistoryList());

    // Assert
    expect(mockHistoryRepositoryFactory).toHaveBeenCalledTimes(1);
    expect(mockHistoryRepository.getHistory).toHaveBeenCalledTimes(1);
    expect(mockHistoryRecords.safeParse).toHaveBeenCalledWith(invalidHistory);
    expect(result.current).toEqual({
      error:
        "Validation failed: flagImage must not be empty, createdAt is required",
      history: [],
    });
  });
});
