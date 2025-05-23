import { http, HttpResponse } from 'msw';
import { User } from '@/types';

export const groupsHandlers = [
  http.get('http://localhost:4000/api/groups', () => {
    return HttpResponse.json({
      items: [
        {
          title: '스터디1',
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
        },
      ],
    });
  }),
  http.post('http://localhost:4000/api/login', () => {
    return new HttpResponse(null, {
      headers: new Headers([
        ['Set-Cookie', 'accessToken=myAccess'],
        ['Set-Cookie', 'refreshToken=myRefresh'],
      ]),
    });
  }),
  http.get('http://localhost:4000/api/me', () => {
    return HttpResponse.json<{ user: User }>({
      user: {
        userId: 'my-id',
        email: 'me@example.com',
        nickname: null,
        position: null,
        skills: null,
        profileImage: null,
      },
    });
  }),
];
