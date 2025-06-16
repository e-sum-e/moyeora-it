'use client';

import { useSearchParams } from 'next/navigation';
import { useFetchItems } from '@/hooks/useFetchItems';
import { useFetchInView } from '@/hooks/useFetchInView';
import { Group } from '@/types';
import { useParams } from 'next/navigation';
import flattenPages from '@/utils/flattenPages';
import useAuthStore from '@/stores/useAuthStore';
import { GroupListItem } from '@/features/user/group/components/group-list-item';

type GroupListProps = {
  status: 'PARTICIPATING' | 'RECRUITING';
}

/**
 * 모임 목록 컴포넌트
 * 
 * 모임 목록을 보여준다.
 * 
 * @returns 모임 목록 컴포넌트
 */
export const GroupList = ({ status }: GroupListProps) => {
  console.log(status);

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
      size: 10,
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
  const groupList = flattenPages<Group>(data.pages).map((e) => e.group);

  return (
    <>
      {groupList.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-30">
          <p className="text-center font-medium text-gray-500">
            모집 중인 그룹이 없어요.
          </p>
        </div>
      ) : (
        <ul className="flex flex-col mt-7.5 gap-y-4">
          {groupList.map((group) => (
            <GroupListItem
              key={group.id}
              group={group}
              isCurrentUser={isCurrentUser}
            />
          ))}
          {hasNextPage && <div ref={ref} className="h-10" />}
        </ul>
      )}
    </>
  );
};
