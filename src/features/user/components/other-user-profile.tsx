'use client';

import { notFound, useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Avatar } from '@/components/atoms/avatar';
import { Badge } from '@/components/atoms/badge';
import { getPosition, getSkill } from '@/types/enums';
import { User } from '@/types';
import { request } from '@/api/request';
import { ToggleFollowButton } from '@/features/user/follow/components/toggle-follow-button';
import { getDisplayNickname, getDisplayProfileImage } from '@/utils/fallback';

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
    data: user,
    isLoading,
    isError,
  } = useQuery<User>({
    queryKey: ['user', id],
    queryFn: () => request.get(`/v1/user/${id}`),
    staleTime: 0,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  // 유저가 존재하지 않으면, 404 Not Found 페이지로 이동한다.
  if (!user) notFound();

  const {
    nickname,
    email,
    profileImage,
    position,
    skills,
    rate,
    isFollowing,
    userId,
  } = user;

  return (
    <>
      <div>
        <Avatar
          className="size-36"
          imageSrc={getDisplayProfileImage(profileImage)}
          fallback={getDisplayNickname(nickname, email)}
        />
        <div className="flex flex-col gap-y-1">
          <span>{getDisplayNickname(nickname, email)}</span>
          <span>{email}</span>
          <span>{position && getPosition(position)}</span>
          <div className="flex items-center gap-x-2">
            <span>별점 : {rate}</span>
            <Badge text="뱃지" className="bg-emerald-50 text-emerald-500" />
          </div>
          <ul>
            {skills?.map((skill) => (
              <li key={skill}>
                <Badge
                  text={getSkill(skill)}
                  className="bg-gray-100 text-gray-800"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <ToggleFollowButton
          userId={userId}
          isFollowing={isFollowing}
          usedIn="profile"
        />
      </div>
    </>
  );
};
