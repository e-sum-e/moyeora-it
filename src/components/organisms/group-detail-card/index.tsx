import { Avatar } from '@/components/atoms/avatar';
import { Badge } from '@/components/atoms/badge';
import { BookmarkButton } from '@/components/atoms/bookmark-button';
import { Title } from '@/components/atoms/title';
import { Progress } from '@/components/ui/progress';
import { GroupDetail } from '@/types';
import { getPosition, getSkill } from '@/types/enums';
import { isBeforeToday } from '@/utils/dateUtils';
import { getDisplayNickname, getDisplayProfileImage } from '@/utils/fallback';
import Link from 'next/link';
import { ParticipantListModal } from '../participant-list-modal';

type GroupDetaiilCardProps = {
  className?: string;
  info: GroupDetail;
};

export const GroupDetaiilCard = ({
  className,
  info,
}: GroupDetaiilCardProps) => {
  const deadline = new Date(info.group.deadline);
  const isBeforeDeadline = isBeforeToday(deadline);

  return (
    <div className="relative">
      <article
        className={`flex flex-col gap-4 w-full ${className} border-2 border-green-800 p-2 rounded-lg`}
      >
        <header className="flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Badge
                text={info.group.type.toUpperCase()}
                className="border border-black rounded-sm px-1"
              />
              <Title title={info.group.title} />
            </div>
            <div className="flex gap-2">
              {info.group.positions.map((position) => (
                <Badge
                  key={position}
                  text={getPosition(position)}
                  className="bg-gray-900 text-gray-100"
                />
              ))}
            </div>
          </div>
          <BookmarkButton
            groupId={info.group.id}
            isBookmark={info.group.bookmark}
          />
        </header>

        {/* 모임 주최자 */}
        <section>
          <div className="flex gap-2 items-center">
            작성자:
            <Link href={`/users/${info.host.userId}`} className="flex gap-2">
              <Avatar
                imageSrc={getDisplayProfileImage(info.host.profileImage)}
                fallback={getDisplayNickname(
                  info.host.nickname,
                  info.host.email,
                )}
              />
              {getDisplayNickname(info.host.nickname, info.host.email)}
            </Link>
          </div>
        </section>

        {/* 일정 정보 */}
        <section className="text-sm text-gray-600">
          <div>모집 종료: {info.group.deadline}</div>
          <div>모임 시작: {info.group.startDate}</div>
          <div>모임 종료: {info.group.endDate}</div>
        </section>

        {/* 기술 스택 */}
        <section>
          <span>사용 기술:</span>
          <ul className="flex gap-2 mt-1">
            {info.group.skills.map((skill) => (
              <li key={skill}>{getSkill(skill)}</li>
            ))}
          </ul>
        </section>

        {/* 모집 현황 */}
        <section>
          <div>
            <span>
              참가 현황: {info.group.participants.length}/
              {info.group.maxParticipants}
            </span>
          </div>
          <div className="flex items-center gap-2 ">
            <Progress value={50} />
            <div className="whitespace-nowrap">
              {isBeforeDeadline &&
              info.group.participants.length < info.group.maxParticipants
                ? '모집중'
                : '완료'}
            </div>
          </div>
        </section>

        {/* 참가자 목록 */}
        <section>
          <div className="flex gap-2">
            참가자 목록:
            <div className="flex">
              {info.group.participants
                .slice(0, 3)
                .map(({ userId, profileImage, email, nickname }) => (
                  <Avatar
                    key={userId}
                    imageSrc={getDisplayProfileImage(profileImage)}
                    fallback={getDisplayNickname(nickname, email)}
                  />
                ))}
              <ParticipantListModal participants={info.group.participants} />
            </div>
          </div>
        </section>
      </article>

      {/* 모집 종료 오버레이 */}
      {isBeforeDeadline && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
          <p className="text-white font-medium">모집이 종료되었습니다.</p>
        </div>
      )}
    </div>
  );
};
