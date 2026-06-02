import { cn } from '../../utils/cn';

type TextSkeletonVariant = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';

// 각 텍스트 사이즈의 line-height 여백과 높이를 맞추기 위한 값
const variantStyle: Record<
  TextSkeletonVariant,
  { height: string; marginBlock: string }
> = {
  xs: { height: '0.75rem', marginBlock: '0.125rem' },
  sm: { height: '0.875rem', marginBlock: '0.1875rem' },
  base: { height: '1rem', marginBlock: '0.25rem' },
  lg: { height: '1.125rem', marginBlock: '0.3125rem' },
  xl: { height: '1.25rem', marginBlock: '0.25rem' },
  '2xl': { height: '1.5rem', marginBlock: '0.25rem' },
  '3xl': { height: '1.875rem', marginBlock: '0.1875rem' },
};

interface TextSkeletonProps {
  className?: string;
  variant?: TextSkeletonVariant;
}

export const TextSkeleton = ({
  className,
  variant = 'base',
}: TextSkeletonProps) => (
  <span
    aria-hidden="true"
    className={cn(
      'bg-skeleton animate-shimmer inline-block w-full rounded-2xl',
      className,
    )}
    style={variantStyle[variant]}
  />
);
