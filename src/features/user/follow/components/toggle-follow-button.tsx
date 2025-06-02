import { useToggleFollow } from '@/features/user/follow/hooks/useToggleFollow';
import { Button } from '@/components/ui/button';

type ToggleFollowButtonProps = {
  userId: string;
  isFollowing: boolean;
  usedIn: string;
};

export const ToggleFollowButton = ({
  userId,
  isFollowing,
  usedIn,
}: ToggleFollowButtonProps) => {
  const { mutate: toggleFollow, isPending } = useToggleFollow({
    userId,
    isFollowing,
    usedIn,
  });

  const toggleFollowButtonClickHandler: React.MouseEventHandler<
    HTMLButtonElement
  > = (e) => {
    e.preventDefault();
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
