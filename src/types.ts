type QueryParamPrimitiveValue = string | number | boolean | null;

export type QueryParams = Record<
  string,
  QueryParamPrimitiveValue | Array<QueryParamPrimitiveValue>
>;

export type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

export type FetchplusOptions = {
  method: HttpMethod;
  headers?: Record<string, string>;
  body?: any;
  authToken?: string;
  query?: QueryParams;
};

export type FetchplusResponse = {
  headers: Headers;
  body: any;
  status: number;
  statusText: string;
};
