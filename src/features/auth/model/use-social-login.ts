import { useMutation, useQueryClient } from '@tanstack/react-query';

import { SocialLoginType } from '@/entities/session';
import { userQueryKeys } from '@/entities/user';

import { socialLogin } from '../api/auth.api';
// import { verifySocialToken } from '../api/auth.api';

interface SocialLoginParams {
  type: SocialLoginType;
  socialToken: string;
}

export const useSocialLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ type, socialToken }: SocialLoginParams) => {
      // const verified = await verifySocialToken(type, socialToken);
      return socialLogin(type, socialToken, true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueryKeys.me });
    },
  });
};
