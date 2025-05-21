import { EditUserProfileDialog } from "@/features/user/components/edit-user-profile-dialog";
import { UserProfile } from "@/features/user/components/user-profile";

export default function MyPage() {
  return (
    <>
      <UserProfile />
      <EditUserProfileDialog />
    </>
  );
}
