import { Badge } from '@/components/atoms/badge';
import { Deadline } from '@/components/atoms/group/deadline';
import { GroupTitle } from '@/components/atoms/group/group-title';
import { Group, GroupTypeName } from '@/types';
import {
  formatRelativeTime,
  formatYearMonthDayWithDot,
} from '@/utils/dateUtils';
import { routes } from '@/utils/routes';
import Link from 'next/link';

type RecommendGroupCardProps = {
  item: Group;
};

// TODO : 섹션별로 component 나누기
export const RecommendGroupCard = ({ item }: RecommendGroupCardProps) => {
  return (
    <div className="w-[200px] p-6 bg-white shadow-sm shadow-gray-400">
      <Link href={routes.groupDetail(item.id)}>
        <div className="flex justify-between">
          <Badge
            text={GroupTypeName[item.type]}
            className="h-[22px] text-sm font-semibold bg-gray-200"
          />
          <Badge
            text={`🚨마감 ${
              formatRelativeTime(item.deadline).includes('년')
                ? formatRelativeTime(item.deadline).slice(6)
                : formatRelativeTime(item.deadline)
            }`} // formatRelativeTime이 년월일을 표기해야 하는 함수라서 월일만 자름
            className="h-[22px] text-sm text-red-600 border-1 border-red-600 "
          />
        </div>
        <Deadline text={formatYearMonthDayWithDot(item.endDate)} />
        <GroupTitle text={item.title} />
      </Link>
    </div>
  );
};
