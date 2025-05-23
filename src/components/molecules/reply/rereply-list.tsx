import { ReplyContent } from '@/components/atoms/reply/reply-content';
import { ReplyHeader } from '@/components/molecules/reply/reply-header';
import { useFetchInView } from '@/hooks/useFetchInView';
import { useFetchItems } from '@/hooks/useFetchItems';
import { Reply } from '@/types';

type RereplyListProps = {
  parentReplyId: number;
};

export const RereplyList = ({ parentReplyId }: RereplyListProps) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFetchItems<Reply>({
      url: `/api/groups/1/replies/${parentReplyId}`,
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
            <ReplyHeader
              writer={rereply.writer}
              createdAt={rereply.createdAt}
              replyId={rereply.replyId}
            />
            <ReplyContent content={rereply.content} />
          </li>
        ))}
      </ul>
      {hasNextPage && !isFetchingNextPage && (
        <div ref={ref} className="h-2 -translate-y-50 bg-red-500" />
      )}
    </div>
  );
};
