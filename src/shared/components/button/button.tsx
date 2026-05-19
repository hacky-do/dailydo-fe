'use client';

import { ComponentProps, ReactNode } from 'react';

import { cn } from '../../utils/cn';
import { Loader } from '../loader/loader';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
type ButtonSize = 'sm' | 'md' | 'lg';

const styleMap: Record<ButtonVariant, string> = {
  primary: 'bg-green-500 text-white hover:bg-green-600',
  secondary: 'border border-green-500 bg-white text-green-600',
  tertiary: 'border border-gray-200 bg-white text-gray-600',
};

const loaderColorMap: Record<
  ButtonVariant,
  'primary' | 'secondary' | 'tertiary'
> = {
  primary: 'secondary',
  secondary: 'primary',
  tertiary: 'tertiary',
};

const sizeStyles: Record<ButtonSize, string> = {
  lg: 'h-12 w-full text-base',
  md: 'h-10 w-fit rounded-lg px-4 text-sm',
  sm: 'h-7 w-fit rounded-md px-4 text-xs',
};

const loaderSizeMap: Record<ButtonSize, 'sm' | 'lg'> = {
  lg: 'lg',
  md: 'sm',
  sm: 'sm',
};

interface ButtonProps extends ComponentProps<'button'> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
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
        sizeStyles[size],
        disabled ? 'bg-gray-100 text-gray-600' : styleMap[variant],
        className,
      )}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...props}
    >
      <span className={cn(isLoading && 'invisible')}>{children}</span>
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Loader color={loaderColorMap[variant]} size={loaderSizeMap[size]} />
        </span>
      )}
    </button>
  );
};
