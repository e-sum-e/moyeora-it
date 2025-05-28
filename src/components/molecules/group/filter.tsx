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

type FilterProps = {
  selectSkill: (skill: SkillName) => void;
  selectPosition: (skill: PositionName) => void;
};

export const Filter = ({ selectSkill, selectPosition }: FilterProps) => {
  const skillSelectHandler = (skill: SkillName) => {
    selectSkill(skill);
  };

  const positionSelectHandler = (position: PositionName) => {
    selectPosition(position);
  };

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button>기술 스택</Button>
        </PopoverTrigger>
        <PopoverContent>
          <Button onClick={() => skillSelectHandler('')}>전체</Button>
          {DEFAULT_SKILL_NAMES.map((skill) => (
            <Button key={skill} onClick={() => skillSelectHandler(skill)}>
              {skill}
            </Button>
          ))}
          <Button></Button>
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Button>포지션</Button>
        </PopoverTrigger>
        <PopoverContent>
          <Button onClick={() => positionSelectHandler('')}>전체</Button>
          {DEFAULT_POSITION_NAMES.map((position) => (
            <Button
              key={position}
              onClick={() => positionSelectHandler(position)}
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
