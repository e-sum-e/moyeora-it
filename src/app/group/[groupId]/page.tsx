import { request } from '@/api/request';
import { GroupDescription } from '@/components/atoms/group-description';
import { GroupActionButtons } from '@/components/molecules/gorup-action-buttons';
import { GroupDetaiilCard } from '@/components/organisms/group-detail-card';
import { ReplySection } from '@/components/organisms/reply/reply-section';
import { GroupDetail } from '@/types';
import { isBeforeToday } from '@/utils/dateUtils';
import { notFound } from 'next/navigation';

type GroupDetailPageProps = {
  params: Promise<{ groupId: string }>;
};

type GroupDetailResponse = {
  status: {
    code: number;
    message: string;
    success: boolean;
  };
  items: GroupDetail;
};

export default async function GroupDetailPage({
  params,
}: GroupDetailPageProps) {
  const groupId = (await params).groupId;
  let data: GroupDetail;

  try {
    const response: GroupDetailResponse = await request.get(
      `/v2/groups/${groupId}`,
      {},
      { credentials: 'include' },
    );

    if (!response.status.success || !response.items) {
      return notFound();
    }
    console.log(response);
    data = response.items;
  } catch (err) {
    console.error(err);
    notFound();
  }

  const { group, host, isApplicant } = data;
  const deadline = new Date(data.group.deadline);
  const isRecruiting =
    !isBeforeToday(deadline) &&
    data.group.participants.length < data.group.maxParticipants;

  return (
    <div>
      <main className="w-4/5 mx-auto flex flex-col gap-10 mb-20">
        <GroupDetaiilCard info={data} isRecruiting={isRecruiting} />
        <GroupDescription description={group.description} />
        <ReplySection />
      </main>
      {isRecruiting && (
        <footer className="fixed bottom-0 z-50 bg-white border-t-2 py-2 px-5 w-full flex justify-end gap-3">
          <GroupActionButtons hostId={host.userId} isApplicant={isApplicant} />
        </footer>
      )}
    </div>
  );
}
