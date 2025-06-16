'use client';

import { request } from '@/api/request';
import {
  addBookmarkItem,
  getBookmarkList,
  removeBookmarkItem,
} from '@/features/bookmark';
import useAuthStore from '@/stores/useAuthStore';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useEffect, useState } from 'react';
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
      request.patch(
        '/v2/bookmark',
        { 'Content-Type': 'application/json' },
        { groupId, bookmark: isBookmark },
        { credentials: 'include' },
      ),
    onError: () => {
      toast.error('찜하기에 실패하였습니다.');
      setIsBookmark((prev) => !prev);
    },
  });

  const bookmarkButtonToggleHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    e.stopPropagation();
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

  useEffect(() => {
    if (!user) {
      const bookmarkList = getBookmarkList();
      setIsBookmark(bookmarkList.includes(groupId));
    }
  }, [groupId, user]);

  return (
    <button onClick={bookmarkButtonToggleHandler} className="cursor-pointer">
      <Image
        src={`/icons/bookmark-${isBookmark ? 'active' : 'default'}.svg`}
        alt="찜히기"
        width={24}
        height={24}
      />
    </button>
  );
};
