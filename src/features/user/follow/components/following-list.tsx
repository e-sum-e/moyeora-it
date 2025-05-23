'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useFetchItems } from '@/hooks/useFetchItems';
import { useFetchInView } from '@/hooks/useFetchInView';
import { useDebounce } from '@/hooks/useDebounce';
import { Avatar } from '@/components/atoms/avatar';
import { Button } from '@/components/ui/button';

export const FollowingList = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get('search');

  const { data, fetchNextPage, hasNextPage } = useFetchItems({
    url: '/users/followings',
    ...(search && { queryParams: { search } }),
  });

  const { ref } = useFetchInView({
    fetchNextPage,
  });

  const followingList = data?.pages.flatMap((page) => page.items);

  const unfollowButtonClickHandler = useDebounce((userId: string) => {
    console.log(userId);
  }, 500);

  return (
    <ul>
      {followingList?.map((following) => (
        <li key={following.userId}>
          <Link href={`/user/${following.userId}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-2">
                <Avatar
                  imageSrc={following.profileImage}
                  fallback={following.nickname.slice(0, 2)}
                  className="size-16"
                />
                <div className="flex flex-col">
                  <span>{following.nickname}</span>
                  <span>{following.email}</span>
                </div>
              </div>
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
            </div>
          </Link>
        </li>
      ))}
      {hasNextPage && <div ref={ref} className="h-10" />}
    </ul>
  );
};
