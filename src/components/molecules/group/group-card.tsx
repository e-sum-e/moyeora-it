import { Badge } from '@/components/atoms/badge';
import { BookmarkButton } from '@/components/atoms/bookmark-button';
import { Deadline } from '@/components/atoms/group/deadline';
import { GroupPositions } from '@/components/atoms/group/group-positions';
import { GroupTitle } from '@/components/atoms/group/group-title';
import { GroupProgress } from '@/components/atoms/group/particiapant-progress';
import { Group, GroupTypeName } from '@/types';
import { formatYearMonthDayWithDot } from '@/utils/dateUtils';
import { routes } from '@/utils/routes';
import Link from 'next/link';
import { GroupSkills } from '../../atoms/group/group-skills';

type GroupCardProps = {
  item: Group;
};

// TODO : 섹션별로 component 나누기
export const GroupCard = ({ item }: GroupCardProps) => {
  return (
    <div className="relative p-5 md:w-[300px] bg-white shadow-sm shadow-gray-400 rounded-lg">
      <div className="absolute top-0 right-0 m-6">
        <BookmarkButton groupId={item.id} isBookmark={item.isBookmark} />
      </div>
      <Link href={routes.groupDetail(item.id)}>
        <div>
          <Badge
            text={GroupTypeName[item.type]}
            className="w-[fit-content] text-sm font-semibold bg-gray-200"
          />
          <Deadline text={formatYearMonthDayWithDot(item.endDate)} />
          <GroupTitle text={item.title} />
        </div>
        <GroupProgress
          participantsCount={item.participants.length}
          maxParticipants={item.maxParticipants}
        />
        <div className="mt-4">
          <div className="flex flex-col gap-2">
            <GroupSkills skills={item.skills} />
            <GroupPositions positions={item.position} />
          </div>
        </div>
      </Link>
    </div>
  );
};
