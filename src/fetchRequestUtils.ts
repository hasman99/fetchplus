import { FetchplusOptions } from './types';
import { decamelizeKeys } from 'humps';
import { stringify } from 'qs';

export const getFetchOptions = (
  fetchplusOptions: FetchplusOptions
): RequestInit => {
  const fetchOptionsHeaders = getFetchOptionsHeaders(fetchplusOptions);
  const fetchOptionsBody = getFetchOptionsBody(
    fetchplusOptions,
    fetchOptionsHeaders.get('content-type')
  );

  return {
    method: fetchplusOptions.method.toUpperCase(),
    headers: fetchOptionsHeaders,
    body: fetchOptionsBody,
  };
};

export const getFetchUrl = (baseUrl: string, options: FetchplusOptions) => {
  if (!options.query) {
    return baseUrl;
  }

  const decamelizedParams = decamelizeKeys(options.query);

  const queryString = stringify(decamelizedParams, {
    arrayFormat: 'brackets',
    addQueryPrefix: true,
  });

  return `${baseUrl}${queryString}`;
};

const getFetchOptionsBody = (
  fetchplusOptions: FetchplusOptions,
  contentTypeHeaderValue: string | null
) => {
  if (fetchplusOptions.method === 'get' || !contentTypeHeaderValue) {
    return undefined;
  }

  if (contentTypeHeaderValue.includes('json')) {
    return JSON.stringify(fetchplusOptions.body);
  }

  if (isValidFetchBody(fetchplusOptions.body)) {
    return fetchplusOptions.body;
  }

  return undefined;
};

const isValidFetchBody = (body: unknown): body is BodyInit => {
  return (
    body instanceof FormData ||
    body instanceof ReadableStream ||
    body instanceof Blob ||
    body instanceof ArrayBuffer ||
    body instanceof URLSearchParams ||
    typeof body === 'string'
  );
};

const getFetchOptionsHeaders = (
  fetchplusOptions: FetchplusOptions
): Headers => {
  const headers = new Headers(fetchplusOptions.headers);

  if (
    !headers.get('content-type') &&
    !(fetchplusOptions.body instanceof FormData) &&
    fetchplusOptions.method !== 'get'
  ) {
    headers.set('content-type', 'application/json');
  }

  if (fetchplusOptions.authToken) {
    headers.set('Authorization', `Bearer ${fetchplusOptions.authToken}`);
  }

  return headers;
};
