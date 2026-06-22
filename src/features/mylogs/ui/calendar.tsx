'use client';

import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isToday,
  startOfMonth,
} from 'date-fns';
import Link from 'next/link';

import { ROUTES } from '@/shared/config/routes';
import { cn } from '@/shared/utils/cn';

import { WEEKDAYS } from '../lib/calendar.constants';
import type { DailyCount } from '../model/mylogs.types';

const COL_START_CLASSES = [
  '',
  'col-start-1',
  'col-start-2',
  'col-start-3',
  'col-start-4',
  'col-start-5',
  'col-start-6',
  'col-start-7',
] as const;

const COUNT_BG_COLORS = [
  '',
  'bg-green-100',
  'bg-green-200',
  'bg-green-300',
  'bg-green-400',
  'bg-green-500',
] as const;

function getCountBgColor(count: number) {
  return COUNT_BG_COLORS[Math.min(count, COUNT_BG_COLORS.length - 1)];
}

interface CalendarProps {
  year: number;
  month: number;
  logs?: DailyCount[];
}

export const Calendar = ({ year, month, logs = [] }: CalendarProps) => {
  const firstDay = startOfMonth(new Date(year, month - 1));
  const days = eachDayOfInterval({
    start: firstDay,
    end: endOfMonth(firstDay),
  });

  const countByDate = Object.fromEntries(
    logs.map(({ date, count }) => [date, count]),
  );

  return (
    <div className="w-full">
      <ul className="mb-4 grid grid-cols-7 text-center">
        {WEEKDAYS.map((day) => (
          <li key={day}>
            <span
              className={`px-1 text-sm font-semibold ${
                day === '일'
                  ? 'text-red-500'
                  : day === '토'
                    ? 'text-blue-600'
                    : 'text-gray-500'
              }`}
            >
              {day}
            </span>
          </li>
        ))}
      </ul>

      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => {
          const dateStr = format(day, 'yyyy-MM-dd');
          const count = countByDate[dateStr];
          const baseClassName = cn(
            'flex aspect-square items-center justify-center text-xl rounded-lg hover:brightness-105',
            index === 0 && COL_START_CLASSES[getDay(firstDay) + 1],
          );

          // 데이터 없는 날짜는 Link가 아닌 div
          if (!count) {
            return (
              <div
                key={dateStr}
                className={cn(
                  baseClassName,
                  'text-gray-600',
                  isToday(day) && 'border-2 border-green-500',
                )}
              >
                {format(day, 'd')}
              </div>
            );
          }

          return (
            <Link
              key={dateStr}
              href={`${ROUTES.MYLOG_DETAIL}?date=${dateStr}`}
              prefetch={false}
              aria-label={`${format(day, 'yyyy년 M월 d일')}, 완료 ${count}개`}
              className={cn(
                baseClassName,
                !isToday(day) && getCountBgColor(count),
                isToday(day) && 'border-2 border-green-500',
              )}
            >
              {format(day, 'd')}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
