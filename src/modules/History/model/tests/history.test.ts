import { describe, expect, it } from "vitest";
import { historyRecord } from "../history";

describe("HistoryRecord", () => {
  it("should validate correct history record with all required fields", () => {
    // Arrange
    const validRecord = {
      flagImage: "https://example.com/flag.png",
      countryName: "Ukraine",
      userAnswer: "Kyiv",
      createdAt: 1692345600000,
    };

    // Act
    const result = historyRecord.safeParse(validRecord);

    // Assert
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(validRecord);
    }
  });

  it("should handle edge case with minimum valid string lengths and zero timestamp", () => {
    // Arrange
    const edgeCaseRecord = {
      flagImage: "a", // minimum non-empty string
      countryName: "b", // minimum non-empty string
      userAnswer: "c", // minimum non-empty string
      createdAt: 0, // minimum valid timestamp
    };

    // Act
    const result = historyRecord.safeParse(edgeCaseRecord);

    // Assert
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(edgeCaseRecord);
    }
  });

  it("should reject invalid input with empty strings and missing createdAt", () => {
    // Arrange
    const invalidRecord = {
      flagImage: "", // empty string should fail
      countryName: "Ukraine",
      userAnswer: "Kyiv",
      // missing createdAt field
    };

    // Act
    const result = historyRecord.safeParse(invalidRecord);

    // Assert
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toHaveLength(2); // flagImage empty + missing createdAt
      expect(
        result.error.issues.some(
          (issue) =>
            issue.path.includes("flagImage") && issue.code === "too_small"
        )
      ).toBe(true);
      expect(
        result.error.issues.some(
          (issue) =>
            issue.path.includes("createdAt") && issue.code === "invalid_type"
        )
      ).toBe(true);
    }
  });
});
