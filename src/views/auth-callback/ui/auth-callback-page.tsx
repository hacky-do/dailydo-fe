'use client';

import { Suspense } from 'react';

import { useSocialLoginCallback } from '@/features/auth';
import { Loader } from '@/shared/ui/loader/loader';

const AuthCallbackHandler = () => {
  useSocialLoginCallback();

  return (
    <div className="bg-gradient-100 flex h-screen items-center justify-center">
      <Loader />
    </div>
  );
};

export const AuthCallbackPage = () => (
  <Suspense>
    <AuthCallbackHandler />
  </Suspense>
);
