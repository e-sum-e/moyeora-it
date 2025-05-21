import { http, HttpResponse } from 'msw';

export const groupsHandlers = [
  http.get('http://localhost:4000/api/groups', ({ request }) => {
    const url = new URL(request.url);
    const cursor = Number(url.searchParams.get('cursor')) || 0;
    const size = Number(url.searchParams.get('size')) || 10;

    const items = Array.from({ length: size }, (_, index) => ({
      id: cursor + index + 1,
      title: `스터디${cursor + index + 1}`,
      deadline: '2025-05-24',
      startDate: '2025-05-20',
      endDate: '2025-05-24',
      maxParticipants: 10,
      description: '스터디1 설명',
      position: [1, 3],
      skills: [1, 2],
      createdAt: '2025-05-20',
      type: 'study',
      autoAllow: true,
    }));

    return HttpResponse.json({
      items,
      hasNext: cursor + size < 100,
      cursor: cursor + size,
    });
  }),
];
