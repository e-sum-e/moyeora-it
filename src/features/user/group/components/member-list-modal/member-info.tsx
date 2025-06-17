'use client';

import Link from 'next/link';
import { Avatar } from '@/components/atoms/avatar';
import { getDisplayNickname, getDisplayProfileImage } from '@/utils/fallback';

type MemberInfoProps = {
  userId: string;
  nickname: string|null;
  email: string;
  profileImage: string|null;
};

export const MemberInfo = ({
  userId,
  nickname,
  email,
  profileImage,
}: MemberInfoProps) => (
  <div className="flex gap-x-6">
    <Link href={`/users/${userId}`}>
      <Avatar
        imageSrc={getDisplayProfileImage(profileImage)}
        fallback={getDisplayNickname(nickname, email)}
        className="size-14"
      />
    </Link>
    <div className="flex flex-col">
      <span className="text-lg font-semibold">
        {getDisplayNickname(nickname, email)}
      </span>
      <span className="text-sm text-gray-400">{email}</span>
    </div>
  </div>
);
