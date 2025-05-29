'use client';

import useAuthStore from '@/stores/useAuthStore';
import { request } from '@/api/request';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const LogoutButton = () => {
  const { user, clearUser } = useAuthStore();
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();

  if (!user) {
    return null; // 로그인하지 않은 경우 버튼을 렌더링하지 않음
  }

  const onClick = async () => {
    try {
      setDisabled(true);
      await request.post(
        '/logout',
        {
          'Content-Type': 'application/json',
        },
        '{}',
      );

      clearUser();
      router.push('/login');
    } catch (error) {
      // TODO: 로그아웃 실패 처리
      console.log(error);
    } finally {
      setDisabled(false);
    }
  };

  return (
    <Button disabled={disabled} onClick={onClick}>
      로그아웃
    </Button>
  );
};

export default LogoutButton;
