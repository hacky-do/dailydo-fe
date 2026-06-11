import Image from 'next/image';

import { FadeIn } from '@/shared/ui/fade-in';
import { SectionHeading } from '@/shared/ui/section-heading';

export const LandingMylogSection = () => {
  return (
    <section className="bg-white px-5 py-16">
      <FadeIn>
        <SectionHeading
          align="left"
          label="마이로그"
          title={
            <>
              미션들을 수행하고
              <br />
              자유롭게 로그를 작성해보세요
            </>
          }
          description={
            <>
              미션을 진행하며 느낀 것들을 자유롭게 작성하세요.
              <br />
              다른 누구도 아닌, 오직 나를 위한 기록이에요.
            </>
          }
        />
      </FadeIn>

      <div className="mt-10 flex flex-col gap-5">
        <FadeIn delay={150} className="items-centergap-3 flex">
          <Image
            src="/landing/decoration-1.png"
            alt=""
            width={120}
            height={120}
          />
        </FadeIn>
        <FadeIn delay={200} className="flex items-center justify-between gap-3">
          <Image src="/landing/bubble-2.png" alt="" width={120} height={120} />
        </FadeIn>
        <FadeIn delay={250} className="flex items-center justify-end gap-3">
          <Image src="/landing/bubble-1.png" alt="" width={120} height={120} />
        </FadeIn>
        <FadeIn delay={300} className="flex items-center justify-between gap-3">
          <Image
            src="/landing/decoration-2.png"
            alt=""
            width={120}
            height={120}
          />
        </FadeIn>
      </div>

      <div className="mt-8 flex justify-center"></div>
    </section>
  );
};
