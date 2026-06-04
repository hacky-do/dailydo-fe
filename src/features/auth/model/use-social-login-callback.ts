import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import {
  SOCIAL_LOGIN_TYPES,
  SocialLoginType,
  useSessionStore,
} from '@/entities/session';
import { ApiError } from '@/shared/api/api-error.type';
import { ROUTES } from '@/shared/config/routes';

import { useSocialLogin } from './use-social-login';

export const useSocialLoginCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setLastLogin } = useSessionStore.getState();

  const token = searchParams.get('token');
  const rawType = searchParams.get('type');
  const type: SocialLoginType | null = SOCIAL_LOGIN_TYPES.includes(
    rawType as SocialLoginType,
  )
    ? (rawType as SocialLoginType)
    : null;
  const user = searchParams.get('user');
  const error = searchParams.get('error');

  const { mutate: login } = useSocialLogin();

  useEffect(() => {
    if (error) {
      router.replace(`${ROUTES.LOGIN}?auth_error`);
      return;
    }

    if (!token || !type) {
      router.replace(ROUTES.LOGIN);
      return;
    }

    login(
      { type, socialToken: token },
      {
        onSuccess: () => {
          setLastLogin(type);
          router.replace(ROUTES.MISSIONS);
        },
        onError: (err: unknown) => {
          if (err instanceof ApiError && err.code === 404) {
            sessionStorage.setItem('signup_socialToken', token);
            sessionStorage.setItem('signup_type', type);
            if (user) sessionStorage.setItem('signup_user', user);
            router.replace(ROUTES.SIGNUP);
            return;
          }
          router.replace(`${ROUTES.LOGIN}?auth_error`);
        },
      },
    );
  }, [error, login, router, setLastLogin, token, type, user]);
};
