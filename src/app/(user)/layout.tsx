import { UserProfile } from '@/features/user/components/user-profile';
import { EditUserProfileDialog } from '@/features/user/components/edit-user-profile-dialog';
import { UserPageTabs } from '@/features/user/components/user-page-tabs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const checkAuth = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken');
  const refreshToken = cookieStore.get('refreshToken');

  if (!accessToken || !refreshToken) {
    redirect('/login');
  }
};

export default async function UserPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await checkAuth();

  return (
    <>
      <UserProfile />
      <EditUserProfileDialog />
      <UserPageTabs />
      <main>{children}</main>
    </>
  );
}
