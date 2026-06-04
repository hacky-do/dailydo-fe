import { useMutation } from '@tanstack/react-query';

import { SocialLoginType } from '@/entities/session';

import { socialLogin } from '../api/auth.api';
import { verifySocialToken } from '../api/auth.api';

interface SocialLoginParams {
  type: SocialLoginType;
  socialToken: string;
}

export const useSocialLogin = () =>
  useMutation({
    mutationFn: async ({ type, socialToken }: SocialLoginParams) => {
      const verified = await verifySocialToken(type, socialToken);
      return socialLogin(type, verified.token, false);
    },
  });
