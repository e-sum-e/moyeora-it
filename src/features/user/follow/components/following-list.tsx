'use client';

import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Avatar } from '@/components/atoms/avatar';
import { SearchInput } from '@/components/molecules/search-input/search-input';
import { useFetchInView } from '@/hooks/useFetchInView';
import { useFetchItems } from '@/hooks/useFetchItems';
import { User } from '@/types';
import { ToggleFollowButton } from '@/features/user/follow/components/toggle-follow-button';
import { request } from '@/api/request';

export const FollowingList = () => {
  const searchParams = useSearchParams();
  const { id } = useParams();

  const { data, fetchNextPage, hasNextPage, isLoading } = useFetchItems<User>({
    url: `/users/${id}/followings`,
    ...(searchParams.size !== 0 && {
      queryParams: Object.fromEntries(searchParams.entries()),
    }),
    options: {
      refetchOnMount: true,
      staleTime: 0,
    },
  });

  const { data: { count: followingCount } = {} } = useQuery({
    queryKey: ['user', id, 'followings count'],
    queryFn() {
      return request.get(`/users/${id}/followings/count`);
    },
    staleTime: 0,
    refetchOnMount: true,
  });

  const { ref } = useFetchInView({
    fetchNextPage,
    isLoading,
  });

  const followingList = data.pages.flatMap((page) => page.items).flat();

  return (
    <>
      <div>
        <SearchInput placeholder="닉네임으로 검색해보세요." />
      </div>
      <ul>
        <h1>팔로잉 {followingCount ?? null}</h1>
        {followingList?.map((following) => (
          <li key={following.userId}>
            <Link href={`/users/${following.userId}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-2">
                  <Avatar
                    imageSrc={following.profileImage ?? ''}
                    fallback={following.nickname?.slice(0, 2) ?? ''}
                    className="size-16"
                  />
                  <div className="flex flex-col">
                    <span>{following.nickname}</span>
                    <span>{following.email}</span>
                  </div>
                </div>
                <ToggleFollowButton
                  userId={following.userId}
                  isFollowing={following.isFollowing}
                  usedIn="followings"
                />
              </div>
            </Link>
          </li>
        ))}
        {hasNextPage && <div ref={ref} className="h-10" />}
      </ul>
    </>
  );
};
