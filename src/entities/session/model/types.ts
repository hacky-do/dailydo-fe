export const SOCIAL_LOGIN_TYPES = ['google', 'naver'] as const;
export type SocialLoginType = (typeof SOCIAL_LOGIN_TYPES)[number];

export interface SocialLoginResponse {
  id: number;
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
}
