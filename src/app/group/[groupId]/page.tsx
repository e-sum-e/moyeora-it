import { request } from '@/api/request';
import { GroupDescription } from '@/components/atoms/group-description';
import { GroupActionButtons } from '@/components/molecules/gorup-action-buttons';
import { GroupDetaiilCard } from '@/components/organisms/group-detail-card';
import { ReplyList } from '@/components/organisms/reply/reply-list';
import { GroupDetail } from '@/types';
import { CommonResponse } from '@/types/response';
import { notFound } from 'next/navigation';

type GroupDetailPageProps = {
  params: Promise<{ groupId: string }>;
};

export default async function GroupDetailPage({
  params,
}: GroupDetailPageProps) {
  const groupId = (await params).groupId;
  let data: GroupDetail;

  try {
    const response: CommonResponse<GroupDetail> = await request.get(
      `/v2/groups/${groupId}`,
      {},
      { credentials: 'include' },
    );

    if (!response.status.success || !response.data) {
      return notFound();
    }

    data = response.data;
  } catch (err) {
    console.error(err);
    notFound();
  }

  const { groupInfo, userInfo: host, applicant: isApplicant } = data;

  return (
    <div>
      <main className="w-4/5 mx-auto flex flex-col gap-10">
        <GroupDetaiilCard info={data} />
        <GroupDescription description={groupInfo.description} />
        <ReplyList />
      </main>
      <footer className="fixed bottom-0 z-50 bg-white border-t-2 py-2 px-5 w-full flex justify-end gap-3">
        <GroupActionButtons hostId={host.userId} isApplicant={isApplicant} />
      </footer>
    </div>
  );
}
