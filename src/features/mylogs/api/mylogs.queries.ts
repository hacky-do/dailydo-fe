import { useQuery } from '@tanstack/react-query';

import { mylogsQueryKeys } from '../model/mylogs.constants';
import { getMyLogs } from './mylogs.api';

export const useGetMyLogs = (cursor?: string) =>
  useQuery({
    queryKey: mylogsQueryKeys.records(cursor),
    queryFn: () => getMyLogs(cursor),
    staleTime: 1000 * 60 * 5,
  });
