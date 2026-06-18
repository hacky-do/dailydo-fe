'use client';

import { DaylogCard, useGetDaylog } from '@/features/mylogs';
import { EmptyState } from '@/shared/ui/empty-state';
import { FallbackUI } from '@/shared/ui/fallback-ui';
import { Loader } from '@/shared/ui/loader';

interface DaylogCardsProps {
  date: string;
}

export const DaylogCards = ({ date }: DaylogCardsProps) => {
  const { data: records, isPending, isError, refetch } = useGetDaylog(date);

  if (isError)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <FallbackUI onReset={refetch} />
      </div>
    );

  if (!records || isPending)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader />
      </div>
    );

  if (records?.length === 0)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <EmptyState />
      </div>
    );

  return (
    <ul className="is-animating is-animating-vertical divide-y-8 divide-gray-50">
      {records.map((record) => (
        <li key={record.id} className="p-6">
          <DaylogCard record={record} />
        </li>
      ))}
    </ul>
  );
};
