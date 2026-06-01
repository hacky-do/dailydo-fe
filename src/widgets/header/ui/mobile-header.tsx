'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { ROUTES, ROUTES_NAME } from '@/shared/config/routes';
import ChevronLeft from '@/shared/ui/icons/common/chevron_left.svg';
import Hamburger from '@/shared/ui/icons/common/hamburger.svg';
import Logo from '@/shared/ui/icons/common/logo.svg';
import { cn } from '@/shared/utils/cn';

const TITLED_ROUTES = [
  ROUTES.MYPAGE,
  ROUTES.MYLOG,
  ROUTES.COLLECTIONS,
] as const;

type TitledRoute = (typeof TITLED_ROUTES)[number];

const TITLED_ROUTES_NAME: Record<TitledRoute, string> = {
  [ROUTES.MYPAGE]: ROUTES_NAME.MYPAGE,
  [ROUTES.MYLOG]: ROUTES_NAME.MYLOG,
  [ROUTES.COLLECTIONS]: ROUTES_NAME.COLLECTIONS,
};

export const MobileHeader = ({ className }: { className?: string }) => {
  const pathname = usePathname();
  const router = useRouter();
  const isTitledRoute = TITLED_ROUTES.includes(pathname as TitledRoute);

  const handleOpenSidebar = () => {
    // TODO: 사이드바 오픈 구현
  };

  return (
    <header
      className={cn(
        'sticky top-0 h-13 w-full bg-green-100',
        {
          'bg-gradient-500 [--gradient-dir:to_right]': isTitledRoute,
        },
        className,
      )}
    >
      <div className="flex h-full w-full items-center gap-4 px-3">
        {isTitledRoute ? (
          // 뒤로가기 버튼, 페이지 제목
          <>
            <button
              onClick={() => router.back()}
              type="button"
              aria-label="뒤로가기"
            >
              <ChevronLeft className="w-7.5 text-white" />
            </button>
            <h1 className="text-lg font-semibold text-white">
              {TITLED_ROUTES_NAME[pathname as TitledRoute]}
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

        {/* 햄버거 버튼 */}
        <button
          onClick={handleOpenSidebar}
          type="button"
          className="ml-auto"
          aria-label="메뉴 열기"
        >
          <Hamburger
            className={cn(
              'w-6',
              isTitledRoute ? 'text-white' : 'text-gray-600',
            )}
          />
        </button>
      </div>
    </header>
  );
};
