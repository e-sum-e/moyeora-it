'use client';

import { useRouter } from 'next/navigation';
import { useToggleFollow } from '@/features/user/follow/hooks/useToggleFollow';
import { Button } from '@/components/ui/button';
import useAuthStore from '@/stores/useAuthStore';

type ToggleFollowButtonProps = {
  userId?: string;
  isFollowing: boolean;
  usedIn: string;
};

export const ToggleFollowButton = ({
  userId,
  isFollowing,
  usedIn,
}: ToggleFollowButtonProps) => {
  const user = useAuthStore((state) => state.user);

  const router = useRouter();

  const { mutate: toggleFollow, isPending } = useToggleFollow({
    ...(userId && { userId }),
    isFollowing,
    usedIn,
  });

  const toggleFollowButtonClickHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    if (!user) {
      router.push('/login');
      return;
    }
    toggleFollow();
  };

  return (
    <Button
      variant={isFollowing ? 'outline' : 'default'}
      size="sm"
      onClick={toggleFollowButtonClickHandler}
      disabled={isPending}
    >
      {isFollowing ? '언팔로우' : '팔로우'}
    </Button>
  );
};
