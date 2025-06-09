'use client';

import { WriteForm } from '@/components/organisms/write-form';
import useAuthStore from '@/stores/useAuthStore';
import { routes } from '@/utils/routes';
import { useRouter } from 'next/navigation';

export default function Page() {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  if (!user) {
    router.push(routes.login);

    return;
  }

  return <WriteForm userId={user.userId} />;
}
