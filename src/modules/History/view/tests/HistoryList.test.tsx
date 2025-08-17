import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { HistoryList } from "../HistoryList";
import type { HistoryRecord } from "../../model";

// Mock Material-UI components to avoid testing library complications
vi.mock("@mui/material", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@mui/material")>();
  return {
    ...actual,
    Avatar: ({ alt, src, variant }: any) => (
      <img alt={alt} src={src} data-variant={variant} data-testid="avatar" />
    ),
    Divider: ({ component, variant }: any) => (
      <hr
        data-component={component}
        data-variant={variant}
        data-testid="divider"
      />
    ),
    List: ({ children }: any) => <ul data-testid="list">{children}</ul>,
    ListItem: ({ children, secondaryAction }: any) => (
      <li data-testid="list-item">
        {children}
        {secondaryAction && (
          <div data-testid="secondary-action">{secondaryAction}</div>
        )}
      </li>
    ),
    ListItemAvatar: ({ children }: any) => (
      <div data-testid="list-item-avatar">{children}</div>
    ),
    ListItemText: ({ primary, secondary }: any) => (
      <div data-testid="list-item-text">
        <span data-testid="primary">{primary}</span>
        <span data-testid="secondary">{secondary}</span>
      </div>
    ),
  };
});

// Mock Material-UI icons
vi.mock("@mui/icons-material", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@mui/icons-material")>();
  return {
    ...actual,
    Close: ({ color }: any) => (
      <span data-testid="close-icon" data-color={color}>
        ❌
      </span>
    ),
    Done: ({ color }: any) => (
      <span data-testid="done-icon" data-color={color}>
        ✅
      </span>
    ),
  };
});

describe("HistoryList", () => {
  it("should render list with correct answer showing success icon", () => {
    // Arrange
    const mockHistory: HistoryRecord[] = [
      {
        flagImage: "https://example.com/ukraine-flag.png",
        countryName: "Ukraine",
        userAnswer: "ukraine", // case insensitive match
        createdAt: 1692345600000,
      },
    ];

    // Act
    render(<HistoryList history={mockHistory} />);

    // Assert
    expect(screen.getByTestId("list")).toBeDefined();
    expect(screen.getByTestId("list-item")).toBeDefined();
    expect(screen.getByTestId("avatar")).toBeDefined();
    expect(screen.getByTestId("done-icon")).toBeDefined();
    expect(screen.queryByTestId("close-icon")).toBeNull();
    expect(screen.getByTestId("primary").textContent).toBe("ukraine");
    expect(screen.getByTestId("secondary").textContent).toBe("Ukraine");
  });

  it("should handle empty history array gracefully", () => {
    // Arrange
    const emptyHistory: HistoryRecord[] = [];

    // Act
    render(<HistoryList history={emptyHistory} />);

    // Assert
    expect(screen.getByTestId("list")).toBeDefined();
    expect(screen.queryByTestId("list-item")).toBeNull();
    expect(screen.queryByTestId("avatar")).toBeNull();
    expect(screen.queryByTestId("done-icon")).toBeNull();
    expect(screen.queryByTestId("close-icon")).toBeNull();
  });

  it("should render wrong answer with warning icon and handle special characters", () => {
    // Arrange
    const mockHistory: HistoryRecord[] = [
      {
        flagImage: "https://example.com/invalid-flag.png",
        countryName: "Côte d'Ivoire", // special characters
        userAnswer: "Wrong Answer!", // wrong answer with special characters
        createdAt: 1692345600000,
      },
    ];

    // Act
    render(<HistoryList history={mockHistory} />);

    // Assert
    expect(screen.getByTestId("list")).toBeDefined();
    expect(screen.getByTestId("list-item")).toBeDefined();
    expect(screen.getByTestId("avatar")).toBeDefined();
    expect(screen.getByTestId("close-icon")).toBeDefined();
    expect(screen.queryByTestId("done-icon")).toBeNull();
    expect(screen.getByTestId("primary").textContent).toBe("Wrong Answer!");
    expect(screen.getByTestId("secondary").textContent).toBe("Côte d'Ivoire");

    // Verify avatar properties
    const avatar = screen.getByTestId("avatar");
    expect(avatar.getAttribute("alt")).toBe("country-name");
    expect(avatar.getAttribute("src")).toBe(
      "https://example.com/invalid-flag.png"
    );
    expect(avatar.getAttribute("data-variant")).toBe("square");
  });
});
