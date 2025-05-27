import { cookies } from 'next/headers';
import AutoLoginClientManager from '@/features/auth/components/AutoLoginClientManager';

// 사용자 접속시 http only 쿠키 여부를 판단합니다
// 판단후 클라이언트 컴포넌트인 AutoLoginClient에서 자동로그인을 할지 결정합니다
// TODO: 쿠키 이름은 변경될 수 있습니다
const AutoLoginManager = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(process.env.ACCESS_TOKEN as string);
  const refreshToken = cookieStore.get(process.env.REFRESH_TOKEN as string);

  const hasToken = !!(accessToken && refreshToken);

  return <AutoLoginClientManager hasToken={hasToken} />;
};

export default AutoLoginManager;
