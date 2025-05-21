import { useEffect } from 'react';
import { FetchNextPageOptions } from '@tanstack/react-query';
import { useInView, IntersectionOptions } from 'react-intersection-observer';

export const useInfiniteScroll = ({
  fetchNextPage,
  options,
}: {
  fetchNextPage: (options?: FetchNextPageOptions) => void;
  options?: IntersectionOptions;
}) => {
  const { ref, inView } = useInView({ ...options });
  console.log(inView);
  
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return { ref };
};