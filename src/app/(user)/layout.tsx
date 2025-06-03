import checkAuthCookie from '@/features/auth/utils/checkAuthCookie';
import { redirect } from 'next/navigation';
import { UserProfile } from '@/features/user/components/user-profile';
import { UserPageTabs } from '@/features/user/components/user-page-tabs';

export default async function UserPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ISSUE1: 쿠키가 있다고 인증 처리를 하면 안됨 -> 쿠키는 유저가 임의로 조작가능, api 통신필요
  // ISSUE2: 근데 로그인 안햇다고 해당 페이지 안보여주나요? 일단 가드처리해뒀어요

  const isValid = await checkAuthCookie();

  if (!isValid) {
    redirect('/login');
  }

  // if (!hasToken) {
  //   redirect('/login');
  // }

  return (
    <>
      <UserProfile />
      <UserPageTabs />
      <main>{children}</main>
    </>
  );
}
