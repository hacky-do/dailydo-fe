import { BaseQueryOptions, useBaseQuery } from './use-base-query';

export const useAuthQuery = <T>(
  queryKey: string[],
  endpoint: string,
  options?: BaseQueryOptions<T>,
) => useBaseQuery<T>(queryKey, endpoint, { retry: 2, ...options });
