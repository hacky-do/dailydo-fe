import { cookies } from 'next/headers';

import { BASE_URL } from './base-url.constant';
import {
  buildHeaders,
  parseResponse,
  parseResponseStrict,
} from './fetch-helpers';

// GET 요청용 (서버 컴포넌트) — 반환 타입 T (null 없음)
export const fetchServerQuery = async <T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> => {
  const cookieStore = await cookies();
  const headers = buildHeaders(options);

  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join('; ');
  if (cookieHeader && !headers.has('Cookie')) {
    headers.set('Cookie', cookieHeader);
  }

  const res = await fetch(BASE_URL + endpoint, { ...options, headers });
  return parseResponseStrict<T>(res);
};

// POST/PUT/DELETE 요청용 (서버 컴포넌트) — 204 응답 시 null 반환
export const fetchServerMutation = async <T = unknown>(
  endpoint: string,
  options?: RequestInit,
): Promise<T | null> => {
  const cookieStore = await cookies();
  const headers = buildHeaders(options);

  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join('; ');
  if (cookieHeader && !headers.has('Cookie')) {
    headers.set('Cookie', cookieHeader);
  }

  const res = await fetch(BASE_URL + endpoint, { ...options, headers });
  return parseResponse<T>(res);
};
