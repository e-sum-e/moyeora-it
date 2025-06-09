import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
// import { request } from '@/api/request';
import { Suspense } from 'react';
import { FollowersList } from '@/features/user/follow/components/followers-list';
import { QueryErrorBoundary } from '@/components/query-error-boundary';

type FollowersPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    search: string;
  }>;
};

export default async function FollowersPage({
  // params,
  // searchParams,
}: FollowersPageProps) {
  // const queryParams = await searchParams;
  
  // const { id } = await params;

  const queryClient = new QueryClient();

  // await queryClient.fetchInfiniteQuery({
  //   queryKey: ['items', `/v1/follow/${id}/followers`, queryParams],
  //   queryFn({ pageParam }) {
  //     return request.get(`/v1/follow/${id}/followers`, {
  //       ...(queryParams.search && { name: queryParams.search }),
  //       cursor: pageParam,
  //       size: 10,
  //     });
  //   },
  //   initialPageParam: 0,
  // });

  return (
    <>
      <QueryErrorBoundary fallback={<>에러가 발생했어요</>}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense fallback={<div>Loading...</div>}>
            <FollowersList />
          </Suspense>
        </HydrationBoundary>
      </QueryErrorBoundary>
    </>
  );
}
