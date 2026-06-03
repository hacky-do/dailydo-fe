'use client';

import { TextSkeleton } from '@/shared/ui/skeleton';

import { sectionLabelClass } from './mypage.styles';

const myStatus = {
  joinedAt: '2026-03-03',
  streakCount: 20,
  completedCount: 537,
};

interface StatusItemProps {
  label: string;
  value: string;
  valueClassName?: string;
}

const getDaysElapsed = (joinedAt: string) =>
  Math.floor(
    (Date.now() - new Date(joinedAt).getTime()) / (1000 * 60 * 60 * 24),
  );

const StatusItemSkeleton = ({ label }: { label: string }) => (
  <li className="flex flex-1 flex-col items-center justify-center gap-2 px-1.5">
    <div className="text-sm">{label}</div>
    <TextSkeleton variant="2xl" className="w-15" />
  </li>
);

export const MyStatusSectionSkeleton = () => (
  <section className="flex flex-col gap-2">
    <h4 className={sectionLabelClass}>나의 발자국</h4>
    <ul className="flex divide-x divide-gray-100 rounded-2xl bg-white py-3 shadow">
      <StatusItemSkeleton label="만난 지" />
      <StatusItemSkeleton label="최대 연속 사용일" />
      <StatusItemSkeleton label="완료한 미션" />
    </ul>
  </section>
);

const StatusItem = ({ label, value, valueClassName }: StatusItemProps) => (
  <li className="flex flex-1 flex-col items-center justify-center gap-2 px-1.5">
    <div className="text-sm">{label}</div>
    <div className={`text-2xl font-bold ${valueClassName}`}>{value}</div>
  </li>
);

export const MyStatusSection = () => {
  // TODO: 나의 발자국 정보 호출

  return (
    <section className="flex flex-col gap-2">
      <h4 className={sectionLabelClass}>나의 발자국</h4>
      <ul className="flex divide-x divide-gray-100 rounded-2xl bg-white py-3 shadow">
        <StatusItem
          label="만난 지"
          value={`D+${getDaysElapsed(myStatus.joinedAt)}`}
          valueClassName="text-green-500"
        />
        <StatusItem
          label="최대 연속 사용일"
          value={`${myStatus.streakCount}일`}
          valueClassName="text-green-600"
        />
        <StatusItem
          label="완료한 미션"
          value={`${myStatus.completedCount}개`}
          valueClassName="text-green-700"
        />
      </ul>
    </section>
  );
};
