'use client';

import CountUp from 'react-countup';

import type { User } from '@/entities/user';
import { StatItem, StatItemSkeleton, StatList } from '@/shared/ui/stat-item';

import { daysSince } from '../lib/days-since';
import { sectionLabelClass } from './mypage.styles';

export const MyStatusSectionSkeleton = () => (
  <section className="flex flex-col gap-2">
    <h4 className={sectionLabelClass}>나의 발자국</h4>
    <StatList>
      <StatItemSkeleton label="만난 지" />
      <StatItemSkeleton label="최대 연속 사용일" />
      <StatItemSkeleton label="완료한 미션" />
    </StatList>
  </section>
);

interface MyStatusSectionProps {
  footprint: User['footprint'];
  createdAt: string;
}

export const MyStatusSection = ({
  footprint,
  createdAt,
}: MyStatusSectionProps) => {
  const { maxConsecutiveUseDays, completedMissionCount } = footprint;

  return (
    <section className="flex flex-col gap-2">
      <h4 className={sectionLabelClass}>나의 발자국</h4>
      <StatList>
        <StatItem
          label="만난 지"
          value={
            <>
              D+
              <CountUp end={daysSince(createdAt)} duration={1.5} />
            </>
          }
          valueClassName="text-green-500"
        />
        <StatItem
          label="최대 연속 사용일"
          value={
            <>
              <CountUp end={maxConsecutiveUseDays} duration={1.5} />일
            </>
          }
          valueClassName="text-green-600"
        />
        <StatItem
          label="완료한 미션"
          value={
            <>
              <CountUp end={completedMissionCount} duration={1.5} />개
            </>
          }
          valueClassName="text-green-700"
        />
      </StatList>
    </section>
  );
};
