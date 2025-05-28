'use client';

import { GroupCard } from '@/components/molecules/group/group-card';
import { useFetchItems } from '@/hooks/useFetchItems';
import { Group } from '@/types';

export const GroupList = () => {
  const { data } = useFetchItems<Group>({
    url: '/api/groups',
  });

  return (
    <>
      <GroupCard groups={data.pages.flatMap((page) => page.items)} />
    </>
  );
};
