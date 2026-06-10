import { User } from '@/entities/user/model/user.types';
import { clientApi } from '@/shared/api/fetch-client';

export const getMe = () => clientApi.get<User>('/users');
