'use client';

import { Filter } from '@/components/molecules/group/filter';
import { GroupCard } from '@/components/molecules/group/group-card';
import { SortOrder } from '@/components/molecules/group/sort-order';
import { TypeTab } from '@/components/molecules/group/type-tab';
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
import { useEffect, useState } from 'react';

export const GroupList = () => {
  const [selectedType, setSelectedType] = useState<GroupType>(GroupType.ALL);
  const [selectedSkill, setSelectedSkill] = useState<SkillName>('');
  const [selectedPosition, setSelectedPosition] = useState<PositionName>('');
  const [selectedSort, setSelecteSort] = useState<GroupSort>('createdAt');
  const [selectedOrder, setSelectedOrder] = useState<Order>('desc');
  const searchParams = useSearchParams();
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
    url: '/api/groups',
    queryParams: {
      type: selectedType !== 'all' ? selectedType : '',
      skill: Skill[selectedSkill as keyof typeof Skill] ?? '',
      position: Position[selectedPosition as keyof typeof Position] ?? '',
      sort: selectedSort,
      order: selectedOrder,
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

  useEffect(() => {
    const skill = searchParams.get('skill') as SkillName;
    const position = searchParams.get('position') as PositionName;
    const sort = searchParams.get('sort') as GroupSort;
    const order = searchParams.get('order') as Order;

    if (skill) setSelectedSkill(skill);
    if (position) setSelectedPosition(position);
    if (sort) setSelecteSort(sort);
    if (order) setSelectedOrder(order);

    /**
     * 초기 1회만 실행하도록 deps는 빈배열로 둠
     * - searchParams를 deps에 추가할 시 router.push()로 인해 url이 변경되면 searchParams가 또 변경되어 useEffect()가 실행되는데 다른 searchParams를 선택할 경우 코드 흐름이 꼬일 수 있음
     *  */
    // eslint-disable-next-line
  }, []);

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
