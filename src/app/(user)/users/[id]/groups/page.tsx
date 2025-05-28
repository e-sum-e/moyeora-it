import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { request } from '@/api/request';
import { Suspense } from 'react';
import { GroupFilter } from '@/components/molecules/group-filter/group-filter';

type GroupsPageProps = {
  searchParams: Promise<{
    q: string;
    type: string;
    status: string;
    sort: string;
  }>;
};

export default async function GroupsPage({ searchParams }: GroupsPageProps) {
  const queryClient = new QueryClient();

  const { q, type, status, sort } = await searchParams;

  await queryClient.fetchInfiniteQuery({
    queryKey: [
      'items',
      '/api/groups',
      {
        type: type ?? 'project',
        status: status ?? 'RECRUITING',
        sort: sort ?? 'deadline',
        ...(q && { q }),
      },
    ],
    queryFn({ pageParam }) {
      return request.get('/api/groups', {
        type: type ?? 'project',
        status: status ?? 'RECRUITING',
        sort: sort ?? 'deadline',
        ...(q && { q }),
        cursor: pageParam,
      });
    },
    initialPageParam: 0,
  });

  return (
    <div>
      <GroupFilter />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<div>Loading...</div>}>
        </Suspense>
      </HydrationBoundary>
    </div>
  );
}
