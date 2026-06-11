import {
  AuthResponse,
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

export interface RegisterParams {
  email: string;
  name: string;
  type: SocialLoginType;
  socialToken: string;
  agreeMarketing: boolean;
}

// 소셜 인증 후 미가입 사용자를 소셜에서 받은 이메일/닉네임으로 즉시 가입시킨다
export const register = (params: RegisterParams) =>
  clientApi.post('/auth/register', {
    body: JSON.stringify(params),
  });

export const emailLogin = (
  email: string,
  password: string,
  remember: boolean,
) =>
  clientApi.post<SocialLoginResponse>('/auth', {
    body: JSON.stringify({ email, password, remember }),
  });

export const emailLogout = () => clientApi.delete<SocialLoginResponse>('/auth');

export const getSession = () => clientApi.get<AuthResponse>('/auth');
