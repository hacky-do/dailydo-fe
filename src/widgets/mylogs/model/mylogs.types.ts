export interface DailyCount {
  date: string;
  count: number;
}

export interface MonthRecord {
  year: number;
  month: number;
  logs: DailyCount[];
}

export interface LogsResponse {
  records: MonthRecord[];
  nextCursor: string | null;
}

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
