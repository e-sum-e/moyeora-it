'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useAuthStore from '@/stores/useAuthStore';

type ClientAuthGuardProps = {
  children: React.ReactNode;
  isNeedUser: boolean;
};

export default function ClientAuthGuard({
  children,
  isNeedUser = true,
}: ClientAuthGuardProps) {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!isNeedUser) {
      if (user) {
        router.replace('/');
      }
      return;
    }

    if (!user) {
      router.replace('/login');
    }
    // eslint-disable-next-line
  }, [user]);

  if (!isNeedUser && user) return null;
  if (isNeedUser && !user) return null;

  return <>{children}</>;
}
