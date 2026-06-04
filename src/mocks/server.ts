import { setupServer } from 'msw/node';

import { handlers as authHandlers } from './api/auth';
import { handlers as categoryHandlers } from './api/category';
import { handlers as missionHandlers } from './api/mission';

export const server = setupServer(
  ...authHandlers,
  ...categoryHandlers,
  ...missionHandlers,
);
