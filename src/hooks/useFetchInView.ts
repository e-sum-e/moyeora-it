import { FetchNextPageOptions } from '@tanstack/react-query';
import { useEffect } from 'react';
import { IntersectionOptions, useInView } from 'react-intersection-observer';

export const useFetchInView = ({
  fetchNextPage,
  options,
}: {
  fetchNextPage: (options?: FetchNextPageOptions) => void;
  options?: IntersectionOptions;
}) => {
  const { ref, inView } = useInView({ ...options });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return { ref };
};
