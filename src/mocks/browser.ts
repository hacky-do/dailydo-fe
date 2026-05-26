import { setupWorker } from 'msw/browser';

import { handlers } from './api/mission';

export const worker = setupWorker(...handlers);
