export interface DayLogRecord {
  id: string;
  categoryId: number;
  categoryName: string;
  completedCount: number;
  title: string;
  photo: string;
  createdAt: string;
  memo: string;
}

export interface DayLogResponse {
  records: DayLogRecord[];
}
