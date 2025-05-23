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
    search: string | undefined;
  }>;
};

export default async function FollowingsPage({
  searchParams,
}: FollowingsPageProps) {
  const { search } = await searchParams;
  console.log(search);

  const queryClient = new QueryClient();

  await queryClient.fetchInfiniteQuery({
    queryKey: ['items', '/users/followings'],
    queryFn: () => request.get('/users/followings'),
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
