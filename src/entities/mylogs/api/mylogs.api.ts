import { clientApi } from '@/shared/api/fetch-client';
import { LogsResponse } from '@/widgets/mylogs/model/mylogs.types';

export const getMyLogs = (cursor?: string): Promise<LogsResponse> => {
  const params = new URLSearchParams({ limit: '1' });
  if (cursor) params.set('cursor', cursor);
  return clientApi.get<LogsResponse>(`/api/users/me/mylogs?${params}`);
};
