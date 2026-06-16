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
import { MISSION_TOAST_MESSAGES } from '@/entities/missions/model/mission.constants';
import { MyMissionItem } from '@/entities/missions/model/mission.types';
import { Card } from '@/features/card';
import { FileInput } from '@/features/file-input';
import { useFileInput } from '@/features/file-input/model/use-file-input';
import { BottomSheet } from '@/shared/ui/bottom-sheet';
import { Button } from '@/shared/ui/button/button';
import { Textarea } from '@/shared/ui/input';
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

interface MyLogBottomSheetProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (photo: string, memo: string) => void;
  onSkip: () => void;
  isPending?: boolean;
}

export const MyLogBottomSheet = ({
  open,
  setOpen,
  onSubmit,
  onSkip,
  isPending = false,
}: MyLogBottomSheetProps) => {
  const { file, handleChange } = useFileInput();
  const [memo, setMemo] = useState('');
  const { mutateAsync: upload, isPending: isUploading } = useFileUpload();
  const { toast } = useToast();

  const handleSubmit = async () => {
    try {
      const photo = file ? await upload(file) : '';
      onSubmit(photo, memo);
    } catch (error) {
      toast({
        message: `${MISSION_TOAST_MESSAGES.uploadError}`,
        type: 'error',
      });
      console.error(error);
    }
  };

  const isLoading = isUploading || isPending;

  return (
    <>
      <BottomSheet.Root open={open} onOpenChange={setOpen}>
        <BottomSheet.Content onPointerDownOutside={(e) => e.preventDefault()}>
          <BottomSheet.Header className="pt-6">
            <BottomSheet.Title>마이로그 작성</BottomSheet.Title>
          </BottomSheet.Header>
          <BottomSheet.Body className="flex flex-col pt-4 pb-8">
            <span className="mb-1 text-sm font-medium">
              기억하고 싶은 순간이 있나요?
            </span>
            <div className="flex flex-col gap-12">
              <FileInput onChange={handleChange} />
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
          <BottomSheet.Footer className="pt-0 pb-8">
            <div className="flex gap-2">
              <BottomSheet.Close>
                <Button
                  variant="tertiary"
                  onClick={onSkip}
                  isLoading={isPending}
                  type="button"
                >
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

  const handleSubmit = (photo: string, memo: string) => {
    mutate(
      { itemId: mission.itemId, mylog: { photo, memo } },
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

  const handleSkip = () => {
    mutate(
      { itemId: mission.itemId, mylog: { photo: '', memo: '' } },
      {
        onSuccess: () => {
          toast({
            message: `${MISSION_TOAST_MESSAGES.skipSuccess}`,
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
        onSkip={handleSkip}
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
