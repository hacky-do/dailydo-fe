import { FadeIn } from '@/shared/ui/fade-in';

import { StartButton } from './start-button';

export const LandingCtaSection = () => {
  return (
    <section className="bg-gradient-100 relative overflow-hidden px-5 py-20">
      {/* 배경 장식 */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute top-16 left-6 h-32 w-32 rounded-full bg-green-200/60" />
        <div className="absolute -right-10 -bottom-10 h-60 w-60 rounded-full bg-green-300/50" />
        <div className="absolute right-16 -bottom-4 h-44 w-44 rounded-full bg-green-200/50" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-10">
        <FadeIn>
          <h2 className="text-center text-2xl font-bold tracking-tight">
            <span className="block text-black">
              혼자 시작하기 어려웠던 일들,
            </span>
            <span className="block text-green-600">데일리두에서 함께 해요</span>
          </h2>
        </FadeIn>
        <FadeIn delay={150}>
          <StartButton>미션 시작하기</StartButton>
        </FadeIn>
      </div>
    </section>
  );
};
