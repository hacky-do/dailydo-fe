'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import type { Swiper as SwiperClass } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useFileUpload } from '@/entities/file/api/file.queries';
import {
  useGetMyMissions,
  usePostCompleteMission,
} from '@/entities/missions/api/mission.queries';
import {
  MissionItem,
  MyMissionItem,
} from '@/entities/missions/model/mission.types';
import { BottomSheet } from '@/shared/ui/bottom-sheet';
import { Button } from '@/shared/ui/button/button';
import { Textarea } from '@/shared/ui/input';
import { useToast } from '@/shared/ui/toast';
import { cn } from '@/shared/utils/cn';
import { Card } from '@/widgets/card';
import { FileInput } from '@/widgets/file-input';
import { useFileInput } from '@/widgets/file-input/model/use-file-input';

interface MyMissionBackContentProps {
  mission: MissionItem;
  isCompleted: boolean;
  onCompleteClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const MyMissionBackContent = ({
  mission,
  isCompleted,
  onCompleteClick,
}: MyMissionBackContentProps) => {
  return (
    <>
      <span
        className={cn(
          'rounded-2xl px-2 py-1 text-xs font-normal',
          isCompleted ? 'bg-white' : 'bg-gray-100',
          isCompleted
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
          'text-center text-xl font-semibold',
          isCompleted ? 'text-white' : 'text-gray-800',
        )}
      >
        {mission.title}
      </p>
      <Image
        src={mission.image || '/mocks/images/test_image.png'}
        alt={mission.title}
        width={147}
        height={147}
        className={cn(
          'rounded-full object-cover transition-all duration-500 ease-out',
          isCompleted ? 'h-36.75 w-36.75' : 'h-20 w-20',
        )}
      />
      {isCompleted && (
        <span className="animate-slide-up text-xs font-normal text-white">
          조각구름이 흩어지기 전에 순간포착!
        </span>
      )}
      {!isCompleted && (
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

interface MyLogBottomSheetProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (photo: string, memo: string) => void;
  isPending?: boolean;
}

export const MyLogBottomSheet = ({
  open,
  setOpen,
  onSubmit,
  isPending = false,
}: MyLogBottomSheetProps) => {
  const { file, handleChange } = useFileInput();
  const [memo, setMemo] = useState('');
  const { mutateAsync: upload, isPending: isUploading } = useFileUpload();

  const handleSubmit = async () => {
    const photo = file ? await upload(file) : '';
    onSubmit(photo, memo);
  };

  const isLoading = isUploading || isPending;

  return (
    <BottomSheet.Root open={open} onOpenChange={setOpen}>
      <BottomSheet.Content onPointerDownOutside={(e) => e.preventDefault()}>
        <BottomSheet.Header>
          <BottomSheet.Title>마이로그 작성</BottomSheet.Title>
        </BottomSheet.Header>
        <BottomSheet.Body>
          <span className="mt-8 mb-1 text-sm font-medium">
            기억하고 싶은 순간이 있나요?
          </span>
          <div className="mb-12">
            <FileInput onChange={handleChange} />
          </div>
          <div className="pb-8">
            <Textarea
              id="mylog"
              label="오늘을 한줄로 남겨 볼까요?"
              placeholder="최대 100자까지 입력 가능해요."
              description={`${memo.length}/100자`}
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              maxLength={100}
            />
          </div>
        </BottomSheet.Body>
        <BottomSheet.Footer>
          <div className="flex gap-2">
            <BottomSheet.Close>
              <Button variant="secondary" disabled={isLoading}>
                건너뛰기
              </Button>
            </BottomSheet.Close>
            <Button
              variant="primary"
              onClick={handleSubmit}
              isLoading={isLoading}
              type="button"
            >
              완료하기
            </Button>
          </div>
        </BottomSheet.Footer>
      </BottomSheet.Content>
    </BottomSheet.Root>
  );
};

export const MyMissionCard = ({ mission }: { mission: MyMissionItem }) => {
  const [isCompleted, setIsCompleted] = useState(mission.completed);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const { mutate, isPending } = usePostCompleteMission({
    onError: (message) => toast({ type: 'error', message }),
  });

  const handleCompleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen(true);
  };

  const handleSubmit = (photo: string, memo: string) => {
    mutate(
      { missionId: mission.missionId, mylog: { photo, memo } },
      {
        onSuccess: () => {
          setIsCompleted(true);
          setIsOpen(false);
        },
      },
    );
  };

  return (
    <>
      <Card
        isSpecial={mission.isSpecial}
        isCompleted={isCompleted}
        defaultFlipped
      >
        <Card.Back>
          <MyMissionBackContent
            mission={mission}
            isCompleted={isCompleted}
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
            <SwiperSlide key={mission.missionId} className="w-56.25!">
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
