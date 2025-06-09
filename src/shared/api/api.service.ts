import { queryOptions } from "@tanstack/react-query";
import axios, { type AxiosInstance } from "axios";

/**
 * A facade over HTTP library to perform API requests.
 */
export class APIService {
  /**
   * The Axios client instance used to perform HTTP requests.
   */
  private readonly apiClient: AxiosInstance;

  /**
   * Query key provided by the consumer of the `APIService` class.
   *
   * Used by TanStack Query under the hood.
   */
  private readonly queryKey: string[];

  constructor(apiClient: AxiosInstance, queryKey: string[]) {
    this.apiClient = apiClient;
    this.queryKey = queryKey;
  }

  /**
   * Executes a GET request to the provided API endpoint
   *
   * @template D - The expected response data type.
   *
   * @param endpoint - The path to the API endpoint.
   *
   * @returns Query options object for use with TanStack Query, resolving to the response data.
   */
  get<D>(endpoint: string) {
    return queryOptions({
      queryKey: this.queryKey,
      queryFn: () => this.apiClient.get<D>(endpoint),
    });
  }
}

/**
 * Factory function to create a configured instance of the `APIService` class.
 *
 * @param queryKey - The query key array used for caching and identifying queries in TanStack Query.
 *
 * @returns A configured `APIService` instance ready for making API requests.
 */
export const apiServiceFactory = (queryKey: string[]) => {
  const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    adapter: "fetch",
  });

  return new APIService(apiClient, queryKey);
};
