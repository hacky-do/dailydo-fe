import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type SocialLoginType = 'google' | 'naver';

const AUTH_STORE_KEY = 'dailydo_auth';

interface AuthState {
  lastLogin: SocialLoginType | null;
  accessToken: string | null;
  refreshToken: string | null;
  setLastLogin: (type: SocialLoginType) => void;
  setAuth: (accessToken: string, refreshToken: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      lastLogin: null,
      accessToken: null,
      refreshToken: null,
      setLastLogin: (type) => set({ lastLogin: type }),
      setAuth: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken }),
      clearAuth: () => set({ accessToken: null, refreshToken: null }),
    }),
    {
      name: AUTH_STORE_KEY,
    },
  ),
);
