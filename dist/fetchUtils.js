import { decamelizeKeys } from 'humps';
import { stringify } from 'qs';
export const getFetchOptions = (fetchplusOptions) => {
    const fetchOptionsHeaders = getFetchOptionsHeaders(fetchplusOptions);
    const fetchOptionsBody = getFetchOptionsBody(fetchplusOptions, fetchOptionsHeaders.get('content-type'));
    return {
        method: fetchplusOptions.method,
        headers: fetchOptionsHeaders,
        body: fetchOptionsBody,
    };
};
export const getFetchUrl = (baseUrl, options) => {
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
const getFetchOptionsBody = (fetchplusOptions, contentTypeHeaderValue) => {
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
const isValidFetchBody = (body) => {
    return (body instanceof FormData ||
        body instanceof ReadableStream ||
        body instanceof Blob ||
        body instanceof ArrayBuffer ||
        body instanceof URLSearchParams ||
        typeof body === 'string');
};
const getFetchOptionsHeaders = (fetchplusOptions) => {
    const headers = new Headers(fetchplusOptions.headers);
    if (!headers.get('content-type') &&
        !(fetchplusOptions.body instanceof FormData) &&
        fetchplusOptions.method !== 'get') {
        headers.set('content-type', 'application/json');
    }
    if (fetchplusOptions.authToken) {
        headers.set('Authorization', `Bearer ${fetchplusOptions.authToken}`);
    }
    return headers;
};
export const getFetchResponseType = (fetchResponse) => {
    const contentType = fetchResponse.headers.get('content-type');
    if (contentType == null) {
        return null;
    }
    else if (contentType.includes('json')) {
        return 'json';
    }
    else if (contentType.includes('text')) {
        return 'text';
    }
    else if (contentType.includes('blob')) {
        return 'blob';
    }
    else if (contentType.includes('x-www-form-urlencoded')) {
        return 'formData';
    }
    else if (contentType.includes('application/vnd.openxmlformats')) {
        return 'blob';
    }
    else if (contentType.includes('application/vnd.ms-excel')) {
        return 'blob';
    }
    else if (contentType.includes('application/vnd.oasis.opendocument.spreadsheet')) {
        return 'blob';
    }
    throw new Error(`Unsupported content type: ${contentType}`);
};
