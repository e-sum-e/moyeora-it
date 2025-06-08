import { Badge } from '@/components/atoms/badge';
import { BookmarkButton } from '@/components/atoms/bookmark-button';
import { Deadline } from '@/components/atoms/group/deadline';
import { GroupTitle } from '@/components/atoms/group/group-title';
import { Progress } from '@/components/ui/progress';
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
    <li className="border-1 border-y-teal-500 rounded-md">
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

        <div>
          참가 현황
          <Progress
            value={(item.participants.length / item.maxParticipants) * 100}
          />
        </div>
        <div>
          <div>모집 종료 : {formatYearMonthDayWithDot(item.deadline)}</div>
          <div>모임 시작 : {formatYearMonthDayWithDot(item.startDate)}</div>
          <div>모임 종료 : {formatYearMonthDayWithDot(item.endDate)}</div>
        </div>
        <div>
          <div className="flex gap-2">
            <GroupSkills skills={item.skills} />
            <GroupSkills skills={item.skills} />
          </div>
        </div>
      </Link>
    </li>
  );
};
