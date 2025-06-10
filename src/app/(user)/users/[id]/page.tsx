'use client';

import LogoutButton from '@/components/atoms/logout-button';
import { useParams } from 'next/navigation';
import useAuthStore from '@/stores/useAuthStore';

export default function UserPage() {
  const { id } = useParams<{ id: string }>();

  const user = useAuthStore((state) => state.user);

  return (
    <>
      <div>유저 페이지</div>
      {user && id === String(user?.userId) && <LogoutButton />}
    </>
  );
}
