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

  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === '' || value === 'all') {
      params.delete(key); // 전체를 선택할 경우 value가 "" 이고 params에서 삭제한다.
    } else {
      params.set(key, value);
    }

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
