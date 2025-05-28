'use client';

import { Avatar } from '@/components/atoms/avatar';

import { UserSummary } from '@/types';
import { getDisplayNickname } from '@/utils/fallback';
import { useRouter } from 'next/navigation';

export const ParticipantCard = ({
  userId,
  nickname,
  profileImage,
  email,
}: UserSummary) => {
  const router = useRouter();

  return (
    <div className="flex gap-3 boder-2 ">
      <Avatar
        imageSrc={profileImage ?? ''}
        fallback={getDisplayNickname(nickname, email)}
        onClick={() => router.push(`users/${userId}`)}
      />
      <div>{nickname}</div>
    </div>
  );
};
