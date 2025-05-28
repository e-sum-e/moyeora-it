import { request } from '@/api/request';
import { ParticipantListModal } from '@/components/organisms/participant-list-modal';
import { ReplyList } from '@/components/organisms/reply/reply-list';
import { Group, User } from '@/types';

type GroupDetailPageProps = {
  params: Promise<{ groupId: string }>;
};

type GroupDetail = Group & {
  host: Pick<User, 'userId' | 'nickname' | 'profileImage'>;
  isApplicant: boolean;
};

export default async function GroupDetailPage({
  params,
}: GroupDetailPageProps) {
  const groupId = (await params).groupId;
  const data = (await request.get(`/groups/${groupId}`)) as GroupDetail;
  const participants = data.participants;

  return (
    <div>
      <ParticipantListModal participants={participants} />
      <ReplyList />
    </div>
  );
}
