import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { History } from "./History";
import type { HistoryRecord } from "./model";

// Mock the application hook
vi.mock("./application", async (importOriginal) => {
  const actual = await importOriginal<typeof import("./application")>();
  return {
    ...actual,
    useHistoryList: vi.fn(),
  };
});

// Mock the view component
vi.mock("./view", async (importOriginal) => {
  const actual = await importOriginal<typeof import("./view")>();
  return {
    ...actual,
    HistoryList: vi.fn(({ history, error }: any) => (
      <div data-testid="history-list">
        {error ? (
          <div data-testid="error-message">{error}</div>
        ) : (
          <div data-testid="history-items">
            {history?.map((item: HistoryRecord, index: number) => (
              <div key={index} data-testid="history-item">
                {item.userAnswer} - {item.countryName}
              </div>
            ))}
          </div>
        )}
      </div>
    )),
  };
});

describe("History", () => {
  let mockUseHistoryList: any;

  beforeEach(async () => {
    vi.clearAllMocks();

    // Import and setup mocks
    const applicationModule = await import("./application");
    mockUseHistoryList = vi.mocked(applicationModule.useHistoryList);
  });

  it("should render history list with valid data from useHistoryList hook", () => {
    // Arrange
    const mockHistoryData: HistoryRecord[] = [
      {
        flagImage: "https://example.com/ukraine-flag.png",
        countryName: "Ukraine",
        userAnswer: "Ukraine",
        createdAt: 1692345600000,
      },
      {
        flagImage: "https://example.com/poland-flag.png",
        countryName: "Poland",
        userAnswer: "Poland",
        createdAt: 1692345500000,
      },
    ];

    const mockProps = { history: mockHistoryData };
    mockUseHistoryList.mockReturnValue(mockProps);

    // Act
    render(<History />);

    // Assert
    expect(mockUseHistoryList).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId("history-list")).toBeDefined();
    expect(screen.getByTestId("history-items")).toBeDefined();
    expect(screen.getAllByTestId("history-item")).toHaveLength(2);
    expect(screen.getByText("Ukraine - Ukraine")).toBeDefined();
    expect(screen.getByText("Poland - Poland")).toBeDefined();
  });

  it("should handle empty history gracefully when no data is available", () => {
    // Arrange
    const mockProps = { history: [] };
    mockUseHistoryList.mockReturnValue(mockProps);

    // Act
    render(<History />);

    // Assert
    expect(mockUseHistoryList).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId("history-list")).toBeDefined();
    expect(screen.getByTestId("history-items")).toBeDefined();
    expect(screen.queryAllByTestId("history-item")).toHaveLength(0);
    expect(screen.queryByTestId("error-message")).toBeNull();
  });

  it("should display error message when useHistoryList returns validation error", () => {
    // Arrange
    const mockErrorProps = {
      error:
        "Validation failed: flagImage must not be empty, createdAt is required",
      history: [],
    };
    mockUseHistoryList.mockReturnValue(mockErrorProps);

    // Act
    render(<History />);

    // Assert
    expect(mockUseHistoryList).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId("history-list")).toBeDefined();
    expect(screen.getByTestId("error-message")).toBeDefined();
    expect(
      screen.getByText(
        "Validation failed: flagImage must not be empty, createdAt is required"
      )
    ).toBeDefined();
    expect(screen.queryByTestId("history-items")).toBeNull();
  });
});
