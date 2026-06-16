export interface MyMissionItem extends MissionItem {
  itemId: number;
  myCompletedCount: number;
  totalCompletedCount: number;
  completed: boolean;
  completedAt: string;
  mylog: MyLog | null;
}

export interface MyMission {
  isGuest: boolean;
  items: MyMissionItem[];
}

export interface MissionItem {
  missionId: number;
  title: string;
  description: string;
  categoryId: number;
  categoryName: string;
  image: string;
  totalCompletedCount: number;
  isSpecial: boolean;
}

export interface Mission {
  status: 'ARRIVED' | 'CONFIRMED' | null; // CONFIRMED 미션 확정 , ARRIVED 미션 미 확정
  isGuest: boolean; // 게스트 여부
  missionDate: string;
  minSelectableCount: number;
  maxSelectableCount: number;
  items: MissionItem[];
}

export interface MyLog {
  id: number;
  photo: string;
  memo: string;
}

export interface MyLogRequest {
  photo: string;
  memo: string;
}
export interface MyMissionComplete {
  itemId: number;
  completed: true;
  completedAt: string;
  totalCompletedCount: number;
  myCompletedCount: number;
  mylog: MyLog;
}

export interface MissionPageProps {
  missions: Mission;
  maxSelectableCount: number | undefined;
}
