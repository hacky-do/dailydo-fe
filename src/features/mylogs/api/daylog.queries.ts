import { useQuery } from '@tanstack/react-query';

import { daylogQueryKeys } from '../model/daylog.constants';
import { getDaylog } from './daylog.api';

export const useGetDaylog = (date: string) =>
  useQuery({
    queryKey: daylogQueryKeys.byDate(date),
    queryFn: () => getDaylog(date),
    select: (data) => data.records,
    staleTime: 1000 * 60 * 5,
  });
