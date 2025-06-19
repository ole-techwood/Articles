import type { APIService } from "@/shared/api/api.service";
import { describe, expect, it, vi } from "vitest";
import { HomeRepository, homeRepositoryFactory } from "../home.repository";

// Mock APIService
function createMockApiService(getImpl?: any): APIService {
  return {
    get: getImpl || vi.fn(),
  } as unknown as APIService;
}

describe("HomeRepository", () => {
  let apiService: APIService;

  describe("findCountries", () => {
    it("should return countries", async () => {
      const mockCountries = [
        {
          name: {
            common: "Ukraine",
            official: "Ukraine",
            nativeName: {
              ukr: { official: "Україна", common: "Україна" },
            },
          },
          flags: {
            png: "ua.png",
            svg: "ua.svg",
            alt: "Flag of Ukraine",
          },
        },
        {
          name: {
            common: "Poland",
            official: "Republic of Poland",
            nativeName: {
              pol: { official: "Rzeczpospolita Polska", common: "Polska" },
            },
          },
          flags: {
            png: "pl.png",
            svg: "pl.svg",
            alt: "Flag of Poland",
          },
        },
      ];

      apiService = createMockApiService(
        vi.fn().mockResolvedValue(mockCountries)
      );

      // Easily inject any apiService into HomeRepository
      const repo = new HomeRepository(apiService);
      const result = await repo.findCountries();

      expect(result).toEqual(mockCountries);
    });

    it("should return empty array", async () => {
      apiService = createMockApiService(vi.fn().mockResolvedValue([]));

      const repo = new HomeRepository(apiService);
      const result = await repo.findCountries();

      expect(result).toEqual([]);
    });

    it("should fail when API throws", async () => {
      apiService = createMockApiService(
        vi.fn().mockRejectedValue(new Error("API fail"))
      );
      const repo = new HomeRepository(apiService);
      await expect(repo.findCountries()).rejects.toThrow("API fail");
    });
  });
});

describe("homeRepositoryFactory", () => {
  it("should return HomeRepository instance with working apiService", () => {
    const repo = homeRepositoryFactory();

    expect(repo).toBeDefined();
    expect(typeof repo.findCountries).toBe("function");
  });
});
