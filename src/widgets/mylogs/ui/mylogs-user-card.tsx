import type { DailyCount } from '@/features/mylogs';
import ImgHeadImage from '@/shared/ui/icons/common/img_head.svg';
import { TextSkeleton } from '@/shared/ui/skeleton';

export const MylogsUserCardSkeleton = () => (
  <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow">
    <ImgHeadImage height={57} aria-hidden />
    <div className="flex flex-col gap-1">
      <TextSkeleton variant="base" className="w-45" />
      <TextSkeleton variant="xs" className="w-50" />
    </div>
  </div>
);

interface MylogsUserCardProps {
  userName: string;
  month: number;
  logs: DailyCount[];
}

export const MylogsUserCard = ({
  userName,
  month,
  logs,
}: MylogsUserCardProps) => {
  const avgTotal = logs.length
    ? Math.round(logs.reduce((acc, log) => acc + log.total, 0) / logs.length)
    : 0;
  const avgCount = logs.length
    ? Math.round(logs.reduce((acc, log) => acc + log.count, 0) / logs.length)
    : 0;

  return (
    <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow">
      <ImgHeadImage height={57} aria-hidden />
      <div className="flex flex-col gap-1">
        <p className="text-base font-bold text-gray-900">
          {month}월의 {userName}님은...
        </p>
        <p className="text-xs text-gray-700">
          평균 {avgTotal}개의 미션을 받고 {avgCount}개를 완료해요.
        </p>
      </div>
    </div>
  );
};
