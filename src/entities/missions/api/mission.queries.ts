import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';

import { missionQueryKeys } from '../model/mission.constants';
import { Mission, MyLog } from '../model/mission.types';
import {
  getMyMissions,
  getTodayMissions,
  postCompleteMission,
  postTodayMissions,
} from './mission.api';

export const useGetTodayMissions = () =>
  useSuspenseQuery({
    queryKey: missionQueryKeys.todayMissions,
    queryFn: getTodayMissions,
    gcTime: 0,
    staleTime: 1000 * 60 * 5,
  });

export const useGetMyMissions = () =>
  useSuspenseQuery({
    queryKey: missionQueryKeys.myMissions,
    queryFn: getMyMissions,
  });

export const usePostTodayMissions = (options?: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (missionId: number[]) => postTodayMissions(missionId),
    onSuccess: async () => {
      queryClient.setQueryData(
        missionQueryKeys.todayMissions,
        (prev: Mission | undefined) =>
          prev ? { ...prev, status: 'CONFIRMED' as const } : prev,
      );
      await queryClient.invalidateQueries({
        queryKey: missionQueryKeys.myMissions,
      });
      options?.onSuccess?.();
    },
  });
};

export const usePostCompleteMission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ missionId, mylog }: { missionId: number; mylog: MyLog }) =>
      postCompleteMission(missionId, mylog),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: missionQueryKeys.myMissions });
    },
  });
};
