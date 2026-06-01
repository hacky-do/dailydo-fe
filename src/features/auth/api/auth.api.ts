import { SocialLoginResponse, SocialLoginType } from '@/entities/session';
import { clientApi } from '@/shared/api/fetch-client';

export const socialLogin = (
  type: SocialLoginType,
  token: string,
  remember: boolean,
) =>
  clientApi.post<SocialLoginResponse>('/auth/social', {
    body: JSON.stringify({ type, token, remember }),
  });
