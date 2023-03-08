import { FetchplusOptions, FetchplusResponse } from './types';
/**
 *
 * @param baseUrl Request url, without query params
 * @param options Request options
 * @returns fetch response, with body parsed according to response content-type header
 * @throws FailedToFetchError, FetchplusError
 */
export declare const fetchplus: (baseUrl: string, options: FetchplusOptions) => Promise<FetchplusResponse>;
export * from './types';
export * from './errors';
