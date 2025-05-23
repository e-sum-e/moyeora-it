import { useEffect } from 'react';
import { FetchNextPageOptions } from '@tanstack/react-query';
import { useInView, IntersectionOptions } from 'react-intersection-observer';

export const useFetchInView = ({
  fetchNextPage,
  options,
  isLoading
}: {
  fetchNextPage: (options?: FetchNextPageOptions) => void;
  options?: IntersectionOptions;
  isLoading: boolean;
}) => {
  const { ref, inView } = useInView({ ...options });
  
  useEffect(() => {
    if (inView && !isLoading) {
      fetchNextPage();
    }
  }, [inView, isLoading]);

  return { ref };
};