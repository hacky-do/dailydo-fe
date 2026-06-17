import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';

import { ApiError } from '@/shared/api';

import {
  MISSION_TOAST_MESSAGES,
  missionQueryKeys,
} from '../model/mission.constants';
import { Mission, MyLogRequest } from '../model/mission.types';
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

export const usePostCompleteMission = (options?: {
  onError?: (message: string) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ itemId, mylog }: { itemId: number; mylog: MyLogRequest }) =>
      postCompleteMission(itemId, mylog),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: missionQueryKeys.myMissions });
    },
    onError: (error, variables) => {
      const hasMyLog = Boolean(variables.mylog.photo || variables.mylog.memo);
      if (error instanceof ApiError) {
        const message = hasMyLog
          ? `${MISSION_TOAST_MESSAGES.mylogError}`
          : `${MISSION_TOAST_MESSAGES.completeError}`;
        options?.onError?.(message);
      }
    },
  });
};
