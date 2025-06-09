import { request } from '@/api/request';

// 북마크 정보를 로그인 후 서버에 저장하는 함수
const addBookmarkWhenAuth = async (bookmarkListStr: string) => {
  let bookmarkList: number[] = [];
  bookmarkList = JSON.parse(bookmarkListStr) as number[];

  // TODO: api 수정 요청
  await request.patch(
    `/v2/bookmark/addids`,
    { 'Content-Type': 'application/json' },
    { groupId: bookmarkList, bookmark: true },
    { credentials: 'include' },
  );
};

export default addBookmarkWhenAuth;
