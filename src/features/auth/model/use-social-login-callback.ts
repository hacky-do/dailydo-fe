import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import {
  SOCIAL_LOGIN_TYPES,
  SocialLoginType,
  useSessionStore,
} from '@/entities/session';
import { ApiError } from '@/shared/api/api-error.type';
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

  const { mutate: login } = useSocialLogin();
  const { mutate: register } = useRegister();

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
          toast({ message: '다시 돌아오신 것을 환영해요!', type: 'success' });
          router.replace(ROUTES.MISSIONS);
        },
        onError: (err: unknown) => {
          if (err instanceof ApiError && err.code === 404) {
            const socialUser = parseSocialUser(user);
            if (!socialUser) {
              router.replace(`${ROUTES.LOGIN}?auth_error`);
              return;
            }
            const { email, name, profileImage } = socialUser;
            register(
              {
                email,
                name,
                profileImage,
                type,
                socialToken: token,
                agreeMarketing: true,
              },
              {
                onSuccess: () => {
                  setLastLogin(type);
                  router.replace(ROUTES.MISSIONS);
                },
                onError: () => {
                  router.replace(`${ROUTES.LOGIN}?auth_error`);
                },
              },
            );
            return;
          }
          router.replace(`${ROUTES.LOGIN}?auth_error`);
        },
      },
    );
  }, [error, login, register, router, setLastLogin, token, type, user, toast]);
};
