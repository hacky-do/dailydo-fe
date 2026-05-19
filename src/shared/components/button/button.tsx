'use client';

import { ComponentProps, ReactNode } from 'react';

import { cn } from '../../utils/cn';
import { Loader } from '../loader/loader';

const loaderVariantMap = {
  primary: 'secondary',
  secondary: 'primary',
  outlined: 'ghost',
  ghost: 'ghost',
} as const;

interface ButtonProps extends ComponentProps<'button'> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outlined' | 'ghost';
  size?: 'sm' | 'lg';
  isLoading?: boolean;
  className?: string;
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'lg',
  isLoading = false,
  disabled,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        'relative rounded-xl font-semibold',
        {
          'h-12 w-full text-base': size === 'lg',
          'h-10 w-fit px-4 text-sm': size === 'sm',
        },
        !disabled && {
          'bg-green-500 text-white': variant === 'primary',
          'border border-green-500 bg-white text-green-600':
            variant === 'secondary',
          'border border-gray-200 bg-white text-gray-600':
            variant === 'outlined',
          'bg-gray-100 text-gray-600': variant === 'ghost',
        },
        disabled && 'bg-gray-100 text-gray-600',
        className,
      )}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...props}
    >
      <span className={cn(isLoading && 'invisible')}>{children}</span>
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Loader variant={loaderVariantMap[variant]} size={size} />
        </span>
      )}
    </button>
  );
};
