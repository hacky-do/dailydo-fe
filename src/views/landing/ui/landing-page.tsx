import { LandingCollectionSection } from './landing-collection-section';
import { LandingCtaSection } from './landing-cta-section';
import { LandingHeroSection } from './landing-hero-section';
import { LandingMissionSection } from './landing-mission-section';
import { LandingMylogSection } from './landing-mylog-section';

export const LandingPage = () => {
  return (
    <>
      <LandingHeroSection />
      <LandingMissionSection />
      <LandingMylogSection />
      <LandingCollectionSection />
      <LandingCtaSection />
    </>
  );
};
