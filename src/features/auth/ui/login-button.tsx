'use client';

import { useRouter } from 'next/navigation';

import { SocialLoginType } from '@/entities/session';
import { BASE_URL } from '@/shared/api/base-url.constant';
import { ROUTES } from '@/shared/config/routes';
import Google from '@/shared/ui/icons/auth/google.svg';
import Naver from '@/shared/ui/icons/auth/naver.svg';
import { cn } from '@/shared/utils/cn';

import { emailLogin } from '../api/auth.api';

type LoginType = SocialLoginType | 'guest';

interface LoginButtonProps {
  type: LoginType;
  className?: string;
}

const BUTTON_CONFIG = {
  google: {
    label: '구글로 계속하기',
    icon: Google,
    width: 20,
    style: 'bg-white border border-gray-200 text-gray-800',
  },
  naver: {
    label: '네이버로 계속하기',
    icon: Naver,
    width: 16,
    style: 'bg-[#03C75A] text-white',
  },
  guest: {
    label: '테스트 계정으로 계속하기',
    icon: null,
    width: null,
    style: 'bg-green-500 text-white',
  },
} as const;

export const LoginButton = ({ type, className }: LoginButtonProps) => {
  const router = useRouter();
  const { label, icon: Icon, width, style } = BUTTON_CONFIG[type];

  const handleClick = async () => {
    if (type === 'guest') {
      await emailLogin(
        process.env.NEXT_PUBLIC_GUEST_EMAIL!,
        process.env.NEXT_PUBLIC_GUEST_PASSWORD!,
        true,
      );
      router.push(ROUTES.MISSIONS);
      return;
    }
    const redirectUri = `${window.location.origin}${ROUTES.AUTH_CALLBACK}`;
    window.location.href = `${BASE_URL}/auth/oauth2?type=${type}&redirectUri=${encodeURIComponent(redirectUri)}`;
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        'flex h-12 w-full items-center justify-center gap-3 rounded-xl px-4 text-base leading-6 font-semibold tracking-tight',
        style,
        className,
      )}
    >
      {Icon && <Icon width={width} />}
      <span>{label}</span>
    </button>
  );
};
