import { UserProfile } from '@/features/user/components/user-profile';
import { UserPageTabs } from '@/features/user/components/user-page-tabs';
import { redirect } from 'next/navigation';
import checkAuthCookie from '@/features/auth/utils/checkAuthCookie';

export default async function UserPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const hasToken = await checkAuthCookie();

  if (!hasToken) {
    redirect('/login');
  }

  return (
    <>
      <UserProfile />
      <UserPageTabs />
      <main>{children}</main>
    </>
  );
}
