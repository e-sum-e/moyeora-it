'use client';

import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { ErrorFallback } from '@/components/error-fallback';

type QueryErrorBoundaryProps = {
  children: React.ReactNode;
};

/**
 * 쿼리 에러 바운더리
 *
 * useSuspenseQuery, useSuspenseInfiniteQuery 사용하는 경우
 * 에러가 발생한 후 에러를 초기화할 때 쿼리의 에러 상태도 초기화해야 한다.
 *
 *
 * @param children 자식 컴포넌트
 * @returns 쿼리 에러 바운더리
 */
export const QueryErrorBoundary = ({ children }: QueryErrorBoundaryProps) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          fallback={({ error, resetErrorBoundary }) => (
            <ErrorFallback
              error={error}
              resetErrorBoundary={resetErrorBoundary}
            >
              {children}
            </ErrorFallback>
          )}
          onReset={reset}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};
