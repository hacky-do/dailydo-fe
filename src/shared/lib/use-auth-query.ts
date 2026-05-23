import { useBaseQuery } from './use-base-query';

export const useAuthQuery = <T>(queryKey: string[], endpoint: string) =>
  useBaseQuery<T>(queryKey, endpoint, false);
