import { create } from 'zustand';

import { ANIM_DURATION } from './toast';
import type {
  ToastItem,
  ToastOptions,
  ToastPromiseOptions,
} from './toast.types';

interface ToastState {
  items: ToastItem[];
  exitingIds: Set<string>;
  maxCount: number;
  toast: (options: ToastOptions) => void;
  close: (id: string) => void;
  pauseTimer: (id: string) => void;
  resumeTimer: (id: string) => void;
  promise: <T>(p: Promise<T>, options: ToastPromiseOptions<T>) => Promise<T>;
}

const timers = new Map<string, ReturnType<typeof setTimeout>>();
const animTimers = new Map<string, ReturnType<typeof setTimeout>>();
const timerStartTimes = new Map<string, number>();
const remainingTimes = new Map<string, number>();

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
    timerStartTimes.delete(id);
    remainingTimes.delete(id);

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

    const startTime = timerStartTimes.get(id) ?? Date.now();
    const scheduledDuration =
      remainingTimes.get(id) ?? get().items.find((i) => i.id === id)?.duration ?? 3000;
    remainingTimes.set(id, Math.max(0, scheduledDuration - (Date.now() - startTime)));
  },

  resumeTimer: (id: string) => {
    const remaining = remainingTimes.get(id);
    if (remaining === undefined) return;
    timerStartTimes.set(id, Date.now());
    const { close } = get();
    const timer = setTimeout(() => close(id), remaining);
    timers.set(id, timer);
  },

  promise: <T>(p: Promise<T>, options: ToastPromiseOptions<T>): Promise<T> => {
    const loadingId = genId();
    const { close, maxCount } = get();

    set((state) => ({
      items: [
        ...state.items,
        { id: loadingId, message: options.loading, type: 'info', duration: 0 },
      ],
    }));

    const { items, exitingIds } = get();
    const activeItems = items.filter((item) => !exitingIds.has(item.id));
    if (activeItems.length > maxCount) {
      activeItems
        .slice(0, activeItems.length - maxCount)
        .forEach((r) => close(r.id));
    }

    return p.then(
      (data) => {
        close(loadingId);
        const msg =
          typeof options.success === 'function'
            ? options.success(data)
            : options.success;
        get().toast({ message: msg, type: 'success' });
        return data;
      },
      (err: unknown) => {
        close(loadingId);
        const msg =
          typeof options.error === 'function'
            ? options.error(err)
            : options.error;
        get().toast({ message: msg, type: 'error' });
        throw err;
      },
    );
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
      activeItems
        .slice(0, activeItems.length - maxCount)
        .forEach((r) => close(r.id));
    }

    if (duration > 0) {
      timerStartTimes.set(id, Date.now());
      const timer = setTimeout(() => close(id), duration);
      timers.set(id, timer);
    }
  },
}));
