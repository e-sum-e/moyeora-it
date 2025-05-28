import { useMutation } from '@tanstack/react-query';
import { request } from '@/api/request';
import { toast } from 'sonner';

/**
 * 사용자의 모임 참가를 관리하는 커스텀 훅
 *
 * 모임 참가 요청 승인 및 거절 처리
 *
 * @returns useMutation 훅 반환값
 */
export const useManageParticipation = () => {
  return useMutation({
    mutationFn({
      groupId,
      userId,
      status,
    }: {
      groupId: string;
      userId: string;
      status: 'approve' | 'deny';
    }) {
      return request.post(
        `/api/groups/${groupId}/join`,
        {
          'Content-Type': 'application/json',
        },
        JSON.stringify({
          userId,
          status,
        }),
      );
    },
    onSuccess() {
      // TODO: 쿼리 무효화
    },
    onError() {
      toast('에러가 발생했습니다.', {
        description:
          '요청사항을 처리하는 데 실패했습니다. 잠시 후 다시 시도해주세요.',
      });
    },
  });
};
