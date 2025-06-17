import { getBookmarkList, updateBookmark } from '@/features/bookmark';
import useAuthStore from '@/stores/useAuthStore';
import { useCallback, useState } from 'react';

/**
 * 북마크 상태를 목록 단위로 통합 관리하는 훅
 *
 * 사용 대상:
 * - 무한스크롤 목록 등 다수의 아이템을 렌더링하는 페이지
 *
 * 기능:
 * - 초기 아이템 배열을 받아 북마크 상태를 포함하여 설정
 * - 아이템별 북마크 상태를 toggleBookmark로 변경
 * - 로컬/서버 북마크 저장 방식 분기 포함
 *
 * 주의:
 * - 외부에서 flatten된 아이템 전체를 전달받아야 함
 */
export const useBookmarkItems = <
  T extends { id: number; isBookmark?: boolean },
>() => {
  const user = useAuthStore((state) => state.user);
  const [items, setItems] = useState<(T & { isBookmark: boolean })[]>([]);

  const setInitialItems = useCallback(
    (initialItems: T[]) => {
      const bookmarkList = getBookmarkList();
      const updated = initialItems.map((item) => ({
        ...item,
        isBookmark: user
          ? item.isBookmark ?? false
          : bookmarkList.includes(item.id),
      }));
      setItems(updated);
    },
    [user],
  );

  const toggleBookmark = async (
    groupId: number,
    nextBookmarkStatus: boolean,
  ) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === groupId
          ? { ...item, isBookmark: nextBookmarkStatus }
          : item,
      ),
    );

    await updateBookmark({
      user,
      groupId,
      nextBookmarkStatus,
      onFail: () =>
        setItems((prev) =>
          prev.map((item) =>
            item.id === groupId
              ? { ...item, isBookmark: !nextBookmarkStatus }
              : item,
          ),
        ),
    });
  };

  return { items, toggleBookmark, setInitialItems };
};
