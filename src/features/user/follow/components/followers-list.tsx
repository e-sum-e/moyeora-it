'use client';

import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useFetchItems } from '@/hooks/useFetchItems';
import { useFetchInView } from '@/hooks/useFetchInView';
import { Avatar } from '@/components/atoms/avatar';
import { SearchInput } from '@/components/molecules/search-input/search-input';
import { ToggleFollowButton } from '@/features/user/follow/components/toggle-follow-button';
import useAuthStore from '@/stores/useAuthStore';
import { User } from '@/types/index';
import { RemoveFollowerButton } from '@/features/user/follow/components/remove-follower-button';
import { request } from '@/api/request';
import flattenPages from '@/utils/flattenPages';

export const FollowersList = () => {
  const { id } = useParams();
  const user = useAuthStore((state) => state.user);
  const isCurrentUser = id === user?.userId;

  const searchParams = useSearchParams();

  const search = searchParams.get('search');

  const { data, fetchNextPage, hasNextPage, isLoading } = useFetchItems<User>({
    url: `/v1/follow/${id}/followers`,
    ...(search && { queryParams: { name: search } }),
    options: {
      refetchOnMount: true,
      staleTime: 0,
    },
  });

  const { data: { count: followersCount } = {} } = useQuery({
    queryKey: ['user', id, 'followers count'],
    queryFn() {
      return request.get(`/v1/follow/${id}/followers/count`);
    },
    staleTime: 0,
    refetchOnMount: true,
  });

  const { ref } = useFetchInView({
    fetchNextPage,
    isLoading,
  });

  const followersList = flattenPages<User>(data.pages);

  return (
    <>
      <div>
        <SearchInput placeholder="닉네임으로 검색해보세요." />
      </div>
      <ul>
        <h1>팔로워 {followersCount ?? null}</h1>
        {followersList.map((follower) => (
          <li key={follower.userId}>
            <Link href={`/users/${follower.userId}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-2">
                  <Avatar
                    imageSrc={follower.profileImage ?? ''}
                    fallback={follower.nickname?.slice(0, 2) ?? ''}
                    className="size-16"
                  />
                  <div className="flex flex-col">
                    <span>{follower.nickname}</span>
                    <span>{follower.email}</span>
                  </div>
                </div>
                {isCurrentUser && (
                  <RemoveFollowerButton userId={String(follower.userId)} />
                )}
                {!isCurrentUser && (
                  <ToggleFollowButton
                    userId={String(follower.userId)}
                    isFollowing={follower.isFollowing}
                    usedIn="followers"
                  />
                )}
              </div>
            </Link>
          </li>
        ))}
        {hasNextPage && <div ref={ref} className="h-10" />}
      </ul>
    </>
  );
};
