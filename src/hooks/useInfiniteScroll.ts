import { QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useState } from 'react';

type ResponseError = {
  code: number;
  message: string;
};

type InfiniteResponse<T> = {
  items: T[];
  hasNext: boolean;
  cursor: number;
  responseError?: ResponseError;
};

type UseInfiniteScrollProps<T> = {
  observerElement: React.RefObject<Element | null>;
  queryKey: string;
  queryFn: (
    context: QueryFunctionContext<string[], number | null>,
  ) => Promise<InfiniteResponse<T>>;
  initialData?: InfiniteResponse<T>;
};

export const useInfiniteScroll = <T>({
  observerElement,
  queryKey,
  queryFn,
  initialData,
}: UseInfiniteScrollProps<T>) => {
  const {
    data,
    error, // react-query 내부 에러
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: [queryKey],
    queryFn,
    initialPageParam: null,
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.cursor : null),
    initialData: initialData
      ? {
          pages: [initialData],
          pageParams: [null],
        }
      : undefined,
  });

  // 에러 케이스
  const [hasReactQueryError, setHasReactQueryError] = useState(false);

  useEffect(() => {
    if (error) {
      setHasReactQueryError(true);
    }
  }, [error]);

  const foundResponseError = data?.pages.find(
    (page) => page.responseError !== undefined,
  )?.responseError;

  const hasError = useMemo(() => {
    return status === 'error' || !!foundResponseError;
  }, [status, foundResponseError]);

  // Intersection Observer로 무한스크롤 감지
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && !isFetching && hasNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, isFetching, hasNextPage],
  );

  useEffect(() => {
    const element = observerElement.current;
    if (!element) return;

    const option = { threshold: 0 };
    const observer = new IntersectionObserver(handleObserver, option);
    observer.observe(element);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, handleObserver, observerElement]);

  return {
    data,
    isFetching,
    isFetchingNextPage,
    hasReactQueryError,
    hasError,
  };
};
