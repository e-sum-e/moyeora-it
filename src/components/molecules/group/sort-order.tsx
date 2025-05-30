'use client';

import { Button } from '@/components/ui/button';
import { Popover } from '@/components/ui/popover';
import { GroupSort, Order } from '@/types';
import { PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { useSearchParams } from 'next/navigation';

type OrderProps = {
  updateQuery: (queries: Record<string, string>) => void;
};

export const SortOrder = ({ updateQuery }: OrderProps) => {
  const searchParams = useSearchParams();
  const selectedSort = searchParams.get('sort');
  const selectedOrder = searchParams.get('order');

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
    console.log(option.sort);
    console.log(option.order);

    updateQuery({ sort: option.sort, order: option.order });
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
