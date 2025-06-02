import { ReplyContent } from '@/components/molecules/reply/reply-content';
import { Reply } from '@/types';
import { ReplyThread } from './reply-thread';

export const ReplyItem = ({
  content,
  writer,
  createdAt,
  replyId,
  isDeleted,
}: Reply) => {
  return (
    <>
      <ReplyContent
        content={content}
        writer={writer}
        createdAt={createdAt}
        replyId={replyId}
        isDeleted={isDeleted}
      />
      <ReplyThread parentReplyId={replyId} />
    </>
  );
};
