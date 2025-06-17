'use client';

import { BookmarkButton } from '@/components/atoms/bookmark-button';
import { getBookmarkList, updateBookmark } from '@/features/bookmark';
import useAuthStore from '@/stores/useAuthStore';
import { useEffect, useState } from 'react';

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

  const toggleBookmark = async () => {
    const nextBookmarkStatus = !isBookmark;
    setIsBookmark(nextBookmarkStatus);

    await updateBookmark({
      user,
      groupId,
      nextBookmarkStatus,
      onFail: () => setIsBookmark((prev) => !prev),
    });
  };

  return (
    <BookmarkButton
      isBookmark={isBookmark}
      bookmarkToggleHandler={toggleBookmark}
    />
  );
};
