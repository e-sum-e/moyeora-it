'use client';

import { RereplyList } from '@/components/molecules/reply/rereply-list';
import { useState } from 'react';

type ReplyThreadProps = {
  replyId: number;
};

export const ReplyThread = ({ replyId }: ReplyThreadProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const rereplyToggleButtonClickHandler = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="p-2 rounded">
      <div className="flex justify-between mb-2">
        <div>대댓글</div>
        <button onClick={rereplyToggleButtonClickHandler}>
          {isOpen ? '접기' : '펼치기'}
        </button>
      </div>
      {isOpen && <RereplyList parentReplyId={replyId} />}
    </div>
  );
};
