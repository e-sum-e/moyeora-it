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
import { useEffect, useMemo, useState } from 'react';

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
  const [searchKeyword, setSearchKeyword] = useState(initialParams.search);

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
      search: searchKeyword,
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

  const selectSearchKeyword = (currentSearchKeyword: string) => {
    setSearchKeyword(currentSearchKeyword);
    updateQuery('search', currentSearchKeyword);
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
      <SearchInput
        setSearchKeyword={setSearchKeyword}
        selectSearchKeyword={selectSearchKeyword}
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
