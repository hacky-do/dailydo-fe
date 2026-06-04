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

export interface MissionPageProps {
  maxSelectableCount: number;
}
