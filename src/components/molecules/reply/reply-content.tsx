'use client';

import { ReplyMeta } from '@/components/molecules/reply/reply-meta';
import { Reply } from '@/types';
import { useState } from 'react';

export const ReplyContent = ({
  content,
  replyId,
  writer,
  createdAt,
}: Reply) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const isWriter = true; // writer.userId === user.userId

  const editButtonClickHandler = () => {
    setIsEditing(true);
  };

  const deleteButtonClickHandler = () => {
    console.log(replyId, '삭제');
  };

  return (
    <div>
      <header className="flex justify-between items-start">
        <ReplyMeta writer={writer} createdAt={createdAt} />
        {isWriter && (
          <div className="flex gap-2">
            <button onClick={editButtonClickHandler}>수정</button>
            <button onClick={deleteButtonClickHandler}>삭제</button>
          </div>
        )}
      </header>
      {isEditing ? (
        <textarea
          defaultValue={content}
          className="h-10 w-full border-2 border-slate-950"
        />
      ) : (
        <p>{content}</p>
      )}
    </div>
  );
};
