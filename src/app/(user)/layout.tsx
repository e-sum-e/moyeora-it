import { UserProfile } from '@/features/user/components/user-profile';
import { EditUserProfileDialog } from '@/features/user/components/edit-user-profile-dialog';
import { UserPageTabs } from '@/features/user/components/user-page-tabs';

export default function UserPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UserProfile />
      <EditUserProfileDialog />
      <UserPageTabs />
      <main>{children}</main>
    </>
  );
}
