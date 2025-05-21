import { useEffect } from 'react';
import { FetchNextPageOptions } from '@tanstack/react-query';
import { useInView, IntersectionOptions } from 'react-intersection-observer';

export const useInfiniteScroll = ({
  fetchNextPage,
  hasNext,
  options,
  isFetchingNextPage,
}: {
  fetchNextPage: (options?: FetchNextPageOptions) => void;
  hasNext: boolean;
  options: IntersectionOptions;
  isFetchingNextPage: boolean;
}) => {
  const { ref, inView } = useInView({ ...options });

  useEffect(() => {
    if (inView && hasNext && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNext, isFetchingNextPage, fetchNextPage]);

  return { ref };
};