import { ReplyList } from '@/components/organisms/reply/reply-list';

export default function GroupDetailPage() {
  return (
    <div>
      <div>{/* 모임 기본 정보 */}</div>
      <div>{/* 마크다운으로 된 설명문 */}</div>
      <ReplyList />
    </div>
  );
}
