'use client';

import { request } from '@/api/request';
import { ErrorBoundary } from '@/components/error-boundary';
import { handleError } from '@/components/error-boundary/error-handler';
import { RecommendGroupCard } from '@/components/molecules/recommend-group/recommend-group-card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Group } from '@/types';
import { isBeforeToday } from '@/utils/dateUtils';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Empty } from '../empty';

export default function RecommendGroup() {
  const { data: items = [], isLoading } = useQuery<Group[]>({
    queryKey: ['recommendGroups'],
    queryFn: async () => {
      const response = await request.get('/v2/groups/recommend');
      return response.items;
    },
  });

  const validItems = items
    .filter((item) => !isBeforeToday(item.deadline))
    .slice(0, 10);

  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = Math.max(validItems.length - 1, 0);

  const handlePrev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));
  const handleNext = () =>
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));

  if (isLoading) {
    return (
      <div className="flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide py-2">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton
            key={i}
            className="inline-block w-[200px] h-[134px] flex-shrink-0 rounded-md"
          />
        ))}
      </div>
    );
  }

  if (validItems.length === 0) {
    return (
      <Empty
        mainText="추천할 모임이 없습니다."
        subText=""
        className="h-[134px]"
      />
    );
  }

  return (
    <ErrorBoundary
      fallback={({ error, resetErrorBoundary }) =>
        handleError({
          error,
          resetErrorBoundary,
          defaultMessage: '추천 그룹을 불러오는 중 문제가 발생했습니다',
        })
      }
    >
      <div className="relative mt-4">
        <div className="overflow-hidden px-1 py-2">
          <ul
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 220}px)` }} // 200px + 5vw ≈ 220px 가정
          >
            {validItems.map((group) => (
              <li
                key={group.id}
                className="w-[200px] h-[134px] mr-[2vw] bg-gray-300 rounded flex-shrink-0"
              >
                <RecommendGroupCard item={group} />
              </li>
            ))}
          </ul>
        </div>

        <Button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="w-9 h-9 absolute top-0 left-0 bottom-0 m-auto rounded-full"
        >
          ◀
        </Button>
        <Button
          onClick={handleNext}
          disabled={currentIndex === maxIndex}
          className="w-9 h-9 absolute top-0 right-0 bottom-0 m-auto rounded-full"
        >
          ▶
        </Button>
      </div>
    </ErrorBoundary>
  );
}
