export type SocialLoginType = 'google' | 'naver';

export interface SocialLoginResponse {
  id: number;
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
}
