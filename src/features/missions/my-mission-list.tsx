'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import type { Swiper as SwiperClass } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useGetMyMissions } from '@/entities/missions/api/mission.queries';
import { MissionItem, MyLog } from '@/entities/missions/model/mission.types';
import { AlertBottomSheet } from '@/shared/ui/bottom-sheet';
import { BottomSheet } from '@/shared/ui/bottom-sheet';
import { Button } from '@/shared/ui/button/button';
import { Textarea } from '@/shared/ui/input';
import { cn } from '@/shared/utils/cn';
import { Card } from '@/widgets/card';
import { FileInput } from '@/widgets/file-input';

interface MyMissionBackContentProps {
  mission: MissionItem;
  isCompleted: boolean;
  onCompleteClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  open: boolean;
  setIsOpen: (open: boolean) => void;
  onMyLogForm: {
    id: number;
    memo: string;
    photo: string;
  };
  onSetMyLogForm: (value: MyLog) => void;
}

const MyMissionBackContent = ({
  mission,
  isCompleted,
  onCompleteClick,
  open,
  setIsOpen,
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
          isCompleted ? 'h-[147px] w-[147px]' : 'h-20 w-20',
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
      {open && <MyLogBottomSheet open={open} setOpen={setIsOpen} />}
    </>
  );
};

export const MyLogBottomSheet = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const [alertOpen, setAlertOpen] = useState(false);

  const handleAlertOpenConfirm = () => {
    setOpen(false);
    setAlertOpen(true);
  };
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
              <FileInput />
              <Textarea
                id="mylog"
                label="오늘을 한줄로 남겨 볼까요?"
                placeholder="최대 100자까지 입력 가능해요."
                description="0/100자"
              />
            </div>
          </BottomSheet.Body>
          <BottomSheet.Footer className="pt-0 pb-8">
            <div className="flex gap-2">
              <BottomSheet.Close>
                <Button variant="tertiary">건너뛰기</Button>
              </BottomSheet.Close>
              <Button variant="primary" onClick={handleAlertOpenConfirm}>
                완료하기
              </Button>
            </div>
          </BottomSheet.Footer>
        </BottomSheet.Content>
      </BottomSheet.Root>
      <AlertBottomSheet
        open={alertOpen}
        onOpenChange={setAlertOpen}
        title="정말 취소하시겠어요?"
        description="완료를 취소하면 연결된 로그도 같이 삭제돼요."
        confirmLabel="네"
        cancelLabel="아니오"
        onConfirm={() => {
          setOpen(false);
          setAlertOpen(false);
        }}
      />
    </>
  );
};

export const MyMissionCard = ({ mission }: { mission: MissionItem }) => {
  const [isCompleted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [myLogForm, setMyLogForm] = useState<MyLog>({
    id: 0,
    photo: '',
    memo: '',
  });
  // const { mutate: postMyMissions, isPending } = usePostCompleteMission();
  const handleCompleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen(true);
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
            open={isOpen}
            setIsOpen={setIsOpen}
            onMyLogForm={myLogForm}
            onSetMyLogForm={setMyLogForm}
          />
        </Card.Back>
      </Card>
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
          loop
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
            <SwiperSlide key={mission.missionId} className="!w-[225px]">
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
