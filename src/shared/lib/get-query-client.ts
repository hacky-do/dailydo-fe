import { QueryClient } from '@tanstack/react-query';
import { cache } from 'react';

import { defaultQueryOptions } from './query-config.constant';

export const getQueryClient = cache(
  () => new QueryClient({ defaultOptions: defaultQueryOptions }),
);
