import { Suspense } from 'react';

import { Button } from '@/shared/ui/button';

import { CategorySection, CategorySectionSkeleton } from './category-section';
import {
  MissionStatusSection,
  MissionStatusSectionSkeleton,
} from './mission-status-section';
import { MyStatusSection, MyStatusSectionSkeleton } from './my-status-section';
import { ProfileSection, ProfileSectionSkeleton } from './profile-section';

export const Mypage = () => (
  <div className="relative h-screen w-full bg-green-100">
    <div className="absolute inset-x-0 top-0">
      <div className="bg-gradient-500 h-20 [--gradient-dir:to_right]" />
      <div className="ml-auto flex w-fit gap-1 px-5 py-4">
        <Button variant="secondary" size="sm">
          프로필 수정
        </Button>
        <Button size="sm">공유하기</Button>
      </div>
    </div>

    <div className="flex flex-col gap-6 p-5">
      <Suspense fallback={<ProfileSectionSkeleton />}>
        <ProfileSection />
      </Suspense>
      <div className="flex flex-col gap-6">
        <Suspense fallback={<MissionStatusSectionSkeleton />}>
          <MissionStatusSection />
        </Suspense>
        <Suspense fallback={<MyStatusSectionSkeleton />}>
          <MyStatusSection />
        </Suspense>
        <Suspense fallback={<CategorySectionSkeleton />}>
          <CategorySection />
        </Suspense>
      </div>
    </div>
  </div>
);
