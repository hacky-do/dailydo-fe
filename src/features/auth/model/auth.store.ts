import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type SocialLoginType = 'google' | 'naver';

const LAST_LOGIN_KEY = 'dailydo_last_login';

interface AuthState {
  lastLogin: SocialLoginType | null;
  setLastLogin: (type: SocialLoginType) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      lastLogin: null,
      setLastLogin: (type) => set({ lastLogin: type }),
    }),
    {
      name: LAST_LOGIN_KEY,
    },
  ),
);
