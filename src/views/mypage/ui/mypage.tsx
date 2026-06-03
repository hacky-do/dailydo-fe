import { Suspense } from 'react';

import { Button } from '@/shared/ui/button';

import {
  CategorySection,
  CategorySectionSkeleton,
} from '../../../features/mypage/ui/category-section';
import {
  MissionStatusSection,
  MissionStatusSectionSkeleton,
} from '../../../features/mypage/ui/mission-status-section';
import {
  MyStatusSection,
  MyStatusSectionSkeleton,
} from '../../../features/mypage/ui/my-status-section';
import {
  ProfileSection,
  ProfileSectionSkeleton,
} from '../../../features/mypage/ui/profile-section';

export const Mypage = () => (
  <div className="relative h-full w-full pt-20">
    <div className="h-full w-full bg-green-100">
      <div className="ml-auto flex w-fit gap-1 px-5 py-4">
        <Button variant="secondary" size="sm">
          프로필 수정
        </Button>
        <Button size="sm">공유하기</Button>
      </div>

      <div className="absolute inset-x-0 top-0 flex flex-col gap-5 p-5">
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
  </div>
);
