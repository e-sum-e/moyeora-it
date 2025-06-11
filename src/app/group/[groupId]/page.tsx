'use client';

import { request } from '@/api/request';
import { GroupDescription } from '@/components/atoms/group-description';
import { GroupActionButtons } from '@/components/molecules/gorup-action-buttons';
import { GroupDetaiilCard } from '@/components/organisms/group-detail-card';
import { ReplySection } from '@/components/organisms/reply/reply-section';
import { GroupDetail } from '@/types';
import { isBeforeToday } from '@/utils/dateUtils';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

type GroupDetailResponse = {
  status: {
    code: number;
    message: string;
    success: boolean;
  };
  items: GroupDetail;
};

export default function GroupDetailPage() {
  const { groupId: groupIdParam } = useParams();
  const groupId = Number(groupIdParam);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['group', groupId],
    queryFn: async () => {
      const res: GroupDetailResponse = await request.get(
        `/v2/groups/${groupId}`,
        {},
        { credentials: 'include' },
      );
      if (!res.status.success || !res.items) throw new Error('not found');
      return res.items;
    },
  });

  if (isError) {
    console.error(error);
    return <div>에러 발생</div>;
  }

  if (!groupIdParam || isNaN(Number(groupIdParam))) {
    return <div>잘못된 접근입니다.</div>;
  }

  if (isPending) return <div>로딩 중</div>;

  const { group, host, isApplicant, isJoined } = data;

  const isRecruiting =
    !isBeforeToday(data.group.deadline) &&
    data.group.participants.length < data.group.maxParticipants;

  return (
    <div>
      <main className="w-4/5 mx-auto flex flex-col gap-10 my-15">
        <GroupDetaiilCard info={data} isRecruiting={isRecruiting} />
        <GroupDescription
          description={group.description}
          groupType={group.type}
        />
        <ReplySection />
      </main>
      {isRecruiting && (
        <footer className="fixed bottom-0 z-50 bg-white border-t-2 py-2 px-8 w-full flex justify-end gap-4">
          <GroupActionButtons
            hostId={host.userId}
            isApplicant={isApplicant}
            isJoined={isJoined}
            autoAllow={group.autoAllow}
          />
        </footer>
      )}
    </div>
  );
}
