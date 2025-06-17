import { Suspense } from 'react';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { QueryErrorBoundary } from '@/components/query-error-boundary';
import { GroupFilter } from '@/components/molecules/group-filter/group-filter';
import { GroupList } from '@/features/user/group/components/group-list';
import { request } from '@/api/request';
import { getAuthCookieHeader } from '@/utils/cookie';

type CreatedGroupsPageProps = {
  searchParams: Promise<{
    search: string;
    type: string;
  }>;
};

export default async function CreatedGroupsPage({
  searchParams,
}: CreatedGroupsPageProps) {
  const { search, type } = await searchParams;

  const cookieHeaderValue = await getAuthCookieHeader();

  const queryClient = new QueryClient();

  const queryParams = {
    type: type ?? 'study',
    status: 'PARTICIPATING',
    ...(search && { search }),
    size: 10,
  };

  await queryClient.fetchInfiniteQuery({
    queryKey: ['items', '/v2/groups/mygroup', queryParams],
    queryFn({ pageParam }) {
      return request.get(
        '/v2/groups/mygroup',
        {
          ...queryParams,
          cursor: pageParam,
        },
        {
          credentials: 'include',
        },
        {
          Cookie: cookieHeaderValue,
        },
      );
    },
    initialPageParam: 0,
    retry: 0,
  });

  return (
    <>
      <GroupFilter />
      <QueryErrorBoundary>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense fallback={<div>loading...</div>}>
            <GroupList status="RECRUITING" />
          </Suspense>
        </HydrationBoundary>
      </QueryErrorBoundary>
    </>
  );
}
