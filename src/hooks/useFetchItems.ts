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
  return useSuspenseInfiniteQuery<Page<T>, Error, InfiniteData<Page<T>>>({
    queryKey: ['items', url, queryParams ?? {}],
    queryFn: async ({ pageParam }): Promise<Page<T>> =>
      request.get(
        url,
        {
          cursor: pageParam as number | string,
          ...queryParams, // groups -> order=desc일 경우 cursor=null로 덮어써주기 위해 cursor 다음에 위치
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
