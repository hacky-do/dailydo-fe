import { clientApi } from '@/shared/api/fetch-client';

interface SignupParams {
  nickname: string;
  category: number[];
}

export const signup = (params: SignupParams) =>
  clientApi.post('/auth/register', { body: JSON.stringify(params) });
