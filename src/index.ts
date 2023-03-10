import { handleFetchError, handleFetchSuccess } from './fetchResponseUtils';
import { getFetchOptions, getFetchUrl } from './fetchRequestUtils';
import { FetchplusOptions, FetchplusResponse } from './types';

/**
 *
 * @param baseUrl Request url, without query params
 * @param options Request options
 * @returns fetch response, with body parsed according to response content-type header
 * @throws FailedToFetchError, FetchplusError
 */
export const fetchplus = async (
  baseUrl: string,
  options: FetchplusOptions
): Promise<FetchplusResponse> => {
  const fetchOptions = getFetchOptions(options);
  const url = getFetchUrl(baseUrl, options);

  return fetch(url, fetchOptions)
    .then((response) => handleFetchSuccess(response))
    .then((error) => handleFetchError(error));
};

export * from './types';

export * from './errors';
