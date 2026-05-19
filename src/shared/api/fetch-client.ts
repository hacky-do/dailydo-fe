import { API_ERRORS, ApiError } from './api-error';
import { BASE_URL } from './base-url';

export const fetchClient = async <T = unknown>(
  endpoint: string,
  options?: RequestInit,
): Promise<T | null> => {
  const url = BASE_URL + endpoint;
  const headers = new Headers(options?.headers);
  const method = (options?.method ?? 'GET').toUpperCase();
  const hasBody =
    options?.body != null && method !== 'GET' && method !== 'HEAD';
  if (
    hasBody &&
    !(options?.body instanceof FormData) &&
    !headers.has('Content-Type')
  ) {
    headers.set('Content-Type', 'application/json');
  }
  const res = await fetch(url, {
    ...options,
    credentials: 'include',
    headers,
  });

  if (res.status === 401) {
    throw new ApiError(API_ERRORS.UNAUTHORIZED);
  }

  if (res.status === 204 || res.status === 205) {
    return null;
  }

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new ApiError({
      code: res.status,
      error: data?.error ?? 'API_ERROR',
      message: data?.message ?? 'API ERROR가 발생했습니다.',
    });
  }

  const raw = await res.text();
  if (!raw) return null;
  return JSON.parse(raw) as T;
};
