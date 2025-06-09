'use client';

import { notFound, useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Avatar } from '@/components/atoms/avatar';
import { getSkill } from '@/types/enums';
import { User } from '@/types';
import { request } from '@/api/request';
import { ToggleFollowButton } from '@/features/user/follow/components/toggle-follow-button';
import { getDisplayNickname, getDisplayProfileImage } from '@/utils/fallback';
import { CommonResponse } from '@/types/response';

/**
 * 현재 로그인 한 유저가 아닌 다른 유저의 프로필 컴포넌트
 *
 * 다른 유저의 프로필을 보여준다.
 *
 * @returns 현재 로그인 한 유저가 아닌 다른 유저의 프로필 컴포넌트
 */
export const OtherUserProfile = () => {
  const { id } = useParams();
  const {
    data: userResponse,
    isLoading,
    isError,
  } = useQuery<CommonResponse<User>>({
    queryKey: ['user', id],
    queryFn: () =>
      request.get(
        `/v1/user/${id}`,
        {},
        {
          credentials: 'include',
        },
      ),
    staleTime: 0,
  });

  const user = userResponse?.data;

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  // 유저가 존재하지 않으면, 404 Not Found 페이지로 이동한다.
  if (!user) notFound();

  const { nickname, email, profileImage, skills, isFollowing } = user;

  return (
    <>
      <div className="flex absolute top-4 left-6 right-6 gap-x-3">
        <div className="flex flex-col items-center gap-y-4">
          <Avatar
            className="size-[4.75rem]"
            imageSrc={getDisplayProfileImage(profileImage)}
            fallback={getDisplayNickname(nickname, email)}
          />
        </div>
        <div className="flex flex-col gap-y-9 mt-4 flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="font-semibold">
              {getDisplayNickname(nickname, email)}
            </span>
            <ToggleFollowButton
              isFollowing={isFollowing}
              usedIn="profile"
              className={`${isFollowing ? 'bg-red-600' : 'bg-black hover:bg-black/70'} text-white h-[28px] text-sm font-semibold rounded-lg py-1 px-3 gap-x-[6px]`}
            />
          </div>
          <div className="flex flex-col gap-y-1 min-w-0">
            <div className="flex gap-x-2 min-w-0">
              <span className="text-sm font-medium shrink-0">Skills</span>
              <ul className="flex gap-x-3 overflow-x-auto flex-nowrap flex-1 min-w-0 scrollbar-hide">
                {skills?.length === 0 && (
                  <p className="text-gray-700 text-sm">
                    설정된 기술스택이 없어요.
                  </p>
                )}
                {skills?.map((skill) => (
                  <li
                    className="text-sm font-normal text-gray-700 whitespace-nowrap shrink-0 relative after:content-[''] after:absolute after:right-[-0.375rem] after:top-1/2 after:-translate-y-1/2 after:w-[1px] after:h-3 after:bg-gray-300 last:after:hidden"
                    key={skill}
                  >
                    {getSkill(skill)}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex gap-x-1.5">
              <span className="text-sm font-medium min-w-fit">E-mail</span>
              <span className="text-sm font-normal text-gray-700 truncate">
                {email}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
