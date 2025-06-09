//단일 북마크용 컨테이너 - 반복문에서는 사용하지않음
'use client';

import { BookmarkButton } from '@/components/atoms/bookmark-button';
import { getBookmarkList } from '@/features/bookmark';
import useAuthStore from '@/stores/useAuthStore';

type BookmarkButtonContainerProps = {
  groupId: number;
  isBookmark: boolean;
};

export const BookmarkButtonContainer = ({
  groupId,
  isBookmark,
}: BookmarkButtonContainerProps) => {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    const bookmarkList = getBookmarkList();
    isBookmark = bookmarkList.includes(groupId);
  }

  return (
    <div>
      <BookmarkButton groupId={groupId} isBookmark={isBookmark} />
    </div>
  );
};
