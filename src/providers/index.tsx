'use client';

import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

import { ToastProvider } from '@/shared/ui/toast';

import { MSWProvider } from './msw-provider';
import { ReactQueryProvider } from './react-query-provider';

export const Providers = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) router.refresh();
    };
    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, [router]);

  return (
    <MSWProvider>
      <ReactQueryProvider>
        <ToastProvider>{children}</ToastProvider>
      </ReactQueryProvider>
    </MSWProvider>
  );
};
