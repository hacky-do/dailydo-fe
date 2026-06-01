import { Mission } from '@/entities/missions/model/mission.types';
import { clientApi } from '@/shared/api/fetch-client';

export const getMissions = () => clientApi.get<Mission[]>('/api/missions/new');
