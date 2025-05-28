'use client';

import { ReplyContent } from '@/components/molecules/reply/reply-content';
import { useFetchInView } from '@/hooks/useFetchInView';
import { useFetchItems } from '@/hooks/useFetchItems';
import { Reply } from '@/types';
import { useParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

type RereplyListProps = {
  parentReplyId: number;
  newReplyId: number | null;
  setNewReplyId: (id: number | null) => void;
};

export const RereplyList = ({
  newReplyId,
  parentReplyId,
  setNewReplyId,
}: RereplyListProps) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const { groupId } = useParams();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useFetchItems<Reply & { parentId: number }>({
      url: `/groups/${groupId}/replies/${parentReplyId}`,
      queryParams: {
        size: 10,
      },
    });

  const { ref } = useFetchInView({
    fetchNextPage,
    isLoading,
  });

  // 스크롤 이동
  useEffect(() => {
    if (newReplyId) {
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
    }
  }, [data, newReplyId, setNewReplyId]);

  const rereplies = data.pages.flatMap((page) => page.items);

  return (
    <div>
      <ul className="flex flex-col gap-5">
        {rereplies.map((rereply) => (
          <li key={rereply.replyId}>
            <ReplyContent {...rereply} />
          </li>
        ))}
      </ul>
      <div ref={bottomRef} />
      {hasNextPage && !isFetchingNextPage && (
        <div ref={ref} className="h-2 -translate-y-50 bg-transparent" />
      )}
    </div>
  );
};
