import CountUp from 'react-countup';

import type { DailyCount } from '@/features/mylogs';
import { StatItem, StatItemSkeleton, StatList } from '@/shared/ui/stat-item';

interface MylogsStatsProps {
  logs: DailyCount[];
}

export const MylogsStatsSkeleton = () => (
  <StatList>
    <StatItemSkeleton label="미션 수행일수" />
    <StatItemSkeleton label="미션 완료 횟수" />
    <StatItemSkeleton label="평균 미션 완료율" />
  </StatList>
);

export const MylogsStats = ({ logs }: MylogsStatsProps) => {
  const completedMissions = logs.reduce((prev, log) => prev + log.count, 0);
  const logsWithTotal = logs.filter((log) => log.total > 0);
  const avgCompletionRate =
    logsWithTotal.length > 0
      ? Math.round(
          (logsWithTotal.reduce(
            (prev, log) => prev + log.count / log.total,
            0,
          ) /
            logsWithTotal.length) *
            100,
        )
      : 0;

  return (
    <StatList>
      <StatItem
        label="미션 수행일수"
        value={
          <>
            <CountUp end={logs.length} duration={1.5} />일
          </>
        }
        valueClassName="text-green-600"
      />
      <StatItem
        label="미션 완료 횟수"
        value={
          <>
            <CountUp end={completedMissions} duration={1.5} />개
          </>
        }
        valueClassName="text-green-700"
      />
      <StatItem
        label="평균 미션 완료율"
        value={
          <>
            <CountUp end={avgCompletionRate} duration={1.5} />%
          </>
        }
        valueClassName="text-green-500"
      />
    </StatList>
  );
};
