'use client';

import { Avatar } from '@/components/atoms/avatar';
import { Badge } from '@/components/atoms/badge';
import useAuthStore from '@/stores/useAuthStore';
import { getPosition } from '@/types/enums';
import { EditUserProfileDialog } from '@/features/user/components/edit-user-profile-dialog';
import { AccountSettingsDialog } from '@/features/user/components/account-settings-dialog';
import { WithdrawDialog } from '@/features/user/components/withdraw-dialog';
import { getDisplayNickname, getDisplayProfileImage } from '@/utils/fallback';

/**
 * 현재 로그인 한 유저의 프로필 컴포넌트
 *
 * 현재 로그인 한 유저의 프로필을 보여준다.
 *
 * @returns 현재 로그인 한 유저의 프로필 컴포넌트
 */

export const CurrentUserProfile = () => {
  const user = useAuthStore((state) => state.user);
  
  if (!user) {
    return <div>나의 정보를 불러오는 데 실패했어요. 다시 로그인 해주세요.</div>;
  }

  const { nickname, email, profileImage, position, skills, rate } = user;

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
                {/* <Badge
                  text={getSkill(skill)}
                  className="bg-gray-100 text-gray-800"
                /> */}
                {/* 백엔드에서 주는 skill 값의 타입이 string이어서 일단 그대로 렌더링 -> 추후 타입 수정 필요 */}
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex gap-x-2">
        <EditUserProfileDialog />
        <AccountSettingsDialog />
        <WithdrawDialog />
      </div>
    </>
  );
};
