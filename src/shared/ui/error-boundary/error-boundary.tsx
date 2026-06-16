'use client';

import { Component, ErrorInfo, ReactNode } from 'react';

import { FallbackUI } from '../fallback-ui';

/**
 * @example 기본 사용
 * <ErrorBoundary>
 *   <SomeComponent />
 * </ErrorBoundary>
 *
 * @example 커스텀 fallback UI
 * <ErrorBoundary fallback={<p>오류가 발생했습니다.</p>}>
 *   <SomeComponent />
 * </ErrorBoundary>
 *
 * @example 에러 후 상태 초기화 콜백
 * <ErrorBoundary onReset={() => refetch()}>
 *   <SomeComponent />
 * </ErrorBoundary>
 */
interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false });
    this.props.onReset?.();
  };

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <FallbackUI onReset={this.handleReset} />;
    }
    return this.props.children;
  }
}
