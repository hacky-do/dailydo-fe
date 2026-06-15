import { clientApi } from '@/shared/api/fetch-client';

import { MissionCategoriesResponse } from '../model/types';

export const getMissionCategories = async (
  start: number,
  perPage: number,
): Promise<MissionCategoriesResponse> => {
  const query = new URLSearchParams({
    start: String(start),
    perPage: String(perPage),
  });
  return clientApi.get<MissionCategoriesResponse>(
    `/mission-categories?${query}`,
  );
};
