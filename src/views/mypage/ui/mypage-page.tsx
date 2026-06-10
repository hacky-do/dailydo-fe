'use client';

import { useGetMe } from '@/entities/user';
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
import { FallbackUI } from '@/shared/ui/fallback-ui';

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

export const Mypage = () => {
  const { data, isPending, isError, refetch } = useGetMe();

  return (
    <div className="h-full w-full pt-20">
      <div className="relative h-full w-full bg-green-100">
        {isError ? (
          <FallbackUI onReset={refetch} />
        ) : (
          <>
            <div className="ml-auto flex w-fit gap-1 px-5 pt-4">
              <Button variant="secondary" size="sm">
                프로필 수정
              </Button>
              <Button size="sm">공유하기</Button>
            </div>

            <div className="inset-x-0 top-0 flex flex-col gap-5 p-5">
              {isPending || !data ? (
                <MypageSkeleton />
              ) : (
                <>
                  <ProfileSection
                    profileImage={data.profileImage}
                    name={data.name}
                    email={data.email}
                    description={data.description}
                  />
                  <div className="flex flex-col gap-6">
                    <MissionStatusSection
                      todayMissionCompletion={data.todayMissionCompletion}
                    />
                    <MyStatusSection footprint={data.footprint} />
                    <CategorySection categories={data.categories} />
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
