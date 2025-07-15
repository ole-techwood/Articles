import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { QuizResult } from "../QuizResult";
import type { QuizResultProps } from "../../model";

// Mock Material-UI components
vi.mock("@mui/material", () => ({
  Stack: ({ children }: any) => <div data-testid="stack">{children}</div>,
  Typography: ({ children, color, ...props }: any) => (
    <p data-color={color} {...props}>
      {children}
    </p>
  ),
  Alert: ({ children, severity, variant }: any) => (
    <div data-testid="alert" data-severity={severity} data-variant={variant}>
      {children}
    </div>
  ),
}));

describe("QuizResult", () => {
  const mockCorrectResult = {
    flagImage: "https://example.com/flag.png",
    countryName: "France",
    userAnswer: "france",
  };

  const mockIncorrectResult = {
    flagImage: "https://example.com/flag.png",
    countryName: "France",
    userAnswer: "Germany",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render success message for correct answer", () => {
    const props: QuizResultProps = { result: mockCorrectResult };

    render(<QuizResult {...props} />);

    expect(screen.getByText("Brilliant work!")).toBeDefined();
    expect(screen.getByText("France")).toBeDefined();

    const successAlert = screen.getByTestId("alert");
    expect(successAlert.getAttribute("data-severity")).toBe("success");
  });

  it("should render failure message for incorrect answer", () => {
    const props: QuizResultProps = { result: mockIncorrectResult };

    render(<QuizResult {...props} />);

    expect(
      screen.getByText("No worries. Learning is a process!")
    ).toBeDefined();
    expect(screen.getByText("Correct answer")).toBeDefined();
    expect(screen.getByText("Germany")).toBeDefined();
    expect(screen.getByText("France")).toBeDefined();

    const alerts = screen.getAllByTestId("alert");
    expect(alerts[0].getAttribute("data-severity")).toBe("warning");
    expect(alerts[1].getAttribute("data-severity")).toBe("success");
  });

  it("should handle case-insensitive comparison", () => {
    const caseInsensitiveResult = {
      flagImage: "https://example.com/flag.png",
      countryName: "FRANCE",
      userAnswer: "france",
    };

    render(<QuizResult result={caseInsensitiveResult} />);

    expect(screen.getByText("Brilliant work!")).toBeDefined();
  });

  it("should display both user answer and correct answer for wrong answers", () => {
    const props: QuizResultProps = { result: mockIncorrectResult };

    render(<QuizResult {...props} />);

    // User's wrong answer should be displayed
    expect(screen.getByText("Germany")).toBeDefined();
    // Correct answer should also be displayed
    expect(screen.getByText("France")).toBeDefined();
    // Should have both warning and success alerts
    const alerts = screen.getAllByTestId("alert");
    expect(alerts).toHaveLength(2);
  });
});
