import { AddRereplyButton } from '@/components/atoms/reply/add-rereply-button';
import { ReplyContent } from '@/components/atoms/reply/reply-content';
import { ReplyHeader } from '@/components/molecules/reply/reply-header';
import { ReplyThread } from '@/components/molecules/reply/reply-thread';

type ReplyProps = {
  content: string;
  writer: {
    userId: string;
    nickname: string;
    profileImage: string;
  };
  createdAt: string;
  replyId: number;
};

export const Reply = ({ content, writer, createdAt, replyId }: ReplyProps) => {
  return (
    <article id={`reply-${replyId}`} className="space-y-2">
      <ReplyHeader writer={writer} createdAt={createdAt} replyId={replyId} />
      <ReplyContent content={content} />
      <ReplyThread replyId={replyId} />
      <AddRereplyButton />
    </article>
  );
};
