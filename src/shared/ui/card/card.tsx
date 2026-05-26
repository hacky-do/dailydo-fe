'use client';

import Image from 'next/image';
import { useState } from 'react';

import { cn } from '@/shared/utils/cn';

export interface CardProps {
  id: string;
  title: string;
  categoryId: string;
  categoryName: string;
  image: string;
  completedCount: number;
  createdAt: string;
  updatedAt: string;
  isSpecial: boolean;
}

const Card = ({
  id,
  title,
  //image,
  categoryName,
  completedCount,
  isSpecial,
}: CardProps) => {
  const [flipped, setFlipped] = useState(false);
  const [selected, setSelect] = useState<string[]>([]);

  const handleSelect = (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSelect((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };
  const handleCancel = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelect((prev) => prev.filter((item) => item !== id));
    setFlipped(false);
  };

  return (
    <div
      id={id}
      className="relative h-full min-h-82 w-56.25 min-w-56.25 cursor-pointer perspective-midrange"
      onClick={() => setFlipped((prev) => !prev)}
      role="button"
      tabIndex={-1}
    >
      <div
        data-flipped={flipped}
        className={`shadow-card absolute inset-0 rounded-2xl transition-transform duration-500 transform-3d ${flipped ? 'transform-[rotateY(180deg)]' : ''}`}
      >
        {/* 앞면 */}
        <div
          className={cn(
            'absolute inset-0 overflow-hidden rounded-2xl backface-hidden',
            isSpecial
              ? 'bg-special-mission-card-pattern'
              : 'bg-basic-mission-card-pattern',
            flipped && 'pointer-events-none',
          )}
        >
          <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-4">
            {isSpecial ? (
              <div className="bg-special flex h-20 w-20 items-center justify-center rounded-full">
                <div className="relative h-20 w-20">
                  <Image
                    src="/mission/icons/special_back.svg"
                    alt=""
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-300">
                <div className="relative h-7.5 w-6.25">
                  <Image
                    src="/mission/icons/question_back.svg"
                    alt=""
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>
            )}
            <div className="rounded-3xl bg-green-100 px-3 py-1">
              <span className="ttext-xl font-semibold text-green-600">
                오늘의 미션
              </span>
            </div>
            <span className="text-sm text-white">탭해서 확인하기</span>
          </div>
        </div>

        {/* 뒷면 */}
        <div className="shadow-card absolute inset-0 flex transform-[rotateY(180deg)] flex-col items-center justify-center gap-3 rounded-2xl bg-white px-6 backface-hidden">
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-normal text-green-600">
            {categoryName}
          </span>
          <p className="text-center text-lg font-bold text-gray-800">{title}</p>
          {/* <Image src={image} alt="Mission" width={80} height={80} /> */}
          <span className="text-sm text-gray-400">
            {selected.length > 0 && `${completedCount}명이 완료했어요`}
          </span>
          <div className="flex items-center justify-center gap-2">
            {selected.length > 0 ? (
              <button
                className="rounded-full bg-green-600 px-4 py-2 text-sm font-medium text-white"
                onClick={(e) => handleCancel(id, e)}
              >
                취소하기
              </button>
            ) : (
              <>
                <button
                  className="rounded-full bg-green-600 px-4 py-2 text-sm font-medium text-white"
                  onClick={(e) => e.stopPropagation()}
                >
                  넘기기
                </button>
                <button
                  className="rounded-full bg-green-600 px-4 py-2 text-sm font-medium text-white"
                  onClick={(e) => handleSelect(id, e)}
                >
                  선택하기
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { Card };
