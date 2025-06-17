'use client';

import { useFetchInView } from '@/hooks/useFetchInView';
import { useFetchItems } from '@/hooks/useFetchItems';
import { Group } from '@/types';
import { useParams, useSearchParams } from 'next/navigation';
import flattenPages from '@/utils/flattenPages';
import useAuthStore from '@/stores/useAuthStore';
import { GroupListItem } from '@/features/user/group/components/group-list-item';
import { isBeforeToday } from '@/utils/dateUtils';

type GroupListProps = {
  status: 'PARTICIPATING' | 'RECRUITING' | 'ENDED';
}

/**
 * 모임 목록 컴포넌트
 * 
 * 모임 목록을 보여준다.
 * 
 * @returns 모임 목록 컴포넌트
 */
export const GroupList = ({ status }: GroupListProps) => {
  const user = useAuthStore((state) => state.user);

  const { id } = useParams();

  const isCurrentUser = String(user?.userId) === id;

  const searchParams = useSearchParams();

  const { search, type } = Object.fromEntries(searchParams.entries());

  const { data, fetchNextPage, hasNextPage, isLoading } = useFetchItems<Group>({
    url: '/v2/groups/mygroup',
    queryParams: {
      type: type ?? 'study',
      status: 'PARTICIPATING',
      size: status === 'ENDED' ? 50 : 10,
      ...(search && { search }),
    },
    options: {
      staleTime: 0,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      retry: 0,
    },
  });

  const { ref } = useFetchInView({
    fetchNextPage,
    isLoading,
  });

  // @ts-expect-error 객체 안에 또 group 프로퍼티가 존재함.
  let groupList = flattenPages<Group>(data.pages).map((e) => e.group);
  if (status === 'ENDED') {
    groupList = groupList.filter((group) => isBeforeToday(group.endDate));
  }

  return (
    <>
      {groupList.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-30">
          <p className="text-center font-medium text-gray-500">
            {status === 'RECRUITING' && '모집 중인 모임이 없어요.'}
            {status === 'PARTICIPATING' && '참여 중인 모임이 없어요.'}
            {status === 'ENDED' && '종료된 모임이 없어요.'}
          </p>
        </div>
      ) : (
        <ul className="flex flex-col mt-7.5 gap-y-4">
          {groupList.map((group) => (
            <GroupListItem
              key={group.id}
              group={group}
              isCurrentUser={isCurrentUser}
              status={status}
            />
          ))}
          {hasNextPage && <div ref={ref} className="h-10" />}
        </ul>
      )}
    </>
  );
};
