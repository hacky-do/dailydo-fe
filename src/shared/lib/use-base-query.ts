import { useQuery } from '@tanstack/react-query';

import { clientApi } from '../api/fetch-client';

export const useBaseQuery = <T>(
  queryKey: string[],
  endpoint: string,
  retry: number | false,
) =>
  useQuery({
    queryKey,
    queryFn: () => clientApi.get<T>(endpoint),
    retry,
  });
