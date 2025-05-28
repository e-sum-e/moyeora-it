'use client';

import { useFetchItems } from '@/hooks/useFetchItems';
import { Group } from '@/types';
import { Skill } from '@/types/enums';
import { getYearMonthDayWithDot } from '@/utils/dateUtils';
import { getSkillBadge } from '@/utils/getSkillBadge';

export default function Home() {
  const { data } = useFetchItems<Group>({
    url: '/api/groups',
  });

  const groups = data.pages.flatMap((page) => page.items);
  return (
    <div>
      <div className="">
        <ul>
          {groups.map((item) => (
            <li key={item.id} className="border-1 border-y-teal-500 rounded-md">
              <div>
                <h3>{item.title}</h3>
              </div>
              <div>
                참가 현황 :{item.participants.length}/{item.maxParticipants}
              </div>
              <div>
                <div>모집 종료 : {getYearMonthDayWithDot(item.deadline)}</div>
                <div>모임 시작 : {getYearMonthDayWithDot(item.startDate)}</div>
                <div>모임 종료 : {getYearMonthDayWithDot(item.endDate)}</div>
              </div>
              <div>
                <div>
                  사용 기술 :
                  <div className="flex gap-2">
                    {item.skills.map((skill) => getSkillBadge(Skill[skill]))}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
