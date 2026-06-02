import { SocialLoginType } from '@/entities/session';
import { clientApi } from '@/shared/api/fetch-client';

export interface SignupParams {
  nickname: string;
  category: number[];
  type: SocialLoginType;
  socialToken: string;
}

export const signup = (params: SignupParams) =>
  clientApi.post('/auth/register', { body: JSON.stringify(params) });
