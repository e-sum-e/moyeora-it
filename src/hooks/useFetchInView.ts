import { FetchNextPageOptions } from '@tanstack/react-query';
import { useEffect } from 'react';
import { IntersectionOptions, useInView } from 'react-intersection-observer';

export const useFetchInView = ({
  fetchNextPage,
  options,
  isLoading,
}: {
  fetchNextPage: (options?: FetchNextPageOptions) => void;
  options?: IntersectionOptions;
  isLoading?: boolean;
}) => {
  const { ref, inView } = useInView({ ...options });

  useEffect(() => {
    if (inView && !isLoading) {
      fetchNextPage();
    }
    // eslint-disable-next-line
  }, [inView, isLoading]);

  return { ref };
};
