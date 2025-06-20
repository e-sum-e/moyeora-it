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

type CreatedGroupsPageWrapperProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    search: string;
    type: string;
    order: string;
  }>;
};

type CreatedGroupsPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    search: string;
    type: string;
    order: string;
  }>;
};

/**
 * loading.tsx 파일의 로딩 컴포넌트는 라우트 세그먼트가 변경될 때만 호출되는 듯 함.
 * 쿼리 파라미터가 변경되어도 loading.tsx 파일의 로딩 컴포넌트가 호출되지 않음.
 * 그래서 따로 Wrapper 컴포넌트를 만들어서 쿼리 파라미터가 변경될 때 로딩 중이면, 로딩 컴포넌트를 호출하도록 함.
 */
export default async function CreatedGroupsPageWrapper({
  params,
  searchParams,
}: CreatedGroupsPageWrapperProps) {
  return (
    <Suspense
      fallback={<GroupListLoading />}
      key={JSON.stringify(searchParams)}
    >
      <CreatedGroupsPage params={params} searchParams={searchParams} />
    </Suspense>
  );
}

const CreatedGroupsPage = async ({
  params,
  searchParams,
}: CreatedGroupsPageProps) => {
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
      <QueryErrorBoundary>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <GroupList status="RECRUITING" />
        </HydrationBoundary>
      </QueryErrorBoundary>
    </>
  );
};
