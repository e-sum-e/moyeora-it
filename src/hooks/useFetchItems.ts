import { request } from '@/api/request';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

export const useFetchItems = <T>({
  url,
  queryParams = {},
}: {
  url: string;
  queryParams?: Record<string, string | number>;
}) => {
  return useSuspenseInfiniteQuery<{
    items: T[];
    cursor: number | null;
    hasNext: boolean;
  }>({
    queryKey: ['items', url, queryParams ?? {}],
    queryFn: ({ pageParam }) =>
      request.get(url, {
        ...queryParams,
        cursor: pageParam as number | string,
      }),
    initialPageParam: 0,
    getNextPageParam(lastPage) {
      return lastPage.hasNext ? lastPage.cursor : null;
    },
    staleTime: 0,
  });
};
