'use client';

import { useSearchParams } from 'next/navigation';
import { useFetchItems } from '@/hooks/useFetchItems';
import { useFetchInView } from '@/hooks/useFetchInView';
import { Group } from '@/types';
import { GroupCard } from '@/components/molecules/group/group-card';
import flattenPages from '@/utils/flattenPages';

/**
 * 그룹 목록 컴포넌트
 *
 * 사용자가 참여/모집 중인 그룹 목록을 보여준다.
 *
 * @returns 그룹 목록 컴포넌트
 */
export const GroupList = () => {
  const searchParams = useSearchParams();
  const { search, type, status, sort } = Object.fromEntries(
    searchParams.entries(),
  );

  const { data, fetchNextPage, hasNextPage, isLoading } = useFetchItems<Group>({
    url: '/v2/groups/mygroup',
    queryParams: {
      type: type ?? 'project',
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

  return (
    <>
      {groupList.length === 0 ? (
        <div className='flex flex-col items-center justify-center mt-30'>
          <p className='text-center font-medium text-gray-500'>
            {status === 'RECRUITING'
              ? <>모집 중인 그룹이 없어요. <br /> 새로운 그룹을 만들어보세요!</>
              : <>참여 중인 그룹이 없어요. <br /> 새로운 그룹을 찾아보세요!</>}
          </p>
        </div>
      ) : (
        <ul>
          {groupList.map((group) => (
            <li key={group.id}>
              <GroupCard item={group} />
            </li>
          ))}
          {hasNextPage && <div ref={ref} />}
        </ul>
      )}
    </>
  );
};
