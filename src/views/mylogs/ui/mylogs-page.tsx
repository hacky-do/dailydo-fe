'use client';

import {
  addMonths,
  format,
  getDay,
  isAfter,
  isSameMonth,
  startOfMonth,
  subMonths,
} from 'date-fns';
import Link from 'next/link';

import { useGetMyLogs } from '@/entities/mylogs/api/mylogs.queries';
import { useGetMe } from '@/entities/user';
import { Calendar } from '@/features/mylogs';
import { WEEKDAYS } from '@/features/mylogs/lib/calendar.constants';
import ImgHeadImage from '@/shared/ui/icons/common/img_head.svg';
import ArrowLeft from '@/shared/ui/icons/mylogs/arrow_left.svg';
import ArrowRight from '@/shared/ui/icons/mylogs/arrow_right.svg';
import Graph from '@/shared/ui/icons/mylogs/graph.svg';
import LightBulb from '@/shared/ui/icons/mylogs/light-bulb.svg';
import { StatItem, StatList } from '@/shared/ui/stat-item';
import { cn } from '@/shared/utils/cn';

interface MylogsPageProps {
  month: string;
}

export const MylogsPage = ({ month }: MylogsPageProps) => {
  const { data: mylogs } = useGetMyLogs(month);
  const { data: user } = useGetMe();
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
    <div className="flex h-full w-full flex-col">
      <div className="w-full px-4">
        <nav className="flex items-center">
          <Link
            href={`/mylogs?month=${prevMonth}`}
            aria-disabled={isSignupMonth}
            className={cn(isSignupMonth && 'pointer-events-none opacity-50')}
          >
            <ArrowLeft width={24} className="text-white" />
          </Link>
          <h2 className="text-2xl font-semibold text-white">
            {year}년 {monthNum}월
          </h2>
          <Link
            href={`/mylogs?month=${nextMonth}`}
            aria-disabled={isCurrentMonth}
            className={cn(isCurrentMonth && 'pointer-events-none opacity-50')}
          >
            <ArrowRight width={24} className="text-white" />
          </Link>
        </nav>
        <section className="mt-4 mb-5 flex flex-col gap-3">
          <span className="flex w-fit gap-1 rounded-md bg-green-500 px-2 py-1 text-sm font-semibold text-white">
            <Graph width={16} /> {user?.name}님의 {monthNum}월 리포트
          </span>

          <StatList>
            <StatItem
              label="미션 수행일수"
              value={`${logs.length}일`}
              valueClassName="text-green-600"
            />
            <StatItem
              label="미션 완료 횟수"
              value={`${logs.reduce((prev, log) => prev + log.count, 0)}개`}
              valueClassName="text-green-700"
            />
            {/* TODO: 평균 미션 완료율 실제 값으로 수정 */}
            <StatItem
              label="평균 미션 완료율"
              value="0%"
              valueClassName="text-green-500"
            />
          </StatList>

          <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow">
            <ImgHeadImage height={57} />
            <div className="flex flex-col gap-1">
              <p className="text-base font-bold text-gray-900">
                {WEEKDAYS[getDay(new Date())]}요일의 {user?.name}님은...
              </p>
              {/* TODO: 평균 미션 / 완료 미션 개수 실제 값으로 수정 */}
              <p className="text-xs text-gray-700">
                평균 0개의 미션을 받고 0개를 완료해요.
              </p>
            </div>
          </div>
        </section>
      </div>
      <section className="flex w-full flex-1 flex-col gap-2 rounded-t-[40px] bg-white px-5 py-6">
        <Calendar key={month} year={year} month={monthNum} logs={logs} />
        <div className="mt-auto flex items-center gap-1 rounded-2xl bg-gray-100 px-3 py-1.5 text-sm text-gray-700 [@media(max-height:740px)]:hidden">
          <LightBulb width={20} />
          날짜를 눌러서 마이로그를 확인해보세요!
        </div>
      </section>
    </div>
  );
};
