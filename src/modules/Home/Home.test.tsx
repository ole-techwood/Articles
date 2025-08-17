import { render, screen } from "@testing-library/react";
import { describe, it, vi, expect, beforeEach } from "vitest";

// Capture props passed to Quiz for assertions
let lastQuizProps: any = null;

// Mock the useQuiz hook to control props returned to Home
vi.mock("./application/useQuiz", () => ({
  useQuiz: vi.fn(),
}));

// Mock Quiz view to a simple component we can assert against
vi.mock("./view/Quiz", () => ({
  Quiz: (props: any) => {
    lastQuizProps = props;
    const label = props?.country?.name ?? "no-country";
    return <div data-testid="quiz">{label}</div>;
  },
}));

// Imports go after mocks to ensure the mocked modules are applied before the actual modules are imported and executed.
import { Home } from "./Home";
import { useQuiz } from "./application/useQuiz";

describe("Home", () => {
  beforeEach(() => {
    lastQuizProps = null;
  });

  it("renders Quiz with props returned by useQuiz", () => {
    const mockProps = {
      country: { flag: "https://example.com/fr.png", name: "France" },
      isLoading: false,
      error: null,
      submissionError: "",
      form: {} as any,
      onSubmit: vi.fn(),
      result: undefined,
    };

    vi.mocked(useQuiz).mockReturnValue(mockProps as any);

    render(<Home />);

    // Quiz should be rendered and receive the same props
    expect(!!screen.getByTestId("quiz")).toBe(true);
    expect(screen.getByTestId("quiz").textContent).toBe("France");
    expect(lastQuizProps).toMatchObject(mockProps);
  });

  it("renders Quiz even when country is null and loading is true", () => {
    const mockProps = {
      country: null,
      isLoading: true,
      error: null,
      submissionError: "",
      form: {} as any,
      onSubmit: vi.fn(),
      result: undefined,
    };

    vi.mocked(useQuiz).mockReturnValue(mockProps as any);

    render(<Home />);

    // Still renders Quiz and shows our fallback label
    expect(!!screen.getByTestId("quiz")).toBe(true);
    expect(screen.getByTestId("quiz").textContent).toBe("no-country");
    expect(lastQuizProps).toMatchObject(mockProps);
  });

  it("passes error from useQuiz down to Quiz", () => {
    const error = new Error("Network failed");
    const mockProps = {
      country: null,
      isLoading: false,
      error,
      submissionError: "",
      form: {} as any,
      onSubmit: vi.fn(),
      result: undefined,
    };

    vi.mocked(useQuiz).mockReturnValue(mockProps as any);

    render(<Home />);

    // Quiz is rendered and receives the error prop
    expect(!!screen.getByTestId("quiz")).toBe(true);
    expect(lastQuizProps.error).toBe(error);
  });
});
