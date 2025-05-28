import { UserProfile } from '@/features/user/components/user-profile';
import { UserPageTabs } from '@/features/user/components/user-page-tabs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const checkAuth = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(process.env.ACCESS_TOKEN!);
  const refreshToken = cookieStore.get(process.env.REFRESH_TOKEN!);
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
      <UserPageTabs />
      <main>{children}</main>
    </>
  );
}
