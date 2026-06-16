'use client';

import { Suspense } from 'react';

import { Loader } from '@/shared/ui/loader/loader';
import { useSocialLoginCallback } from '@/widgets/auth';

const AuthCallbackHandler = () => {
  useSocialLoginCallback();

  return (
    <div className="bg-gradient-100 flex h-dvh items-center justify-center">
      <Loader />
    </div>
  );
};

export const AuthCallbackPage = () => (
  <Suspense>
    <AuthCallbackHandler />
  </Suspense>
);
