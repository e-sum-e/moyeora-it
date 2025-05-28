import { http, HttpResponse } from 'msw';

export const groupsHandlers = [
  http.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/groups`, ({ request }) => {
    const url = new URL(request.url);
    const cursor = Number(url.searchParams.get('cursor')) || 0;
    const size = Number(url.searchParams.get('size')) || 10;
    const type = url.searchParams.get('type') || 'all';

    const titles = [
      '프론트엔드 스터디 모집합니다',
      '알고리즘 마스터하기',
      '토이 프로젝트 팀원 구해요',
      'Next.js 프로젝트 같이 하실 분',
      'CS 스터디원 모집',
      'React 심화 스터디',
      '백엔드 개발자 모여라',
      'UI/UX 프로젝트 팀원 구함',
      'Spring Boot 스터디',
      'DevOps 기초부터 실무까지',
    ];

    let items = Array.from({ length: size }, (_, index) => ({
      id: Math.floor(Math.random() * 1000000) + 1,
      title: titles[(cursor + index) % titles.length],
      deadline: '2025-05-22',
      startDate: '2025-05-20',
      endDate: '2025-05-24',
      maxParticipants: 10,
      participants: [],
      description: '스터디1 설명',
      position: [1, 3],
      skills: [1, 2],
      createdAt: '2025-05-20',
      type: 'study',
      autoAllow: true,
      isBookmark: false,
    }));

    console.log('type', type);

    if (type.includes('study')) {
      items = items.filter((item) => item.type === 'study');
    }

    if (type.includes('project')) {
      items = items.filter((item) => item.type === 'project');
    }

    if (type.includes('bookmark')) {
      items = items.map((item) => ({
        ...item,
        isBookmark: true,
      }));
    }

    return HttpResponse.json({
      items,
      hasNext: cursor + size < 100,
      cursor: cursor + size,
    });
  }),
  http.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/group`, () => {
    return HttpResponse.json({
      success: true,
    });
  }),
  http.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/groups/:groupId`, () => {
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
        userId: 'abcd123',
        nickname: '사용자1',
        profileImage: 'https://github.com/shadcn.png',
      },
      isApplicant: false,
      participants: [
        {
          userId: 'abcd1',
          nickname: '팀원1',
          profileImage: null,
          email: 'member1@gmail.com',
        },
        {
          userId: 'abcd12',
          nickname: null,
          profileImage: 'https://github.com/shadcn.png',
          email: 'member2@gmail.com',
        },
        {
          userId: 'abcd123',
          nickname: '팀원3',
          profileImage: 'https://github.com/shadcn.png',
          email: 'member3@gmail.com',
        },
        {
          userId: 'abcd1234',
          nickname: '팀원4',
          profileImage: 'https://github.com/shadcn.png',
          email: 'member4@gmail.com',
        },
        {
          userId: 'abcd1235',
          nickname: null,
          profileImage: 'https://github.com/shadcn.png',
          email: 'member5@naver.com',
        },
      ],
    });
  }),
];
