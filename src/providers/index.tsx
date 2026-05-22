import { ReactNode } from 'react';

import { MSWProvider } from './msw-provider';
import { ReactQueryProvider } from './react-query-provider';

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <MSWProvider>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </MSWProvider>
  );
};
