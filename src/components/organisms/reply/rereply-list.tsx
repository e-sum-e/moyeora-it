'use client';

import { ReplyContent } from '@/components/molecules/reply/reply-content';
import { useFetchInView } from '@/hooks/useFetchInView';
import { useFetchItems } from '@/hooks/useFetchItems';
import { Reply } from '@/types';
import { useParams } from 'next/navigation';

type RereplyListProps = {
  parentReplyId: number;
};

export const RereplyList = ({ parentReplyId }: RereplyListProps) => {
  const { groupId } = useParams();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFetchItems<Reply>({
      url: `/api/groups/${groupId}/replies/${parentReplyId}`,
      queryParams: {
        size: 10,
      },
    });

  const { ref } = useFetchInView({
    fetchNextPage,
  });

  const allRereplies = data.pages.flatMap((page) => page.items);

  return (
    <div>
      <ul className="flex flex-col gap-5">
        {allRereplies.map((rereply) => (
          <li key={rereply.replyId}>
            <ReplyContent
              content={rereply.content}
              writer={rereply.writer}
              createdAt={rereply.createdAt}
              replyId={rereply.replyId}
            />
          </li>
        ))}
      </ul>
      {hasNextPage && !isFetchingNextPage && (
        <div ref={ref} className="h-2 -translate-y-50 bg-transparent" />
      )}
    </div>
  );
};
