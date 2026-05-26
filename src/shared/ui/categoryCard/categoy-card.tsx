'use client';

import { ComponentProps } from 'react';
import Image from 'next/image';

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
      htmlFor={id}
      className={cn(
        'flex aspect-square flex-1 cursor-pointer flex-col items-center justify-center rounded-2xl bg-slate-50 p-4 shadow transition-all',
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
      <div className="relative size-20">
        <Image
          src={image}
          alt=""
          aria-hidden="true"
          fill
          className="object-contain"
        />
      </div>
      <span className="text-sm font-medium text-gray-800">{label}</span>
    </label>
  );
};
