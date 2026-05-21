import { ReactNode } from 'react';

import { MSWProvider } from './msw-provider';
import { ReactQueryProvider } from './react-query-provider';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ReactQueryProvider>
      <MSWProvider>{children}</MSWProvider>
    </ReactQueryProvider>
  );
}
