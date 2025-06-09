'use client';

import { request } from '@/api/request';
import { ErrorBoundary } from '@/components/error-boundary';
import { handleError } from '@/components/error-boundary/error-handler';
import { RecommendGroupCard } from '@/components/molecules/recommend-group/recommend-group-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Group } from '@/types';
import { isBeforeToday } from '@/utils/dateUtils';
import { useQuery } from '@tanstack/react-query';
import useAuthStore from '@/stores/useAuthStore';
import { getBookmarkList } from '@/features/bookmark';

export default function RecommendGroup() {
  const user = useAuthStore((state) => state.user);

  const { data: items = [], isLoading } = useQuery<Group[]>({
    queryKey: ['recommendGroups'],
    queryFn: async () => {
      const response = await request.get('/v2/groups/recommend');
      return response.items;
    },
  });

  /** 마감일자가 지나지 않은 추천 그룹만 10개 필터링
   * 백엔드에서 적용해서 보내줘야 하지만 일단 프론트에서 처리
   */
  let validItems = items
    .filter((item) => !isBeforeToday(item.deadline))
    .slice(0, 10);

  if(!user){
    validItems = validItems.map((item) => {
        const bookmark = getBookmarkList()
        if(bookmark.includes(item.id)){
          item.isBookmark = true
        }
        return item
    })
  }
 
 

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
      {validItems.length === 0 ? (
        <div>현재 추천할 그룹이 없습니다.</div>
      ) : (
        <ul className="flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide p-2">
          {validItems.map((group) => (
            <li key={group.id} className="inline-block">
              <RecommendGroupCard item={group} />
            </li>
          ))}
        </ul>
      )}
    </ErrorBoundary>
  );
}
