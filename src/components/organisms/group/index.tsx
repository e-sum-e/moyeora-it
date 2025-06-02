'use client';

import { Filter } from '@/components/molecules/group/filter';
import { GroupCard } from '@/components/molecules/group/group-card';
import { SortOrder } from '@/components/molecules/group/sort-order';
import { SearchInput } from '@/components/molecules/search-input/search-input';
import { Tab, TabType } from '@/components/molecules/tab';
import { useFetchInView } from '@/hooks/useFetchInView';
import { useFetchItems } from '@/hooks/useFetchItems';
import { Group, GroupType } from '@/types';
import { Position, Skill } from '@/types/enums';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

type GroupListProps = {
  searchParams: Record<string, string | undefined>;
};

export const GroupList = ({ searchParams }: GroupListProps) => {
  const tabList: TabType[] = [
    { value: '', label: '모든 그룹' },
    { value: GroupType.STUDY, label: '스터디' },
    { value: GroupType.PROJECT, label: '프로젝트' },
  ];
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
        // 이미 선택한 값이면 삭제
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

  const { ref } = useFetchInView({
    fetchNextPage,
    isLoading,
    options: {
      rootMargin: '50px',
    },
  });

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
        <ul>
          {data.pages
            .flatMap((page) => page.items)
            .map((item) => (
              <GroupCard key={item.id} item={item} />
            ))}
        </ul>
      </Tab>
      {hasNextPage && <div ref={ref}></div>}
    </>
  );
};
