import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type SocialLoginType = 'google' | 'naver';

const AUTH_STORE_KEY = 'dailydo_auth';

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
      name: AUTH_STORE_KEY,
    },
  ),
);
