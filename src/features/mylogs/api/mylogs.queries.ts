import { useQuery } from '@tanstack/react-query';

import { mylogsQueryKeys } from '../model/mylogs.constants';
import { getMyLogs } from './mylogs.api';

export const useGetMyLogs = (cursor?: string) =>
  useQuery({
    queryKey: mylogsQueryKeys.records(cursor),
    queryFn: () => getMyLogs(cursor),
    staleTime: 1000 * 60 * 5,

    // 커서 기반 페이지네이션 미사용으로 records[0]이 항상 유일한 원소
    select: (res) => res.records[0].logs,
  });
