import { ReplyForm } from '@/components/atoms/reply/reply-form';

export default function GroupDetailPage() {
  return (
    <div>
      <div>{/* 마크다운으로 된 설명문 */}</div>
      <ReplyForm />
      <div>{/* 댓글 */}</div>
    </div>
  );
}
