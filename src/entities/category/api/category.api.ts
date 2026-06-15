import { clientApi } from '@/shared/api/fetch-client';

import { CategoryListResponse } from '../model/category.types';

export const getMissionCategories = async (
  start: number,
  perPage: number,
): Promise<CategoryListResponse> => {
  const query = new URLSearchParams({
    start: String(start),
    perPage: String(perPage),
  });
  return clientApi.get<CategoryListResponse>(`/mission-categories?${query}`);
};
