'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useFetchItems } from '@/hooks/useFetchItems';
import { useFetchInView } from '@/hooks/useFetchInView';
import { useDebounce } from '@/hooks/useDebounce';
import { Avatar } from '@/components/atoms/avatar';
import { Button } from '@/components/ui/button';
import { SearchInput } from '@/components/molecules/search-input/search-input';

export const FollowersList = () => {
  const isCurrentUser = true;

  const searchParams = useSearchParams();

  const { data, fetchNextPage, hasNextPage } = useFetchItems({
    url: '/users/followers',
    ...(searchParams.size !== 0 && {
      queryParams: Object.fromEntries(searchParams.entries()),
    }),
  });

  const { ref } = useFetchInView({
    fetchNextPage,
  });

  const followersList = data?.pages.flatMap((page) => page.items);

  const followButtonClickHandler = useDebounce((userId: string) => {
    console.log(userId);
  }, 500);

  const cancelFollowButtonClickHandler = useDebounce((userId: string) => {
    console.log(userId);
  }, 500);

  return (
    <>
      <div>
        <SearchInput placeholder="닉네임으로 검색해보세요." />
      </div>
      <ul>
        {followersList?.map((follower) => (
          <li key={follower.userId}>
            <Link href={`/user/${follower.userId}`}>
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
                {isCurrentUser ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      cancelFollowButtonClickHandler(follower.userId);
                    }}
                  >
                    삭제
                  </Button>
                ) : follower.isFollowing ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      cancelFollowButtonClickHandler(follower.userId);
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
                      followButtonClickHandler(follower.userId);
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
