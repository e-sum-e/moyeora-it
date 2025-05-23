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
      writer: { id: '1', profileImage: '', name: 'abc' },
      createdAt: '2025.05.22',
      content: '대댓글1',
    },
    {
      replyId: 12,
      writer: { id: '2', profileImage: '', name: 'abc' },
      createdAt: '2025.05.22',
      content: '대댓글2',
    },
    {
      replyId: 13,
      writer: { id: '3', profileImage: '', name: 'abc' },
      createdAt: '2025.05.22',
      content: '대댓글3',
    },
    {
      replyId: 14,
      writer: { id: '4', profileImage: '', name: 'abc' },
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
