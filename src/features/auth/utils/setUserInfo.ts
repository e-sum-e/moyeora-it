import { request } from '@/api/request';
import { User } from '@/types';
import { UserInfoResponse } from '@/types/response';

export const fetchAndSetUser = async (
  setUser: (user: User) => void
): Promise<void> => {
  try {
    const responseBody: UserInfoResponse = await request.get('/v1/user/info');
    setUser({
      ...responseBody.data,
      userId: responseBody.userId || responseBody.data.userId.toString(), //TODO: 백엔드 response타입 수정 후 삭제
    });
  } catch (error) {
    console.error('유저 정보 불러오기 실패', error);
    // 필요시 에러 처리 로직 추가
    throw error;
  }
};
