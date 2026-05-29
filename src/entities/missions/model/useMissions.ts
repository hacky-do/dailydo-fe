import { useEffect, useState } from 'react';

import { Mission } from '@/entities/missions/model/mission.types';
import { BASE_URL } from '@/shared/api/base-url.constant';

export const useMissions = () => {
  const [missions, setMissions] = useState<Mission[]>([]);

  useEffect(() => {
    const fetchMissions = async () => {
      const res = await fetch(`${BASE_URL}/api/missions/new`);
      const data = await res.json();
      setMissions(data);
    };
    fetchMissions();
  }, []);

  return missions;
};
