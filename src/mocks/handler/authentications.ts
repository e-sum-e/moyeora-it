import { http, HttpResponse } from 'msw';
import { User } from '@/types';

export const authenticationsHandlers = [
  http.post('http://localhost:4000/api/login', () => {
    return new HttpResponse(JSON.stringify({ success: true }), {
      headers: new Headers([
        ['Set-Cookie', 'accessToken=myAccess'],
        ['Set-Cookie', 'refreshToken=myRefresh'],
      ]),
    });
  }),
  http.post('http://localhost:4000/api/register', () => {
    return new HttpResponse(JSON.stringify({ success: true }), {
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
        isFollower: false,
        isFollowing: true,
        rate: 4,
      },
    });
  }),
  http.post('http://localhost:4000/api/me', () => {
    return HttpResponse.json({
      success: true,
    });
  }),
];
