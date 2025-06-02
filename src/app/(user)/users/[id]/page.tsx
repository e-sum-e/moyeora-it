'use client';

import LogoutButton from '@/components/atoms/logout-button';
import { useParams } from 'next/navigation';
import useAuthStore from '@/stores/useAuthStore';

export default function UserPage() {
  const { id } = useParams<{ id: string }>();
  const user = useAuthStore((s) => s.user);

  return (
    <>
      마이 페이지
      {/* 본인 페이지일 경우에만 로그아웃 버튼 렌더링 */}
      {/* 로그아웃 기능을 위해 임시로 넣어뒀습니다 */}
      {id === String(user?.userId) && <LogoutButton />}
    </>
  );
}
