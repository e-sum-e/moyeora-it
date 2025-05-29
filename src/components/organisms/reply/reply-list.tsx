'use client';

import { ReplyForm } from '@/components/molecules/reply/reply-form';
import { ReplyItem } from '@/components/organisms/reply/reply-item';
import { useFetchInView } from '@/hooks/useFetchInView';
import { useFetchItems } from '@/hooks/useFetchItems';
import { useReplyScrollParams } from '@/hooks/useReplyScrollParams';
import { Reply } from '@/types';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

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

  const allReplies = data.pages.flatMap((page) => page.items);

  const { targetId } = useReplyScrollParams('reply');
  const [targetReplyId, setTargetReplyId] = useState<number | null>(targetId);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const replyRefs = useRef<Record<number, HTMLLIElement | null>>({});

  // 스크롤 이동
  useEffect(() => {
    if (targetReplyId === null) return;

    const targetElement = replyRefs.current[targetReplyId];

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'instant',
        block: 'center',
      });
      setTargetReplyId(null);
    } else {
      // 찾을 수 없으면 제일 아래로
      bottomRef.current?.scrollIntoView({
        behavior: 'instant',
        block: 'end',
      });
    }
  }, [data, targetReplyId]);

  const replyFormSuccessHandler = (id: number) => {
    setTargetReplyId(id);
  };

  return (
    <section className="w-4/5 mx-auto flex flex-col gap-10">
      <ReplyForm onSuccess={replyFormSuccessHandler} />
      <div>
        <ul>
          {allReplies.map((reply) => (
            <li
              key={reply.replyId}
              ref={(el) => {
                replyRefs.current[reply.replyId] = el;
              }}
              className="space-y-2"
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
