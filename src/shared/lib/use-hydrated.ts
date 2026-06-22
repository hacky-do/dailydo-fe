'use client';

import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

/**
 * 클라이언트 하이드레이션이 끝난 뒤에만 true를 반환한다.
 * persist 스토어처럼 클라이언트에만 존재하는 값을 SSR 마크업과
 * 어긋나지 않게 렌더하려 할 때 게이트로 사용한다.
 */
export const useHydrated = () =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
