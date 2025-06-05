import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { request } from '@/api/request';
import { Suspense } from 'react';
import { FollowingList } from '@/features/user/follow/components/following-list';
import { QueryErrorBoundary } from '@/components/query-error-boundary';

type FollowingsPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    search: string;
  }>;
};

export default async function FollowingsPage({
  params,
  searchParams,
}: FollowingsPageProps) {
  const queryParams = await searchParams;
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.fetchInfiniteQuery({
    queryKey: ['items', `/v1/follow/${id}/following`, queryParams],
    queryFn({ pageParam }) {
      return request.get(`/v1/follow/${id}/following`, {
        ...(queryParams.search && { name: queryParams.search }),
        cursor: pageParam,
        size: 10,
      });
    },
    initialPageParam: 0,
  });

  return (
    <>
      <QueryErrorBoundary fallback={<>에러가 발생했어요</>}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense fallback={<div>Loading...</div>}>
            <FollowingList />
          </Suspense>
        </HydrationBoundary>
      </QueryErrorBoundary>
    </>
  );
}
