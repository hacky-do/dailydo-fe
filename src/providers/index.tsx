'use client';

import { ReactNode } from 'react';

import { ToastProvider } from '@/shared/ui/toast';

import { MSWProvider } from './msw-provider';
import { ReactQueryProvider } from './react-query-provider';

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <MSWProvider>
      <ReactQueryProvider>
        <ToastProvider>{children}</ToastProvider>
      </ReactQueryProvider>
    </MSWProvider>
  );
};
