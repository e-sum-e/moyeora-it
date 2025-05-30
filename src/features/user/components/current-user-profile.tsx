'use client';

import { Avatar } from '@/components/atoms/avatar';
import { Badge } from '@/components/atoms/badge';
import useAuthStore from '@/stores/useAuthStore';
import { getSkill } from '@/types/enums';
import { EditUserProfileDialog } from '@/features/user/components/edit-user-profile-dialog';
import { AccountSettingsDialog } from '@/features/user/components/account-settings-dialog';
import { WithdrawDialog } from '@/features/user/components/withdraw-dialog';

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

  return (
    <>
      <div>
        <Avatar
          className="size-36"
          imageSrc={user.profileImage ?? user.email}
          fallback="테스트"
        />
        <div className="flex flex-col gap-y-1">
          <span>{user.nickname}</span>
          <span>{user.email}</span>
          <span>{user.position}</span>
          <div className="flex items-center gap-x-2">
            <span>별점 : {user.rate}</span>
            <Badge text="뱃지" className="bg-emerald-50 text-emerald-500" />
          </div>
          <ul>
            {user.skills?.map((skill) => (
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
      <div className="flex gap-x-2">
        <EditUserProfileDialog />
        <AccountSettingsDialog />
        <WithdrawDialog />
      </div>
    </>
  );
};
