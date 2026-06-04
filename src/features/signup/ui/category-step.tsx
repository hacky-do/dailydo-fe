'use client';

import { ReactNode } from 'react';

interface CategoryStepProps {
  /** 카테고리 선택 UI(CategorySelect)를 상위 view에서 주입한다. */
  children: ReactNode;
}

export const CategoryStep = ({ children }: CategoryStepProps) => {
  return (
    <div className="flex flex-1 flex-col px-8 pt-9">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl leading-8 font-semibold tracking-tight text-gray-800">
          추천받고 싶은
          <br />
          카테고리를 선택해주세요.
        </h1>
        <p className="px-1 text-xs font-medium text-gray-500">
          최소 2개 이상 선택이 필요해요.
        </p>
      </div>
      <div className="mt-9 flex-1">{children}</div>
    </div>
  );
};
