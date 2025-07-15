import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { QuizForm } from "../QuizForm";
import type { QuizFormProps } from "../../model";

// Mock Material-UI components
vi.mock("@mui/material", () => ({
  TextField: ({ label, value, onChange, error, helperText, ...props }: any) => (
    <div>
      <label htmlFor="answer-input">{label}</label>
      <input
        id="answer-input"
        value={value}
        onChange={onChange}
        data-error={error}
        {...props}
      />
      {helperText && <span data-testid="helper-text">{helperText}</span>}
    </div>
  ),
}));

describe("QuizForm", () => {
  const mockHandleChange = vi.fn();

  const mockField = {
    state: {
      value: "",
      meta: {
        isValid: true,
        errors: [],
      },
    },
    handleChange: mockHandleChange,
  };

  const mockForm = {
    Field: ({ children }: any) => children(mockField),
  } as any;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render form with text input field", () => {
    const props: QuizFormProps = { form: mockForm };

    render(<QuizForm {...props} />);

    expect(screen.getByLabelText("Your answer")).toBeDefined();
    expect(screen.getByRole("textbox")).toBeDefined();
  });

  it("should display current field value", () => {
    const formWithValue = {
      Field: ({ children }: any) =>
        children({
          ...mockField,
          state: {
            ...mockField.state,
            value: "Test Answer",
          },
        }),
    } as any;

    render(<QuizForm form={formWithValue} />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveProperty("value", "Test Answer");
  });

  it("should call handleChange when user types", () => {
    const props: QuizFormProps = { form: mockForm };

    render(<QuizForm {...props} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "New Answer" } });

    expect(mockHandleChange).toHaveBeenCalledWith("New Answer");
  });

  it("should show error state when field is invalid", () => {
    const formWithError = {
      Field: ({ children }: any) =>
        children({
          ...mockField,
          state: {
            ...mockField.state,
            meta: {
              isValid: false,
              errors: ["This field is required"],
            },
          },
        }),
    } as any;

    render(<QuizForm form={formWithError} />);

    const input = screen.getByRole("textbox");
    expect(input.getAttribute("data-error")).toBe("true");
    expect(screen.getByTestId("helper-text").textContent).toBe(
      "This field is required"
    );
  });

  it("should handle field state changes", () => {
    const { rerender } = render(<QuizForm form={mockForm} />);

    let input = screen.getByRole("textbox");
    expect(input).toHaveProperty("value", "");

    const updatedForm = {
      Field: ({ children }: any) =>
        children({
          ...mockField,
          state: {
            ...mockField.state,
            value: "Updated Answer",
          },
        }),
    } as any;

    rerender(<QuizForm form={updatedForm} />);

    // Get the input again after rerender
    input = screen.getByRole("textbox");
    expect(input).toHaveProperty("value", "Updated Answer");
  });
});
