import { FadeIn } from '@/shared/ui/fade-in';
import { SectionHeading } from '@/shared/ui/section-heading';

import { MISSION_SECTION_ID } from '../config/constants';
import { MissionCarousel } from './mission-carousel';

export const LandingMissionSection = () => {
  return (
    <section
      id={MISSION_SECTION_ID}
      className="relative bg-green-200 pt-16 pb-30"
    >
      <div className="px-5">
        <FadeIn>
          <SectionHeading
            label="오늘의 미션"
            title="다양한 분야의 미션을 만나보세요"
            description="취향에 따라서 원하는 미션을 골라보세요."
          />
        </FadeIn>
      </div>

      <FadeIn delay={150} className="mt-12">
        <MissionCarousel />
      </FadeIn>
    </section>
  );
};
