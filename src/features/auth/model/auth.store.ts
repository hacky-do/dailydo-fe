import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type SocialLoginType = 'google' | 'naver';

const LAST_LOGIN_KEY = 'dailydo_last_login';

interface AuthState {
  lastLogin: SocialLoginType | null;
  _hasHydrated: boolean;
  setLastLogin: (type: SocialLoginType) => void;
  setHasHydrated: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      lastLogin: null,
      _hasHydrated: false,
      setLastLogin: (type) => set({ lastLogin: type }),
      setHasHydrated: (value) => set({ _hasHydrated: value }),
    }),
    {
      name: LAST_LOGIN_KEY,
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
