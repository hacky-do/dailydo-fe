import { setupServer } from 'msw/node';

import { handlers } from './api/mission';

export const server = setupServer(...handlers);
