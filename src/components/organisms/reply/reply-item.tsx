'use client';

import { AddRereplyButton } from '@/components/atoms/reply/add-rereply-button';
import { ReplyContent } from '@/components/molecules/reply/reply-content';
import { RereplyList } from '@/components/organisms/reply/rereply-list';
import { Reply } from '@/types';
import { useState } from 'react';

export const ReplyItem = ({ content, writer, createdAt, replyId }: Reply) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const rereplyToggleButtonClickHandler = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <li id={`reply-${replyId}`} className="space-y-2">
      <ReplyContent
        content={content}
        writer={writer}
        createdAt={createdAt}
        replyId={replyId}
      />
      <div className="p-2 rounded">
        <div className="flex justify-between mb-2">
          <div>대댓글</div>
          <button onClick={rereplyToggleButtonClickHandler}>
            {isOpen ? '접기' : '펼치기'}
          </button>
        </div>
        {isOpen && <RereplyList parentReplyId={replyId} />}
      </div>
      <AddRereplyButton />
    </li>
  );
};
