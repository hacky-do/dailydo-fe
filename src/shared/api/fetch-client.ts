import { executeWithRetry } from './auth-retry';
import { BASE_URL } from './base-url.constant';
import {
  buildHeaders,
  parseResponse,
  parseResponseStrict,
} from './fetch-helpers';
import {
  MutationOptionsWithoutMethod,
  QueryOptionsWithoutMethod,
} from './fetch-options.type';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const request = (
  method: HttpMethod,
  endpoint: string,
  options?: Omit<RequestInit, 'method'>,
): Promise<Response> => {
  const init: RequestInit = {
    ...options,
    method,
    credentials: 'include',
    headers: buildHeaders({ ...options, method }),
  };
  return executeWithRetry(BASE_URL + endpoint, init);
};

export const clientApi = {
  // GET — 응답 본문이 없으면 에러, 항상 T 반환
  get: async <T>(
    endpoint: string,
    options?: QueryOptionsWithoutMethod,
  ): Promise<T> =>
    parseResponseStrict<T>(await request('GET', endpoint, options)),

  // POST/PUT/PATCH/DELETE — 204 응답 시 null 반환
  post: async <T = unknown>(
    endpoint: string,
    options?: MutationOptionsWithoutMethod,
  ): Promise<T | null> =>
    parseResponse<T>(await request('POST', endpoint, options)),

  put: async <T = unknown>(
    endpoint: string,
    options?: MutationOptionsWithoutMethod,
  ): Promise<T | null> =>
    parseResponse<T>(await request('PUT', endpoint, options)),

  patch: async <T = unknown>(
    endpoint: string,
    options?: MutationOptionsWithoutMethod,
  ): Promise<T | null> =>
    parseResponse<T>(await request('PATCH', endpoint, options)),

  delete: async <T = unknown>(
    endpoint: string,
    options?: MutationOptionsWithoutMethod,
  ): Promise<T | null> =>
    parseResponse<T>(await request('DELETE', endpoint, options)),
};
