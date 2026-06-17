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
}

export const MylogsUserCard = ({ userName, month }: MylogsUserCardProps) => (
  <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow">
    <ImgHeadImage height={57} aria-hidden />
    <div className="flex flex-col gap-1">
      <p className="text-base font-bold text-gray-900">
        {month}월의 {userName}님은...
      </p>
      {/* TODO: 평균 미션 / 완료 미션 개수 실제 값으로 수정 */}
      <p className="text-xs text-gray-700">
        평균 0개의 미션을 받고 0개를 완료해요.
      </p>
    </div>
  </div>
);
