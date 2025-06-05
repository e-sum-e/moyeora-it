'use client';

import { ErrorBoundary } from '@/components/error-boundary';
import { handleError } from '@/components/error-boundary/error-handler';
import { Filter } from '@/components/molecules/group/filter';
import { GroupCard } from '@/components/molecules/group/group-card';
import { SortOrder } from '@/components/molecules/group/sort-order';
import { SearchInput } from '@/components/molecules/search-input/search-input';
import { Tab, TabType } from '@/components/molecules/tab';
import { useFetchInView } from '@/hooks/useFetchInView';
import { useFetchItems } from '@/hooks/useFetchItems';
import { Group, GroupType } from '@/types';
import { Position, Skill } from '@/types/enums';
import flattenPages from '@/utils/flattenPages';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

type GroupListProps = {
  searchParams: Record<string, string | undefined>;
};

const tabList: TabType[] = [
  { value: '', label: '모든 그룹' },
  { value: GroupType.STUDY, label: '스터디' },
  { value: GroupType.PROJECT, label: '프로젝트' },
];

enum EMPTY_INFO_MESSAGE {
  EMPTY_INITIAL = '생성된 그룹이 없습니다',
  SEARCH = '검색 결과가 없습니다',
  FILTER = '조건에 해당하는 그룹이 없습니다.',
}

export const GroupList = ({ searchParams }: GroupListProps) => {
  const [isEmptyItems, setIsEmptyItems] = useState(true);
  const [emptyInfoMessage, setEmptyInfoMessage] =
    useState<EMPTY_INFO_MESSAGE | null>(null);
  const router = useRouter();

  /**
   * router.push를 수행하는 함수
   * @param queries 여러 query key를 한번에 업데이트 할 수 있기 때문에 인자를 Record 타입으로 받는다
   */
  const updateQueryParams = (queries: Record<string, string>) => {
    const params = new URLSearchParams();

    // 기존 searchParams를 params에 넣기
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        params.set(key, value);
      }
    });

    // 업데이트할 쿼리 적용
    Object.entries(queries).forEach(([key, value]) => {
      const prevValue = params.get(key);
      if (value === '' || value === 'all') {
        // 전체 선택 시 해당 key 삭제
        params.delete(key);
      } else if (prevValue === value) {
        // 이미 선택한 필터를 다시 선택한 경우 params에서 삭제
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    router.push(`?${params.toString()}`);
  };

  const queryParams = useMemo(
    () => ({
      type: searchParams.type ?? '',
      skill: Skill[searchParams.skill as keyof typeof Skill] ?? '',
      position: Position[searchParams.position as keyof typeof Position] ?? '',
      sort: searchParams.sort ?? 'createdAt',
      order: searchParams.order ?? 'desc',
      search: searchParams.search ?? '',
    }),
    [searchParams],
  );

  const { data, fetchNextPage, hasNextPage, isLoading } = useFetchItems<Group>({
    url: '/groups',
    queryParams: { ...queryParams, size: 10 },
  });

  const items = flattenPages(data.pages);

  const { ref } = useFetchInView({
    fetchNextPage,
    isLoading,
    options: {
      rootMargin: '50px',
    },
  });

  useEffect(() => {
    if (items.length === 0) {
      // 받아온 데이터가 없는 경우
      setIsEmptyItems(true);
      if (searchParams.search) {
        // 검색어가 있다면 검색어를 우선으로 메시지 설정
        setEmptyInfoMessage(EMPTY_INFO_MESSAGE.SEARCH);
        return;
      } else if (
        searchParams.type ||
        searchParams.skill ||
        searchParams.position
      ) {
        setEmptyInfoMessage(EMPTY_INFO_MESSAGE.FILTER);
        return;
      }
      setEmptyInfoMessage(EMPTY_INFO_MESSAGE.EMPTY_INITIAL); // 받아온 데이터는 없지만 필터도 없는 경우(아직 생성된 그룹이 하나도 없을 경우)
      return;
    }
    setEmptyInfoMessage(null);
    setIsEmptyItems(false);
  }, [searchParams, items.length]);

  // useEffect(() => {
  //   console.log('✅ Hydrated data from client:', queryParams); // DEV : 💡 서버 컴포넌트에서 prefetch 하는지 확인용
  // }, [queryParams]);

  return (
    <>
      <Tab
        tabList={tabList}
        onValueChange={(value) => updateQueryParams({ type: value })}
      >
        <Filter updateQueryParams={updateQueryParams} />
        <SortOrder updateQueryParams={updateQueryParams} />
        <SearchInput />
        <ErrorBoundary
          fallback={({ error, resetErrorBoundary }) =>
            handleError({
              error,
              resetErrorBoundary,
              defaultMessage: '알림을 불러오는 중 문제가 발생했습니다',
            })
          }
        >
          {isEmptyItems && emptyInfoMessage !== null ? (
            <div>{emptyInfoMessage}</div>
          ) : (
            <ul>
              {items.map((group) => (
                <GroupCard key={group.id} item={group} />
              ))}
            </ul>
          )}
          {hasNextPage && <div ref={ref}></div>}
        </ErrorBoundary>
      </Tab>
    </>
  );
};
