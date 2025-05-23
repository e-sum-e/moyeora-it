'use client';

import { ReplyForm } from '@/components/atoms/reply/reply-form';
import { ReplyItem } from '@/components/organisms/reply-item';

export default function GroupDetailPage() {
  const allReplies = [
    {
      replyId: 1,
      content: `댓글 `,
      writer: {
        userId: `1`,
        nickname: `abc`,
        profileImage: null,
      },
      createdAt: '2025-05-23',
    },
  ];

  return (
    <div>
      <div>{/* 마크다운으로 된 설명문 */}</div>
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
        </div>
      </section>
    </div>
  );
}
