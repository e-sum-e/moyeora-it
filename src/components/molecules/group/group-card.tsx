import { Badge } from '@/components/atoms/badge';
import { BookmarkButton } from '@/components/atoms/bookmark-button';
import { SkillBadge } from '@/components/molecules/skill-badge';
import { Group, GroupTypeName } from '@/types';
import { Skill } from '@/types/enums';
import { formatYearMonthDayWithDot } from '@/utils/dateUtils';
import { routes } from '@/utils/routes';
import Link from 'next/link';

type GroupCardProps = {
  item: Group;
};

// TODO : 섹션별로 component 나누기
export const GroupCard = ({ item }: GroupCardProps) => {
  return (
    <li className="border-1 border-y-teal-500 rounded-md">
      <BookmarkButton groupId={item.id} isBookmark={item.isBookmark} />
      <Link href={routes.groupDetail(item.id)}>
        <div>
          <Badge text={GroupTypeName[item.type]} className="bg-gray-200" />
          <h3>{item.title}</h3>
        </div>
        <div>
          참가 현황 :{item.participants.length}/{item.maxParticipants}
        </div>
        <div>
          <div>모집 종료 : {formatYearMonthDayWithDot(item.deadline)}</div>
          <div>모임 시작 : {formatYearMonthDayWithDot(item.startDate)}</div>
          <div>모임 종료 : {formatYearMonthDayWithDot(item.endDate)}</div>
        </div>
        <div>
          <div>
            사용 기술 :
            <div className="flex gap-2">
              <ul>
                {item.skills.map((skill, i) => (
                  <li key={i}>
                    <SkillBadge name={Skill[skill]} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};
