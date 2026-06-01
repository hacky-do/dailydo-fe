import { useMutation } from '@tanstack/react-query';

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

interface SocialLoginParams {
  type: SocialLoginType;
  token: string;
}

export const useSocialLogin = () =>
  useMutation({
    mutationFn: async ({ type, token }: SocialLoginParams) => {
      const data = await socialLogin(type, token, true);
      if (!data) throw new Error('No response');
      return data;
    },
  });
