'use client';

import { Avatar } from '@/components/atoms/avatar';
import { Reply } from '@/types';
import { getDisplayNickname } from '@/utils/fallback';

type ReplyMetaProps = Pick<Reply, 'writer' | 'createdAt'>;

export const ReplyMeta = ({ writer, createdAt }: ReplyMetaProps) => {
  console.log(getDisplayNickname(writer.nickname, writer.email));
  return (
    <div className="flex gap-3 items-center">
      <Avatar
        imageSrc={writer.profileImage ?? 'https://github.com/shadcn.png'}
        fallback={getDisplayNickname(writer.nickname, writer.email)}
        className="w-10 h-10 cursor-pointer"
        onClick={() => {}}
      />
      <div className="flex flex-col">
        <div>{getDisplayNickname(writer.nickname, writer.email)}</div>
        <div>{createdAt}</div>
      </div>
    </div>
  );
};
