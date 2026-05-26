'use client';

import { useEffect, useState } from 'react';

import { Mission } from '@/entities/missions/model/mission.types';
import { BASE_URL } from '@/shared/api/base-url.constant';
import { Card } from '@/shared/ui/card';

const MissionList = () => {
  const [missions, setMissions] = useState<Mission[]>([]);

  useEffect(() => {
    const fetchMissions = async () => {
      const missionData = await fetch(`${BASE_URL}/api/missions/new`);
      const data = await missionData.json();
      setMissions(data);
    };

    fetchMissions();
  }, []);

  return (
    <div className="grid w-full grid-cols-3 gap-8">
      {missions.map((mission: Mission) => (
        <Card key={mission.id} {...mission} />
      ))}
    </div>
  );
};

export { MissionList };
