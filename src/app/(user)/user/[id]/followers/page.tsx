import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { request } from '@/api/request';
import { Suspense } from 'react';
import { FollowersList } from '@/features/user/follow/components/followers-list';

type FollowersPageProps = {
  searchParams: Promise<{
    q: string;
  }>;
};

export default async function FollowersPage({
  searchParams,
}: FollowersPageProps) {
  const queryParams = await searchParams;

  const queryClient = new QueryClient();

  await queryClient.fetchInfiniteQuery({
    queryKey: ['items', '/api/users/followings', queryParams],
    queryFn({ pageParam }) {
      return request.get('/api/users/followings', {
        ...queryParams,
        cursor: pageParam,
      });
    },
    initialPageParam: 0,
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <h1>팔로워</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <FollowersList />
        </Suspense>
      </HydrationBoundary>
    </>
  );
}
