'use client';

import { Avatar } from '@/components/atoms/avatar';

import { UserSummary } from '@/types';
import { useRouter } from 'next/navigation';

export const ParticipantCard = ({
  userId,
  nickname,
  profileImage,
}: UserSummary) => {
  const router = useRouter();

  return (
    <div className="flex gap-3 boder-2 ">
      <Avatar
        imageSrc={profileImage ?? ''}
        fallback={nickname ?? '참여자'}
        onClick={() => router.push(`users/${userId}`)}
      />
      <div>{nickname}</div>
    </div>
  );
};
