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
    const skillParam = url.searchParams.get('skills');
    const skillNumber = skillParam ? Number(skillParam) : null;

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

      const type = getRandomItem(groupTypeValues);

      const maxParticipants = Math.floor(Math.random() * (30 - 2 + 1)) + 2;

      const participants = Array.from(
        { length: Math.floor(Math.random() * maxParticipants) },
        () => ({
          userId: '1',
          nickname: '모여라잇유저',
          profileImage: null,
        }),
      );

      return {
        id: index + 1,
        title: `${type} ${index + 1}`,
        description: `<h2 class="text-xl font-bold capitalize">스터디 ${
          index + 1
        }을 모집합니다</h2><p>모두 즐겁게 공부해요!</p>`,
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

    const filteredItems =
      skillNumber !== null
        ? items.filter((item) => item.skills.includes(skillNumber))
        : items;

    return HttpResponse.json({
      items: filteredItems,
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
