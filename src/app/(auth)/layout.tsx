import checkAuthCookie from '@/features/auth/utils/checkAuthCookie';
import { redirect } from 'next/navigation';

export default async function AuthPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isValidCookie = await checkAuthCookie();

  if (isValidCookie) {
    // 로그인한 상태에서 로그인 페이지에 접근할 일이 있을까?
    // 계획상 주소창에서 직접 접근하는 경우를 제외하고는 없음
    // 뒤로가기나 회원가입 후 프로필 설정 안하고 로그인으로 돌아가기버튼 클릭시!!
    // 직접 접근할 경우 새로고침 => prevPathname을 저장할 수 없으므로 메인으로
    redirect('/');
  }

  return children;
}
