'use client';

import Image from 'next/image';
import { useEffect, useSyncExternalStore } from 'react';

import DailyDoLogo from '@/shared/ui/icons/common/dailydo_logo.svg';
import Logo from '@/shared/ui/icons/common/logo.svg';
import DecoCircle from '@/shared/ui/icons/login/deco_circle.svg';
import DecoCoffee from '@/shared/ui/icons/login/deco_coffee.svg';
import DecoGraph from '@/shared/ui/icons/login/deco_graph.svg';
import DecoLight from '@/shared/ui/icons/login/deco_light.svg';
import DecoLocation from '@/shared/ui/icons/login/deco_location.svg';
import DecoStar from '@/shared/ui/icons/login/deco_star.svg';
import { useToast } from '@/shared/ui/toast/use-toast';

import { useAuthStore } from '../model/auth.store';
import { LoginButton } from './login-button';

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

export const LoginPage = ({ error }: { error?: string }) => {
  const { toast } = useToast();
  const recentLogin = useSyncExternalStore(
    useAuthStore.subscribe,
    () => useAuthStore.getState().lastLogin,
    () => null,
  );

  // TODO: 추후 구현 방식 확정 후, 로그인 실패 시 에러 메시지 처리 로직 개선 필요
  useEffect(() => {
    if (error) {
      toast({ message: '로그인에 실패했어요.', type: 'error' });
    }
  }, [error, toast]);

  return (
    <div className="bg-gradient-100 relative flex h-dvh flex-col overflow-hidden pb-17.5 [--gradient-dir:to_right]">
      {/* 배경장식 */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <DecoLocation
          width={40}
          className="animate-float-slow absolute opacity-50"
          style={{ right: '100px', top: '30px' }}
        />
        <DecoGraph
          width={40}
          className="animate-float-slow absolute opacity-50"
          style={{ left: '40px', top: '160px' }}
        />
        <DecoLight
          width={40}
          className="animate-float absolute opacity-50"
          style={{ left: '60px', top: '56px' }}
        />
        <DecoStar
          width={10}
          className="animate-orbit-circle-reverse absolute opacity-50"
          style={{ left: '130px', top: '121px' }}
        />
        <DecoCircle
          width={10}
          className="animate-orbit-circle absolute opacity-50"
          style={{ right: '80px', top: '105px' }}
        />
        <DecoCoffee
          width={40}
          className="animate-float absolute opacity-50"
          style={{ right: '37px', top: '190px' }}
        />
      </div>

      <div className="min-h-10 flex-2" />

      {/* section: 로고 */}
      <div className="relative z-10 flex flex-col items-center">
        {/* App icon */}
        <Logo width={48} />
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
            src="/images/login/mainIllust.png"
            alt=""
            className="mt-6 object-contain"
            aria-hidden="true"
            fill
          />
        </div>
      </div>

      <div className="flex-1" />

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
