import { cookies } from 'next/headers';

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

async function buildServerHeaders(options?: RequestInit): Promise<Headers> {
  const headers = buildHeaders(options);
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join('; ');
  if (cookieHeader && !headers.has('Cookie')) {
    headers.set('Cookie', cookieHeader);
  }
  return headers;
}

// GET 요청용 (서버 컴포넌트) — 반환 타입 T (null 없음)
export const fetchServerQuery = async <T>(
  endpoint: string,
  options?: QueryOptions,
): Promise<T> => {
  const res = await fetch(BASE_URL + endpoint, {
    ...options,
    method: options?.method ?? 'GET',
    headers: await buildServerHeaders(options),
  });
  return parseResponseStrict<T>(res);
};

// POST/PUT/DELETE 요청용 (서버 컴포넌트) — 204 응답 시 null 반환
export const fetchServerMutation = async <T = unknown>(
  endpoint: string,
  options?: MutationOptions,
): Promise<T | null> => {
  const res = await fetch(BASE_URL + endpoint, {
    ...options,
    method: options?.method ?? 'POST',
    headers: await buildServerHeaders(options),
  });
  return parseResponse<T>(res);
};

export const serverApi = {
  get: <T>(endpoint: string, options?: QueryOptionsWithoutMethod) =>
    fetchServerQuery<T>(endpoint, { ...options, method: 'GET' }),
  post: <T>(endpoint: string, options?: MutationOptionsWithoutMethod) =>
    fetchServerMutation<T>(endpoint, { ...options, method: 'POST' }),
  put: <T>(endpoint: string, options?: MutationOptionsWithoutMethod) =>
    fetchServerMutation<T>(endpoint, { ...options, method: 'PUT' }),
  patch: <T>(endpoint: string, options?: MutationOptionsWithoutMethod) =>
    fetchServerMutation<T>(endpoint, { ...options, method: 'PATCH' }),
  delete: <T>(endpoint: string, options?: MutationOptionsWithoutMethod) =>
    fetchServerMutation<T>(endpoint, { ...options, method: 'DELETE' }),
};
