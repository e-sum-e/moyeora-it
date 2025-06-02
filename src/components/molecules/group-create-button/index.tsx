'use client';

import { Button } from '@/components/ui/button';
import useAuthStore from '@/stores/useAuthStore';
import { routes } from '@/utils/routes';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const WriteGroupButton = () => {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const writeButtonClickHandler = () => {
    if (!user) {
      toast.info('로그인이 필요합니다.');
      router.push(routes.login);
      return;
    }

    router.push(routes.write);
  };

  return (
    <div>
      <Button onClick={writeButtonClickHandler}>만들기</Button>
    </div>
  );
};
