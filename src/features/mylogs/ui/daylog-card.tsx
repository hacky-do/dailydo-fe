import Image from 'next/image';
import { useState } from 'react';

import { UnderlineButton } from '@/shared/ui/button';
import { Skeleton } from '@/shared/ui/skeleton';

import { formatDaylogTime } from '../lib/daylog.utils';
import type { DayLogRecord } from '../model/daylog.types';
import { CompletedBadge } from './completed-badge';

interface DaylogCardProps {
  record: DayLogRecord;
}

export const DaylogCard = ({ record }: DaylogCardProps) => {
  const [isImageLoading, setIsImageLoading] = useState(true);

  return (
    <article className="flex flex-col gap-2">
      <span className="w-fit rounded-2xl bg-gray-100 px-2 py-1 text-xs text-gray-600">
        {record.categoryName}
      </span>
      <div className="flex justify-between">
        <h3 className="text-lg font-bold">{record.title}</h3>
        {/* TODO: 마이로그 수정 기능 구현 */}
        <UnderlineButton color="tertiary" disabled>
          수정
        </UnderlineButton>
      </div>
      <ul className="flex gap-2">
        <li>
          <CompletedBadge count={record.completedCount} />
        </li>
        <li className="flex items-center rounded-md border border-gray-200 px-1 py-0.5 text-xs text-gray-600">
          {formatDaylogTime(record.createdAt)}
        </li>
      </ul>
      {record.photo && (
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl">
          {isImageLoading && <Skeleton className="h-full w-full" />}
          <Image
            src={record.photo}
            alt={record.title}
            fill
            className={`object-cover ${isImageLoading ? 'invisible' : 'visible'}`}
            onLoad={() => setIsImageLoading(false)}
            onError={() => setIsImageLoading(false)}
          />
        </div>
      )}
      {record.memo && <p className="text-sm">{record.memo}</p>}
    </article>
  );
};
