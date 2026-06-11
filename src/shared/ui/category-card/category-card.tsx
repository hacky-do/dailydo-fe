'use client';

import Image from 'next/image';
import { ComponentProps } from 'react';

import { cn } from '@/shared/utils/cn';

interface CategoryCardProps extends Omit<
  ComponentProps<'input'>,
  'type' | 'className'
> {
  label: string;
  image: string;
  id: string;
}

export const CategoryCard = ({
  label,
  image,
  id,
  checked,
  ...props
}: CategoryCardProps) => {
  return (
    <label
      className={cn(
        'flex h-40 max-h-[15vh] min-h-30 flex-1 cursor-pointer flex-col items-center justify-center rounded-2xl bg-slate-50 p-4 shadow transition-all',
        checked
          ? 'border-2 border-green-500 bg-white'
          : 'border-2 border-transparent',
      )}
    >
      <input
        type="checkbox"
        id={id}
        checked={checked}
        className="sr-only"
        {...props}
      />
      <div className="relative h-full w-full">
        {image && (
          <Image
            src={image}
            alt=""
            aria-hidden="true"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 70vw"
          />
        )}
      </div>
      <span className="text-sm font-medium text-gray-800">{label}</span>
    </label>
  );
};
