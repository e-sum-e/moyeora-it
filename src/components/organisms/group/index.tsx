'use client';

import { Filter } from '@/components/molecules/group/filter';
import { GroupCard } from '@/components/molecules/group/group-card';
import { useFetchItems } from '@/hooks/useFetchItems';
import { Group, SkillName } from '@/types';
import { Skill } from '@/types/enums';
import { useState } from 'react';

export const GroupList = () => {
  const [selectedSkill, setSelectedSkill] = useState<SkillName>('');

  const { data } = useFetchItems<Group>({
    url: '/api/groups',
    queryParams: {
      skills: Skill[selectedSkill as keyof typeof Skill] ?? '',
    },
  });

  const selectSkill = (currentSkill: SkillName) => {
    setSelectedSkill(currentSkill);
  };

  return (
    <>
      <Filter selectSkill={selectSkill} />
      <GroupCard groups={data.pages.flatMap((page) => page.items)} />
    </>
  );
};
