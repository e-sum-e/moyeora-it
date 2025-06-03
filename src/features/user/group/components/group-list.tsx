'use client';

import { useSearchParams } from 'next/navigation';
import { useFetchItems } from '@/hooks/useFetchItems';
import { useFetchInView } from '@/hooks/useFetchInView';
import { Group } from '@/types';
import { GroupCard } from '@/components/molecules/group/group-card';

/**
 * 그룹 목록 컴포넌트
 * 
 * 사용자가 참여/모집 중인 그룹 목록을 보여준다.
 * 
 * @returns 그룹 목록 컴포넌트
 */
export const GroupList = () => {
  const searchParams = useSearchParams()
  const { search, type, status, sort } = Object.fromEntries(searchParams.entries());

  const { data, fetchNextPage, hasNextPage, isLoading } = useFetchItems<Group>({
    url: '/user/groups',
    queryParams: {
      type: type ?? 'project',
      status: status ?? 'RECRUITING',
      sort: sort ?? 'deadline',
      ...(search && { search }),
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

  const groupList = data.pages.flatMap((page) => page.items);

  return (
    <ul>
      {groupList.map((group) => (
        <li key={group.id}>
          <GroupCard item={group} />
        </li>
      ))}
      {hasNextPage && <div ref={ref} />}
    </ul>
  );
};
