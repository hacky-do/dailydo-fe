import { Suspense } from 'react';

import { useGetTodayMissions } from '@/entities/missions/api/mission.queries';
import { MissionItem } from '@/entities/missions/model/mission.types';
import { MyMissionList } from '@/features/missions/my-mission-list';
import { TodayMissionList } from '@/features/missions/today-mission-list';
import { Loader } from '@/shared/ui/loader';
import MissionHeader from '@/widgets/mission/mission-header';

export const MyMissionListPage = () => {
  return (
    <div className="flex h-full w-full flex-col items-center">
      <MissionHeader type="mymission" />
      <Suspense fallback={<Loader />}>
        <MyMissionList />
      </Suspense>
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
      <MissionHeader maxSelectableCount={maxSelectableCount} />
      <TodayMissionList
        missions={missions}
        maxSelectableCount={maxSelectableCount}
      />
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
