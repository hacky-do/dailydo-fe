import { PatchMeRequest, User } from '@/entities/user/model/user.types';
import { clientApi } from '@/shared/api/fetch-client';

export const getMe = () => clientApi.get<User>('/users');

export const patchMe = (body: PatchMeRequest) =>
  clientApi.patch<User>('/users', { body: JSON.stringify(body) });
