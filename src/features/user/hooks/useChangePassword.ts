import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

/**
 * 비밀번호 변경 커스텀 훅
 */
export const useChangePassword = () => {
  return useMutation({
    mutationFn: ({
      newPassword,
      confirmPassword,
    }: {
      newPassword: string;
      confirmPassword: string;
    }) => {
      return fetch('http://localhost:4000/api/v1/users/password', {
        method: 'PATCH',
        body: JSON.stringify({ newPassword, confirmPassword }),
      });
    },
    onSuccess() {
      toast.success('비밀번호 변경 성공', {
        description: '비밀번호가 변경되었어요',
      });
    },
    onError() {
      toast.error('비밀번호 변경 실패', {
        description: '비밀번호 변경에 실패했어요. 잠시 후 다시 시도해주세요.',
      });
    },
  });
};
