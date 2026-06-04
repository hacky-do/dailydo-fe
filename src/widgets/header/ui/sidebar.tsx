'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Drawer } from 'vaul';

import { ROUTES, ROUTES_NAME } from '@/shared/config/routes';
import ChevronLight from '@/shared/ui/icons/common/chevron_right.svg';
import Delete from '@/shared/ui/icons/common/delete.svg';
import Hamburger from '@/shared/ui/icons/common/hamburger.svg';
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

interface SidebarProps {
  variant: '100' | '500';
}

export const Sidebar = ({ variant }: SidebarProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  const isLoggedIn = true; // TODO: 로그인 여부 검사로 변경
  const missionStatus: number | 'N' = 'N'; // TODO: 미션 쿼리에서 계산하는 것으로 변경

  const handleClickLink = (route: string) => {
    if (isLoggedIn) {
      router.push(route);
      setOpen(false);
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
    <Drawer.Root direction="right" open={open} onOpenChange={setOpen}>
      <Drawer.Trigger aria-label="메뉴 열기" className="ml-auto">
        <Hamburger
          className={cn(
            'w-6',
            variant === '500' ? 'text-white' : 'text-gray-600',
          )}
        />
      </Drawer.Trigger>
      <Drawer.Portal
        container={
          typeof window !== 'undefined'
            ? document.getElementById('mobile-portal-root')
            : undefined
        }
      >
        <Drawer.Overlay className="pointer-events-auto absolute inset-0 bg-black/20" />
        <Drawer.Content className="pointer-events-auto absolute inset-y-0 right-0 flex w-78.5 flex-col rounded-tl-3xl bg-white shadow outline-none">
          <Drawer.Title className="sr-only">메뉴</Drawer.Title>
          <div className="flex h-full flex-col gap-6 p-6">
            <Drawer.Close className="self-start">
              <Delete className="w-6 text-gray-400" />
            </Drawer.Close>

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
                    <button
                      onClick={handleLogout}
                      type="button"
                      className="p-4"
                    >
                      로그아웃
                    </button>
                  )}
                </li>
              </ul>
            </nav>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
