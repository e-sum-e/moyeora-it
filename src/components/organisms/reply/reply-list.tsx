'use client';

import { ReplyForm } from '@/components/molecules/reply/reply-form';
import { ReplyItem } from '@/components/organisms/reply/reply-item';
import { useFetchInView } from '@/hooks/useFetchInView';
import { useFetchItems } from '@/hooks/useFetchItems';
import { Reply } from '@/types';
import { useParams } from 'next/navigation';

export const ReplyList = () => {
  const { groupId } = useParams();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFetchItems<Reply>({
      url: `/api/groups/${groupId}/replies`,
      queryParams: {
        size: 10,
      },
    });
  const { ref } = useFetchInView({
    fetchNextPage,
  });

  const allReplies = data.pages.flatMap((page) => page.items);

  return (
    <section className="w-4/5 mx-auto flex flex-col gap-10">
      <ReplyForm />
      <div>
        <ul>
          {allReplies.map(({ replyId, writer, content, createdAt }) => (
            <ReplyItem
              key={replyId}
              writer={writer}
              content={content}
              createdAt={createdAt}
              replyId={replyId}
            />
          ))}
        </ul>
        {hasNextPage && !isFetchingNextPage && (
          <div ref={ref} className="h-2 -translate-y-100 bg-transparent" />
        )}
      </div>
    </section>
  );
};
