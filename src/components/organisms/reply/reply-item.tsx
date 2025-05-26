import { ReplyContent } from '@/components/molecules/reply/reply-content';
import { Reply } from '@/types';
import { ReplyThread } from './reply-thread';

export const ReplyItem = ({ content, writer, createdAt, replyId }: Reply) => {
  return (
    <li className="space-y-2">
      <ReplyContent
        content={content}
        writer={writer}
        createdAt={createdAt}
        replyId={replyId}
      />
      <ReplyThread replyId={replyId} />
    </li>
  );
};
