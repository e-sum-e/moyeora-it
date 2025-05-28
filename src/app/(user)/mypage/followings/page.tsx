import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { request } from '@/api/request';
import { Suspense } from 'react';
import { FollowingList } from '@/features/user/follow/components/following-list';

type FollowingsPageProps = {
  searchParams: Promise<{
    q: string;
  }>;
};

export default async function FollowingsPage({
  searchParams,
}: FollowingsPageProps) {
  const queryParams = await searchParams;

  const queryClient = new QueryClient();

  await queryClient.fetchInfiniteQuery({
    queryKey: ['items', '/users/followings', queryParams],
    queryFn({ pageParam }) {
      return request.get('/users/followings', {
        ...queryParams,
        cursor: pageParam,
      });
    },
    initialPageParam: 0,
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <h1>팔로잉</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <FollowingList />
        </Suspense>
      </HydrationBoundary>
    </>
  );
}
