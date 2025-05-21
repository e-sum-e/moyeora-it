'use client';

import { BookmarkCard } from '@/components/organisms/bookmark-card';
import { useGroupInfiniteQuery } from '@/hooks/useGroupInfiniteQuery';
import { useInView } from '@/hooks/useInView';
import { usePreventDoubleClick } from '@/hooks/usePreventDoubleClick';
import { useState, useEffect, useCallback } from 'react';

//TODO: 윤아님 작업 후 연결 필요!
export default function BookmarkPage() {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGroupInfiniteQuery(10, 0);
  const [items, setItems] = useState([]);


  useEffect(() => {
    if (data) {
      const items = data.pages.flatMap((page) => page.items);
      setItems(items);
    }
  }, [data]);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isLoading && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isLoading, isFetchingNextPage, fetchNextPage]);

  const loadMoreItems = useInView(handleLoadMore, {
    threshold: 0.5,
    rootMargin: '100px',
  });

  if (isError) {
    return <div>에러가 발생했습니다.</div>;
  }

  const handlePreventDoubleClick = usePreventDoubleClick(() =>
    console.log('clicked'),
  );

  return (
    <div>
      <h2 onClick={handlePreventDoubleClick}>찜한 그룹</h2>
      <p>마감되기 전에 지금 바로 참여해보세요!</p>
      
      <main>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <div key={item.id} ref={isLast ? loadMoreItems : null}>
              <BookmarkCard />
            </div>
          );
        })}
        {isLoading && <div>로딩 중...</div>}
      </main>
    </div>
  );
}
