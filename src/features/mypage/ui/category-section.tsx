'use client';

import Image from 'next/image';
import { useState } from 'react';

import { useGetMe } from '@/entities/user';
import ChevronRight from '@/shared/ui/icons/mypage/chevron_right.svg';
import { Skeleton, TextSkeleton } from '@/shared/ui/skeleton';

import { sectionLabelClass } from './mypage.styles';

const SKELETON_COUNT = 4;

const CategoryItemSkeleton = () => (
  <li className="flex w-22 shrink-0 flex-col items-center gap-1 rounded-2xl bg-white py-2 text-sm font-semibold">
    <Skeleton variant="sm" className="size-10" />
    <TextSkeleton variant="sm" className="w-15" />
  </li>
);

export const CategorySectionSkeleton = () => (
  <section className="flex flex-col gap-2">
    <h4>
      <div className={`flex items-center gap-1 ${sectionLabelClass}`}>
        나의 카테고리
        <ChevronRight height={16} aria-hidden="true" />
      </div>
    </h4>
    <ul className="scrollbar-hide flex gap-2 overflow-x-auto">
      {Array.from({ length: SKELETON_COUNT }, (_, i) => (
        <CategoryItemSkeleton key={i} />
      ))}
    </ul>
  </section>
);

const CategoryItem = ({ src, label }: { src: string; label: string }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);

  return (
    <li className="flex w-22 shrink-0 flex-col items-center gap-1 rounded-2xl bg-white py-2 text-sm font-semibold">
      <div className="relative size-10">
        {isImageLoading && (
          <Skeleton variant="sm" className="absolute inset-0 m-auto" />
        )}
        <Image
          src={src}
          fill
          alt=""
          className={`object-cover ${isImageLoading ? 'invisible' : 'visible'}`}
          onLoad={() => setIsImageLoading(false)}
        />
      </div>
      {isImageLoading ? <TextSkeleton variant="sm" className="w-15" /> : label}
    </li>
  );
};

export const CategorySection = () => {
  const { data } = useGetMe();

  return (
    <section className="flex flex-col gap-2">
      <h4>
        <button
          type="button"
          className={`flex items-center gap-1 ${sectionLabelClass}`}
        >
          나의 카테고리
          <ChevronRight height={16} aria-hidden="true" />
        </button>
      </h4>
      <ul className="scrollbar-hide flex gap-2 overflow-x-auto">
        {data.categories.data.map((category) => (
          <CategoryItem
            key={category.id}
            src={category.image}
            label={category.name}
          />
        ))}
      </ul>
    </section>
  );
};
