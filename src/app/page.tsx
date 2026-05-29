import { MyMissionList } from '@/widgets/missions/MyMissionList';
import { TodayMissionList } from '@/widgets/missions/TodayMissionList';

export default function Home() {
  return (
    <>
      <TodayMissionList />
      <MyMissionList />
    </>
  );
}
