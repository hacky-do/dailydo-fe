import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { MissionItem } from './mission.types';

const MISSION_STORE_KEY = 'dailydo_missions';

interface MissionStore {
  todayMissions: MissionItem[];
  setTodayMissions: (missions: MissionItem[]) => void;
}

export const useMissionStore = create<MissionStore>()(
  persist(
    (set) => ({
      todayMissions: [],
      setTodayMissions: (missions) => set({ todayMissions: missions }),
    }),
    {
      name: MISSION_STORE_KEY,
    },
  ),
);
