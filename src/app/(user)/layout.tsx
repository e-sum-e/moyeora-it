import { UserProfile } from '@/features/user/components/user-profile';
import { UserPageTabs } from '@/features/user/components/user-page-tabs';
import ClientAuthGuard from '@/features/auth/components/ClientAuthGuard';
// import checkAuthCookie from '@/features/auth/utils/checkAuthCookie';

export default function UserPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ISSUE1: 쿠키가 있다고 인증 처리를 하면 안됨 -> 쿠키는 유저가 임의로 조작가능, api 통신필요
  // ISSUE2: 근데 로그인 안햇다고 해당 페이지 안보여주나요? 일단 가드처리해뒀어요

  // const hasToken = await checkAuthCookie();

  // if (!hasToken) {
  //   redirect('/login');
  // }

  return (
    <>
      <ClientAuthGuard>
        <UserProfile />
        <UserPageTabs />
        <main>{children}</main>
      </ClientAuthGuard>
    </>
  );
}
