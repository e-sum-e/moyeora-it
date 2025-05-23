import { http, HttpResponse } from 'msw';

const REPLY_LIST = Array.from({ length: 100 }, (_, i) => ({
  replyId: i + 1,
  content: `댓글 ${i + 1}`,
  writer: {
    userId: `w${i + 1}`,
    nickname: `w${i + 1}`,
    profileImage: null,
  },
  createdAt: '2025-05-23',
}));

const REREPLY_LIST = Array.from({ length: 50 }, (_, i) => ({
  replyId: i + 1 + 1000,
  content: `대댓글 ${i + 1}`,
  writer: {
    userId: `q${i + 1}`,
    nickname: `q${i + 1}`,
    profileImage: null,
  },
  createdAt: '2025-05-23',
}));

export const repliesHandlers = [
  http.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/groups/:groupId/replies`,
    ({ request }) => {
      const url = new URL(request.url);
      const cursorParam = url.searchParams.get('cursor');
      const sizeParam = url.searchParams.get('size');

      const cursor = cursorParam ? parseInt(cursorParam, 10) : 0;
      const size = sizeParam ? parseInt(sizeParam, 10) : 10;

      const foundIndex = REPLY_LIST.findIndex(
        (item) => item.replyId === cursor,
      );
      const startIndex =
        cursor === 0 ? 0 : foundIndex >= 0 ? foundIndex + 1 : REPLY_LIST.length;

      const paginatedItems = REPLY_LIST.slice(startIndex, startIndex + size);
      const nextCursor =
        startIndex + size < REPLY_LIST.length
          ? paginatedItems.at(-1)?.replyId
          : null;
      const hasNext = nextCursor !== null;

      return HttpResponse.json({
        items: paginatedItems,
        cursor: nextCursor,
        hasNext,
      });
    },
  ),
  http.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/groups/:groupId/replies/:replyId`,
    ({ request }) => {
      const url = new URL(request.url);
      const cursorParam = url.searchParams.get('cursor');
      const sizeParam = url.searchParams.get('size');

      const cursor = cursorParam ? parseInt(cursorParam, 10) : 0;
      const size = sizeParam ? parseInt(sizeParam, 10) : 10;

      const foundIndex = REREPLY_LIST.findIndex(
        (item) => item.replyId === cursor,
      );
      const startIndex =
        cursor === 0
          ? 0
          : foundIndex >= 0
          ? foundIndex + 1
          : REREPLY_LIST.length;

      const paginatedItems = REREPLY_LIST.slice(startIndex, startIndex + size);
      const nextCursor =
        startIndex + size < REREPLY_LIST.length
          ? paginatedItems.at(-1)?.replyId
          : null;
      const hasNext = nextCursor !== null;
      console.log(nextCursor);

      return HttpResponse.json({
        items: paginatedItems,
        cursor: nextCursor,
        hasNext,
      });
    },
  ),
];
