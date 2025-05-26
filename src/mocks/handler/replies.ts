import { Reply } from '@/types';
import { http, HttpResponse } from 'msw';

const REPLY_LIST: Reply[] = Array.from({ length: 33 }, (_, i) => ({
  replyId: i + 1,
  content: `댓글 ${i + 1}`,
  writer: {
    userId: `w${i + 1}`,
    nickname: `w${i + 1}`,
    profileImage: null,
  },
  createdAt: '2025-05-23',
}));

const REREPLY_LIST: (Reply & { parentId: number })[] = Array.from(
  { length: 500 },
  (_, i) => ({
    replyId: i + 1 + 10000,
    parentId: (i % REPLY_LIST.length) + 1,
    content: `대댓글 ${i + 1}`,
    writer: {
      userId: `q${i + 1}`,
      nickname: `q${i + 1}`,
      profileImage: null,
    },
    createdAt: '2025-05-23',
  }),
);

export const repliesHandlers = [
  // 댓글 무한 스크롤로 가져오기
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
  // 대댓글 무한 스크롤로 가져오기
  http.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/groups/:groupId/replies/:replyId`,
    ({ request, params }) => {
      const url = new URL(request.url);
      const cursorParam = url.searchParams.get('cursor');
      const sizeParam = url.searchParams.get('size');

      const cursor = cursorParam ? parseInt(cursorParam, 10) : 0;
      const size = sizeParam ? parseInt(sizeParam, 10) : 10;
      const parentId = Number(params.replyId); // ✅ 부모 댓글 ID

      // ✅ 해당 부모 댓글에 달린 대댓글만 필터링
      const filtered = REREPLY_LIST.filter(
        (item) => item.parentId === parentId,
      );

      const foundIndex = filtered.findIndex((item) => item.replyId === cursor);
      const startIndex =
        cursor === 0 ? 0 : foundIndex >= 0 ? foundIndex + 1 : filtered.length;

      const paginatedItems = filtered.slice(startIndex, startIndex + size);
      const nextCursor =
        startIndex + size < filtered.length
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
  // 댓글 추가
  http.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/groups/:groupId/replies`,
    async ({ request }) => {
      const body = (await request.json()) as { content: string };
      const { content } = body;

      const newId = REPLY_LIST.length + 1;
      const newReplyData = {
        replyId: newId,
        content,
        writer: {
          userId: `w${newId}`,
          nickname: `w${newId}`,
          profileImage: null,
        },
        createdAt: '2025-05-23',
      };

      REPLY_LIST.push(newReplyData);

      return HttpResponse.json({
        replyId: newReplyData.replyId,
      });
    },
  ),
  // 대댓글 추가
  http.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/groups/:groupId/replies/:replyId`,
    async ({ request, params }) => {
      const body = (await request.json()) as { content: string };
      const { content } = body;

      const parentId = Number(params.replyId);
      const newId = REREPLY_LIST.length + 1;
      const newRereplyData = {
        replyId: newId,
        parentId,
        content,
        writer: {
          userId: `w${newId}`,
          nickname: `w${newId}`,
          profileImage: null,
        },
        createdAt: '2025-05-23',
      };

      REREPLY_LIST.push(newRereplyData);

      return HttpResponse.json({
        parentId: 10,
        replyId: newRereplyData.replyId,
      });
    },
  ),
];
