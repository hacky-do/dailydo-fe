'use client';

import {
  addMonths,
  format,
  isAfter,
  isSameMonth,
  startOfMonth,
  subMonths,
} from 'date-fns';
import { motion } from 'framer-motion';
import Link from 'next/link';

import { useGetMe } from '@/entities/user';
import { Calendar } from '@/features/mylogs';
import { useGetMyLogs } from '@/features/mylogs/api/mylogs.queries';
import ArrowLeft from '@/shared/ui/icons/mylogs/arrow_left.svg';
import ArrowRight from '@/shared/ui/icons/mylogs/arrow_right.svg';
import Graph from '@/shared/ui/icons/mylogs/graph.svg';
import LightBulb from '@/shared/ui/icons/mylogs/light-bulb.svg';
import { cn } from '@/shared/utils/cn';
import {
  MylogsStats,
  MylogsStatsSkeleton,
  MylogsUserCard,
  MylogsUserCardSkeleton,
} from '@/widgets/mylogs';

interface MylogsPageProps {
  month: string;
}

export const MylogsPage = ({ month }: MylogsPageProps) => {
  const {
    data: mylogs,
    isSuccess: mylogsReady,
    isPending: mylogsLoading,
  } = useGetMyLogs(month);
  const { data: user, isPending: userLoading } = useGetMe();

  const [year, monthNum] = month.split('-').map(Number);

  const currentDate = new Date(year, monthNum - 1);
  const prevMonth = format(subMonths(currentDate, 1), 'yyyy-MM');
  const nextMonth = format(addMonths(currentDate, 1), 'yyyy-MM');
  const isCurrentMonth = isSameMonth(currentDate, new Date());
  const isSignupMonth = user?.createdAt
    ? !isAfter(currentDate, startOfMonth(new Date(user.createdAt)))
    : false;

  const logs = mylogs?.records[0]?.logs ?? [];

  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      <div className="w-full px-4">
        <nav aria-label="월 탐색" className="flex items-center">
          <Link
            href={`/mylogs?month=${prevMonth}`}
            aria-label="이전 달로 이동"
            aria-disabled={isSignupMonth || userLoading}
            className={cn(isSignupMonth && 'pointer-events-none opacity-50')}
          >
            <ArrowLeft width={24} className="text-white" aria-hidden />
          </Link>
          <h2 className="text-2xl font-semibold text-white">
            {year}년 {monthNum}월
          </h2>
          <Link
            href={`/mylogs?month=${nextMonth}`}
            aria-label="다음 달로 이동"
            aria-disabled={isCurrentMonth || userLoading}
            className={cn(isCurrentMonth && 'pointer-events-none opacity-50')}
          >
            <ArrowRight width={24} className="text-white" aria-hidden />
          </Link>
        </nav>
        <section
          className="mt-4 mb-5 flex flex-col gap-3"
          aria-label="사용자 리포트"
        >
          {/* 리포트 뱃지 */}
          <span className="flex w-fit gap-1 rounded-md bg-green-500 px-2 py-1 text-sm font-semibold text-white">
            <Graph width={16} aria-hidden /> {monthNum}월 리포트
          </span>

          {/* 통계 */}
          {mylogsLoading ? (
            <MylogsStatsSkeleton />
          ) : (
            <MylogsStats logs={logs} />
          )}

          {/* 평균 확정/완료한 미션 */}
          {userLoading || mylogsLoading || !user ? (
            <MylogsUserCardSkeleton />
          ) : (
            <MylogsUserCard userName={user.name} month={monthNum} />
          )}
        </section>
      </div>

      {/* 달력 섹션 */}
      <motion.section
        initial={{ y: '100%' }}
        animate={mylogsReady ? { y: 0 } : { y: '100%' }}
        transition={{
          type: 'spring',
          damping: 28,
          stiffness: 260,
          delay: 0.08,
        }}
        className="flex w-full flex-1 flex-col gap-2 rounded-t-[40px] bg-white px-5 py-6"
      >
        <Calendar key={month} year={year} month={monthNum} logs={logs} />
        <div className="mt-auto flex items-center gap-1 rounded-2xl bg-gray-100 px-3 py-1.5 text-sm text-gray-700 [@media(max-height:740px)]:hidden">
          <LightBulb width={20} aria-hidden />
          날짜를 눌러서 마이로그를 확인해보세요!
        </div>
      </motion.section>
    </div>
  );
};
