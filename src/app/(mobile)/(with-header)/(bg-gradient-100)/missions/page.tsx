'use client';
import { Suspense } from 'react';

import { useGetTodayMissions } from '@/entities/missions/api/mission.queries';
import { TodayMissionList } from '@/features/missions/today-mission-list';
import { Loader } from '@/shared/ui/loader';
import MissionHeader from '@/widgets/mission/mission-header';

const MyMissionListPage = () => {
  return (
    <div className="flex h-full w-full flex-col items-center">
      <MissionHeader />
      <TodayMissionList />
    </div>
  );
};

const TodayMissionListPage = () => {
  return (
    <div className="flex h-full w-full flex-col items-center">
      <MissionHeader />
      <TodayMissionList />
    </div>
  );
};

const Page = () => {
  const { data } = useGetTodayMissions();
  return (
    <>
      <Suspense
        fallback={
          <>
            <Loader />
          </>
        }
      >
        {data?.isGuest ? <TodayMissionListPage /> : <MyMissionListPage />}
      </Suspense>
    </>
  );
};

export default Page;
