'use client';

import { Button } from '@/components/ui/button';
import { Popover } from '@/components/ui/popover';
import { GroupSort, Order } from '@/types';
import { PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';

type OrderProps = {
  selectedSort: GroupSort;
  selectedOrder: Order;
  selectSort: (order: GroupSort) => void;
  selectOrder: (order: Order) => void;
};

export const SortOrder = ({
  selectedSort,
  selectedOrder,
  selectSort,
  selectOrder,
}: OrderProps) => {
  const orderOptions: {
    name: string;
    value: { sort: GroupSort; order: Order };
  }[] = [
    { name: '작성일자 ▼', value: { sort: 'createdAt', order: 'desc' } },
    { name: '작성일자 ▲', value: { sort: 'createdAt', order: 'asc' } },
    { name: '마감일자 ▼', value: { sort: 'deadline', order: 'desc' } },
    { name: '마감일자 ▲', value: { sort: 'deadline', order: 'asc' } },
  ];

  const getSelectedOrderOptionName = () => {
    return orderOptions.find(
      (option) =>
        option.value.sort === selectedSort &&
        option.value.order === selectedOrder,
    )?.name;
  };

  const orderSelectHandler = (option: { sort: GroupSort; order: Order }) => {
    selectSort(option.sort);
    selectOrder(option.order);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">{getSelectedOrderOptionName()}</Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col">
        {orderOptions.map((option) => (
          <Button
            key={option.name}
            variant="outline"
            onClick={() => orderSelectHandler(option.value)}
          >
            {option.name}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
};
