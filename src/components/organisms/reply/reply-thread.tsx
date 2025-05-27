'use client';

import { RereplyFormToggle } from '@/components/molecules/reply/rereply-form-toggle';
import { RereplyList } from '@/components/organisms/reply/rereply-list';
import { useState } from 'react';

export const ReplyThread = ({ replyId }: { replyId: number }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [newReplyId, setNewReplyId] = useState<number | null>(null);

  const replyFormSuccessHandler = (newReplyId: number) => {
    setNewReplyId(newReplyId);
    setIsOpen(true);
  };

  return (
    <>
      <div className="p-2 rounded">
        <div className="flex justify-between mb-2">
          <div>대댓글</div>
          <button onClick={() => setIsOpen((prev) => !prev)}>
            {isOpen ? '접기' : '펼치기'}
          </button>
        </div>
        {isOpen && (
          <RereplyList
            newReplyId={newReplyId}
            setNewReplyId={setNewReplyId}
            parentReplyId={replyId}
          />
        )}
      </div>
      <RereplyFormToggle
        parentReplyId={replyId}
        onSuccess={replyFormSuccessHandler}
      />
    </>
  );
};
