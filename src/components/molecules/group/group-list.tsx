'use client';

import { GroupCard } from '@/components/molecules/group/group-card';
import { getBookmarkList } from '@/features/bookmark';
import { useFetchInView } from '@/hooks/useFetchInView';
import { useFetchItems } from '@/hooks/useFetchItems';
import useAuthStore from '@/stores/useAuthStore';
import { Group } from '@/types';
import { Position, Skill } from '@/types/enums';
import flattenPages from '@/utils/flattenPages';
import { useEffect, useState } from 'react';

enum EMPTY_INFO_MESSAGE {
  EMPTY_INITIAL = '생성된 그룹이 없습니다',
  SEARCH = '검색 결과가 없습니다',
  FILTER = '조건에 해당하는 그룹이 없습니다.',
}

type GroupListProps = {
  queryParams: {
    type: string;
    skills: Skill;
    position: Position;
    sort: string;
    order: string;
    cursor: string | number;
    search: string;
  };
};

export const GroupList = ({ queryParams }: GroupListProps) => {
  const [isEmptyItems, setIsEmptyItems] = useState(true);
  const [emptyInfoMessage, setEmptyInfoMessage] =
    useState<EMPTY_INFO_MESSAGE | null>(null);
  const [displayItems, setDisplayItems] = useState<Group[]>([]); //북마크 처리

  const user = useAuthStore((state) => state.user);

  const { data, fetchNextPage, hasNextPage, isLoading } = useFetchItems<Group>({
    url: '/v2/groups',
    queryParams: { ...queryParams, size: 10 },
  });
  const { ref } = useFetchInView({
    fetchNextPage,
    isLoading,
    options: {
      rootMargin: '50px',
    },
  });

  const items = flattenPages(data.pages);

  // useEffect(() => {
  //   console.log('✅ Hydrated data from client:', queryParams); // DEV : 💡 서버 컴포넌트에서 prefetch 하는지 확인용
  // }, [queryParams]);

  useEffect(() => {
    if (items.length === 0) {
      // 받아온 데이터가 없는 경우
      setIsEmptyItems(true);
      if (queryParams.search) {
        // 검색어가 있다면 검색어를 우선으로 메시지 설정
        setEmptyInfoMessage(EMPTY_INFO_MESSAGE.SEARCH);
        return;
      } else if (
        queryParams.type ||
        queryParams.skills ||
        queryParams.position
      ) {
        setEmptyInfoMessage(EMPTY_INFO_MESSAGE.FILTER);
        return;
      }
      setEmptyInfoMessage(EMPTY_INFO_MESSAGE.EMPTY_INITIAL); // 받아온 데이터는 없지만 필터도 없는 경우(아직 생성된 그룹이 하나도 없을 경우)
      return;
    }
    setEmptyInfoMessage(null);
    setIsEmptyItems(false);
  }, [queryParams, items.length]);

  useEffect(() => {
    if (!user) {
      const bookmark = getBookmarkList();
      const processedItems = flattenPages(data.pages).map((item) => ({
        ...item,
        isBookmark: bookmark.includes(item.id),
      }));
      setDisplayItems(processedItems);
    } else {
      setDisplayItems(flattenPages(data.pages));
    }
  }, [data.pages, user]);

  return (
    <>
      {isEmptyItems && emptyInfoMessage !== null ? (
        <div>{emptyInfoMessage}</div>
      ) : (
        <ul className="flex flex-col gap-3 mt-8 md:flex-row md:flex-wrap md:gap-6 md:justify-center">
          {displayItems.map((group) => (
            <GroupCard key={group.id} item={group} />
          ))}
        </ul>
      )}
      {hasNextPage && <div ref={ref}></div>}
    </>
  );
};
