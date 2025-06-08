'use client';

import { request } from '@/api/request';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import { LoginRequireButton } from '../login-require-button';

export const ApplyJoinButton = ({ onSuccess }: { onSuccess: () => void }) => {
  const { groupId } = useParams<{ groupId: string }>();
  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      request.post(
        `/v2/groups/${groupId}/applications`,
        {},
        JSON.stringify({}),
        { credentials: 'include' },
      ),
    onError: () => {
      toast.error('참여 신청에 실패하였습니다. 잠시 후 다시 시도해주세요.');
    },
    onSuccess: () => {
      onSuccess();
      toast.success('참여 신청이 되었습니다.');
    },
  });

  const joinGroupHandler = () => {
    mutate();
  };

  return (
    <LoginRequireButton onClick={joinGroupHandler} disabled={isPending}>
      참여 신청
    </LoginRequireButton>
  );
};
