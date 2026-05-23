import { useBaseQuery } from './use-base-query';

export const usePublicQuery = <T>(queryKey: string[], endpoint: string) =>
  useBaseQuery<T>(queryKey, endpoint, 2);
