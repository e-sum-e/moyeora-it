'use client';

import { AddRereplyButton } from '@/components/atoms/reply/add-rereply-button';
import { useState } from 'react';
import { ReplyForm } from './reply-form';

type RereplyFormToggleProps = {
  parentReplyId: number;
  onSuccess: (newReplyId: number) => void;
};

export const RereplyFormToggle = ({
  parentReplyId,
  onSuccess,
}: RereplyFormToggleProps) => {
  const [isWriting, setIsWriting] = useState<boolean>(false);

  const rereplyFormSuccessHandler = (newReplyId: number) => {
    setIsWriting(false);
    onSuccess(newReplyId);
  };

  return isWriting ? (
    <ReplyForm
      parentReplyId={parentReplyId}
      onSuccess={rereplyFormSuccessHandler}
    />
  ) : (
    <AddRereplyButton onClick={() => setIsWriting(true)} />
  );
};
