import { http, HttpResponse } from 'msw';

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
  http.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/group`, () => {
    return HttpResponse.json({
      success: true,
    });
  }),
  http.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/groups/:groupId`,
    () => {
      return HttpResponse.json({
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
        host: {
          id: 'abcd123',
          name: '사용자1',
          profileImage: 'https://github.com/shadcn.png',
        },
        isApplicant: false,
        participants: [
          {
            id: 'abcd123',
            name: '팀원1',
            profileImage: 'https://github.com/shadcn.png',
          },
          {
            id: 'abcd123',
            name: '팀원1',
            profileImage: 'https://github.com/shadcn.png',
          },
          {
            id: 'abcd123',
            name: '팀원1',
            profileImage: 'https://github.com/shadcn.png',
          },
          {
            id: 'abcd123',
            name: '팀원1',
            profileImage: 'https://github.com/shadcn.png',
          },
          {
            id: 'abcd123',
            name: '팀원1',
            profileImage: 'https://github.com/shadcn.png',
          },
        ],
      });
    },
  ),
];