import { FadeIn } from '@/shared/ui/fade-in';

import { StartButton } from './start-button';
import Image from 'next/image';

import DecoCircle from '@/shared/ui/icons/login/deco_circle.svg';
import DecoCoffee from '@/shared/ui/icons/login/deco_coffee.svg';
import DecoGraph from '@/shared/ui/icons/login/deco_graph.svg';
import DecoLight from '@/shared/ui/icons/login/deco_light.svg';
import DecoLocation from '@/shared/ui/icons/login/deco_location.svg';
import DecoStar from '@/shared/ui/icons/login/deco_star.svg';

const ScrollChevron = () => (
  <svg
    width="41"
    height="41"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    className="animate-bounce text-green-500"
  >
    <path
      d="M6 9l6 6 6-6"
      stroke="#97E4CF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 14l6 6 6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const LandingHeroSection = () => {
  return (
    <section className="bg-gradient-100 relative overflow-hidden px-5 pt-12 pb-10">
      <div
        aria-hidden="true"
        className="absolute top-11 -left-6 h-24 w-24 rounded-full bg-green-200/60"
      />

      <div className="relative z-10 flex flex-col gap-12">
        <div className="flex flex-col gap-6">
          <FadeIn>
            <h1 className="flex flex-col gap-2 text-3xl font-bold tracking-tight text-black">
              <span>Daily:DO,</span>
              <span>오늘의 나에게 건네는 선물</span>
            </h1>
          </FadeIn>
          <FadeIn delay={100}>
            <p className="text-base font-medium tracking-tight text-gray-600">
              행복은 멀리 있지 않아요.
              <br />
              당신의 하루에 작은 기적을 더합니다.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={200}>
          <StartButton className="w-35">시작하기</StartButton>
        </FadeIn>
      </div>

      <FadeIn
        delay={300}
        className="relative z-10 mx-auto mt-8 flex aspect-square w-full max-w-90 items-center justify-center"
      >
        <Image
          src="/landing/background.svg"
          alt=""
          sizes="(max-width: 768px) 100vw, 70vw"
          fill
          className="object-contain"
        />
        <DecoLocation
          width={40}
          className="animate-float-slow absolute top-7.5 right-25"
        />
        <DecoGraph
          width={40}
          className="animate-float-slow absolute top-40 left-10"
        />
        <DecoLight
          width={40}
          className="animate-float absolute top-14 left-15"
        />
        <DecoStar
          width={10}
          className="animate-orbit-circle-reverse absolute top-30 left-32"
        />
        <DecoCircle
          width={10}
          className="animate-orbit-circle absolute top-26 right-20"
        />
        <DecoCoffee
          width={40}
          className="animate-float absolute top-48 right-9"
        />
        <div className="relative top-18 aspect-square w-full max-w-[70%] items-center justify-center">
          <Image
            src="/login/mainillust.png"
            alt=""
            sizes="(max-width: 768px) 100vw, 70vw"
            fill
            className="object-contain"
          />
        </div>
      </FadeIn>

      <FadeIn delay={400} className="relative z-10 mt-6 flex justify-center">
        <ScrollChevron />
      </FadeIn>
    </section>
  );
};
