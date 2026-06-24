import { setupWorker } from 'msw/browser';

import { handlers as authHandlers } from './api/auth';
import { handlers as categoryHandlers } from './api/category';
import { handlers as userHandlers } from './api/user';

export const worker = setupWorker(
  ...authHandlers,
  ...categoryHandlers,
  ...userHandlers,
);
