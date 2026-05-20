import { API_ERRORS, ApiError } from './api-error.type';

export type QueryOptions = Omit<RequestInit, 'method' | 'body'> & {
  method?: 'GET';
  body?: never;
};

export type MutationOptions = Omit<RequestInit, 'method'> & {
  method?: 'POST' | 'PUT' | 'PATCH' | 'DELETE';
};

export function buildHeaders(options?: RequestInit): Headers {
  const headers = new Headers(options?.headers);
  const method = (options?.method ?? 'GET').toUpperCase();
  const hasBody =
    options?.body != null && method !== 'GET' && method !== 'HEAD';

  if (
    hasBody &&
    !(options?.body instanceof FormData) &&
    !(options?.body instanceof URLSearchParams) &&
    !(options?.body instanceof Blob) &&
    !headers.has('Content-Type')
  ) {
    headers.set('Content-Type', 'application/json');
  }

  return headers;
}

// mutation용 (POST/PUT/DELETE): 204 응답 시 null 반환
export async function parseResponse<T>(res: Response): Promise<T | null> {
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
      message: data?.message ?? 'API 오류가 발생했습니다.',
    });
  }

  const raw = await res.text();
  if (!raw) return null;
  return JSON.parse(raw) as T;
}

// query용 (GET): 응답 본문이 없으면 에러, 항상 T 반환
export async function parseResponseStrict<T>(res: Response): Promise<T> {
  const result = await parseResponse<T>(res);
  if (result === null) {
    throw new ApiError(API_ERRORS.EMPTY_RESPONSE);
  }
  return result;
}
