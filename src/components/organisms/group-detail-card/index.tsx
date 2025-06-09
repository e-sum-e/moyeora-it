import { Avatar } from '@/components/atoms/avatar';
import { Badge } from '@/components/atoms/badge';
import { BookmarkButton } from '@/components/atoms/bookmark-button';
import { GroupSkills } from '@/components/atoms/group/group-skills';
import { GroupProgress } from '@/components/atoms/group/particiapant-progress';
import { ParticipantListModal } from '@/components/organisms/participant-list-modal';
import { GroupDetail, GroupTypeName } from '@/types';
import { Position } from '@/types/enums';
import { formatYearMonthDayWithDot } from '@/utils/dateUtils';
import { getDisplayNickname, getDisplayProfileImage } from '@/utils/fallback';
import Link from 'next/link';

type GroupDetaiilCardProps = {
  info: GroupDetail;
  isRecruiting: boolean;
};

export const GroupDetaiilCard = ({
  info,
  isRecruiting,
}: GroupDetaiilCardProps) => {
  return (
    <article className="flex flex-col gap-5 w-full">
      <header className="flex flex-col gap-8">
        <div className="flex justify-between items-start">
          <h1 className="font-bold text-3xl">{info.group.title}</h1>
          <BookmarkButton
            groupId={info.group.id}
            isBookmark={info.group.isBookmark}
          />
        </div>
        {/* 모임 주최자 */}
        <div className="flex gap-2 items-center">
          <Link href={`/users/${info.host.userId}`} className="flex gap-2">
            <Avatar
              imageSrc={getDisplayProfileImage(info.host.profileImage)}
              fallback={getDisplayNickname(info.host.nickname, info.host.email)}
            />
            <span className="font-semibold">
              {getDisplayNickname(info.host.nickname, info.host.email)}
            </span>
          </Link>
        </div>
      </header>

      <section className="border-t-2 border-gray-200 flex flex-col gap-5 pt-8">
        <GroupInfoItem label="모집 구분">
          {GroupTypeName[info.group.type]}
        </GroupInfoItem>

        <GroupInfoItem label="모집 마감">
          {formatYearMonthDayWithDot(new Date(info.group.deadline))}
        </GroupInfoItem>

        <GroupInfoItem label="예상 일정">
          {formatYearMonthDayWithDot(new Date(info.group.startDate))} ~{' '}
          {formatYearMonthDayWithDot(new Date(info.group.endDate))}
        </GroupInfoItem>

        <GroupInfoItem label="모집 분야">
          <ul>
            {info.group.position.map((position) => (
              <li key={Position[position]}>
                <Badge
                  text={Position[position]}
                  className="py-0 px-1 border border-gray-800"
                />
              </li>
            ))}
          </ul>
          {/* <GroupPositions positions={info.group.position} /> */}
        </GroupInfoItem>

        <GroupInfoItem label="기술 스택">
          <GroupSkills skills={info.group.skills} />
        </GroupInfoItem>

        <div>
          <div>모집 현황</div>
          <div className="-mt-3">
            <GroupProgress
              participantsCount={info.group.participants.length}
              maxParticipants={info.group.maxParticipants}
            />
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex">
            {info.group.participants
              .slice(0, 3)
              .map(({ userId, profileImage, email, nickname }, index) => (
                <Avatar
                  key={userId}
                  imageSrc={getDisplayProfileImage(profileImage)}
                  fallback={getDisplayNickname(nickname, email)}
                  className={`${index !== 0 ? '-ml-3' : ''} z-${10 + index}`}
                />
              ))}
            <ParticipantListModal
              participants={info.group.participants}
              className={`z-50 ${
                info.group.participants.length > 0 ? '-ml-3' : ''
              }`}
            />
          </div>
          <div>{isRecruiting ? '모집 중' : '모집 마감'}</div>
        </div>
      </section>
    </article>
  );
};

const GroupInfoItem = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex gap-4 font-bold items-center">
      <div className="whitespace-nowrap">{label}</div>
      <div>{children}</div>
    </div>
  );
};
