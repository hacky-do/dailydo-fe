import { useQuery } from '@tanstack/react-query';

import {
  myMissionsQueryKey,
  todayMissionsQueryKey,
} from '../model/mission.constants';
import { getMyMissions, getTodayMissions } from './mission.queries';

export const useGetTodayMissions = () =>
  useQuery({
    queryKey: todayMissionsQueryKey,
    queryFn: getTodayMissions,
  });

export const useGetMyMissions = () =>
  useQuery({
    queryKey: myMissionsQueryKey,
    queryFn: getMyMissions,
  });
