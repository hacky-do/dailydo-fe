import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { ROUTES } from '@/shared/config/routes';

const ACCESS_TOKEN_COOKIE = 'accessToken';

const PROTECTED_ROUTES = [ROUTES.MISSIONS];
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
  matcher: ['/missions/:path*', '/login', '/signup'],
};
