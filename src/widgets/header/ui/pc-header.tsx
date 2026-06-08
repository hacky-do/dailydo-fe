'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';

import { ROUTES, ROUTES_NAME } from '@/shared/config/routes';
import Logo from '@/shared/ui/icons/common/logo.svg';
import { useToast } from '@/shared/ui/toast';
import { cn } from '@/shared/utils/cn';

import { MissionBadge } from './mission-badge';

interface PcNavItemProps {
  name: string;
  onClick: () => void;
  badge?: React.ReactNode;
}

const PcNavItem = ({ name, onClick, badge }: PcNavItemProps) => (
  <li className="flex">
    <button
      onClick={onClick}
      type="button"
      className="flex items-center gap-1 p-4"
    >
      {name}
      {badge}
    </button>
  </li>
);

export const PcHeader = ({ className }: { className?: string }) => {
  const router = useRouter();
  const { toast } = useToast();

  const isLoggedIn = true;

  const handleClickLink = (route: string) => {
    if (isLoggedIn) {
      router.push(route);
      return;
    }
    toast({
      type: 'warning',
      message: '해당 기능은 로그인 사용자만 이용 가능해요',
    });
  };

  const handleLogout = () => {
    // TODO: 로그아웃 구현
  };

  return (
    <header
      className={cn('sticky top-0 z-100 h-18 w-full bg-gray-50', className)}
    >
      <div className="mx-auto flex h-full w-full max-w-7xl items-center gap-4 px-3">
        {/* 로고 */}
        <h1>
          <Link href={ROUTES.HOME} title="홈으로 이동">
            <Logo className="h-10" aria-label="daily:do" />
          </Link>
        </h1>

        {/* 네비게이션 */}
        <nav className="w-full">
          <ul className="flex gap-2 text-base font-medium text-gray-600">
            <PcNavItem
              name={ROUTES_NAME.MISSIONS}
              onClick={() => handleClickLink(ROUTES.MISSIONS)}
              badge={
                <Suspense fallback={null}>
                  <MissionBadge />
                </Suspense>
              }
            />
            <PcNavItem
              name={ROUTES_NAME.MYLOG}
              onClick={() => handleClickLink(ROUTES.MYLOG)}
            />
            <PcNavItem
              name={ROUTES_NAME.MYPAGE}
              onClick={() => handleClickLink(ROUTES.MYPAGE)}
            />
            {/* TODO: 컬렉션 페이지 구현 후 활성화 */}
            {/* <PcNavItem
              name={ROUTES_NAME.COLLECTIONS}
              onClick={() => handleClickLink(ROUTES.COLLECTIONS)}
            /> */}
            {/* 로그인, 로그아웃 버튼 */}
            <li className="mt-auto ml-auto">
              {!isLoggedIn ? (
                <Link href={ROUTES.LOGIN} className="p-4">
                  {ROUTES_NAME.LOGIN}
                </Link>
              ) : (
                <button onClick={handleLogout} type="button" className="p-4">
                  로그아웃
                </button>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
