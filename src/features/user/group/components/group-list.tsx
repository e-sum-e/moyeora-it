'use client';

import { GroupCard } from '@/components/molecules/group/group-card';
import { useBookmarkItems } from '@/hooks/useBookmarkItems';
import { useFetchInView } from '@/hooks/useFetchInView';
import { useFetchItems } from '@/hooks/useFetchItems';
import { Group } from '@/types';
import flattenPages from '@/utils/flattenPages';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

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

  const {
    items: groupList,
    toggleBookmark,
    setInitialItems,
  } = useBookmarkItems<Group>();
  console.log(groupList);

  // 초기 데이터 수신 후 북마크 상태 포함한 모임 배열 설정
  useEffect(() => {
    if (!data) return;

    const flattenItems = flattenPages<Group>(data.pages);
    setInitialItems(flattenItems);
  }, [data, setInitialItems]);

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
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {groupList.map((group) => (
            // @ts-expect-error 백엔드 응답값에 group 프로퍼티가 존재함. 추후 프로퍼티 수정 필요
            <li className="w-full" key={group?.group?.id}>
              <GroupCard
                item={{
                  // @ts-expect-error 백엔드 응답값에 group 프로퍼티가 존재함. 추후 프로퍼티 수정 필요
                  ...group?.group,
                  // @ts-expect-error participants null 값 처리가 안 되어 있음. 추후 수정 필요
                  participants: group?.group?.participants ?? [],
                }}
                bookmarkToggleHandler={toggleBookmark}
              />
            </li>
          ))}
          {hasNextPage && <div ref={ref} />}
        </ul>
      )}
    </>
  );
};
