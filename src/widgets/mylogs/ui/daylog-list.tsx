'use client';

import 'swiper/css';

import Image from 'next/image';
import type { Swiper as SwiperClass } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Card } from '@/features/card';
import { BottomSheet } from '@/shared/ui/bottom-sheet';
import { Button } from '@/shared/ui/button';
import CheckCircle from '@/shared/ui/icons/mypage/check_circle.svg';

import { MOCK_DAY_LOG_RECORDS } from '../model/mylogs.mock';
import type { DayLogRecord } from '../model/mylogs.types';

interface DayLogCardContentProps {
  record: DayLogRecord;
}

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
};

const formatTime = (iso: string) => {
  const d = new Date(iso);
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
};

const DayLogCardContent = ({ record }: DayLogCardContentProps) => {
  return (
    <>
      <span className="rounded-2xl bg-white px-2 py-1 text-xs font-normal text-green-600">
        {record.categoryName}
      </span>
      <p className="text-center text-xl font-semibold [word-break:auto-phrase] text-white">
        {record.title}
      </p>
      <Image
        src={record.photo || '/mocks/images/mock1.png'}
        alt={record.title}
        width={147}
        height={147}
        className="h-36.75 w-36.75 rounded-lg object-cover"
      />
      {record.memo && (
        <p className="text-center text-xs font-normal text-white">
          {record.memo}
        </p>
      )}
      <BottomSheet.Root>
        <BottomSheet.Trigger>
          <Button variant="secondary" size="md">
            자세히보기
          </Button>
        </BottomSheet.Trigger>
        <BottomSheet.Content className="flex flex-col py-8">
          <BottomSheet.Title className="sr-only">
            마이로그 상세
          </BottomSheet.Title>
          <BottomSheet.CloseButton className="absolute top-1.5 right-4" />
          <span className="w-fit rounded-2xl bg-gray-100 px-2 py-1 text-sm text-gray-600">
            {record.categoryName}
          </span>
          <div className="flex gap-2.5">
            <p className="my-2 text-lg font-bold">{record.title}</p>
            <CheckCircle width={24} />
          </div>
          <ul className="flex gap-3 text-sm font-semibold">
            <li className="w-fit rounded-md bg-[#FF7418]/20 px-2 py-0.5 text-[#DB6F3D]">
              {record.completedCount}번째 완료
            </li>
            <li className="w-fit rounded-md border border-gray-200 px-2 py-0.5 text-gray-600">
              {formatDate(record.createdAt)}
            </li>
            <li className="w-fit rounded-md border border-gray-200 px-2 py-0.5 text-gray-600">
              {formatTime(record.createdAt)}
            </li>
          </ul>
          <div className="relative my-3 aspect-4/3 w-full">
            <Image
              src={record.photo || '/mocks/images/mock1.png'}
              alt={record.title}
              fill
              sizes="430px"
              className="rounded-xl object-cover"
            />
          </div>
          {record.memo && <p>{record.memo}</p>}
          <div className="mt-8 flex w-full gap-3">
            <Button variant="secondary">수정하기</Button>
            <Button>공유하기</Button>
          </div>
        </BottomSheet.Content>
      </BottomSheet.Root>
    </>
  );
};

const DayLogCard = ({ record }: { record: DayLogRecord }) => {
  return (
    <Card isCompleted defaultFlipped>
      <Card.Back>
        <DayLogCardContent record={record} />
      </Card.Back>
    </Card>
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

export const DayLogList = () => {
  const records = MOCK_DAY_LOG_RECORDS;
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
    <div className="w-full overflow-x-clip overflow-y-visible">
      <Swiper
        slidesPerView="auto"
        centeredSlides
        spaceBetween={24}
        loop
        grabCursor
        watchSlidesProgress
        style={{ overflow: 'visible' }}
        onInit={applySlideEffects}
        onSetTranslate={applySlideEffects}
        onTouchStart={handleTouchStart}
        onSlideChangeTransitionStart={handleSlideChangeStart}
        onSlideChangeTransitionEnd={handleSlideChangeEnd}
      >
        {records.map((record) => (
          <SwiperSlide key={record.id} className="w-56.25!">
            <div data-card-wrapper>
              <DayLogCard record={record} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
