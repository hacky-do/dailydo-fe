import { cookies } from 'next/headers';

import { API_ERRORS, ApiError } from './api-error';
import { BASE_URL } from './base-url';

export const fetchServer = async <T = unknown>(
  endpoint: string,
  options?: RequestInit,
): Promise<T | null> => {
  const url = BASE_URL + endpoint;
  const cookieStore = await cookies();
  const headers = new Headers(options?.headers);
  if (!(options?.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  headers.set('Cookie', cookieStore.toString());

  const res = await fetch(url, {
    ...options,
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
