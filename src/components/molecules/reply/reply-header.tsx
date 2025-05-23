'use client';

import { Avatar } from '@/components/atoms/avatar';
import { User } from '@/types';

type ReplyHeaderProps = {
  writer: Omit<User, 'email'>;
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
          imageSrc={writer.profileImage}
          fallback={writer.name[0]}
          className="w-10 h-10 cursor-pointer"
          onClick={() => {}}
        />
        <div className="flex flex-col">
          <div>{writer.name}</div>
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
