'use client';

import { RereplyFormToggle } from '@/components/molecules/reply/rereply-form-toggle';
import { RereplyList } from '@/components/organisms/reply/rereply-list';
import { useReplyScrollParams } from '@/hooks/useReplyScrollParams';
import { useState } from 'react';

export const ReplyThread = ({ parentReplyId }: { parentReplyId: number }) => {
  const { targetParentId, targetId } = useReplyScrollParams('rereply');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [targetReplyId, setTargetReplyId] = useState<number | null>(() => {
    if (parentReplyId === targetParentId) return targetId;
    return null;
  });

  // useEffect(() => {
  //   if (targetReplyId) {
  //     setIsOpen(true);
  //   }
  // }, [parentReplyId, targetParentId, targetReplyId]);

  // const replyFormSuccessHandler = (newReplyId: number | null) => {
  //   setTargetReplyId(newReplyId);
  //   setIsOpen(true);
  // };

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
        {isOpen && (
          <RereplyList
            targetReplyId={targetReplyId}
            setTargetReplyId={setTargetReplyId}
            parentReplyId={parentReplyId}
          />
        )}
      </div>
      <RereplyFormToggle parentReplyId={parentReplyId} onSuccess={() => {}} />
    </div>
  );
};
