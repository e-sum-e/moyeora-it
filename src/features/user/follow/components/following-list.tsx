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
import useAuthStore from '@/stores/useAuthStore';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const FollowingList = () => {
  const searchParams = useSearchParams();
  const { id } = useParams();
  const user = useAuthStore((state) => state.user);

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
    <div className="flex flex-col gap-y-6">
      <div className="flex items-center gap-x-[10px] rounded-[30px] bg-gray-100 px-5 py-2 w-[200px] text-gray-500 h-9 self-end">
        <Image src="/icons/search.svg" alt="search" width={17} height={17} />
        <SearchInput
          className="bg-gray-100 border-none shadow-none focus-visible:ring-0 p-0"
          placeholder="검색"
        />
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <h1 className="hidden">팔로잉 {followingCount ?? null}</h1>
        {followingList?.map(
          /* @ts-expect-error 현재 User 타입에는 id 프로퍼티가 없음 -> 추후 수정 필요 */
          ({ id: userId, nickname, profileImage, email, isFollowing }) => (
            <li
              className="border-b-2 border-gray-200 border-dashed pb-6"
              key={userId}
            >
              <Link href={`/users/${userId}`}>
                <div className="flex justify-between">
                  <div className="flex gap-x-6">
                    <Avatar
                      imageSrc={getDisplayProfileImage(profileImage)}
                      fallback={getDisplayNickname(nickname, email)}
                      className="size-[4.75rem]"
                    />
                    <div className="flex flex-col justify-start">
                      <span className="text-gray-900 text-lg font-semibold">
                        {getDisplayNickname(nickname, email)}
                      </span>
                      <span className="text-gray-300 text-sm font-medium">
                        {email}
                      </span>
                    </div>
                  </div>
                  {user && String(user?.userId) !== String(userId) && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          type="button"
                          className="size-6 self-start inline-flex justify-center"
                        >
                          <Image
                            src="/icons/more.svg"
                            alt="more"
                            width={3.5}
                            height={3.5}
                          />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="min-w-[110px] h-[40px] flex items-center rounded-lg!">
                        {(
                          <ToggleFollowButton
                            userId={String(userId)}
                            isFollowing={isFollowing}
                            usedIn="following"
                            className={`shadow-none hover:bg-white! ${isFollowing ? 'text-red-600 [&>svg]:text-red-600!' : 'text-black [&_svg]:text-black'} bg-white h-[28px] cursor-pointer text-sm font-semibold rounded-lg py-1 px-3 gap-x-[6px]`}
                          />
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </Link>
            </li>
          ),
        )}
        {hasNextPage && <div ref={ref} className="h-10" />}
      </ul>
    </div>
  );
};
