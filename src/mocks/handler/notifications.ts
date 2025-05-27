import { eNotification } from '@/types/enums';
import { http, HttpResponse } from 'msw';

export const notificationsHandlers = [
  http.get('http://localhost:4000/api/notifications', () => {
    return HttpResponse.json({
      items: [
        {
          id: 1,
          message: '알림 메시지',
          isRead: false,
          createdAt: '2025-05-20',
          type: eNotification.GROUP_HAS_PARTICIPANT,
          url: 'http://localhost:3000/groups/1',
        },
      ],
    });
  }),
];
