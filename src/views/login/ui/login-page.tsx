'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useSyncExternalStore } from 'react';

import { useSessionStore } from '@/entities/session';
import { LoginButton } from '@/features/auth';
import { ROUTES } from '@/shared/config/routes';
import DailyDoLogo from '@/shared/ui/icons/common/dailydo_logo.svg';
import Logo from '@/shared/ui/icons/common/logo.svg';
import DecoCircle from '@/shared/ui/icons/login/deco_circle.svg';
import DecoCoffee from '@/shared/ui/icons/login/deco_coffee.svg';
import DecoGraph from '@/shared/ui/icons/login/deco_graph.svg';
import DecoLight from '@/shared/ui/icons/login/deco_light.svg';
import DecoLocation from '@/shared/ui/icons/login/deco_location.svg';
import DecoStar from '@/shared/ui/icons/login/deco_star.svg';
import { useToast } from '@/shared/ui/toast/use-toast';

const RecentLoginBadge = () => {
  return (
    <div className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 animate-bounce flex-col items-center">
      <div className="rounded-3xl bg-[rgba(0,0,0,0.8)] px-3 py-1.5 whitespace-nowrap">
        <p className="text-sm leading-5 font-medium text-white">
          최근에 로그인했어요
        </p>
      </div>
      <div
        className="h-0 w-0"
        style={{
          borderLeft: '6px solid transparent',
          borderRight: '6px solid transparent',
          borderTop: '6px solid rgba(0,0,0,0.8)',
        }}
      />
    </div>
  );
};

export const LoginPage = () => {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const recentLogin = useSyncExternalStore(
    useSessionStore.subscribe,
    () => useSessionStore.getState().lastLogin,
    () => null,
  );

  const authError = searchParams.get('auth_error');
  const handledRef = useRef(false);
  useEffect(() => {
    if (authError !== null && !handledRef.current) {
      handledRef.current = true;
      toast({ message: '로그인에 실패했어요.', type: 'error' });
      router.replace(ROUTES.LOGIN);
    }
  }, [authError, router, toast]);

  return (
    <div className="bg-gradient-100 relative flex h-dvh flex-col overflow-hidden pb-17.5">
      <div className="min-h-10 flex-1" aria-hidden="true" />

      {/* section: 메인 컨텐츠 */}
      <section className="relative z-10 flex flex-col items-center pt-24">
        {/* 배경장식 */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden opacity-50"
          aria-hidden="true"
        >
          <DecoLocation
            width={40}
            className="animate-float-slow absolute"
            style={{ right: '100px', top: '30px' }}
          />
          <DecoGraph
            width={40}
            className="animate-float-slow absolute"
            style={{ left: '40px', top: '160px' }}
          />
          <DecoLight
            width={40}
            className="animate-float absolute"
            style={{ left: '60px', top: '56px' }}
          />
          <DecoStar
            width={10}
            className="animate-orbit-circle-reverse absolute"
            style={{ left: '130px', top: '121px' }}
          />
          <DecoCircle
            width={10}
            className="animate-orbit-circle absolute"
            style={{ right: '80px', top: '105px' }}
          />
          <DecoCoffee
            width={40}
            className="animate-float absolute"
            style={{ right: '37px', top: '190px' }}
          />
        </div>
        {/* App icon */}
        <div className="animate-pulse">
          <Logo width={48} />
        </div>
        <h1 className="mt-4">
          <DailyDoLogo width={145} />
          <span className="sr-only">Daily:DO</span>
        </h1>
        <p className="mt-0.5 text-xl font-light tracking-tight text-gray-800">
          오늘의 나에게 건네는 선물
        </p>
        <div className="relative flex aspect-246/197 w-full max-w-[70%] items-center justify-center">
          <div className="absolute top-1 aspect-square w-[95%] animate-pulse rounded-full bg-green-200" />
          <div className="absolute top-6 aspect-square w-[80%] animate-pulse rounded-full bg-green-300" />
          <Image
            src="/login/mainIllust.png"
            alt=""
            className="mt-6 object-contain"
            aria-hidden="true"
            loading="eager"
            sizes="(max-width: 768px) 100vw, 70vw"
            fill
          />
        </div>
      </section>

      <div className="flex-1" aria-hidden="true" />

      {/* 로그인 버튼 */}
      <div className="relative z-10 flex flex-col gap-4 px-5">
        <div className="relative">
          <LoginButton type="google" />
          {recentLogin === 'google' && <RecentLoginBadge />}
        </div>
        <div className="relative">
          <LoginButton type="naver" />
          {recentLogin === 'naver' && <RecentLoginBadge />}
        </div>
        <LoginButton type="guest" />
      </div>
    </div>
  );
};
