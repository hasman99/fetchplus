import { handleFetchError, handleFetchSuccess } from './fetchResponseUtils';
import { getFetchOptions, getFetchUrl } from './fetchRequestUtils';
/**
 *
 * @param baseUrl Request url, without query params
 * @param options Request options
 * @returns fetch response, with body parsed according to response content-type header
 * @throws FailedToFetchError, FetchplusError
 */
export const fetchplus = async (baseUrl, options) => {
    const fetchOptions = getFetchOptions(options);
    const url = getFetchUrl(baseUrl, options);
    return fetch(url, fetchOptions)
        .then((response) => handleFetchSuccess(response))
        .then((error) => handleFetchError(error));
};
export * from './types';
export * from './errors';
