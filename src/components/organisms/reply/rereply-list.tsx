'use client';

import { ReplyContent } from '@/components/molecules/reply/reply-content';
import { useFetchInView } from '@/hooks/useFetchInView';
import { useFetchItems } from '@/hooks/useFetchItems';
import { Reply } from '@/types';
import { useParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

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
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const { groupId } = useParams();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFetchItems<Reply & { parentId: number }>({
      url: `/groups/${groupId}/replies/${parentReplyId}`,
      queryParams: {
        size: 10,
      },
    });

  const { ref } = useFetchInView({
    fetchNextPage,
  });

  // 스크롤 이동
  useEffect(() => {
    if (targetReplyId === null) return;

    const element = document.getElementById(`reply-${targetReplyId}`);

    if (element) {
      element.scrollIntoView({ behavior: 'instant', block: 'center' });
      setTargetReplyId(null);
    } else {
      // 찾을 수 없으면 제일 아래로
      bottomRef.current?.scrollIntoView({
        behavior: 'instant',
        block: 'end',
      });
    }

    if (!hasNextPage) setTargetReplyId(null);
  }, [data, targetReplyId, setTargetReplyId, hasNextPage]);

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
