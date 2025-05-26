'use client';

import { RereplyFormToggle } from '@/components/molecules/reply/rereply-form-toggle';
import { RereplyList } from '@/components/organisms/reply/rereply-list';
import { useFetchInView } from '@/hooks/useFetchInView';
import { useFetchItems } from '@/hooks/useFetchItems';
import { Reply } from '@/types';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export const ReplyThread = ({ replyId }: { replyId: number }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const rereplyToggleButtonClickHandler = () => {
    setIsOpen((prev) => !prev);
  };

  const { groupId } = useParams();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFetchItems<Reply & { parentId: number }>({
      url: `/api/groups/${groupId}/replies/${replyId}`,
      queryParams: {
        size: 10,
      },
    });

  const { ref } = useFetchInView({
    fetchNextPage,
  });

  const allRereplies = data.pages.flatMap((page) => page.items);

  const [newReplyId, setNewReplyId] = useState<number | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  // 스크롤 이동
  useEffect(() => {
    if (newReplyId) {
      if (!newReplyId) return;

      if (!toggleRef.current) return;

      const isOpen = toggleRef.current.dataset.open === 'true';

      // 대댓글 리스트가 접혀있으면 열기
      if (!isOpen) {
        toggleRef.current.click();
      }

      requestAnimationFrame(() => {
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
      });
    }
  }, [data, newReplyId]);

  const replyFormSuccessHandler = (newReplyId: number) => {
    setNewReplyId(newReplyId);
  };

  return (
    <>
      <div className="p-2 rounded">
        <div className="flex justify-between mb-2">
          <div>대댓글</div>
          <button
            onClick={rereplyToggleButtonClickHandler}
            ref={toggleRef}
            data-open={isOpen}
          >
            {isOpen ? '접기' : '펼치기'}
          </button>
        </div>
        {isOpen && (
          <>
            <RereplyList rereplies={allRereplies} />
            <div ref={bottomRef} />
          </>
        )}

        {isOpen && hasNextPage && !isFetchingNextPage && (
          <div ref={ref} className="h-2 -translate-y-50 bg-transparent" />
        )}
      </div>
      <RereplyFormToggle
        parentReplyId={replyId}
        onSuccess={replyFormSuccessHandler}
      />
    </>
  );
};
