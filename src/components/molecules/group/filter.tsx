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
        <PopoverContent>
          <Button variant="outline" onClick={() => skillSelectHandler('')}>
            전체
          </Button>
          {DEFAULT_SKILL_NAMES.map((skill) => (
            <Button
              variant="outline"
              key={skill}
              onClick={() => skillSelectHandler(skill)}
              className={
                selectedSkills?.includes(skill)
                  ? 'border-4 border-teal-500'
                  : ''
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
        <PopoverContent>
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
                  ? 'border-4 border-teal-500'
                  : ''
              }
            >
              {position}
            </Button>
          ))}
          <Button></Button>
        </PopoverContent>
      </Popover>
    </>
  );
};
