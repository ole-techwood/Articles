import { apiServiceFactory, type APIService } from "@/shared/api";
import type { CountryResponse } from "../model";

/**
 * The repository for the Home module of the app
 */
export class HomeRepository {
  /**
   * Classes that we inject into the repository through the constructor
   */
  private readonly apiService: APIService;

  constructor(apiService: APIService) {
    this.apiService = apiService;
  }

  /**
   * Repository's method to find all avaliable countries.
   *
   * Notice, how we didn't specify a proper type for the result of `get` method (used `any` in generics instead).
   * We'll do it later, when we'll develop a model layer
   */
  findCountries() {
    return this.apiService.get<CountryResponse[]>("/all?fields=name,flags");
  }
}

/**
 * Factory method to span a new instance of HomeRepository and avoid singletone
 *
 * It also injects `apiService` into the `HomeRepository`
 */
export const homeRepositoryFactory = () => {
  const apiService = apiServiceFactory(["Home"]);

  return new HomeRepository(apiService);
};
