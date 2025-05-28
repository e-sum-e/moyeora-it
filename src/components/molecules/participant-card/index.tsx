'use client';

import { Avatar } from '@/components/atoms/avatar';

import { User } from '@/types';
import { useRouter } from 'next/navigation';

type ParticipantCardProps = Pick<User, 'userId' | 'nickname' | 'profileImage'>;

export const ParticipantCard = ({
  userId,
  nickname,
  profileImage,
}: ParticipantCardProps) => {
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
