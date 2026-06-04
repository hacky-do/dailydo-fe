'use client';

import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  startOfMonth,
} from 'date-fns';
import Link from 'next/link';

import type { DailyCount } from '@/features/mylogs/model/mylogs.types';
import { cn } from '@/shared/utils/cn';

const WEEKDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

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

interface CalendarProps {
  month: Date;
  logs?: DailyCount[];
}

export const Calendar = ({ month, logs = [] }: CalendarProps) => {
  const firstDay = startOfMonth(month);
  const days = eachDayOfInterval({ start: firstDay, end: endOfMonth(month) });

  // date -> count 조회용 맵
  const countByDate = Object.fromEntries(
    logs.map(({ date, count }) => [date, count]),
  );

  return (
    <div className="w-full">
      <h2 className="mb-5 text-4xl text-gray-600">{format(month, 'M')}</h2>
      <ul className="mb-4 grid grid-cols-7 text-center">
        {WEEKDAYS.map((day) => (
          <li key={day}>
            <span className="bg-[#ffe5e5] px-1 text-sm font-semibold text-gray-500">
              {day}
            </span>
          </li>
        ))}
      </ul>

      <div className="grid grid-cols-7">
        {days.map((day, index) => {
          const dateStr = format(day, 'yyyy-MM-dd');
          const count = countByDate[dateStr];

          return (
            <Link
              key={dateStr}
              href={`?date=${dateStr}`}
              prefetch={false}
              className={cn(
                'flex aspect-square items-center justify-center text-xl',
                count === undefined ? 'text-gray-600' : COUNT_BG_COLORS[count],
                index === 0 && COL_START_CLASSES[getDay(firstDay) + 1],
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
