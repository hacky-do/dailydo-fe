'use client';

import { ComponentProps, ReactNode } from 'react';

import { cn } from '../utils/cn';
import { Loader } from './loader';

const loaderVariantMap = {
  primary: 'secondary',
  secondary: 'primary',
  outlined: 'ghost',
  ghost: 'ghost',
} as const;

interface ButtonProps extends ComponentProps<'button'> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outlined' | 'ghost';
  isLoading?: boolean;
  className?: string;
}

export const Button = ({
  children,
  variant = 'primary',
  isLoading = false,
  disabled,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        'h-12 w-full rounded-xl text-base font-semibold',
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
      {isLoading ? (
        <>
          <span className="sr-only">{children}</span>
          <Loader variant={loaderVariantMap[variant]} />
        </>
      ) : (
        children
      )}
    </button>
  );
};
