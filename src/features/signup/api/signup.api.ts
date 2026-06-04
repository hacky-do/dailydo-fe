import { SocialLoginType } from '@/entities/session';
import { clientApi } from '@/shared/api/fetch-client';

export interface SignupParams {
  email: string;
  name: string;
  agreeMarketing: boolean;
  type: SocialLoginType;
  socialToken: string;
}

export const signup = (params: SignupParams) =>
  clientApi.post('/auth/register', {
    body: JSON.stringify(params),
  });
