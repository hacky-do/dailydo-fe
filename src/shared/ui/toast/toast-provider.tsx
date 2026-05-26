'use client';

import { useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';

import { Toast } from './toast';
import { useToastStore } from './toast-store';

// ─────────────────────────────────────────────
// 컨테이너
// ─────────────────────────────────────────────

const noop = () => () => {};

function ToastContainer() {
  const items = useToastStore((state) => state.items);
  const exitingIds = useToastStore((state) => state.exitingIds);
  const { close, pauseTimer, resumeTimer } = useToastStore.getState();

  const mounted = useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );

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
}

export function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
}
