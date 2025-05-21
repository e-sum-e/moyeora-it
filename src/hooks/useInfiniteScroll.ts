import { useEffect } from 'react';
import { useInView, IntersectionOptions } from 'react-intersection-observer';

export const useInfiniteScroll = ({
  fetchNextPage,
  hasNext,
  options,
  isFetchingNextPage,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetchNextPage: (...args: any[]) => void;
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