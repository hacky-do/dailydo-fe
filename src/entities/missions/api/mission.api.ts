import { Mission } from '@/entities/missions/model/mission.types';
import { clientApi } from '@/shared/api/fetch-client';

export const getMyMissions = () => clientApi.get<Mission[]>('/api/missions');
export const getTodayMissions = () =>
  clientApi.get<Mission[]>('/api/missions/new');
