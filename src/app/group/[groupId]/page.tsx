'use client';

import { request } from '@/api/request';
import { GroupDescription } from '@/components/atoms/group-description';
import { GroupActionButtons } from '@/components/molecules/gorup-action-buttons';
import { GroupDetaiilCard } from '@/components/organisms/group-detail-card';
import { ReplySection } from '@/components/organisms/reply/reply-section';
import { GroupDetail } from '@/types';
import { isBeforeToday } from '@/utils/dateUtils';
import { notFound, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

// type GroupDetailPageProps = {
//   params: Promise<{ groupId: string }>;
// };

type GroupDetailResponse = {
  status: {
    code: number;
    message: string;
    success: boolean;
  };
  items: GroupDetail;
};

export default function GroupDetailPage() {
  // const groupId = (await params).groupId;
  // let data: GroupDetail;

  // try {
  //   const response: GroupDetailResponse = await request.get(
  //     `/v2/groups/${groupId}`,
  //     {},
  //     { credentials: 'include' },
  //   );

  //   if (!response.status.success || !response.items) {
  //     return notFound();
  //   }

  //   data = response.items;
  // } catch (err) {
  //   console.error(err);
  //   notFound();
  // }
  const { groupId } = useParams();
  const [data, setData] = useState<GroupDetail | null>(null);

  // useQuery로 리팩토링 예정
  useEffect(() => {
    const fetchGroupDetailData = async () => {
      const response: GroupDetailResponse = await request.get(
        `/v2/groups/${groupId}`,
        {},
        { credentials: 'include' },
      );

      if (!response.status.success || !response.items) {
        return notFound();
      }

      setData(response.items);
    };
    try {
      fetchGroupDetailData();
    } catch (err) {
      console.error(err);
      notFound();
    }
  }, [groupId]);

  if (!data) return null;

  const { group, host, isApplicant } = data;

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
          <GroupActionButtons hostId={host.userId} isApplicant={isApplicant} />
        </footer>
      )}
    </div>
  );
}
