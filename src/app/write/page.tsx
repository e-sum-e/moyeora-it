'use client';

import { WriteForm } from '@/components/organisms/write-form';
import useAuthStore from '@/stores/useAuthStore';
import { routes } from '@/utils/routes';
import { useRouter } from 'next/navigation';

export default function Page() {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  if (user) {
    router.push(routes.login);

    return;
  }

  return (
    <div className="relative w-[300px] sm:w-[370px] md:w-[740px] m-auto mb-10">
      <WriteForm userId={1} />
    </div>
  );
}
