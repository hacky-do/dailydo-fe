import Image from 'next/image';
import { useState } from 'react';

import { UnderlineButton } from '@/shared/ui/button';
import { Skeleton } from '@/shared/ui/skeleton';
import { useToast } from '@/shared/ui/toast';

import { usePatchDaylog } from '../api/daylog.queries';
import { formatDaylogTime } from '../lib/daylog.utils';
import type { DayLogRecord } from '../model/daylog.types';
import { CompletedBadge } from './completed-badge';
import { MyLogBottomSheet } from './mylog-bottom-sheet';

interface DaylogCardProps {
  record: DayLogRecord;
  date: string;
}

export const DaylogCard = ({ record, date }: DaylogCardProps) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { mutate: patchDaylog, isPending } = usePatchDaylog(date);
  const { toast } = useToast();

  const handleEditSubmit = (photo: string | null, memo: string) => {
    patchDaylog(
      { id: record.id, photo, memo },
      {
        onSuccess: () => {
          toast({ message: '로그를 수정했어요.', type: 'success' });
          setIsEditOpen(false);
        },
        onError: () =>
          toast({
            message: '로그 수정에 실패했어요. 다시 시도해주세요.',
            type: 'error',
          }),
      },
    );
  };

  return (
    <article className="flex flex-col gap-2">
      <MyLogBottomSheet
        open={isEditOpen}
        setOpen={setIsEditOpen}
        onSubmit={handleEditSubmit}
        isPending={isPending}
        initialPhoto={record.photo}
        initialMemo={record.memo}
        title="마이로그 수정"
      />
      <span className="w-fit rounded-2xl bg-gray-100 px-2 py-1 text-xs text-gray-600">
        {record.categoryName}
      </span>
      <div className="flex justify-between">
        <h3 className="text-lg font-bold">{record.title}</h3>
        <UnderlineButton color="tertiary" onClick={() => setIsEditOpen(true)}>
          수정
        </UnderlineButton>
      </div>
      <div className="flex gap-2">
        <CompletedBadge count={record.completedCount} />
        <span className="flex items-center rounded-md border border-gray-200 px-1 py-0.5 text-xs text-gray-600">
          {formatDaylogTime(record.createdAt)}
        </span>
      </div>
      {record.photo && (
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl">
          {isImageLoading && <Skeleton className="h-full w-full" />}
          <Image
            src={record.photo}
            alt={record.title}
            fill
            sizes="480px"
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
