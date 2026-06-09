import {
  Mission,
  MyMission,
  MyMissionItem,
} from '@/entities/missions/model/mission.types';
import { clientApi } from '@/shared/api/fetch-client';

export const getMyMissions = () => clientApi.get<MyMission>('/api/missions');

export const getTodayMissions = () =>
  clientApi.get<Mission>('/api/missions/new');

export const postTodayMissions = (missionIds: number[]) =>
  clientApi.post('/api/missions/new', { body: JSON.stringify({ missionIds }) });

export const postCompleteMission = (missionId: number) =>
  clientApi.post<MyMissionItem>(`/api/missions/${missionId}`);
