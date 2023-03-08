import { FailedToFetchError, FetchplusApiError } from './errors';
import { FetchplusResponse } from './types';

export const handleFetchSuccess = async (fetchResponse: Response) => {
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

export const handleFetchError = (error: any) => {
  if (error.message === 'Failed to fetch') {
    return Promise.reject(new FailedToFetchError());
  }

  return Promise.reject(error);
};

type FetchResponseType =
  | 'arrayBuffer'
  | 'blob'
  | 'formData'
  | 'json'
  | 'text'
  | null;

export const getFetchResponseType = (
  fetchResponse: Response
): FetchResponseType => {
  const contentType = fetchResponse.headers.get('content-type');

  if (contentType == null) {
    return null;
  } else if (contentType.includes('json')) {
    return 'json';
  } else if (contentType.includes('text')) {
    return 'text';
  } else if (contentType.includes('blob')) {
    return 'blob';
  } else if (contentType.includes('x-www-form-urlencoded')) {
    return 'formData';
  } else if (contentType.includes('application/vnd.openxmlformats')) {
    return 'blob';
  } else if (contentType.includes('application/vnd.ms-excel')) {
    return 'blob';
  } else if (
    contentType.includes('application/vnd.oasis.opendocument.spreadsheet')
  ) {
    return 'blob';
  }

  throw new Error(`Unsupported content type: ${contentType}`);
};
