import { useRemoveFollower } from '@/features/user/follow/hooks/useRemoveFollower';
import { Button } from '@/components/ui/button';

type RemoveFollowerButtonProps = {
  userId: string;
};

export const RemoveFollowerButton = ({ userId }: RemoveFollowerButtonProps) => {
  const { mutate: removeFollower, isPending } = useRemoveFollower({ userId });

  const removeFollowerButtonClickHandler: React.MouseEventHandler<
    HTMLButtonElement
  > = (e) => {
    e.preventDefault();
    removeFollower();
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={removeFollowerButtonClickHandler}
      disabled={isPending}
    >
      삭제
    </Button>
  );
};
