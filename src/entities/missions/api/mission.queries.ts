import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';

import { ApiError } from '@/shared/api/api-error.type';

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

const MYLOG_PHOTO_ERROR_MESSAGES: Record<string, string> = {
  invalid_mylog_photo: '지원하지 않는 사진 형식이에요.',
  'mimeType must be MIME type format': '사진 형식이 올바르지 않아요.',
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
          ? (MYLOG_PHOTO_ERROR_MESSAGES[error.error] ??
            MYLOG_PHOTO_ERROR_MESSAGES[error.message] ??
            `${MISSION_TOAST_MESSAGES.mylogError}`)
          : `${MISSION_TOAST_MESSAGES.completeError}`;
        options?.onError?.(message);
      }
    },
  });
};
