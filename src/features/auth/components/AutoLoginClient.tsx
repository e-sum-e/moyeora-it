'use client';

import { useEffect } from 'react';
import { User } from '@/types';
import useAuthStore from '@/stores/useAuthStore';

type AuthClientProviderProps = {
  hasToken: boolean;
};

const AutoLoginClient = ({ hasToken }: AuthClientProviderProps) => {
  const login = useAuthStore((s) => s.login);

  // 재접속시 무조건 한번만 실행되야함!! 0번도 안되고 2번도 안됨
  useEffect(() => {
    const getProfile = async () => {
      try {
        // TODO: 회원정보 불러오기 /me
        const response = await fetch('http://localhost:4000/api/me');
        const { user } = await response.json();

        login(user as User);
      } catch (e) {
        console.log(e);
      }
    };

    if (hasToken) {
      getProfile();
    }
  }, []);

  return <></>;
};

export default AutoLoginClient;
