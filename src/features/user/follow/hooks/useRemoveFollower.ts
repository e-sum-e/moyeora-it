import { useMutation, useQueryClient } from '@tanstack/react-query';
import { request } from '@/api/request';
import { toast } from 'sonner';

export const useRemoveFollower = ({ userId }: { userId: string }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn() {
      return request.post(
        `/users/${userId}/unfollower`,
        {
          'Content-Type': 'application/json',
        },
        JSON.stringify({ userId }),
      );
    },
    onError() {
      toast.error('팔로워 삭제 실패', {
        description: '팔로워 삭제에 실패했어요. 잠시 후 다시 시도해주세요.',
      });
    },
    onSettled() {
      return queryClient.invalidateQueries({
        queryKey: ['items', '/users/followers'],
      });
    },
  });
};
