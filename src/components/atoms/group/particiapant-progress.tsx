import { Progress } from '@/components/ui/progress';

type GroupProgressProps = {
  participantsCount: number;
  maxParticipants: number;
  className?: string;
};

export const GroupProgress = ({
  participantsCount,
  maxParticipants,
  className,
}: GroupProgressProps) => {
  return (
    <div className="flex flex-col mt-4">
      <div>{`👤 ${participantsCount}/${maxParticipants}`}</div>
      <Progress
        value={(participantsCount / maxParticipants) * 100}
        className={className}
      />
    </div>
  );
};
