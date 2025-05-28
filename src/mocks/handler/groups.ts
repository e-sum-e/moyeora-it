import { Group } from '@/types';
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

export const groupsHandlers = [
  http.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/groups`, ({ request }) => {
    const url = new URL(request.url);
    const cursor = Number(url.searchParams.get('cursor')) || 0;
    const size = Number(url.searchParams.get('size')) || 10;

    const baseDate = new Date(2025, 4, 26);
    const positionKeysLength = positionKeys.length;
    const skillKeysLength = skillKeys.length;

    const items: Group[] = Array.from({ length: size }, (_, index) => {
      const offset = (cursor + index) * 2; // 그룹마다 날짜 차이를 두기 위한 오프셋

      const createdAt = addDays(baseDate, offset);
      const deadline = addDays(baseDate, offset + 1);
      const startDate = addDays(baseDate, offset + 5);
      const endDate = addDays(baseDate, offset + 10);

      // position 랜덤하게 정하기
      const positions = getRandomItems(
        positionKeys,
        Math.floor(Math.random() * 3) + 1,
      ).map((key) => Position[key]);

      // skill 랜덤하게 정하기
      const skills = getRandomItems(
        skillKeys,
        Math.floor(Math.random() * 3) + 1,
      ).map((key) => Skill[key]);

      // type 랜덤하게 정하기
      const type = getRandomItem(groupTypeValues);

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

      let item = {
        id: Math.floor(Math.random() * 1000000) + 1,
        title: titles[(cursor + index) % titles.length],
        deadline: '2025-05-22',
        startDate: '2025-05-20',
        endDate: '2025-05-24',
        maxParticipants: 10,
        participants: [],
        description: `<h2 class="text-xl font-bold capitalize">스터디 ${
          index + 1
        }을 모집합니다</h2><p>모두 즐겁게 공부해요!</p>`,
        position: positions,
        skills: skills,
        autoAllow: true,
        isBookmark: false,
        createdAt,
        deadline,
        startDate,
        endDate,
        type,
      };

      if (type.includes('study') && item.type !== 'study') {
        return null;
      }

      if (type.includes('project') && item.type !== 'project') {
        return null;
      }

      if (type.includes('bookmark')) {
        item = {
          ...item,
          isBookmark: true,
        };
      }

      return item;
    }).filter(Boolean) as Group[];

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
