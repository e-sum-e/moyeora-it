'use client';

import { request } from '@/api/request';
import { BookmarkButton } from '@/components/atoms/bookmark-button';
import {
  addBookmarkItem,
  getBookmarkList,
  removeBookmarkItem,
} from '@/features/bookmark';
import useAuthStore from '@/stores/useAuthStore';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

type BookmarkButtonContainerProps = {
  groupId: number;
  isBookmark: boolean;
};

/**
 * 북마크 버튼의 상태(isBookmark)를 내부에서 처리하는 컨테이너 컴포넌트
 *
 * - 로그인하지 않은 사용자의 경우, localStorage에서 북마크 여부를 확인합니다.
 * - 여러 개의 컴포넌트를 리스트로 렌더링하는 경우(예: 그룹 목록 등)에는 성능상 비효율적이므로 사용하지 마세요.
 *   → 이 경우 북마크 상태를 상위 컴포넌트에서 미리 계산한 후, BookmarkButton 컴포넌트에 props로 전달해 주세요.
 *     (`useBookmarkItems` 훅을 활용해 북마크 토글 로직과 상태 관리를 일괄 처리하는 것을 권장합니다.)
 *
 * 사용 예시: 그룹 상세 페이지
 */
export const BookmarkButtonContainer = ({
  groupId,
  isBookmark: initialIsBookmarkState,
}: BookmarkButtonContainerProps) => {
  const user = useAuthStore((state) => state.user);
  const [isBookmark, setIsBookmark] = useState(initialIsBookmarkState);

  useEffect(() => {
    if (!user) {
      const bookmarkList = getBookmarkList();
      setIsBookmark(bookmarkList.includes(groupId));
    } else {
      setIsBookmark(initialIsBookmarkState);
    }
  }, [user, groupId, initialIsBookmarkState]);

  const { mutate } = useMutation({
    mutationFn: (next: boolean) =>
      request.patch(
        '/v2/bookmark',
        { 'Content-Type': 'application/json' },
        { groupId, bookmark: next },
        { credentials: 'include' },
      ),
    onError: () => {
      toast.error('찜하기에 실패했습니다.');
      setIsBookmark((prev) => !prev);
    },
  });

  const toggleBookmark = () => {
    const next = !isBookmark;
    setIsBookmark(next);

    if (!user) {
      if (isBookmark) {
        removeBookmarkItem(groupId);
      } else {
        addBookmarkItem(groupId);
      }
    } else {
      mutate(next);
    }
  };

  return <BookmarkButton isBookmark={isBookmark} onToggle={toggleBookmark} />;
};
