import { http, HttpResponse } from 'msw';

import { BASE_URL } from '@/shared/api';
import { COOKIES } from '@/shared/config/cookies';
import { AUTH_ENDPOINTS } from '@/shared/config/endpoints';

const MOCK_ACCESS_TOKEN = 'mock-access-token';

const MOCK_REFRESH_TOKEN = 'mock-refresh-token';

const withAuthCookie = (data: object) =>
  HttpResponse.json(data, {
    headers: [
      ['Set-Cookie', `${COOKIES.ACCESS_TOKEN}=${MOCK_ACCESS_TOKEN}; Path=/`],
      ['Set-Cookie', `${COOKIES.REFRESH_TOKEN}=${MOCK_REFRESH_TOKEN}; Path=/`],
    ],
  });

interface SocialLoginRequestBody {
  type: string;
  token: string;
  remember: boolean;
}

interface RegisterRequestBody {
  email: string;
  name: string;
  type: string;
  socialToken: string;
}

export const handlers = [
  http.post(`${BASE_URL}${AUTH_ENDPOINTS.SOCIAL_TOKEN}`, () => {
    return HttpResponse.json({ type: 'google', token: 'mock-social-token' });
  }),

  http.post(`${BASE_URL}${AUTH_ENDPOINTS.SOCIAL}`, async ({ request }) => {
    const { type } = (await request.json()) as SocialLoginRequestBody;
    if (
      type === 'google' &&
      process.env.NEXT_PUBLIC_ENABLE_GOOGLE_MOCK === 'true'
    ) {
      return HttpResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return withAuthCookie({
      id: 1,
      accessToken: MOCK_ACCESS_TOKEN,
      expiresIn: 3600,
      refreshToken: MOCK_REFRESH_TOKEN,
      type,
    });
  }),

  http.post(`${BASE_URL}${AUTH_ENDPOINTS.BASE}`, () => {
    return withAuthCookie({
      id: 1,
      accessToken: MOCK_ACCESS_TOKEN,
      expiresIn: 3600,
      refreshToken: MOCK_REFRESH_TOKEN,
    });
  }),

  http.post(`${BASE_URL}${AUTH_ENDPOINTS.REFRESH_TOKEN}`, () => {
    return withAuthCookie({
      id: 1,
      accessToken: MOCK_ACCESS_TOKEN,
      expiresIn: 3600,
      refreshToken: MOCK_REFRESH_TOKEN,
    });
  }),

  http.post(`${BASE_URL}${AUTH_ENDPOINTS.REGISTER}`, async ({ request }) => {
    const { name } = (await request.json()) as RegisterRequestBody;
    return withAuthCookie({
      userId: 1,
      image: null,
      nickname: name,
      intro: null,
    });
  }),
];
