import { serverApi } from '@/shared/api/fetch-server';

import { Category } from '../model/types';

export const getCategories = (): Promise<Category[]> => {
  return serverApi.get<Category[]>('/api/category');
};
