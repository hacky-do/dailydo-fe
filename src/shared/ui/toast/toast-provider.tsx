'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';
import { createPortal } from 'react-dom';

import { ANIM_DURATION, Toast } from './toast';
import type { ToastContextValue, ToastItem, ToastOptions } from './toast.types';

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>');
  return ctx;
}

let _seq = 0;
function genId(): string {
  return `toast-${Date.now()}-${++_seq}`;
}

// ─────────────────────────────────────────────
// 컨테이너
// ─────────────────────────────────────────────

interface ContainerProps {
  items: ToastItem[];
  exitingIds: Set<string>;
  onClose: (id: string) => void;
}

const noop = () => () => {};

function ToastContainer({ items, exitingIds, onClose }: ContainerProps) {
  const mounted = useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );

  if (!mounted) return null;

  return createPortal(
    <div
      aria-live="polite"
      aria-label="알림 목록"
      className="pointer-events-none fixed bottom-6 left-1/2 z-9999 flex -translate-x-1/2 flex-col items-center gap-2"
    >
      {items.map((item) => (
        <Toast
          key={item.id}
          {...item}
          onClose={onClose}
          isExiting={exitingIds.has(item.id)}
        />
      ))}
    </div>,
    document.body,
  );
}

// ─────────────────────────────────────────────
// Provider
// ─────────────────────────────────────────────

interface ToastProviderProps {
  children: React.ReactNode;
  maxCount?: number;
}

export function ToastProvider({ children, maxCount = 5 }: ToastProviderProps) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const [exitingIds, setExitingIds] = useState<Set<string>>(new Set());
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());
  const animTimers = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map(),
  );

  const close = useCallback((id: string) => {
    const t = timers.current.get(id);
    if (t) {
      clearTimeout(t);
      timers.current.delete(id);
    }

    setExitingIds((prev) => new Set([...prev, id]));

    const animTimer = setTimeout(() => {
      setItems((prev) => prev.filter((i) => i.id !== id));
      setExitingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      animTimers.current.delete(id);
    }, ANIM_DURATION);

    animTimers.current.set(id, animTimer);
  }, []);

  const toast = useCallback(
    ({ message, type, duration = 3000 }: ToastOptions) => {
      const id = genId();

      setItems((prev) => {
        const next = [...prev, { id, message, type, duration }];
        if (next.length > maxCount) {
          const removed = next.splice(0, next.length - maxCount);
          removed.forEach((r) => {
            const t = timers.current.get(r.id);
            if (t) {
              clearTimeout(t);
              timers.current.delete(r.id);
            }
          });
        }
        return next;
      });

      const timer = setTimeout(() => close(id), duration);
      timers.current.set(id, timer);
    },
    [close, maxCount],
  );

  useEffect(() => {
    const autoTimers = timers.current;
    const animationTimers = animTimers.current;
    return () => {
      autoTimers.forEach((t) => clearTimeout(t));
      autoTimers.clear();
      animationTimers.forEach((t) => clearTimeout(t));
      animationTimers.clear();
    };
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <ToastContainer items={items} exitingIds={exitingIds} onClose={close} />
    </ToastContext.Provider>
  );
}
