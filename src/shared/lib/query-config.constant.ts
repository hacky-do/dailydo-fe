import { QueryClientConfig } from '@tanstack/react-query';

export const defaultQueryOptions: QueryClientConfig['defaultOptions'] = {
  queries: {
    staleTime: 1000 * 60,
    retry: 1,
  },
};
