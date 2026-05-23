import { useQuery } from '@tanstack/react-query';

import { clientApi } from '../api/fetch-client';

export const useAuthQuery = <T>(queryKey: string[], endpoint: string) =>
  useQuery({
    queryKey,
    queryFn: () => clientApi.get<T>(endpoint),
    retry: false,
  });
