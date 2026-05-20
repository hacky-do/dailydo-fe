'use client';

import { ComponentProps, ReactNode } from 'react';

import { cn } from '../../utils/cn';

type ButtonColor = 'primary' | 'secondary' | 'tertiary';

const colorStyles: Record<ButtonColor, string> = {
  primary: 'text-green-600',
  secondary: 'text-white',
  tertiary: 'text-gray-600',
};

interface UnderlineButtonProps extends ComponentProps<'button'> {
  children: ReactNode;
  color?: ButtonColor;
  className?: string;
}

export const UnderlineButton = ({
  children,
  color = 'primary',
  className,
  ...props
}: UnderlineButtonProps) => {
  return (
    <button
      className={cn(
        'h-fit w-fit text-sm font-semibold underline underline-offset-4',
        colorStyles[color],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
