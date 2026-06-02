'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { SocialLoginType } from '@/entities/session';
import { ROUTES } from '@/shared/config/routes';

export type SignupStep = 'nickname' | 'category' | 'welcome';

const STEP_ORDER: SignupStep[] = ['nickname', 'category', 'welcome'];
export const MIN_CATEGORY_COUNT = 2;

export const useSignupFlow = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [nickname, setNickname] = useState('');
  const [categoryIds, setCategoryIds] = useState<number[]>([]);

  const socialToken = searchParams.get('token') ?? '';
  const type = (searchParams.get('type') ?? 'google') as SocialLoginType;

  const rawStep = searchParams.get('step') as SignupStep | null;
  const urlStep: SignupStep =
    rawStep != null && STEP_ORDER.includes(rawStep) ? rawStep : 'nickname';

  // 이전 단계 데이터 없이 직접 접근하면 nickname으로 되돌린다
  const step: SignupStep =
    urlStep === 'category' && !nickname
      ? 'nickname'
      : urlStep === 'welcome' &&
          (!nickname || categoryIds.length < MIN_CATEGORY_COUNT)
        ? 'nickname'
        : urlStep;

  useEffect(() => {
    if (step === urlStep) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set('step', step);
    router.replace(`${ROUTES.SIGNUP}?${params.toString()}`);
  }, [step, urlStep, router, searchParams]);

  // nickname 스텝에서 브라우저 뒤로가기 시 /login으로 이동
  useEffect(() => {
    if (step !== 'nickname') return;

    window.history.pushState(null, '', window.location.href);

    const handlePopState = () => {
      router.replace(ROUTES.LOGIN);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [step, router]);

  const navigateTo = (target: SignupStep) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('step', target);
    router.push(`${ROUTES.SIGNUP}?${params.toString()}`);
  };

  return {
    step,
    nickname,
    categoryIds,
    socialToken,
    type,
    setCategoryIds,
    goToCategory: (value: string) => {
      setNickname(value);
      navigateTo('category');
    },
    goToPrev: () => navigateTo('nickname'),
    goToWelcome: () => navigateTo('welcome'),
  };
};
