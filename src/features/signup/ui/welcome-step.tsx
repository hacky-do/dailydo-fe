'use client';

import Image from 'next/image';

import DailyDoLogo from '@/shared/ui/icons/common/dailydo_logo.svg';
import Logo from '@/shared/ui/icons/common/logo.svg';
import DecoCircle from '@/shared/ui/icons/login/deco_circle.svg';
import DecoCoffee from '@/shared/ui/icons/login/deco_coffee.svg';
import DecoGraph from '@/shared/ui/icons/login/deco_graph.svg';
import DecoLight from '@/shared/ui/icons/login/deco_light.svg';
import DecoLocation from '@/shared/ui/icons/login/deco_location.svg';
import DecoStar from '@/shared/ui/icons/login/deco_star.svg';

interface WelcomeStepProps {
  nickname: string;
}

export const WelcomeStep = ({ nickname }: WelcomeStepProps) => {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center px-8">
      {/* 배경 장식 */}
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

      {/* 일러스트 */}
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
          src="/images/login/mainIllust.png"
          alt=""
          className="mt-6 object-contain"
          aria-hidden="true"
          loading="eager"
          sizes="(max-width: 768px) 100vw, 70vw"
          fill
        />
      </div>

      {/* 환영 메시지 */}
      <div className="mt-9 flex flex-col items-center gap-2">
        <p className="text-2xl font-semibold tracking-tight text-gray-800">
          반가워요, {nickname}님!
        </p>
        <p className="text-xs font-medium text-gray-500">
          데일리두에 오신 걸 환영해요!
        </p>
      </div>
    </div>
  );
};
