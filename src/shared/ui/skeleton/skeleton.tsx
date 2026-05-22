import { cn } from '../../utils/cn';

type SkeletonVariant = 'sm' | 'lg';

const variantSize: Record<SkeletonVariant, string> = {
  sm: 'size-[30px] rounded-lg',
  lg: 'size-15 rounded-xl',
};

interface SkeletonProps {
  className?: string;
  variant?: SkeletonVariant;
}

export const Skeleton = ({ className, variant = 'lg' }: SkeletonProps) => (
  <span
    aria-hidden="true"
    className={cn(
      'bg-skeleton inline-block animate-pulse',
      variantSize[variant],
      className,
    )}
  />
);
