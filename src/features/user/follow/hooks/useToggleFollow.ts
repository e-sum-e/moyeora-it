import { useMutation, useQueryClient } from '@tanstack/react-query';
import { request } from '@/api/request';
import { toast } from 'sonner';

export const useToggleFollow = ({
  userId,
  isFollowing,
  usedIn,
}: {
  userId: string;
  isFollowing: boolean;
  usedIn: string;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn() {
      return request.post(
        `/users/${userId}/${isFollowing ? 'unfollow' : 'follow'}`,
        {
          'Content-Type': 'application/json',
        },
        JSON.stringify({ userId }),
      );
    },
    onError() {
      toast.error('에러가 발생했어요.', {
        description:
          '요청 사항을 처리하는 데 에러가 발생했어요. 잠시 후 다시 시도해주세요.',
      });
    },
    onSettled() {
      return queryClient.invalidateQueries({
        queryKey:
          usedIn === 'profile' ? ['user'] : ['items', `/users/${usedIn}`],
      });
    },
  });
};
