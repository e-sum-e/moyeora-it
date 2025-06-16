'use client';

import { Filter } from '@/components/molecules/group/filter';
import { GroupList } from '@/components/molecules/group/group-list';
import { SortOrder } from '@/components/molecules/group/sort-order';
import { SearchInput } from '@/components/molecules/search-input/search-input';
import { Tab, TabType } from '@/components/molecules/tab';
import { GroupType } from '@/types';
import { Position, Skill } from '@/types/enums';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { Loading } from '../loading';

type GroupListProps = {
  searchParams: Record<string, string | undefined>;
};

const tabList: TabType[] = [
  { value: '', label: '모든 그룹' },
  { value: GroupType.STUDY, label: '스터디' },
  { value: GroupType.PROJECT, label: '프로젝트' },
];

export const Groups = ({ searchParams }: GroupListProps) => {
  const router = useRouter();
  /*
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
      if (value === '' || value === 'all' || value === 'null') {
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

  const queryParams = {
    type: searchParams.type ?? '',
    skills: Skill[searchParams.skill as keyof typeof Skill] ?? '',
    position: Position[searchParams.position as keyof typeof Position] ?? '',
    sort: searchParams.sort ?? 'createdAt',
    order: searchParams.order ?? 'desc',
    search: searchParams.search ?? '',
    ...(searchParams.order === 'desc' || !searchParams.order
      ? { cursor: 'null' }
      : {}),
  };

  return (
    <>
      <Tab
        tabList={tabList}
        onValueChange={(value) => updateQueryParams({ type: value })}
      >
        <div className="flex justify-start ">
          <Filter updateQueryParams={updateQueryParams} />
          <SortOrder updateQueryParams={updateQueryParams} />
        </div>
        <SearchInput />
        <Suspense
          fallback={
            <div>
              <Loading />
            </div>
          }
        >
          <GroupList queryParams={queryParams} />
        </Suspense>
      </Tab>
    </>
  );
};
