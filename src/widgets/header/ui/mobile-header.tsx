'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { ROUTE_META, ROUTES } from '@/shared/config/routes';
import ChevronLeft from '@/shared/ui/icons/common/chevron_left.svg';
import Logo from '@/shared/ui/icons/common/logo.svg';
import { cn } from '@/shared/utils/cn';

import { Sidebar } from './sidebar';

interface MobileHeaderProps {
  variant: '100' | '500';
  className?: string;
}

export const MobileHeader = ({ variant, className }: MobileHeaderProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(ROUTES.HOME);
    }
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-100 flex h-13 w-full shrink-0 [--gradient-dir:to_right]',
        {
          'bg-gradient-100': variant === '100',
          'bg-gradient-500': variant === '500',
        },
        className,
      )}
    >
      <div className="flex w-full items-center gap-4 px-3">
        {variant === '500' ? (
          // 뒤로가기 버튼, 페이지 제목
          <>
            <button onClick={handleBack} type="button" aria-label="뒤로가기">
              <ChevronLeft className="w-7.5 text-white" />
            </button>
            <h1 className="text-lg font-semibold text-white">
              {ROUTE_META[pathname as keyof typeof ROUTE_META]?.name}
            </h1>
          </>
        ) : (
          // 로고
          <h1>
            <Link href={ROUTES.HOME}>
              <Logo className="h-8" aria-label="daily:do" />
            </Link>
          </h1>
        )}

        <Sidebar variant={variant} />
      </div>
    </header>
  );
};
