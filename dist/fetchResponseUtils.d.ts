import { FetchplusResponse } from './types';
export declare const handleFetchSuccess: (fetchResponse: Response) => Promise<FetchplusResponse>;
export declare const handleFetchError: (error: any) => Promise<never>;
type FetchResponseType = 'arrayBuffer' | 'blob' | 'formData' | 'json' | 'text' | null;
export declare const getFetchResponseType: (fetchResponse: Response) => FetchResponseType;
export {};
