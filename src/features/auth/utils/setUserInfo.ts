import { request } from '@/api/request';
import { User } from '@/types';
import { UserInfoResponse } from '@/types/response';

export const fetchAndSetUser = async (
  setUser: (user: User) => void
): Promise<void> => {
  try {
    const responseBody: UserInfoResponse = await request.get('/v1/user/info', {}, {
      credentials: 'include',
    });
    if(responseBody.status.success){
      setUser({
        ...responseBody.items.items,
      });
    }else{
      throw new Error('유저 정보 불러오기 실패');
    }
  } catch (error) {
    console.error('유저 정보 불러오기 실패', error);
    // 필요시 에러 처리 로직 추가
    throw error;
  }
};
