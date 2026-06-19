import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { daylogQueryKeys } from '../model/daylog.constants';
import { getDaylog, patchDaylog } from './daylog.api';

export const useGetDaylog = (date: string) =>
  useQuery({
    queryKey: daylogQueryKeys.byDate(date),
    queryFn: () => getDaylog(date),
    select: (data) => data.records,
    staleTime: 1000 * 60 * 5,
  });

export const usePatchDaylog = (date: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      photo,
      memo,
    }: {
      id: string;
      photo: string | null;
      memo: string;
    }) => patchDaylog(id, { photo, memo }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: daylogQueryKeys.byDate(date) });
    },
  });
};
