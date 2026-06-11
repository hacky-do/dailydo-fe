import { clientApi } from '@/shared/api/fetch-client';

export interface UpdateUserProfileParams {
  name: string;
  agreeMarketing: boolean;
  description?: string;
  profileImage?: string;
}

export const updateUserProfile = (params: UpdateUserProfileParams) =>
  clientApi.patch('/users', {
    body: JSON.stringify(params),
  });

export interface AddUserCategoryParams {
  categoryId: number;
}

export const addUserCategory = (params: AddUserCategoryParams) =>
  clientApi.post('/users/categories', {
    body: JSON.stringify(params),
  });
