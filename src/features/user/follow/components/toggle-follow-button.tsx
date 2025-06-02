import { useToggleFollow } from '@/features/user/follow/hooks/useToggleFollow';
import { useDebounce } from '@/hooks/useDebounce';
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

  const toggleFollowButtonClickHandler = useDebounce(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      toggleFollow();
    },
    300,
  );

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
