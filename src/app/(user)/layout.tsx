import { UserProfile } from '@/features/user/components/user-profile';
import { EditUserProfileDialog } from '@/features/user/components/edit-user-profile-dialog';

export default function UserPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UserProfile />
      <EditUserProfileDialog />
      <main>{children}</main>
    </>
  );
}
