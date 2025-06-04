'use client';

import { request } from '@/api/request';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useMutation } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const ApplyJoinButton = ({
  isLoginUser,
  onSuccess,
}: {
  isLoginUser: boolean;
  onSuccess: () => void;
}) => {
  const router = useRouter();
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

  if (isLoginUser) {
    return (
      <Button onClick={joinGroupHandler} disabled={isPending}>
        참여 신청
      </Button>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>참여 신청</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] p-10">
        <DialogTitle className="font-normal">
          로그인이 필요한 서비스입니다
        </DialogTitle>
        <DialogFooter className="p-4">
          <Button onClick={() => router.push('/login')}>로그인하러 가기</Button>
          <DialogClose asChild>
            <Button>확인</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
