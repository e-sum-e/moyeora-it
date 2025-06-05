import { request } from '@/api/request';
import { WriteGroupButton } from '@/components/molecules/group-create-button';
import { GroupList } from '@/components/organisms/group';
import { Position, Skill } from '@/types/enums';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Suspense } from 'react';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const awaitedSearchParams = await searchParams; // searchParams가 Promise 객체여서 await으로 벗겨내야 함
  const queryClient = new QueryClient();
  const queryParams = {
    type: awaitedSearchParams.type ?? '',
    skill: Skill[awaitedSearchParams.skill as keyof typeof Skill] ?? '',
    position:
      Position[awaitedSearchParams.position as keyof typeof Position] ?? '',
    sort: awaitedSearchParams.sort ?? 'createdAt',
    order: awaitedSearchParams.order ?? 'desc',
    search: awaitedSearchParams.search ?? '',
  };

  // console.log('✅ Fetching data from server ', queryParams); // DEV: 💡 서버 컴포넌트에서 prefetch 하는지 확인용

  try {
    await queryClient.fetchInfiniteQuery({
      queryKey: ['items', '/v2/groups', queryParams],
      queryFn({ pageParam }) {
        return request.get('/v2/groups', {
          ...queryParams,
          size: 10,
          cursor: pageParam,
        });
      },
      initialPageParam: 0,
    });
  } catch (e) {
    //ISSUE: 에러 설정
    console.log(e);
    return <div>Error</div>;
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="bg-gray-100">
        <WriteGroupButton />
        <Suspense fallback={<div>Loading...</div>}>
          <GroupList searchParams={awaitedSearchParams} />
        </Suspense>
      </div>
    </HydrationBoundary>
  );
}
