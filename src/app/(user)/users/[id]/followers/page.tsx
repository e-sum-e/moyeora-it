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
      <QueryErrorBoundary fallback={<p className='text-center text-gray-500 mt-30'>로그인 후 다시 시도해주세요</p>}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense fallback={<div></div>}>
            <FollowersList />
          </Suspense>
        </HydrationBoundary>
      </QueryErrorBoundary>
    </>
  );
}
