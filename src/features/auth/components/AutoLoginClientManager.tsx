'use client';

import { request } from '@/api/request';
import useAuthStore from '@/stores/useAuthStore';
import { UserInfoResponse } from '@/types/response';
import { useEffect } from 'react';

type AuthClientProviderProps = {
  hasToken: boolean;
};

// localStorage와 서버가 불일치 할 수도 있어서 재접속시 프로필 1회 업데이트
const AutoLoginClientManager = ({ hasToken }: AuthClientProviderProps) => {
  const setUser = useAuthStore((s) => s.setUser);
  const clearUser = useAuthStore((s) => s.clearUser);

  // 재접속시 무조건 한번만 실행되야함!! 0번도 안되고 2번도 안됨
  useEffect(() => {
    const getProfile = async () => {
      try {
        // 회원정보 불러오기 /me
        const responseBody: UserInfoResponse = await request.get(
          '/v1/user/info',
        );

        setUser({
          ...responseBody.items.items,
          userId: responseBody.items.items.id.toString(),
        });
      } catch (e) {
        console.log(e);
        clearUser();
      }
    };

    if (hasToken) {
      getProfile();
    } else {
      clearUser();
    }
    // eslint-disable-next-line
  }, []);

  return null;
};

export default AutoLoginClientManager;
