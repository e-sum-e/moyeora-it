'use client';

import { ReplyContent } from '@/components/molecules/reply/reply-content';
import { Reply } from '@/types';

type RereplyListProps = {
  rereplies: (Reply & { parentId: number })[];
};

export const RereplyList = ({ rereplies }: RereplyListProps) => {
  return (
    <div>
      <ul className="flex flex-col gap-5">
        {rereplies.map((rereply) => (
          <li key={rereply.replyId}>
            <ReplyContent {...rereply} />
          </li>
        ))}
      </ul>
    </div>
  );
};
