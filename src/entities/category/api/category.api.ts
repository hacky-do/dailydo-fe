import { clientApi } from '@/shared/api';

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

export const putUserCategories = (body: { categoryIds: number[] }) =>
  clientApi.put<void>('/users/categories', { body: JSON.stringify(body) });
