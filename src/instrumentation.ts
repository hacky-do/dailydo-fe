import * as Sentry from '@sentry/nextjs';

export async function register() {
  // 현재 실행 환경이 'Node.js 런타임'인지 확인
  // (예: 서버 컴포넌트(RSC), 일반적인 Route Handler, 서버 액션 실행 시)
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // 서버 환경에서 Sentry를 초기화
    await import('../sentry.server.config');
  }
  // Edge 환경에서 실행될 때
  // (예: Middleware 실행 시, 또는 Route Handler 상단에 'export const runtime = "edge"'를 명시한 경우)
  if (process.env.NEXT_RUNTIME === 'edge') {
    // Edge 환경에서 Sentry를 초기화
    await import('../sentry.edge.config');
  }
}

// onRequestError: Next.js 서버에서 에러 발생 시 실행됨
// 현재는 발생한 에러를 Sentry로 넘김
export const onRequestError = Sentry.captureRequestError;
