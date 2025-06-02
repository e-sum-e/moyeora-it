import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { request } from '@/api/request';
import { Suspense } from 'react';
import { FollowingList } from '@/features/user/follow/components/following-list';

type FollowingsPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    q: string;
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
    queryKey: ['items', `/v1/users/${id}/followings`, queryParams],
    queryFn({ pageParam }) {
      return request.get(`/v1/users/${id}/followings`, {
        ...queryParams,
        cursor: pageParam,
        size: 10,
      });
    },
    initialPageParam: 0,
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<div>Loading...</div>}>
          <FollowingList />
        </Suspense>
      </HydrationBoundary>
    </>
  );
}
