'use client';

import { Filter } from '@/components/molecules/group/filter';
import { GroupCard } from '@/components/molecules/group/group-card';
import { SortOrder } from '@/components/molecules/group/sort-order';
import { TypeTab } from '@/components/molecules/group/type-tab';
import { SearchInput } from '@/components/molecules/search-input/search-input';
import { useFetchItems } from '@/hooks/useFetchItems';
import {
  Group,
  GroupSort,
  GroupType,
  Order,
  PositionName,
  SkillName,
} from '@/types';
import { Position, Skill } from '@/types/enums';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';

export const GroupList = () => {
  const searchParams = useSearchParams();

  const initialParams = useMemo(() => {
    return {
      type: (searchParams.get('type') ?? 'all') as GroupType,
      skill: (searchParams.get('skill') ?? '') as SkillName,
      position: (searchParams.get('position') ?? '') as PositionName,
      sort: (searchParams.get('sort') ?? 'createdAt') as GroupSort,
      order: (searchParams.get('order') ?? 'desc') as Order,
      search: (searchParams.get('search') ?? '') as string,
    };
  }, [searchParams]);

  const [selectedType, setSelectedType] = useState<GroupType>(
    initialParams.type,
  );
  const [selectedSkill, setSelectedSkill] = useState<SkillName>(
    initialParams.skill,
  );
  const [selectedPosition, setSelectedPosition] = useState<PositionName>(
    initialParams.position,
  );
  const [selectedSort, setSelecteSort] = useState<GroupSort>(
    initialParams.sort,
  );
  const [selectedOrder, setSelectedOrder] = useState<Order>(
    initialParams.order,
  );

  const router = useRouter();

  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === '') {
      params.delete(key); // 전체를 선택할 경우 value가 "" 이고 params에서 삭제한다.
    } else {
      params.set(key, value);
    }

    router.push(`?${params.toString()}`);
  };

  const { data } = useFetchItems<Group>({
    url: '/groups',
    queryParams: {
      type: selectedType !== 'all' ? selectedType : '',
      skill: Skill[selectedSkill as keyof typeof Skill] ?? '',
      position: Position[selectedPosition as keyof typeof Position] ?? '',
      sort: selectedSort,
      order: selectedOrder,
      search: searchParams.get('search') ?? '',
    },
  });

  const selectType = (currentType: GroupType) => {
    setSelectedType(currentType);
    updateQuery('type', currentType);
  };

  const selectSkill = (currentSkill: SkillName) => {
    setSelectedSkill(currentSkill);
    updateQuery('skill', currentSkill);
  };

  const selectPosition = (currentPosition: PositionName) => {
    setSelectedPosition(currentPosition);
    updateQuery('position', currentPosition);
  };

  const selectSort = (currentSort: GroupSort) => {
    setSelecteSort(currentSort);
    updateQuery('sort', currentSort);
  };

  const selectOrder = (currentOrder: Order) => {
    setSelectedOrder(currentOrder);
    updateQuery('order', currentOrder);
  };

  return (
    <>
      <TypeTab selectedType={selectedType} selectType={selectType} />
      <Filter selectSkill={selectSkill} selectPosition={selectPosition} />
      <SortOrder
        selectedSort={selectedSort}
        selectedOrder={selectedOrder}
        selectSort={selectSort}
        selectOrder={selectOrder}
      />
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
