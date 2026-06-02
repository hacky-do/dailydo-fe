'use client';

import Image from 'next/image';
import { useState } from 'react';

import { Skeleton, TextSkeleton } from '@/shared/ui/skeleton';

interface Profile {
  nickname: string;
  bio: string;
  avatarUrl: string;
}

const profile: Profile = {
  nickname: '닉네임은여덟글자',
  bio: '슬퍼하는 불현듯 꽃잎을 노래, 있으랴 실어 연인들의 별이 다시는 바다로 노래는 향해 좋아요',
  avatarUrl: '/common/avatar.png',
};

export const ProfileSectionSkeleton = () => (
  <section className="flex flex-col gap-4">
    <div className="min-h-9.5">
      <div className="relative size-28.5 overflow-hidden rounded-full border-2 border-green-100">
        <Skeleton className="h-full w-full" />
      </div>
    </div>
    <div className="flex flex-col gap-1">
      <TextSkeleton variant="lg" className="w-35" />
      <div className="flex flex-col">
        <TextSkeleton variant="sm" />
        <TextSkeleton variant="sm" className="w-40" />
      </div>
    </div>
  </section>
);

export const ProfileSection = () => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  // TODO: 프로필 정보 호출

  return (
    <section className="flex flex-col gap-4">
      <div className="min-h-9.5">
        <div className="relative size-28.5 overflow-hidden rounded-full border-2 border-green-100">
          {isImageLoading && <Skeleton className="h-full w-full" />}
          <Image
            src={profile.avatarUrl}
            fill
            alt={`${profile.nickname}의 프로필 이미지`}
            className={`object-cover ${isImageLoading ? 'invisible' : 'visible'}`}
            onLoad={() => setIsImageLoading(false)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-lg leading-7 font-semibold">{profile.nickname}</h3>
        <p className="text-sm">{profile.bio}</p>
      </div>
    </section>
  );
};
