import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Quiz } from "../Quiz";
import type { QuizProps } from "../../model";

// Mock Material-UI components to avoid testing library complications
vi.mock("@mui/material", () => ({
  Button: ({ children, onClick, ...props }: any) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  ),
  Card: ({ children }: any) => <div>{children}</div>,
  CardActions: ({ children }: any) => <div>{children}</div>,
  CardContent: ({ children }: any) => <div>{children}</div>,
  CardMedia: ({ title, image }: any) => <img alt={title} src={image} />,
}));

// Mock child components
vi.mock("../QuizForm", () => ({
  QuizForm: ({ form }: any) => (
    <div data-testid="quiz-form">
      QuizForm Component - Form State: {JSON.stringify(form)}
    </div>
  ),
}));

vi.mock("../QuizResult", () => ({
  QuizResult: ({ result }: any) => (
    <div data-testid="quiz-result">
      QuizResult Component - Result: {JSON.stringify(result)}
    </div>
  ),
}));

describe("Quiz Component", () => {
  const mockOnSubmit = vi.fn();

  const mockCountry = {
    flag: "https://example.com/flag.png",
    name: "TestCountry",
  };

  const mockForm = {
    Field: ({ children }: any) =>
      children({ state: { value: "", meta: { isValid: true, errors: [] } } }),
    handleSubmit: vi.fn(),
    resetField: vi.fn(),
  } as any;

  const mockResult = {
    flagImage: "https://example.com/flag.png",
    countryName: "TestCountry",
    userAnswer: "TestAnswer",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render quiz form when no result is provided", () => {
    const props: QuizProps = {
      country: mockCountry,
      form: mockForm,
      result: undefined,
      onSubmit: mockOnSubmit,
    };

    render(<Quiz {...props} />);

    expect(screen.getByTestId("quiz-form")).toBeDefined();
    expect(screen.queryByTestId("quiz-result")).toBeNull();
    expect(screen.getByText("Submit answer")).toBeDefined();
  });

  it("should render quiz result when result is provided", () => {
    const props: QuizProps = {
      country: mockCountry,
      form: mockForm,
      result: mockResult,
      onSubmit: mockOnSubmit,
    };

    render(<Quiz {...props} />);

    expect(screen.getByTestId("quiz-result")).toBeDefined();
    expect(screen.queryByTestId("quiz-form")).toBeNull();
    expect(screen.getByText("Next country")).toBeDefined();
  });

  it("should display country flag with correct attributes", () => {
    const props: QuizProps = {
      country: mockCountry,
      form: mockForm,
      result: undefined,
      onSubmit: mockOnSubmit,
    };

    render(<Quiz {...props} />);

    const flagImage = screen.getByRole("img");
    expect(flagImage).toHaveProperty("src", mockCountry.flag);
    expect(flagImage).toHaveProperty("alt", "Country flag");
  });

  it("should call onSubmit when button is clicked", () => {
    const props: QuizProps = {
      country: mockCountry,
      form: mockForm,
      result: undefined,
      onSubmit: mockOnSubmit,
    };

    render(<Quiz {...props} />);

    const submitButton = screen.getByText("Submit answer");
    fireEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it("should switch between form and result states", () => {
    const { rerender } = render(
      <Quiz
        country={mockCountry}
        form={mockForm}
        result={undefined}
        onSubmit={mockOnSubmit}
      />
    );

    expect(screen.getByTestId("quiz-form")).toBeDefined();

    rerender(
      <Quiz
        country={mockCountry}
        form={mockForm}
        result={mockResult}
        onSubmit={mockOnSubmit}
      />
    );

    expect(screen.getByTestId("quiz-result")).toBeDefined();
    expect(screen.getByText("Next country")).toBeDefined();
  });
});
