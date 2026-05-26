import { ApiError } from '../api/api-error.type';
import { BaseQueryOptions, useBaseQuery } from './use-base-query';

export const useAuthQuery = <T>(
  endpoint: string,
  options: BaseQueryOptions<T>,
) =>
  useBaseQuery<T>(endpoint, {
    retry: (failureCount, error) =>
      !(
        error instanceof ApiError &&
        (error.code === 401 || error.code === 403)
      ) && failureCount < 2,
    ...options,
  });
