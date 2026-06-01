'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { ROUTES, ROUTES_NAME } from '@/shared/config/routes';
import Logo from '@/shared/ui/icons/common/logo.svg';
import { useToast } from '@/shared/ui/toast';
import { cn } from '@/shared/utils/cn';

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

  const isLoggedIn = true; // TODO: 로그인 여부 검사로 변경
  const missionStatus: number | 'N' = 3; // TODO: 미션 쿼리에서 계산하는 것으로 변경

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
    <header className={cn('sticky top-0 h-18 w-full bg-gray-50', className)}>
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
                <span className="h-4 rounded-full bg-green-500 px-1.75 text-xs font-semibold text-white">
                  {missionStatus}
                </span>
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
            <PcNavItem
              name={ROUTES_NAME.COLLECTIONS}
              onClick={() => handleClickLink(ROUTES.COLLECTIONS)}
            />

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
