import { request } from '@/api/request';
import { GroupDescription } from '@/components/atoms/group-description';
import { GroupDetaiilCard } from '@/components/organisms/group-detail-card';
import { ParticipantListModal } from '@/components/organisms/participant-list-modal';
import { ReplyList } from '@/components/organisms/reply/reply-list';
import { Group, UserSummary } from '@/types';

type GroupDetailPageProps = {
  params: Promise<{ groupId: string }>;
};

type GroupDetail = Group & {
  host: UserSummary;
  isApplicant: boolean;
};

export default async function GroupDetailPage({
  params,
}: GroupDetailPageProps) {
  const groupId = (await params).groupId;
  const data = (await request.get(`/groups/${groupId}`)) as GroupDetail;
  const { participants, description } = data;

  return (
    <div>
      <GroupDetaiilCard info={data} />
      <GroupDescription description={description} />
      <ParticipantListModal participants={participants} />
      <ReplyList />
    </div>
  );
}
