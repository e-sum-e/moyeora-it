'use client';

import { ReplyForm } from '@/components/molecules/reply/reply-form';
import { ReplyItem } from '@/components/organisms/reply/reply-item';
import { useFetchInView } from '@/hooks/useFetchInView';
import { useFetchItems } from '@/hooks/useFetchItems';
import { useReplyScrollIntoView } from '@/hooks/useReplyScrollIntoView';
import { useReplyScrollParams } from '@/hooks/useReplyScrollParams';
import { Reply } from '@/types';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export const ReplyList = () => {
  const { groupId } = useParams();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useFetchItems<Reply>({
      url: `/groups/${groupId}/replies`,
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

  const replies = data.pages.flatMap((page) => page.items);

  return (
    <section className="w-4/5 mx-auto flex flex-col gap-10">
      <ReplyForm onSuccess={replyFormSuccessHandler} />
      <div>
        <ul>
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
