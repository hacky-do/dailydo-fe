import { ReactNode } from 'react';

import { MSWProvider } from './msw-provider';

export default function Providers({ children }: { children: ReactNode }) {
  return <MSWProvider>{children}</MSWProvider>;
}
