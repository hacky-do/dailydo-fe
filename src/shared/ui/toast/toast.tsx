import { useEffect, useRef, useState } from 'react';

import { ANIM_DURATION } from './toast.constants';
import type { ToastItem } from './toast.types';

type Role = 'status' | 'alert';
type AriaLive = 'polite' | 'assertive';

interface TypeConfig {
  role: Role;
  ariaLive: AriaLive;
  ariaLabel: string;
}

const TYPE_CONFIG: Record<ToastItem['type'], TypeConfig> = {
  success: {
    role: 'status',
    ariaLive: 'polite',
    ariaLabel: '성공 알림',
  },
  error: {
    role: 'alert',
    ariaLive: 'assertive',
    ariaLabel: '오류 알림',
  },
  info: {
    role: 'status',
    ariaLive: 'polite',
    ariaLabel: '안내 알림',
  },
  warning: {
    role: 'alert',
    ariaLive: 'assertive',
    ariaLabel: '경고 알림',
  },
};

const ENTER_OFFSET = 40;
const EXIT_OFFSET = 80;
const DRAG_THRESHOLD = 30;
const DRAG_OPACITY_FACTOR = 1.5;

interface ToastStyle {
  transform: string;
  opacity: number;
  transition: string;
}

function getToastStyle(
  isMounted: boolean,
  isExiting: boolean,
  dragY: number,
  exitDirection: 1 | -1,
): ToastStyle {
  const animSec = `${ANIM_DURATION / 1000}s`;

  if (!isMounted) {
    return {
      transform: `translateY(${ENTER_OFFSET}px)`,
      opacity: 0,
      transition: `transform ${animSec} ease, opacity ${animSec} ease`,
    };
  }

  if (isExiting) {
    return {
      transform: `translateY(${EXIT_OFFSET * exitDirection}px)`,
      opacity: 0,
      transition: `transform ${animSec} ease, opacity ${animSec} ease`,
    };
  }

  const isDragging = dragY !== 0;
  return {
    transform: `translateY(${dragY}px)`,
    opacity: isDragging
      ? Math.max(
          0,
          1 - Math.abs(dragY) / (DRAG_THRESHOLD * DRAG_OPACITY_FACTOR),
        )
      : 1,
    transition: isDragging
      ? 'opacity 0.1s ease'
      : `transform ${animSec} ease, opacity ${animSec} ease`,
  };
}

export interface ToastProps extends ToastItem {
  onClose: (id: string) => void;
  onPause?: (id: string) => void;
  onResume?: (id: string) => void;
  isExiting?: boolean;
}

export const Toast = ({
  id,
  message,
  type,
  onClose,
  onPause,
  onResume,
  isExiting = false,
}: ToastProps) => {
  const config = TYPE_CONFIG[type];
  const [isMounted, setIsMounted] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [exitDirection, setExitDirection] = useState<1 | -1>(1);
  const isDraggingRef = useRef(false);
  const startYRef = useRef(0);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setIsMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    startYRef.current = e.clientY;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const delta = e.clientY - startYRef.current;
    setDragY(delta);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    const delta = e.clientY - startYRef.current;
    if (Math.abs(delta) >= DRAG_THRESHOLD) {
      setExitDirection(delta > 0 ? 1 : -1);
      onClose(id);
    } else {
      setDragY(0);
    }
  };

  const handlePointerCancel = () => {
    isDraggingRef.current = false;
    setDragY(0);
  };

  const handleMouseEnter = () => onPause?.(id);
  const handleMouseLeave = () => onResume?.(id);

  const style = getToastStyle(isMounted, isExiting, dragY, exitDirection);

  const ariaProps = {
    role: config.role,
    'aria-live': config.ariaLive,
    'aria-label': config.ariaLabel,
    'aria-atomic': 'true' as const,
    tabIndex: 0,
  };

  const pauseHandlers = {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onFocus: handleMouseEnter,
    onBlur: handleMouseLeave,
  };

  const dragHandlers = {
    onPointerDown: handlePointerDown,
    onPointerMove: handlePointerMove,
    onPointerUp: handlePointerUp,
    onPointerCancel: handlePointerCancel,
  };

  return (
    <div
      {...ariaProps}
      {...pauseHandlers}
      {...dragHandlers}
      className="pointer-events-auto inline-flex cursor-grab touch-none items-center justify-center gap-2.5 overflow-hidden rounded-[10px] bg-black/80 px-6 py-3 select-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:outline-none active:cursor-grabbing"
      style={style}
    >
      <p className="justify-start text-xs leading-4 font-semibold text-white">
        {message}
      </p>
    </div>
  );
};
