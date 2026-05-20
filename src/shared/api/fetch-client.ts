import { BASE_URL } from './base-url.constant';
import { buildHeaders, parseResponse } from './_core';

export const fetchClient = async <T = unknown>(
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
