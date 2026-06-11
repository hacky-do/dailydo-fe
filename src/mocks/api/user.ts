import { http, HttpResponse } from 'msw';

import { BASE_URL } from '@/shared/api/base-url.constant';

export const handlers = [
  http.patch(`${BASE_URL}/users`, () => new HttpResponse(null, { status: 204 })),

  http.post(
    `${BASE_URL}/users/categories`,
    () => new HttpResponse(null, { status: 204 }),
  ),
];
