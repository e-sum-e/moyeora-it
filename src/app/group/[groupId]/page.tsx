import { ReplyForm } from '@/components/atoms/reply/reply-form';
import { Reply } from '@/components/organisms/reply';

export default function GroupDetailPage() {
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
