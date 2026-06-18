export interface DailyCount {
  date: string;
  count: number;
  total: number;
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
