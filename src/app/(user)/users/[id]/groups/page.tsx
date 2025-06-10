import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
// import { request } from '@/api/request';
import { Suspense } from 'react';
import { GroupFilter } from '@/components/molecules/group-filter/group-filter';
import { GroupList } from '@/features/user/group/components/group-list';
import { QueryErrorBoundary } from '@/components/query-error-boundary';

type GroupsPageProps = {
  searchParams: Promise<{
    search: string;
    type: string;
    status: string;
    sort: string;
  }>;
};

export default async function GroupsPage({ searchParams }: GroupsPageProps) {
  const queryClient = new QueryClient();

  const { search, type, status, sort } = await searchParams;

  const queryParams = {
    type: type ?? 'project',
    status: status ?? 'RECRUITING',
    sort: sort ?? 'deadline',
    ...(search && { search }),
  };
  console.log(queryParams);

  // await queryClient.fetchInfiniteQuery({
  //   queryKey: ['items', '/v2/groups', queryParams],
  //   queryFn({ pageParam }) {
  //     return request.get('/v2/groups/mygroup', {
  //       ...queryParams,
  //       cursor: pageParam,
  //       size: 10,
  //     });
  //   },
  //   initialPageParam: 0,
  // });

  return (
    <div>
      <GroupFilter />
      <QueryErrorBoundary fallback={<p className='text-center text-gray-500 mt-30'>로그인 후 다시 시도해주세요</p>}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense fallback={<div></div>}>
            <GroupList />
          </Suspense>
        </HydrationBoundary>
      </QueryErrorBoundary>
    </div>
  );
}
