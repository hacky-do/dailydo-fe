'use client';
import { Suspense } from 'react';

import { useGetTodayMissions } from '@/entities/missions/api/mission.queries';
import { Loader } from '@/shared/ui/loader';
import { MyMissionListPage, TodayMissionListPage } from '@/views/mission';

const MissionPage = () => {
  const { data } = useGetTodayMissions();
  return data?.isGuest ? (
    <TodayMissionListPage maxSelectableCount={data.maxSelectableCount} />
  ) : (
    <MyMissionListPage />
  );
};

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <MissionPage />
    </Suspense>
  );
}
