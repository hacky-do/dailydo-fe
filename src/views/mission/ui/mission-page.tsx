import { Suspense } from 'react';

import { useGetTodayMissions } from '@/entities/missions/api/mission.queries';
import { MissionItem } from '@/entities/missions/model/mission.types';
import MissionHeader from '@/features/mission/mission-header';
import { Loader } from '@/shared/ui/loader';
import { MyMissionList } from '@/widgets/missions/my-mission-list';
import { TodayMissionList } from '@/widgets/missions/today-mission-list';

export const MyMissionListPage = () => {
  return (
    <div className="flex h-full w-full flex-col items-center">
      <div className="flex-1" />
      <MissionHeader type="mymission" />
      <Suspense fallback={<Loader />}>
        <MyMissionList />
      </Suspense>
      <div className="flex-2" />
    </div>
  );
};

interface TodayMissionListPageProps {
  missions: MissionItem[];
  maxSelectableCount: number;
}

export const TodayMissionListPage = ({
  missions,
  maxSelectableCount,
}: TodayMissionListPageProps) => {
  return (
    <div className="flex h-full w-full flex-col items-center">
      <div className="flex-1" />

      <MissionHeader maxSelectableCount={maxSelectableCount} />
      <TodayMissionList
        missions={missions}
        maxSelectableCount={maxSelectableCount}
      />
      <div className="flex-2" />
    </div>
  );
};

export const MissionPage = () => {
  const { data } = useGetTodayMissions();

  if (!data.status)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader size="lg" color="primary" />
      </div>
    );

  return data.status === 'CONFIRMED' ? (
    <MyMissionListPage />
  ) : (
    <TodayMissionListPage
      missions={data.items}
      maxSelectableCount={data.maxSelectableCount}
    />
  );
};
