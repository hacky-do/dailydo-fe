'use client';

import { useEffect, useRef } from 'react';

import { cn } from '@/shared/utils/cn';

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const FadeIn = ({ children, className, delay = 0 }: FadeInProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.animationDelay = `${delay}ms`;
          el.classList.add('animate-slide-up');
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={cn('opacity-0', className)}>
      {children}
    </div>
  );
};
