'use client';

import { BookmarkCard, ContentInfo } from '@/components/organisms/bookmark-card';
import { useState } from 'react';
import { useFetchItems } from '@/hooks/useFetchItems';
import { Tab, TabType } from '@/components/molecules/tab';
import { GroupType } from '@/types';
import { useFetchInView } from '@/hooks/useFetchInView';
export default function BookmarkPage() {

  const tabList: TabType[] = [
    { value: GroupType.ALL, label: '모든 그룹' },
    { value: GroupType.STUDY, label: '스터디'},
    { value: GroupType.PROJECT, label: '프로젝트' },
  ];

  // 쿼리 파라미터는 state로 관리
  const [queryParams, setQueryParams] = useState({
    size: 10,
    cursor: 0,
    type: 'bookmark,all',
  });

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
  } = useFetchItems<ContentInfo>({ 
    url: '/groups', 
    queryParams,
    options: { //TODO: 캐시 전략 좀 더 고민필요
      staleTime: 1000 * 30, // 30초 동안 데이터를 fresh 상태로 유지
      gcTime: 1000 * 60 * 30, // 30분 동안 캐시 유지
      refetchOnWindowFocus: true,
    }
  });

  const { ref } = useFetchInView({
    fetchNextPage,
    options: {
      rootMargin: '50px',
    },
    isLoading
  });

  // 데이터 가공
  const items = data ? data.pages.flatMap((page) => page.items) : [];

  // 탭 변경 핸들러
  const handleValueChange = (value: GroupType) => {
    
    setQueryParams((prev) => ({
      ...prev,
      type: `bookmark,${value}`,
    }));

  };

  return (
    <div>
      <h2>찜한 그룹</h2>
      <p>마감되기 전에 지금 바로 참여해보세요!</p>
      <main>
        <Tab tabList={tabList} onValueChange={handleValueChange}
        >
          <div className="flex flex-col gap-4">
          {isError && <div>에러가 발생했습니다.</div>}
          {isLoading && <div>로딩 중...</div>}
          {items.map((item: ContentInfo, index: number) => (
            <div key={item.id} ref={index === items.length - 1 ? ref : undefined}>
              <BookmarkCard info={item} />
            </div>
          ))}
          </div>
        </Tab>
      </main>
    </div>
  );
}
