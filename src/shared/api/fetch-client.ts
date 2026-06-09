import { COOKIES } from '@/shared/config/cookies';
import { AUTH_ENDPOINTS } from '@/shared/config/endpoints';

import { API_ERRORS, ApiError } from './api-error.type';
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

let refreshing: Promise<boolean> | null = null;
let redirecting = false;

const hasRefreshTokenCookie = () =>
  document.cookie
    .split(';')
    .some((c) => c.trim().startsWith(COOKIES.REFRESH_TOKEN + '='));

const tryRefresh = (): Promise<boolean> => {
  if (refreshing) return refreshing;

  refreshing = fetch(`${BASE_URL}${AUTH_ENDPOINTS.REFRESH_TOKEN}`, {
    method: 'POST',
    credentials: 'include',
  })
    .then((res) => {
      console.log('[tryRefresh] status:', res.status, 'ok:', res.ok);
      return res.ok;
    })
    .catch(() => false)
    .finally(() => {
      redirecting = false;
      refreshing = null;
    });

  return refreshing;
};

const executeWithRetry = async (
  url: string,
  init: RequestInit,
): Promise<Response> => {
  if (!hasRefreshTokenCookie()) {
    await tryRefresh();
  }

  const res = await fetch(url, init);

  if (res.status !== 401) return res;

  const refreshed = await tryRefresh();
  if (refreshed) {
    const retried = await fetch(url, init);
    if (retried.status !== 401) return retried;
  }

  if (!redirecting) {
    redirecting = true;
    await fetch(`${BASE_URL}/auth`, {
      method: 'DELETE',
      credentials: 'include',
    }).catch(() => {});
  }
  throw new ApiError(API_ERRORS.UNAUTHORIZED);
};

// GET 요청용 — 반환 타입 T (null 없음)
export const fetchClientQuery = async <T>(
  endpoint: string,
  options?: QueryOptions,
): Promise<T> => {
  const init: RequestInit = {
    ...options,
    method: options?.method ?? 'GET',
    credentials: 'include',
    headers: buildHeaders(options),
  };
  const res = await executeWithRetry(BASE_URL + endpoint, init);
  return parseResponseStrict<T>(res);
};

// POST/PUT/DELETE 요청용 — 204 응답 시 null 반환
export const fetchClientMutation = async <T = unknown>(
  endpoint: string,
  options?: MutationOptions,
): Promise<T | null> => {
  const init: RequestInit = {
    ...options,
    method: options?.method ?? 'POST',
    credentials: 'include',
    headers: buildHeaders(options),
  };
  const res = await executeWithRetry(BASE_URL + endpoint, init);
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
