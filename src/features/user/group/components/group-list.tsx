'use client';

import { useSearchParams } from 'next/navigation';
import { useFetchItems } from '@/hooks/useFetchItems';
import { useFetchInView } from '@/hooks/useFetchInView';
import { Group } from '@/types';
import { GroupCard } from '@/components/molecules/group/group-card';
import { useParams } from 'next/navigation';
import flattenPages from '@/utils/flattenPages';

/**
 * 그룹 목록 컴포넌트
 *
 * 사용자가 참여/모집 중인 그룹 목록을 보여준다.
 *
 * @returns 그룹 목록 컴포넌트
 */
export const GroupList = () => {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const { search, type, status, sort } = Object.fromEntries(
    searchParams.entries(),
  );

  const { data, fetchNextPage, hasNextPage, isLoading } = useFetchItems<Group>({
    url: '/v2/groups/mygroup',
    queryParams: {
      userId: String(id),
      type: type ?? 'study',
      status: status ?? 'RECRUITING',
      sort: sort ?? 'deadline',
      ...(search && { search }),
      size: 10,
    },
    options: {
      staleTime: 0,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    },
  });

  const { ref } = useFetchInView({
    fetchNextPage,
    isLoading,
  });

  const groupList = flattenPages<Group>(data.pages);
  console.log(groupList);

  return (
    <>
      {groupList.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-30">
          <p className="text-center font-medium text-gray-500">
            {!status || status === 'RECRUITING'
              ? '모집 중인 그룹이 없어요.'
              : '참여 중인 그룹이 없어요.'}
          </p>
        </div>
      ) : (
        <ul className='flex flex-wrap gap-6'>
          {groupList.map((group) => (
            // @ts-expect-error 백엔드 응답값에 group 프로퍼티가 존재함. 추후 프로퍼티 수정 필요
            <li className='w-1/3' key={group?.group?.id}>
              <GroupCard item={{
                // @ts-expect-error 백엔드 응답값에 group 프로퍼티가 존재함. 추후 프로퍼티 수정 필요
                ...group?.group,
                // @ts-expect-error participants null 값 처리가 안 되어 있음. 추후 수정 필요
                participants: group?.group?.participants ?? [],
              }} />
            </li>
          ))}
          {hasNextPage && <div ref={ref} />}
        </ul>
      )}
    </>
  );
};
