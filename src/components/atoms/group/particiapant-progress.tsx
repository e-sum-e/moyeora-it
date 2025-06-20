'use client';

import { Progress } from '@/components/ui/progress';
import { useEffect, useState } from 'react';

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
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    requestAnimationFrame(() => {
      setProgress((participantsCount / maxParticipants) * 100);
    });
  }, [maxParticipants, participantsCount]);

  return (
    <div className="flex flex-col mt-4 gap-1">
      <div>{`👤 ${participantsCount}/${maxParticipants}`}</div>
      <Progress value={progress} className={className} />
    </div>
  );
};
