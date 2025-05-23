import { http, HttpResponse } from 'msw';
import { User } from '@/types';

export const followingsHandlers = [
  http.get('http://localhost:4000/api/users/followings', ({ request }) => {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    const search = searchParams.get('search');
    console.log('in handler', search);

    const items: User[] = Array.from({ length: 10 }).map((_, index) => {
      return {
        userId: String(index + 1),
        email: `test${index + 1}@gmail.com`,
        nickname: `테스트 닉네임${index + 1}`,
        profileImage: `https://github.com/shadcn.png`,
        position: 1,
        skills: [1, 2, 3],
        isFollowing: true,
        isFollower: true,
        rate: 4,
      };
    });

    return HttpResponse.json({
      hasNext: true,
      cursor: 1,
      items,
    });
  }),
];
