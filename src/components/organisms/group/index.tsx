'use client';

import { Filter } from '@/components/molecules/group/filter';
import { GroupCard } from '@/components/molecules/group/group-card';
import { SortOrder } from '@/components/molecules/group/sort-order';
import { TypeTab } from '@/components/molecules/group/type-tab';
import { SearchInput } from '@/components/molecules/search-input/search-input';
import { useFetchInView } from '@/hooks/useFetchInView';
import { useFetchItems } from '@/hooks/useFetchItems';
import { Group } from '@/types';
import { Position, Skill } from '@/types/enums';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

type GroupListProps = {
  searchParams: Record<string, string | undefined>;
};

export const GroupList = ({ searchParams }: GroupListProps) => {
  const router = useRouter();

  /**
   * router.push를 수행하는 함수
   * @param queries 여러 query key를 한번에 업데이트 할 수 있기 때문에 인자를 Record 타입으로 받는다
   */
  const updateQueryParams = (queries: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(queries).forEach(([key, value]) => {
      const prevValue = params.get(key);

      if (value === '' || value === 'all') {
        // 전체를 선택한 경우 params에서 삭제
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
      <TypeTab updateQueryParams={updateQueryParams} />
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
      {hasNextPage && <div ref={ref}></div>}
    </>
  );
};
