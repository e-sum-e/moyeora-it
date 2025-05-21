import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";

/** 임시 데이터 */
const MOCK_DATA = Array.from({ length: 100 }, (_, i) => i);

/** 데이터 가져오는 임시 함수 */
const fetchData = async (
  requestUrl: string,
  cursor: number,
  size: number = 10
) => {
  const nextCursor = cursor + size;

  return {
    data: {
      items: MOCK_DATA.slice(cursor + 1, nextCursor + 1),
      cursor: nextCursor,
      hasNext: nextCursor + 1 < MOCK_DATA.length,
    },
  };
};

const fetchPage: (
  requestUrl: string,
  prevCursor: number,
  size?: number
) => Promise<{
  hasNext: boolean;
  cursor: number;
  items: number[];
}> = async (requestUrl, prevCursor, size = 10) => {
  const {
    data: { hasNext, cursor, items },
  } = await fetchData(requestUrl, prevCursor, size);

  return {
    hasNext,
    cursor,
    items,
  };
};

type UseInfiniteScrollProps = {
  queryKey: string[];
  size?: number;
  target: React.RefObject<HTMLElement | null>;
  requestUrl: string;
};

export const useInfiniteScroll = ({
  queryKey,
  size,
  target,
  requestUrl,
}: UseInfiniteScrollProps) => {
  const { data, isFetchingNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => fetchPage(requestUrl, pageParam, size),
    initialPageParam: -1,
    getNextPageParam: (lastPage) => lastPage.cursor,
  });

  const [observe, unobserve] = useIntersectionObserver(fetchNextPage);

  const items = useMemo(() => {
    return data?.pages.map((page) => page.items).flat() ?? [];
  }, [data?.pages.length]);

  useEffect(() => {
    if (!target.current) return;

    // 중복 호출 방지를 위해 요청 중에는 감시 제거
    if (isFetchingNextPage) unobserve(target.current);
    else observe(target.current);
  }, [isFetchingNextPage]);

  useEffect(() => {
    // 더 이상 받아올 데이터가 없으면 감시 제거
    if (target.current && data?.pages.at(-1)?.hasNext === false) {
      unobserve(target.current);
    }
  }, [data?.pages.length]);

  return { items };
};
