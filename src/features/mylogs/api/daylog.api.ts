import { clientApi } from '@/shared/api';

import type { DayLogResponse } from '../model/daylog.types';

export const getDaylog = (date: string): Promise<DayLogResponse> =>
  clientApi.get<DayLogResponse>(`/api/users/me/mylogs/${date}`);

export const patchDaylog = (
  id: string,
  body: { photo: string | null; memo: string },
) =>
  clientApi.patch(`/api/users/me/mylogs/${id}`, { body: JSON.stringify(body) });
