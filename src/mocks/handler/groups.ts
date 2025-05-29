import { Group, GroupSort, Order } from '@/types';
import { Position, Skill } from '@/types/enums';
import {
  getRandomItem,
  getRandomItems,
  groupTypeValues,
  positionKeys,
  skillKeys,
} from '@/utils/mockUtils';
import { addDays } from 'date-fns';
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

export const groupsHandlers = [
  http.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/groups`,
    ({ request }) => {
      const url = new URL(request.url); // 요청 url에서 parameter를 뽑아내기 위해 url 전체가 필요
      const skillParam = url.searchParams.get('skill');
      const skillNumber = skillParam ? Number(skillParam) : null; // skillParam이 있을 경우 서버에 enum 숫자 값으로 보내기 위해 숫자로 변환

      const positionParam = url.searchParams.get('position');
      const positionNumber = positionParam ? Number(positionParam) : null;

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

      const skillFiltered =
        skillNumber !== null
          ? items.filter((item) => item.skills.includes(skillNumber))
          : items;

      const positionFiltered =
        positionNumber !== null
          ? skillFiltered.filter((item) =>
              item.position.includes(positionNumber),
            )
          : skillFiltered;

      const sortedItems = [...positionFiltered].sort((a, b) => {
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
    },
  ),
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
        email: "qwerty@gmail.com",
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

