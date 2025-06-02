'use client';

import { request } from '@/api/request';
import { addBookmarkItem, removeBookmarkItem } from '@/features/bookmark';
import useAuthStore from '@/stores/useAuthStore';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

type BookmarkButtonProps = {
  groupId: number;
  isBookmark: boolean;
};

export const BookmarkButton = ({
  groupId,
  isBookmark: initialIsBookmarkState,
}: BookmarkButtonProps) => {
  const user = useAuthStore((state) => state.user);
  const [isBookmark, setIsBookmark] = useState<boolean>(initialIsBookmarkState);

  const { mutate } = useMutation({
    mutationFn: (isBookmark: boolean) =>
      request.patch('/v2/bookmark', {}, { groupId, isBookmark }),
    onError: () => {
      toast.error('찜하기에 실패하였습니다.');
      setIsBookmark((prev) => !prev);
    },
  });

  const bookmarkButtonToggleHandler = () => {
    setIsBookmark((prev) => !prev);

    if (user === null) {
      //로그인 전이면 로컬 스토리지에 저장
      if (isBookmark) {
        removeBookmarkItem(groupId);
      } else {
        addBookmarkItem(groupId);
      }
    } else {
      mutate(!isBookmark);
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
