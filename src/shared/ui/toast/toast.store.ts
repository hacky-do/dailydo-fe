import { create } from 'zustand';

import { ANIM_DURATION, MAX_COUNT } from './toast.constants';
import type { ToastItem, ToastOptions } from './toast.types';

interface ToastState {
  items: ToastItem[];
  exitingIds: Set<string>;
  toast: (options: ToastOptions) => void;
  close: (id: string) => void;
  pauseTimer: (id: string) => void;
  resumeTimer: (id: string) => void;
}

const timers = new Map<string, ReturnType<typeof setTimeout>>();
const animTimers = new Map<string, ReturnType<typeof setTimeout>>();
const expiryTimes = new Map<string, number>();

let _seq = 0;
function genId(): string {
  return `toast-${Date.now()}-${++_seq}`;
}

export const useToastStore = create<ToastState>((set, get) => ({
  items: [],
  exitingIds: new Set(),

  close: (id: string) => {
    const t = timers.get(id);
    if (t) {
      clearTimeout(t);
      timers.delete(id);
    }
    expiryTimes.delete(id);

    set((state) => ({ exitingIds: new Set([...state.exitingIds, id]) }));

    const animTimer = setTimeout(() => {
      set((state) => {
        const next = new Set(state.exitingIds);
        next.delete(id);
        return {
          items: state.items.filter((i) => i.id !== id),
          exitingIds: next,
        };
      });
      animTimers.delete(id);
    }, ANIM_DURATION);

    animTimers.set(id, animTimer);
  },

  pauseTimer: (id: string) => {
    const t = timers.get(id);
    if (!t) return;
    clearTimeout(t);
    timers.delete(id);

    const expiry = expiryTimes.get(id);
    if (expiry === undefined) {
      const duration = get().items.find((i) => i.id === id)?.duration ?? 3000;
      expiryTimes.set(id, Date.now() + duration);
    }
  },

  resumeTimer: (id: string) => {
    const expiry = expiryTimes.get(id);
    if (expiry === undefined) return;
    const remaining = Math.max(0, expiry - Date.now());
    expiryTimes.set(id, Date.now() + remaining);
    const { close } = get();
    const timer = setTimeout(() => close(id), remaining);
    timers.set(id, timer);
  },

  toast: ({ message, type, duration = 3000 }: ToastOptions) => {
    const id = genId();
    const { close } = get();

    set((state) => ({
      items: [...state.items, { id, message, type, duration }],
    }));

    const { items, exitingIds } = get();
    const activeItems = items.filter((item) => !exitingIds.has(item.id));
    if (activeItems.length > MAX_COUNT) {
      activeItems
        .slice(0, activeItems.length - MAX_COUNT)
        .forEach((r) => close(r.id));
    }

    // duration이 0이면 자동 닫기 없이 수동 닫기만 허용
    if (duration > 0) {
      expiryTimes.set(id, Date.now() + duration);
      const timer = setTimeout(() => close(id), duration);
      timers.set(id, timer);
    }
  },
}));
