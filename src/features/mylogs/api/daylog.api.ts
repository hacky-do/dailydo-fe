import { clientApi } from '@/shared/api/fetch-client';

import type { DayLogResponse } from '../model/daylog.types';

export const getDaylog = (date: string): Promise<DayLogResponse> =>
  clientApi.get<DayLogResponse>(`/api/users/me/mylogs/${date}`);
