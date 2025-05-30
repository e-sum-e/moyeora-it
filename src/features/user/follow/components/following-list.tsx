'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Avatar } from '@/components/atoms/avatar';
import { SearchInput } from '@/components/molecules/search-input/search-input';
import { useFetchInView } from '@/hooks/useFetchInView';
import { useFetchItems } from '@/hooks/useFetchItems';
import { User } from '@/types';
import { ToggleFollowButton } from '@/features/user/follow/components/toggle-follow-button';

export const FollowingList = () => {
  const searchParams = useSearchParams();

  const { data, fetchNextPage, hasNextPage, isLoading } = useFetchItems<User>({
    url: '/users/followings',
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

  const followingList = data.pages.flatMap((page) => page.items).flat();

  return (
    <>
      <div>
        <SearchInput placeholder="닉네임으로 검색해보세요." />
      </div>
      <ul>
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
