import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { request } from '@/api/request';

export const useFetchItems = ({
  url,
  queryParams,
}: {
  url: string;
  queryParams?: Record<string, string | number>;
}) => {
  return useSuspenseInfiniteQuery({
    queryKey: ['items', url, queryParams ?? {}],
    queryFn: queryParams
      ? () => request.get(url, queryParams)
      : () => request.get(url),
    initialPageParam: 0,
    getNextPageParam(lastPage) {
      return lastPage.hasNext ? lastPage.cursor : null;
    },
  });
};
