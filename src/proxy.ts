import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { COOKIES } from '@/shared/config/cookies';
import { ROUTES } from '@/shared/config/routes';

const ACCESS_TOKEN_COOKIE = COOKIES.ACCESS_TOKEN;

const PROTECTED_ROUTES = [
  ROUTES.MISSIONS,
  ROUTES.MYPAGE,
  ROUTES.MYLOG,
  ROUTES.COLLECTIONS,
];
const AUTH_ROUTES = [ROUTES.LOGIN, ROUTES.SIGNUP];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasAccessToken = request.cookies.has(ACCESS_TOKEN_COOKIE);

  const isProtectedRoute = PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (isProtectedRoute && !hasAccessToken) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
  }

  if (isAuthRoute && hasAccessToken) {
    return NextResponse.redirect(new URL(ROUTES.MISSIONS, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|woff|woff2|css|js|json)).*)',
  ],
};
