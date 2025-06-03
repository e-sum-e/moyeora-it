'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useAuthStore from '@/stores/useAuthStore';

export default function ClientAuthGuard({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace('/login');
    }
    // eslint-disable-next-line
  }, [user]);

  if (!user) return null;

  return <>{children}</>;
}
