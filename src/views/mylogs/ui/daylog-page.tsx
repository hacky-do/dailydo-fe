'use client';

import { addDays, format, startOfWeek } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useState } from 'react';

import { useGetMyLogs, WEEKDAYS } from '@/features/mylogs';
import { cn } from '@/shared/utils/cn';
import { DaylogCards } from '@/widgets/mylogs';

const getDayTextColor = (index: number) => {
  if (index === 0) return 'text-red-500';
  if (index === 6) return 'text-blue-600';
  return 'text-gray-900';
};

interface DaylogPageProps {
  initialDate: string;
}

export const DaylogPage = ({ initialDate }: DaylogPageProps) => {
  // 첫 진입시에만 쿼리 파라미터 날짜 세팅 후 내부에서 날짜 이동은 상태로 관리
  const [date, setDate] = useState(initialDate);

  const month = date.slice(0, 7);
  const { data: mylogs, isPending } = useGetMyLogs(month);

  const logDates = new Set(
    isPending ? [] : mylogs?.filter((l) => l.count > 0).map((l) => l.date),
  );

  const selectedDate = new Date(date);
  const formattedDate = format(selectedDate, 'yyyy년 M월 d일 EEEE', {
    locale: ko,
  });
  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 0 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const selectedIndex = weekDays.findIndex(
    (day) => format(day, 'yyyy-MM-dd') === date,
  );

  return (
    <div className="flex h-full flex-col gap-8">
      <section className="flex flex-col gap-4 px-4">
        <h2 className="text-2xl font-semibold text-white">{formattedDate}</h2>

        <div className="relative rounded-2xl bg-white px-3 py-2">
          <span
            aria-hidden
            className="pointer-events-none absolute top-2 bottom-2 rounded-lg bg-gray-50 transition-transform duration-300 ease-in-out"
            // 선택된 날짜 슬라이딩 인디케이터
            // width를 px-3 패딩 제외 후 7등분해야 translateX(100%) 단위 이동이 정확히 1칸과 일치
            style={{
              width: `calc((100% - 1.5rem) / 7)`,
              left: '0.75rem',
              transform: `translateX(calc(${selectedIndex} * 100%))`,
            }}
          />
          <ul className="relative flex flex-row justify-center">
            {weekDays.map((day, i) => {
              const dayStr = format(day, 'yyyy-MM-dd');
              const hasLog = logDates.has(dayStr);
              const itemClassName = cn(
                'flex flex-1 flex-col items-center gap-3 rounded-lg p-2',
                !hasLog && 'opacity-50',
              );
              const content = (
                <>
                  <span
                    className={cn('text-sm font-medium', getDayTextColor(i))}
                  >
                    {WEEKDAYS[i]}
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {format(day, 'd')}
                  </span>
                </>
              );

              return (
                <li key={dayStr} className="flex flex-1">
                  {hasLog ? (
                    <button
                      className={itemClassName}
                      onClick={() => setDate(dayStr)}
                    >
                      {content}
                    </button>
                  ) : (
                    <div className={itemClassName}>{content}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <section className="flex-1 rounded-t-[40px] bg-white pt-4 pb-1">
        <DaylogCards date={date} />
      </section>
    </div>
  );
};
