import { cookies } from 'next/headers';

import { BASE_URL } from './base-url';

export const fetchServer = async <T = unknown>(
  endpoint: string,
  options?: RequestInit,
): Promise<T | undefined> => {
  const cookieStore = await cookies();
  const headers = new Headers(options?.headers);
  if (!(options?.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  headers.set('Cookie', cookieStore.toString());

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (res.status === 401) {
    throw new Error('Unauthorized');
  }

  if (res.status === 204) {
    return undefined;
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.message ?? 'API ERROR가 발생했습니다.');
  }

  return res.json() as Promise<T>;
};
