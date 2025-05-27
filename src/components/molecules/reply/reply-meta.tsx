'use client';

import { Avatar } from '@/components/atoms/avatar';
import { Reply } from '@/types';

type ReplyMetaProps = Pick<Reply, 'writer' | 'createdAt'>;

export const ReplyMeta = ({ writer, createdAt }: ReplyMetaProps) => {
  return (
    <div className="flex gap-3 items-center">
      <Avatar
        imageSrc={writer.profileImage ?? 'https://github.com/shadcn.png'}
        fallback={writer.nickname?.[0] ?? ''}
        className="w-10 h-10 cursor-pointer"
        onClick={() => {}}
      />
      <div className="flex flex-col">
        <div>{writer.nickname}</div>
        <div>{createdAt}</div>
      </div>
    </div>
  );
};
