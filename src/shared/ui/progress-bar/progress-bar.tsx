'use client';

import { useEffect, useState } from 'react';

import { cn } from '../../utils/cn';

interface ProgressBarProps {
  value: number; // 0~1
  className?: string;
}

export const ProgressBar = ({ value, className }: ProgressBarProps) => {
  const clampedValue = Math.min(1, Math.max(0, value));
  const [width, setWidth] = useState(0);

  // CSS transition이 초기 렌더와 합쳐져 스킵되지 않도록 다음 프레임으로 지연
  useEffect(() => {
    const id = requestAnimationFrame(() => setWidth(clampedValue * 100));
    return () => cancelAnimationFrame(id);
  }, [clampedValue]);

  return (
    <div
      className={cn(
        'h-1.5 w-full overflow-hidden rounded-full bg-gray-100',
        className,
      )}
      role="progressbar"
      aria-valuenow={Math.round(clampedValue * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="bg-gradient-500 h-full rounded-full transition-[width] duration-500 ease-out [--gradient-dir:to_right]"
        style={{ width: `${width}%` }}
      />
    </div>
  );
};
