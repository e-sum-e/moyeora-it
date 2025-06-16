import { request } from '@/api/request';
import { WriteGroupButton } from '@/components/molecules/group-create-button';
import { Groups } from '@/components/organisms/group';
import RecommendGroup from '@/components/organisms/recommend-group';
import { QueryErrorBoundary } from '@/components/query-error-boundary';
import { Position, Skill } from '@/types/enums';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const awaitedSearchParams = await searchParams; // searchParams가 Promise 객체여서 await으로 벗겨내야 함
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 기본 캐싱 시간(1분)
      },
    },
  });

  const queryParams = {
    type: awaitedSearchParams.type ?? '',
    skills: Skill[awaitedSearchParams.skill as keyof typeof Skill] ?? '',
    position:
      Position[awaitedSearchParams.position as keyof typeof Position] ?? '',
    sort: awaitedSearchParams.sort ?? 'createdAt',
    order: awaitedSearchParams.order ?? 'desc',
    search: awaitedSearchParams.search ?? '',
    ...(awaitedSearchParams.order === 'desc' || !awaitedSearchParams.order
      ? { cursor: 'null' }
      : {}),
  };

  // console.log('✅ Fetching data from server ', queryParams); // DEV: 💡 서버 컴포넌트에서 prefetch 하는지 확인용

  try {
    await queryClient.fetchInfiniteQuery({
      queryKey: ['items', '/v2/groups', { size: 10, ...queryParams }],
      queryFn({ pageParam }) {
        return request.get('/v2/groups', {
          ...queryParams,
          size: 10,
          cursor:
            awaitedSearchParams.order === 'desc' || !awaitedSearchParams.order
              ? 'null' // order가 desc이거나 최초 진입시 에는 cursor=null로 가야함
              : pageParam,
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
    <div className="relative w-[300px] sm:w-[370px] md:w-[740px] m-auto mb-10">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="text-2xl font-extrabold">🔥 인기글</div>
        <RecommendGroup />
        <WriteGroupButton />
        <QueryErrorBoundary
          fallback={
            <div>
              ⚠️ 그룹을 불러오는 중 문제가 발생했습니다. 다시 시도해주세요.
            </div>
          }
        >
          <Groups searchParams={awaitedSearchParams} />
        </QueryErrorBoundary>
      </HydrationBoundary>
    </div>
  );
}
