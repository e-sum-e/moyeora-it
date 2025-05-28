'use client';

import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger } from '@/components/ui/popover';
import { DEFAULT_SKILL_NAMES, SkillName } from '@/types';
import { PopoverContent } from '@radix-ui/react-popover';

type FilterProps = {
  selectSkill: (skill: SkillName) => void;
};

export const Filter = ({ selectSkill }: FilterProps) => {
  const skillSelectHandler = (skill: SkillName) => {
    selectSkill(skill);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>기술</Button>
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
  );
};
