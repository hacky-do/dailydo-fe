import { cn } from '../../utils/cn';

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className }: SkeletonProps) => (
  <div
    className={cn(
      'h-10 w-full animate-pulse rounded-2xl bg-gray-200',
      className,
    )}
  />
);
