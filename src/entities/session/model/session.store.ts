import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { SocialLoginType } from './types';

const SESSION_STORE_KEY = 'dailydo_auth';

interface SessionState {
  lastLogin: SocialLoginType | null;
  setLastLogin: (type: SocialLoginType) => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      lastLogin: null,
      setLastLogin: (type) => set({ lastLogin: type }),
    }),
    {
      name: SESSION_STORE_KEY,
    },
  ),
);
