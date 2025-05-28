'use client';

import { AddRereplyButton } from '@/components/atoms/reply/add-rereply-button';
import { useState } from 'react';
import { ReplyForm } from './reply-form';

type RereplyFormToggleProps = {
  parentReplyId: number;
};

export const RereplyFormToggle = ({
  parentReplyId,
}: RereplyFormToggleProps) => {
  const [isWriting, setIsWriting] = useState<boolean>(false);

  const rereplyFormSuccessHandler = () => {
    setIsWriting(false);
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
