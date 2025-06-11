'use client';

import { ApplyJoinButton } from '@/components/atoms/apply-join-button.tsx';
import { CancelGroupButton } from '@/components/atoms/cancel-group-button';
import { CancelJoinButton } from '@/components/atoms/cancel-join-button';
import { ShareButton } from '@/components/atoms/share-button';
import useAuthStore from '@/stores/useAuthStore';
import { QueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useState } from 'react';

type GroupActionButtonsProps = {
  hostId: number;
  isApplicant: boolean;
  isJoined: boolean;
  autoAllow: boolean;
};

export const GroupActionButtons = ({
  hostId,
  isApplicant,
  isJoined,
  autoAllow,
}: GroupActionButtonsProps) => {
  const { groupId } = useParams();
  const user = useAuthStore((state) => state.user);
  const [userType, setUserType] = useState<
    'none' | 'host' | 'applicant' | 'nonApplicant'
  >(() => {
    if (user === null) return 'none';
    if (user?.userId === hostId) return 'host';
    if (isApplicant) return 'applicant';
    return 'nonApplicant';
  });
  const queryClient = new QueryClient();

  const successApply = () => {
    setUserType('applicant');

    // 자동 수락일 경우, 모임 상세 페이지 새로 불러오기
    if (autoAllow) {
      queryClient.invalidateQueries({ queryKey: ['group', groupId] });
    }
  };

  const successCancelApply = () => {
    setUserType('nonApplicant');

    // 수락된 참여자일 경우, 모임 상세 페이지 새로 불러오기
    if (isJoined) {
      queryClient.invalidateQueries({ queryKey: ['group', groupId] });
    }
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

  return <ApplyJoinButton onSuccess={successApply} />;
};
