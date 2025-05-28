import { useSearchParams } from 'next/navigation';

/**
 * 쿼리 파라미터에서 스크롤 이동할 댓글 또는 대댓글의 id를 얻는 훅
 *
 * @param type - 이 훅을 사용하는 위치에 따라 'reply' 또는 'rereply'를 전달합니다.
 * - 'reply': 댓글 관련 컴포넌트에서 사용
 * - 'rereply': 대댓글 관련 컴포넌트에서 사용
 *
 * @returns
 * - type이 'reply'인 경우: targetId로 스크롤 대상 댓글 ID 반환
 * - type이 'rereply'인 경우: targetParentId(부모 댓글 ID)와 targetId(대댓글 ID) 반환
 */

export const useReplyScrollParams = (type: 'reply' | 'rereply') => {
  const searchParams = useSearchParams();

  const replyIdParam = searchParams.get('replyId');
  const targetReplyId =
    typeof replyIdParam === 'string' ? Number(replyIdParam) : null;

  const parentIdParam = searchParams.get('parentId');
  const targetParentId =
    typeof parentIdParam === 'string' ? Number(parentIdParam) : null;

  if (type === 'reply') {
    return { targetId: targetParentId ?? targetReplyId };
  }

  return { targetParentId, targetId: targetReplyId };
};
