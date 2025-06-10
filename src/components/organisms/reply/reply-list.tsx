'use client';

import { ReplyForm } from '@/components/molecules/reply/reply-form';
import { ReplyItem } from '@/components/organisms/reply/reply-item';
import { useFetchInView } from '@/hooks/useFetchInView';
import { useFetchItems } from '@/hooks/useFetchItems';
import { useReplyScrollIntoView } from '@/hooks/useReplyScrollIntoView';
import { useReplyScrollParams } from '@/hooks/useReplyScrollParams';
import { Reply } from '@/types';
import flattenPages from '@/utils/flattenPages';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export const ReplyList = () => {
  const { groupId } = useParams();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useFetchItems<Reply>({
      url: `/v2/groups/${groupId}/replies`,
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

  const { targetId } = useReplyScrollParams('reply');
  const [targetReplyId, setTargetReplyId] = useState<number | null>(targetId);

  const { itemRefs: replyRefs, bottomRef } = useReplyScrollIntoView({
    data,
    targetReplyId,
    setTargetReplyId,
    hasNextPage,
  });

  const replyFormSuccessHandler = (id: number) => {
    setTargetReplyId(id);
  };

  const replies = flattenPages(data.pages);

  return (
    <section>
      <ReplyForm onSuccess={replyFormSuccessHandler} />
      <div className="my-15">
        <ul className="flex flex-col gap-10">
          {replies.map((reply) => (
            <li
              key={reply.replyId}
              className="space-y-2"
              ref={(el) => {
                replyRefs.current[reply.replyId] = el;
              }}
            >
              <ReplyItem {...reply} />
            </li>
          ))}
        </ul>
        <div ref={bottomRef} id="reply-list-bottom" />
        {hasNextPage && !isFetchingNextPage && (
          <div ref={ref} className="h-2 -translate-y-100 bg-transparent" />
        )}
      </div>
    </section>
  );
};
