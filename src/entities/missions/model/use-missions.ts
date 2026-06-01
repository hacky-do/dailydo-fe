import { useEffect, useState } from 'react';

import { Mission } from '@/entities/missions/model/mission.types';
import { clientApi } from '@/shared/api/fetch-client';

export const useMissions = () => {
  const [missions, setMissions] = useState<Mission[]>([]);

  useEffect(() => {
    clientApi.get<Mission[]>('/api/missions/new').then(setMissions);
  }, []);

  return missions;
};
