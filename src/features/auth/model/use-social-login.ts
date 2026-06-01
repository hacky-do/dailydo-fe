import { useMutation } from '@tanstack/react-query';

import { SocialLoginType } from '@/entities/session';

import { socialLogin } from '../api/auth.api';

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
