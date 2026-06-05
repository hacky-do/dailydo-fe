'use client';

import { FallbackUI } from '@/shared/ui/fallback-ui';

const Error = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center overflow-y-auto bg-green-50">
      <FallbackUI />
    </div>
  );
};

export default Error;
