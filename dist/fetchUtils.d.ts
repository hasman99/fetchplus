import { FetchplusOptions } from './types';
export declare const getFetchOptions: (fetchplusOptions: FetchplusOptions) => RequestInit;
export declare const getFetchUrl: (baseUrl: string, options: FetchplusOptions) => string;
type FetchResponseType = 'arrayBuffer' | 'blob' | 'formData' | 'json' | 'text' | null;
export declare const getFetchResponseType: (fetchResponse: Response) => FetchResponseType;
export {};
