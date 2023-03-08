import { FetchplusResponse } from './types';
export declare class FailedToFetchError extends Error {
    constructor();
}
export declare class FetchplusApiError extends Error {
    headers: Headers;
    body: any;
    status: number;
    statusText: string;
    constructor(response: FetchplusResponse);
}
