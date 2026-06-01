import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { SocialLoginType, useSessionStore } from '@/entities/session';
import { ApiError } from '@/shared/api/api-error.type';
import { ROUTES } from '@/shared/config/routes';

import { useSocialLoginMutation } from '../api/auth.api';

export const useSocialLoginCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setLastLogin } = useSessionStore.getState();

  const token = searchParams.get('token');
  const type = searchParams.get('type') as SocialLoginType | null;
  const user = searchParams.get('user');
  const error = searchParams.get('error');

  const { mutate } = useSocialLoginMutation();

  useEffect(() => {
    if (error) {
      sessionStorage.setItem('auth_error', error);
      router.replace(ROUTES.LOGIN);
      return;
    }

    if (!token || !type) {
      router.replace(ROUTES.LOGIN);
      return;
    }

    mutate(
      { type, token },
      {
        onSuccess: () => {
          if (type) setLastLogin(type);
          router.replace(ROUTES.MISSIONS);
        },
        onError: (err) => {
          if (err instanceof ApiError && err.code === 404) {
            const params = new URLSearchParams({ token: token!, type: type! });
            if (user) params.set('user', user);
            router.replace(`${ROUTES.SIGNUP}?${params.toString()}`);
            return;
          }
          sessionStorage.setItem(
            'auth_error',
            '로그인 중 오류가 발생했습니다.',
          );
          router.replace(ROUTES.LOGIN);
        },
      },
    );
  }, [error, mutate, router, setLastLogin, token, type, user]);
};
