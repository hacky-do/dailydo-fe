import { ReactNode } from 'react';

import { cn } from '@/shared/utils/cn';

interface SectionHeadingProps {
  label: string;
  title: ReactNode;
  description: ReactNode;
  align?: 'center' | 'left';
}

export const SectionHeading = ({
  label,
  title,
  description,
  align = 'center',
}: SectionHeadingProps) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-3',
        align === 'center'
          ? 'items-center text-center'
          : 'items-start text-left',
      )}
    >
      <p className="text-sm font-semibold tracking-tight text-green-600">
        {label}
      </p>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold tracking-tight text-gray-800">
          {title}
        </h2>
        <p className="text-base font-medium tracking-tight text-gray-600">
          {description}
        </p>
      </div>
    </div>
  );
};
