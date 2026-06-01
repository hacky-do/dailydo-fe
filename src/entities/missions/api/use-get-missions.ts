import { useQuery } from '@tanstack/react-query';

import { missionsQueryKey } from './mission.constans';
import { getMyMissions, getTodayMissions } from './mission.queries';

export const useGetTodayMissions = () =>
  useQuery({
    queryKey: missionsQueryKey,
    queryFn: getTodayMissions,
  });

export const useGetMyMissions = () =>
  useQuery({
    queryKey: [...missionsQueryKey],
    queryFn: getMyMissions,
  });
