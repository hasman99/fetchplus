import { FailedToFetchError, FetchplusApiError } from './errors';
import {
  getFetchOptions,
  getFetchResponseType,
  getFetchUrl,
} from './fetchUtils';
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

const handleFetchSuccess = async (fetchResponse: Response) => {
  const responseType = getFetchResponseType(fetchResponse);
  const body =
    responseType == null ? null : await fetchResponse[responseType]();

  const parsedResponse: FetchplusResponse = {
    headers: fetchResponse.headers,
    body,
    status: fetchResponse.status,
    statusText: fetchResponse.statusText,
  };

  return fetchResponse.ok
    ? Promise.resolve(parsedResponse)
    : Promise.reject(new FetchplusApiError(parsedResponse));
};

const handleFetchError = (error: any) => {
  if (error.message === 'Failed to fetch') {
    return Promise.reject(new FailedToFetchError());
  }

  return Promise.reject(error);
};
