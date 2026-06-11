import { clientApi } from '@/shared/api/fetch-client';

import { Category, MissionCategoriesResponse } from '../model/types';

export const getMissionCategories = async (
  start: number,
  perPage: number,
): Promise<Category[]> => {
  const query = new URLSearchParams({
    start: String(start),
    perPage: String(perPage),
  });
  const res = await clientApi.get<MissionCategoriesResponse>(
    `/mission-categories?${query}`,
  );
  return res.data;
};
