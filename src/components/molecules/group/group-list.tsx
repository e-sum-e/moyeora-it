'use client';

import { GroupCard } from '@/components/molecules/group/group-card';
import { Empty } from '@/components/organisms/empty';
import { useBookmarkItems } from '@/hooks/useBookmarkItems';
import { useFetchInView } from '@/hooks/useFetchInView';
import { useFetchItems } from '@/hooks/useFetchItems';
import { Group } from '@/types';
import { Position, Skill } from '@/types/enums';
import flattenPages from '@/utils/flattenPages';
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';

enum EMPTY_INFO_MESSAGE {
  EMPTY_INITIAL = '생성된 그룹이 없습니다',
  SEARCH = '검색 결과가 없습니다',
  FILTER = '조건에 해당하는 그룹이 없습니다.',
}

type GroupListProps = {
  serverQueryParams: Record<string, string | undefined>;
};

export const GroupList = ({ serverQueryParams }: GroupListProps) => {
  const [isEmptyItems, setIsEmptyItems] = useState(true);
  const [emptyInfoMessage, setEmptyInfoMessage] =
    useState<EMPTY_INFO_MESSAGE | null>(null);

  const queryParams = useMemo(() => {
    return {
      type: serverQueryParams.type ?? '',
      skill: serverQueryParams.skill
        ? serverQueryParams.skill
            .split(',')
            .map((v) => Skill[v as keyof typeof Skill])
            .join(',')
        : '',
      position: serverQueryParams.position
        ? serverQueryParams.position
            .split(',')
            .map((v) => Position[v as keyof typeof Position])
            .join(',')
        : '',
      sort: serverQueryParams.sort ?? 'createdAt',
      order: serverQueryParams.order ?? 'desc',
      search: serverQueryParams.search ?? '',
    };
  }, [
    serverQueryParams.type,
    serverQueryParams.skill,
    serverQueryParams.position,
    serverQueryParams.sort,
    serverQueryParams.order,
    serverQueryParams.search,
  ]);

  const { data, fetchNextPage, hasNextPage, isLoading } = useFetchItems<Group>({
    url: '/v2/groups',
    queryParams: {
      ...queryParams,
      size: 10,
    },
  });

  const { ref } = useFetchInView({
    fetchNextPage,
    isLoading,
    options: {
      rootMargin: '50px',
    },
  });

  const { items, toggleBookmark, setInitialItems } = useBookmarkItems<Group>();

  // 초기 데이터가 들어오면 bookmark 상태 포함하여 아이템 세팅
  useLayoutEffect(() => {
    const flattenItems = flattenPages(data.pages);
    setInitialItems(flattenItems);
  }, [data, items.length, setInitialItems]);

  // 빈 data 처리 로직
  useEffect(() => {
    if (items.length === 0) {
      setIsEmptyItems(true);
      if (queryParams.search) {
        setEmptyInfoMessage(EMPTY_INFO_MESSAGE.SEARCH);
      } else if (
        queryParams.type ||
        queryParams.skill ||
        queryParams.position
      ) {
        setEmptyInfoMessage(EMPTY_INFO_MESSAGE.FILTER);
      } else {
        setEmptyInfoMessage(EMPTY_INFO_MESSAGE.EMPTY_INITIAL);
      }
    } else {
      setIsEmptyItems(false);
      setEmptyInfoMessage(null);
    }
  }, [queryParams, items.length]);

  return (
    <>
      {isEmptyItems && emptyInfoMessage !== null ? (
        <Empty mainText={emptyInfoMessage} subText="" />
      ) : (
        <ul className="flex flex-col gap-3 mt-8 md:flex-row md:flex-wrap md:gap-6 md:justify-center">
          {items.map((group) => (
            <GroupCard
              key={group.id}
              item={group}
              bookmarkToggleHandler={toggleBookmark}
            />
          ))}
        </ul>
      )}
      {hasNextPage && (
        <div className="h-[300px] border-1 border-blue-800" ref={ref}>
          무한스크롤 확인
        </div>
      )}
    </>
  );
};
