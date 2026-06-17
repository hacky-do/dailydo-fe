import { AUTH_ENDPOINTS } from '@/shared/config/endpoints';

import { API_ERRORS, ApiError } from './api-error.type';
import { BASE_URL } from './base-url.constant';

// 동시에 여러 요청이 401을 만나도 refresh/logout은 한 번만 수행한다.
let refreshing: Promise<boolean> | null = null;
let loggingOut: Promise<void> | null = null;
let loggedOut = false;

const tryRefresh = (): Promise<boolean> => {
  if (loggedOut) return Promise.resolve(false);
  if (refreshing) return refreshing;

  refreshing = fetch(`${BASE_URL}${AUTH_ENDPOINTS.REFRESH_TOKEN}`, {
    method: 'POST',
    credentials: 'include',
  })
    .then((res) => res.ok)
    .catch(() => false)
    .finally(() => {
      refreshing = null;
    });

  return refreshing;
};

const tryLogout = (): Promise<void> => {
  if (loggingOut) return loggingOut;
  if (loggedOut) return Promise.resolve();

  loggedOut = true;

  loggingOut = fetch(`${BASE_URL}/auth`, {
    method: 'DELETE',
    credentials: 'include',
  })
    .then(() => {})
    .catch(() => {})
    .finally(() => {
      loggingOut = null;
    });

  return loggingOut;
};

/**
 * 요청을 보내고, 401이면 토큰 refresh 후 1회 재시도한다.
 * refresh마저 실패하면 로그아웃 처리하고 UNAUTHORIZED 에러를 던진다.
 */
export const executeWithRetry = async (
  url: string,
  init: RequestInit,
): Promise<Response> => {
  const res = await fetch(url, init);
  if (res.status !== 401) return res;

  const refreshed = await tryRefresh();
  if (refreshed) {
    const retried = await fetch(url, init);
    if (retried.status !== 401) return retried;
  }

  await tryLogout();
  throw new ApiError(API_ERRORS.UNAUTHORIZED);
};
