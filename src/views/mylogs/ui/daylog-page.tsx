'use client';

import { useRouter } from 'next/navigation';

import { ROUTES } from '@/shared/config/routes';
import { Button } from '@/shared/ui/button';
import LogsIcon from '@/shared/ui/icons/mylogs/logs.svg';

export const DayLog = ({ formattedDate }: { formattedDate: string }) => {
  const router = useRouter();

  const handleBackToCalendar = () => {
    router.push(ROUTES.MYLOG);
  };

  return (
    <div className="flex h-full w-full flex-col items-center overflow-y-auto bg-green-50 pt-15 pb-10">
      <LogsIcon width={70} />
      <div className="my-8 flex flex-col items-center gap-3">
        <p className="text-2xl font-bold">
          {formattedDate}에 어떤 일이 있었나요?
        </p>
        <p>그날의 기록을 살펴봐요.</p>
      </div>

      <div className="mt-auto w-full px-8">
        <Button
          onClick={handleBackToCalendar}
          variant="secondary"
          type="button"
        >
          목록으로 돌아가기
        </Button>
      </div>
    </div>
  );
};
