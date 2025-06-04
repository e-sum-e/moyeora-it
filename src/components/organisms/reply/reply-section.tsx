'use client';

import { ErrorBoundary } from '@/components/error-boundary';
import { handleError } from '@/components/error-boundary/error-handler';
import { ReplyList } from './reply-list';

export const ReplySection = () => {
  return (
    <ErrorBoundary
      fallback={({ error, resetErrorBoundary }) =>
        handleError({
          error,
          resetErrorBoundary,
          defaultMessage: '댓글을 불러오는 중 문제가 발생했습니다',
        })
      }
    >
      <ReplyList />
    </ErrorBoundary>
  );
};
