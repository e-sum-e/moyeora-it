import { request } from '@/api/request';
import { GroupDescription } from '@/components/atoms/group-description';
import { GroupActionButtons } from '@/components/molecules/gorup-action-buttons';
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
  const { participants, description, host, isApplicant } = data;

  return (
    <div>
      <main className="w-4/5 mx-auto flex flex-col gap-10">
        <GroupDetaiilCard info={data} />
        <GroupDescription description={description} />
        <ParticipantListModal participants={participants} />
        <ReplyList />
      </main>
      <footer className="fixed bottom-0 z-50 bg-white border-t-2 py-2 px-5 w-full flex justify-end gap-3">
        <GroupActionButtons hostId={host.userId} isApplicant={isApplicant} />
      </footer>
    </div>
  );
}
