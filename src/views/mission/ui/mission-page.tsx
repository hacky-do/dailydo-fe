import { useGetTodayMissions } from '@/entities/missions/api/mission.queries';
import { MissionPageProps } from '@/entities/missions/model/mission.types';
import { MyMissionList } from '@/features/missions/my-mission-list';
import { TodayMissionList } from '@/features/missions/today-mission-list';
import MissionHeader from '@/widgets/mission/mission-header';

export const MyMissionListPage = () => {
  return (
    <div className="flex h-full w-full flex-col items-center">
      <MissionHeader type="mymission" />
      <MyMissionList />
    </div>
  );
};

export const TodayMissionListPage = ({
  maxSelectableCount,
}: MissionPageProps) => {
  return (
    <div className="flex h-full w-full flex-col items-center">
      <MissionHeader maxSelectableCount={maxSelectableCount} />
      <TodayMissionList />
    </div>
  );
};

export const MissionPage = () => {
  const { data } = useGetTodayMissions();
  return data?.isGuest ? (
    <MyMissionListPage />
  ) : (
    <TodayMissionListPage maxSelectableCount={data?.maxSelectableCount} />
  );
};
