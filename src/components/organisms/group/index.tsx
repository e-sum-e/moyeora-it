'use client';

import { Filter } from '@/components/molecules/group/filter';
import { GroupCard } from '@/components/molecules/group/group-card';
import { useFetchItems } from '@/hooks/useFetchItems';
import { Group, PositionName, SkillName } from '@/types';
import { Position, Skill } from '@/types/enums';
import { useState } from 'react';

export const GroupList = () => {
  const [selectedSkill, setSelectedSkill] = useState<SkillName>('');
  const [selectedPosition, setSelectedPosition] = useState<PositionName>('');

  const { data } = useFetchItems<Group>({
    url: '/api/groups',
    queryParams: {
      skill: Skill[selectedSkill as keyof typeof Skill] ?? '',
      position: Position[selectedPosition as keyof typeof Position] ?? '',
    },
  });

  const selectSkill = (currentSkill: SkillName) => {
    setSelectedSkill(currentSkill);
  };

  const selectPosition = (currentPosition: PositionName) => {
    setSelectedPosition(currentPosition);
  };

  return (
    <>
      <Filter selectSkill={selectSkill} selectPosition={selectPosition} />
      <GroupCard groups={data.pages.flatMap((page) => page.items)} />
    </>
  );
};
