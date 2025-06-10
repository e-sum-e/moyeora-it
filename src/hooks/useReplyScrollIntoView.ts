import { Reply } from '@/types';
import { Page } from '@/utils/flattenPages';
import type { InfiniteData } from '@tanstack/react-query';
import { useRef } from 'react';

interface UseReplyScrollIntoViewProps {
  data: InfiniteData<Page<Reply>>;
  targetReplyId: number | null;
  setTargetReplyId: (id: number | null) => void;
  hasNextPage: boolean;
}

/**
 * 특정 댓글(replyId)로 스크롤 이동시키기 위한 커스텀 훅
 *
 * @param data - useInfiniteQuery로 가져온 페이지네이션된 댓글 데이터
 * @param targetReplyId - 스크롤 이동할 댓글의 ID (존재할 경우 스크롤 시도)
 * @param setTargetReplyId - 이동이 완료되면 targetReplyId를 null로 초기화하는 함수
 * @param hasNextPage - 더 불러올 페이지가 있는지 여부
 *
 * @returns itemRefs - 댓글 각각에 대응되는 ref 객체
 * @returns bottomRef - 요소가 존재하지 않을 경우 스크롤할 fallback 위치
 */
/* eslint-disable @typescript-eslint/no-unused-vars */
export const useReplyScrollIntoView = ({
  data,
  targetReplyId,
  setTargetReplyId,
  hasNextPage,
}: UseReplyScrollIntoViewProps) => {
  const itemRefs = useRef<Record<number, HTMLLIElement | null>>({});
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   if (!targetReplyId) return;

  //   const targetElement = itemRefs.current[targetReplyId];

  //   if (targetElement) {
  //     targetElement.scrollIntoView({ behavior: 'instant', block: 'start' });
  //     setTargetReplyId(null);
  //   } else {
  //     bottomRef.current?.scrollIntoView({
  //       behavior: 'instant',
  //       block: 'end',
  //     });
  //   }

  //   if (!hasNextPage) setTargetReplyId(null);
  // }, [data.pages.length, targetReplyId, setTargetReplyId, hasNextPage]);

  return {
    itemRefs,
    bottomRef,
  };
};
