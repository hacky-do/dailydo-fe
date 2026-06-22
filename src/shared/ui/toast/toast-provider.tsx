'use client';

import { createPortal } from 'react-dom';

import { useHydrated } from '@/shared/lib/use-hydrated';

import { Toast } from './toast';
import { useToastStore } from './toast.store';

// ─────────────────────────────────────────────
// 컨테이너
// ─────────────────────────────────────────────

function ToastContainer() {
  const items = useToastStore((state) => state.items);
  const { close, pauseTimer, resumeTimer } = useToastStore.getState();

  const mounted = useHydrated();

  if (!mounted) return null;

  return createPortal(
    <div
      role="region"
      aria-label="알림 목록"
      className="pointer-events-none fixed bottom-6 left-1/2 z-9999 flex -translate-x-1/2 flex-col items-center gap-2"
    >
      {items.map((item) => (
        <Toast
          key={item.id}
          {...item}
          onClose={close}
          onPause={pauseTimer}
          onResume={resumeTimer}
          isExiting={item.isExiting}
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
}

export function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
}
