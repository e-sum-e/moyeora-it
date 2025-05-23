import { request } from '@/api/request';
import { ReplyForm } from '@/components/atoms/reply/reply-form';
import { Reply } from '@/components/organisms/reply';

type GroupDetailPage = {
  params: Promise<{ groupId?: string }>;
};

export default async function GroupDetailPage({ params }: GroupDetailPage) {
  const groupId = (await params).groupId;

  if (groupId === undefined) return null;

  try {
    const data = await request.get(`/api/groups/${groupId}`);
    console.log(data);
  } catch (err) {
    console.log(err);
    return null;
  }

  return (
    <div>
      <div>{/* 마크다운으로 된 설명문 */}</div>
      <section className="w-4/5 mx-auto flex flex-col gap-10">
        <ReplyForm />
        <div>
          {/* 댓글 리스트*/}
          <Reply
            writer={{
              nickname: '작성자',
              profileImage: '',
              userId: 'a1',
            }}
            content="댓글입니다."
            createdAt="2025.05.21"
            replyId={1}
          />
        </div>
      </section>
    </div>
  );
}
