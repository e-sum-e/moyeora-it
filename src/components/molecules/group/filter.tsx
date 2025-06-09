'use client';

import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger } from '@/components/ui/popover';
import {
  DEFAULT_POSITION_NAMES,
  DEFAULT_SKILL_NAMES,
  PositionName,
  SkillName,
} from '@/types';
import { PopoverContent } from '@radix-ui/react-popover';
import { useSearchParams } from 'next/navigation';

type FilterProps = {
  updateQueryParams: (queries: Record<string, string>) => void;
};

export const Filter = ({ updateQueryParams }: FilterProps) => {
  const searchParams = useSearchParams();
  const selectedSkills = searchParams.get('skill')?.split(',');
  const selectedPositions = searchParams.get('position')?.split(',');

  const skillSelectHandler = (skill: SkillName) => {
    updateQueryParams({ skill: skill });
  };

  const positionSelectHandler = (position: PositionName) => {
    updateQueryParams({ position: position });
  };

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button>기술 스택</Button>
        </PopoverTrigger>
        <PopoverContent className="flex gap-1 mt-1 p-3 bg-white ring-1 ring-gray-200 rounded-md">
          <Button variant="outline" onClick={() => skillSelectHandler('')}>
            전체
          </Button>
          {DEFAULT_SKILL_NAMES.map((skill) => (
            <Button
              variant="outline"
              key={skill}
              onClick={() => skillSelectHandler(skill)}
              className={
                selectedSkills?.includes(skill) ? 'ring-2 ring-green-400' : ''
              }
            >
              {skill}
            </Button>
          ))}
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Button>포지션</Button>
        </PopoverTrigger>
        <PopoverContent className="flex gap-1 mt-2 p-2  bg-white ring-1 ring-gray-200 rounded-md">
          <Button variant="outline" onClick={() => positionSelectHandler('')}>
            전체
          </Button>
          {DEFAULT_POSITION_NAMES.map((position) => (
            <Button
              variant="outline"
              key={position}
              onClick={() => positionSelectHandler(position)}
              className={
                selectedPositions?.includes(position)
                  ? 'ring-2 ring-green-400'
                  : ''
              }
            >
              {position}
            </Button>
          ))}
        </PopoverContent>
      </Popover>
    </>
  );
};
