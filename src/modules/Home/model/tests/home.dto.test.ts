import { describe, it, expect } from "vitest";
import { countriesPayload } from "../home.dto";

// Import the single country schema
const countryPayload = countriesPayload.element;

describe("countryPayload", () => {
  it("should parse valid input", () => {
    const valid = {
      flags: {
        png: "flag.png",
        svg: "flag.svg",
        alt: "Flag of Ukraine",
      },
      name: {
        common: "Ukraine",
        official: "Ukraine",
        nativeName: {
          ukr: { official: "Україна", common: "Україна" },
        },
      },
    };

    expect(countryPayload.parse(valid)).toEqual(valid);
  });

  it("should fail for empty strings in required fields", () => {
    const invalid = {
      flags: {
        png: "",
        svg: "",
        alt: "",
      },
      name: {
        common: "",
        official: "",
        nativeName: {
          "": { official: "", common: "" },
        },
      },
    };

    expect(() => countryPayload.parse(invalid)).toThrow();
  });

  it("should fail for missing fields", () => {
    expect(() => countryPayload.parse({})).toThrow();
    expect(() =>
      countryPayload.parse({ flags: { png: "a", svg: "b", alt: "c" } })
    ).toThrow();
  });

  it("should fail for wrong types", () => {
    expect(() =>
      countryPayload.parse({
        flags: "not-an-object",
        name: 123,
      })
    ).toThrow();
    expect(() =>
      countryPayload.parse({
        flags: { png: 1, svg: 2, alt: 3 },
        name: { common: [], official: {}, nativeName: null },
      })
    ).toThrow();
  });
});
