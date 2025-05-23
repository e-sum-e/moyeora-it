import { ReplyContent } from '@/components/atoms/reply/reply-content';
import { ReplyHeader } from '@/components/molecules/reply/reply-header';

type RereplyListProps = {
  parentReplyId: number;
};

export const RereplyList = ({ parentReplyId }: RereplyListProps) => {
  //  parentReplyId를 이용해서 데이터 GET 요청
  console.log(parentReplyId);
  const rereplies = [
    {
      replyId: 11,
      writer: { userId: '1', profileImage: '', nickname: 'abc' },
      createdAt: '2025.05.22',
      content: '대댓글1',
    },
    {
      replyId: 12,
      writer: { userId: '2', profileImage: '', nickname: 'abc' },
      createdAt: '2025.05.22',
      content: '대댓글2',
    },
    {
      replyId: 13,
      writer: { userId: '3', profileImage: '', nickname: 'abc' },
      createdAt: '2025.05.22',
      content: '대댓글3',
    },
    {
      replyId: 14,
      writer: { userId: '4', profileImage: '', nickname: 'abc' },
      createdAt: '2025.05.22',
      content: '대댓글4',
    },
  ];

  return (
    <ul className="flex flex-col gap-5">
      {rereplies.map((rereply) => (
        <li key={rereply.replyId}>
          <ReplyHeader
            writer={rereply.writer}
            createdAt={rereply.createdAt}
            replyId={rereply.replyId}
          />
          <ReplyContent content={rereply.content} />
        </li>
      ))}
    </ul>
  );
};
