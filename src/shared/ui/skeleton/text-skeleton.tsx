import { cn } from '../../utils/cn';

type TextSkeletonVariant = 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';

const variantHeight: Record<TextSkeletonVariant, string> = {
  sm: '1.25rem',
  base: '1.5rem',
  lg: '1.75rem',
  xl: '1.75rem',
  '2xl': '2rem',
  '3xl': '2.25rem',
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
    style={{ height: variantHeight[variant] }}
  />
);
