'use client';

import { Filter } from '@/components/molecules/group/filter';
import { GroupCard } from '@/components/molecules/group/group-card';
import { SortOrder } from '@/components/molecules/group/sort-order';
import { useFetchItems } from '@/hooks/useFetchItems';
import { Group, GroupSort, Order, PositionName, SkillName } from '@/types';
import { Position, Skill } from '@/types/enums';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export const GroupList = () => {
  const [selectedSkill, setSelectedSkill] = useState<SkillName>('');
  const [selectedPosition, setSelectedPosition] = useState<PositionName>('');
  const [selectedSort, setSelecteSort] = useState<GroupSort>('createdAt');
  const [selectedOrder, setSelectedOrder] = useState<Order>('desc');
  const searchParams = useSearchParams();
  const router = useRouter();

  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`?${params.toString()}`);
  };

  const { data } = useFetchItems<Group>({
    url: '/api/groups',
    queryParams: {
      skill: Skill[selectedSkill as keyof typeof Skill] ?? '',
      position: Position[selectedPosition as keyof typeof Position] ?? '',
      sort: selectedSort,
      order: selectedOrder,
    },
  });

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
      <Filter selectSkill={selectSkill} selectPosition={selectPosition} />
      <SortOrder
        selectedSort={selectedSort}
        selectedOrder={selectedOrder}
        selectSort={selectSort}
        selectOrder={selectOrder}
      />
      <GroupCard groups={data.pages.flatMap((page) => page.items)} />
    </>
  );
};
