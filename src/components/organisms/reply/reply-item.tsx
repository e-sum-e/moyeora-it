import { ReplyContent } from '@/components/molecules/reply/reply-content';
import { Reply } from '@/types';
import { ReplyThread } from './reply-thread';

export const ReplyItem = ({
  content,
  writer,
  createdAt,
  replyId,
  deleted,
}: Reply) => {
  return (
    <div className="border-2 rounded-lg">
      <ReplyContent
        content={content}
        writer={writer}
        createdAt={createdAt}
        replyId={replyId}
        deleted={deleted}
      />
      <ReplyThread parentReplyId={replyId} />
    </div>
  );
};
