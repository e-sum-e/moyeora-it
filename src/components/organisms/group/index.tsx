'use client';

import { Filter } from '@/components/molecules/group/filter';
import { GroupCard } from '@/components/molecules/group/group-card';
import { SortOrder } from '@/components/molecules/group/sort-order';
import { TypeTab } from '@/components/molecules/group/type-tab';
import { SearchInput } from '@/components/molecules/search-input/search-input';
import { useFetchItems } from '@/hooks/useFetchItems';
import { Group } from '@/types';
import { Position, Skill } from '@/types/enums';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export const GroupList = () => {
  const searchParams = useSearchParams();

  const router = useRouter();

  /**
   * router.push를 수행하는 함수
   * @param queries 여러 query key를 한번에 업데이트 할 수 있기 때문에 인자를 Record 타입으로 받는다
   */
  const updateQuery = (queries: Record<string, string>) => {
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

  const queryParams = useMemo(() => {
    // searchParams의 변화를 감지하고 실행되어야 useFetchItems의 queryParams에 다른 값을 넣어서 queryKey를 변경할 수 있음
    return {
      type: searchParams.get('type') ?? '',
      skill: Skill[searchParams.get('skill') as keyof typeof Skill] ?? '',
      position:
        Position[searchParams.get('position') as keyof typeof Position] ?? '',
      sort: searchParams.get('sort') ?? 'createdAt',
      order: searchParams.get('order') ?? 'desc',
      search: searchParams.get('search') ?? '',
    };
  }, [searchParams]);

  const { data } = useFetchItems<Group>({
    url: '/groups',
    queryParams,
  });

  return (
    <>
      <TypeTab updateQuery={updateQuery} />
      <Filter updateQuery={updateQuery} />
      <SortOrder updateQuery={updateQuery} />
      <SearchInput />
      <ul>
        {data.pages
          .flatMap((page) => page.items)
          .map((item) => (
            <GroupCard key={item.id} item={item} />
          ))}
      </ul>
    </>
  );
};
