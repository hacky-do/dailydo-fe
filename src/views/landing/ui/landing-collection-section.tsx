import { FadeIn } from '@/shared/ui/fade-in';
import { SectionHeading } from '@/shared/ui/section-heading';

export const LandingCollectionSection = () => {
  return (
    <section className="bg-green-200 px-5 py-16">
      <FadeIn>
        <SectionHeading
          label="마이컬렉션"
          title="일상 속 미션이 컬렉션이 되다"
          description={
            <>
              여러 미션들을 수행하며
              <br />
              컬렉션을 모으는 재미를 느껴보세요.
            </>
          }
        />
      </FadeIn>

      {/* 대표 컬렉션 배지 */}
      <FadeIn delay={150} className="relative mt-12 flex flex-col items-center">
        <span className="z-10 -mb-2 rounded-full bg-white px-3 py-1 text-sm font-semibold tracking-tight text-green-700 shadow">
          나의 대표 컬렉션
        </span>
        <div className="flex h-34 w-34 items-center justify-center rounded-full border-4 border-green-500 bg-green-100">
          <div className="h-20 w-20 rounded-2xl bg-white/60 text-green-700/60" />
        </div>
        <span className="z-10 -mt-3 rounded-full bg-green-600 px-3 py-1 text-sm font-semibold tracking-tight text-white shadow">
          무지개를 손에 넣은 자
        </span>
      </FadeIn>

      <div className="mt-12 grid grid-cols-4 place-items-center gap-x-3 gap-y-6"></div>
    </section>
  );
};
