import { BASE_URL } from './base-url.constant';
import {
  buildHeaders,
  parseResponse,
  parseResponseStrict,
} from './fetch-helpers';

// GET 요청용 — 반환 타입 T (null 없음)
export const fetchClientQuery = async <T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> => {
  const res = await fetch(BASE_URL + endpoint, {
    ...options,
    credentials: 'include',
    headers: buildHeaders(options),
  });
  return parseResponseStrict<T>(res);
};

// POST/PUT/DELETE 요청용 — 204 응답 시 null 반환
export const fetchClientMutation = async <T = unknown>(
  endpoint: string,
  options?: RequestInit,
): Promise<T | null> => {
  const res = await fetch(BASE_URL + endpoint, {
    ...options,
    credentials: 'include',
    headers: buildHeaders(options),
  });
  return parseResponse<T>(res);
};
