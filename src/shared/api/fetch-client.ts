import { BASE_URL } from './base-url.constant';
import {
  buildHeaders,
  MutationOptions,
  MutationOptionsWithoutMethod,
  parseResponse,
  parseResponseStrict,
  QueryOptions,
  QueryOptionsWithoutMethod,
} from './fetch-helpers';

// GET 요청용 — 반환 타입 T (null 없음)
export const fetchClientQuery = async <T>(
  endpoint: string,
  options?: QueryOptions,
): Promise<T> => {
  const res = await fetch(BASE_URL + endpoint, {
    ...options,
    method: options?.method ?? 'GET',
    credentials: 'include',
    headers: buildHeaders(options),
  });
  return parseResponseStrict<T>(res);
};

// POST/PUT/DELETE 요청용 — 204 응답 시 null 반환
export const fetchClientMutation = async <T = unknown>(
  endpoint: string,
  options?: MutationOptions,
): Promise<T | null> => {
  const res = await fetch(BASE_URL + endpoint, {
    ...options,
    method: options?.method ?? 'POST',
    credentials: 'include',
    headers: buildHeaders(options),
  });
  return parseResponse<T>(res);
};

export const clientApi = {
  get: <T>(endpoint: string, options?: QueryOptionsWithoutMethod) =>
    fetchClientQuery<T>(endpoint, { ...options, method: 'GET' }),
  post: <T>(endpoint: string, options?: MutationOptionsWithoutMethod) =>
    fetchClientMutation<T>(endpoint, { ...options, method: 'POST' }),
  put: <T>(endpoint: string, options?: MutationOptionsWithoutMethod) =>
    fetchClientMutation<T>(endpoint, { ...options, method: 'PUT' }),
  patch: <T>(endpoint: string, options?: MutationOptionsWithoutMethod) =>
    fetchClientMutation<T>(endpoint, { ...options, method: 'PATCH' }),
  delete: <T>(endpoint: string, options?: MutationOptionsWithoutMethod) =>
    fetchClientMutation<T>(endpoint, { ...options, method: 'DELETE' }),
};
