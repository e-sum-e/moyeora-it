'use client';

import { useFetchInView } from '@/hooks/useFetchInView';
import { useFetchItems } from '@/hooks/useFetchItems';
import { useReplyScrollIntoView } from '@/hooks/useReplyScrollIntoView';
import { Reply } from '@/types';
import { useParams } from 'next/navigation';
import { RereplyItem } from './rereply-item';

type RereplyListProps = {
  parentReplyId: number;
  targetReplyId: number | null;
  setTargetReplyId: (id: number | null) => void;
};

export const RereplyList = ({
  targetReplyId,
  parentReplyId,
  setTargetReplyId,
}: RereplyListProps) => {
  const { groupId } = useParams();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useFetchItems<Reply & { parentId: number }>({
      url: `/v2/groups/${groupId}/replies/${parentReplyId}`,
      queryParams: {
        size: 10,
      },
      options: {
        staleTime: 0,
      },
    });

  const { ref } = useFetchInView({
    fetchNextPage,
    isLoading,
  });

  const { itemRefs: rereplyRefs, bottomRef } = useReplyScrollIntoView({
    data,
    targetReplyId,
    setTargetReplyId,
    hasNextPage,
  });

  const rereplies = data.pages.flatMap((page) => page.items);

  return (
    <div>
      <ul className="flex flex-col gap-5">
        {rereplies.map((rereply) => (
          <RereplyItem
            key={rereply.replyId}
            ref={(el) => {
              rereplyRefs.current[rereply.replyId] = el;
            }}
            {...rereply}
          />
        ))}
      </ul>
      <div ref={bottomRef} />
      {hasNextPage && !isFetchingNextPage && (
        <div ref={ref} className="h-2 -translate-y-50 bg-transparent" />
      )}
    </div>
  );
};
