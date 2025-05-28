'use client';

import { Avatar } from '@/components/atoms/avatar';
import { SearchInput } from '@/components/molecules/search-input/search-input';
import { Button } from '@/components/ui/button';
import { useDebounce } from '@/hooks/useDebounce';
import { useFetchInView } from '@/hooks/useFetchInView';
import { useFetchItems } from '@/hooks/useFetchItems';
import { User } from '@/types';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';

export const FollowingList = () => {
  const { id } = useParams();
  const userId = '1';
  const isCurrentUser = id === userId;

  const searchParams = useSearchParams();
  const search = searchParams.get('search');

  const { data, fetchNextPage, hasNextPage } = useFetchItems<User>({
    url: '/api/users/followings',
    ...(search && { queryParams: { search } }),
  });

  const { ref } = useFetchInView({
    fetchNextPage,
  });

  const followingList = data?.pages.flatMap((page) => page.items);

  const followButtonClickHandler = useDebounce((userId: string) => {
    console.log(userId);
  }, 500);

  const unfollowButtonClickHandler = useDebounce((userId: string) => {
    console.log(userId);
  }, 500);

  return (
    <>
      <div>
        <SearchInput placeholder="닉네임으로 검색해보세요." />
      </div>
      <ul>
        {followingList?.map((following) => (
          <li key={following.userId}>
            <Link href={`/user/${following.userId}`}>
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
                {isCurrentUser ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      unfollowButtonClickHandler(following.userId);
                    }}
                  >
                    언팔로우
                  </Button>
                ) : following.isFollowing ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      unfollowButtonClickHandler(following.userId);
                    }}
                  >
                    팔로잉
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      followButtonClickHandler(following.userId);
                    }}
                  >
                    팔로우
                  </Button>
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
