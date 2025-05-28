import { ParticipantListModal } from '@/components/organisms/participant-list-modal';
import { ReplyList } from '@/components/organisms/reply/reply-list';

export default function GroupDetailPage() {
  return (
    <div>
      <ParticipantListModal />
      <ReplyList />
    </div>
  );
}
