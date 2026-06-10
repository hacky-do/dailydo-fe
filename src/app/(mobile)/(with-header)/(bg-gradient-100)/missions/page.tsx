'use client';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

import { Loader } from '@/shared/ui/loader';

const MissionPage = dynamic(
  () => import('@/views/mission').then((m) => ({ default: m.MissionPage })),
  { ssr: false },
);

const fallback = (
  <div className="flex h-full w-full items-center justify-center">
    <Loader color="primary" size="lg" />
  </div>
);

export default function Page() {
  return <Suspense fallback={fallback}>{<MissionPage />}</Suspense>;
}
