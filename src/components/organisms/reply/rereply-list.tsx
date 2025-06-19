'use client';

import { useFetchInView } from '@/hooks/useFetchInView';
import { useFetchItems } from '@/hooks/useFetchItems';
import { useReplyScrollIntoView } from '@/hooks/useReplyScrollIntoView';
import { Reply } from '@/types';
import flattenPages from '@/utils/flattenPages';
import { useParams } from 'next/navigation';
import { RereplyItem } from './rereply-item';

type RereplyListProps = {
  parentReplyId: number;
};

export const RereplyList = ({ parentReplyId }: RereplyListProps) => {
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
    replyType: 'rereply',
  });

  const rereplies = flattenPages(data.pages);

  if (rereplies.length === 0) return null;

  return (
    <div>
      <ul className="flex flex-col gap-3">
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
