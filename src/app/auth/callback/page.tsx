'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';

import { useSocialLoginMutation } from '@/features/auth/api/auth.api';
import {
  SocialLoginType,
  useAuthStore,
} from '@/features/auth/model/auth.store';
import { ApiError } from '@/shared/api/api-error.type';
import { ROUTES } from '@/shared/config/routes';
import { Loader } from '@/shared/ui/loader/loader';

function AuthCallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setAuth = useAuthStore((state) => state.setAuth);
  const setLastLogin = useAuthStore((state) => state.setLastLogin);

  const token = searchParams.get('token');
  const type = searchParams.get('type') as SocialLoginType | null;
  const user = searchParams.get('user');
  const error = searchParams.get('error');

  const { mutate } = useSocialLoginMutation({
    onSuccess: (data) => {
      if (type) setLastLogin(type);
      setAuth(data.accessToken, data.refreshToken);
      router.replace(ROUTES.MISSIONS);
    },
    onError: (err) => {
      if (err instanceof ApiError && err.code === 404) {
        const params = new URLSearchParams({ token: token!, type: type! });
        if (user) params.set('user', user);
        router.replace(`${ROUTES.SIGNUP}?${params.toString()}`);
        return;
      }
      sessionStorage.setItem('auth_error', '로그인 중 오류가 발생했습니다.');
      router.replace(ROUTES.LOGIN);
    },
  });

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

    mutate({ type, token });
  }, [error, mutate, router, token, type]);

  return (
    <div className="bg-gradient-100 flex h-screen items-center justify-center">
      <Loader />
    </div>
  );
}

export default function Page() {
  return (
    <Suspense>
      <AuthCallbackHandler />
    </Suspense>
  );
}
