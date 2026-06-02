'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { ROUTES, ROUTES_NAME } from '@/shared/config/routes';
import ChevronLight from '@/shared/ui/icons/common/chevron_right.svg';
import Delete from '@/shared/ui/icons/common/delete.svg';
import Lock from '@/shared/ui/icons/common/lock.svg';
import { useToast } from '@/shared/ui/toast';
import { cn } from '@/shared/utils/cn';

interface SidebarNavItemProps {
  name: string;
  isActive: boolean;
  onClick: () => void;
  badge?: React.ReactNode;
  showLock?: boolean;
}

const SidebarNavItem = ({
  name,
  isActive,
  onClick,
  badge,
  showLock = false,
}: SidebarNavItemProps) => (
  <li>
    <button onClick={onClick} type="button" className="flex w-full">
      <div className="flex items-center gap-1 p-4">
        <span className={cn({ 'font-semibold text-green-600': isActive })}>
          {name}
        </span>
        {badge}
      </div>
      {showLock ? (
        <Lock className="ml-auto w-6 text-gray-400" />
      ) : (
        <ChevronLight className="ml-auto w-5 text-gray-400" />
      )}
    </button>
  </li>
);

// TODO: 내부에서 로그인 여부 검사로 변경
export const Sidebar = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  const missionStatus: number | 'N' = 'N'; // TODO: 미션 쿼리에서 계산하는 것으로 변경

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

  // TODO: 네비게이션 영역 제외 바텀 시트로 대체
  return (
    <aside
      className={cn(
        'absolute top-0 right-0 z-200 flex h-full w-78.5 flex-col gap-6 rounded-tl-3xl bg-white p-6 shadow',
        { 'md:hidden': pathname === ROUTES.HOME },
      )}
    >
      {/* TODO: 추후 삭제 */}
      <button>
        <Delete className="w-6 text-gray-400" />
      </button>

      {/* 네비게이션 영역 */}
      <nav className="h-full w-full">
        <ul className="flex h-full flex-col gap-2 text-base font-medium text-gray-600">
          <SidebarNavItem
            name={ROUTES_NAME.MISSIONS}
            isActive={pathname === ROUTES.MISSIONS}
            onClick={() => handleClickLink(ROUTES.MISSIONS)}
            badge={
              <span className="h-4 rounded-full bg-green-500 px-1.75 text-xs font-semibold text-white">
                {missionStatus}
              </span>
            }
          />
          <SidebarNavItem
            name={ROUTES_NAME.MYLOG}
            isActive={pathname === ROUTES.MYLOG}
            onClick={() => handleClickLink(ROUTES.MYLOG)}
            showLock={!isLoggedIn}
          />
          <SidebarNavItem
            name={ROUTES_NAME.MYPAGE}
            isActive={pathname === ROUTES.MYPAGE}
            onClick={() => handleClickLink(ROUTES.MYPAGE)}
            showLock={!isLoggedIn}
          />
          {/* TODO: 컬렉션 페이지 구현 후 활성화 */}
          {/* <SidebarNavItem
            name={ROUTES_NAME.COLLECTIONS}
            isActive={pathname === ROUTES.COLLECTIONS}
            onClick={() => handleClickLink(ROUTES.COLLECTIONS)}
            showLock={!isLoggedIn}
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
    </aside>
  );
};
