import { clientApi } from '@/shared/api/fetch-client';

import { Category, MissionCategoriesResponse } from '../model/types';

export const getMissionCategories = async (): Promise<Category[]> => {
  const res = await clientApi.get<MissionCategoriesResponse>(
    '/mission-categories',
  );
  return res.data;
};
