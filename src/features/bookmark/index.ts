/** localStorage에서 찜 목록을 조회하는 함수 */
export const getBookmarkList = () => {
  let bookmarkList: string[] = [];
  const bookmarkListStr = localStorage.getItem("bookmarkList");

  if (bookmarkListStr !== null) {
    bookmarkList = JSON.parse(bookmarkListStr) as string[];
  }

  return bookmarkList;
};

/** 해당 요소를 localStorage 찜 목록에 추가하는 함수 */
export const addBookmarkItem = (item: string) => {
  const bookmarkList = getBookmarkList();
  bookmarkList.push(item);
  localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
};

/** 해당 요소를 localStorage 찜 목록에서 제거하는 함수 */
export const removeBookmarkItem = (item: string) => {
  let bookmarkList = getBookmarkList();
  bookmarkList = bookmarkList.filter((bookmark) => bookmark !== item);
  localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
};
