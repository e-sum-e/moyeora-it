'use client';

import { ApplyJoinButton } from '@/components/atoms/apply-join-button.tsx';
import { CancelGroupButton } from '@/components/atoms/cancel-group-button';
import { CancelJoinButton } from '@/components/atoms/cancel-join-button';
import { ShareButton } from '@/components/atoms/share-button';
import useAuthStore from '@/stores/useAuthStore';
import { useState } from 'react';

type GroupActionButtonsProps = {
  hostId: string;
  isApplicant: boolean;
};

export const GroupActionButtons = ({
  hostId,
  isApplicant,
}: GroupActionButtonsProps) => {
  const user = useAuthStore((state) => state.user);
  const [userType, setUserType] = useState<
    'none' | 'host' | 'applicant' | 'nonApplicant'
  >(() => {
    if (user === null) return 'none';
    if (user?.userId === hostId) return 'host';
    if (isApplicant) return 'applicant';
    return 'nonApplicant';
  });

  const successApply = () => {
    setUserType('applicant');
  };

  const successCancelApply = () => {
    setUserType('nonApplicant');
  };

  if (userType === 'host') {
    return (
      <>
        <CancelGroupButton />
        <ShareButton />
      </>
    );
  }

  if (userType === 'applicant') {
    return <CancelJoinButton onSuccess={successCancelApply} />;
  }

  return (
    <ApplyJoinButton
      isLoginUser={userType === 'nonApplicant'}
      onSuccess={successApply}
    />
  );
};
