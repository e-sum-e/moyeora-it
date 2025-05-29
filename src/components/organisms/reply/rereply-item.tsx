import { ReplyContent } from '@/components/molecules/reply/reply-content';
import { Reply } from '@/types';
import { forwardRef, useState } from 'react';

/** 대댓글 삭제를 위해 ReplyContent를 둘러싸기 위해 만든 컴포넌트 */
export const RereplyItem = forwardRef<HTMLLIElement, Reply>((props, ref) => {
  const [isDeleted, setIsDeleted] = useState(props.isDeleted);

  if (isDeleted) return null;

  return (
    <li ref={ref}>
      <ReplyContent {...props} onDelete={() => setIsDeleted(true)} />
    </li>
  );
});

RereplyItem.displayName = 'RereplyItem';
