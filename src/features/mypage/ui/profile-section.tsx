'use client';

import Image from 'next/image';
import { useState } from 'react';

import { useGetMe } from '@/entities/user';
import { Skeleton, TextSkeleton } from '@/shared/ui/skeleton';

export const ProfileSectionSkeleton = () => (
  <section className="flex flex-col gap-4">
    <div className="absolute -top-[57px] left-5 size-28.5 overflow-hidden rounded-full border-2 border-green-100">
      <Skeleton className="h-full w-full" />
    </div>
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <TextSkeleton variant="lg" className="w-35" />
        <Skeleton className="h-5 w-20 rounded-2xl" />
      </div>
      <div className="min-h-10 flex flex-col">
        <TextSkeleton variant="sm" />
        <TextSkeleton variant="sm" className="w-40" />
      </div>
    </div>
  </section>
);

export const ProfileSection = () => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const { data } = useGetMe();

  return (
    <section className="flex flex-col gap-4">
      <div className="absolute -top-[57px] left-5 size-28.5 overflow-hidden rounded-full border-2 border-green-100 bg-green-100">
        {isImageLoading && <Skeleton className="h-full w-full" />}
        <Image
          src={data.profileImage ?? '/common/avatar.png'}
          fill
          alt={`${data.name}의 프로필 이미지`}
          className={`object-cover ${isImageLoading ? 'invisible' : 'visible'}`}
          onLoad={() => setIsImageLoading(false)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <h3 className="text-lg leading-7 font-semibold">{data.name}</h3>
          <span className="flex h-5 items-center rounded-2xl bg-gray-100 px-2.5 text-xs text-gray-600">
            {data.email}
          </span>
        </div>
        <p className="min-h-10 text-sm">{data.description}</p>
      </div>
    </section>
  );
};
