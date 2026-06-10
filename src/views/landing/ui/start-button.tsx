import Link from 'next/link';
import { ReactNode } from 'react';

import { ROUTES } from '@/shared/config/routes';
import { cn } from '@/shared/utils/cn';

interface StartButtonProps {
  children: ReactNode;
  className?: string;
}

export const StartButton = ({ children, className }: StartButtonProps) => {
  return (
    <Link
      href={ROUTES.LOGIN}
      className={cn(
        'inline-flex h-12 w-fit items-center justify-center rounded-xl bg-green-500 px-6 text-base font-semibold text-white hover:bg-green-600',
        className,
      )}
    >
      {children}
    </Link>
  );
};
