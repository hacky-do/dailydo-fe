import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import {
  SOCIAL_LOGIN_TYPES,
  SocialLoginType,
  useSessionStore,
} from '@/entities/session';
import { ApiError, resetAuthState } from '@/shared/api';
import { ROUTES } from '@/shared/config/routes';
import { useToast } from '@/shared/ui/toast';

import { parseSocialUser } from '../lib/parse-social-user';
import { useRegister } from './use-register';
import { useSocialLogin } from './use-social-login';

export const useSocialLoginCallback = () => {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const setLastLogin = useSessionStore((s) => s.setLastLogin);

  const token = searchParams.get('token');
  const rawType = searchParams.get('type');
  const type: SocialLoginType | null = SOCIAL_LOGIN_TYPES.includes(
    rawType as SocialLoginType,
  )
    ? (rawType as SocialLoginType)
    : null;
  const user = searchParams.get('user');
  const error = searchParams.get('error');

  const { mutateAsync: login } = useSocialLogin();
  const { mutateAsync: register } = useRegister();

  useEffect(() => {
    if (error) {
      router.replace(`${ROUTES.LOGIN}?auth_error`);
      return;
    }

    if (!token || !type) {
      router.replace(ROUTES.LOGIN);
      return;
    }

    const goAuthError = () => router.replace(`${ROUTES.LOGIN}?auth_error`);

    const completeLogin = (message: string) => {
      resetAuthState();
      setLastLogin(type);
      toast({ message, type: 'success' });
      router.replace(ROUTES.MISSIONS);
    };

    const run = async () => {
      try {
        await login({ type, socialToken: token });
        completeLogin('다시 돌아오신 것을 환영해요!');
      } catch (err) {
        if (!(err instanceof ApiError) || err.code !== 404) {
          goAuthError();
          return;
        }

        const socialUser = parseSocialUser(user);
        if (!socialUser) {
          goAuthError();
          return;
        }

        try {
          await register({
            ...socialUser,
            type,
            socialToken: token,
            agreeMarketing: true,
          });
          completeLogin('데일리두에 오신 것을 환영해요!');
        } catch {
          goAuthError();
        }
      }
    };

    run();
  }, [error, login, register, router, setLastLogin, token, type, user, toast]);
};
