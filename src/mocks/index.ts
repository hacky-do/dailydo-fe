export async function initMocks() {
  if (process.env.NODE_ENV !== 'development' && process.env.MSW_ENV !== 'true')
    return;
  if (typeof window === 'undefined') {
    // 서버 사이드
    const { server } = await import('./server');
    server.listen({ onUnhandledRequest: 'bypass' });
  } else {
    // 클라이언트 사이드
    const { worker } = await import('./browser');
    await worker.start({ onUnhandledRequest: 'bypass' });
  }
}
