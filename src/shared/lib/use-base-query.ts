import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { ApiError } from '../api/api-error.type';
import { clientApi } from '../api/fetch-client';

type BaseQueryOptions<T> = Omit<
  UseQueryOptions<T>,
  'queryKey' | 'queryFn' | 'retry'
> & {
  retry?: number | false;
};

export const useBaseQuery = <T>(
  queryKey: string[],
  endpoint: string,
  { retry = 3, ...options }: BaseQueryOptions<T> = {},
) =>
  useQuery({
    queryKey,
    queryFn: () => clientApi.get<T>(endpoint),
    retry: (failureCount, error) => {
      if (retry === false) return false;
      if (
        error instanceof ApiError &&
        (error.code === 401 || error.code === 403)
      )
        return false;
      return failureCount < retry;
    },
    ...options,
  });
