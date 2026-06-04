import {
  SocialLoginResponse,
  SocialLoginType,
  SocialTokenResponse,
} from '@/entities/session';
import { API_ERRORS, ApiError } from '@/shared/api/api-error.type';
import { clientApi } from '@/shared/api/fetch-client';

export const verifySocialToken = async (
  type: SocialLoginType,
  socialToken: string,
): Promise<SocialTokenResponse> => {
  const result = await clientApi.post<SocialTokenResponse>(
    '/auth/social/token',
    {
      body: JSON.stringify({ type, socialToken }),
    },
  );
  if (!result) throw new ApiError(API_ERRORS.EMPTY_RESPONSE);
  return result;
};

export const socialLogin = (
  type: SocialLoginType,
  token: string,
  remember: boolean,
) =>
  clientApi.post<SocialLoginResponse>('/auth/social', {
    body: JSON.stringify({ type, token, remember }),
  });

export const emailLogin = (
  email: string,
  password: string,
  remember: boolean,
) =>
  clientApi.post<SocialLoginResponse>('/auth', {
    body: JSON.stringify({ email, password, remember }),
  });
