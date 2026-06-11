'use client';

import { FallbackUI } from '@/shared/ui/fallback-ui';

const Error = ({ reset }: { reset: () => void }) => {
  return <FallbackUI onReset={reset} />;
};

export default Error;
