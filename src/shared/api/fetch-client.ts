import { ROUTES } from '@/shared/config/routes';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!BASE_URL) throw new Error('NEXT_PUBLIC_API_URL을 찾을 수 없습니다.');

export const fetchClient = async <T = unknown>(
  endpoint: string,
  options?: RequestInit,
): Promise<T | undefined> => {
  const headers = new Headers(options?.headers);
  const method = (options?.method ?? 'GET').toUpperCase();
  const hasBody = options?.body != null && method !== 'GET' && method !== 'HEAD';
  if (hasBody && !(options?.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    credentials: 'include',
    headers,
  });

  if (res.status === 401) {
    if (typeof window !== 'undefined') {
      window.location.href = ROUTES.LOGIN;
    }
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
