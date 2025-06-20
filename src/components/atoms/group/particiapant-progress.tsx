import { Progress } from '@/components/ui/progress';
import Image from 'next/image';

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
    <div className="mt-2">
      <div className="">
        <Image
          src={'/icons/person.svg'}
          width={20}
          height={20}
          alt="person icon"
          className="inline-block"
        />
        <span className="ml-1">{`${participantsCount}/${maxParticipants}`}</span>
      </div>
      <Progress
        value={(participantsCount / maxParticipants) * 100}
        className={`mt-2 ${className}`}
      />
    </div>
  );
};
