import { Suspense } from 'react';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { QueryErrorBoundary } from '@/components/query-error-boundary';
import { GroupList } from '@/features/user/group/components/group-list';
import { request } from '@/api/request';
import { getAuthCookieHeader } from '@/utils/cookie';
import { GroupListLoading } from '@/features/user/group/components/group-list-loading';

type EndedGroupsPageWrapperProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    search: string;
    type: string;
    order: string;
  }>;
};

type EndedGroupsPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    search: string;
    type: string;
  }>;
};

export default async function EndedGroupsPageWrapper({
  params,
  searchParams,
}: EndedGroupsPageWrapperProps) {
  return (
    <Suspense
      fallback={<GroupListLoading />}
      key={JSON.stringify(searchParams)}
    >
      <EndedGroupsPage params={params} searchParams={searchParams} />
    </Suspense>
  );
}

const EndedGroupsPage = async ({
  params,
  searchParams,
}: EndedGroupsPageProps) => {
  const { search, type } = await searchParams;

  const queryClient = new QueryClient();

  const cookieHeaderValue = await getAuthCookieHeader();

  const queryParams = {
    type: type ?? 'study',
    ...(search && { search }),
    size: 50,
  };

  await queryClient.prefetchInfiniteQuery({
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

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <QueryErrorBoundary>
        <GroupList status="ENDED" />
      </QueryErrorBoundary>
    </HydrationBoundary>
  );
};
