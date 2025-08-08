import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useQuiz } from "../useQuiz";

// Mock dependencies
vi.mock("@/modules/History/data", () => ({
  historyRepositoryFactory: vi.fn(() => ({
    saveAnswer: vi.fn(),
  })),
}));

vi.mock("../../data", () => ({
  homeRepositoryFactory: vi.fn(() => ({
    findCountries: vi.fn(() => ({
      queryKey: ["countries"],
      queryFn: vi.fn(),
    })),
  })),
}));

vi.mock("@/modules/History/model", () => ({
  createHistoryRecordDTO: {
    safeParse: vi.fn(),
  },
}));

vi.mock("../../model", () => ({
  countriesPayload: {
    safeParse: vi.fn(),
  },
}));

vi.mock("@tanstack/react-query", () => ({
  useSuspenseQuery: vi.fn(),
}));

vi.mock("@tanstack/react-form", () => ({
  useForm: vi.fn(),
}));

describe("useQuiz Hook", () => {
  const mockRawCountriesResponse = {
    data: [
      {
        flags: { png: "https://example.com/fr.png" },
        name: { common: "France" },
      },
      {
        flags: { png: "https://example.com/de.png" },
        name: { common: "Germany" },
      },
    ],
  };

  const mockTransformedCountries = [
    { flag: "https://example.com/fr.png", name: "France" },
    { flag: "https://example.com/de.png", name: "Germany" },
  ];

  beforeEach(async () => {
    // Mock react-query - now returns already transformed data from queryFn
    const reactQuery = await import("@tanstack/react-query");
    vi.mocked(reactQuery.useSuspenseQuery).mockReturnValue({
      data: mockTransformedCountries,
      isLoading: false,
      error: null,
    } as any);

    // Mock react-form
    const reactForm = await import("@tanstack/react-form");
    vi.mocked(reactForm.useForm).mockReturnValue({
      Field: vi.fn(),
      handleSubmit: vi.fn(),
      resetField: vi.fn(),
      setFieldValue: vi.fn(),
      useField: vi.fn(() => ({
        state: { value: "", meta: { errors: [] } },
      })),
    } as any);

    // Mock model parsers - these are now used in the repository's queryFn
    const model = await import("../../model");
    vi.mocked(model.countriesPayload.safeParse).mockReturnValue({
      success: true,
      data: mockRawCountriesResponse.data,
    } as any);

    const historyModel = await import("@/modules/History/model");
    vi.mocked(historyModel.createHistoryRecordDTO.safeParse).mockReturnValue({
      success: true,
      data: {
        flagImage: "https://example.com/fr.png",
        countryName: "France",
        userAnswer: "france",
      },
    } as any);

    vi.clearAllMocks();
  });

  describe("VALID SCENARIOS", () => {
    it("should initialize with default values and random country", () => {
      const { result } = renderHook(() => useQuiz());

      expect(result.current.country).toBeDefined();
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(result.current.submissionError).toBe("");
    });

    it("should handle successful data loading", () => {
      const { result } = renderHook(() => useQuiz());

      expect(result.current.country).not.toBeNull();
      expect(result.current.country?.flag).toBeDefined();
      expect(result.current.country?.name).toBeDefined();
      expect(["France", "Germany"]).toContain(result.current.country?.name);
    });

    it("should provide form instance with proper configuration", () => {
      const { result } = renderHook(() => useQuiz());

      expect(result.current.form).toBeDefined();
      expect(typeof result.current.onSubmit).toBe("function");
    });
  });

  describe("BOUNDARY CONDITIONS", () => {
    it("should handle single country in dataset", async () => {
      const singleCountry = [
        { flag: "https://example.com/fr.png", name: "France" },
      ];

      const reactQuery = await import("@tanstack/react-query");
      vi.mocked(reactQuery.useSuspenseQuery).mockReturnValue({
        data: singleCountry,
        isLoading: false,
        error: null,
      } as any);

      const { result } = renderHook(() => useQuiz());

      expect(result.current.country).toEqual(singleCountry[0]);
    });

    it("should handle loading state", async () => {
      const reactQuery = await import("@tanstack/react-query");
      vi.mocked(reactQuery.useSuspenseQuery).mockReturnValue({
        data: mockTransformedCountries,
        isLoading: true,
        error: null,
      } as any);

      const { result } = renderHook(() => useQuiz());

      expect(result.current.isLoading).toBe(true);
    });
  });

  describe("EDGE CASES", () => {
    it("should maintain state consistency during re-renders", () => {
      const { result, rerender } = renderHook(() => useQuiz());

      const initialCountry = result.current.country;
      rerender();

      expect(result.current.country).toBeDefined();
      expect(result.current.country).toEqual(initialCountry);
    });

    it("should handle undefined result state", () => {
      const { result } = renderHook(() => useQuiz());

      expect(result.current.result).toBeUndefined();
      expect(typeof result.current.onSubmit).toBe("function");
    });
  });
});
