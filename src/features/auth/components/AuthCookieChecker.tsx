import { cookies } from 'next/headers';
import AutoLoginClient from '@/features/auth/components/AutoLoginClient';

// 사용자 접속시 쿠키 여부를 판단합니다
// TODO: 쿠키 이름은 변경될 수 있습니다
const AuthCookieChecker = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken');
  const refreshToken = cookieStore.get('refreshToken');

  const hasToken = !!(accessToken && refreshToken);

  return <AutoLoginClient hasToken={hasToken} />;
};

export default AuthCookieChecker;
