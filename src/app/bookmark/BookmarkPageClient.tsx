'use client';

import { Tab, TabType } from '@/components/molecules/tab';
import {
  BookmarkCard,
  ContentInfo,
} from '@/components/organisms/bookmark-card';
import { Empty } from '@/components/organisms/empty';
import { setLocalBookmarkItems } from '@/features/bookmark';
import { useFetchInView } from '@/hooks/useFetchInView';
import { useFetchItems } from '@/hooks/useFetchItems';
import useAuthStore from '@/stores/useAuthStore';
import { GroupType } from '@/types';
import flattenPages from '@/utils/flattenPages';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const CURSOR_SIZE = 10;

export function BookmarkPageClient() {
  const user = useAuthStore((state) => state.user);
  const tabList: TabType[] = [
    { value: '', label: '모든 그룹' },
    { value: GroupType.STUDY, label: '스터디' },
    { value: GroupType.PROJECT, label: '프로젝트' },
  ];

  // 쿼리 파라미터는 state로 관리
  const [queryParams, setQueryParams] = useState({
    size: CURSOR_SIZE,
    cursor: 0,
    sort: 'createdAt',
    order: 'desc',
  });

  //ISSUE: 일단 전체 그룹 데이터 가져오기
  const { data, isLoading, isError, fetchNextPage } =
    useFetchItems<ContentInfo>({
      url: '/v2/groups',
      queryParams,
      options: {
        staleTime: 1000 * 30,
        gcTime: 1000 * 60 * 30,
        refetchOnWindowFocus: true,
      },
    });

  const { ref } = useFetchInView({
    fetchNextPage,
    options: {
      rootMargin: '50px',
    },
    isLoading,
  });

  // 데이터 가공
  const items = flattenPages(data.pages);
  const [bookmarkItems, setBookmarkItems] = useState<ContentInfo[]>([]);

  useEffect(() => {
    if (!user) {
      const processedItems = setLocalBookmarkItems(items).filter(
        (item) => item.isBookmark,
      );
      setBookmarkItems(processedItems);
    } else {
      // 서버에서 가져온 데이터 중 찜한 데이터만 가져오기
      const processedItems = items.filter((item) => item.isBookmark);
      setBookmarkItems(processedItems);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // 탭 변경 핸들러
  const handleValueChange = (value: GroupType) => {
    setQueryParams((prev) => ({
      ...prev,
      type: `bookmark,${value}`,
    }));
  };

  return (
    <div>
      <section className="flex flex-row gap-4 mb-8 w-full">
        <Image
          src="/logos/logo-img.svg"
          alt="모여라-IT"
          width={50}
          height={50}
        />
        <div className="flex flex-col gap-2 justify-center">
          <h2 className="text-xl font-bold">찜한 그룹</h2>
          <p className="text-gray-600">마감되기 전에 지금 바로 참여해보세요!</p>
        </div>
      </section>
      <main>
        <Tab tabList={tabList} onValueChange={handleValueChange}>
          <div className="flex flex-col gap-4">
            {isError && <div>에러가 발생했습니다.</div>}
            {isLoading && <div>로딩 중...</div>}
            {bookmarkItems.length === 0 ? (
              <Empty
                mainText="아직 찜한 프로젝트가 없어요."
                subText="관심있는 프로젝트를 찜해보세요!"
                className="mt-[100px]"
              />
            ) : (
              bookmarkItems.map((item: ContentInfo, index: number) => (
                <div
                  key={item.id}
                  ref={index === bookmarkItems.length - 1 ? ref : undefined}
                >
                  <BookmarkCard info={item} />
                </div>
              ))
            )}
          </div>
        </Tab>
      </main>
    </div>
  );
}
