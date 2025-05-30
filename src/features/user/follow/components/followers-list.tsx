'use client';

import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { useFetchItems } from '@/hooks/useFetchItems';
import { useFetchInView } from '@/hooks/useFetchInView';
import { Avatar } from '@/components/atoms/avatar';
import { SearchInput } from '@/components/molecules/search-input/search-input';
import { ToggleFollowButton } from '@/features/user/follow/components/toggle-follow-button';
import useAuthStore from '@/stores/useAuthStore';
import { User } from '@/types/index';
import { RemoveFollowerButton } from '@/features/user/follow/components/remove-follower-button';

export const FollowersList = () => {
  const { id } = useParams();
  const user = useAuthStore((state) => state.user);
  const isCurrentUser = id === user?.userId;

  const searchParams = useSearchParams();

  const { data, fetchNextPage, hasNextPage, isLoading } = useFetchItems<User>({
    url: '/users/followers',
    ...(searchParams.size !== 0 && {
      queryParams: Object.fromEntries(searchParams.entries()),
    }),
    options: {
      refetchOnMount: true,
      staleTime: 0,
    },
  });

  const { ref } = useFetchInView({
    fetchNextPage,
    isLoading,
  });

  const followersList = data.pages.flatMap((page) => page.items).flat();

  return (
    <>
      <div>
        <SearchInput placeholder="닉네임으로 검색해보세요." />
      </div>
      <ul>
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
                  <RemoveFollowerButton userId={follower.userId} />
                )}
                {!isCurrentUser && (
                  <ToggleFollowButton
                    userId={follower.userId}
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
