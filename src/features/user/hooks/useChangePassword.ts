import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { request } from '@/api/request';

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
      const formData = new FormData();
      formData.append('newPassword', newPassword);
      formData.append('confirmPassword', confirmPassword);

      return request.patch('/v1/user/edit', {}, formData, {
        credentials: 'include',
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
