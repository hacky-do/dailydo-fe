'use client';
import { Suspense } from 'react';

import { useGetTodayMissions } from '@/entities/missions/api/mission.queries';
import { MyMissionList } from '@/features/missions/my-mission-list';
import { TodayMissionList } from '@/features/missions/today-mission-list';
import { Loader } from '@/shared/ui/loader';
import MissionHeader from '@/widgets/mission/mission-header';

interface MissionPageProps {
  maxSelectableCount: number;
}

const MyMissionListPage = () => {
  return (
    <div className="flex h-full w-full flex-col items-center">
      <MissionHeader />
      <MyMissionList />
    </div>
  );
};

const TodayMissionListPage = ({ maxSelectableCount }: MissionPageProps) => {
  return (
    <div className="flex h-full w-full flex-col items-center">
      <MissionHeader maxSelectableCount={maxSelectableCount} />
      <TodayMissionList />
    </div>
  );
};

const MissionContent = () => {
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
      <MissionContent />
    </Suspense>
  );
}
