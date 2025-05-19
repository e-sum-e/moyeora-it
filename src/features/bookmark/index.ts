/** localStorage에서 찜 목록을 조회하는 함수 */
export const getBookmarkList = () => {
  let bookmarkList: string[] = [];
  const bookmarkListStr = localStorage.getItem("bookmarkList");

  if (bookmarkListStr !== null) {
    bookmarkList = JSON.parse(bookmarkListStr) as string[];
  }

  return bookmarkList;
};
