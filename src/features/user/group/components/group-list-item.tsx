'use client';

import { Group } from '@/types';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { formatYearMonthDayWithDot } from '@/utils/dateUtils';
import { getPosition, Position } from '@/types/enums';
import { isBeforeToday } from '@/utils/dateUtils';
import { MemberListDialog } from '@/features/user/group/components/member-list-modal/member-list-dialog';
import { RateButton } from '@/components/molecules/rate-button.tsx';

type GroupListItemProps = {
  group: Group;
  isCurrentUser: boolean;
  status: 'PARTICIPATING' | 'RECRUITING' | 'ENDED';
};

const getIsRecruiting = (group: Group) => {
  if (!isBeforeToday(group.deadline)) {
    if (group.participants === null) return true;
    if (group.participants.length < group.maxParticipants) return true;
  }
  return false;
};

/**
 * 모임 목록 아이템 컴포넌트
 *
 * 모임 목록 아이템을 보여준다.
 *
 * @param group 모임 정보
 * @param isCurrentUser 현재 사용자가 로그인한 사용자인지 여부
 * @returns 모임 목록 아이템 컴포넌트
 */
export const GroupListItem = ({
  group,
  isCurrentUser,
  status,
}: GroupListItemProps) => {
  const { id, title, deadline, position } = group;

  return (
    <div className="relative">
      <li className="border-b-2 border-gray-200 h-25 last:border-b-0 relative">
        <Link href={`/group/${id}`}>
          <div className="h-full flex flex-col w-full">
            <div className="flex flex-col gap-y-2">
              <div className="flex items-center gap-x-2">
                <h3 className="text-lg font-semibold">{title}</h3>
                <span className="text-sm text-green-500 font-semibold">
                  {getIsRecruiting(group) ? '모집중' : '모집완료'}
                </span>
              </div>
              <div className="flex items-center gap-x-5">
                <div className="flex items-center gap-x-1.5">
                  <span className="text-gray-700 font-semibold text-sm">
                    담당 포지션
                  </span>
                  <Separator
                    orientation="vertical"
                    className="data-[orientation=vertical]:h-4 min-h-4 bg-gray-300"
                  />
                  <div className="flex items-center gap-x-2">
                    {position.map((position: Position) => (
                      <span
                        className="bg-gray-600 py-1 px-3 rounded-[8px] flex items-center justify-center text-white text-sm"
                        key={position}
                      >
                        {getPosition(position)}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-x-1.5">
                  <span className="text-gray-700 font-semibold text-sm">
                    모임 마감일
                  </span>
                  <Separator
                    orientation="vertical"
                    className="data-[orientation=vertical]:h-4 min-h-4 bg-gray-300"
                  />
                  <span className="text-gray-700 font-semibold text-sm">
                    ~{formatYearMonthDayWithDot(deadline)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
        {isCurrentUser && status === 'RECRUITING' && (
          <MemberListDialog groupId={String(id)} groupTitle={title} />
        )}
      </li>
      {
        isCurrentUser && status === 'ENDED' && (
          <div className="absolute right-4 bottom-1 top-1/2 -translate-y-1/2">
            <RateButton participants={group.participants} />
          </div>
        )
      }
    </div>
  );
};
