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
import flattenPages from '@/utils/flattenPages';
import { getDisplayNickname, getDisplayProfileImage } from '@/utils/fallback';

export const FollowingList = () => {
  const searchParams = useSearchParams();
  const { id } = useParams();

  const search = searchParams.get('search');

  const { data, fetchNextPage, hasNextPage, isLoading } = useFetchItems<User>({
    url: `/v1/follow/${id}/following`,
    ...(search && { queryParams: { name: search } }),
    options: {
      refetchOnMount: true,
      staleTime: 0,
    },
  });

  const { data: { count: followingCount } = {} } = useQuery({
    queryKey: ['user', id, 'followings count'],
    queryFn() {
      return request.get(`/v1/follow/${id}/following/count`);
    },
    staleTime: 0,
    refetchOnMount: true,
  });

  const { ref } = useFetchInView({
    fetchNextPage,
    isLoading,
  });

  const followingList = flattenPages<User>(data.pages);

  return (
    <>
      <div>
        <SearchInput placeholder="닉네임으로 검색해보세요." />
      </div>
      <ul>
        <h1>팔로잉 {followingCount ?? null}</h1>
        {/* @ts-expect-error 현재 User 타입에는 id 프로퍼티가 없음 -> 추후 수정 필요 */}
        {followingList?.map(({ id: userId, nickname, profileImage, email, isFollowing }) => (
          <li key={userId}>
            <Link href={`/users/${userId}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-2">
                  <Avatar
                    imageSrc={getDisplayProfileImage(profileImage)}
                    fallback={getDisplayNickname(nickname, email)}
                    className="size-16"
                  />
                  <div className="flex flex-col">
                    <span>{getDisplayNickname(nickname, email)}</span>
                    <span>{email}</span>
                  </div>
                </div>
                <ToggleFollowButton
                  userId={String(userId)}
                  isFollowing={isFollowing}
                  usedIn="following"
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
