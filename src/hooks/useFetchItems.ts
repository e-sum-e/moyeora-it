import { request } from '@/api/request';
import { Page } from '@/utils/flattenPages';
import {
  InfiniteData,
  useSuspenseInfiniteQuery,
  UseSuspenseInfiniteQueryOptions,
} from '@tanstack/react-query';

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
  const isCursorNull = queryParams.order === 'desc';

  return useSuspenseInfiniteQuery<Page<T>, Error, InfiniteData<Page<T>>>({
    queryKey: ['items', url, queryParams ?? {}],
    queryFn: async ({ pageParam }): Promise<Page<T>> =>
      request.get(
        url,
        {
          ...queryParams,
          cursor: isCursorNull ? 'null' : (pageParam as number | string),
        },
        { credentials: 'include' },
      ),
    initialPageParam: 0,
    getNextPageParam(lastPage) {
      return lastPage.hasNext ? lastPage.cursor : null;
    },
    ...options,
  });
};
