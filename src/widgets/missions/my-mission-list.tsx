'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import type { Swiper as SwiperClass } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import {
  useGetMyMissions,
  usePostCompleteMission,
} from '@/entities/missions/api/mission.queries';
import { MISSION_TOAST_MESSAGES } from '@/entities/missions/model/mission.constants';
import { MyMissionItem } from '@/entities/missions/model/mission.types';
import { Card } from '@/features/card';
import { MyLogBottomSheet } from '@/features/mylogs';
import { Button } from '@/shared/ui/button/button';
import { useToast } from '@/shared/ui/toast';
import { cn } from '@/shared/utils/cn';

interface MyMissionBackContentProps {
  mission: MyMissionItem;
  onCompleteClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const MyMissionBackContent = ({
  mission,
  onCompleteClick,
}: MyMissionBackContentProps) => {
  return (
    <>
      <span
        className={cn(
          'rounded-2xl px-2 py-1 text-xs font-normal',
          mission?.completed ? 'bg-white' : 'bg-gray-100',
          mission?.completed
            ? mission.isSpecial
              ? 'text-special-text-color'
              : 'text-green-600'
            : 'text-gray-600',
        )}
      >
        {mission.isSpecial ? '히든 미션' : mission.categoryName}
      </span>
      <p
        className={cn(
          'text-center text-xl font-semibold break-keep',
          mission?.completed ? 'text-white' : 'text-gray-800',
        )}
      >
        {mission.title}
      </p>
      <Image
        src={mission?.mylog?.photo || '/mocks/images/test_image.png'}
        alt={mission.title}
        width={147}
        height={147}
        className={cn(
          'rounded-lg object-cover transition-all duration-500 ease-out',
          mission?.completed ? 'aspect-4/3 w-36.75' : 'h-20 w-20',
        )}
      />
      {mission?.completed && (
        <span className="animate-slide-up w-full overflow-hidden text-center text-xs font-normal text-ellipsis whitespace-nowrap text-white">
          {mission?.mylog?.memo}
        </span>
      )}
      {!mission?.completed && (
        <Button
          variant="primary"
          size="md"
          onClick={onCompleteClick}
          type="button"
        >
          완료하기
        </Button>
      )}
    </>
  );
};

export const MyMissionCard = ({ mission }: { mission: MyMissionItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const { mutate, isPending } = usePostCompleteMission({
    onError: (message) => {
      toast({ type: 'error', message });
      setIsOpen(true);
    },
  });

  const handleCompleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen(true);
  };

  const handleSubmit = (photo: string | null, memo: string) => {
    mutate(
      { itemId: mission.itemId, mylog: { photo: photo ?? '', memo } },
      {
        onSuccess: () => {
          toast({
            message: `${MISSION_TOAST_MESSAGES.completeSuccess}`,
            type: 'success',
          });
          setIsOpen(false);
        },
      },
    );
  };

  return (
    <>
      <Card
        isSpecial={mission.isSpecial}
        defaultFlipped
        isCompleted={mission.completed}
      >
        <Card.Back>
          <MyMissionBackContent
            mission={mission}
            onCompleteClick={handleCompleteClick}
          />
        </Card.Back>
      </Card>
      <MyLogBottomSheet
        open={isOpen}
        setOpen={setIsOpen}
        onSubmit={handleSubmit}
        isPending={isPending}
      />
    </>
  );
};

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

export const MyMissionList = () => {
  const { data } = useGetMyMissions();
  const swiperRef = useRef<SwiperClass | null>(null);

  const missions = data.items;

  const handleSlideChangeStart = (swiper: SwiperClass) => {
    swiper.slides.forEach((slide) => {
      const wrapper = slide.querySelector<HTMLElement>('[data-card-wrapper]');
      if (wrapper)
        wrapper.style.transition = `transform ${swiper.params.speed}ms ease, opacity ${swiper.params.speed}ms ease`;
    });
    applySlideEffects(swiper);
  };

  const handleSlideChangeEnd = (swiper: SwiperClass) => {
    swiper.slides.forEach((slide) => {
      const wrapper = slide.querySelector<HTMLElement>('[data-card-wrapper]');
      if (wrapper) wrapper.style.transition = '';
    });
  };

  const handleTouchStart = (swiper: SwiperClass) => {
    swiper.slides.forEach((slide) => {
      const wrapper = slide.querySelector<HTMLElement>('[data-card-wrapper]');
      if (wrapper) wrapper.style.transition = '';
    });
  };

  return (
    <>
      <div className="w-full overflow-x-clip overflow-y-visible">
        <Swiper
          slidesPerView="auto"
          centeredSlides
          spaceBetween={24}
          loop={false}
          grabCursor
          watchSlidesProgress
          style={{ overflow: 'visible' }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onInit={applySlideEffects}
          onSetTranslate={applySlideEffects}
          onTouchStart={handleTouchStart}
          onSlideChangeTransitionStart={handleSlideChangeStart}
          onSlideChangeTransitionEnd={handleSlideChangeEnd}
        >
          {missions.map((mission) => (
            <SwiperSlide key={mission.itemId} className="w-56.25!">
              <div data-card-wrapper>
                <MyMissionCard mission={mission} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};
