'use client';
import { ReactNode, Suspense, use } from 'react';

import { initMocks } from '@/mocks';

const mockingEnabledPromise =
  typeof window === 'undefined' ? Promise.resolve() : initMocks();

function MSWProviderWrapper({ children }: { children: ReactNode }) {
  use(mockingEnabledPromise); // Promise 완료 전까지 렌더링 중단
  return children;
}

export function MSWProvider({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={null}>
      <MSWProviderWrapper>{children}</MSWProviderWrapper>
    </Suspense>
  );
}
