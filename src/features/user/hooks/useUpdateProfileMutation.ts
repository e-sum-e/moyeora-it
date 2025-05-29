import { useMutation } from '@tanstack/react-query';
import useAuthStore from '@/stores/useAuthStore';
import { Position, Skill } from '@/types/enums';
import { toast } from 'sonner';
import { User } from '@/types';

/**
 * 프로필 수정 커스텀 훅
 *
 * @param userId 사용자 아이디
 * @returns 프로필 수정 커스텀 훅
 */
export const useUpdateProfileMutation = ({ userId }: { userId: string }) => {
  const { setUser } = useAuthStore((state) => state);

  return useMutation({
    mutationFn: (data: {
      nickname: string;
      position: Position;
      skills: Skill[];
      file?: File;
    }) => {
      const formData = new FormData();
      formData.append('nickname', data.nickname);
      formData.append('position', JSON.stringify(data.position));
      formData.append('skills', JSON.stringify(data.skills));
      if (data.file) {
        formData.append('file', data.file);
      }

      return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${userId}`, {
        method: 'PATCH',
        body: formData,
      }).then((res) => res.json());
    },
    onSuccess(data: User) {
      setUser(data);
      toast.success('프로필 수정 성공', {
        description: '프로필이 수정되었어요',
      });
    },
    onError() {
      toast.error('프로필 수정 실패', {
        description: '프로필 수정에 실패했어요. 잠시 후 다시 시도해주세요.',
      });
    },
  });
};
