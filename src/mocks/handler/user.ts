import { http, HttpResponse } from 'msw';
import { User } from '@/types';
import { Position, Skill } from '@/types/enums';

export const userHandlers = [
  http.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/:id`,
    ({ params }) => {
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
    },
  ),

  http.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/withdraw`, () => {
    return new HttpResponse(null, {
      status: Math.trunc(Math.random() * 100) % 2 === 0 ? 200 : 500,
    });
  }),

  http.patch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/password`,
    async ({ request }) => {
      const body = (await request.json()) as {
        newPassword: string;
        confirmPassword: string;
      };
      console.log(body?.newPassword, body?.confirmPassword);
      return new HttpResponse(null, {
        status: Math.trunc(Math.random() * 100) % 2 === 0 ? 200 : 500,
      });
    },
  ),

  http.patch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/:id`,
    async ({ params, request }) => {
      console.log(params.id);
      const body = await request.formData();
      const nickname = body.get('nickname') as string;
      const position = JSON.parse(body.get('position') as string) as Position;
      const skills = JSON.parse(body.get('skills') as string) as Skill[];
      const file = body.get('file') as File;

      const imgSrc = file
        ? 'https://github.com/shadcn.png'
        : 'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=';

      return HttpResponse.json({
        nickname,
        position,
        skills,
        profileImage: imgSrc,
      });
    },
  ),
];
