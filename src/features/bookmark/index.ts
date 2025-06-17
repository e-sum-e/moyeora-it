import { request } from '@/api/request';
import { ContentInfo } from '@/components/organisms/bookmark-card';
import { Group, User } from '@/types';
import { toast } from 'sonner';

/** localStorage에서 찜 목록을 조회하는 함수 */
export const getBookmarkList = () => {
  let bookmarkList: number[] = [];
  const bookmarkListStr = localStorage.getItem('bookmarkList');

  if (bookmarkListStr !== null) {
    bookmarkList = JSON.parse(bookmarkListStr) as number[];
  }

  return bookmarkList;
};

/** 해당 요소를 localStorage 찜 목록에 추가하는 함수 */
export const addBookmarkItem = (itemId: number) => {
  const bookmarkList = getBookmarkList();
  bookmarkList.push(itemId);
  localStorage.setItem('bookmarkList', JSON.stringify(bookmarkList));
};

/** 해당 요소를 localStorage 찜 목록에서 제거하는 함수 */
export const removeBookmarkItem = (itemId: number) => {
  let bookmarkList = getBookmarkList();
  bookmarkList = bookmarkList.filter((bookmark) => bookmark !== itemId);
  localStorage.setItem('bookmarkList', JSON.stringify(bookmarkList));
};

export const setLocalBookmarkItems = (items: Group[] | ContentInfo[]) => {
  const bookmarkList = getBookmarkList();

  return items.map((item) => ({
    ...item,
    isBookmark: bookmarkList.includes(item.id),
  }));
};

export const updateBookmark = async ({
  groupId,
  nextBookmarkStatus,
  user,
  onFail,
}: {
  groupId: number;
  nextBookmarkStatus: boolean;
  user: User | null;
  onFail?: () => void;
}) => {
  if (!user) {
    if (nextBookmarkStatus) removeBookmarkItem(groupId);
    else addBookmarkItem(groupId);

    return;
  }

  try {
    await request.patch(
      '/v2/bookmark',
      { 'Content-Type': 'application/json' },
      { groupId, bookmark: nextBookmarkStatus },
      { credentials: 'include' },
    );
  } catch {
    toast.error('찜하기에 실패했습니다.');
    onFail?.();
  }
};
