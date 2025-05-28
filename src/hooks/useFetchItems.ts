import { request } from '@/api/request';
import {
  InfiniteData,
  useSuspenseInfiniteQuery,
  UseSuspenseInfiniteQueryOptions,
} from '@tanstack/react-query';

type Page<T> = {
  items: T[];
  hasNext: boolean;
  cursor: number | null;
};

export const useFetchItems = <T>({
  url,
  queryParams = {},
  options = {},
}: {
  url: string;
  queryParams?: Record<string, string | number>;
  options?: Partial<
    UseSuspenseInfiniteQueryOptions<Page<T>, Error, InfiniteData<Page<T>>>
  >;
}) => {
  return useSuspenseInfiniteQuery<Page<T>, Error, InfiniteData<Page<T>>>({
    queryKey: ['items', url, queryParams ?? {}],
    queryFn: async ({ pageParam }): Promise<Page<T>> =>
      request.get(url, {
        ...queryParams,
        cursor: pageParam as number | string,
      }),
    initialPageParam: 0,
    getNextPageParam(lastPage) {
      return lastPage.hasNext ? lastPage.cursor : null;
    },
    ...options,
  });
};
