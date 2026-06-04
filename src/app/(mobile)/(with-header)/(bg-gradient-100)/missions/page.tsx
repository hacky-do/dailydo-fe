'use client';
import { Suspense } from 'react';

import { Loader } from '@/shared/ui/loader';
import { MissionPage } from '@/views/mission';

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <MissionPage />
    </Suspense>
  );
}
