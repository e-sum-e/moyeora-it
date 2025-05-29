import { UserProfile } from '@/features/user/components/user-profile';
import { EditUserProfileDialog } from '@/features/user/components/edit-user-profile-dialog';
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
      <EditUserProfileDialog />
      <UserPageTabs />
      <main>{children}</main>
    </>
  );
}
