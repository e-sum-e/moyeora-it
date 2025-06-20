'use client';

import { AddRereplyButton } from '@/components/atoms/reply/add-rereply-button';
import { useState } from 'react';
import { ReplyForm } from './reply-form';

type RereplyFormToggleProps = {
  parentReplyId: number;
  openRereplyList: () => void;
  isOpenRereplyList: boolean;
};

export const RereplyFormToggle = ({
  parentReplyId,
  openRereplyList,
  isOpenRereplyList,
}: RereplyFormToggleProps) => {
  const [isWriting, setIsWriting] = useState<boolean>(false);

  const rereplyFormSuccessHandler = () => {
    setIsWriting(false);
    openRereplyList();
  };

  return isWriting ? (
    <div className="px-5 py-5">
      <ReplyForm
        parentReplyId={parentReplyId}
        onSuccess={rereplyFormSuccessHandler}
        isOpenRereplyList={isOpenRereplyList}
      />
    </div>
  ) : (
    <AddRereplyButton onClick={() => setIsWriting(true)} />
  );
};
