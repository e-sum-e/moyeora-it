import { http, HttpResponse } from 'msw';
import { User } from '@/types';
import { Position, Skill } from '@/types/enums';

export const userHandlers = [
  http.get('http://localhost:4000/api/users/:id', ({ params }) => {
    const { id } = params;

    if (id === '10') {
      return HttpResponse.json(null);
    }

    return HttpResponse.json<User>({
      userId: '1',
      email: 'test@test.com',
      nickname: '테스트닉네임',
      profileImage: 'https://github.com/shadcn.png',
      position: Position.FE,
      skills: [Skill.JAVA, Skill.JavaScript, Skill.Spring],
      rate: 4.5,
      isFollowing: false,
      isFollower: false,
    });
  }),
];
