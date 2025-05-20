'use client';

import { addBookmarkItem, removeBookmarkItem } from '@/features/bookmark';
import { useState } from 'react';

type BookmarkButtonProps = {
  id: number;
  isBookmark: boolean;
};

export const BookmarkButton = ({
  id,
  isBookmark: initialIsBookmarkState,
}: BookmarkButtonProps) => {
  const [isBookmark, setIsBookmark] = useState<boolean>(initialIsBookmarkState);

  const bookmarkButtonToggleHandler = () => {
    if (isBookmark) {
      setIsBookmark(false);
      removeBookmarkItem(id);
    } else {
      setIsBookmark(true);
      addBookmarkItem(id);
    }
  };

  return (
    <button
      onClick={bookmarkButtonToggleHandler}
      className={`${isBookmark ? 'bg-red-400' : ''}`}
    >
      찜하기
    </button>
  );
};
