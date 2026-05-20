import { cookies } from 'next/headers';

import { buildHeaders, parseResponse } from './_core';
import { BASE_URL } from './base-url.constant';

export const fetchServer = async <T = unknown>(
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
