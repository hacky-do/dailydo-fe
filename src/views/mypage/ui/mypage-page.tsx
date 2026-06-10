import { Suspense } from 'react';

import {
  CategorySection,
  CategorySectionSkeleton,
  MissionStatusSection,
  MissionStatusSectionSkeleton,
  MyStatusSection,
  MyStatusSectionSkeleton,
  ProfileSection,
  ProfileSectionSkeleton,
} from '@/features/mypage';
import { Button } from '@/shared/ui/button';

const MypageSkeleton = () => (
  <>
    <ProfileSectionSkeleton />
    <div className="flex flex-col gap-6">
      <MissionStatusSectionSkeleton />
      <MyStatusSectionSkeleton />
      <CategorySectionSkeleton />
    </div>
  </>
);

export const Mypage = () => (
  <div className="h-full w-full pt-20">
    <div className="relative h-full w-full bg-green-100">
      <div className="ml-auto flex w-fit gap-1 px-5 pt-4">
        <Button variant="secondary" size="sm">
          프로필 수정
        </Button>
        <Button size="sm">공유하기</Button>
      </div>

      <div className="inset-x-0 top-0 flex flex-col gap-5 p-5">
        <Suspense fallback={<MypageSkeleton />}>
          <ProfileSection />
          <div className="flex flex-col gap-6">
            <MissionStatusSection />
            <MyStatusSection />
            <CategorySection />
          </div>
        </Suspense>
      </div>
    </div>
  </div>
);
