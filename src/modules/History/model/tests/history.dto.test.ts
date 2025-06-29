import { describe, it, expect } from "vitest";
import { createHistoryRecordDTO } from "../history.dto";

describe("createHistoryRecordDTO", () => {
  it("should parse valid input", () => {
    const valid = {
      flagImage: "flag.png",
      countryName: "Ukraine",
      userAnswer: "Ukraine",
    };

    expect(createHistoryRecordDTO.parse(valid)).toEqual(valid);
  });

  it("should fail for empty strings", () => {
    const edge = {
      flagImage: "",
      countryName: "",
      userAnswer: "",
    };

    expect(() => createHistoryRecordDTO.parse(edge)).toThrow();
  });

  it("should fail for missing fields", () => {
    expect(() => createHistoryRecordDTO.parse({})).toThrow();
    expect(() =>
      createHistoryRecordDTO.parse({ flagImage: "f.png" })
    ).toThrow();
  });

  it("should fail for wrong types", () => {
    expect(() =>
      createHistoryRecordDTO.parse({
        flagImage: 123,
        countryName: true,
        userAnswer: null,
      })
    ).toThrow();
  });
});
