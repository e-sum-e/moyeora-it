import AutoLoginClientManager from '@/features/auth/components/AutoLoginClientManager';
import checkAuthCookie from '@/features/auth/utils/checkAuthCookie';

// 사용자 접속시 http only 쿠키 여부를 판단합니다
// 판단후 클라이언트 컴포넌트인 AutoLoginClient에서 자동로그인을 할지 결정합니다
// TODO: 쿠키 이름은 변경될 수 있습니다
const AutoLoginManager = async () => {
  
  //ISSUE: 어떻게 쿠키의 여부가 로그인 판단이 되나요? api 통신을 하나요?
  const hasToken = await checkAuthCookie();

  return <AutoLoginClientManager hasToken={hasToken} />;
};

export default AutoLoginManager;
