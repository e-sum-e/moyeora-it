'use client';

import { ReplyForm } from '@/components/molecules/reply/reply-form';
import { ReplyItem } from '@/components/organisms/reply/reply-item';
import { useFetchInView } from '@/hooks/useFetchInView';
import { useFetchItems } from '@/hooks/useFetchItems';
import { Reply } from '@/types';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export const ReplyList = () => {
  const { groupId } = useParams();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFetchItems<Reply>({
      url: `/api/groups/${groupId}/replies`,
      queryParams: {
        size: 10,
      },
    });
  const { ref } = useFetchInView({
    fetchNextPage,
  });

  const allReplies = data.pages.flatMap((page) => page.items);

  const [newReplyId, setNewReplyId] = useState<number | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // 스크롤 이동
  useEffect(() => {
    console.log('data changed');
    if (!newReplyId) return;

    const element = document.getElementById(`reply-${newReplyId}`);

    if (element) {
      element.scrollIntoView({ behavior: 'instant', block: 'center' });
      setNewReplyId(null);
    } else {
      // 찾을 수 없으면 제일 아래로
      bottomRef.current?.scrollIntoView({
        behavior: 'instant',
        block: 'end',
      });
    }
  }, [data, newReplyId]);

  const replyFormSuccessHandler = (id: number) => {
    setNewReplyId(id);
  };

  return (
    <section className="w-4/5 mx-auto flex flex-col gap-10">
      <ReplyForm onSuccess={replyFormSuccessHandler} />
      <div>
        <ul>
          {allReplies.map(
            ({ replyId, writer, content, createdAt, isDeleted }) => (
              <ReplyItem
                key={replyId + content.slice(0, 3)}
                writer={writer}
                content={content}
                createdAt={createdAt}
                replyId={replyId}
                isDeleted={isDeleted}
              />
            ),
          )}
        </ul>
        <div ref={bottomRef} id="reply-list-bottom" />
        {hasNextPage && !isFetchingNextPage && (
          <div ref={ref} className="h-2 -translate-y-100 bg-transparent" />
        )}
      </div>
    </section>
  );
};
