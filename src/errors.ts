import { FetchplusResponse } from './types';

export class FailedToFetchError extends Error {
  constructor() {
    super('Failed to fetch');
  }
}

export class FetchplusApiError extends Error {
  headers: Headers;
  body: any;
  status: number;
  statusText: string;

  constructor(response: FetchplusResponse) {
    super();

    this.headers = response.headers;
    this.body = response.body;
    this.status = response.status;
    this.statusText = response.statusText;
  }
}
