'use client';

import { useEffect } from 'react';
import { User } from '@/types';
import useAuthStore from '@/stores/useAuthStore';

type AuthClientProviderProps = {
  hasToken: boolean;
};

// localStorage와 서버가 불일치 할 수도 있어서 재접속시 프로필 1회 업데이트
const AutoLoginClient = ({ hasToken }: AuthClientProviderProps) => {
  const setUser = useAuthStore((s) => s.setUser);
  const clearUser = useAuthStore((s) => s.clearUser);

  // 재접속시 무조건 한번만 실행되야함!! 0번도 안되고 2번도 안됨
  useEffect(() => {
    const getProfile = async () => {
      try {
        // TODO: 회원정보 불러오기 /me
        const response = await fetch('http://localhost:4000/api/me');
        const { user } = await response.json();

        setUser(user as User);
      } catch (e) {
        console.log(e);
        clearUser();
      }
    };

    if (hasToken) {
      getProfile();
    }
  }, []);

  return <></>;
};

export default AutoLoginClient;
