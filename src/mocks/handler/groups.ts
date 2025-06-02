import { http, HttpResponse } from 'msw';

const titles = [
  'React 스터디',
  'Node.js 모임',
  'TypeScript 스터디',
  'Next.js 클럽',
  '프론트엔드 개발자 그룹',
  '백엔드 마스터즈',
  '풀스택 프로젝트팀',
  '알고리즘 마라톤',
  'UI/UX 디자인 스터디',
  '데이터 사이언스 클럽',
];

const GROUP_LIST = [
  {
    title: '스터디1',
    deadline: '2025-05-24',
    startDate: '2025-05-20',
    endDate: '2025-05-24',
    maxParticipants: 10,
    description:
      '<h1 class="text-xl font-bold capitalize text-green-700" levels="2">Next.js 스터디</h1><ul class="list-disc ml-2"><li><p>온라인으로 진행</p></li><li><p>오후 7시</p></li></ul><p></p><p>—완료—</p><h2 class="text-xl font-bold capitalize" levels="2"></h2>',
    position: [1, 3],
    skills: [1, 2],
    createdAt: '2025-05-20',
    type: 'study',
    autoAllow: true,
    host: {
      userId: 'abcd123',
      nickname: '사용자1',
      profileImage: 'https://github.com/shadcn.png',
      email: 'qwerty@gmail.com',
    },
    isApplicant: false,
    isBookmark: false,
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
  },
];

export const groupsHandlers = [
  http.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/groups`, ({ request }) => {
    const url = new URL(request.url); // 요청 url에서 parameter를 뽑아내기 위해 url 전체가 필요

    const typeParam = url.searchParams.get('type');

    const skillParam = url.searchParams.get('skill');
    const skillNumber = skillParam ? Number(skillParam) : null; // skillParam이 있을 경우 서버에 enum 숫자 값으로 보내기 위해 숫자로 변환

    const positionParam = url.searchParams.get('position');
    const positionNumber = positionParam ? Number(positionParam) : null;
    const searchKeyword = url.searchParams.get('search')?.toLowerCase() ?? '';
    const sortParam = url.searchParams.get('sort') as GroupSort | null;
    const orderParam = url.searchParams.get('order') as Order | null;

    const items: Group[] = Array.from({ length: 20 }, (_, index) => {
      const offset = index * 2;

      const baseDate = new Date(2025, 4, 26);
      const createdAt = addDays(baseDate, offset);
      const deadline = addDays(baseDate, offset + 1);
      const startDate = addDays(baseDate, offset + 5);
      const endDate = addDays(baseDate, offset + 10);

      const positions = getRandomItems(
        positionKeys,
        Math.floor(Math.random() * 3) + 1,
      ).map((key) => Position[key]);

      const skills = getRandomItems(
        skillKeys,
        Math.floor(Math.random() * 3) + 1,
      ).map((key) => Skill[key]);

      const type = getRandomItem(groupTypeValues.slice(0, 2)); // 만들어진 그룹은 study | project이다

      const maxParticipants = Math.floor(Math.random() * (30 - 2 + 1)) + 2;

      const participants = Array.from(
        { length: Math.floor(Math.random() * maxParticipants) },
        () => ({
          userId: '1',
          nickname: '모여라잇유저',
          profileImage: null,
        }),
      );

      // 배열에서 순서대로 타이틀 가져오기
      const title = titles[index % titles.length];

      return {
        id: index + 1,
        title,
        description: `<h2 class="text-xl font-bold capitalize">${title} 모집합니다</h2><p>모두 즐겁게 공부해요!</p>`,
        position: positions,
        skills: skills,
        participants,
        maxParticipants,
        autoAllow: true,
        isBookmark: false,
        createdAt,
        deadline,
        startDate,
        endDate,
        type,
      };
    });

    const typeFiltered =
      typeParam && typeParam !== ''
        ? items.filter((item) => item.type === typeParam)
        : items;

    const skillFiltered =
      skillNumber !== null
        ? typeFiltered.filter((item) => item.skills.includes(skillNumber))
        : typeFiltered;

    const positionFiltered =
      positionNumber !== null
        ? skillFiltered.filter((item) => item.position.includes(positionNumber))
        : skillFiltered;

    const searchFiltered = searchKeyword
      ? positionFiltered.filter((item) =>
          item.title.toLowerCase().includes(decodeURIComponent(searchKeyword)),
        )
      : positionFiltered;

    const sortedItems = [...searchFiltered].sort((a, b) => {
      if (!sortParam) return 0;

      const aDate = new Date(a[sortParam]);
      const bDate = new Date(b[sortParam]);

      if (orderParam === 'asc') return aDate.getTime() - bDate.getTime();
      if (orderParam === 'desc') return bDate.getTime() - aDate.getTime();
      return 0;
    });

    return HttpResponse.json({
      items: sortedItems,
    });
  }),
  http.post(
    'http://localhost:4000/api/groups/:groupId/join',
    async ({ params, request }) => {
      const { groupId } = params;
      const body = (await request.json()) as {
        userId: string;
        status: 'approve' | 'deny';
      };
      console.log(groupId, body);

      return HttpResponse.json({}, { status: 200 });
    },
  ),

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
  http.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/group`, () => {
    return HttpResponse.json({
      success: true,
    });
  }),
  http.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/groups/:groupId`, () => {
    return HttpResponse.json(GROUP_LIST[0]);
  }),
  http.patch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/bookmark`,
    async ({ request }) => {
      const body = (await request.json()) as {
        groupId: number;
        isBookmark: boolean;
      };
      const { groupId, isBookmark } = body;

      GROUP_LIST[0].isBookmark = isBookmark;

      if (groupId === 2) {
        return HttpResponse.json({}, { status: 400 });
      }

      return HttpResponse.json({});
    },
  ),
  http.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/groups/:groupId`, () => {
    return HttpResponse.json({});
  }),
];
