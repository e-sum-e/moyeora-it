'use client';

import { RereplyFormToggle } from '@/components/molecules/reply/rereply-form-toggle';
import { RereplyList } from '@/components/organisms/reply/rereply-list';
import { useTargetReplyParams } from '@/hooks/useTargetReplyParams ';
import { useTargetReplyStore } from '@/stores/useTargetReply';
import { useEffect, useState } from 'react';

export const ReplyThread = ({ parentReplyId }: { parentReplyId: number }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { notificationTargetReplyId, notificationTargetRereplyId } =
    useTargetReplyParams();
  const setTargetReply = useTargetReplyStore((state) => state.setTargetReply);

  useEffect(() => {
    if (
      notificationTargetRereplyId &&
      parentReplyId === notificationTargetReplyId
    ) {
      setIsOpen(true);
      setTargetReply({ targetRereplyId: notificationTargetRereplyId });
    }
  }, [
    notificationTargetReplyId,
    notificationTargetRereplyId,
    parentReplyId,
    setTargetReply,
  ]);

  return (
    <div className="bg-gray-100">
      <div>
        <div className="flex justify-between mb-2 pt-3 px-3">
          <div>대댓글</div>
          <button
            className="cursor-pointer"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? '접기' : '펼치기'}
          </button>
        </div>
        {isOpen && <RereplyList parentReplyId={parentReplyId} />}
      </div>
      <RereplyFormToggle
        parentReplyId={parentReplyId}
        openRereplyList={() => setIsOpen(true)}
        isOpenRereplyList={isOpen}
      />
    </div>
  );
};
