'use client';

import { Avatar } from '@/components/atoms/avatar';
import { User } from '@/stores/useAuthStore';

type ReplyHeaderProps = {
  writer: Pick<User, 'userId' | 'nickname' | 'profileImage'>;
  createdAt: string;
  replyId: number;
};

export const ReplyHeader = ({
  writer,
  createdAt,
  replyId,
}: ReplyHeaderProps) => {
  const isWriter = true; // writer.id === user.id

  const editButtonClickHandler = () => {
    console.log(replyId, '수정');
  };

  const deleteButtonClickHandler = () => {
    console.log(replyId, '삭제');
  };

  return (
    <header className="flex justify-between">
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
      {isWriter && (
        <div className="flex gap-2">
          <button onClick={editButtonClickHandler}>수정</button>
          <button onClick={deleteButtonClickHandler}>삭제</button>
        </div>
      )}
    </header>
  );
};
