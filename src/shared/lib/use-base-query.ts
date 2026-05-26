import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { clientApi } from '../api/fetch-client';

export type BaseQueryOptions<T> = Omit<UseQueryOptions<T>, 'queryFn'>;

export const useBaseQuery = <T>(
  endpoint: string,
  options: BaseQueryOptions<T>,
) =>
  useQuery({
    ...options,
    queryFn: () => clientApi.get<T>(endpoint),
  });
