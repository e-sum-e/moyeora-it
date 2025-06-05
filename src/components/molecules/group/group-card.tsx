import { Badge } from '@/components/atoms/badge';
import { BookmarkButton } from '@/components/atoms/bookmark-button';
import { Deadline } from '@/components/atoms/group/deadline';
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
    <div className="p-6 bg-white rounded-md">
      <Link href={routes.groupDetail(item.id)}>
        <BookmarkButton groupId={item.id} isBookmark={item.isBookmark} />
        <div>
          <Badge
            text={GroupTypeName[item.type]}
            className=" text-sm font-semibold bg-gray-200"
          />
          <Deadline text={formatYearMonthDayWithDot(item.endDate)} />
          <GroupTitle text={item.title} />
        </div>
        <GroupProgress
          participantsCount={item.participants.length}
          maxParticipants={item.maxParticipants}
        />
        <div>
          <div className="flex gap-2">
            <GroupSkills skills={item.skills} />
            <GroupSkills skills={item.skills} />
          </div>
        </div>
      </Link>
    </div>
  );
};
