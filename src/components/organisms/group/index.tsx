'use client';

import { Filter } from '@/components/molecules/group/filter';
import { GroupCard } from '@/components/molecules/group/group-card';
import { SortOrder } from '@/components/molecules/group/sort-order';
import { useFetchItems } from '@/hooks/useFetchItems';
import { Group, GroupSort, Order, PositionName, SkillName } from '@/types';
import { Position, Skill } from '@/types/enums';
import { useState } from 'react';

export const GroupList = () => {
  const [selectedSkill, setSelectedSkill] = useState<SkillName>('');
  const [selectedPosition, setSelectedPosition] = useState<PositionName>('');
  const [selectedSort, setSelecteSort] = useState<GroupSort>('createdAt');
  const [selectedOrder, setSelectedOrder] = useState<Order>('desc');

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
  };

  const selectPosition = (currentPosition: PositionName) => {
    setSelectedPosition(currentPosition);
  };

  const selectSort = (currentSort: GroupSort) => {
    setSelecteSort(currentSort);
  };

  const selectOrder = (currentOrder: Order) => {
    setSelectedOrder(currentOrder);
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
