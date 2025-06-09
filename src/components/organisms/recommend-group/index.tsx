'use client';

import { request } from '@/api/request';
import { ErrorBoundary } from '@/components/error-boundary';
import { handleError } from '@/components/error-boundary/error-handler';
import { GroupCard } from '@/components/molecules/group/group-card';
import { Group } from '@/types';
import { useQuery } from '@tanstack/react-query';

export default function RecommendGroup() {
  const { data: items = [], isLoading } = useQuery<Group[]>({
    queryKey: ['recommendGroups'],
    queryFn: async () => {
      const response = await request.get('/v2/groups/recommend');
      return response.items;
    },
  });

  if (isLoading) {
    return <div>추천 그룹을 불러오는 중입니다...</div>;
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
      {items.length === 0 ? (
        <div>현재 추천할 그룹이 없습니다.</div>
      ) : (
        <ul className="flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide py-2">
          {items.map((group) => (
            <li key={group.id} className="inline-block">
              <GroupCard item={group} />
            </li>
          ))}
        </ul>
      )}
    </ErrorBoundary>
  );
}
