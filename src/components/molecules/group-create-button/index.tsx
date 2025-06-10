'use client';

import { Button } from '@/components/ui/button';
import useAuthStore from '@/stores/useAuthStore';
import { routes } from '@/utils/routes';
import { useRouter } from 'next/navigation';

export const WriteGroupButton = () => {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const writeButtonClickHandler = () => {
    if (!user) {
      router.push(routes.login);
      return;
    }

    router.push(routes.write);
  };

  return (
    <div className="absolute right-0 mt-6">
      <Button onClick={writeButtonClickHandler} className="cursor-pointer">
        만들기
      </Button>
    </div>
  );
};
