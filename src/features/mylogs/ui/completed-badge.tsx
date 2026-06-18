import Sparkle from '@/shared/ui/icons/mylogs/sparkle.svg';
import { cn } from '@/shared/utils/cn';

const KOREAN_ORDINALS = [
  '첫',
  '두',
  '세',
  '네',
  '다섯',
  '여섯',
  '일곱',
  '여덟',
  '아홉',
  '열',
];

const BADGE_STYLES: Record<number, { bg: string; iconColor: string }> = {
  1: { bg: '#FF741833', iconColor: '#DB6F3D' },
  2: { bg: '#BDD0F2', iconColor: '#7384A4' },
  3: { bg: '#FFEDA7', iconColor: '#D3A20F' },
};

// 항상 1 이상의 값만 전달됨
const getCountLabel = (count: number) => {
  if (count <= 10) return `${KOREAN_ORDINALS[count - 1]} 번째 완료`;
  return `${count}번째 완료`;
};

interface CompletedBadgeProps {
  count: number;
}

export const CompletedBadge = ({ count }: CompletedBadgeProps) => {
  const custom = BADGE_STYLES[count];

  return (
    <span
      className={cn(
        'flex items-center rounded-md px-1 py-0.5 text-xs font-semibold',
        !custom && 'bg-green-400 text-green-700',
      )}
      style={
        custom
          ? { backgroundColor: custom.bg, color: custom.iconColor }
          : undefined
      }
    >
      <Sparkle width={20} />
      {getCountLabel(count)}
    </span>
  );
};
