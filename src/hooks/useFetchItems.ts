import { useSuspenseInfiniteQuery, UseSuspenseInfiniteQueryOptions } from '@tanstack/react-query';
import { request } from '@/api/request';

type Page = {
  items: unknown[];
  hasNext: boolean;
  cursor: number;
};

export const useFetchItems = ({
  url,
  queryParams,
  options = {}
}: {
  url: string;
  queryParams: Record<string, string | number>;
  options?: Partial<UseSuspenseInfiniteQueryOptions<Page, Error>>;
}) => {
  return useSuspenseInfiniteQuery({
    queryKey: ['items', url, queryParams],
    queryFn: () => request.get(url, queryParams),
    initialPageParam: 0,
    getNextPageParam(lastPage) {
      return lastPage.hasNext ? lastPage.cursor : null;
    },
    ...options,
  });
};
