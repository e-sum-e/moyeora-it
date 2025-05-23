import { AddRereplyButton } from '@/components/atoms/reply/add-rereply-button';
import { ReplyContent } from '@/components/atoms/reply/reply-content';
import { ReplyHeader } from '@/components/molecules/reply/reply-header';
import { ReplyThread } from '@/components/molecules/reply/reply-thread';
import { Reply } from '@/types';

export const ReplyItem = ({ content, writer, createdAt, replyId }: Reply) => {
  return (
    <article id={`reply-${replyId}`} className="space-y-2">
      <ReplyHeader writer={writer} createdAt={createdAt} replyId={replyId} />
      <ReplyContent content={content} />
      <ReplyThread replyId={replyId} />
      <AddRereplyButton />
    </article>
  );
};
