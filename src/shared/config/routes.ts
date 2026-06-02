export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  MISSIONS: '/missions',
  MYPAGE: '/mypage',
  MYLOG: '/mylogs',
  COLLECTIONS: '/collections',
  AUTH_CALLBACK: '/auth/callback',
} as const;

export const ROUTES_NAME: Record<keyof typeof ROUTES, string> = {
  HOME: '홈',
  LOGIN: '로그인',
  SIGNUP: '회원가입',
  MISSIONS: '오늘의 미션',
  MYPAGE: '마이페이지',
  MYLOG: '마이로그',
  COLLECTIONS: '마이컬렉션',
  AUTH_CALLBACK: '로그인 콜백',
};

export const ROUTE_META: Partial<
  Record<(typeof ROUTES)[keyof typeof ROUTES], { name: string }>
> = {
  [ROUTES.HOME]: { name: ROUTES_NAME.HOME },
  [ROUTES.LOGIN]: { name: ROUTES_NAME.LOGIN },
  [ROUTES.SIGNUP]: { name: ROUTES_NAME.SIGNUP },
  [ROUTES.MISSIONS]: { name: ROUTES_NAME.MISSIONS },
  [ROUTES.MYPAGE]: { name: ROUTES_NAME.MYPAGE },
  [ROUTES.MYLOG]: { name: ROUTES_NAME.MYLOG },
  [ROUTES.COLLECTIONS]: { name: ROUTES_NAME.COLLECTIONS },
  [ROUTES.AUTH_CALLBACK]: { name: ROUTES_NAME.AUTH_CALLBACK },
};
