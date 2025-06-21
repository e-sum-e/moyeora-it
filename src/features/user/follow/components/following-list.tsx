'use client';

import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { Avatar } from '@/components/atoms/avatar';
import { useFetchInView } from '@/hooks/useFetchInView';
import { useFetchItems } from '@/hooks/useFetchItems';
import { User } from '@/types';
import { ToggleFollowButton } from '@/features/user/follow/components/toggle-follow-button';
import flattenPages from '@/utils/flattenPages';
import { getDisplayNickname, getDisplayProfileImage } from '@/utils/fallback';
import useAuthStore from '@/stores/useAuthStore';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Page } from '@/utils/flattenPages';
import FollowListItemsLoading from '@/features/user/follow/components/follow-list-items-loading';

export const FollowingList = () => {
  const searchParams = useSearchParams();
  const { id } = useParams();
  const user = useAuthStore((state) => state.user);

  const search = searchParams.get('search');

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useFetchItems<User>({
    url: `/v1/follow/${id}/following`,
    ...(search && { queryParams: { name: search } }),
    options: {
      refetchOnMount: true,
      staleTime: 0,
      retry: 0,
    },
  });

  const followingCount = (data.pages[0] as Page<User> & { totalCount: number })
    .totalCount;

  const { ref } = useFetchInView({
    fetchNextPage,
    isLoading: isFetchingNextPage,
  });

  const followingList = flattenPages<User>(data.pages);

  return (
    <div className="flex flex-col gap-y-6 pb-4 rounded-b-2xl flex-1 mt-3">
      <div className="flex items-center">
        <div className="flex gap-x-1 items-center">
          <span className="text-sm font-semibold text-gray-500">총 팔로잉 수 : </span>
          <span className="text-sm font-semibold text-gray-500">
            {followingCount ?? 0}
          </span>
        </div>
      </div>
      {followingList.length === 0 ? (
        <div className="flex flex-1 justify-center items-center">
          <p className="text-center font-medium text-gray-400">
            아직 팔로우 하는 사람이 없어요.
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                          {
                            <ToggleFollowButton
                              userId={String(userId)}
                              isFollowing={isFollowing}
                              usedIn="following"
                              className={`shadow-none hover:bg-white! ${isFollowing ? 'text-red-600 [&>svg]:text-red-600!' : 'text-black [&_svg]:text-black'} bg-white h-[28px] cursor-pointer text-sm font-semibold rounded-lg py-1 px-3 gap-x-[6px]`}
                            />
                          }
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </Link>
              </li>
            ),
          )}
          {isFetchingNextPage && <FollowListItemsLoading itemCount={4} />}
          {!isFetchingNextPage && hasNextPage && <div ref={ref} className="h-10" />}
        </ul>
      )}
    </div>
  );
};
