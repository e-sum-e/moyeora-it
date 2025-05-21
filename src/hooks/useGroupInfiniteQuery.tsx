import { groupFetch } from '@/lib/api';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useGroupInfiniteQuery = (
  size: number = 10,
  cursor: number = 0,
) => {
  return useInfiniteQuery({
    queryKey: ['group'],
    initialPageParam: cursor,
    queryFn: ({ pageParam }) => groupFetch(size, pageParam),
    getNextPageParam: (lastPage: { hasNext: boolean; cursor: number }) =>
      lastPage.hasNext ? lastPage.cursor : undefined,
  });
};
