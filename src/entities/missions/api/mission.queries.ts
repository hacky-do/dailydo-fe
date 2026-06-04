import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { missionQueryKeys } from '../model/mission.constants';
import {
  getMyMissions,
  getTodayMissions,
  postCompleteMission,
  postTodayMissions,
} from './mission.api';

export const useGetTodayMissions = () =>
  useQuery({
    queryKey: missionQueryKeys.todayMissions,
    queryFn: getTodayMissions,
  });

export const useGetMyMissions = () =>
  useQuery({
    queryKey: missionQueryKeys.myMissions,
    queryFn: getMyMissions,
  });

export const usePostTodayMissions = (options?: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (missionId: number[]) => postTodayMissions(missionId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: missionQueryKeys.todayMissions,
      });
      queryClient.invalidateQueries({ queryKey: missionQueryKeys.myMissions });
      options?.onSuccess?.();
    },
  });
};

export const usePostCompleteMission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (missionId: number) => postCompleteMission(missionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: missionQueryKeys.myMissions });
    },
  });
};
