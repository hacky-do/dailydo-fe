'use client';

import 'swiper/css';

import Image from 'next/image';
import { useState } from 'react';
import type { Swiper as SwiperClass } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Card } from '@/features/card';
import QuestionBackIcon from '@/shared/ui/icons/mission/question_back.svg';
import { Loader } from '@/shared/ui/loader';
import { cn } from '@/shared/utils/cn';
import {
  categoryBadgeStyles,
  titleStyles,
} from '@/widgets/missions/mission-card.styles';

const SLIDE_SPEED = 500;

interface LandingMission {
  categoryName: string;
  title: string;
  image: string;
}

const LANDING_MISSIONS: LandingMission[] = [
  {
    categoryName: '취미',
    title: '마음에 드는 노래 한 곡 찾아 듣기',
    image: '/category/hobby.png',
  },
  {
    categoryName: '건강',
    title: '동네 한 바퀴 가볍게 걷기',
    image: '/category/exercise.png',
  },
  {
    categoryName: '힐링',
    title: '따뜻한 차 한 잔 천천히 마시기',
    image: '/category/heal.png',
  },
  {
    categoryName: '성장',
    title: '궁금했던 단어 하나 찾아보기',
    image: '/category/study.png',
  },
  {
    categoryName: '관계',
    title: '고마운 사람에게 안부 한 줄 보내기',
    image: '/category/relationship.png',
  },
];

const LandingMissionCardFront = () => (
  <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-4">
    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-300">
      <QuestionBackIcon className="h-7.5 w-auto animate-pulse" />
    </div>
    <div className="rounded-3xl bg-green-100 px-3 py-1">
      <span className="text-xl font-semibold text-green-500">오늘의 미션</span>
    </div>
    <span className="text-sm text-white">탭해서 확인하기</span>
  </div>
);

const LandingMissionCardBack = ({ mission }: { mission: LandingMission }) => (
  <>
    <span
      className={cn(
        'rounded-2xl px-2 py-1 text-xs font-normal',
        categoryBadgeStyles.default,
      )}
    >
      {mission.categoryName}
    </span>
    <p
      className={cn(
        'text-center text-xl font-semibold [word-break:auto-phrase]',
        titleStyles.default,
      )}
    >
      {mission.title}
    </p>
    <Image
      src={mission.image}
      alt=""
      width={80}
      height={80}
      className="rounded-full object-cover"
    />
  </>
);

const applySlideEffects = (swiper: SwiperClass) => {
  swiper.slides.forEach((slide) => {
    const el = slide as HTMLElement & { progress: number };
    const progress = Math.max(-1, Math.min(1, el.progress ?? 0));
    const wrapper = el.querySelector<HTMLElement>('[data-card-wrapper]');
    if (!wrapper) return;
    const absProgress = Math.abs(progress);
    wrapper.style.transform = `rotate(${progress * 6}deg) translateY(${absProgress * 16}px)`;
    wrapper.style.opacity = absProgress > 0 ? '0.5' : '1';
  });
};

const setWrapperTransition = (swiper: SwiperClass, value: string) => {
  swiper.slides.forEach((slide) => {
    const wrapper = slide.querySelector<HTMLElement>('[data-card-wrapper]');
    if (wrapper) wrapper.style.transition = value;
  });
};

export const MissionCarousel = () => {
  const [ready, setReady] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative min-h-82 w-full overflow-x-clip overflow-y-visible">
      {!ready && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <Loader />
        </div>
      )}
      <div
        className={cn(
          'transition-opacity duration-300',
          ready ? 'opacity-100' : 'opacity-0',
        )}
      >
        <Swiper
          slidesPerView="auto"
          centeredSlides
          spaceBetween={24}
          loop={false}
          grabCursor
          watchSlidesProgress
          speed={SLIDE_SPEED}
          style={{ overflow: 'visible' }}
          onSwiper={(swiper) => {
            setReady(true);
            setActiveIndex(swiper.activeIndex);
            applySlideEffects(swiper);
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          onSetTranslate={applySlideEffects}
          onTouchStart={(swiper) => setWrapperTransition(swiper, '')}
          onSlideChangeTransitionStart={(swiper) => {
            setWrapperTransition(
              swiper,
              `transform ${swiper.params.speed}ms ease, opacity ${swiper.params.speed}ms ease`,
            );
            applySlideEffects(swiper);
          }}
          onSlideChangeTransitionEnd={(swiper) =>
            setWrapperTransition(swiper, '')
          }
        >
          {LANDING_MISSIONS.map((mission, index) => (
            <SwiperSlide key={mission.title} className="w-56.25!">
              <div data-card-wrapper>
                <Card disabled={index !== activeIndex}>
                  <Card.Front>
                    <LandingMissionCardFront />
                  </Card.Front>
                  <Card.Back>
                    <LandingMissionCardBack mission={mission} />
                  </Card.Back>
                </Card>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
