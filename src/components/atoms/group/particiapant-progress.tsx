'use client';

import { Progress } from '@/components/ui/progress';
import { useLayoutEffect, useState } from 'react';

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
  const [value, setValue] = useState<number>(0);

  useLayoutEffect(() => {
    requestAnimationFrame(() => {
      setValue((100 * participantsCount) / maxParticipants);
    });
  }, [maxParticipants, participantsCount]);

  return (
    <div className="flex flex-col mt-4 gap-1">
      <div>{`👤 ${participantsCount}/${maxParticipants}`}</div>
      <Progress value={value} className={className} />
    </div>
  );
};
