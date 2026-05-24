import { BaseQueryOptions, useBaseQuery } from './use-base-query';

export const usePublicQuery = <T>(
  queryKey: string[],
  endpoint: string,
  options?: BaseQueryOptions<T>,
) => useBaseQuery<T>(queryKey, endpoint, options);
