import { create } from 'zustand';

import { ANIM_DURATION } from './toast';
import type { ToastItem, ToastOptions } from './toast.types';

interface ToastState {
  items: ToastItem[];
  exitingIds: Set<string>;
  maxCount: number;
  toast: (options: ToastOptions) => void;
  close: (id: string) => void;
}

const timers = new Map<string, ReturnType<typeof setTimeout>>();
const animTimers = new Map<string, ReturnType<typeof setTimeout>>();

let _seq = 0;
function genId(): string {
  return `toast-${Date.now()}-${++_seq}`;
}

export const useToastStore = create<ToastState>((set, get) => ({
  items: [],
  exitingIds: new Set(),
  maxCount: 5,

  close: (id: string) => {
    const t = timers.get(id);
    if (t) {
      clearTimeout(t);
      timers.delete(id);
    }

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

  toast: ({ message, type, duration = 3000 }: ToastOptions) => {
    const id = genId();
    const { close, maxCount } = get();

    set((state) => ({
      items: [...state.items, { id, message, type, duration }],
    }));

    const { items, exitingIds } = get();
    const activeItems = items.filter((item) => !exitingIds.has(item.id));
    if (activeItems.length > maxCount) {
      activeItems.slice(0, activeItems.length - maxCount).forEach((r) => close(r.id));
    }

    const timer = setTimeout(() => close(id), duration);
    timers.set(id, timer);
  },
}));
